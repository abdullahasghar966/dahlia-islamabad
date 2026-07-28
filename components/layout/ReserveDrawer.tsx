"use client";

import { Drawer } from "@/components/ui/Drawer";
import { ReserveForm } from "@/components/layout/ReserveForm";
import { useReserveDrawer } from "@/components/layout/ReserveProvider";

export function ReserveDrawer() {
  const { open, closeDrawer } = useReserveDrawer();

  return (
    <Drawer open={open} onClose={closeDrawer} title="Reserve a table">
      <ReserveForm />
    </Drawer>
  );
}
