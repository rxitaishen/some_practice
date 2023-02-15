var a = 3;
console.log(b);//预期undefined
if (a === 3) {
    {//看来这里的var提升了 ， 这个显示的块级作用域只是对let和const 有效果，其实用了let之后加不加这个显示作用域都一样
        var b = 1;
        console.log(b); //1
    }

}
console.log(b);//这里还是能输出1