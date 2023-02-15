var result = [];
var a = 3;
var total = 0;

function foo(a) {
    //3.这里如果被改为let i 将会是绝杀，可惜改不得，因为let会在每一次的迭代里面生成一个封闭的作用域
  for (var i = 0; i < 3; i++) {
    result[i] = function () { //2.因为这里的闭包都有一个共享的作用域，i就在那个被共享的作用域里
      total += i * a; //1.这里还没有调用，所以不用急着赋值，只是指定了result 的每一项是一个函数，函数有这个功能
      console.log(total);
    }
  }
}

foo(1);
//2.这里才调用闭包函数 此时foo函数里的for循环已经执行完毕，i已经被定为3
result[0](); // 3  
result[1](); // 6
result[2](); // 9


function foo2(a) {
  for (var i = 0; i < 3; i++) {
    console.log(i);
  }
}
foo2()//正常