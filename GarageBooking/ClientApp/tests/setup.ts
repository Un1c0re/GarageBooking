import { vi } from "vitest";

vi.mock("element-plus", async (importOriginal) => {
  const actual = await importOriginal<typeof import("element-plus")>();
  return {
    ...actual,
    ElNotification: { success: vi.fn(), error: vi.fn() },
    ElMessage: { success: vi.fn() },
    ElMessageBox: { alert: vi.fn(() => Promise.resolve()) },
  };
});
