var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true,useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create(
    {   
 name: "Granite Hill", image: "https://c8.staticflickr.com/1/754/20602842998_c4dba1d05a_z.jpg" 
    }, function(err, camground) {
        if (err) {
            console.log(err);
        } else {
            console.log( "Newly created campground");
            console.log(campground);
        }
    });

 var campgrounds = [
    {},
    { name: "Mountain Goats Rest", image: "https://farm9.staticflickr.com/8383/8614076429_3693a0ae72_m.jpg" },
    { name: "Tan Hill Inn", image: "https://c4.staticflickr.com/8/7010/6701013907_838a7e8a20_z.jpg" },
    { name: "Granite Hill", image: "https://c8.staticflickr.com/1/754/20602842998_c4dba1d05a_z.jpg" },
    { name: "Mountain Goats Rest", image: "https://farm9.staticflickr.com/8383/8614076429_3693a0ae72_m.jpg" },
    { name: "Tan Hill Inn", image: "https://c4.staticflickr.com/8/7010/6701013907_838a7e8a20_z.jpg" },
    { name: "Granite Hill", image: "https://c8.staticflickr.com/1/754/20602842998_c4dba1d05a_z.jpg" },
    { name: "Mountain Goats Rest", image: "https://farm9.staticflickr.com/8383/8614076429_3693a0ae72_m.jpg" }
];
 */


app.listen(3000, function() {
    console.log("YelpCamp has started.")
})

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    console.log(req.params.id);
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("ERROR!!!");
        } else {
            res.render("show", {campground: campground});
            console.log(campground);
        }
    });
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("ERROR!!!");
        } else {
            res.render("index", {campgrounds: allCampgrounds});
            console.log(allCampgrounds);
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