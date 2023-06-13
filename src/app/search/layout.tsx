"use client";

import SearchForm from "@/components/SearchForm";
import { Box, Grid } from "@mui/material";
import * as React from "react";
import { RecoilRoot } from "recoil";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
}
