"use client";

import "./globals.css";

// Your component code

import { Work_Sans } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { Box, StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { usePathname, useRouter } from "next/navigation";

import Loader from "./components/Loader";
import SiteContext from "./siteContext";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { getLS } from "@/utils/localStorage";
import { get } from "@/utils/API/request";
import API from "@/utils/API";
import Login from "./Login";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"] });
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let router = useRouter();
  let pathname = usePathname();

  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [user, setUser] = useState(null);

  useEffect(() => {
    console.log(pathname);
    if (typeof window !== "undefined") {
      let token = getLS("token");
      if (token && user === null) {
        get(API.VERIFY).then((res) => {
          if (res.status === 200) {
            setUser(res.data.data);
            setIsLoading(false);
          } else {
            router.replace("/");
            setIsLoading(false);
          }
        });
      } else {
        if (!pathname.startsWith("/auth/")) router.replace("/");
        setIsLoading(false);
      }
    }
  }, [user]);

  return (
    <html lang="en">
      <body className={workSans.className}>
        <SiteContext.Provider value={{ isLoading, setIsLoading, user, setUser }}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <QueryClientProvider client={queryClient}>
                <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
                  {isLoading ? <Loader /> : user || pathname.startsWith("/auth/") ? children : <Login />}
                </Box>
              </QueryClientProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </SiteContext.Provider>
      </body>
    </html>
  );
}
