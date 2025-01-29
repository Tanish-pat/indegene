"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Select from "@mui/material/Select";
import { fetchDocs, addDoc, renameDoc, deleteDoc, moveDoc } from "./docService";

const DocumentManager: React.FC = () => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [currentFolder, setCurrentFolder] = useState<string | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<any[]>([
        { id: null, name: "Root" },
    ]);
    const [newDocName, setNewDocName] = useState("");
    const [newDocType, setNewDocType] = useState("file");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sortBy, setSortBy] = useState<"name" | "createdAt">("name");
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [sourceFolderId, setSourceFolderId] = useState<string | null>(null); // For the source folder
    const [isMoving, setIsMoving] = useState(false);
    const [targetFolderId, setTargetFolderId] = useState<string | null>(null);

    useEffect(() => {
        const loadDocuments = async () => {
            const docs = await fetchDocs();
            setDocuments(docs);
        };
        loadDocuments();
    }, []);

    const openFolder = (folderId: string, folderName: string) => {
        setCurrentFolder(folderId);
        setBreadcrumbs((prev) => [...prev, { id: folderId, name: folderName }]);
    };

    const navigateToBreadcrumb = (index: number) => {
        setBreadcrumbs(breadcrumbs.slice(0, index + 1));
        setCurrentFolder(breadcrumbs[index].id);
    };

    const handleAddDoc = async () => {
        try {
            const newDoc = await addDoc(newDocName, newDocType, currentFolder);
            setDocuments((prev) => [...prev, newDoc]);
            setDialogOpen(false);
            setNewDocName("");
            setNewDocType("file");
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    const handleDeleteDoc = async () => {
        if (selectedDocId) {
            await deleteDoc(selectedDocId);
            setDocuments((prev) => prev.filter((doc) => doc._id !== selectedDocId));
            handleCloseMenu();
        }
    };

    const handleRenameDoc = async () => {
        const newName = prompt("Enter the new name for the document:");
        if (newName && selectedDocId) {
            const updatedDoc = await renameDoc(selectedDocId, newName);
            setDocuments((prev) =>
                prev.map((doc) => (doc._id === updatedDoc._id ? updatedDoc : doc))
            );
            handleCloseMenu();
        }
    };

    const handleMoveDoc = async () => {
        console.log("Selected Document ID:", selectedDocId);
        console.log("Source Folder ID:", sourceFolderId);
        console.log("Target Folder ID:", targetFolderId);

        if (targetFolderId && selectedDocId) {
            const updatedDoc = await moveDoc(selectedDocId, targetFolderId);
            setDocuments((prev) =>
                prev.map((doc) => (doc._id === updatedDoc._id ? updatedDoc : doc))
            );
            cancelMove(); // Reset moving state after moving the document
        }
    };

    const handleMenuClick = (
        event: React.MouseEvent<HTMLElement>,
        docId: string
    ) => {
        event.stopPropagation(); // Prevent folder navigation
        setMenuAnchor(event.currentTarget);
        setSelectedDocId(docId);
        setSourceFolderId(currentFolder); // Store the current folder as source
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
        setSelectedDocId(null);
        // setSourceFolderId(null); // Reset source folder ID
    };

    const startMove = (docId: string) => {
        setSelectedDocId(docId);
        setIsMoving(true); // Start move mode
        handleCloseMenu(); // Close the context menu immediately after starting the move
    };

    const cancelMove = () => {
        setIsMoving(false);
        setTargetFolderId(null);
        setSelectedDocId(null);
        setSourceFolderId(null); // Reset source folder ID
    };

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
                        sx={{
                            padding: 2,
                            textAlign: "center",
                            position: "relative",
                            backgroundColor:
                                isMoving && doc._id === selectedDocId ? "#f0f0f0" : "inherit",
                            opacity: isMoving && doc._id === selectedDocId ? 0.5 : 1,
                            pointerEvents:
                                isMoving && doc._id === selectedDocId ? "none" : "auto",
                        }}
                        onClick={() => {
                            if (isMoving && doc.type === "folder") {
                                setTargetFolderId(doc._id); // Set target folder for move
                            } else if (!isMoving && doc.type === "folder") {
                                openFolder(doc._id, doc.name);
                            }
                        }}
                    >
                        {doc.type === "folder" ? (
                            <FolderIcon fontSize="large" />
                        ) : (
                            <InsertDriveFileIcon fontSize="large" />
                        )}
                        <Typography>{doc.name}</Typography>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent folder navigation
                                handleMenuClick(e, doc._id);
                            }}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            ));
    };

    return (
        <Box p={4} sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Document Manager
            </Typography>

            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                {breadcrumbs.map((crumb, index) => (
                    <Link
                        key={crumb.id || "root"}
                        underline="hover"
                        color={
                            index === breadcrumbs.length - 1 ? "text.primary" : "inherit"
                        }
                        onClick={() => navigateToBreadcrumb(index)}
                        sx={{ cursor: "pointer" }}
                    >
                        {crumb.name}
                    </Link>
                ))}
            </Breadcrumbs>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "name" | "createdAt")}
                    size="small"
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="name">Sort by Name</MenuItem>
                    <MenuItem value="createdAt">Sort by Created At</MenuItem>
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setDialogOpen(true)}
                >
                    Add Document
                </Button>
            </Box>

            <Grid container spacing={2}>
                {renderDocs(documents, currentFolder)}
            </Grid>

            {isMoving && (
                <Box mt={2}>
                    <Typography variant="body1">
                        Moving document to folder: {targetFolderId}
                        Selected Document ID: {selectedDocId}
                    </Typography>
                </Box>
            )}

            {/* Dialog for Adding Documents */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add Document</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Document Name"
                        type="text"
                        fullWidth
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                    />
                    <Select
                        value={newDocType}
                        onChange={(e) => setNewDocType(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="file">File</MenuItem>
                        <MenuItem value="folder">Folder</MenuItem>
                    </Select>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddDoc}>Add</Button>
                </DialogActions>
            </Dialog>
            {/* Context Menu */}
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleRenameDoc}>Rename</MenuItem>
                <MenuItem onClick={handleDeleteDoc}>Delete</MenuItem>
                <MenuItem onClick={() => startMove(selectedDocId!)}>Move</MenuItem>
            </Menu>
        </Box>
    );
};

export default DocumentManager;
