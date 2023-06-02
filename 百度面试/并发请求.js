// https://juejin.cn/post/7081150028529532964
// 假定全局声明ajax，写一个并发处理的request，
// 要求能并发发送不超过pool个请求
async function fun1(){
    if (!file) return
    // 创建切片   
    // let size = 1024 * 1024 * 10; //10MB 切片大小
    let size = 1024 * 50 //50KB 切片大小
    let fileChunks = []
    let index = 0 //切片序号
    for(let cur = 0; cur < file.size; cur += size){
        fileChunks.push({
            hash: index++,
            chunk: file.slice(cur, cur + size)
        });
    }
    // 控制并发
    let pool = []//并发池
    let max = 3 //最大并发量
    for(let i=0;i<fileChunks.length;i++){
        let item = fileChunks[i]
        let formData = new FormData()
        formData.append('filename', file.name)
        formData.append('hash', item.hash)
        formData.append('chunk', item.chunk)
        // 上传切片
        let task = axios({
            method: 'post',
            url: '/upload',
            data: formData
        })
        task.then((data)=>{
            //请求结束后将该Promise任务从并发池中移除
            let index = pool.findIndex(t=> t===task)
            pool.splice(index)
        })
        pool.push(task)
        if(pool.length === max){
            //每当并发池跑完一个任务，就再塞入一个任务
            await Promise.race(pool) // 结合上面的task.then(),这里resolve了什么的task也会自己删一个。
        }
    }
    //所有任务完成,合并切片
    await axios({
        method: 'get',
        url: '/merge',
        params: {
            filename: file.name
        }
    });
    console.log('上传完成')
}