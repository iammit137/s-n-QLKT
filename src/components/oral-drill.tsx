import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, RotateCcw } from "lucide-react";
import type { Lesson } from "@/lib/lessons";
import { checkStats } from "@/lib/lessons";
import { useStudy } from "@/lib/progress";

function formatClock(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function OralDrill({ lesson, timed = false }: { lesson: Lesson; timed?: boolean }) {
  const { checks, toggleCheck, drafts, setDraft, resetChecks } = useStudy();
  const [level, setLevel] = useState(0);
  const [seconds, setSeconds] = useState(8 * 60);
  const [running, setRunning] = useState(false);
  const stats = checkStats(checks, lesson);
  const draft = drafts[String(lesson.id)] ?? "";

  useEffect(() => {
    setLevel(0);
    setSeconds(8 * 60);
    setRunning(false);
  }, [lesson.id]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => {
      setSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-line bg-card p-5">
        <p className="text-sm font-semibold text-seal">Câu {lesson.id} · nói trước khi mở bài</p>
        <h2 className="font-display mt-2 text-2xl leading-snug font-semibold">{lesson.question}</h2>
        {timed ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-pine-soft px-3 py-1 text-sm font-semibold text-pine tabular-nums">
              {formatClock(seconds)}
            </span>
            <button
              type="button"
              className="min-h-11 rounded-full border border-line px-4 text-sm font-medium"
              onClick={() => setRunning((value) => !value)}
            >
              {running ? "Tạm dừng" : "Bấm giờ 8 phút"}
            </button>
            <button
              type="button"
              className="min-h-11 rounded-full px-3 text-sm text-muted"
              onClick={() => {
                setSeconds(8 * 60);
                setRunning(false);
              }}
            >
              Đặt lại
            </button>
          </div>
        ) : null}
      </section>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Nháp ý của bạn</span>
        <textarea
          value={draft}
          onChange={(event) => setDraft(String(lesson.id), event.target.value)}
          rows={5}
          placeholder="Viết dàn ý bằng lời của bạn, rồi mới đối chiếu."
          className="min-h-32 w-full resize-y rounded-2xl border border-line bg-card px-4 py-3 text-base leading-relaxed outline-none"
        />
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="min-h-11 flex-1 rounded-full bg-pine px-4 text-sm font-semibold text-on-pine"
          onClick={() => setLevel(1)}
        >
          Nhớ câu chốt
        </button>
        <button
          type="button"
          className="min-h-11 flex-1 rounded-full border border-pine px-4 text-sm font-semibold text-pine"
          onClick={() => setLevel(2)}
        >
          Mở dàn ý
        </button>
        <button
          type="button"
          className="min-h-11 flex-1 rounded-full border border-line bg-card px-4 text-sm font-semibold"
          onClick={() => setLevel(3)}
        >
          Mở bài và tự chấm
        </button>
      </div>

      {level >= 1 ? (
        <aside className="rounded-2xl bg-pine p-5 text-on-pine">
          <p className="text-sm font-semibold tracking-wide uppercase opacity-80">Câu chốt</p>
          <p className="font-display mt-2 text-xl leading-snug">{lesson.answer}</p>
        </aside>
      ) : null}

      {level >= 2 ? (
        <section className="rounded-2xl border border-line bg-card p-5">
          <h3 className="font-display text-xl font-semibold">Dàn ý 5 dòng</h3>
          <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed">
            {lesson.frame.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {level >= 3 ? (
        <section className="flex flex-col gap-4">
          {lesson.sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="font-display text-xl font-semibold">{section.title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {section.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article className="rounded-2xl bg-seal-soft p-5">
            <h3 className="font-display text-xl font-semibold text-seal">{lesson.exampleTitle}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {lesson.example.map((line) => (
                <li key={line} className="text-sm leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </article>
          <p className="text-sm leading-relaxed">{lesson.close}</p>

          <div className="rounded-2xl border border-line bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold">Tự chấm</h3>
                <p className="mt-1 text-sm text-muted">
                  Tick ý nào bạn vừa nói được không cần nhìn. {stats.done}/{stats.total} ý.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-1 text-sm text-muted"
                onClick={() => resetChecks(lesson.checks.map((item) => item.id))}
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Xóa tick
              </button>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {lesson.checks.map((item) => {
                const on = Boolean(checks[item.id]);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleCheck(item.id)}
                      className={
                        "flex min-h-11 w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm leading-relaxed " +
                        (on ? "border-pine bg-pine-soft" : "border-line bg-paper")
                      }
                    >
                      <span
                        className={
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border " +
                          (on ? "border-pine bg-pine text-on-pine" : "border-line")
                        }
                        aria-hidden="true"
                      >
                        {on ? <Check className="size-3" /> : null}
                      </span>
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
            {stats.done === stats.total ? (
              <p className="mt-4 text-sm font-semibold text-pine">Đủ ý câu này. Sang câu kế hoặc lật thẻ cho chắc.</p>
            ) : null}
            <Link
              to="/cau/$id"
              params={{ id: String(lesson.id) }}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-pine"
            >
              Xem lại bài giảng
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
