"use client";

import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import { Card, CardActionArea, Container, useTheme } from "@mui/material";

import SiteContext from "@/app/siteContext";
import Header from "./components/Header";
import ProjectCard from "./components/Card";
import NewProjectModal from "./components/NewProjectModal";
import { get } from "@/utils/API/request";
import Loader from "../components/Loader";
import { Project } from "../types";

export default function Projects() {
  let theme = useTheme();
  const { user } = useContext(SiteContext);
  let [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const getAllProjects = async () => {
    const res = await get(`/admin/${user.id}/projects`);
    return res.data.message;
  };

  let projects = useQuery(["projects"], getAllProjects);

  if (projects.isLoading) return <Loader />;

  return (
    <>
      <Header />
      <div className="w-full relative">
        <div
          className="absolute top-0 w-full h-24 md:h-48 bg-blue z-0"
          style={{ backgroundColor: theme.palette.primary.main }}
        ></div>
        <Container maxWidth="md" className="md:pt-16 pt-8 relative z-10">
          <h3 className="text-white text-xl font-medium mb-2">Projects</h3>
          <div className="grid md:grid-cols-3 gap-2">
            {projects.data.map((project: Project) => (
              <ProjectCard key={project.id} title={project.title} actions={project.actions} id={project.id} />
            ))}
            <Card variant="outlined" className="hidden md:flex" sx={{ borderColor: theme.palette.primary.main }}>
              <CardActionArea
                className="h-full flex flex-row gap-2 justify-center items-center"
                sx={{ color: theme.palette.primary.main }}
                onClick={handleOpen}
              >
                <AddIcon fontSize="small" /> New Project
              </CardActionArea>
            </Card>
          </div>
        </Container>
      </div>
      <NewProjectModal open={open} onClose={handleClose} />
    </>
  );
}
