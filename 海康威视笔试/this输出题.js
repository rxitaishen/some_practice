function add(a, b){
    console.log(a + b);
}
function sub(a, b){
    console.log(this); // 指向window
    console.log(a - b);
}
add.call(sub, 2, 1); // 函数也是对象，只是把this绑到这个函数上了，然而这个函数的this又是指向window的，就没事了
// 3