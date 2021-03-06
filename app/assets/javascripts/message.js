$(function(){ 
     function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="message" data-message-id = "${message.id}">
            <div class= "message_data">
              <div class="messages_message_data_name">
                ${message.user_name}
              </div>
              <div class="messages_message_data_day">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="messages_message_data_post">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
         `<div class="message" data-message-id = "${message.id}">
            <div class="message_data">
              <div class="messages_message_data_name">
                ${message.user_name}
              </div>
              <div class="messages_message_data_day">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="messages_message_data_post">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  // hidouki
 $('#new_message').on('submit', function(e){
    e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);      
    $('form')[0].reset();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
  
  })
  .fail(function(){
  alert('メッセージ送信に失敗しました');
  })
  .always(function(){
    $('.send_btn').prop('disabled', false);
  }) 
  })  // jidou

// jidou
    var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id")

    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function(){
    alert('自動更新に失敗しました');
    })
  }
  if (document.location.href.match(/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});