import { Box } from "@mui/material";
import LeftSideMain from "./LeftSide/LeftSideMain";
import MoreJob from "./MoreJob/MoreJob";
import Recommened from "./Recommened/Recommened";
import Remote from "./Remote/Remote";
import RightSide from "./RightSide/RightSide";

const Jobs = () => {

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "3fr 6fr 3fr" }, marginTop: "1.5em" }}>

      <LeftSideMain />

      <div>
        <MoreJob></MoreJob>
        <Recommened></Recommened>
        <Remote></Remote>
      </div>

      <RightSide />

    </Box>
  );
};



export default Jobs;
