function Node(data){
    this.data = data;
    this.next = null;
}

function LinkedList (){
    this.head = new Node('head');
}

LinkedList.prototype.find = function (data){
    let node = this.head;
    //只要这个节点没到头，节点的值不是要找的值，就继续找下去
    while(node !== null && node.data !== data){
        node = node.next;
    }
    return node;
}

LinkedList.prototype.insert = function(newData, data){
    let newNode = new Node(newData);
    let node = this.find(data);
    newNode.next = node.next;
    node.next = newNode;
}

LinkedList.prototype.findPrevious  = function(data){
    let node = this.head;
    while(node.next !== null && node.next.data !==data){
        node = node.next;
    }
    return node;
}

LinkedList.prototype.remove = function(data){
    let prevNode = this.findPrevious(data);
    if (prevNode !== null) {
        prevNode.next = prevNode.next.next;
    }
}