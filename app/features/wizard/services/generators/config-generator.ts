import type { WizardState, GeneratedPrompt } from "../../types";

export function generateConfigPrompt(state: WizardState): GeneratedPrompt {
  const radixPackages = getRadixPackages(state);

  return {
    id: "project-config",
    title: "프로젝트 설정 파일",
    description: "package.json, vite.config.ts, tsconfig.json 등 프로젝트 기본 설정을 생성합니다",
    order: 1,
    content: `# 프로젝트 기본 설정 구현

## 목표
React Router v7 + React 19 + Tailwind CSS v4 + Vite 6 + TypeScript 기반 프로젝트의 설정 파일들을 생성하세요.

## 파일 목록

### 1. package.json
\`\`\`json
{
  "name": "my-design-system",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "react-router build",
    "dev": "react-router dev",
    "start": "react-router-serve ./build/server/index.js",
    "typecheck": "react-router typegen && tsc"
  },
  "dependencies": {
    ${radixPackages.map((p) => `"${p}": "latest"`).join(",\n    ")},
    "@react-router/node": "^7.7.1",
    "@react-router/serve": "^7.7.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.544.0",
    "motion": "^12.29.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router": "^7.7.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.3.1",
    "zod": "^4.1.11",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@react-router/dev": "^7.7.1",
    "@tailwindcss/vite": "^4.1.4",
    "@types/node": "^20",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "sass-embedded": "^1.93.2",
    "tailwindcss": "^4.1.4",
    "tw-animate-css": "^1.3.8",
    "typescript": "^5.8.3",
    "vite": "^6.3.3",
    "vite-tsconfig-paths": "^5.1.4"
  }
}
\`\`\`

### 2. vite.config.ts
\`\`\`typescript
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { host: "0.0.0.0", port: 5173, strictPort: true },
  build: { target: "esnext" },
  optimizeDeps: { esbuildOptions: { target: "esnext" } },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
\`\`\`

### 3. tsconfig.json
paths alias를 포함해야 합니다:
- \`@shared/*\` → \`app/shared/*\`
- \`@components/*\` → \`app/shared/components/*\`
- \`@hooks/*\` → \`app/shared/hooks/*\`
- \`@libs/*\` → \`app/shared/libs/*\`
- \`@stores/*\` → \`app/shared/stores/*\`
- \`~/*\` → \`./app/*\`

### 4. react-router.config.ts
SSR: true 설정

### 5. .gitignore
node_modules, .react-router, build 디렉토리 제외

### 6. app/shared/libs/utils.ts
\`\`\`typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\`\`\`

## 폴더 구조
\`\`\`
app/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── libs/
│   │   └── utils.ts
│   └── stores/
├── routes/
├── root.tsx
├── app.css
└── routes.ts
\`\`\`
`,
  };
}

function getRadixPackages(state: WizardState): string[] {
  const pkgMap: Record<string, string> = {
    checkbox: "@radix-ui/react-checkbox",
    dialog: "@radix-ui/react-dialog",
    "alert-dialog": "@radix-ui/react-dialog",
    "page-dialog": "@radix-ui/react-dialog",
    label: "@radix-ui/react-label",
    popover: "@radix-ui/react-popover",
    progress: "@radix-ui/react-progress",
    radio: "@radix-ui/react-radio-group",
    "scroll-area": "@radix-ui/react-scroll-area",
    select: "@radix-ui/react-select",
    separator: "@radix-ui/react-separator",
    slider: "@radix-ui/react-slider",
    switch: "@radix-ui/react-switch",
    tabs: "@radix-ui/react-tabs",
    toggle: "@radix-ui/react-toggle",
    "toggle-group": "@radix-ui/react-toggle-group",
    tooltip: "@radix-ui/react-tooltip",
    collapsible: "@radix-ui/react-collapsible",
    accordion: "@radix-ui/react-accordion",
    "hover-card": "@radix-ui/react-hover-card",
    "navigation-menu": "@radix-ui/react-navigation-menu",
    menubar: "@radix-ui/react-menubar",
    "context-menu": "@radix-ui/react-context-menu",
    "dropdown-menu": "@radix-ui/react-dropdown-menu",
    "aspect-ratio": "@radix-ui/react-aspect-ratio",
  };

  const packages = new Set<string>(["@radix-ui/react-slot"]);
  for (const id of state.selectedComponents) {
    const pkg = pkgMap[id];
    if (pkg) packages.add(pkg);
  }
  return [...packages].sort();
}
