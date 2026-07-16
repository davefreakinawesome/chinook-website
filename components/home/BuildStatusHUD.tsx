import { buildStatus } from "@/lib/site";
import { formatDate } from "@/lib/format";
import ProgressMeter from "@/components/ui/ProgressMeter";
import Counter from "@/components/anim/Counter";

export default function BuildStatusHUD() {
  return (
    <div className="border border-line bg-graphite/30">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="label-mono">Build Status</span>
        <span className="label-mono-muted">Updated {formatDate(buildStatus.lastUpdate)}</span>
      </div>
      <div className="grid gap-px bg-line md:grid-cols-4">
        <div className="bg-charcoal p-5">
          <p className="label-mono-muted">Current Phase</p>
          <p className="mt-2 font-display text-2xl uppercase leading-none text-bone">
            {buildStatus.currentPhase}
          </p>
        </div>
        <div className="bg-charcoal p-5">
          <p className="label-mono-muted">Next Milestone</p>
          <p className="mt-2 font-display text-2xl uppercase leading-none text-bone">
            {buildStatus.nextMilestone}
          </p>
        </div>
        <div className="bg-charcoal p-5">
          <p className="label-mono-muted">Overall Progress</p>
          <p className="mt-2 font-display text-5xl leading-none text-accent">
            <Counter value={buildStatus.progress} suffix="%" />
          </p>
        </div>
        <div className="bg-charcoal p-5">
          <p className="label-mono-muted">Systems Underway</p>
          <p className="mt-2 font-display text-5xl leading-none text-bone">
            <Counter value={6} />
          </p>
        </div>
      </div>
      <div className="px-5 py-4">
        <ProgressMeter value={buildStatus.progress} label="Chassis to first trip" />
      </div>
    </div>
  );
}
