const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

var seeds = [
    {
        name: "Cloud's Rest",
        image:
            "https://cdn.stocksnap.io/img-thumbs/280h/camp-tent_PTERNSNX0F.jpg",
        description: "dffbakabaka",
    },
    {
        name: "Love Journy",
        image: "https://cdn.stocksnap.io/img-thumbs/280h/GUYV05GAYJ.jpg",
        description: "dffbakabaka",
    },
    {
        name: "Quiet Dark",
        image: "https://cdn.stocksnap.io/img-thumbs/280h/LXJNKNODU0.jpg",
        description: "dffbakabaka",
    },
];

async function seedDB() {
    try {
        await Comment.deleteMany({});
        console.log("Removed All Campgrounds");
        await Campground.deleteMany({});
        console.log("Removed All Comments");
        for (const seed of seeds) {
            let campground = await Campground.create(seed);
            console.log("Campground created");
            let comment = await Comment.create({
                text: "This is an awesome experience",
                author: "Leet L",
            });
            console.log("Comment created");
            campground.comments.push(comment);
            campground.save();
            console.log("Comment added to campground");
        }
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = seedDB;
