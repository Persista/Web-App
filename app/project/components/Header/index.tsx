"use client";
import { useContext, useState } from "react";
import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem, Container, IconButton } from "@mui/material";

import SiteContext from "@/app/siteContext";
import { removeLS } from "@/utils/localStorage";

export default function Header() {
  let { user, setUser } = useContext(SiteContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    removeLS("token");
    setUser?.(null);
    handleClose();
  };

  if (!user) return <></>;

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar className="flex flex-row justify-between p-0">
          <h1 className="text-2xl">Persista</h1>
          <Button
            variant="outlined"
            className="text-white md:inline-flex hidden"
            id="profile-button"
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar className="w-6 h-6 mr-2 text-sm" src={user.picture || undefined}>
              {user.name[0]}
            </Avatar>
            {user.name}
          </Button>
          <IconButton
            className="md:hidden"
            id="profile-button"
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar className="w-8 h-8 text-sm">P</Avatar>
          </IconButton>
        </Toolbar>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "profile-button",
          }}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Container>
    </AppBar>
  );
}
