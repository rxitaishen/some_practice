//解构赋值
const foo = [1,2,3,4,5]
const [a,bd,e] = foo //数组解构 按顺序赋值
console.log(a,bd,e);//1,2,3

const foo2 = {
    name:'lululu',
    pass:123
}
const {name,pass} = foo2 //一定要名字对应
console.log('name,pass: ', name,pass);