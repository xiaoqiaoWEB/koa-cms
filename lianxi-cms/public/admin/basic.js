var app = {
  toggle: function (el, db, attr, id) {
    $.get(
      '/admin/changeStatus', 
      {db:db,attr:attr,id:id},
      function (data) {
        if (data.success) {
          if (el.src.indexOf('yes') != -1) {
              el.src = '/admin/images/no.gif';
          } else {
              el.src = '/admin/images/yes.gif';
          }
        }
      }
    )
  }
}