var userId = (typeof localStorage !== 'undefined') ?  localStorage.getItem('mckLoginId') : "";
var displayName = "";
var loggedIn = false;
var firstTimeUser = false;
var welcomeMessage = "Welcome to Applozic, may I know your name and company name?";


if (userId == "" || userId == null) {
  if ($.cookie("mckUserId")) {
        userId = $.cookie("mckUserId");
    }
    if (userId == "" || userId == null) {
        userId = getRandomId();
        firstTimeUser = true;
        $.cookie("mckUserId", userId);
    }
}

initChat(userId, displayName);

$(document).on('click', "#chat-help", function(e) {
  e.preventDefault();
  initChat(userId, displayName);
});

function initChat(userId, displayName) {
  if (loggedIn) {
     $applozic.fn.applozic('loadTab', 'applozic');
     return;
   }
  (function(d, m){var s, h;
      s = document.createElement("script");
      s.type = "text/javascript";
      s.async=true;
      s.src="https://apps.applozic.com/sidebox.app";
      h=document.getElementsByTagName('head')[0];
      h.appendChild(s);
      window.applozic=m;
      m.init=function(t){m._globals=t;}})(document, window.applozic || {});

  window.applozic.init({appId: 'applozic-sample-app', userId: userId, userName: displayName,
      desktopNotification: true,  notificationIconLink: 'https://www.applozic.com/favicon.ico',
      mode: "support",
      supportId: "applozic",
      contactDisplayName: function(contactId) {
        if (contactId == "applozic") {
          return "Applozic Help";
        }
      },
      onInit: function(response) {
          loggedIn = true;
          if (firstTimeUser) {
            $applozic.fn.applozic('addMessageToInbox', {'sender': 'applozic', 'messageContent' : welcomeMessage});
          }
          if (response == "success") {
            //$applozic.fn.applozic('loadTab', 'applozic');
            scrollToHash();
          }
       }
     });
}

function getRandomId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
      return text;
}
