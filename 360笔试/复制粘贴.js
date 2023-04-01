function fun1(s, t) {
    const map = {}; 
    const stack = []; 
    if(s === t){
      return true
    };
    if(s.length > t.length || s.lenngth == 0 ){
      return false
    }
    const sArr = s.split('');
    const tArr = t.split('');
    for(let i in sArr){
      if(!map[sArr[i]]){
        map[sArr[i]] == 1;
      } else {
        map[sArr[i]]++;
      }
      
      if(i < tArr.length){
        if(sArr[i] !== tArr[i] && !tArr[i] === sArr[i-1]){
            return false;
        }
      } else {
        if(!map[tArr[i]]){
          return false;
        } 
      }
    }
    return true;
  }
  
  console.log(fun1('hello', 'helloe'))
  
//   4
//   hello
//   hello

//   hello
//   helloo

//   hello
//   hlllloo

//   hello
//   helo
  
//   YES
//   YES
//   NO
//   NO