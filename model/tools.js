const md5 = require('md5');

const tools = {
    md5(str){
        return md5(str);
    },
    changeData(data){
        var fistArr = [];

        fistArr = data.filter((item) =>{ return item.pid == 0});

        for(var i=0; i<fistArr.length; i++){

            fistArr[i].list = [];

            for(var j=0;j<data.length;j++){

                if(fistArr[i]._id==data[j].pid){
                    fistArr[i].list.push(data[j]);
                }

            }
        }

        return fistArr;
    }
}

module.exports = tools;
