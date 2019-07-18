$(function(){
  function buildHTML(message){
    
    // if(message.image.url !== null){
    //   var content =`<img class="message__image" src=${message.image.url}>`
    // }
    // else{
    //   var content =""
    // }
    // 一行で書くこともできる
    var image = message.image.url ? `<img class="message__image" src=${message.image.url}>` : "";
    
    var html = `<div class="message" data-id= ${message.id}>
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <p class="message__text">
                    ${message.content}
                  </p>
                  ${image}
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
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
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html).animate({scrollTop:$('.messages')[0].scrollHeight}, 1500, 'swing');
      $('#new_message')[0].reset();
      $(".submit-btn").prop("disabled", false);

    })
    .fail(function(){
      alert('error');
      $(".submit-btn").prop("disabled", false);
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message').last().data('id');
    group_id = $('.main-header__left-box__current-group').data('id')
    var url =`/groups/${group_id}/api/messages`
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json', 
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message){
        //メッセージが入ったHTMLを取得
        var html = buildHTML(message)
        //メッセージを追加
        insertHTML += html
      })
      if(insertHTML !== ''){
      $('.messages').append(insertHTML).animate({scrollTop:$('.messages')[0].scrollHeight}, 1500, 'swing');
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
   var now_url = location.pathname ;
   group_id = $('.main-header__left-box__current-group').data('id')
   var OKurl =`/groups/${group_id}/messages`
  if(now_url == OKurl){
  setInterval(reloadMessages, 5000);
  }
})