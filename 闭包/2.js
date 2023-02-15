function foo2() {
    //3.这里如果被改为let i 将会是绝杀，可惜改不得，因为let会在每一次的迭代里面生成一个封闭的作用域
  for (var i = 0; i < 3; i++) {
  console.log(i);
  }
}
foo2()