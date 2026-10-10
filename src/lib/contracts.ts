import type { DemoData, Property } from "./data";
/** Future adapter contract. Current Store is deliberately browser-local. */
export interface ContentRepository {
  load(): Promise<DemoData>;
  save(data: DemoData): Promise<void>;
}
/** Renderer-independent selection for later 3D integration. */
export type HomeConfiguration = {
  schemaVersion: 1;
  propertyId?: Property["id"];
  choices: Record<string, string>;
};
export interface HomeRenderer {
  mode: "2d" | "3d";
  selection: HomeConfiguration;
}
export const languageConfig = {
  defaultLocale: "es",
  enabledLocales: ["es"],
  plannedLocales: ["it", "en"],
} as const;
