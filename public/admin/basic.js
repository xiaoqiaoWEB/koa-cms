
/**
 * Created by Administrator on 2018/3/24 0024.
 */

$(function(){
    app.deleta();
})

var app={

    toggle:function(el,collectionName,attr,id){
        $.get('/admin/changeStatus',{collectionName:collectionName,attr:attr,id:id},function(data) {
            if (data.success) {
                if (el.src.indexOf('yes') != -1) {
                    el.src = '/admin/images/no.gif';
                } else {
                    el.src = '/admin/images/yes.gif';
                }
            }
        })

    },
    deleta(){
        $('.delete').on('click',function(){
            var flag = confirm('确定删除');
            return flag;
        })
    }

}
