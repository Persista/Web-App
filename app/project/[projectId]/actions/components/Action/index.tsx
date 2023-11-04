import { Card, CardContent, CardActions, Button } from "@mui/material";

export default function Action() {
  return (
    <>
      <Card>
        <CardContent className="flex flex-col gap-2">
          <h4 className="m-0 font-semibold">OOOOhhhhhhhh Yeahhhhhhh</h4>
        </CardContent>
        <CardActions className="justify-end">
          <Button variant="outlined" color="error">
            delete
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
