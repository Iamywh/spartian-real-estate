import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
const mocks = vi.hoisted(() => ({ getUser: vi.fn(), single: vi.fn() }));
vi.mock("next/headers", () => ({
  cookies: async () => ({ getAll: () => [], set: vi.fn() }),
}));
vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({
    auth: { getUser: mocks.getUser },
    from: () => ({ select: () => ({ eq: () => ({ single: mocks.single }) }) }),
  }),
}));
import { authorizedRole } from "../src/lib/supabase/server";
beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test");
  mocks.getUser.mockReset();
  mocks.single.mockReset();
});
afterEach(() => vi.unstubAllEnvs());
describe("Admin authorization boundary", () => {
  it("fails closed without provider configuration", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    expect(await authorizedRole()).toBeNull();
    expect(mocks.getUser).not.toHaveBeenCalled();
  });
  it("rejects an invalid session", async () => {
    mocks.getUser.mockResolvedValue({
      data: { user: null },
      error: new Error("invalid"),
    });
    expect(await authorizedRole()).toBeNull();
    expect(mocks.single).not.toHaveBeenCalled();
  });
  it("rejects a verified user without an assigned role", async () => {
    mocks.getUser.mockResolvedValue({
      data: { user: { id: "test-user" } },
      error: null,
    });
    mocks.single.mockResolvedValue({ data: null });
    expect(await authorizedRole()).toBeNull();
  });
  it("rejects unexpected roles", async () => {
    mocks.getUser.mockResolvedValue({
      data: { user: { id: "test-user" } },
      error: null,
    });
    mocks.single.mockResolvedValue({ data: { role: "viewer" } });
    expect(await authorizedRole()).toBeNull();
  });
  it("accepts only an assigned staff role after provider verification", async () => {
    mocks.getUser.mockResolvedValue({
      data: { user: { id: "test-user" } },
      error: null,
    });
    mocks.single.mockResolvedValue({ data: { role: "admin" } });
    expect(await authorizedRole()).toBe("admin");
  });
});
