"use client";

import { AppBar, Toolbar, Typography, Link, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit" underline="none">
            <Typography variant="h6" component="div">
              Metube Content Manager
            </Typography>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Link href="/search" color="inherit" underline="none" sx={{ px: 2 }}>
            Search
          </Link>
          <Link
            href="/classify"
            color="inherit"
            underline="none"
            sx={{ px: 2 }}
          >
            Classify
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
      </Toolbar>
    </AppBar>
  );
}
