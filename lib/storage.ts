/* ================= TYPES ================= */

export type ViewDataItem = {
  id: string;
  date: string;
  type: string;
  company: string;
  details: string;
  amount?: number;
  status: string;
  submittedBy: string;

  // ✅ OPTIONAL (fixes your TypeScript error)
  fullData?: any;
};

/* ================= KEY ================= */

const STORAGE_KEY = "bizonance_view_data";

/* ================= GET ================= */

export function getAllData(): ViewDataItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

/* ================= SAVE ================= */

export function saveData(item: ViewDataItem) {
  if (typeof window === "undefined") return;

  const old = getAllData();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...old, item])
  );
}

/* ================= DELETE ================= */

export function deleteData(id: string) {
  if (typeof window === "undefined") return;

  const old = getAllData();
  const updated = old.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/* ================= CLEAR ================= */

export function clearAllData() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}
