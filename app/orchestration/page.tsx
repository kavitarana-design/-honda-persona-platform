"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";
import EmptyState from "@/components/orchestration/EmptyState";
import PlanState from "@/components/orchestration/PlanState";
import RunningState from "@/components/orchestration/RunningState";
import ResultsReport from "@/components/orchestration/ResultsReport";

type Phase = "empty" | "plan" | "running" | "results";

export default function OrchestrationPage() {
  const [phase, setPhase] = useState<Phase>("empty");

  return (
    <AppShell active="orchestration">
      <Topbar
        title="Orchestration Agent"
        sub={phase === "results" ? "Research Report" : undefined}
        right={<WorkspaceCard />}
      />

      <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        {phase === "empty" && <EmptyState onSubmit={() => setPhase("plan")} />}
        {phase === "plan" && <PlanState onEdit={() => setPhase("empty")} onRun={() => setPhase("running")} />}
        {phase === "running" && <RunningState onEdit={() => setPhase("plan")} onDone={() => setPhase("results")} />}
        {phase === "results" && <ResultsReport onReRun={() => setPhase("running")} />}
      </div>
    </AppShell>
  );
}
