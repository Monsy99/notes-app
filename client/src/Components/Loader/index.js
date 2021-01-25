import { Box, CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <>
      <Box marginTop="200px" width="100vw" textAlign="center">
        <CircularProgress size="6rem" color="primary"></CircularProgress>
      </Box>
    </>
  );
};
export default Loader;
