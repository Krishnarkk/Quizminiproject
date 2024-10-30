import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const columns = [
  { id: "username", label: "Username", minWidth: 170, align: "center" },
  { id: "email", label: "Email", minWidth: 100, align: "center" },
  {
    id: "registeredAt",
    label: "Registered At",
    minWidth: 200,
    align: "center",
  },
];

export default function UsersTable() {
  const [rows, setRows] = React.useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleDelete = (user) => {
    const updatedRows = rows.filter((row) => row.email !== user.email);
    setRows(updatedRows);
    localStorage.setItem("users", JSON.stringify(updatedRows));
    handleCloseDialog();
  };

  const handleEdit = (user) => {
    // Implement your edit functionality here
    console.log("Edit user:", user);
  };

  const handleOpenDialog = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const filteredRows = rows.filter((row) => 
    row.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ padding: 2 }}>
        <TextField
          variant="standard"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bolder" }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bolder" }}>Edit</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                <TableCell>{index + 1}</TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === "registeredAt"
                      ? new Date(row[column.id]).toLocaleString()
                      : row[column.id]}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(row)} color="success">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenDialog(row)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(currentUser);
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
