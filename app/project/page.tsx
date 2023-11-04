"use client";

import { Card, CardActionArea, Container, useTheme } from "@mui/material";
import Header from "./components/Header";
import ProjectCard from "./components/Card";
import AddIcon from "@mui/icons-material/Add";

export default function Projects() {
  let theme = useTheme();
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
            <Card variant="outlined" className="border-blue-500 md:hidden">
              <CardActionArea className="h-full flex flex-row gap-2 justify-center items-center text-blue-500 py-4">
                <AddIcon fontSize="small" /> New Project
              </CardActionArea>
            </Card>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
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
