"use client";

import { useTransition } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { saveWorkSession } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { SavedSessionPayload } from "@/types";

type SaveSessionButtonProps = {
  payload: SavedSessionPayload;
  onSaved: () => void;
};

export function SaveSessionButton({
  payload,
  onSaved,
}: SaveSessionButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      size="lg"
      disabled={pending || payload.totalTickets === 0}
      onClick={() => {
        startTransition(async () => {
          const result = await saveWorkSession(payload);
          if (result.ok) {
            toast.success(result.message);
            onSaved();
            return;
          }

          toast.warning(result.message);
          if (result.message.includes("Supabase is not configured")) {
            onSaved();
          }
        });
      }}
    >
      <Save className="size-5" />
      {pending ? "Saving..." : "Save Session"}
    </Button>
  );
}
