import { Doc } from "../models/docModel.js";
import path from "path";

// Add file/folder
export const addDoc = async (req, res) => {
    try {
        const { name, type, parentId } = req.body;
        const ownerId = req.user.id;

        if (!name || !type) {
            return res.status(400).json({ message: "Name and type are required." });
        }

        // Check if parent exists
        let parentPath = "/";
        if (parentId) {
            const parent = await Doc.findById(parentId);
            if (!parent || parent.type !== "folder") {
                return res.status(400).json({ message: "Invalid parent folder." });
            }
            parentPath = parent.path;
        }

        // Create path for the new doc
        const newPath = path.join(parentPath, name);

        // Add document to database
        const newDoc = await Doc.create({
            name,
            type,
            parentId: parentId || null,
            ownerId,
            path: newPath
        });

        return res.status(201).json(newDoc);
    } catch (error) {
        console.error("Error adding document:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Rename file/folder
export const renameDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const { newName } = req.body;

        // Find the document to rename
        const doc = await Doc.findById(id);
        if (!doc) {
            return res.status(404).json({ message: "Document not found." });
        }

        // Save the old path for updating descendant paths
        const oldPath = doc.path;

        // Update the name and path of the document
        doc.name = newName;
        doc.path = path.join(path.dirname(doc.path), newName).replace(/\\/g, '\\'); // Use backslashes
        await doc.save();

        // Find and update paths of all descendants
        const descendants = await Doc.find({ path: { $regex: `^${oldPath.replace(/\\/g, '\\\\')}\\\\` } });
        for (const descendant of descendants) {
            descendant.path = descendant.path.replace(oldPath, doc.path); // Replace old path with new path
            await descendant.save(); // Save each updated document
        }

        res.status(200).json(doc);
    } catch (error) {
        console.error("Error renaming document:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Delete file/folder
export const deleteDoc = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document to delete
        const doc = await Doc.findById(id);
        if (!doc) {
            return res.status(404).json({ message: "Document not found." });
        }

        // Delete all child documents if it's a folder
        if (doc.type === "folder") {
            const escapedPath = doc.path.replace(/\\/g, '\\\\'); // Escape backslashes in the path
            await Doc.deleteMany({ path: { $regex: `^${escapedPath}\\\\` } }); // Delete all descendants
        }

        // Delete the folder or file itself
        await doc.deleteOne();

        res.status(200).json({ message: "Document deleted successfully." });
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Move file/folder
export const moveDoc = async (req, res) => {
    try {
        const { id } = req.params; // Document ID to move
        const { newParentId } = req.body; // New parent folder ID

        // Find the document to be moved
        const doc = await Doc.findById(id);
        if (!doc) {
            console.error(`Document not found: ${id}`);
            return res.status(404).json({ message: "Document not found." });
        }

        // Find the new parent folder
        const newParent = newParentId ? await Doc.findById(newParentId) : null;
        if (newParentId && (!newParent || newParent.type !== "folder")) {
            console.error(`Invalid new parent folder: ${newParentId}`);
            return res.status(400).json({ message: "Invalid new parent folder." });
        }

        // Update the parentId and path of the document being moved
        doc.parentId = newParentId || null;
        const newPath = newParentId ? path.join(newParent.path, doc.name) : `/${doc.name}`;
        doc.path = newPath;
        await doc.save();

        // Find and update all child documents to reflect the new parentId and path
        const children = await Doc.find({ parentId: id });
        for (const child of children) {
            child.parentId = doc._id;
            child.path = `${newPath}\\${child.name}`; // Set the new path correctly
            await child.save(); // Save each child document
        }

        res.status(200).json(doc);
    } catch (error) {
        console.error("Error moving document:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Fetch all files and folders
export const fetchDocs = async (req, res) => {
    try {
        const docs = await Doc.find({ ownerId: req.user.id });
        res.status(200).json(docs);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}