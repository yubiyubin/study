class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  //insert id 위치 , add id
  /**

 * @param {Node} currNode 
 * @param {number|undefined} index 
 */
  addOrInsert(currNode, index) {
    if (index === undefined || index > this.length) {
      index = this.length;
    }
    this.length += 1;

    //리스트가 비어 있을 때
    if (this.head === null) {
      this.head = currNode;
      this.tail = currNode;

      return;
    }
    //맨 앞일 때
    if (index === 0) {
      const oldHead = this.head;
      this.head = currNode;
      currNode.next = oldHead;

      return;
    }

    //맨 앞 아닐 때
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }
    currNode.next = prev.next;
    prev.next = currNode;

    //currNode가 마지막 항일 때
    if (currNode.next === null) {
      this.tail = currNode;
    }
  }

  //delete
  delete(key) {
    this.length -= 1;

    //length=1이었을 때
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
      return;
    }

    //맨 앞 항목일 때
    if (this.head.data.key === `${key}`) {
      this.head = this.head.next;

      return;
    }

    //맨 앞 아닐 때
    let prev;
    let currNode = this.head;
    while (currNode.data.key !== `${key}`) {
      prev = currNode;
      currNode = currNode.next;
    }
    prev.next = currNode.next;

    //맨 뒤일 때
    if (currNode.next === null) {
      this.tail = prev;
    }
  }

  //replace
  replace(value, key) {
    let currNode = this.head;
    while (currNode.data.key !== `${key}`) {
      currNode = currNode.next;
    }
    if (currNode) {
      currNode.data.value = value;
    }
  }
}

module.exports = { LinkedList };
