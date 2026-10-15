import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { OralDrill } from "@/components/oral-drill";
import { lessonById, lessons } from "@/lib/lessons";

export const Route = createFileRoute("/thi")({ component: ExamPage });

function ExamPage() {
  const [picked, setPicked] = useState<number | null>(null);
  const lesson = picked ? lessonById(picked) : undefined;

  return (
    <AppShell>
      <p className="text-sm font-semibold tracking-wide text-seal uppercase">Vấn đáp</p>
      <h1 className="font-display mt-1 text-4xl font-semibold">Nói trước, mở sau</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Chọn một câu. Viết nháp hoặc nói thầm dàn ý. Chỉ mở câu chốt khi bạn đã thử. Tám phút là nhịp một ý mở bài.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 rounded-full bg-pine px-4 text-sm font-semibold text-on-pine"
          onClick={() => setPicked(lessons[Math.floor(Math.random() * lessons.length)]?.id ?? 1)}
        >
          Bốc ngẫu nhiên
        </button>
        {lessons.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={picked === item.id}
            className={
              "min-h-11 rounded-full px-3 text-sm font-semibold tabular-nums " +
              (picked === item.id ? "bg-seal-soft text-seal" : "border border-line bg-card")
            }
            onClick={() => setPicked(item.id)}
          >
            {item.id}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {lesson ? (
          <OralDrill key={lesson.id} lesson={lesson} timed />
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-5 text-sm leading-relaxed text-muted">
            Chưa bốc câu. Khi vào phòng thi, đề thường hỏi “là gì — cái nào quan trọng nhất — vì sao — ví dụ”. Tập đúng mạch đó.
          </p>
        )}
      </div>
    </AppShell>
  );
}
