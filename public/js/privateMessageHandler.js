/*
*  author : abhishek goswami (hiro)
*  abhishekg785@gmail.com
*
*  privateMessageHandler.js
*/

var messageView = $('#messageView'),
    messageViewCancel = $('#messageViewCancel'),
    messageViewHeading = $('#messageViewHeading'),
    messageViewContent = $('#messageViewContent'),
    sendPrivateMessageView = $('#sendPrivateMessageView'),
    messageViewMessages = $('#messageViewMessages'),
    privateMessageReceiverInfo = $('#privateMessageReceiverInfo'),
    sendPrivateMessageButton = $('#sendPrivateMessageButton'),
    privateMessageText = $('#privateMessageText'),
    privateMessageArr = [],
    receiver = "",
    messageSpan = $('#messageSpan'),
    chatLogList = $('#chatLogList'),
    loggedUser = $('#loggedUser');

var privateMessageHandlerFunctions = {
  showMessageView : function(){
    messageView.css('display', 'block');
    return privateMessageHandlerFunctions;
  },

  hideMessageView : function(){
    messageView.css('display', 'none');
  },

  showMessageViewToDisplayMessages : function(){
    messageSpan.css('color', 'white');
    privateMessageHandlerFunctions.clearMessageViewElements();
    messageViewHeading.append('<h2>Received Messages</h2>');
    sendPrivateMessageView.hide();
    messageViewContent.show();
    privateMessageHandlerFunctions.showMessageView().setPrivateMessagesInDOM();
  },

  clearMessageViewElements : function(){
    messageViewHeading.empty();
    messageViewMessages.empty();
    privateMessageReceiverInfo.empty();
  },

  pushPrivateMessage : function(data){
    console.log(data);
    var messageObj = {
      'sender' : data.sender,
      'messageText' : data.messageText
    };
    privateMessageArr.push(messageObj);
  },

  setPrivateMessagesInDOM : function(){
    if(privateMessageArr.length > 0){
      privateMessageArr.forEach(function(messageObj, index){
        var item = '<li><span style="color:#34495e"><i>'+ messageObj.sender +'</i></span> : '+ messageObj.messageText +'</li>';
        messageViewMessages.append(item);
      });
    }
    else{
      messageViewMessages.append('<h2 align = "center">Yo have no Recent Messages!</h2>');
    }
  },

  showMessageViewToSendMessages : function(username){
    receiver = username;
    socket = socket;
    privateMessageHandlerFunctions.showMessageView().clearMessageViewElements();
    messageViewHeading.append('<h2>Message Center</h2>');
    messageViewContent.css("display", 'none');
    privateMessageReceiverInfo.append('Send Message to <i>'+ receiver +'</i>');
    sendPrivateMessageView.show();
  },

  sendPrivateMessage : function(){
    sendPrivateMessageButton.text('Sending ...');
    var messageText = $('#privateMessageText').val();
    if(messageText.length > 0){
      var emitObj = {
        'receiver' : receiver,
        'messageText' : messageText,
      };
      socket.emit('new private message', emitObj);
      privateMessageText.val('');
      sendPrivateMessageButton.text('Send');
      privateMessageReceiverInfo.text('Message sent Successfully :)');
      // chatLogList.append('<i>You</i>' + ':' + ' ' + '<span class = "loggedUser">' + messageText + '</span><br/>');
    }
    else{
      alert('Message Field is required !');
    }
  },

  realTimeMessageView : function(data){
    var item = '<li><span style="color:#34495e"><i>'+ data.sender +'</i></span> : '+ data.messageText +'</li>';
    // chatLogList.append(data.sender + ': ' + '<span style = "color:white">' + data.messageText + '</span>' + '<br/>');
    if(privateMessageArr.length <= 1){
      messageViewMessages.empty();
      messageViewMessages.append(item);
    }
    else{
      messageViewMessages.append(item);
    }
  }
}

$(document).ready(function(){
  messageViewCancel.click(function(){
    privateMessageHandlerFunctions.hideMessageView();
  });

  sendPrivateMessageButton.on('click', function(){
    privateMessageHandlerFunctions.sendPrivateMessage();
  })
});
