import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface DocumentListProps {
  documents: any[];
  currentFolder: string | null;
  openFolder: (folderId: string, folderName: string) => void;
  sortBy: "name" | "createdAt";
  handleMenuClick: (
    event: React.MouseEvent<HTMLElement>,
    docId: string
  ) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  currentFolder,
  openFolder,
  sortBy,
  handleMenuClick,
}) => {
  const renderDocs = (docs: any[], parentId: string | null) => {
    return docs
      .filter((doc) => doc.parentId === parentId)
      .sort((a, b) =>
        sortBy === "name"
          ? a.name.localeCompare(b.name)
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((doc) => (
        <Grid item xs={12} sm={6} md={4} key={doc._id}>
          <Paper
            elevation={3}
            sx={{ padding: 2, textAlign: "center", position: "relative" }}
            onClick={() =>
              doc.type === "folder" && openFolder(doc._id, doc.name)
            }
          >
            {doc.type === "folder" ? (
              <FolderIcon fontSize="large" />
            ) : (
              <InsertDriveFileIcon fontSize="large" />
            )}
            <Typography>{doc.name}</Typography>
            <IconButton
              onClick={(e) => handleMenuClick(e, doc._id)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <MoreVertIcon />
            </IconButton>
          </Paper>
        </Grid>
      ));
  };

  return <>{renderDocs(documents, currentFolder)}</>;
};

export default DocumentList;
