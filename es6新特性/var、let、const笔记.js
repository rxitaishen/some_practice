//变量提升：提升到那个作用域的第一行去,如果那个作用域没有，再往上一个作用域找
// var可以声明相同的变量名，但在同一个作用域内会覆盖掉上一个声明的同名变量，

// ===== 案例1 ======= //
console.log(v1);//undefined
var v1 = 100;
console.log(v1);//100
var v1 = 90;
/*
    相同作用域声明相同的变量就顶替掉之前声明的变量了。函数也是，也会变量提升，
    假设我这里的函数名不是 foo 而是 foo1 ，并且和下面的案例二 foo1 代码块一起执行当我执行的时候，
    用的函数不是这里声明的foo1，而是下面声明的第二个foo1
*/
console.log(v1);//90
function foo() {
    console.log('函数第一个log',v1);//undefined，因为下面声明了这个作用域内的v1，var变量提升了，没有下面的var就会打印 函数第一个log 90
    var v1 = 20; //在这个作用域里重新声明了一个新变量 V1，但因为作用域的问题 区别 于上一个全局作用域里的 v1 变量
    console.log('函数第二个log',v1);//20
}
foo();
console.log('foo结果log',v1);//90

// ===== 案例2 ======= //
console.log(v1);//undefined
var v1 = 100;
function foo1() {
    console.log(v1);//100
    v1 = 20; //在这个作用域里重新声明了一个新变量 V1，但因为作用域的问题区别于上一个全局作用域里的 v1 变量
}
foo1();
console.log('foo1结果log',v1);//20


// ========================================================================================================================================================= //

// let不可以声明之前相同作用域内用 var 或者 const 声明过的相同的变量名，也就是暂时性死区，正因如此，下面这个想法是错误的。我之前以为 foo2 里面的第一个 log 
// 会往上一个作用域找 v1 但因为 let 的暂时性死区，也就是不能声明之前用 var 或者 const 声明过的相同的变量名，导致了第一个 log 报错

console.log(v2);
var v2 = 100;
function foo2() {
    // console.log('foo2第一个log',v2);//因为暂时性死区，报错Cannot access 'v2' before initialization 不能在声明之前使用 v2 ，但去掉了下一行的 let 就没事了,会打印100
    let v2 = 0;
    console.log('foo2第二个log',v2) //0 不会报错，因为相同变量名的var v2 在上一个作用域
    var v3 = 90;
    let v3 = 80;
    console.log('foo2第三个log',v3) //Identifier 'v3' has already been declared 不能声明。同一个作用域内let不能声明已被var const声明的变量名
}
foo2();
v2=20
console.log('foo2结果log',v2);//20

let a = 20;
function func(){
    a= 20
}


// ========================================================================================================================================================= //

// const 声明的变量一定要初始化，且之后不可改变，但有一个例子例外，就是他是引用类型的变量的时候，保存的是【堆内存】中的地址，
// 这个地址不可变，但地址指向的对象里面的内容是可以改变的。
const value = { name: 'test' };
console.log(value); // { name: 'test' }
value.name = 'test...'; // { name: 'test...' }
console.log(value); // { name: 'test...' }
value = {}; // 报错