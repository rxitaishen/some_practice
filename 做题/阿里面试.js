1、数据格式处理（假定数组中的元素顺序不变，都是姓名、性别、年龄的顺序）：
输入：[['小明', '男', 15], ['小红', '女', 17], ['小雨', '男', 25]]
输出：{
    data: [
      {name: '小明'，sex: '男', 'age': 15}, 
      {name: '小红'，sex: '女', age: 15}, 
      {name: '小雨'，sex: '男', age: 25}
    ],
    count: 3
}

function deal(arr){
  let count = 0;
  let resObj = {};
  let data = [];
  count ++;
  data  = arr.reduce((prev,cur)=>{
    let tempObj = {};
    tempObj.name = cur[0];
    tempObj.sex =  cur[1];
    tempObj.age =  cur[2];
    prev.push(tempObj)
  },[])
  
  resObj.data = data;
  resObj.count = count;
  return resObj;
}

2、css 垂直水平居中
/* flex */
.parent{
  display:flex;
  justify-content:center; space-around
  align-items:center;
  
}
/* 绝对定位 */
.parent{
  position:relative;
}
.son{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
}

/*绝对定位2*/

.parent{
  position:relative;
  width:300px;
}
.son{
  position:absolute;
  width:200px;
  left:50%;
  margin-left:-100px;
}

3、手写eventEmiter
class EventEmitter{
  constructor(e,method){
    this.events = {};
    this.wetherOff = false
  }
  //除非调用off
  on(eventName,func,wetherOff) {
    let tempEvent = {};
    tempEvent['off'] = wetherOff;
    tempEvent['excute'] = func

    //加入事件
    this.event.eventName = tempEvent;
    

  }
  // //等待移除
  // once(eventName,func,wetherOff) {

  // }
  // 移除on 注册的函数
  off(eventName) {
    this.wetherOff = true;
    if(this.event[eventName]){
      this.event[eventName] = null;
    }
  }

  emit(eventName) {
    if(this.event[eventName]){
      let fun = this.event[eventName];
      fun();
    }
    else{
      throw Error('func not found');
    }
  }
}
const eventEmitter = new EventEmitter()
eventEmitter.on('hhh', () => {console.log('hhh')})
eventEmitter.once('hhh', () => {console.log('hhh once')})
eventEmitter.emit('hhh')


















class EventEmitter {
  constructor() {
    this.handlers = {};
  }
  on(type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push({
      isOnce:false,
      handler
    });
  }
  emit(type, parms) {
    if (!this.handlers[type]) {
      throw new Error('this event is not registered');
    }
    this.handlers[type] = this.handlers[type].filter(el => {
      el.handler(...parms);
      return !el.isOnce;
    });
  }
  off(type, handler) {
    if (!this.handlers[type]) {
      throw new Error('this event is not registered');
    }
    if (!handler) {
      delete this.handlers[type];
    } else {
      this.handlers[type] = this.handlers[type].filter(el => el.handler !== handler);
      
    }
  }
  once(type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push({
      isOnce:true,
      handler
    });
  }
} 