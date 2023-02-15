// js只存在两个作用域 函数作用域和块级作用域 快作用域只有let和const ，var不会有块作用域 只会在函数作用域不能用
// if不会生成快作用域
// let会隐式生成块作用域
// 两个代码是一样的
var a = 3;
if (a === 3) {
    let b = 1;
    console.log(b); //1
}
if (a === 3) {
    {
        let b = 1;
        console.log(b); //1
    }
    
}

console.log(b);    //预期not defined referenceerr ,结果not defined referenceerr

