// 实现一串字符串里，只出现一遍的第一个字符
// 'asdeaaaaafefh'
function fun1(str){
    for(let i in str) {
        if(str.indexOf(str[i]) == str.lastIndexOf(str[i])){
            return str[i];
        }
    }
    return undefined;
}

// ascll 码获取用x.charCodeAt()
// ascll 码转字母用String.fromCharCode() 接受数组，出来的就是字符串，如[97,97,97] => 'aaa'
function fun2(str){
    const map = new Array(26);
    const arr = [];
    function getAsc(s){
        return s.charCodeAt() - 'a'.charCodeAt();
    }
    for(let i in str){
        const pos = getAsc(str[i]);
        if(!map[pos]){
            map[pos] = 1;
            arr.push(str[i]);
        } else {
            map[pos] ++;
        }
    }
    // 在 forEach () 中使用 return 语句并不能中断循环，只能像continue一样的跳过当前的循环，i++，继续后面的循环。
    // 如果需要中断循环，可以使用 for 循环或者 Array.prototype.some () 方法。
    // set.forEach(item => {
    //     const pos = getAsc(item);
    //     if(map[pos] === 1){
    //         result = 
    //     }
    // })

    for(let i in arr){
        const pos = getAsc(arr[i]);
        if(map[pos] === 1){
            return arr[i];;
        }
    }

    return undefined

}
console.log(fun1('asdeaaaaafefh'));