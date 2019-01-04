// simple execution
exports.expense = (x, y) => (parseInt(x) + parseInt(y));
exports.saved = (x, y) => (x - y);

// with error handlng and callbacks:
// module.exports = (x,y,c,callback) => {
//     if (c == 1){
//         setTimeout(() => 
//             callback(null, {
//                 expense: () => (parseInt(x) + parseInt(y)),
//             }), 
//             2000);

//         // console.log("previous total is: "+a);
//         // console.log("adding new expense: "+b);
//         // console.log("total expense: "+total.expense(a, b));
//     }
//     else if (c == 2){
//         // console.log("total income is: "+a);
//         // console.log("new expense: "+b);
//         if (y > x){
//             setTimeout(() => 
//             callback(new Error("Insufficient funds"), 
//             null),
//             2000);
//         }
//         else{
//             setTimeout(() => 
//             callback(null, {
//                 saved:() => (x - y)
//             }), 
//             2000);
//         }
//     }
// }