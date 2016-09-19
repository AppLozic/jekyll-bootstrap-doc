$(document).ready(function(){
  $('.result').css('display', 'none');
  
  $('#testGcmBtn').click(function(){
    $('.result').css('display', 'none');
    let applicationId = $('#applicationId').val();
    let userId = $('#userId').val();
    
    $.ajax({
      url : CONTEXTPATH + "/rest/ws/tools/gcmtest",
      contentType : 'application/json',
      data : {
        userId : userId,
        applicationId : applicationId
      },
      success : function(data) {
        $('.result').css('display', 'block');
        let html = '<div class="row"></div>';
        if (typeof data === 'string') {
          html += '<span class="col-md-4">Result: </span><span class="col-md-4">' + data + '</span>'
        } else if (typeof data === 'object' && data.response && typeof data.response === 'object') {
          html += '<span class="col-md-6">Registration Id</span><span class="col-md-6">Status</span>';
          $.each(data.response, (key, val)=>{
            html += '<span class="col-md-6" style="word-wrap: break-word;" >' + key + '</span><span class="col-md-6" style="word-wrap: break-word;" >' + val + '</span>';
          });
        }
        $('.result').html(html);
      }
    });
  });
  
});
