///////________POST REQUESTS & ERROR HANDLING___________////////

var express = require('express')
  , app = express()
  , cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router); //Goes last as it specifies WHEN routes are called!

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function(req, res, next) {
    res.render('fruitPicker', { 'fruits' : [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next(Error('Please choose a fruit!'));
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.listen(3000);
console.log('Express server listening on port 3000');




///////////_________________GET REQUESTS_________________________________////////
// var express = require('express')
//   , app = express() // Web framework to handle routing requests
//   , cons = require('consolidate'); // Templating library adapter for Express

// app.engine('html', cons.swig);
// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');
// app.use(app.router);

// // Handler for internal server errors
// function errorHandler(err, req, res, next) {
//     console.error(err.message);
//     console.error(err.stack);
//     res.status(500);
//     res.render('error_template', { error: err });
// }

// app.use(errorHandler);

// app.get('/:name', function(req, res, next) {
//     var name = req.params.name;
//     var getvar1 = req.query.getvar1;
//     var getvar2 = req.query.getvar2;
//     res.render('hello', { name : name, getvar1 : getvar1, getvar2 : getvar2 });
// });

// _____________________________CREATING A SERVER__________________________//////////
// app.listen(3000);
// console.log('Express server listening on port 3000');

// // Load the http module to create an http server.
// var http = require('http');

// // Configure our HTTP server to respond with Hello World to all requests.
// var server = http.createServer(function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.end("Hello World\n");
// });

// Listen on port 8000, IP defaults to 127.0.0.1
// server.listen(8000);

// Put a friendly message on the terminal
// console.log("Server running at http://127.0.0.1:8000/");


