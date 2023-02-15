let arr = [1, 3, {

    username: ' kobe'

},function(){}];

let arr4 = JSON.parse(JSON.stringify(arr)); //方法一，但不能复制函数，函数为null

arr4[2].username = 'duncan';

console.log(arr, arr4)