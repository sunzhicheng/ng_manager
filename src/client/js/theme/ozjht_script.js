function initScript() {
    App.init();
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:mm:ss',
        autoclose: true
    });
    $('img.theme').jqthumb({
        width: "100%",
        height: "auto"
    });
    $('#tags_1').tagsInput({
        width: 'auto',
        'onAddTag': function () {
            //alert(1);
        },
    });
    $('img.theme').jqthumb({
        width: "100%",
        height: "149px"
    });

}

function error(tips) {
  sweetAlert("操作异常",tips, "error");
}

function success(content) {
  if(!content){
    content = '';
  }
  // swal({   title: "操作成功!",   text: " ",   timer: 2000,   showConfirmButton: false });

  swal("操作成功!", content, "success");
}


function waring(content) {
  if(!content){
    content = '';
  }
  swal({   title: content,   text: "",   type: "warning"});
  // swal({ title: content,   text: " ",   timer: 2000,   showConfirmButton: false });
}


function confirm(title,callback) {
  swal({
    title: title,
    text: "",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    closeOnConfirm: true,
    closeOnCancel: true
  }, function (isConfirm) {
    if (isConfirm) {
      callback.call();
    } else {
      swal("已经取消！", "", "error");
    }
  });
}

$(document).ready(function () {
    initScript();
});
