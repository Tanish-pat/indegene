import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface AddDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  newDocName: string;
  setNewDocName: (name: string) => void;
  newDocType: string;
  setNewDocType: (type: string) => void;
  handleAddDoc: () => Promise<void>;
}

const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({
  open,
  onClose,
  newDocName,
  setNewDocName,
  newDocType,
  setNewDocType,
  handleAddDoc,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Document</DialogTitle>
      <DialogContent>
        <TextField
          label="Document Name"
          fullWidth
          value={newDocName}
          onChange={(e) => setNewDocName(e.target.value)}
          margin="normal"
        />
        <TextField
          select
          label="Type"
          fullWidth
          value={newDocType}
          onChange={(e) => setNewDocType(e.target.value)}
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="file">File</option>
          <option value="folder">Folder</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddDoc} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDocumentDialog;

