// 使用Promise实现sleep

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

var start = new Date().getTime();
sleep(2000).then(() => {
  console.log(1);
  // 在这里写all
});

//promise all
let p1 = new Promise((resolve) => {resolve(1)})
let p2 = new Promise((resolve) => {resolve(2)})
let p3 = new Promise((resolve) => {resolve(3)})

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
      let results = [];
      let count = 0;
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(result => {
          results[index] = result;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        }).catch(error => {
          reject(error);
        });
      });
    });
  }