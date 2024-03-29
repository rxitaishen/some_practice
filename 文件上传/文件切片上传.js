function slice(file, piece = 1024 * 1024 * 5) {
    let totalSize = file.size; // 文件总大小
    let start = 0; // 每次上传的开始字节
    let end = start + piece; // 每次上传的结尾字节
    let chunks = []
    while (start < totalSize) {
      // 根据长度截取每次需要上传的数据
      // File对象继承自Blob对象，因此包含slice方法
      let blob = file.slice(start, end); 
      chunks.push(blob) // 可以在push里面做手脚，记录一下hash值
  
      start = end;
      end = start + piece;
    }
    return chunks
  }