import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["file", "folder"],
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doc",
        default: null // Root-level files/folders have no parent
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    path: {
        type: String,
        required: true
    },
    depth: {
        type: Number,
        default: 0 // Default depth for root-level items
    },
    metadata: {
        size: Number, // For files
        mimeType: String, // For files
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }
}, { timestamps: true });

// Pre-save hook to calculate depth
docSchema.pre('save', async function (next) {
    if (this.parentId) {
        const parentDoc = await mongoose.model("Doc").findById(this.parentId);
        if (parentDoc) {
            this.depth = parentDoc.depth + 1; // Increment parent's depth
        }
    }
    next();
});

export const Doc = mongoose.model("Doc", docSchema);
