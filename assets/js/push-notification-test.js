$(document).ready(function(){
  $('.result').css('display', 'none');
  
  $('#push-notification-test-btn').click(function(){
    $('.result').css('display', 'none');
    let applicationId = $('#applicationId').val();
    let userId = $('#userId').val();
    
    $.ajax({
      url : CONTEXTPATH + "/rest/ws/tools/push-notification-test",
      contentType : 'application/json',
      data : {
        userId : userId,
        applicationId : applicationId
      },
      success : function(data) {
        $('.result').css('display', 'block');
        let html = '';
        if (typeof data === 'string') {
          html += '<span class="col-md-2">Result: </span><span class="col-md-4">' + data + '</span>'
        } else if (typeof data === 'object' && data.response && typeof data.response === 'object') {
          html += '<table class="table table-hover table-hover" ><thead><tr><th>Sno</th><th>Device Key</th><th>Registration Id</th><th>Status</th></tr></thead><tboby>';
          data.response.forEach((row, index)=>{
            html += '<tr><td>' + (index + 1) +'</td>';
            row.forEach((val, i)=>{
              if(i==2){
                html += '<td style="word-wrap: break-word; text-transform:capitalize;" >' + val + '</td>';
              }else{
                html += '<td style="word-wrap: break-word;" >' + val + '</td>';
              }
            });
            html += '</tr>';
          });
          html += '</tbody></table>';
        }
        $('.result').html(html);
      }
    });
  });
  
});
