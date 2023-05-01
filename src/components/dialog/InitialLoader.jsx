import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import HashLoader from "react-spinners/HashLoader";
import { Box, Typography } from "@mui/material";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const InitialLoader = ({ open }) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
            backdropFilter: "blur(5px) !important",
            backgroundColor: "#ffffff94 !important",
          },
          "& .css-m9glnp-MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "transparent !important",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            mt: 30,
          }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Please Wait, Almost done ✈️
          </Typography>
          <DialogContent>
            <HashLoader
              color={"#50C8CE"}
              loading={true}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <Typography
              variant="h6"
              sx={{ textAlign: "center", fontWeight: "500", mt: 4 }}
            >
              This can take up to a minute...{" "}
            </Typography>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
};
export default InitialLoader;
