"use client";

import "./globals.css";

// Your component code

import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { Box, StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import { theme } from "./theme";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "500", "700"] });
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>{children}</Box>
            </QueryClientProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
