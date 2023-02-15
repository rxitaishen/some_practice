/*
 * 使用工厂方法创建对象
 *  通过该方法可以大批量的创建对象
 */
function createPerson(name, age, gender) {
    //向对象中添加属性
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayName = function () {
        alert(this.name);
    };
    //将新的对象返回
}
var obj = {}
createPerson.call(obj,'猪八戒', 28, '男')
//利用构造函数自定义对象
var stu1 = new createPerson('猪八戒', 28, '男');
console.log('stu1: ', stu1);
console.log(obj);

