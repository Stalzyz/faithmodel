"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitEnquiry(data: {
  name: string;
  phone?: string;
  email?: string;
  courseInterest?: string;
  notes?: string;
}) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        courseInterest: data.courseInterest,
        notes: data.notes,
        source: "WEBSITE",
        status: "NEW",
      },
    });

    // Send email notification to configured admissions and CC emails via SMTP
    let emailResult = null;
    try {
      const { sendLeadNotificationEmail } = await import("@/lib/mail");
      emailResult = await sendLeadNotificationEmail({
        leadId: lead.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        courseInterest: data.courseInterest,
        notes: data.notes,
      });
    } catch (mailErr) {
      console.error("[LEAD EMAIL NOTIFICATION FAILED]:", mailErr);
    }

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/leads");
      revalidatePath("/admin/enquiries");
    } catch {
      // Revalidation may be skipped outside Next.js request context
    }
    
    return { success: true, leadId: lead.id, emailResult };
  } catch (error) {
    console.error("Failed to submit enquiry:", error);
    return { success: false, error: "Failed to submit enquiry. Please try again." };
  }
}
