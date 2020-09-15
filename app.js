const express = require("express"),
    mongoose = require("mongoose"),
    bodyPaser = require("body-parser"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds");

var app = express();
app.use(bodyPaser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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

app.use(
    require("express-session")({
        secret: "I love mayday",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

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
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user,
            });
        }
    });
});

// GET - New - create a new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
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
                res.render("campgrounds/show", { campground: foundCampground });
            }
        });
});

// ====================
// COMMENTS
// ====================
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    // look up campgrounds by using id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err.message);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err.message);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Auth routes
// show register form
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                console(err.message);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, () => {
                res.redirect("/campgrounds");
            });
        }
    );
});

// show login form
app.get("/login", (req, res) => {
    res.render("login");
});

// handle login logic
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }),
    (req, res) => {}
);

// logout route
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(4444, () => {
    console.log("Yelpcamp has started !!!");
});
