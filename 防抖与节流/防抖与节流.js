
let timer = null
function foo(){
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //     console.log('一个占用资源很大的函数执行了');
    // },10)
    console.log(this.i);
}
var i = 0;
for(var j = 0;j<=10;j++){
    foo()
}