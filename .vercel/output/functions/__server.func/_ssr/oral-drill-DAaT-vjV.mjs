import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as RotateCcw, s as Check } from "../_libs/lucide-react.mjs";
import { r as useStudy } from "./router-pcC9kOAA.mjs";
import { i as checkStats } from "./lessons-DM28oTkB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/oral-drill-DAaT-vjV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatClock(total) {
	const minutes = Math.floor(total / 60);
	const seconds = total % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function OralDrill({ lesson, timed = false }) {
	const { checks, toggleCheck, drafts, setDraft, resetChecks } = useStudy();
	const [level, setLevel] = (0, import_react.useState)(0);
	const [seconds, setSeconds] = (0, import_react.useState)(480);
	const [running, setRunning] = (0, import_react.useState)(false);
	const stats = checkStats(checks, lesson);
	const draft = drafts[String(lesson.id)] ?? "";
	(0, import_react.useEffect)(() => {
		setLevel(0);
		setSeconds(480);
		setRunning(false);
	}, [lesson.id]);
	(0, import_react.useEffect)(() => {
		if (!running || seconds <= 0) return;
		const timer = window.setInterval(() => {
			setSeconds((current) => current > 0 ? current - 1 : 0);
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [running, seconds]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold text-seal",
						children: [
							"Câu ",
							lesson.id,
							" · nói trước khi mở bài"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-2xl leading-snug font-semibold",
						children: lesson.question
					}),
					timed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-pine-soft px-3 py-1 text-sm font-semibold text-pine tabular-nums",
								children: formatClock(seconds)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-full border border-line px-4 text-sm font-medium",
								onClick: () => setRunning((value) => !value),
								children: running ? "Tạm dừng" : "Bấm giờ 8 phút"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-full px-3 text-sm text-muted",
								onClick: () => {
									setSeconds(480);
									setRunning(false);
								},
								children: "Đặt lại"
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold",
					children: "Nháp ý của bạn"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: draft,
					onChange: (event) => setDraft(String(lesson.id), event.target.value),
					rows: 5,
					placeholder: "Viết dàn ý bằng lời của bạn, rồi mới đối chiếu.",
					className: "min-h-32 w-full resize-y rounded-2xl border border-line bg-card px-4 py-3 text-base leading-relaxed outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 flex-1 rounded-full bg-pine px-4 text-sm font-semibold text-on-pine",
						onClick: () => setLevel(1),
						children: "Nhớ câu chốt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 flex-1 rounded-full border border-pine px-4 text-sm font-semibold text-pine",
						onClick: () => setLevel(2),
						children: "Mở dàn ý"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 flex-1 rounded-full border border-line bg-card px-4 text-sm font-semibold",
						onClick: () => setLevel(3),
						children: "Mở bài và tự chấm"
					})
				]
			}),
			level >= 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-2xl bg-pine p-5 text-on-pine",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide uppercase opacity-80",
					children: "Câu chốt"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-2 text-xl leading-snug",
					children: lesson.answer
				})]
			}) : null,
			level >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-semibold",
					children: "Dàn ý 5 dòng"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed",
					children: lesson.frame.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})]
			}) : null,
			level >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [
					lesson.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold",
							children: section.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-col gap-2",
							children: section.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm leading-relaxed",
								children: point
							}, point))
						})]
					}, section.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl bg-seal-soft p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold text-seal",
							children: lesson.exampleTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-col gap-2",
							children: lesson.example.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm leading-relaxed",
								children: line
							}, line))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed",
						children: lesson.close
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold",
									children: "Tự chấm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										"Tick ý nào bạn vừa nói được không cần nhìn. ",
										stats.done,
										"/",
										stats.total,
										" ý."
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "inline-flex min-h-11 items-center gap-1 text-sm text-muted",
									onClick: () => resetChecks(lesson.checks.map((item) => item.id)),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										className: "size-4",
										"aria-hidden": "true"
									}), "Xóa tick"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 flex flex-col gap-2",
								children: lesson.checks.map((item) => {
									const on = Boolean(checks[item.id]);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-pressed": on,
										onClick: () => toggleCheck(item.id),
										className: "flex min-h-11 w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm leading-relaxed " + (on ? "border-pine bg-pine-soft" : "border-line bg-paper"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border " + (on ? "border-pine bg-pine text-on-pine" : "border-line"),
											"aria-hidden": "true",
											children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : null
										}), item.text]
									}) }, item.id);
								})
							}),
							stats.done === stats.total ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold text-pine",
								children: "Đủ ý câu này. Sang câu kế hoặc lật thẻ cho chắc."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cau/$id",
								params: { id: String(lesson.id) },
								className: "mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-pine",
								children: "Xem lại bài giảng"
							})
						]
					})
				]
			}) : null
		]
	});
}
//#endregion
export { OralDrill as t };
