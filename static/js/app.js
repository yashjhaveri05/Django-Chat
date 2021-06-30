let currentRecipient = '';
let chatInput = $('#chat-input');
let imageUpload = $('#input-image');
let fileUpload = $('#input-file');
let chatButton = $('#myFormSubmit');
let userList = $('#user-list');
let messageList = $('#messages');

function updateUserList() {
    $.getJSON('api/v1/user/', function (data) {
        userList.children('.user').remove();
        for (let i = 0; i < data.length; i++) {
            const userItem = `<a class="list-group-item user">${data[i]['username']}</a>`;
            $(userItem).appendTo('#user-list');
        }
        $('.user').click(function () {
            userList.children('.active').removeClass('active');
            let selected = event.target;
            $(selected).addClass('active');
            setCurrentRecipient(selected.text);
        });
    });
}

function drawMessage(message) {
    let position = 'left';
    const date = new Date(message.timestamp);
    if (message.user === currentUser) position = 'right';
    const messageItem = `
            <li class="message ${position}">
                <div class="avatar">${message.user}</div>
                    <div class="text_wrapper">
                        <div class="text">${message.body}<br>
                        <a href=${message.file_field}>${message.file_field}</a>
                        <img src=${message.image} class="imageDisplay">
                        <span class="small">${date}</span>
                    </div>
                </div>
            </li>`;
    $(messageItem).appendTo('#messages');
}

function getConversation(recipient) {
    $.getJSON(`/api/v1/message/?target=${recipient}`, function (data) {
        messageList.children('.message').remove();
        for (let i = data['results'].length - 1; i >= 0; i--) {
            drawMessage(data['results'][i]);
        }
        messageList.animate({scrollTop: messageList.prop('scrollHeight')});
    });

}

function getMessageById(message) {
    id = JSON.parse(message).message
    $.getJSON(`/api/v1/message/${id}/`, function (data) {
        if (data.user === currentRecipient ||
            (data.recipient === currentRecipient && data.user == currentUser)) {
            drawMessage(data);
        }
        messageList.animate({scrollTop: messageList.prop('scrollHeight')});
    });
}

function sendMessage(recipient, body) {
    $.post('/api/v1/message/', {
        recipient: recipient,
        body: body
    }).fail(function () {
        alert('Error! Check console!');
    });
}

function setCurrentRecipient(username) {
    currentRecipient = username;
    getConversation(currentRecipient);
    enableInput();
}


function enableInput() {
    chatInput.prop('disabled', false);
    chatButton.prop('disabled', false);
    chatInput.focus();
}

function disableInput() {
    chatInput.prop('disabled', true);
    chatButton.prop('disabled', true);
}

$(document).ready(function () {
    updateUserList();
    disableInput();

//    let socket = new WebSocket(`ws://127.0.0.1:8000/?session_key=${sessionKey}`);
    var socket = new WebSocket(
        'ws://' + window.location.host +
        '/ws?session_key=${sessionKey}')

    chatInput.keypress(function (e) {
        if (e.keyCode == 13)
            chatButton.click();
    });

    $('#myFormSubmit').click(function (e) {
        var formdata = new FormData()
        var input1 = document.querySelector('input[id="input-image"]').files[0]
        var input2 = document.querySelector('input[id="input-file"]').files[0]
        console.log(input1,'abc');
        console.log(input2,'def');
        if(input1){
            console.log("hello1");
            formdata.append('image',input1)
        }
        else{
            formdata.append('image','')
        }
        if(input2){
            console.log("hello2");
            formdata.append('file_field',input2)
        }
        else{
            formdata.append('file_field','')
        }
        if (chatInput.val().length > 0){
            formdata.append('body', chatInput.val())
        }
        else{
            formdata.append('body', '')
        }
        formdata.append('recipient', currentRecipient)
        console.log(formdata);
        $.ajax({
            method : 'POST',
            processData : false,
            contentType : false,
            url : '/api/v1/message/',
            data : formdata,
            success : function(o){
               console.log("success");
            },
            error : function(e){
                console.log(e);
            }
        })
        chatInput.val('');
        fileUpload.val('');
        imageUpload.val('');
    });

    // chatButton.click(function () {
    //     var input = document.querySelector('input[type="file"]').files[0];
    //     console.log(input);
    //     console.log(chatInput.val());
    //     if (chatInput.val().length > 0) {
    //         sendMessage(currentRecipient, chatInput.val());
    //         chatInput.val('');
    //     }
    // });

    socket.onmessage = function (e) {
        getMessageById(e.data);
    };
});



// function readURL(input) {
//     if (input.files && input.files[0]) {
//         // console.log(input.files);
//       var reader = new FileReader();
//       reader.onload = function (e) {
//         $('#blah')
//           .attr('src', e.target.result)
//           .width(150)
//           .height(200);
//       };
//       reader.readAsDataURL(input.files[0]);
//       console.log(result)
//     }
//   }