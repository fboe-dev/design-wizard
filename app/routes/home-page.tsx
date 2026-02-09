import { Link } from "react-router";
import { Wand2, ArrowRight, Layers, Palette, Component, Sparkles } from "lucide-react";
import { cn } from "@libs/utils";

const FEATURES = [
  {
    icon: <Layers className="h-6 w-6" />,
    title: "레이아웃 선택",
    description: "사이드바, 탑 네비게이션, Dock 중 원하는 앱 구조를 선택",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "디자인 프리미티브",
    description: "폰트, 컬러, 타이포그래피, 스페이싱을 커스터마이즈",
  },
  {
    icon: <Component className="h-6 w-6" />,
    title: "컴포넌트 선택",
    description: "60개 이상의 컴포넌트 중 필요한 것만 선택",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "프롬프트 생성",
    description: "클로드가 바로 실행 가능한 프롬프트 세트 생성",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Wand2 className="h-4 w-4" />
            Design System Generator
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            디자인 시스템을
            <br />
            <span className="text-primary">위저드로 생성하세요</span>
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            레이아웃, 디자인 토큰, 컴포넌트를 단계별로 선택하면
            <br />
            완성된 프로젝트 설정 프롬프트를 생성해 드립니다.
          </p>

          <Link
            to="/wizard/layout"
            className={cn(
              "mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
            )}
          >
            시작하기
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* 기능 카드 */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent/30"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold">{feature.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        Design Wizard &mdash; 새 프로젝트의 디자인 시스템을 빠르게 시작하세요
      </footer>
    </div>
  );
}
