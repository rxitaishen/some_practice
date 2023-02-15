const a = 1;
const obj = {
    a:2,
    b:function(){
        console.log(this.a);
    },
    c:()=>{
        console.log(this.a);
    }
}

obj.b();//2
obj.c();//undefined const不会绑定在window对象上，在一个作用域中吧 var才会在window上
let b = obj.b;
b()//undefined
console.log(a)//是能输出的，根据作用域链往上找
console.log(this.a)//是不能输出的，这里是window.a，输出不了