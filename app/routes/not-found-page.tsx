import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-extrabold text-muted-foreground">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">페이지를 찾을 수 없습니다</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
