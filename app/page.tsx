import type { Metadata } from "next";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Persista",
  description: "Holding Customers made easy",
};

export default function Home() {
  return (
    <main className="flex flex-row w-full h-screen">
      <div className="md:flex hidden grow bg-[#7743DB] text-white flex-col justify-center p-20 gap-4">
        <h1 className="text-6xl font-bold">Persista</h1>
        <p className="text-lg italic">Holding Customers made easy</p>
      </div>
      <div className="grow max-w-lg flex flex-col justify-center gap-8 p-8">
        <h3 className="text-3xl font-medium">Let&apos;s start!!</h3>
        <div className="flex flex-col gap-4">
          <Link href="/project">
            <Button variant="contained" className="bg-blue-700 hover:bg-blue-800 py-4 flex items-center gap-4 w-full">
              <GoogleIcon /> Sign in with Google
            </Button>
          </Link>

          <Button variant="contained" className="bg-gray-800 hover:bg-gray-900 py-4 flex items-center gap-4">
            <GitHubIcon /> Sign in with Github
          </Button>
        </div>
      </div>
    </main>
  );
}
