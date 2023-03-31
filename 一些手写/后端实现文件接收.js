const req = {};
//上传接口逻辑
if (url === "/upload" && method === "POST") {
  // 定义一个缓存区
  const arr = [];
  req.on("data", (buffer) => {
    // 将前端传来的数据进行存储进缓存区
    arr.push(buffer);
  });
  req.on("end", () => {
    // 前端请求结束后进行数据解析 处理
    const buffer = Buffer.concat(arr);
    // 将数据变成string类型
    const content = buffer.toString();
    // 从传来的数存进test的文件里
    fileStream("test").write(buffer);
    // 返回前端请求完成
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("上传完成");
  });
}
// 后端对文件不解析，得到的数据如下
/*
------WebKitFormBoundary7YGEQ1Wf4VuKd0cE
Content-Disposition: form-data; name="file"; filename="index.html"
Content-Type: text/html

<html>
  <head>
    <title>上传文件</title>
  </head>
  <body>
    <form method="POST" enctype="multipart/form-data">
      <input type="file" name="file" value="请选择文件"><br />
      <input type="submit">
    </form>
  </body>
</html>
------WebKitFormBoundary7YGEQ1Wf4VuKd0cE--
*/

// 解析的代码
/**
 * @step1 过滤第一行
 * @step2 过滤最后一行
 * @step3 过滤最先出现Content-Disposition的一行
 * @step4 过滤最先出现Content-Type:的一行
 */
const decodeContent = content => {
    let lines = content.split('\n');
    const findFlagNo = (arr, flag) => arr.findIndex(o => o.includes(flag));
    // 查找 ----- Content-Disposition Content-Type 位置并且删除
    const startNo = findFlagNo(lines, '------');
    lines.splice(startNo, 1);
    const ContentDispositionNo = findFlagNo(lines, 'Content-Disposition');
    lines.splice(ContentDispositionNo, 1);
    const ContentTypeNo = findFlagNo(lines, 'Content-Type');
    lines.splice(ContentTypeNo, 1);
    // 最后的 ----- 要在数组末往前找
    const endNo = lines.length - findFlagNo(lines.reverse(), '------') - 1;
    // 先反转回来
    lines.reverse().splice(endNo, 1);
    return Buffer.from(lines.join('\n'));
  }

// 最终的服务端代码
if(url ==='/upload' && method === 'POST') {
//文件类型
const arr = []
req.on('data', (buffer) => {
    arr.push(buffer);
})
req.on('end', () => {
    const buffer = Buffer.concat(arr);
    const content = buffer.toString();
    const result = decodeContent(content);
    const fileName = content.match(/(?<=filename=").*?(?=")/)[0];
    fileStream(fileName).write(result);
    res.writeHead(200, {  'Content-Type': 'text/html; charset=utf-8' });
    res.end('上传完成')
})
}