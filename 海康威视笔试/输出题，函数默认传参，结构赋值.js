function foo([
    a = 'hello',
    b = 'beauty',
    c,
    d = 'world',
] = [], e) {
    console.log(a + b,e);
    console.log(c);
    console.log(d);
}
// 只有hi传入，把hi结构了，因为这个函数只接收一个参数
foo('hi','john','wick','');