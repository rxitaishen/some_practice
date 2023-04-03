2. 通过 Worker spark-md5 快速切片计算文件 hash 值：
Worker 介绍：
Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

目录介绍：
├── static
│   ├── hash.js				//快速计算文件hash入口文件 (放在 static 文件夹是为了方便 Worker 访问)
│   └── spark-md5.min.js	//需要用到 spark-md5 库
├── pages           
│   └── file_hash.vue	    //快速计算文件hash
│   ...

yarn add spark-md5 // 安装该库， 将其内部的 spark-md5.min.js 文件和 hash.js放在一起共 importScripts 访问

file_hash.vue
``` html
<script>
export default {
methods: {
  async uploadFile() {
   const hash = await fileHash()
   console.log("文件哈希是：", hash)
   ...
  },
  async fileHash() {
    const chunks = []
    let cur = 0
    while (cur < this.file.size) { // this.file 为 e.target.files[0]
      chunks.push({ index: cur, file: this.file.slice(cur, cur + 1 * 1024 * 1024)}) // 1MB切片
      cur += size
    }
   	return new Promise( resolve => {
        this.worker = new Worker('/hash.js')// 开启一个外部进程
        this.worker.postMessage({ chunks }) // 给外部进程传递信息 
        this.worker.onmessage = e => {      // 接收外部Worker回传的信息
          const { progress, hash } = e.data
          this.hashProgress = Number(progress.toFixed(2)) //计算hash值的进度条
          if (hash) {
            resolve(hash) // 得到计算出来的hash
          }
        }
    })
  }
}
</script>
``` 
hash.js:

``` js
self.importScripts('spark-md5.min.js') // 引入 spark-md5

self.onmessage = e => {                // 接收主线程传递的参数
  const { chunks } = e.data
  const spark = new self.SparkMD5.ArrayBuffer()

  let progress = 0, count = 0

  const loadNext = index => {
    if (index == 0) {
      progress = 0
      count = 0
    }
    const reader = new FileReader()
    reader.readAsArrayBuffer(chunks[index].file)
    reader.onload = e => {
      count++
      spark.append(e.target.result)    // 将读取的内容添加入spark生成hash
      if (count == chunks.length) {
        self.postMessage({
          progress: 100,
          hash: spark.end()
        })
      } else {
        progress += 100 / chunks.length
        self.postMessage({ progress })
        loadNext(count)
      }
    }
  }
  loadNext(0)
}
``` 

拓展：通过抽样加快 hash 的计算速度
方法：抽取文件内一部分字段放入 chunks 数组内，通过减小计算 hash 的文件大小， 来增加 hash 的计算速度。
缺点：有少许可能照成误差，对于需精确计算 hash 则不适用，取舍有寸即可！
在这里插入图片描述

例如：

``` html
<script>
import sparkMD5 from 'spark-md5'

export default {
methods: {
 async calculateHashSample() {
  // this.file 为 e.target.files[0]
  const spark = new sparkMD5.ArrayBuffer(), reader = new FileReader(),
  file = this.file, size = file.size, offset = 2 * 1024 * 1024 
  // hash抽样: 第一个区块2M，中间区块取前中后各2个字节，最后区块数据全要
  let chunks = [file.slice(0, offset)]
  let cur = offset
  while (cur < size) {
    if (cur + offset >= size) {
      chunks.push(file.slice(cur, cur + offset))
    } else {
      const mid = cur + offset / 2, end = cur + offset
      chunks.push(file.slice(cur, cur + 2))
      chunks.push(file.slice(mid, mid + 2))
      chunks.push(file.slice(end - 2, end))
    }
    cur += offset
  }
  this.chunks = chunks //抽样后的区块
  //下面拿去计算hash就会很快
 }
}
</script>
```