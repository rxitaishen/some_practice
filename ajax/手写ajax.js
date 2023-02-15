function ajax(type, url, success, failure) {
    let req = new XMLHttpRequest();//创建实例、监听请求状态，open（链接与同步异步）发送请求
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            //因为现在加入了请求中断的设置,请求如果超过了时间,就会触发中断,触发中断再获取status值就会报错,所以要trtcatch
            try {
                if (req.status >= 200 && req.status < 300 || req.status === 304) {
                    console.log('Request success');
                    success(req.responseText);
                }
                else {
                    console.log('Request fail');
                    failure(req.responseText);
                }
            }
            catch {
                console.log('Request Error');
            }
        }
    }
    req.open(type, url, true);

    if (type === 'post') {
        let form = document.getElementById('form');
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(new formData(form));
    }


}
let jsonObj = { type: 'post', url: xxx, success: function () { console.log(); }, failure: function () { } }
ajax(...jsonObj)