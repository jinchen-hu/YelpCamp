const mongoose = require("mongoose");
const Comment = require("./comment");

// Set up schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        username: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
});

// add a pre hook
campgroundSchema.pre("remove", async function () {
    await Comment.deleteMany({
        _id: {
            $in: this.comments,
        },
    });
});

module.exports = mongoose.model("Campground", campgroundSchema);
