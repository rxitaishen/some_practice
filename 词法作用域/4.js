//函数表达式与函数声明，看 function 的位置，
//函数声明会提升，函数表达式不会

// 函数声明
function a() {
    return 1;
};

var d = {b:1};
//函数表达式,立即執行函數表達式的上下文要輸入分號才行
(function c(obj) { console.log(obj.b); })(d);

