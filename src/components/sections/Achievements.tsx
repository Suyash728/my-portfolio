import { Panel } from "@/components/Panel";
import { Row, RowList } from "@/components/Row";
import { achievements, activities } from "@/content/achievements";
import { Trophy, Award, FileCheck } from "lucide-react";

const TOP_WINS = [
  {
    tone: "orange",
    badge: "1st Place · CodeFusion 2026",
    title: "National Innovation Challenge",
    detail: "MediSync 2.0 (Team Error404) · Marwadi University × HackerRank Campus Crew.",
    year: "2026",
    icon: Trophy,
  },
  {
    tone: "orange",
    badge: "$1,000 Track Winner · INNOVATE 2026",
    title: "Adaption AI Multilingual Track",
    detail: "AeroMed India · Pan-India Air Quality & Respiratory Disease Surveillance.",
    year: "2026",
    icon: Award,
  },
  {
    tone: "teal",
    badge: "Published Paper · IJIRCEE 2024",
    title: "Autonomous Cellular Telematics",
    detail: "IJIRCEE Vol. 12 (Feb 2024) · Multipurpose IoT Tracker standalone cellular firmware.",
    year: "2024",
    icon: FileCheck,
  },
];

export function Achievements() {
  // Remaining discrete timeline items beyond the 3 spotlight trophies
  const remainingAchievements = achievements.filter(
    (item) =>
      !item.title.includes("CodeFusion 2026") &&
      !item.title.includes("INNOVATE 2026") &&
      !item.title.includes("IJIRCEE")
  );

  return (
    <Panel id="achievements" heading="Achievements & Placements">
      {/* Top 3 Gleaming Trophy Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {TOP_WINS.map((win) => {
          const Icon = win.icon;
          const isOrange = win.tone === "orange";

          return (
            <div
              key={win.badge}
              className={`bento-card p-5 flex flex-col justify-between transition-all ${
                isOrange
                  ? "border-accent-orange/40 hover:border-accent-orange shadow-[0_0_16px_rgba(161,55,6,0.08)] bg-gradient-to-b from-surface via-surface to-accent-orange/5"
                  : "border-signal-teal/40 hover:border-signal-teal shadow-[0_0_16px_rgba(15,92,110,0.08)] bg-gradient-to-b from-surface via-surface to-signal-teal/5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-rule-soft pb-2.5 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 font-narrow text-tiny uppercase tracking-eyebrow font-semibold border ${
                      isOrange
                        ? "border-accent-orange/50 bg-surface text-accent-orange"
                        : "border-signal-teal/50 bg-surface text-signal-teal"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span>{win.badge}</span>
                  </span>
                  <span className="font-mono text-tiny text-muted tabular-nums">
                    {win.year}
                  </span>
                </div>

                <h3 className="font-sans text-lead font-semibold text-ink mb-1.5 leading-snug">
                  {win.title}
                </h3>

                <p className="font-sans text-small text-muted leading-relaxed">
                  {win.detail}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rule-soft flex items-center justify-between font-narrow text-tiny uppercase tracking-eyebrow">
                <span className="text-muted">Verified Placement</span>
                <span className={`flex items-center gap-1 font-semibold ${isOrange ? "text-accent-orange" : "text-signal-teal"}`}>
                  <span className={`size-1.5 rounded-full ${isOrange ? "bg-accent-orange" : "bg-signal-teal"}`} />
                  Honors Winner
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discrete Timeline & Hackathon Activities */}
      <RowList>
        {remainingAchievements.map((item, index) => (
          <Row key={item.title} marker={item.marker} first={index === 0}>
            <h3 className="text-lead font-semibold tracking-tight">
              {item.title}
            </h3>
            {item.detail ? (
              <p className="mt-1 text-small text-muted">{item.detail}</p>
            ) : null}
          </Row>
        ))}
        {activities.map((item) => (
          <Row key={item.marker} marker={item.marker}>
            <p className="text-small text-muted">{item.text}</p>
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}
