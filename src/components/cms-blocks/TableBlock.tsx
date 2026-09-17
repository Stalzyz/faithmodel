import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import { Download, FileText, ExternalLink } from "lucide-react";

export default function TableBlock({ data }: { data: any }) {
  const isFileUrl = (str: string) => {
    if (typeof str !== "string") return false;
    const trimmed = str.trim();
    return (
      trimmed.startsWith("/uploads/") ||
      trimmed.endsWith(".pdf") ||
      trimmed.endsWith(".doc") ||
      trimmed.endsWith(".docx") ||
      (trimmed.startsWith("http") && (trimmed.includes("/uploads/") || trimmed.includes(".pdf")))
    );
  };

  const renderCellContent = (cell: any) => {
    if (typeof cell === "object" && cell !== null && cell.fileUrl) {
      return (
        <a
          href={cell.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-poppins bg-[#FB7F05]/10 text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white transition-all shadow-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{cell.label || "Download PDF"}</span>
          <Download className="w-3 h-3 ml-0.5" />
        </a>
      );
    }

    const cellStr = String(cell || "").trim();
    if (isFileUrl(cellStr)) {
      return (
        <a
          href={cellStr}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-poppins bg-[#FB7F05]/10 text-[#FB7F05] hover:bg-[#FB7F05] hover:text-white transition-all shadow-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Download PDF</span>
          <Download className="w-3 h-3 ml-0.5" />
        </a>
      );
    }

    if (cellStr.startsWith("http://") || cellStr.startsWith("https://")) {
      return (
        <a
          href={cellStr}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-poppins text-xs font-semibold text-[#FB7F05] hover:underline"
        >
          <span>View Link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      );
    }

    return cellStr;
  };

  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-12 py-20 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      
      <SketchReveal delay={0.1}>
        <div className="mt-12 overflow-x-auto rounded-2xl border border-[rgba(74,74,94,0.12)] bg-white shadow-xs">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#f5f1e6] border-b border-[rgba(74,74,94,0.12)]">
                {data.headers?.map((h: string, i: number) => (
                  <th
                    key={i}
                    className="py-4 px-6 font-poppins text-xs font-bold text-[#1a1a2e] uppercase tracking-wider border-r border-[rgba(74,74,94,0.06)] last:border-r-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(74,74,94,0.08)]">
              {data.rows?.map((row: any[], i: number) => (
                <tr
                  key={i}
                  className="hover:bg-[#fcfaf4] transition-colors group"
                >
                  {row.map((cell: any, j: number) => (
                    <td
                      key={j}
                      className="py-4 px-6 font-inter text-sm text-[#4a4a5e] group-hover:text-[#1a1a2e] border-r border-[rgba(74,74,94,0.06)] last:border-r-0 align-middle"
                    >
                      {renderCellContent(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SketchReveal>
    </section>
  );
}

