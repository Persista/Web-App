"use client";

import "./globals.css";

// Your component code

import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Box, StyledEngineProvider } from "@mui/material";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>{children}</Box>
          </ThemeProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
