import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromName: string;
  fromEmail: string;
  recipientEmail: string;
  ccEmails: string; // Comma separated emails
  enabled: boolean;
}

export const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  smtpHost: "",
  smtpPort: 587,
  smtpSecure: false,
  smtpUser: "",
  smtpPass: "",
  fromName: "Faith Model School Admissions",
  fromEmail: "",
  recipientEmail: "Admissions@faithmodelschool.com",
  ccEmails: "",
  enabled: true,
};

export async function getEmailSettings(): Promise<EmailSettings> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: "EMAIL_SETTINGS" },
    });

    if (setting && setting.value) {
      const parsed = JSON.parse(setting.value);
      return { ...DEFAULT_EMAIL_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.error("Error reading EMAIL_SETTINGS:", error);
  }
  return DEFAULT_EMAIL_SETTINGS;
}

export function parseCcEmails(ccString: string | undefined): string[] {
  if (!ccString) return [];
  return ccString
    .split(",")
    .map((e) => e.trim())
    .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
}

export function createMailTransporter(settings: EmailSettings, forceSecure?: boolean) {
  if (!settings.smtpHost || !settings.smtpUser) {
    return null;
  }

  const port = Number(settings.smtpPort) || 587;
  
  // Port 465: Direct SSL/TLS (secure: true)
  // Port 587 or 25: STARTTLS upgrade (secure: false)
  // Other ports: fallback to user toggle or port === 465
  let isSecure = false;
  if (typeof forceSecure === "boolean") {
    isSecure = forceSecure;
  } else if (port === 465) {
    isSecure = true;
  } else if (port === 587 || port === 25) {
    isSecure = false;
  } else {
    isSecure = Boolean(settings.smtpSecure);
  }

  return nodemailer.createTransport({
    host: settings.smtpHost.trim(),
    port: port,
    secure: isSecure,
    auth: {
      user: settings.smtpUser.trim(),
      pass: settings.smtpPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendLeadNotificationEmail(leadData: {
  leadId: string;
  name: string;
  phone?: string;
  email?: string;
  courseInterest?: string;
  notes?: string;
}) {
  const settings = await getEmailSettings();

  const toEmail = settings.recipientEmail || "Admissions@faithmodelschool.com";
  const ccList = parseCcEmails(settings.ccEmails);

  if (!settings.enabled || !settings.smtpHost || !settings.smtpUser) {
    console.log(`[EMAIL NOTIFICATION (SMTP not configured/enabled)] To: ${toEmail} | CC: ${ccList.join(", ")} | Lead: ${leadData.name}`);
    return { success: false, reason: "SMTP not configured or disabled" };
  }

  try {
    let transporter = createMailTransporter(settings);
    if (!transporter) {
      return { success: false, reason: "Transporter could not be created" };
    }

    const fromAddress = settings.fromEmail || settings.smtpUser;
    const fromSender = settings.fromName
      ? `"${settings.fromName}" <${fromAddress}>`
      : fromAddress;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #1a1a2e; padding: 24px; text-align: center; border-bottom: 3px solid #2563eb; }
          .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px; }
          .header p { color: #94a3b8; margin: 6px 0 0 0; font-size: 13px; }
          .badge { display: inline-block; background: #2563eb; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-top: 12px; }
          .body { padding: 28px 24px; }
          .title { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
          .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .field-table td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .field-label { font-weight: 600; color: #64748b; width: 35%; }
          .field-value { color: #1e293b; font-weight: 500; }
          .notes-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 14px; border-radius: 4px; font-size: 14px; color: #334155; margin-top: 8px; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>FAITH MODEL SCHOOL</h1>
            <p>Empowering Minds, Shaping Futures</p>
            <div class="badge">New Admissions Lead Received</div>
          </div>
          <div class="body">
            <div class="title">Lead Information</div>
            <table class="field-table">
              <tr>
                <td class="field-label">Parent / Contact Name:</td>
                <td class="field-value">${leadData.name}</td>
              </tr>
              <tr>
                <td class="field-label">Mobile Number:</td>
                <td class="field-value"><a href="tel:${leadData.phone || ''}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${leadData.phone || "Not provided"}</a></td>
              </tr>
              <tr>
                <td class="field-label">Email Address:</td>
                <td class="field-value">${leadData.email ? `<a href="mailto:${leadData.email}" style="color: #2563eb; text-decoration: none;">${leadData.email}</a>` : "Not provided"}</td>
              </tr>
              <tr>
                <td class="field-label">Grade / Program:</td>
                <td class="field-value"><span style="background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${leadData.courseInterest || "General Admission"}</span></td>
              </tr>
              <tr>
                <td class="field-label">Lead ID:</td>
                <td class="field-value" style="font-family: monospace; font-size: 12px; color: #64748b;">${leadData.leadId}</td>
              </tr>
              <tr>
                <td class="field-label">Submission Time:</td>
                <td class="field-value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
              </tr>
            </table>

            ${
              leadData.notes
                ? `<div style="font-weight: 600; font-size: 13px; color: #64748b; margin-top: 12px;">Additional Details:</div>
                   <div class="notes-box">${leadData.notes}</div>`
                : ""
            }
          </div>
          <div class="footer">
            This is an automated notification from Faith Model School Website CRM.<br />
            To manage all leads, please log in to your Admin Dashboard.
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: fromSender,
      to: toEmail,
      subject: `[New Lead] ${leadData.name} - ${leadData.courseInterest || "Admissions"}`,
      html: htmlContent,
    };

    if (ccList.length > 0) {
      mailOptions.cc = ccList;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP EMAIL SENT SUCCESS] MessageId: ${info.messageId} | To: ${toEmail} | CC: ${ccList.join(", ")}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error("[SMTP EMAIL ERROR]:", error);
    let errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("SmtpClientAuthentication is disabled") || errorMessage.includes("5.7.139")) {
      errorMessage = `Microsoft 365 Tenant Security: Authenticated SMTP (SMTP AUTH) is disabled for mailbox "${settings.smtpUser}". Enable SMTP AUTH in Microsoft 365 Admin > Users > Active Users > Mail > Manage email apps.`;
    }

    return { success: false, error: errorMessage };
  }
}
