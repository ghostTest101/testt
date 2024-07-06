class Iterator {
    constructor(collection) {
      this.collection = collection;
      this.index = 0;
    }
  
    hasNext() {
      return this.index < this.collection.length;
    }
  
    next() {
      return this.collection[this.index++];
    }
  }
  
  const wordsArray = ['apple', 'banana', 'cherry'];
  const wordsList = { 0: 'dog', 1: 'elephant', 2: 'fox' };
  
  function searchWord(iterator, word) {
    while (iterator.hasNext()) {
      if (iterator.next() === word) {
        return true;
      }
    }
    return false;
  }
  
  const arrayIterator = new Iterator(wordsArray);
  const listIterator = new Iterator(Object.values(wordsList));
  
  console.log(searchWord(arrayIterator, 'banana')); // Output: true
  console.log(searchWord(listIterator, 'cat')); // Output: false
  