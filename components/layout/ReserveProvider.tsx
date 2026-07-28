"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ReserveContextValue = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const ReserveContext = createContext<ReserveContextValue | null>(null);

export function ReserveProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openDrawer, closeDrawer }),
    [open, openDrawer, closeDrawer],
  );

  return <ReserveContext.Provider value={value}>{children}</ReserveContext.Provider>;
}

export function useReserveDrawer() {
  const context = useContext(ReserveContext);
  if (!context) throw new Error("useReserveDrawer must be used inside <ReserveProvider>");
  return context;
}
