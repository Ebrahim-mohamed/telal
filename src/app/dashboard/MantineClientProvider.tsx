// src/components/MantineClientProvider.tsx
"use client";

import { MantineProvider } from "@mantine/core";
import React from "react";

export function MantineClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      {children}
    </MantineProvider>
  );
}
