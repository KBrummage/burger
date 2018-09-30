var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8082
//server static content for the app from the "public" directory in the application directory
app.use(express.static("public"));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

//set handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//import routes and give the serdver access to them.
var routes = require("./controllers/burgers_controllers.js");

app.use(routes);

// start our server so that it can begin listening to client requests.
app.listen(PORT, function(){
    //log server sid when our server has started.
    console.log("Server listening on: http://localhost:" + PORT);
})