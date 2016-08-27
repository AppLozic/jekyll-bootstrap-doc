$(document).ready(function() {
  // $.get('/fullPageTmpl.html', function(data) {
  //   $('#chat-box-div').append(data);
  // });

  var $userId = $('#userId');
  var $appKey = $('#appKey');
  var $contactNumber = $('#contactNumber');
  var $password = $('#password');
  var $chat_form = $('#chat-form');
  var $chat_submit = $('#chat-submit');
  var $chat_relauncher = $('#chat-relauncher');
  var $chat_response = $('#chat-response');
  var $chat_postlaunch = $('#chat-post-launch');

  $chat_form.submit(function() {
    // if ($appKey.val() === '') {
    //   $chat_response.html(
    //       'Oops!, looks like you have not entered correct application key.');
    //   $chat_response.removeClass('hide').addClass('show');
    //   return false;
    // }
    if ($userId.val() === '') {
      $chat_response.html(
          'Oops!, looks like you have not entered correct userId.');
      $chat_response.removeClass('hide').addClass('show');
      return false;
    }
    $chat_submit.html('Launching...');
    var userId = $userId.val();
    var appKey = $appKey.val();
    var userContactNumber = $contactNumber.val();
    var userPassword = $password.val();
    var topicBoxEnabled = true;

    /*var displayName = '';
    displayName = '${param.displayName}';*/

    function onInitialize(status) {
      if (status === 'success') {
        // write your logic exectute after plugin initialize.
        $('#chat').css('display', 'none');
        $('#chat-box-div').css('display', 'block');
        $applozic.fn.applozic('loadTab', '');
        initAutoSuggestions();
      }
    }

    $applozic.fn.applozic({
      notificationIconLink:
          'https://www.applozic.com/resources/images/applozic_icon.png',
      userId: userId,
      // appId: appKey,
      appId: 'applozic-sample-app',
      // email:'userEmail',
      accessToken: userPassword,
      desktopNotification: true,
      swNotification: true,
      olStatus: true,
      onInit: onInitialize,
      locShare: true,
      googleApiKey: 'AIzaSyDKfWHzu9X7Z2hByeW4RRFJrD9SizOzZt4',
      launchOnUnreadMessage: true,
      topicBox: topicBoxEnabled,
      authenticationTypeId: 1
      // topicDetail: function(topicId) {}
    });
    return false;
  });
  $chat_relauncher.on('click', function() {
    sessionStorage.clear();
    window.location = '/login.html';
  });

});

var docs =
  {
    start: [
      { name: "Android Docs", content: "https://www.applozic.com/docs/android-chat-sdk.html#overview"},
      { name: "iOS Docs", content: "https://www.applozic.com/docs/ios-chat-sdk.html#overview"},
      { name: "Web Docs", content: "https://www.applozic.com/docs/web-chat-plugin.html#overview"},
      { name: "PhoneGap Docs", content: "https://www.applozic.com/docs/phonegap-chat-plugin.html"},
      { name: "Platform APIs", content: "https://www.applozic.com/docs/platform-api-chat.html"},
      { name: "Configuration", content: "https://www.applozic.com/docs/configuration.html"},
    ],
    android: [
      { name: "Github", content: "https://github.com/Applozic/Applozic-Android-SDK"},
      { name: "Push Notification", content: "https://www.applozic.com/docs/android-chat-sdk.html#step-4-push-notification-setup"}
    ],
    ios: [
      { name: "Github", content: "https://github.com/Applozic/Applozic-iOS-SDK/"},
      { name: "Objective-C", content: "https://www.applozic.com/docs/ios-chat-sdk.html#objective-c"},
      { name: "Swift", content: "https://www.applozic.com/docs/ios-chat-sdk.html#swift"},
      { name: "Push Notification", content: "https://www.applozic.com/docs/android-chat-sdk.html#step-4-push-notification-setup"}
    ],
    web: [
      { name: "Github", content: "https://github.com/Applozic/Applozic-Web-Plugin/"},
      { name: "Sidebox Layout Plugin", content: "https://www.applozic.com/docs/web-chat-plugin.html#sidebox-layout"},
      { name: "Full Layout plugin", content: "https://www.applozic.com/docs/web-chat-plugin.html#full-view-layout"}
    ]
  };

var queries = [
  { name: "Which plaform you are integration with?", content: "Which plaform you are integration with?"}
];

var price = [
  { name: "Its free only for development and testing", content: "Its free only for development and testing"},
  { name: "Link", content: "https://www.applozic.com/price.html"}
];

var check = [
  {name: "Tech team", content: "Let me check wiht tech team."},
  {name: "Forward request", content: "Let me forward your request to the tech team"}
];

var greetings = [
  {name: "Unknown User", content: "Hi, may I know your name and company"},
  {name: "New User", content: "Hi, may I know your company name."}
];

function initAutoSuggestions() {
  $('#mck-text-box').atwho({
    at: "#docs",
    insertTpl: '${content}',
    displayTpl: '<li>${name} <small>${content}</small></li>',
    data: docs.start
  }).atwho({
    at: "#android",
    insertTpl: '${content}',
    displayTpl: '<li>${name} <small>${content}</small></li>',
    data: docs.android
  }).atwho({
    at: "#ios",
    insertTpl: '${content}',
    displayTpl: '<li>${name} <small>${content}</small></li>',
    data: docs.ios
  }).atwho({
    at: "#web",
    insertTpl: '${content}',
    displayTpl: '<li>${name} <small>${content}</small></li>',
    data: docs.web
  }).atwho({
    at: "#price",
    insertTpl: '${content}',
    displayTpl: '<li>${name} <small>${content}</small></li>',
    data: price
  }).atwho({
      at: "#which",
      insertTpl: '${content}',
      displayTpl: '<li><small>${content}</small></li>',
      data: queries
  }).atwho({
    at: "#check",
    insertTpl: '${content}',
    displayTpl: '<li><small>${content}</small></li>',
    data: check
  }).atwho({
    at: "hello",
    insertTpl: '${content}',
    displayTpl: '<li>${name} <small>${content}</small></li>',
    data: greetings
  });
}
