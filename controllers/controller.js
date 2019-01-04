// var data = [{item: 'angular'}, {item: 'node'}, {item: 'react'}];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var total = require('../total');

var mongoose = require('mongoose');
mongoose.connect("mongodb://jyeshthav:piggy1@ds161459.mlab.com:61459/node-pig");
var pigSchema = new mongoose.Schema([{
    item: String
}])
var Piggy = mongoose.model('Piggy', pigSchema);
// var itemOne = Piggy(data).save(function(err){
//     if (err) throw err;
//     console.log('item saved!');
// });

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
            return 'gareeb';
        }
        else{
            // console.log("total saving: "+total.saved(a,b));
            return total.saved(a,b);
        }
    }
    // console.log("This statement after the call to calculate()");  
}

module.exports = function(app){
    // app.post('/', urlencodedParser, function(req, res){
    //     var newTodo = piggy(req.body).save(function(err, data){
    //             if (err) throw err;
    //             res.json({tasks: data});
    //         });
    // });
    app.get('/', function(req, res){
        // res.render('index');
        Piggy.find({}, function(err, data){
            if (err) throw err;
            res.render('index', {qs: data});
        });
    });
    app.post('/', urlencodedParser, function(req, res){
        // console.log(req.body);
        Piggy.find({}, function(err, data){
            if (err) throw err;
            console.log(data[0].item);
            console.log(data[1].item);
            console.log(data[2].item);
            console.log(data[3].item);

            // fetch existing from database and update locally
            var travel_e = parseInt(data[0].item) + parseInt(req.body.expense1);
            var food_e = parseInt(data[1].item) + parseInt(req.body.expense2);
            var other_e = parseInt(data[2].item) + parseInt(req.body.expense3);
            var i = parseInt(data[3].item) + parseInt(req.body.income);

            // for calculating total expense
            var total_e1 = calculate(travel_e, food_e, 1);
            var total_e2 = calculate(total_e1, other_e, 1);

            // saving
            var total_save = calculate(i, total_e2, 2);

            // display
            var total = [travel_e, food_e, other_e, total_e2, total_save];
            res.render('total', {qst: total});
        });
        
    });
    app.get('/total', function(req, res){
        res.render('index');
    });
};