import { useState, useMemo } from "react";
import { useWizardStore } from "@stores/useWizardStore";
import { generatePrompts } from "../services/code-generator";
import { cn } from "@libs/utils";
import { Copy, Check, ChevronDown, ChevronRight, FileText, Sparkles, ClipboardList } from "lucide-react";
import type { GeneratedPrompt } from "../types";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "복사됨" : "복사"}
    </button>
  );
}

function CopyAllButton({ prompts }: { prompts: GeneratedPrompt[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    const all = prompts
      .map((p) => `${"=".repeat(60)}\n프롬프트 ${p.order}: ${p.title}\n${"=".repeat(60)}\n\n${p.content}`)
      .join("\n\n\n");
    await navigator.clipboard.writeText(all);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopyAll}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
        "bg-primary text-primary-foreground hover:bg-primary/90",
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
      {copied ? "전체 복사됨!" : "전체 프롬프트 복사"}
    </button>
  );
}

function PromptCard({ prompt, defaultOpen = false }: { prompt: GeneratedPrompt; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-3 p-4 text-left"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
          {prompt.order}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{prompt.title}</p>
          <p className="text-xs text-muted-foreground">{prompt.description}</p>
        </div>
        <CopyButton text={prompt.content} />
      </button>

      {open && (
        <div className="border-t border-border">
          <pre className="max-h-[500px] overflow-auto p-4 text-xs leading-relaxed text-foreground/80">
            <code>{prompt.content}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default function OutputStepPage() {
  const state = useWizardStore();

  const output = useMemo(() => generatePrompts(state), [
    state.appShellLayout,
    state.pageLayout,
    state.font,
    state.typography,
    state.spacing,
    state.radius,
    state.color,
    state.designStyle,
    state.platformTarget,
    state.selectedComponents,
  ]);

  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 space-y-6">
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            생성된 프롬프트
          </h2>
          <p className="text-sm text-muted-foreground">
            {output.prompts.length}개의 프롬프트가 생성되었습니다. 순서대로 클로드에게 전달하세요.
          </p>
        </div>
        <CopyAllButton prompts={output.prompts} />
      </div>

      {/* 요약 */}
      <div className="rounded-xl border border-border bg-muted/30">
        <button
          type="button"
          onClick={() => setShowSummary(!showSummary)}
          className="flex w-full cursor-pointer items-center gap-3 p-4 text-left"
        >
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">생성 요약</span>
          {showSummary ? (
            <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {showSummary && (
          <div className="border-t border-border p-4">
            <pre className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {output.summary}
            </pre>
          </div>
        )}
      </div>

      {/* 프롬프트 목록 */}
      <div className="space-y-3">
        {output.prompts.map((prompt, i) => (
          <PromptCard key={prompt.id} prompt={prompt} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
}
