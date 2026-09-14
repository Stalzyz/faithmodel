import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import * as Icons from "lucide-react";

const SPORTS_ICON_MAP: Record<string, any> = {
  football: Icons.Trophy,
  cricket: Icons.Target,
  basketball: Icons.CircleDot,
  athletics: Icons.Zap,
  "rollar skates": Icons.Flame,
  "roller skates": Icons.Flame,
  "table tennis": Icons.Table,
  chess: Icons.Crown,
  badminton: Icons.Award,
  swimming: Icons.Waves || Icons.Activity,
  tennis: Icons.CircleDot,
  volleyball: Icons.CircleDot,
  gymnastics: Icons.Activity,
  karate: Icons.Shield,
};

function renderIcon(iconName?: string, titleName?: string) {
  const iconStr = (iconName || "").trim();
  const titleStr = (titleName || "").trim().toLowerCase();

  // Check direct Lucide Icon name match
  if (iconStr && (Icons as any)[iconStr]) {
    const IconComponent = (Icons as any)[iconStr];
    return <IconComponent className="w-8 h-8 stroke-[1.5]" />;
  }

  // Check sports title map
  if (SPORTS_ICON_MAP[titleStr]) {
    const IconComponent = SPORTS_ICON_MAP[titleStr];
    return <IconComponent className="w-8 h-8 stroke-[1.5]" />;
  }

  // Check title keywords
  if (titleStr.includes("football")) return <Icons.Trophy className="w-8 h-8 stroke-[1.5]" />;
  if (titleStr.includes("cricket")) return <Icons.Target className="w-8 h-8 stroke-[1.5]" />;
  if (titleStr.includes("basketball")) return <Icons.CircleDot className="w-8 h-8 stroke-[1.5]" />;
  if (titleStr.includes("athletic")) return <Icons.Zap className="w-8 h-8 stroke-[1.5]" />;
  if (titleStr.includes("skate")) return <Icons.Flame className="w-8 h-8 stroke-[1.5]" />;
  if (titleStr.includes("tennis")) return <Icons.Table className="w-8 h-8 stroke-[1.5]" />;
  if (titleStr.includes("chess")) return <Icons.Crown className="w-8 h-8 stroke-[1.5]" />;

  // Default fallback (Trophy/Award instead of HelpCircle)
  const Fallback = Icons.Trophy;
  return <Fallback className="w-8 h-8 stroke-[1.5]" />;
}

export default function IconGridBlock({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] bg-[rgba(210,195,160,0.05)]">
      <SectionHeading annotation={data.annotation || "Disciplines"} title={data.title || "Our Sports Programs"} subtitle={data.subtitle} />
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.items?.map((item: any, i: number) => {
          return (
            <SketchReveal key={i} delay={i * 0.05}>
              <div className="bg-white p-8 border border-[rgba(74,74,94,0.06)] rounded-lg h-full hover:-translate-y-1 transition-transform duration-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-[#c17b5a] mb-6 flex items-center justify-start">
                    {renderIcon(item.icon, item.title)}
                  </div>
                  <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mb-3">{item.title}</h3>
                  {item.desc && <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">{item.desc}</p>}
                </div>
              </div>
            </SketchReveal>
          );
        })}
      </div>
    </section>
  );
}
