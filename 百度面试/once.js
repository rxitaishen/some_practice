function once(fn) {
    let ret; // 缓存结果用
    return function(...args) {
      if (!fn) return ret;
      ret = fn(...args);
      fn = undefined; // 表示已经执行过一次
      return ret;
    }
  }

// 返回一个函数，如果已经执行过了，就返回undefined