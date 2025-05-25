"use client";

import React from "react";
import { SessionProvider as NextAuthSessionProvider, SessionContext } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
