var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds');

/* seedDB(); */


mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true,useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



app.listen(3000, function() {
    console.log("YelpCamp has started.")
})

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    console.log(req.params.id);
    Campground.findById(req.params.id).populate("comments").exec(
        function (err, campground) {
            if (err) {
                console.log("ERROR!!!");
            } else {
                console.log("show campground :" + campground);
                res.render("campgrounds/show", {campground: campground});
                
                
            }
        }
    );
});

app.get("/campgrounds/:id/comments/new", function(req, res) {

    console.log(req.params.id);
    Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                console.log("ERROR!!!");
            } else {
                console.log("show new comment page :" + campground);
                res.render("comments/new", {campground: campground});                
            }
        }
    );
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("ERROR!!!");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
            console.log(allCampgrounds);
        }
    });
});


app.post("/campgrounds/:id/comments", function(req, res) {

    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log("error finding campground");
            res.send("error: problem finding campground");
        } else {
            var newComment = req.body.comment;
            newComment["timestamp"] = Date.now();
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, createdComment) {
                if (err) {
                    console.log("error creating comment");
                    res.send("error: problem creating comment");
                } else {
                    console.log("comment created, associating to campground");
                    campground.comments.push(createdComment);
                    campground.save(function(err) {
                        if (err) {
                            console.log("Problem associating to campground");
                            console.log(err);
                            res.send("error: problem associating comment to campground");

                        } else {
                            res.redirect("/campgrounds/" + req.params.id);                            
                        }
                    });
                }
            });                 
        }
    });
});

app.post("/campgrounds", function(req, res) {
    Campground.create({
        name: req.body.campgroundname, 
        image: req.body.campgroundimg,
        description: req.body.campgrounddesc
    }, function (err, newCampground) {
        if (err) {
            console.log("ERROR!!!");
        } else {
            console.log(newCampground)
        }
    });

    res.redirect("/campgrounds");
});