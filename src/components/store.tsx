"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { seed, DemoData } from "@/lib/data";
const KEY = "spartian-demo-v1";
const Context = createContext<{
  data: DemoData;
  save: (d: DemoData) => boolean;
  ready: boolean;
  error: string;
}>({ data: seed, save: () => false, ready: false, error: "" });
export function Store({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DemoData>(seed);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.properties && d.projects && d.posts && d.inquiries && d.options)
          setData(d);
      }
    } catch {
      setError("No se han podido recuperar los datos locales.");
    }
    setReady(true);
  }, []);
  function save(d: DemoData) {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
      setData(d);
      setError("");
      return true;
    } catch {
      setError(
        "No se pudo guardar. El almacenamiento puede estar lleno o bloqueado. Exporta tus datos e inténtalo de nuevo.",
      );
      return false;
    }
  }
  return (
    <Context.Provider value={{ data, save, ready, error }}>
      {children}
      {error && (
        <div role="alert" className="storage-error">
          {error}
        </div>
      )}
    </Context.Provider>
  );
}
export const useStore = () => useContext(Context);
