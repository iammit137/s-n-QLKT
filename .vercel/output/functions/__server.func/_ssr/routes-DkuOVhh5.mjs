import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ArrowRight } from "../_libs/lucide-react.mjs";
import { r as useStudy } from "./router-pcC9kOAA.mjs";
import { i as checkStats, n as ProgressBar, o as lessons, t as AppShell } from "./lessons-DM28oTkB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DkuOVhh5.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { checks, cards, lastId } = useStudy();
	const totals = lessons.reduce((sum, lesson) => {
		const stats = checkStats(checks, lesson);
		return {
			done: sum.done + stats.done,
			total: sum.total + stats.total
		};
	}, {
		done: 0,
		total: 0
	});
	const knownCards = Object.values(cards).filter((mark) => mark === "known").length;
	const cardTotal = lessons.reduce((sum, lesson) => sum + lesson.cards.length, 0);
	const weakest = [...lessons].sort((a, b) => {
		const left = checkStats(checks, a);
		const right = checkStats(checks, b);
		return left.done / left.total - right.done / right.total;
	})[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold tracking-wide text-seal uppercase",
			children: "Kết thúc học phần"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "font-display mt-2 text-4xl leading-tight font-semibold",
			children: ["Giảng từng câu,", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block",
				children: "rồi hỏi lại."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-base leading-relaxed text-muted",
			children: "Tám câu quản lý nhà nước về kinh tế. Mỗi câu có dàn ý, câu chốt, ví dụ trong đề cương, rồi phần vấn đáp để bạn tự nói trước khi mở bài."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-2xl border border-line bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "Ý đã nhớ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted tabular-nums",
						children: [
							totals.done,
							"/",
							totals.total
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						done: totals.done,
						total: totals.total
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Thẻ đã thuộc ",
						knownCards,
						"/",
						cardTotal,
						". Số liệu Samsung, bộ máy, kim ngạch lấy đúng đề cương ôn — dùng để viết bài, đối chiếu lại giáo trình nếu thầy cô chỉnh số."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cau/$id",
					params: { id: String(lastId) },
					className: "flex min-h-11 items-center justify-between rounded-2xl bg-pine px-4 py-3 text-sm font-semibold text-on-pine",
					children: [
						"Tiếp câu ",
						lastId,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-4",
							"aria-hidden": "true"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/thi",
					className: "flex min-h-11 items-center justify-between rounded-2xl border border-line bg-card px-4 py-3 text-sm font-semibold",
					children: ["Vấn đáp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-4",
						"aria-hidden": "true"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cau/$id",
					params: { id: String(weakest?.id ?? 1) },
					className: "flex min-h-11 items-center justify-between rounded-2xl border border-line bg-card px-4 py-3 text-sm font-semibold",
					children: ["Câu còn yếu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-4",
						"aria-hidden": "true"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-8 flex flex-col gap-3",
			children: lessons.map((lesson) => {
				const stats = checkStats(checks, lesson);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cau/$id",
					params: { id: String(lesson.id) },
					className: "block rounded-2xl border border-line bg-card p-4 transition-colors hover:border-pine",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-seal tabular-nums",
								children: String(lesson.id).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted tabular-nums",
								children: [
									stats.done,
									"/",
									stats.total,
									" ý"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-2xl leading-snug font-semibold",
							children: lesson.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm leading-relaxed text-muted",
							children: lesson.question
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
								done: stats.done,
								total: stats.total
							})
						})
					]
				}) }, lesson.id);
			})
		})
	] });
}
//#endregion
export { Home as component };
