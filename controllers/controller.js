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
// var itemOne = Piggy({item: 'angular'}).save(function(err){
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
            return total.saved(a,b);
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
    app.post('/total', urlencodedParser, function(req, res){
        // console.log(req.body);
        Piggy.find({}, function(err, data){
            if (err) throw err;

            // fetch existing from database and update locally
            var travel_e = parseInt(data[0].item) + parseInt(req.body.expense1);
            var food_e = parseInt(data[1].item) + parseInt(req.body.expense2);
            var other_e = parseInt(data[2].item) + parseInt(req.body.expense3);
            var i = parseInt(data[4].item) + parseInt(req.body.income);

            // for calculating total expense
            var total_e1 = calculate(travel_e, food_e, 1);
            var total_e2 = calculate(total_e1, other_e, 1);

            // saving
            var total_save = calculate(i, total_e2, 2);

            // display
            var total = [travel_e, food_e, other_e, total_e2, i, total_save];
            res.render('total', {qst: total});
        });
        
    });
    app.post('/dummy', urlencodedParser, function(req, res){
        // update changes to database
        Piggy.findByIdAndUpdate({_id: '5c2fd55182678032b0951c48'}, {$set: {item: req.body.update1}}, function (err, data) {
            if (err) throw (err);
            console.log("updated");
        });
        Piggy.findByIdAndUpdate({_id: '5c2fd5a6fd3ade1db4f2a45e'}, {$set: {item: req.body.update2}}, function (err, data) {
            if (err) throw (err);
            console.log("updated");
        });
        Piggy.findByIdAndUpdate({_id: '5c2fd5c2ace6a74188d3d754'}, {$set: {item: req.body.update3}}, function (err, data) {
            if (err) throw (err);
            console.log("updated");
        });
        Piggy.findByIdAndUpdate({_id: '5c2fd5e44fe809431cc264c9'}, {$set: {item: req.body.update4}}, function (err, data) {
            if (err) throw (err);
            console.log("updated");
        });
        Piggy.findByIdAndUpdate({_id: '5c30748f02a5ec061ce8bd76'}, {$set: {item: req.body.update5}}, function (err, data) {
            if (err) throw (err);
            console.log("updated");
        });
        Piggy.findByIdAndUpdate({_id: '5c3074c255886942c05915bd'}, {$set: {item: req.body.update6}}, function (err, data) {
            if (err) throw (err);
            console.log("updated");
        });
        res.render('dummy');
    });
};