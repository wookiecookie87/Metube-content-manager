"use client";

import { Box, Grid } from "@mui/material";

export default function ClassifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <h1>ACTIOn UI</h1>
          </Grid>
          <Grid item xs={12} sm={10}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
