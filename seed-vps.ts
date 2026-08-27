import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@faithmodel.com" },
    update: {},
    create: {
      email: "admin@faithmodel.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created/verified:", admin.email);

  // 2. Create Home Page
  const blocks = [
    { id: 'hero', type: 'HOMEPAGE_HERO_BLOCK', data: {} },
    { id: 'welcome', type: 'WELCOME_BLOCK', data: { logoText: "FM", title: "Welcome to Faith Model", quote: "At Faith Model School, we believe that education is not merely the transmission of knowledge, but the ignition of curiosity. Every child who walks through our gate carries within them the seeds of something extraordinary.", author: "Amina M., M.A., B.Ed.", role: "Principal, Faith Model School" } },
    { id: 'stats', type: 'STATS_BLOCK', data: { annotation: "School at a Glance", title: "By the Numbers", stats: [
        { num: "35+", label: "Years of Excellence", note: "Est. 1989" },
        { num: "2,500+", label: "Students Enrolled", note: "Across all grades" },
        { num: "100%", label: "CBSE Board Results", note: "Consecutive 10 years" },
        { num: "15 ac", label: "Green Campus", note: "Eco-certified" },
        { num: "180+", label: "Faculty Members", note: "Qualified & dedicated" },
        { num: "48+", label: "Awards & Trophies", note: "2024–25 alone" },
    ] } },
    { id: 'why', type: 'WHY_CHOOSE_US_BLOCK', data: { annotation: "Why Faith Model?", title: "Our Educational Promise", subtitle: "We go beyond traditional schooling to craft an environment where curiosity leads, creativity flourishes, and every child is celebrated.", pillars: [
        { icon: "Sparkles", title: "Academic Excellence", desc: "Rigorous CBSE curriculum enhanced with global standards, project-based learning, and critical thinking programs." },
        { icon: "◉", title: "Holistic Development", desc: "Sport, Arts, Music, Drama, Coding, Robotics — every child discovers their unique genius." },
        { icon: "◈", title: "Expert Faculty", desc: "180+ qualified educators with an industry-leading 1:15 student-teacher ratio for personalised attention." },
        { icon: "❋", title: "Safe & Nurturing", desc: "CCTV-monitored, RFID-secured, GPS-tracked transport — your child's safety is our first promise." },
        { icon: "⬡", title: "Future-Ready Skills", desc: "AI Lab, Robotics, IoT, 3D Printing, and a dedicated Innovation Centre for the leaders of tomorrow." },
        { icon: "◎", title: "15-Acre Green Campus", desc: "Eco-certified campus with gardens, nature trails, and sustainably designed learning spaces." },
    ] } },
    { id: 'philosophy', type: 'PHILOSOPHY_SECTION_BLOCK', data: { annotation: "Our Philosophy", title: "Where Curiosity Meets Character", subtitle: "Faith Model School follows the belief that every child is uniquely talented. Our curriculum is designed not to fill a bucket, but to light a fire — nurturing thinkers, creators, leaders, and compassionate human beings.", items: ["Inquiry-Based Learning", "Value Education at Every Level", "Experiential & Project-Based Pedagogy", "Social-Emotional Learning Framework", "Global Mindset with Indian Values"], imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80", imageCaption: "igniting curiosity →" } },
    { id: 'academic', type: 'ACADEMIC_EXCELLENCE_BLOCK', data: { annotation: "Academics", title: "A Journey of Learning", subtitle: "From first steps to board exams, every stage of your child's education is thoughtfully crafted for success.", programs: [
        { title: "Pre-Primary", age: "Ages 3–5", desc: "Play-based learning, sensory exploration, and foundational skill building in a joyful, safe environment." },
        { title: "Primary School", age: "Grades 1–5", desc: "Core academics with integrated arts, sports, and digital literacy. Strong emphasis on reading and mathematical thinking." },
        { title: "Middle School", age: "Grades 6–8", desc: "Critical thinking, project-based learning, and introduction to STEM, coding, and leadership programs." },
        { title: "Secondary School", age: "Grades 9–10", desc: "CBSE board preparation with focused academics, life skills, and career orientation programs." },
        { title: "Senior Secondary", age: "Grades 11–12", desc: "Science and Commerce streams with optional vocational subjects. University counselling and placement guidance." },
    ] } },
    { id: 'journey', type: 'STUDENT_JOURNEY_BLOCK', data: { annotation: "The Journey", title: "Your Child's Story at Faith Model", stages: [
        { year: "Age 3", label: "Pre-KG", icon: "🌱" },
        { year: "Age 5", label: "Primary", icon: "BookOpen" },
        { year: "Age 11", label: "Middle School", icon: "Microscope" },
        { year: "Age 14", label: "Secondary", icon: "Lightbulb" },
        { year: "Age 16", label: "Senior Secondary", icon: "🎓" },
        { year: "Age 18", label: "University", icon: "Globe" },
    ] } },
    { id: 'campus', type: 'CAMPUS_EXPERIENCE_BLOCK', data: { annotation: "Campus Life", title: "A World of Possibilities", subtitle: "Our 15-acre campus is designed as a second home — every corner crafted to inspire exploration, connection, and growth.", image1: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80", image2: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80", features: ["Smart Classrooms with interactive technology", "Olympic-standard swimming pool & sports grounds", "Dedicated AI, Robotics & Innovation labs", "Performing arts theatre and music studios", "Cafeteria serving healthy, nutritious meals", "Medical centre with on-campus counsellor"], ctaText: "Explore the Campus →", ctaLink: "/campus" } },
    { id: 'facilities', type: 'FACILITIES_OVERVIEW_BLOCK', data: { annotation: "Infrastructure", title: "World-Class Facilities", subtitle: "Every space is designed to ignite a different kind of spark.", facilities: [
        { icon: "Microscope", label: "Science Labs", sub: "Physics · Chemistry · Biology" },
        { icon: "🤖", label: "Robotics & AI Lab", sub: "Microsoft Showcase" },
        { icon: "BookOpen", label: "Digital Library", sub: "12,000+ volumes" },
        { icon: "🎭", label: "Auditorium", sub: "800-seat capacity" },
        { icon: "🏊", label: "Swimming Pool", sub: "Olympic standard" },
        { icon: "Palette", label: "Art Studios", sub: "Fine Arts & Craft" },
        { icon: "🎵", label: "Music Room", sub: "Vocal & Instrumental" },
        { icon: "Monitor", label: "Computer Lab", sub: "100+ workstations" },
    ], ctaText: "View All 28 Facilities →", ctaLink: "/facilities" } },
    { id: 'featured', type: 'FEATURED_PROGRAMS_BLOCK', data: { annotation: "Signature Programs", title: "Featured Programs", subtitle: "Beyond the classroom — programs that discover and develop each child's unique potential.", programs: [
        { title: "STEM Excellence Program", tag: "Academics", desc: "Integrated Science, Technology, Engineering, and Mathematics with hands-on project labs and Olympiad preparation.", href: "/academics#stem" },
        { title: "Young Leaders Initiative", tag: "Leadership", desc: "Student council, Model UN, public speaking, and structured mentorship programs to build tomorrow's leaders.", href: "/student-life#leadership" },
        { title: "Performing Arts Academy", tag: "Arts", desc: "Professional training in music, dance, drama, and fine arts from experienced performing artists.", href: "/arts" },
        { title: "Sports Excellence Track", tag: "Sports", desc: "Professional coaching in cricket, basketball, swimming, athletics, and chess with state-level competition exposure.", href: "/sports" },
        { title: "AI & Future Skills Lab", tag: "Innovation", desc: "Coding, AI fundamentals, robotics, IoT, and 3D printing — the skills that will define the next decade.", href: "/innovation" },
        { title: "International Language Program", tag: "Languages", desc: "English, Tamil, Hindi, French, and German language labs with Cambridge and DELF certification pathways.", href: "/academics#languages" },
    ] } },
    { id: 'ticker', type: 'ACHIEVEMENTS_TICKER_BLOCK', data: { items: [
        { icon: "Trophy", text: "National Science Olympiad Champions 2025" },
        { icon: "Medal", text: "CBSE Cluster Athletics Gold Medal" },
        { icon: "Theater", text: "State Drama Festival Best Production" },
        { icon: "Monitor", text: "NASSCOM Young Coder Award" },
        { icon: "Leaf", text: "Green School National Award" },
        { icon: "BookOpen", text: "100% Board Pass Rate — 10 consecutive years" },
        { icon: "Bot", text: "FIRST Robotics Qualifier 2025" },
        { icon: "Music", text: "National Music Talent Award" }
    ] } },
    { id: 'events', type: 'UPCOMING_EVENTS_BLOCK', data: { annotation: "Mark the Calendar", title: "Upcoming Events", ctaText: "View Full Calendar →", ctaLink: "/news#events", events: [
        { date: "Aug 15", title: "Independence Day Celebration", type: "Celebration", desc: "School-wide flag hoisting, cultural performances, and patriotic programs." },
        { date: "Sep 5", title: "Teachers' Day Awards", type: "Event", desc: "Honouring our exceptional faculty with student-led performances and awards ceremony." },
        { date: "Oct 2", title: "Annual Science Exhibition", type: "Academic", desc: "Student projects on display — open to parents and the wider community." },
        { date: "Nov 14", title: "Children's Day Annual Fest", type: "Festival", desc: "A day of joy, talent, games, and celebration exclusively for our students." },
    ] } },
    { id: 'testimonials', type: 'TESTIMONIALS_BLOCK', data: { annotation: "What Our Parents Say", testimonials: [
        { name: "Priya & Rajan Sharma", child: "Parent of Arjun, Grade 9", quote: "The transformation we've seen in our son over three years at Faith Model is extraordinary. He's not just performing better academically — he's grown into a thoughtful, confident young man." },
        { name: "Dr. Anitha Krishnamurthy", child: "Parent of Meera, Grade 11", quote: "As a doctor, I was particularly impressed by the Science labs and the way teachers kindle genuine curiosity. Meera now talks about research as a career — at 16!" },
        { name: "Mr. & Mrs. Mohammed Ibrahim", child: "Parents of twins, Grades 6 & 8", quote: "The faculty here truly understands that every child is different. Both our children have completely different personalities, and the school nurtures each of them uniquely." },
        { name: "Sarah & James Peterson", child: "Parent of Emma, Grade 4", quote: "We moved from the UK and were worried about the transition. Faith Model made it seamless. The warmth of the teachers and the quality of the environment exceeded everything we expected." },
    ] } }
  ];
  
  const payload = {
    blocks: blocks,
    seo: { title: "Faith Model School", description: "Empowering minds, shaping futures since 1989." }
  };

  const home = await prisma.page.upsert({
    where: { slug: "" },
    update: {
      title: "Home",
      content: JSON.stringify(payload),
      isPublished: true,
    },
    create: {
      title: "Home",
      slug: "",
      content: JSON.stringify(payload),
      isPublished: true,
    },
  });
  console.log("Home page seeded successfully!");

  // 3. Create Navigation Settings
  const DEFAULT_TOP_NAV = [
    {
      title: "About",
      items: [
        { label: "Our Story", href: "/about" },
        { label: "Leadership", href: "/leadership" },
        { label: "Careers", href: "/careers" },
        { label: "Disclosures", href: "/mandatory-disclosure" }
      ]
    },
    {
      title: "Academics",
      items: [
        { label: "Approach", href: "/academics" },
        { label: "School Levels", href: "/school-levels" },
        { label: "Teachers", href: "/teachers" },
        { label: "Innovation", href: "/innovation" }
      ]
    },
    {
      title: "Campus",
      items: [
        { label: "The Campus", href: "/campus" },
        { label: "Facilities", href: "/facilities" },
        { label: "Sports", href: "/sports" },
        { label: "Arts", href: "/arts" },
        { label: "Student Life", href: "/student-life" },
        { label: "Safety", href: "/safety" }
      ]
    },
    {
      title: "Community",
      items: [
        { label: "News", href: "/news" },
        { label: "Gallery", href: "/gallery" },
        { label: "Students", href: "/students" },
        { label: "Parents", href: "/parents" },
        { label: "Alumni", href: "/alumni" }
      ]
    },
    {
      title: "Admissions",
      items: [
        { label: "Admissions", href: "/admissions" },
        { label: "Portals", href: "/portals" },
        { label: "Downloads", href: "/downloads" },
        { label: "Contact Us", href: "/contact" }
      ]
    }
  ];
  
  await prisma.setting.upsert({
    where: { key: "TOP_NAV" },
    update: { value: JSON.stringify(DEFAULT_TOP_NAV) },
    create: {
      key: "TOP_NAV",
      value: JSON.stringify(DEFAULT_TOP_NAV),
    },
  });
  console.log("Navigation settings seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
