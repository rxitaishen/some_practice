// 这里用的nodejs模块
function getNotices() {
    // 在Node.js中执行Python脚本
    let res = "";
    // let cmd = 'pip install requests --user && pip install bs4 --user && python ./public/爬取通知.py '
    let cmd = "python ./public/爬取通知.py ";
    
    function myAsyncFunction() {
      return new Promise(function (resolve, reject) {
        exec(cmd, { encoding: binaryEncoding }, (error, stdout, stderr) => {
          if (error) {
            console.error(`执行Python脚本时出错： ${error}`);
            console.error(
              iconv.decode(Buffer.from(stderr, binaryEncoding), encoding)
            );
            reject(error);
          }
          // 打印输出
          const res = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding);
          resolve(res);
        });
      });
    }
    return myAsyncFunction();
}

// 使用
// 等他有值了再进行操作，把异步转成同步的。
getNotices()
.then(function (result) {
    // 对 res 进行一些操作，对项目里的变量进行一些赋值。
    res.send(getTitleAndLink(result.substr(1)));
})
.catch(function (error) {
  console.error(error); // 处理错误
});


// chatgpt
function myAsyncFunction() {
    return new Promise(function(resolve, reject) {
    // 在这里进行异步请求
    // 例如使用 XMLHttpRequest、fetch、jQuery.ajax 等
    // 请求成功后调用 resolve 方法并传入结果
    // 请求失败则调用 reject 方法并传入错误信息
    });
}

// 调用函数并等待结果
myAsyncFunction().then(function(result) {
console.log(result); // 返回结果
}).catch(function(error) {
console.error(error); // 处理错误
});

  