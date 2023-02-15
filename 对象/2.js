//json的遍历方法
//json的长度和对象一样是获取不到的，为unddefined，自然而然不能用for循环遍历
var obj = {}
obj.nan = 'boy'
console.log(obj.length);//undefined
//用for in 遍历
for(var key in obj){
    console.log(obj[key]);
}
obj['nan'] = 'girl'; //使用中括号的时候属性名要加引号，不然被当做一个变量来看
console.log(obj);

var arr = [1,2,3]
for(var value of arr){
    console.log(value); //for of 遍历数组(不会跳过数组未赋值过的位置(也就是undefined的位置)) ，for in 遍历对象
}

//in运算符是对对象里面是否有属性用的
console.log('name' in obj);

/*
    for…of 是ES6新增的遍历方式，允许遍历一个含有iterator接口的数据结构（数组、对象等）并且返回各项的值，和ES3中的for…in的区别如下

    for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
    for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
    对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

    总结： for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

*/