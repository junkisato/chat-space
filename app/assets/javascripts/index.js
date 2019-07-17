$(function() {
  search_list = $("#user-search-result");

  function appendProduct(user) {
    var html =  `<div class="chat-group-user clearfix" >
                  <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div id='user-search-result'>${ msg }</div>`
    search_list.append(html);
  }
  
  $("#user-search-field").on("input", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
            appendProduct(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $("#user-search-result").on("click", ".user-search-add", function () {
    console.log(this)
    var user_id = $(this).data('userId')
    var user_name = $(this).data('userName')
      var html =  `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${user_id}">
                    <input name="group[user_ids][]" type="hidden" value=${user_id}>
                    <p class="chat-group-user__name">${user_name}</p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                  </div>`
    $(".chat-group-users").append(html);
      $(this).parent().remove();
    
    $(".chat-group-form__field--right").on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    });
  });
});