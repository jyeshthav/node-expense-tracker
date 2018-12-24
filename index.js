var total = {
    expense: (x, y) => (parseInt(x) + parseInt(y)),
    saved: (x, y) => (x - y)
};

// with external node module: 
// var total = require('./total');

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');

const hostname = 'localhost';
const port = 8080;

const app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

function calculate(a, b, c){
    if (c == 1){
        // console.log("previous total is: "+a);
        // console.log("adding new expense: "+b);
        // console.log("total expense: "+total.expense(a,b));
        return total.expense(a,b);
    }
    else if (c == 2){
        // console.log("total income is: "+a);
        // console.log("new expense: "+b);
        if (b > a){
            console.log("insufficient funds");
            return 'error';
        }
        else{
            // console.log("total saving: "+total.saved(a,b));
            return total.saved(a,b);
        }
    }
    // console.log("This statement after the call to calculate()");  
}


app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/', function(req, res){
    res.render('index');
});
app.post('/', urlencodedParser, function(req, res){
    // console.log(req.body);
    var travel_e = req.body.expense1;
    var food_e = req.body.expense2;
    var other_e = req.body.expense3;
    var i = req.body.income;
    var total_e1 = calculate(100, travel_e, 1);
    var total_e2 = calculate(total_e1, food_e, 1);
    var total_e = calculate(total_e2, other_e, 1);
    var total_save = calculate(i, total_e, 2);
    var total = [total_e, total_save];
    res.render('total', {qs: total});
});
app.get('/total', function(req, res){
    res.render('index');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });


// var c = calculate(40, 20, 1);
// console.log(c);
// calculate(40, 20, 2);
// calculate(20, 40, 2);