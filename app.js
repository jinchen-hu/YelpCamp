const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require("body-parser");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");

var app = express();
app.use(bodyPaser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Connect to the Database
mongoose
    .connect("mongodb://localhost:27017/yelp_camp", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to the MongoDB!"))
    .catch((err) => console.log(err.message));

seedDB();

app.get("/", (req, res) => {
    res.render("landing");
});

// GET - INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

// GET - New - create a new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

// POST - add new campground
app.post("/campgrounds", (req, res) => {
    // get data from form and add it to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    // Create a new campground and save to db
    Campground.create(newCampground, (err, newCreated) => {
        if (err) {
            console.log(err.message);
        } else {
            // redirect to campgournds
            res.redirect("/campgrounds");
        }
    });
});

// GET - show the info of one campground
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided id
    Campground.findById(req.params.id)
        .populate("comments")
        .exec((err, foundCampground) => {
            if (err) {
                console.log(err.message);
            } else {
                res.render("show", { campground: foundCampground });
            }
        });
});

app.listen(4444, () => {
    console.log("Yelpcamp has started !!!");
});

// Campground.create(
//     {
//         name: "Crispy Chicken",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/bread-bun_UGX0HQQPWI.jpg",
//         description:
//             "The is crispy chicken with ginger source made with Chinese cooking. A Sprit combined!",
//     },
//     (err, campground) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             console.log(campground);
//         }
//     }
// );

// var campgrounds = [
//     {
//         name: "Salmon Creek",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/hamburger-dinner_7QH4K6AESO.jpg",
//     },
//     {
//         name: "Crispy Chicken",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/bread-bun_UGX0HQQPWI.jpg",
//     },
//     {
//         name: "Hawaii Pizza",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/breakfast-eggs_29ULRQKX2X.jpg",
//     },
//     {
//         name: "Salmon Creek",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/hamburger-dinner_7QH4K6AESO.jpg",
//     },
//     {
//         name: "Crispy Chicken",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/bread-bun_UGX0HQQPWI.jpg",
//     },
//     {
//         name: "Hawaii Pizza",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/breakfast-eggs_29ULRQKX2X.jpg",
//     },
//     {
//         name: "Salmon Creek",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/hamburger-dinner_7QH4K6AESO.jpg",
//     },
//     {
//         name: "Crispy Chicken",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/bread-bun_UGX0HQQPWI.jpg",
//     },
//     {
//         name: "Hawaii Pizza",
//         image:
//             "https://cdn.stocksnap.io/img-thumbs/280h/breakfast-eggs_29ULRQKX2X.jpg",
//     },
// ];
