const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/app/(public)/[...slug]/page.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Add imports
const newImports = `
import WelcomeBlock from "@/components/cms-blocks/WelcomeBlock";
import StatsBlock from "@/components/cms-blocks/StatsBlock";
import WhyChooseUsBlock from "@/components/cms-blocks/WhyChooseUsBlock";
import PhilosophySectionBlock from "@/components/cms-blocks/PhilosophySectionBlock";
import AcademicExcellenceBlock from "@/components/cms-blocks/AcademicExcellenceBlock";
import StudentJourneyBlock from "@/components/cms-blocks/StudentJourneyBlock";
import CampusExperienceBlock from "@/components/cms-blocks/CampusExperienceBlock";
import FacilitiesOverviewBlock from "@/components/cms-blocks/FacilitiesOverviewBlock";
import FeaturedProgramsBlock from "@/components/cms-blocks/FeaturedProgramsBlock";
import AchievementsTickerBlock from "@/components/cms-blocks/AchievementsTickerBlock";
import UpcomingEventsBlock from "@/components/cms-blocks/UpcomingEventsBlock";
import TestimonialsBlock from "@/components/cms-blocks/TestimonialsBlock";
import CustomHTMLBlock from "@/components/cms-blocks/CustomHTMLBlock";
`;

content = content.replace(
  'import SketchbookHeroBlock from "@/components/cms-blocks/SketchbookHeroBlock";',
  'import SketchbookHeroBlock from "@/components/cms-blocks/SketchbookHeroBlock";\n' + newImports
);

// 2. Add to switch cases
const newCases = `
            case "WELCOME_BLOCK":
               return <WelcomeBlock key={block.id} block={block} />;
            case "STATS_BLOCK":
               return <StatsBlock key={block.id} block={block} />;
            case "WHY_CHOOSE_US_BLOCK":
               return <WhyChooseUsBlock key={block.id} block={block} />;
            case "PHILOSOPHY_SECTION_BLOCK":
               return <PhilosophySectionBlock key={block.id} block={block} />;
            case "ACADEMIC_EXCELLENCE_BLOCK":
               return <AcademicExcellenceBlock key={block.id} block={block} />;
            case "STUDENT_JOURNEY_BLOCK":
               return <StudentJourneyBlock key={block.id} block={block} />;
            case "CAMPUS_EXPERIENCE_BLOCK":
               return <CampusExperienceBlock key={block.id} block={block} />;
            case "FACILITIES_OVERVIEW_BLOCK":
               return <FacilitiesOverviewBlock key={block.id} block={block} />;
            case "FEATURED_PROGRAMS_BLOCK":
               return <FeaturedProgramsBlock key={block.id} block={block} />;
            case "ACHIEVEMENTS_TICKER_BLOCK":
               return <AchievementsTickerBlock key={block.id} block={block} />;
            case "UPCOMING_EVENTS_BLOCK":
               return <UpcomingEventsBlock key={block.id} block={block} />;
            case "TESTIMONIALS_BLOCK":
               return <TestimonialsBlock key={block.id} block={block} />;
            case "CUSTOM_HTML_BLOCK":
               return <CustomHTMLBlock key={block.id} block={block} />;
`;

content = content.replace(
  /case 'GALLERY_BLOCK':\s+return <GalleryBlock key=\{block.id\} block=\{block\} \/>;/,
  "case 'GALLERY_BLOCK':\n              return <GalleryBlock key={block.id} block={block} />;\n" + newCases
);

fs.writeFileSync(targetPath, content);
console.log('Updated [...slug]/page.tsx');
