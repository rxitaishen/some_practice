//严格模式下eval有自己的作用域
function foo(str){
    'use strict';
    eval(str);
    console.log(a);// 2
}

foo('var a = 2')

console.log(a);// a is not defined ，与 undefined 不同 ，undefined是声明了 ，这里看起来var的声明只提升到了函数作用域
