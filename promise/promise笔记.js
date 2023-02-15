// const arr = [1, 2, 3];
// arr.forEach(item => {  //遍历回调，同步回调函数，不会放入队列，一上来就执行
//     console.log(item);
// });
// console.log("forEach()之后");


// ========================================================================================================================================================= //

//就算这里是0也是放到队列里面再进行的
// setTimeout( () => {  //异步回调函数，会放入队列中将来执行
//     console.log("timeout callback()");
// }, 0); 
// console.log("setTimeout()之后");

// ========================================================================================================================================================= //

// try {
// 	let d;
// 	console.log(d.xxx);
// } catch (error) {
// 	console.log('err:',error);
// 	console.log('message:',error.message)
// 	console.log('stack:',error.stack)
// }

// console.log('出错之后');

// ========================================================================================================================================================= //

// 抛出错误：throw error
// function something() {
//     console.log(Date.now());
// 	if(Date.now()%2===1) {
// 		console.log('当前时间为奇数，可以执行任务');
// 	}
// 	else {
// 		throw new Error('当前时间为偶数无法执行任务')//传入message
// 	}
// }
// // 捕获处理异常
// try  {
// 	something()
// } catch (error) {
//     console.log('alert: ', error.message);
// }

// ========================================================================================================================================================= //

//语法
//  new Promise( function(resolve, reject) {...} /* executor */  );
//参数
/*
executor是带有 resolve 和 reject 两个参数的函数 。Promise构造函数执行时立即调用executor 函数，
 resolve 和 reject 两个内置函数作为参数传递给executor（executor 函数在'Promise构造函数'返回'所建的promise实例对象'前被调用）。which is p.then() 那里
 resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。
 这两个都是promise的静态方法，都可以直接调用并改变promise 的状态
 executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，
 要么调用reject 函数将promise的状态改为rejected。如果在executor函数中抛出一个错误，
 那么该promise 状态为rejected。executor函数的返回值被忽略。
*/
// 1. 创建一个新的promise对象
const p = new Promise((resolve, reject) => {// 执行器函数
    // 2.执行异步操作任务
    setTimeout(() => {
        const time = Date.now()// 如果当前时间是偶数就代表成功，否则代表失败
        // 3.1. 如果成功了，调用resolve(value)
        if (time % 2 == 0) {
            resolve('成功的数据，time=' + time)
        } else {
            //3.2.如果失败了，调用reject(reason)
            reject('失败的数据，time=' + time)
        };
    }, 1000);
})
p.then(
  //这里定义onResolve、onRejected函数，只跟这两个的位置有关，他不会去匹配命名value还是reason
    value => { //接收得到成功的value数据 onResolved
        console.log('成功的回调', value)
        console.log(1,'我是resolve函数');
    },
    reason => {// 接收得到失败的reason数据 onRejected
        console.log('失败的回调', reason)
    }
)