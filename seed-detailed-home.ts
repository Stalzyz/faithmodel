const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const page = await prisma.page.upsert({
    where: { slug: "" },
    update: {
      title: "Home",
      isPublished: true,
      content: JSON.stringify({
        blocks: [
          {
            id: "hero",
            type: "SKETCHBOOK_HERO",
            data: {}
          },
          {
            id: "stats",
            type: "ICON_GRID_BLOCK",
            data: {
              annotation: "At a Glance",
              title: "By the Numbers",
              items: [
                { icon: "Users", title: "1200+", desc: "Students" },
                { icon: "Trophy", title: "35+", desc: "Years of Excellence" },
                { icon: "GraduationCap", title: "100%", desc: "Pass Rate" }
              ]
            }
          },
          {
            id: "philosophy",
            type: "PHILOSOPHY_SPLIT",
            data: {
              annotation: "Our Philosophy",
              title: "The Faith Model Difference",
              subtitle: "We believe in a holistic approach to education.",
              contentHtml: "<p>Our curriculum is designed to foster critical thinking, creativity, and character development.</p>",
              imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
            }
          },
          {
            id: "journey",
            type: "STEPS_BLOCK",
            data: {
              annotation: "The Journey",
              title: "Student Life Cycle",
              steps: [
                { title: "Primary", desc: "Building strong foundations.", icon: "BookOpen" },
                { title: "Middle", desc: "Exploring interests.", icon: "Microscope" },
                { title: "High School", desc: "Preparing for the future.", icon: "GraduationCap" }
              ]
            }
          },
          {
            id: "gallery",
            type: "GALLERY_BLOCK",
            data: {
              title: "Campus Life",
              category: "campus"
            }
          },
          {
            id: "faqs",
            type: "ACCORDION_BLOCK",
            data: {
              annotation: "Common Questions",
              title: "Frequently Asked Questions",
              items: [
                { q: "What is the admission process?", a: "Admissions involve submitting an online application, appearing for a grade-appropriate assessment, and an interaction with our counselling team." },
                { q: "What is the student-teacher ratio?", a: "We maintain a strict 1:15 student-to-teacher ratio across all grades." },
                { q: "Does Faith Model offer scholarships?", a: "We offer merit-based and need-based scholarships for academically exceptional students." }
              ]
            }
          }
        ]
      })
    },
    create: {
      slug: "",
      title: "Home",
      isPublished: true,
      content: JSON.stringify({
        blocks: [
          { id: "hero", type: "SKETCHBOOK_HERO", data: {} },
          { id: "stats", type: "ICON_GRID_BLOCK", data: { annotation: "At a Glance", title: "By the Numbers", items: [ { icon: "Users", title: "1200+", desc: "Students" } ] } },
          { id: "faqs", type: "ACCORDION_BLOCK", data: { annotation: "Common Questions", title: "Frequently Asked Questions", items: [ { q: "What is the admission process?", a: "Admissions involve an online application." } ] } }
        ]
      })
    }
  });

  console.log("Successfully seeded homepage!", page.slug);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
