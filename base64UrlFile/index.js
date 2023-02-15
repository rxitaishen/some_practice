function urlToBase64(url) {
    const img = new Image()
    img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        const base64 = canvas.toDataURL()
        console.log("img.onload -> base64", base64) // base64
    }
    img.src = url
}

function urlToFile(url, fileName) {
    const img = new Image()
    img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        canvas.toBlob(function (blob) {
            blob.lastModifiedDate = new Date()
            blob.name = fileName
            console.log("img.onload -> blob", blob) // file
        })
    }
    img.src = url
}

function fileToUrl(file) {
    const objectURL = URL.createObjectURL(file)
    console.log("fileToUrl -> objectURL", objectURL) // url
}

function base64ToFile(base64, fileName) {
    var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr], {
        type: mime
    });
    blob.lastModifiedDate = new Date()
    blob.name = fileName
    console.log("functionbase64ToFile -> blob", blob) // file
}

function fileToBase64(file) {
    console.log("file", file)
    const read = new FileReader()
    read.onload = function () {
        console.log("read.onload -> this.result", this.result) // base64
    }
    read.readAsDataURL(file)
}