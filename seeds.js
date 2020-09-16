var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Peace Dark",
        image: "https://cdn.stocksnap.io/img-thumbs/280h/L29FUNSW0T.jpg",
        description:
            "Mont-Tremblant isn’t just a ski resort. While the skiing here is undeniably appreciated, camping in the largest and oldest provincial park in Quebec offers a unique access to the Laurentian mountains, a range containing over 400 rivers, lakes and streams. ",
        author: {
            id: "588c2e092403d111454fff76",
            username: "Jack",
        },
    },
    {
        name: "Lake Side",
        image:
            "https://cdn.stocksnap.io/img-thumbs/280h/people-man_D6YUV5A6O8.jpg",
        description:
            "This large conservation park just outside downtown Ottawa-Gatineau offers year-round camping, ranging from ordinary tent camping to RV sites, canoe-camping sites and ready-to-camp units which include yurts, tents and cabins.",
        author: {
            id: "588c2e092403d111454fff71",
            username: "Jill",
        },
    },
    {
        name: "Natual Breath",
        image: "https://cdn.stocksnap.io/img-thumbs/280h/HQR8BJFZID.jpg",
        description:
            "The Adirondacks are northern New York’s mountain playground, and this campground just outside of Lake Placid, New York will give you a good taste of the area while being a minimal distance from Montreal. The neighbouring Whiteface Mountain is one of the highest in the area, so hikers and climbers should have more than enough to keep them preoccupied. ",
        author: {
            id: "588c2e092403d111454fff77",
            username: "Jane",
        },
    },
];

function seedDB() {
    //Remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text:
                                    "This place is great, but I wish there was internet",
                                author: {
                                    id: "588c2e092403d111454fff76",
                                    username: "Jack",
                                },
                            },
                            function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            }
                        );
                    }
                });
            });
        });
    });
}

module.exports = seedDB;
