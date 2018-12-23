// var total = {
//     expense: (x, y) => (x + y),
//     saved: (x, y) => (x - y)
// };

// with external node module: 
var total = require('./total');

function calculate(a, b, c){
    total(a, b, c, (err,total) => {
        if (err) {
	        console.log("ERROR: ", err.message);
	    }
        else {
            if (c == 1){
                console.log("previous total is: "+a);
                console.log("adding new expense: "+b);
                console.log("total expense: "+total.expense(a,b));
            }
            else if (c == 2){
                console.log("total income is: "+a);
                console.log("new expense: "+b);
                if (b > a){
                    console.log("insufficient funds");
                }
                else{
                    console.log("total saving: "+total.saved(a,b));
                }
            }
        }
    });
    // console.log("This statement after the call to calculate()");  
}

calculate(40, 20, 1);
calculate(40, 20, 2);
calculate(20, 40, 2);