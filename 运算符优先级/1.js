function F() {
    this.a = 1
    this.f = function () {
        this.a = 3
    }
}

F.f = function () {
    this.a = 2
}

var r = new F.f()

console.log(r);//{a:2} 先执行F.f 再执行带参数的 new 运算符 new ...()
console.log("Hello"+true?"World":"JS"); //World 问号只返回后面的结果 ""是false " "是true
console.log((0,1));//逗号操作符  对它的每个操作数求值（从左到右），并返回最后一个操作数的值。

var obj = {
    a: {
        f: function(){
            return function(config){
				console.log(this)
            };
        }
    }
};
var type = "a";
var config = {};
new obj[type].f()(config); //Window js引擎解析为 (new obj[type].f())(config) 括号运算符,优先... ()

