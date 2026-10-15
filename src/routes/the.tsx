import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { allCards, lessons } from "@/lib/lessons";
import { useStudy } from "@/lib/progress";

export const Route = createFileRoute("/the")({ component: CardsPage });

function CardsPage() {
  const { cards, setCard } = useStudy();
  const [lessonId, setLessonId] = useState<number | "all">("all");
  const [onlyAgain, setOnlyAgain] = useState(false);
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const deck = useMemo(() => {
    return allCards().filter((card) => {
      if (lessonId !== "all" && card.lessonId !== lessonId) return false;
      if (onlyAgain && cards[card.id] === "known") return false;
      return true;
    });
  }, [lessonId, onlyAgain, cards]);

  const safeIndex = deck.length === 0 ? 0 : index % deck.length;
  const current = deck[safeIndex];

  function move(step: number) {
    if (deck.length === 0) return;
    setShowBack(false);
    setIndex((value) => (value + step + deck.length) % deck.length);
  }

  return (
    <AppShell>
      <p className="text-sm font-semibold tracking-wide text-seal uppercase">Bộ thẻ</p>
      <h1 className="font-display mt-1 text-4xl font-semibold">Lật mặt sau</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Đọc câu hỏi, tự trả lời, rồi lật. Tick “Đã nhớ” chỉ khi nói được không nhìn.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="flex min-h-11 flex-1 items-center gap-2 rounded-full border border-line bg-card px-3 text-sm">
          <span className="sr-only">Lọc theo câu</span>
          <select
            className="min-h-11 w-full bg-transparent"
            value={lessonId === "all" ? "all" : String(lessonId)}
            onChange={(event) => {
              const value = event.target.value;
              setLessonId(value === "all" ? "all" : Number(value));
              setIndex(0);
              setShowBack(false);
            }}
          >
            <option value="all">Cả 8 câu</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                Câu {lesson.id}. {lesson.title}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          aria-pressed={onlyAgain}
          className={
            "min-h-11 rounded-full px-4 text-sm font-semibold " +
            (onlyAgain ? "bg-seal text-on-pine" : "border border-line bg-card")
          }
          onClick={() => {
            setOnlyAgain((value) => !value);
            setIndex(0);
            setShowBack(false);
          }}
        >
          Chỉ thẻ còn mơ
        </button>
      </div>

      {current ? (
        <div className="mt-5">
          <p className="text-sm text-muted tabular-nums">
            Thẻ {safeIndex + 1}/{deck.length} · Câu {current.lessonId}
          </p>
          <button
            type="button"
            className="mt-2 flex min-h-72 w-full flex-col rounded-2xl border border-line bg-card p-6 text-left"
            onClick={() => setShowBack((value) => !value)}
            aria-expanded={showBack}
          >
            <span className="text-xs font-semibold tracking-wide text-seal uppercase">
              {showBack ? "Mặt sau" : "Mặt trước"} · {current.lessonTitle}
            </span>
            <span className="font-display mt-4 text-2xl leading-snug font-semibold">
              {showBack ? current.back : current.front}
            </span>
            <span className="mt-auto pt-6 text-sm text-muted">{showBack ? "Bấm để úp lại" : "Bấm để xem đáp"}</span>
          </button>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="min-h-11 rounded-full border border-line bg-card text-sm font-semibold"
              onClick={() => {
                setCard(current.id, "again");
                move(1);
              }}
            >
              Còn mơ
            </button>
            <button
              type="button"
              className="min-h-11 rounded-full bg-pine text-sm font-semibold text-on-pine"
              onClick={() => {
                setCard(current.id, "known");
                move(1);
              }}
            >
              Đã nhớ
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" className="min-h-11 text-sm font-medium text-muted" onClick={() => move(-1)}>
              Thẻ trước
            </button>
            <button type="button" className="min-h-11 text-sm font-medium text-muted" onClick={() => move(1)}>
              Thẻ sau
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-8 rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed">
          Không còn thẻ trong bộ lọc này. Bỏ “chỉ thẻ còn mơ” hoặc chọn câu khác.
        </p>
      )}
    </AppShell>
  );
}
