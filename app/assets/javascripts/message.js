$(function(){
  function buildHTML(message){
    
    var content = if(message.content !== '')
                    ${message.content}

    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}.strftime("%Y/%m/%d %H:%M")
                    </div>
                  </div>
                  <p class="message__text">
                    ${message.content}
                  </p>`
                  - if message.content.present?
                  `<img class="message__image" src=${message.image.url} >
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
      $('.messages').append(html)
      $('.input-box__text').val('')
      $('.message_image').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
})