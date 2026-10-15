import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as lessonById, o as lessons, t as AppShell } from "./lessons-DM28oTkB.mjs";
import { t as OralDrill } from "./oral-drill-DAaT-vjV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/thi-DL-5FTT6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExamPage() {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const lesson = picked ? lessonById(picked) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold tracking-wide text-seal uppercase",
			children: "Vấn đáp"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display mt-1 text-4xl font-semibold",
			children: "Nói trước, mở sau"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "Chọn một câu. Viết nháp hoặc nói thầm dàn ý. Chỉ mở câu chốt khi bạn đã thử. Tám phút là nhịp một ý mở bài."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 rounded-full bg-pine px-4 text-sm font-semibold text-on-pine",
				onClick: () => setPicked(lessons[Math.floor(Math.random() * lessons.length)]?.id ?? 1),
				children: "Bốc ngẫu nhiên"
			}), lessons.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": picked === item.id,
				className: "min-h-11 rounded-full px-3 text-sm font-semibold tabular-nums " + (picked === item.id ? "bg-seal-soft text-seal" : "border border-line bg-card"),
				onClick: () => setPicked(item.id),
				children: item.id
			}, item.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: lesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OralDrill, {
				lesson,
				timed: true
			}, lesson.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-dashed border-line p-5 text-sm leading-relaxed text-muted",
				children: "Chưa bốc câu. Khi vào phòng thi, đề thường hỏi “là gì — cái nào quan trọng nhất — vì sao — ví dụ”. Tập đúng mạch đó."
			})
		})
	] });
}
//#endregion
export { ExamPage as component };
