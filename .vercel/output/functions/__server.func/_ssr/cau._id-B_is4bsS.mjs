import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronRight, o as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as Route, r as useStudy } from "./router-pcC9kOAA.mjs";
import { a as lessonById, o as lessons, t as AppShell } from "./lessons-DM28oTkB.mjs";
import { t as OralDrill } from "./oral-drill-DAaT-vjV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cau._id-B_is4bsS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LessonPage() {
	const { id } = Route.useParams();
	const lesson = lessonById(Number(id));
	const { setLast } = useStudy();
	const [tab, setTab] = (0, import_react.useState)("giang");
	(0, import_react.useEffect)(() => {
		if (lesson) setLast(lesson.id);
	}, [lesson, setLast]);
	(0, import_react.useEffect)(() => {
		setTab("giang");
	}, [id]);
	if (!lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl font-semibold",
		children: "Không có câu này"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "mt-4 inline-flex min-h-11 items-center font-semibold text-pine",
		children: "Về mục lục"
	})] });
	const previous = lessons.find((item) => item.id === lesson.id - 1);
	const next = lessons.find((item) => item.id === lesson.id + 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-semibold text-seal",
			children: [
				"Câu ",
				lesson.id,
				" / 8"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display mt-1 text-4xl leading-tight font-semibold",
			children: lesson.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex gap-2",
			role: "tablist",
			"aria-label": "Cách học câu này",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": tab === "giang",
				className: "min-h-11 rounded-full px-4 text-sm font-semibold " + (tab === "giang" ? "bg-pine text-on-pine" : "border border-line bg-card"),
				onClick: () => setTab("giang"),
				children: "Giảng"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": tab === "hoi",
				className: "min-h-11 rounded-full px-4 text-sm font-semibold " + (tab === "hoi" ? "bg-pine text-on-pine" : "border border-line bg-card"),
				onClick: () => setTab("hoi"),
				children: "Hỏi lại"
			})]
		}),
		tab === "giang" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lecture, { lessonId: lesson.id }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OralDrill, { lesson })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mt-8 flex items-center justify-between gap-3 border-t border-line pt-4",
			"aria-label": "Câu trước sau",
			children: [previous ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cau/$id",
				params: { id: String(previous.id) },
				className: "inline-flex min-h-11 items-center gap-1 text-sm font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						className: "size-4",
						"aria-hidden": "true"
					}),
					"Câu ",
					previous.id
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cau/$id",
				params: { id: String(next.id) },
				className: "inline-flex min-h-11 items-center gap-1 text-sm font-semibold",
				children: [
					"Câu ",
					next.id,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						className: "size-4",
						"aria-hidden": "true"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/thi",
				className: "inline-flex min-h-11 items-center text-sm font-semibold text-pine",
				children: "Sang vấn đáp"
			})]
		})
	] });
}
function Lecture({ lessonId }) {
	const lesson = lessonById(lessonId);
	if (!lesson) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mt-6 flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-relaxed text-muted",
				children: lesson.question
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-2xl bg-pine p-5 text-on-pine",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide uppercase opacity-80",
					children: "Câu chốt"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-2 text-xl leading-snug",
					children: lesson.answer
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Dàn ý để nhớ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed",
					children: lesson.frame.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})]
			}),
			lesson.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: section.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: section.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm leading-relaxed",
						children: point
					}, point))
				})]
			}, section.title)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-seal-soft p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold text-seal",
					children: lesson.exampleTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: lesson.example.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm leading-relaxed",
						children: line
					}, line))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Câu dễ nhớ khi viết"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: lesson.keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm leading-relaxed",
						children: key
					}, key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed",
				children: lesson.close
			})
		]
	});
}
//#endregion
export { LessonPage as component };
