import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const generateHistory = ({ note }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Typography style={{ marginBottom: "10px" }}>Edit history:</Typography>
      {note.history.length ? (
        note.history.map((record) => {
          return (
            <Accordion key={`${record.modified}${record.note.title}`}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {new Date(record.modified).toLocaleString()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ display: "grid", gridGap: "10px" }}>
                <Typography variant="subtitle1">
                  Title: "{record.note.title}"
                </Typography>
                <Typography variant="subtitle2">
                  Content: "{record.note.content}"
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography style={{ marginTop: "20px" }}>
          Looks like there is no edit history for this note
        </Typography>
      )}
    </div>
  );
};
export default generateHistory;
