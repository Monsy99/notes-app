import { Box, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";

const List = ({ notes, historical = false }) => {
  const history = useHistory();
  const sortModel = [
    {
      field: "createdAt",
      sort: "desc",
    },
  ];
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 150,
      flex: 0.6,
    },
    {
      field: "content",
      sortable: false,
      headerName: "Content",
      width: 300,
      flex: 1,
    },
    {
      field: "createdAt",
      type: "dateTime",
      headerName: "Created at",
      width: 170,
      flex: 0,
    },
    {
      field: "updatedAt",
      type: "dateTime",
      headerName: "Updated at",
      width: 170,
      flex: 0,
    },
  ];
  const rows = notes.map((note) => {
    return {
      id: note._id,
      title: note.title,
      content: note.content,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    };
  });
  return (
    <>
      <Box style={{ height: "70vh", width: "100%" }}>
        <Typography variant="h5">
          {historical ? "Deleted notes" : "Note list"}
        </Typography>
        <DataGrid
          onCellClick={(element) => {
            if (element.field === "title") {
              history.push(`/history/${element.row.id}`);
            }
          }}
          sortModel={sortModel}
          rows={rows}
          columns={columns}
        />
      </Box>
    </>
  );
};

export default List;
