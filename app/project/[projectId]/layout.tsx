"use client";

import { Box } from "@mui/material";

import Sidebar from "./components/Sidebar";
import { useState } from "react";
import DashboardHeader from "./components/Header";
import { DRAWER_WIDTH } from "@/app/constants";
import { useQuery } from "react-query";
import { get } from "@/utils/API/request";
import { useContext } from "react";
import SiteContext from "@/app/siteContext";
import Loader from "@/app/components/Loader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  let [open, setOpen] = useState(true);
  const { user } = useContext(SiteContext);
  const getProject = async () => {
		const res = await get(`/admin/${user.id}/projects`);
		return res.data.message;
	};

  let project  = useQuery("project", getProject);

  if(project.isLoading) return <Loader/>

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
        <DashboardHeader open={open} setOpen={setOpen} title={project.data.title}/>
        {children}
      </Box>
    </Box>
  );
}
