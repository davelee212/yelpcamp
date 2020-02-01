var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    { name: "Cloud's Rest",
      image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722a78d49549c25c_340.jpg",
      description: "blah blah blah"
    },
    { name: "Desert Mesa",
      image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e702c7bd6934ac1_340.jpg",
      description: "blah blah blah"
    },
    { name: "Canyon Floor",
      image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722a78d49549c25c_340.jpg",
      description: "blah blah blah"
    }    
]

function seedDB() {
    console.log("removing comments");
    Comment.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
    });

    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds"); 

            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log("error");
                    } else {
                        console.log("campground created");
                        Comment.create({
                            text: "where's the damn internet",
                            author: "Homer"
                        }, function(err, createdComment) {
                            if (err) {
                                console.log("error creating comment");
                            } else {
                                console.log("comment created");
                                campground.comments.push(createdComment);
                                campground.save();
                                console.log("comment associated to campground")
                            }
                        })
                        
                    }
                });
            });
        }
    });


}

module.exports = seedDB;

