"use client";

import {
  Box,
  Button,
  Drawer,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";

import { DRAWER_WIDTH } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  params: {
    projectId: string;
  };
}

export default function Sidebar(props: SidebarProps) {
  const pathname = usePathname();
  let theme = useTheme();
  const { open, setOpen } = props;
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const DrawerInner = () => (
    <div className="flex flex-col gap-2 h-screen">
      <h1 className=" text-2xl text-white py-2 px-4">Persista</h1>
      <Link href="/project">
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          className="text-white w-fit py-0 mx-2 mb-1 normal-case bg-violet-800 bg-opacity-60 hover:bg-violet-900"
        >
          Go to Projects
        </Button>
      </Link>
      <Box className="text-white grow flex flex-col justify-between">
        <List
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.2)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link href={"/project/" + props.params.projectId} onClick={() => setOpen(false)}>
            <ListItem
              disablePadding
              sx={{
                background: pathname === "/project/" + props.params.projectId ? "#5b21b699" : undefined,
              }}
            >
              <ListItemButton selected={pathname === "/project/" + props.params.projectId}>
                <ListItemIcon>
                  <DashboardIcon
                    sx={{
                      color: pathname === "/project/" + props.params.projectId ? "rgba(0, 0, 0, 0.54)" : "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    color: pathname === "/project/" + props.params.projectId ? "#000000aa" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href={"/project/" + props.params.projectId + "/actions"} onClick={() => setOpen(false)}>
            <ListItem
              disablePadding
              sx={{
                background: pathname === "/project/" + props.params.projectId + "/actions" ? "#5b21b699" : undefined,
              }}
            >
              <ListItemButton selected={pathname === "/project/" + props.params.projectId + "/actions"}>
                <ListItemIcon>
                  <AdsClickIcon
                    sx={{
                      color:
                        pathname === "/project/" + props.params.projectId + "/actions"
                          ? "rgba(0, 0, 0, 0.54)"
                          : "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Actions"
                  primaryTypographyProps={{
                    color: pathname === "/project/" + props.params.projectId + "/actions" ? "#000000aa" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href={"/project/" + props.params.projectId + "/settings"} onClick={() => setOpen(false)}>
            <ListItem
              disablePadding
              sx={{
                background: pathname === "/project/" + props.params.projectId + "/settings" ? "#5b21b699" : undefined,
              }}
            >
              <ListItemButton selected={pathname === "/project/" + props.params.projectId + "/settings"}>
                <ListItemIcon>
                  <SettingsIcon
                    sx={{
                      color:
                        pathname === "/project/" + props.params.projectId + "/settings"
                          ? "rgba(0, 0, 0, 0.54)"
                          : "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{
                    color: pathname === "/project/" + props.params.projectId + "/settings" ? "#000000aa" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>

        <List
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.2)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton selected={pathname === "/project/" + props.params.projectId + "/settings"}>
              <ListItemIcon>
                <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
              </ListItemIcon>
              <ListItemText
                primary="My Account"
                primaryTypographyProps={{
                  color: "white",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: 0,
        flexShrink: 1,
        [theme.breakpoints.up("md")]: {
          width: DRAWER_WIDTH,
          flexShrink: 0,
        },
      }}
      aria-label="project-options"
    >
      <SwipeableDrawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        ModalProps={{
          keepMounted: false,
        }}
        color="background"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            backgroundImage: "none",
            backgroundColor: theme.palette.primary.main,
          },
        }}
        className="md:hidden block"
      >
        <DrawerInner />
      </SwipeableDrawer>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            backgroundColor: theme.palette.primary.main,
          },
        }}
        className="md:flex hidden w-full h-full"
      >
        <DrawerInner />
      </Drawer>
    </Box>
  );
}
