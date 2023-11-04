"use client";

import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import API from "@/utils/API";
import SiteContext from "./siteContext";
import Loader from "./components/Loader";

export default function Login() {
  let router = useRouter();
  let { user } = useContext(SiteContext);

  let googleAuth = () => {
    window.location.href = API.API_URL + API.GOOGLE_AUTH;
  };

  let githubAuth = () => {
    window.location.href = API.API_URL + API.GITHUB_AUTH;
  };

  useEffect(() => {
    if (user) {
      router.replace("/project");
    }
  }, [user, router]);

  if (user) return <Loader />;

  return (
    <main className="flex flex-row w-full h-screen">
      <div className="md:flex hidden grow bg-[#7743DB] text-white flex-col justify-center p-20 gap-4">
        <h1 className="text-6xl font-bold">Persista</h1>
        <p className="text-lg italic">Holding Customers made easy</p>
      </div>
      <div className="grow max-w-lg flex flex-col justify-center gap-8 p-8">
        <h3 className="text-3xl font-semibold">Let&apos;s start!!</h3>
        <div className="flex flex-col gap-4">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(29, 78, 216)",
              "&:hover": {
                backgroundColor: "rgb(30, 64, 175)",
              },
              paddingY: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
            onClick={googleAuth}
          >
            <GoogleIcon /> Sign in with Google
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(31, 41, 55)",
              "&:hover": {
                backgroundColor: "rgb(17, 24, 39)",
              },
              paddingY: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
            onClick={githubAuth}
          >
            <GitHubIcon /> Sign in with Github
          </Button>
        </div>
      </div>
    </main>
  );
}
