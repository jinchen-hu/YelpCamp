const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

var seeds = [
    {
        name: "Cloud's Rest",
        image:
            "https://cdn.stocksnap.io/img-thumbs/280h/camp-tent_PTERNSNX0F.jpg",
        description:
            "The back woods, mountains, rivers and lakes of Québec and the Northeast make for excellent camping near Montreal. Whether you’re looking for an easy-going full-service RV experience or a rugged adventure off the beaten path, these campgrounds are your best bet. All offer access to some form of (rugged) rest and relaxation, from the best beaches in the region and great opportunities for hiking to outdoor activities like canoeing, fishing, cross-country skiing and snowshoeing. These spots are all within a four-hour drive, with some being easier to get to than others. If you’re looking for other ways to skip town, the best day trips or weekend getaways within Montreal’s orbit are where it’s at",
    },
    {
        name: "Love Journy",
        image: "https://cdn.stocksnap.io/img-thumbs/280h/GUYV05GAYJ.jpg",
        description:
            "The back woods, mountains, rivers and lakes of Québec and the Northeast make for excellent camping near Montreal. Whether you’re looking for an easy-going full-service RV experience or a rugged adventure off the beaten path, these campgrounds are your best bet. All offer access to some form of (rugged) rest and relaxation, from the best beaches in the region and great opportunities for hiking to outdoor activities like canoeing, fishing, cross-country skiing and snowshoeing. These spots are all within a four-hour drive, with some being easier to get to than others. If you’re looking for other ways to skip town, the best day trips or weekend getaways within Montreal’s orbit are where it’s at",
    },
    {
        name: "Quiet Dark",
        image: "https://cdn.stocksnap.io/img-thumbs/280h/LXJNKNODU0.jpg",
        description:
            "The back woods, mountains, rivers and lakes of Québec and the Northeast make for excellent camping near Montreal. Whether you’re looking for an easy-going full-service RV experience or a rugged adventure off the beaten path, these campgrounds are your best bet. All offer access to some form of (rugged) rest and relaxation, from the best beaches in the region and great opportunities for hiking to outdoor activities like canoeing, fishing, cross-country skiing and snowshoeing. These spots are all within a four-hour drive, with some being easier to get to than others. If you’re looking for other ways to skip town, the best day trips or weekend getaways within Montreal’s orbit are where it’s at",
    },
];

async function seedDB() {
    try {
        await Comment.deleteMany({});
        console.log("Removed All Comments");
        await Campground.deleteMany({});
        console.log("Removed All Campgrounds");
        for (const seed of seeds) {
            let campground = await Campground.create(seed);
            //console.log("Campground created");
            let comment = await Comment.create({
                text: "This is an awesome experience",
                author: "Leet L",
            });
            //console.log("Comment created");
            campground.comments.push(comment);
            campground.save();
            //console.log("Comment added to campground");
        }
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = seedDB;
