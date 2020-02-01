var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    { name: "Tan Hill Inn", image: "https://c4.staticflickr.com/8/7010/6701013907_838a7e8a20_z.jpg" },
    { name: "Granite Hill", image: "https://c8.staticflickr.com/1/754/20602842998_c4dba1d05a_z.jpg" },
    { name: "Mountain Goats Rest", image: "https://farm9.staticflickr.com/8383/8614076429_3693a0ae72_m.jpg" },
    { name: "Tan Hill Inn", image: "https://c4.staticflickr.com/8/7010/6701013907_838a7e8a20_z.jpg" },
    { name: "Granite Hill", image: "https://c8.staticflickr.com/1/754/20602842998_c4dba1d05a_z.jpg" },
    { name: "Mountain Goats Rest", image: "https://farm9.staticflickr.com/8383/8614076429_3693a0ae72_m.jpg" },
    { name: "Tan Hill Inn", image: "https://c4.staticflickr.com/8/7010/6701013907_838a7e8a20_z.jpg" },
    { name: "Granite Hill", image: "https://c8.staticflickr.com/1/754/20602842998_c4dba1d05a_z.jpg" },
    { name: "Mountain Goats Rest", image: "https://farm9.staticflickr.com/8383/8614076429_3693a0ae72_m.jpg" }
];

app.listen(3000, function() {
    console.log("YelpCamp has started.")
})

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res) {
    var campgroundobj = { name: req.body.campgroundname, image: req.body.campgroundimg }
    campgrounds.push(campgroundobj);
    res.redirect("/campgrounds");
});