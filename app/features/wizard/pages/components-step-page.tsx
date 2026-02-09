import { useWizardStore } from "@stores/useWizardStore";
import { ComponentGrid } from "../components/component-grid";
import { COMPONENT_CATALOG } from "../constants";

export default function ComponentsStepPage() {
  const {
    selectedComponents,
    appShellLayout,
    toggleComponent,
    setSelectedComponents,
  } = useWizardStore();

  const handleSelectAll = (ids: string[]) => {
    const merged = new Set([...selectedComponents, ...ids]);
    setSelectedComponents([...merged]);
  };

  const handleDeselectAll = (ids: string[]) => {
    setSelectedComponents(
      selectedComponents.filter((id) => !ids.includes(id)),
    );
  };

  // 통계
  const requiredIds = COMPONENT_CATALOG
    .filter((c) => c.requiredByLayout.includes(appShellLayout))
    .map((c) => c.id);
  const totalSelected = new Set([...selectedComponents, ...requiredIds]).size;

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">컴포넌트 선택</h2>
          <p className="text-sm text-muted-foreground">
            프로젝트에 포함할 컴포넌트를 선택하세요. 레이아웃에 필수인 컴포넌트는 자동 선택됩니다.
          </p>
        </div>
        <div className="shrink-0 rounded-lg bg-muted px-3 py-1.5 text-sm font-medium">
          {totalSelected} / {COMPONENT_CATALOG.length}개 선택
        </div>
      </div>

      <ComponentGrid
        selectedComponents={selectedComponents}
        appShellLayout={appShellLayout}
        onToggle={toggleComponent}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />
    </div>
  );
}
