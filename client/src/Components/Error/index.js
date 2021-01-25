import { Button, Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import Wrapper from "../Wrapper";

const Error = () => {
  const url = window.location.origin;
  return (
    <Wrapper style={{ textAlign: "center", marginTop: "200px" }}>
      <WarningIcon
        style={{ fontSize: "120px", marginBottom: "30px" }}
      ></WarningIcon>
      <Typography variant="h4">
        Sorry... seems like the requested data is empty <br></br> or the request
        is wrong
      </Typography>
      <Button
        style={{ marginTop: "40px" }}
        variant="contained"
        size="large"
        color="secondary"
        href={url}
      >
        Back to notes
      </Button>
    </Wrapper>
  );
};
export default Error;
