// $(function(){
//   var form = new FormData();
//   var oReq = new XMLHttpRequest();
//   oReq.open('post', )
//   // $('form').submit(function(e){
//   //   e.preventDefault();
//   //   var url = $(this).attr('action');
//   //   // console.log(url);
//   //   $.ajax({
//   //   	url: url,
//   //   	type: 'POST',
//   //   	dataType: 'json',
//   //   	data: $(this).serialize(),
//   //   })
//   //   .done(function(data) {
//   //   	console.log("success");
//   //   })
//   //   .fail(function() {
//   //   	console.log("error");
//   //   })
//   // })
// })
function sendForm(){
  var fd = document.forms.namedItem("fileinfo");
  var oData = new FormData(fd);
  // oData.append("CustomField", "This is some extra data");
  
  var url = fd.getAttribute('action');
  var oReq = new XMLHttpRequest();
  oReq.open("POST", url, true);
  oReq.onload = function(oEvent){
    if(oReq.status == 200){
      console.log("uploaded!");
    }else{
      console.log("Error"+ oReq.status +"occurred uploading your file.<br \/>");
    }
  }
  oReq.send(oData);
}

$("button[name=submit]").on('click', function(e){
  e.preventDefault();
  sendForm();
})