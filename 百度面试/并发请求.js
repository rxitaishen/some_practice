// https://juejin.cn/post/7081150028529532964
// 假定全局声明ajax，写一个并发处理的request，
// 要求能并发发送不超过pool个请求
function createRequest(config) {
    const { pool } = config;
    queue = []; // 待处理的队列
    processCount = 0; // 处理中的个数

    function processNext() {
        if (processCount >= pool) {
            // 超过并发数
            return; 
        }
        const config = queue.shift();
        if (config) {
            processCount ++;
            const p = ajax(config.url, config.params);
            p.finally(res => {
                // 请求完成，不管有没有成功都继续
                processCount --;
                // 执行下一个
                processNext();
            });
            // 
            p.then(config.resolve, config.reject);
        }
    }

    return function(url, params) {
        return new Promise((resolve, reject) => {
            queue.push({
                url, params, resolve, reject
            });
            processNext();
        })
    }

}

// chatgpt对于并发请求的限制手写
const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
const maxConcurrency = 3; // 设置最大并发数为3

// 将urls数组按照maxConcurrency分组
const groups = urls.reduce((acc, url, index) => {
  const groupIndex = index % maxConcurrency;
  if (!acc[groupIndex]) {
    acc[groupIndex] = [];
  }
  acc[groupIndex].push(url);
  return acc;
}, []);

// 执行每个分组中的请求，并返回结果数组
const results = await Promise.all(
  groups.map(group => Promise.all(group.map(url => fetch(url))))
);

// 将结果数组合并成一个数组
const combinedResults = results.flat();
