//递归实现深拷贝
function cloneDeep(obj) {
    if (typeof obj == 'object') {
        let cloneTarget = Array.isArray(obj) ? [] : {};
        //递归拷贝
        for (let key in obj) {
            cloneTarget[key] = cloneDeep(obj[key]);
        }
        //返回递归拷贝后的结果
        return cloneTarget;
    } else {
        //直接返回cuo
        return obj;
    }
}

// 实现new
function _new(cstr, ...args) {
    let newObj = {};
    newObj.__proto__ = cstr.prototype;
    let res = cstr.apply(newObj, args);
    return typeof res === 'object' ? res : newObj;

}

// 实现instanceof
function _instanceof(l, r) {
    let lp = l.__proto__;
    let rp = r.prototype;
    while (true) {
        if (lp === null) {
            return false
        }
        if (lp == rp) {
            return true;
        }
        lp = lp.__proto__;
    }
}

//实现call
Function.prototype._call = function (obj = window, ...args) {
    let key = Symbol();
    obj[key] = this;
    const res = obj[key](args);
    delete obj[key];
    return res;
}

//实现apply
Function.prototype._apply = function (obj = window, args = []) {
    let key = Symbol();
    obj[key] = this;
    const res = obj[key](...args);
    delete obj[key];
    return res;
}

//实现bind
Function.prototype._bind = function (obj, ...args) {
    let fun = this;
    return function (...newArgs) {
        return fun.apply(obj, [...args, ...newArgs])
    }
}

//测试用
function waston() {
    console.log(this.name);
}

let obj1 = {
    name: 'chenhuan',
    age: 18
}

let obj2 = waston.gura(obj1)
console.log(waston.gura(obj1));
