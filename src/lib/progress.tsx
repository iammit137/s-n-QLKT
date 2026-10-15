import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "so-on-qlkt-v1";

type CardMark = "known" | "again";

type Data = {
  checks: Record<string, boolean>;
  cards: Record<string, CardMark>;
  drafts: Record<string, string>;
  lastId: number;
};

const empty: Data = { checks: {}, cards: {}, drafts: {}, lastId: 1 };

type Api = Data & {
  ready: boolean;
  toggleCheck: (id: string) => void;
  setCard: (id: string, mark: CardMark) => void;
  setDraft: (id: string, text: string) => void;
  setLast: (id: number) => void;
  resetChecks: (ids: string[]) => void;
};

const StudyContext = createContext<Api | null>(null);

function readStored(): Data {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Data>;
    return {
      checks: parsed.checks && typeof parsed.checks === "object" ? parsed.checks : {},
      cards: parsed.cards && typeof parsed.cards === "object" ? parsed.cards : {},
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      lastId: typeof parsed.lastId === "number" ? parsed.lastId : 1,
    };
  } catch {
    return empty;
  }
}

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Data>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(readStored());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, ready]);

  const toggleCheck = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      checks: { ...current.checks, [id]: !current.checks[id] },
    }));
  }, []);

  const setCard = useCallback((id: string, mark: CardMark) => {
    setData((current) => ({ ...current, cards: { ...current.cards, [id]: mark } }));
  }, []);

  const setDraft = useCallback((id: string, text: string) => {
    setData((current) => ({ ...current, drafts: { ...current.drafts, [id]: text } }));
  }, []);

  const setLast = useCallback((id: number) => {
    setData((current) => (current.lastId === id ? current : { ...current, lastId: id }));
  }, []);

  const resetChecks = useCallback((ids: string[]) => {
    setData((current) => {
      const checks = { ...current.checks };
      for (const id of ids) delete checks[id];
      return { ...current, checks };
    });
  }, []);

  const api = useMemo<Api>(
    () => ({ ...data, ready, toggleCheck, setCard, setDraft, setLast, resetChecks }),
    [data, ready, toggleCheck, setCard, setDraft, setLast, resetChecks],
  );

  return <StudyContext.Provider value={api}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const value = useContext(StudyContext);
  if (!value) throw new Error("StudyProvider missing");
  return value;
}
