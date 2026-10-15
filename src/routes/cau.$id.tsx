import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { OralDrill } from "@/components/oral-drill";
import { lessonById, lessons } from "@/lib/lessons";
import { useStudy } from "@/lib/progress";

export const Route = createFileRoute("/cau/$id")({ component: LessonPage });

function LessonPage() {
  const { id } = Route.useParams();
  const lesson = lessonById(Number(id));
  const { setLast } = useStudy();
  const [tab, setTab] = useState<"giang" | "hoi">("giang");

  useEffect(() => {
    if (lesson) setLast(lesson.id);
  }, [lesson, setLast]);

  useEffect(() => {
    setTab("giang");
  }, [id]);

  if (!lesson) {
    return (
      <AppShell>
        <h1 className="font-display text-3xl font-semibold">Không có câu này</h1>
        <Link to="/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-pine">
          Về mục lục
        </Link>
      </AppShell>
    );
  }

  const previous = lessons.find((item) => item.id === lesson.id - 1);
  const next = lessons.find((item) => item.id === lesson.id + 1);

  return (
    <AppShell>
      <p className="text-sm font-semibold text-seal">Câu {lesson.id} / 8</p>
      <h1 className="font-display mt-1 text-4xl leading-tight font-semibold">{lesson.title}</h1>

      <div className="mt-4 flex gap-2" role="tablist" aria-label="Cách học câu này">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "giang"}
          className={
            "min-h-11 rounded-full px-4 text-sm font-semibold " +
            (tab === "giang" ? "bg-pine text-on-pine" : "border border-line bg-card")
          }
          onClick={() => setTab("giang")}
        >
          Giảng
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "hoi"}
          className={
            "min-h-11 rounded-full px-4 text-sm font-semibold " +
            (tab === "hoi" ? "bg-pine text-on-pine" : "border border-line bg-card")
          }
          onClick={() => setTab("hoi")}
        >
          Hỏi lại
        </button>
      </div>

      {tab === "giang" ? <Lecture lessonId={lesson.id} /> : <div className="mt-6"><OralDrill lesson={lesson} /></div>}

      <nav className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-4" aria-label="Câu trước sau">
        {previous ? (
          <Link
            to="/cau/$id"
            params={{ id: String(previous.id) }}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Câu {previous.id}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/cau/$id"
            params={{ id: String(next.id) }}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold"
          >
            Câu {next.id}
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        ) : (
          <Link to="/thi" className="inline-flex min-h-11 items-center text-sm font-semibold text-pine">
            Sang vấn đáp
          </Link>
        )}
      </nav>
    </AppShell>
  );
}

function Lecture({ lessonId }: { lessonId: number }) {
  const lesson = lessonById(lessonId);
  if (!lesson) return null;

  return (
    <article className="mt-6 flex flex-col gap-4">
      <p className="text-base leading-relaxed text-muted">{lesson.question}</p>
      <aside className="rounded-2xl bg-pine p-5 text-on-pine">
        <p className="text-sm font-semibold tracking-wide uppercase opacity-80">Câu chốt</p>
        <p className="font-display mt-2 text-xl leading-snug">{lesson.answer}</p>
      </aside>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-display text-xl font-semibold">Dàn ý để nhớ</h2>
        <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed">
          {lesson.frame.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </section>

      {lesson.sections.map((section) => (
        <section key={section.title} className="rounded-2xl border border-line bg-card p-5">
          <h2 className="font-display text-xl font-semibold">{section.title}</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {section.points.map((point) => (
              <li key={point} className="text-sm leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="rounded-2xl bg-seal-soft p-5">
        <h2 className="font-display text-xl font-semibold text-seal">{lesson.exampleTitle}</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {lesson.example.map((line) => (
            <li key={line} className="text-sm leading-relaxed">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-display text-xl font-semibold">Câu dễ nhớ khi viết</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {lesson.keys.map((key) => (
            <li key={key} className="text-sm leading-relaxed">
              {key}
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm leading-relaxed">{lesson.close}</p>
    </article>
  );
}
