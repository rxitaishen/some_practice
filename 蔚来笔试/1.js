
/*
console.log(1);
let a = setTimeout(()=>{console.log(2)}, 0);
console.log(3);
Promise.resolve(4).then(b => {
    console.log(b);
    clearTimeout(a);
});
console.log(5);
*/

/*
1
3
5
4
*/


/*
var a = 1;
function fn(){
    var a = 2;
    function a() {console.log(3);}
    return a;
    function a() {console.log(4);}
}
var b = fn();
console.log(b);
*/


/*
2
*/

