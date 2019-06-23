const md5 = require('md5')

const tool = {
  md5 (str) {
    return md5( md5(str) ) 
  },
  setTime () {
    return new Date();
  },
  dataArray (data) {
    let arr = data.filter((item) => {
      return item.pid == '0'
    })

    arr.forEach((el, index) => {
      arr[index].list = data.filter((k) => {
        return el._id == k.pid
      })
    });
    return arr;
  }
}

module.exports = tool;