"use client";

import { Box } from "@mui/material";

import Sidebar from "./components/Sidebar";
import { useState } from "react";
import DashboardHeader from "./components/Header";
import { DRAWER_WIDTH } from "@/app/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  let [open, setOpen] = useState(true);
  return (
    <Box>
      <Sidebar params={params} open={open} setOpen={setOpen} />
      <Box
        sx={{
          marginLeft: `${DRAWER_WIDTH}px`,
          transition: "margin-left 0.2s ease-in-out",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <DashboardHeader open={open} setOpen={setOpen} />
        {children}
      </Box>
    </Box>
  );
}
