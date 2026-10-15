import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useStudy } from "./router-pcC9kOAA.mjs";
import { o as lessons, r as allCards, t as AppShell } from "./lessons-DM28oTkB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/the-BpUNoCHq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CardsPage() {
	const { cards, setCard } = useStudy();
	const [lessonId, setLessonId] = (0, import_react.useState)("all");
	const [onlyAgain, setOnlyAgain] = (0, import_react.useState)(false);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [showBack, setShowBack] = (0, import_react.useState)(false);
	const deck = (0, import_react.useMemo)(() => {
		return allCards().filter((card) => {
			if (lessonId !== "all" && card.lessonId !== lessonId) return false;
			if (onlyAgain && cards[card.id] === "known") return false;
			return true;
		});
	}, [
		lessonId,
		onlyAgain,
		cards
	]);
	const safeIndex = deck.length === 0 ? 0 : index % deck.length;
	const current = deck[safeIndex];
	function move(step) {
		if (deck.length === 0) return;
		setShowBack(false);
		setIndex((value) => (value + step + deck.length) % deck.length);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold tracking-wide text-seal uppercase",
			children: "Bộ thẻ"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display mt-1 text-4xl font-semibold",
			children: "Lật mặt sau"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "Đọc câu hỏi, tự trả lời, rồi lật. Tick “Đã nhớ” chỉ khi nói được không nhìn."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 flex-1 items-center gap-2 rounded-full border border-line bg-card px-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Lọc theo câu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "min-h-11 w-full bg-transparent",
					value: lessonId === "all" ? "all" : String(lessonId),
					onChange: (event) => {
						const value = event.target.value;
						setLessonId(value === "all" ? "all" : Number(value));
						setIndex(0);
						setShowBack(false);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "Cả 8 câu"
					}), lessons.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: lesson.id,
						children: [
							"Câu ",
							lesson.id,
							". ",
							lesson.title
						]
					}, lesson.id))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": onlyAgain,
				className: "min-h-11 rounded-full px-4 text-sm font-semibold " + (onlyAgain ? "bg-seal text-on-pine" : "border border-line bg-card"),
				onClick: () => {
					setOnlyAgain((value) => !value);
					setIndex(0);
					setShowBack(false);
				},
				children: "Chỉ thẻ còn mơ"
			})]
		}),
		current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted tabular-nums",
					children: [
						"Thẻ ",
						safeIndex + 1,
						"/",
						deck.length,
						" · Câu ",
						current.lessonId
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mt-2 flex min-h-72 w-full flex-col rounded-2xl border border-line bg-card p-6 text-left",
					onClick: () => setShowBack((value) => !value),
					"aria-expanded": showBack,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold tracking-wide text-seal uppercase",
							children: [
								showBack ? "Mặt sau" : "Mặt trước",
								" · ",
								current.lessonTitle
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display mt-4 text-2xl leading-snug font-semibold",
							children: showBack ? current.back : current.front
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-auto pt-6 text-sm text-muted",
							children: showBack ? "Bấm để úp lại" : "Bấm để xem đáp"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full border border-line bg-card text-sm font-semibold",
						onClick: () => {
							setCard(current.id, "again");
							move(1);
						},
						children: "Còn mơ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full bg-pine text-sm font-semibold text-on-pine",
						onClick: () => {
							setCard(current.id, "known");
							move(1);
						},
						children: "Đã nhớ"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium text-muted",
						onClick: () => move(-1),
						children: "Thẻ trước"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium text-muted",
						onClick: () => move(1),
						children: "Thẻ sau"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed",
			children: "Không còn thẻ trong bộ lọc này. Bỏ “chỉ thẻ còn mơ” hoặc chọn câu khác."
		})
	] });
}
//#endregion
export { CardsPage as component };
