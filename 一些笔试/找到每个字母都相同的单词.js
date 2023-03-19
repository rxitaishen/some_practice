
/*
 有一组单词数组，要求找到每个字母出现的次数都相同，并把符合条件的放在一起，返回出来
 输入 ['tea', 'ate', 'ttt', 'aaa']
 输出 [["tea", "ate"], ["ttt"], ["aaa"]]
*/

const arr = ['tea', 'ate', 'ttt', 'aaa']

function main(arr){
  // 存放他们的父元素是谁。
  const map = new Array(arr.length).fill(0);
  const res = [];
  for(let i in arr){
    if(map[i]){
      continue;
    }
    let tempRes = [];
    for(let j in arr){
      if(isEqual(arr[i], arr[j])){
        tempRes.push(arr[j]);
        // 在这里就能找到他们的父元素是谁
        map[j] = i;
      }
    }
    res.push(tempRes);
  }
  return res;
}

function isEqual(str1, str2){
  let newStr1 = str1.split("").sort();
  let newStr2 = str2.split("").sort();
  let count = 0;
  newStr1.map((item, index) => {
    if(item === newStr2[index]){
      //console.log(item, newStr2[index])
      count++;
    }
  })
  return count == newStr1.length;
}
console.log(main(arr))
//console.log(isEqual("tea", "ate"))

