import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell, ProgressBar } from "@/components/app-shell";
import { checkStats, lessons } from "@/lib/lessons";
import { useStudy } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { checks, cards, lastId } = useStudy();
  const totals = lessons.reduce(
    (sum, lesson) => {
      const stats = checkStats(checks, lesson);
      return { done: sum.done + stats.done, total: sum.total + stats.total };
    },
    { done: 0, total: 0 },
  );
  const knownCards = Object.values(cards).filter((mark) => mark === "known").length;
  const cardTotal = lessons.reduce((sum, lesson) => sum + lesson.cards.length, 0);
  const weakest = [...lessons].sort((a, b) => {
    const left = checkStats(checks, a);
    const right = checkStats(checks, b);
    return left.done / left.total - right.done / right.total;
  })[0];

  return (
    <AppShell>
      <p className="text-sm font-semibold tracking-wide text-seal uppercase">Kết thúc học phần</p>
      <h1 className="font-display mt-2 text-4xl leading-tight font-semibold">
        Giảng từng câu,
        <span className="block">rồi hỏi lại.</span>
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
        Tám câu quản lý nhà nước về kinh tế. Mỗi câu có dàn ý, câu chốt, ví dụ trong đề cương, rồi phần vấn đáp để bạn tự nói trước khi mở bài.
      </p>

      <div className="mt-6 rounded-2xl border border-line bg-card p-4">
        <div className="flex items-end justify-between gap-3">
          <p className="text-sm font-semibold">Ý đã nhớ</p>
          <p className="text-sm text-muted tabular-nums">
            {totals.done}/{totals.total}
          </p>
        </div>
        <div className="mt-2">
          <ProgressBar done={totals.done} total={totals.total} />
        </div>
        <p className="mt-3 text-sm text-muted">
          Thẻ đã thuộc {knownCards}/{cardTotal}. Số liệu Samsung, bộ máy, kim ngạch lấy đúng đề cương ôn — dùng để viết bài, đối chiếu lại giáo trình nếu thầy cô chỉnh số.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Link
          to="/cau/$id"
          params={{ id: String(lastId) }}
          className="flex min-h-11 items-center justify-between rounded-2xl bg-pine px-4 py-3 text-sm font-semibold text-on-pine"
        >
          Tiếp câu {lastId}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Link
          to="/thi"
          className="flex min-h-11 items-center justify-between rounded-2xl border border-line bg-card px-4 py-3 text-sm font-semibold"
        >
          Vấn đáp
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Link
          to="/cau/$id"
          params={{ id: String(weakest?.id ?? 1) }}
          className="flex min-h-11 items-center justify-between rounded-2xl border border-line bg-card px-4 py-3 text-sm font-semibold"
        >
          Câu còn yếu
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <ol className="mt-8 flex flex-col gap-3">
        {lessons.map((lesson) => {
          const stats = checkStats(checks, lesson);
          return (
            <li key={lesson.id}>
              <Link
                to="/cau/$id"
                params={{ id: String(lesson.id) }}
                className="block rounded-2xl border border-line bg-card p-4 transition-colors hover:border-pine"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-seal tabular-nums">
                    {String(lesson.id).padStart(2, "0")}
                  </p>
                  <p className="text-sm text-muted tabular-nums">
                    {stats.done}/{stats.total} ý
                  </p>
                </div>
                <h2 className="font-display mt-1 text-2xl leading-snug font-semibold">{lesson.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{lesson.question}</p>
                <div className="mt-3">
                  <ProgressBar done={stats.done} total={stats.total} />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </AppShell>
  );
}
