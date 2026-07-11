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

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    
    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("Failed to submit enquiry:", error);
    return { success: false, error: "Failed to submit enquiry. Please try again." };
  }
}
