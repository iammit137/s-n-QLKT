import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Layers, MessagesSquare } from "lucide-react";

const NAV = [
  { to: "/", label: "Mục lục", icon: BookOpen, exact: true },
  { to: "/the", label: "Thẻ", icon: Layers, exact: false },
  { to: "/thi", label: "Vấn đáp", icon: MessagesSquare, exact: false },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="min-w-0">
            <span className="block text-xs font-semibold tracking-wide text-seal uppercase">Sổ ôn</span>
            <span className="font-display block truncate text-lg leading-tight font-semibold">QLNN về kinh tế</span>
          </Link>
          <nav className="flex shrink-0 gap-1" aria-label="Chế độ ôn">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium " +
                    (active ? "bg-pine text-on-pine" : "text-muted hover:bg-card")
                  }
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl px-4 py-6 pb-16">{children}</main>
    </div>
  );
}

export function ProgressBar({ done, total }: { done: number; total: number }) {
  const ratio = total === 0 ? 0 : done / total;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
      <div className="h-full rounded-full bg-pine" style={{ width: `${ratio * 100}%` }} />
    </div>
  );
}
