"use client";

import React, { createContext, useContext } from "react";
import { useLocalSession } from "@/hooks/use-local-session";

type SessionContextType = ReturnType<typeof useLocalSession>;

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const value = useLocalSession();
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
