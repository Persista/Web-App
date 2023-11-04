"use client";

import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import { useContext } from "react";
import SiteContext from "@/app/siteContext";
import { Card, CardActionArea, Container, useTheme } from "@mui/material";
import Header from "./components/Header";
import ProjectCard from "./components/Card";
import { get } from "@/utils/API/request";
import Loader from "../components/Loader";
import { Project } from "../types";

export default function Projects() {
  let theme = useTheme();
  const {user} = useContext(SiteContext);

  const getAllProjects = async () => { 
    const res = await get(`/admin/${user.id}/projects`);
    console.log(res.data);
    return res.data.message;
  }

  let projects = useQuery([user.id, "projects"], getAllProjects);

  if(projects.isLoading) return <Loader/>

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
            <Card variant="outlined" className="md:hidden" sx={{ borderColor: theme.palette.primary.main }}>
              <CardActionArea
                className="h-full flex flex-row gap-2 justify-center items-center  py-4"
                sx={{ color: theme.palette.primary.main }}
              >
                <AddIcon fontSize="small" /> New Project
              </CardActionArea>
            </Card>
            {projects.data.map((project: Project) => (
              <ProjectCard key={project.id} title={project.title} actions={project.actions} id={project.id} />
            ))}
            <Card variant="outlined" className="hidden md:flex" sx={{ borderColor: theme.palette.primary.main }}>
              <CardActionArea
                className="h-full flex flex-row gap-2 justify-center items-center"
                sx={{ color: theme.palette.primary.main }}
              >
                <AddIcon fontSize="small" /> New Project
              </CardActionArea>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}
