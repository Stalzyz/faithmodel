"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveNavSettings(topNav: any, footerNav: any, headerConfig?: any) {
  try {
    await prisma.setting.upsert({
      where: { key: "TOP_NAV" },
      update: { value: JSON.stringify(topNav) },
      create: { key: "TOP_NAV", value: JSON.stringify(topNav) }
    });

    await prisma.setting.upsert({
      where: { key: "FOOTER_NAV" },
      update: { value: JSON.stringify(footerNav) },
      create: { key: "FOOTER_NAV", value: JSON.stringify(footerNav) }
    });

    if (headerConfig) {
      await prisma.setting.upsert({
        where: { key: "HEADER_CONFIG" },
        update: { value: JSON.stringify(headerConfig) },
        create: { key: "HEADER_CONFIG", value: JSON.stringify(headerConfig) }
      });
    }

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save navigation:", error);
    return { success: false, error: "Failed to save settings." };
  }
}

export async function saveSiteSettings(key: string, value: any) {
  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) }
    });

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
    return { success: false, error: "Failed to save setting." };
  }
}

export async function getEmailSettingsAction() {
  const { getEmailSettings } = await import("@/lib/mail");
  return await getEmailSettings();
}

export async function saveEmailSettingsAction(settings: any) {
  try {
    await prisma.setting.upsert({
      where: { key: "EMAIL_SETTINGS" },
      update: { value: JSON.stringify(settings) },
      create: { key: "EMAIL_SETTINGS", value: JSON.stringify(settings) },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to save email settings:", error);
    return { success: false, error: error?.message || "Failed to save email settings" };
  }
}

export async function testSmtpConnectionAction(settings: any, testRecipient: string) {
  try {
    const { createMailTransporter, parseCcEmails } = await import("@/lib/mail");
    let transporter = createMailTransporter(settings);
    if (!transporter) {
      return { success: false, error: "Please provide both SMTP Host and SMTP User" };
    }

    // Verify SMTP connection with auto fallback for SSL/STARTTLS port mismatch
    try {
      await transporter.verify();
    } catch (verifyErr: unknown) {
      const errMsg = verifyErr instanceof Error ? verifyErr.message : String(verifyErr);
      if (errMsg.includes("wrong version number") || errMsg.includes("SSL routines")) {
        // Fallback: try inverted secure setting (e.g. STARTTLS instead of direct SSL)
        const fallbackTransporter = createMailTransporter(settings, false);
        if (fallbackTransporter) {
          try {
            await fallbackTransporter.verify();
            transporter = fallbackTransporter;
          } catch (retryErr: unknown) {
            const retryMsg = retryErr instanceof Error ? retryErr.message : String(retryErr);
            return {
              success: false,
              error: `SSL/Port Mismatch: Port ${settings.smtpPort || 587} uses STARTTLS. Please uncheck "Use SSL/TLS". Detail: ${retryMsg}`,
            };
          }
        } else {
          return { success: false, error: errMsg };
        }
      } else {
        return { success: false, error: errMsg };
      }
    }

    // Send test email
    const fromAddress = settings.fromEmail || settings.smtpUser;
    const fromSender = settings.fromName ? `"${settings.fromName}" <${fromAddress}>` : fromAddress;
    const ccList = parseCcEmails(settings.ccEmails);

    const testMailOptions: any = {
      from: fromSender,
      to: testRecipient || settings.recipientEmail || settings.smtpUser,
      subject: "Faith Model School - SMTP Test Email",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-top: 0;">✓ SMTP Configuration Verified!</h2>
          <p>Congratulations! Your SMTP email settings for <strong>Faith Model School</strong> are working perfectly.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><strong>Configured SMTP Host:</strong> ${settings.smtpHost}:${settings.smtpPort || 587}</p>
          <p><strong>Sender Address:</strong> ${fromSender}</p>
          <p><strong>Primary Lead Recipient:</strong> ${settings.recipientEmail}</p>
          <p><strong>CC Emails:</strong> ${settings.ccEmails || "None"}</p>
          <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Sent at: ${new Date().toISOString()}</p>
        </div>
      `,
    };

    if (ccList.length > 0) {
      testMailOptions.cc = ccList;
    }

    await transporter.sendMail(testMailOptions);

    return { success: true };
  } catch (error: unknown) {
    console.error("SMTP test failed:", error);
    const errorMessage = error instanceof Error ? error.message : "SMTP connection failed";
    return { success: false, error: errorMessage };
  }
}

