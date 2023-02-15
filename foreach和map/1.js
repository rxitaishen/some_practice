obj = {name : 'skr'}
let arr = [1, 2, 3, 4];
let arr2 = arr.forEach(function(letter,index) {
    console.log(this);//obj
    return arr[index] = letter*2 //如果直接 return letter*2的话就改不了数组
},obj);
console.log(arr) //2,4,6,8
console.log(arr2);//undefind

let arr3 = arr.map((letter,index) => {
    return letter*2
});
console.log(arr) //2,4,6,8
console.log(arr3);//2,4,6,8 *2