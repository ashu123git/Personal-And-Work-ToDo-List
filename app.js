const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));
const personalToDo = [];
const workToDo = [];

app.get("/", function(req, res) {
    const myDate = new Date();
    var options = {
        weekday: 'long',
        month: 'long', 
        day: 'numeric'
    }

    const dayName = myDate.toLocaleDateString("en-US", options);
    res.render("data", {
        dayShow: dayName,
        personalTD: personalToDo
    });
})

app.get("/work", function(req, res) {
    res.render("data", {
        dayShow: "Work List",
        personalTD: workToDo
    })
})

app.post("/", function(req, res) {
    var itemName = req.body.text1;
    var todoName = req.body.submit;
    if(todoName === "Work") {
        workToDo.push(itemName);
        res.redirect("/work");
    }
    else {
        personalToDo.push(itemName);
        res.redirect("/");
    }
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000. Press Ctrl+C to quit server...")
})