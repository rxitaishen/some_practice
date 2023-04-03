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
