import { cn } from "@libs/utils";
import { Check, Lock } from "lucide-react";
import { COMPONENT_CATALOG, CATEGORY_META } from "../constants";
import type { ComponentCategory, AppShellLayout } from "../types";

interface ComponentGridProps {
  selectedComponents: string[];
  appShellLayout: AppShellLayout;
  onToggle: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onDeselectAll: (ids: string[]) => void;
}

export function ComponentGrid({
  selectedComponents,
  appShellLayout,
  onToggle,
  onSelectAll,
  onDeselectAll,
}: ComponentGridProps) {
  const categories = Object.keys(CATEGORY_META) as ComponentCategory[];

  // 레이아웃에 필수인 컴포넌트 ID 목록
  const requiredIds = new Set(
    COMPONENT_CATALOG
      .filter((c) => c.requiredByLayout.includes(appShellLayout))
      .map((c) => c.id),
  );

  // 선택된 컴포넌트의 의존성에 의해 자동 포함되는 목록
  const autoIncluded = new Set<string>();
  function resolveDeps(id: string) {
    const comp = COMPONENT_CATALOG.find((c) => c.id === id);
    if (!comp) return;
    for (const dep of comp.dependencies) {
      if (!autoIncluded.has(dep)) {
        autoIncluded.add(dep);
        resolveDeps(dep);
      }
    }
  }
  for (const id of selectedComponents) {
    resolveDeps(id);
  }
  for (const id of requiredIds) {
    resolveDeps(id);
  }

  const isChecked = (id: string) =>
    requiredIds.has(id) || autoIncluded.has(id) || selectedComponents.includes(id);
  const isLocked = (id: string) => requiredIds.has(id) || autoIncluded.has(id);

  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        const items = COMPONENT_CATALOG.filter((c) => c.category === cat);
        const meta = CATEGORY_META[cat];
        const allIds = items.map((c) => c.id);
        const allChecked = allIds.every((id) => isChecked(id));

        return (
          <section key={cat} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">{meta.label}</h3>
              <button
                type="button"
                onClick={() => {
                  if (allChecked) {
                    // 잠긴 것은 제외하고 선택 해제
                    const unlocked = allIds.filter((id) => !isLocked(id));
                    onDeselectAll(unlocked);
                  } else {
                    onSelectAll(allIds);
                  }
                }}
                className="cursor-pointer text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {allChecked ? "전체 해제" : "전체 선택"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((comp) => {
                const checked = isChecked(comp.id);
                const locked = isLocked(comp.id);

                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => {
                      if (!locked) onToggle(comp.id);
                    }}
                    disabled={locked}
                    className={cn(
                      "relative flex items-start gap-3 rounded-lg border p-3 text-left transition-all",
                      checked
                        ? "border-primary/60 bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-accent/30",
                      locked ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                    )}
                  >
                    {/* 체크마크 */}
                    <div
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30",
                      )}
                    >
                      {checked && <Check className="h-3 w-3" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium">{comp.name}</p>
                        {locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {comp.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
