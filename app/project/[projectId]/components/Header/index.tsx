import { DRAWER_WIDTH } from "@/app/constants";
import { AppBar, Container, Toolbar } from "@mui/material";

interface DashboardHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardHeader({ open, setOpen }: DashboardHeaderProps) {
  return (
    <AppBar
      sx={{
        marginLeft: "auto",
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        backgroundColor: "background.default",
      }}
    >
      <Toolbar>
        <Container maxWidth="lg" className="text-gray-900">
          <h3 className="font-bold text-lg">Project a</h3>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
