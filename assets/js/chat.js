$(document).ready(function () {
       var $name = $("#userName");
       var $email = $("#email");
       var $guestLogin = $("#guestLogin");
       var $password = $("#password");
       var $companyName = $("#companyName");
       var $chatLoginModal = $("#chatLoginModal");
       var $form_chat_login = $("#form-chat-login");
       var $error_chat_login = $("#error-chat-login");
       var $submit_chat_login = $("#submit-chat-login");
       var $chatLoginModalLink = $("[name='chatLoginModalLink']");
       var userId = (typeof localStorage !== 'undefined') ? localStorage.getItem('mckLoginId') : "";
       var welcomeMessage = "Welcome to Applozic, may I know your name and company name?";
      var topics = {
        'android':
                {'title': 'Android', // Product title
                    'subtitle': 'Documentation', // Product subTitle or Product Id
                    'link': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/2000px-Android_robot.svg.png', // Product image link
                    'key1': '', // Small text anything like Qty (Optional)
                    'value1': '', // Value of key1 ex-10 (number of quantity) Optional
                    'key2': '', // Small text anything like MRP (product price) (Optional)
                    'value2': ''            // Value of key2 ex-$100  (Optional)
                },
        'ios': {'title': 'iOS', // Product title
            'subtitle': 'Documentation', // Product subTitle or Product Id
            'link': 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609170856', // Product image link
            'key1': '', // Small text anything like Qty (Optional)
            'value1': '', // Value of key1 ex-10 (number of quantity) Optional
            'key2': '', // Small text anything like MRP (product price) (Optional)
            'value2': ''            // Value of key2 ex-$100  (Optional)
        },
        'web': {'title': 'WEB', // Product title
            'subtitle': 'Documentation', // Product subTitle or Product Id
            'link': 'http://www.playgroundrecording.com/wp-content/uploads/2013/01/logo-web-300x300.png', // Product image link
            'key1': '', // Small text anything like Qty (Optional)
            'value1': '', // Value of key1 ex-10 (number of quantity) Optional
            'key2': '', // Small text anything like MRP (product price) (Optional)
            'value2': ''            // Value of key2 ex-$100  (Optional)
        }
        ,
        'phonegap': {'title': 'PHONEGAP', // Product title
            'subtitle': 'Documentation', // Product subTitle or Product Id
            'link': 'http://phonegap.com/uploads/artwork/PhoneGap-Symbol-Black.png', // Product image link
            'key1': '', // Small text anything like Qty (Optional)
            'value1': '', // Value of key1 ex-10 (number of quantity) Optional
            'key2': '', // Small text anything like MRP (product price) (Optional)
            'value2': ''            // Value of key2 ex-$100  (Optional)
        }
        ,
        'ionic': {'title': 'IONIC', // Product title
            'subtitle': 'Documentation', // Product subTitle or Product Id
            'link': 'http://ecodile.com/wp-content/uploads/2015/10/ionic-150x150.png', // Product image link
            'key1': '', // Small text anything like Qty (Optional)
            'value1': '', // Value of key1 ex-10 (number of quantity) Optional
            'key2': '', // Small text anything like MRP (product price) (Optional)
            'value2': ''            // Value of key2 ex-$100  (Optional)
        },
        'platform': {'title': 'PLATFORM', // Product title
            'subtitle': 'Documentation', // Product subTitle or Product Id
            'link': 'https://www.ofx.com/-/media/Images/Modules/ML006%20-%203%20Column%20Image%20List/Partner%20with%20us/Plug%20Into%20Our%20Platform/Icon_25.ashx?h=300&w=300&la=en-AU&hash=1975C201A1D17F7E94808F624ADC1E5095B7727C', // Product image link
            'key1': '', // Small text anything like Qty (Optional)
            'value1': '', // Value of key1 ex-10 (number of quantity) Optional
            'key2': '', // Small text anything like MRP (product price) (Optional)
            'value2': ''            // Value of key2 ex-$100  (Optional)
        }
    };

       $("#form-chat-login input").on('click', function () {
           $error_chat_login.removeClass('show').addClass('hide');
       });

       function initPlugin(userId, callback) {
         (function(d, m){var s, h;
            s = document.createElement("script");
            s.type = "text/javascript";
            s.async=true;
            s.src="https://apps.applozic.com/sidebox.app";
            h=document.getElementsByTagName('head')[0];
            h.appendChild(s);
            window.applozic=m;
            m.init=function(t){m._globals=t;}})(document, window.applozic || {});

           window.applozic.init({
               appId: "applozic-sample-app",
               userId: userId,
               notificationIconLink: "https://www.applozic.com/resources/images/applozic_icon.png",
               desktopNotification: true,
               contactDisplayName: displayName,
               authenticationTypeId :1,
               onInit: function (response) {
                 scrollToHash();
                 heap.identify(userId);
                 $applozic.fn.applozic('loadContacts', {"contacts": [{"userId": "applozic", "displayName": "Applozic Support",
                    "imageLink": "https://www.applozic.com/resources/images/applozic_icon.png"}
                  ]});

                  $applozic.fn.applozic('getUserDetail', {callback: function(response) {
                        if(response.status === 'success') {
                            var users = response.data.users.length;
                            if (users == 0) {
                              //$applozic.fn.applozic('loadTab', 'applozic');
                             $applozic.fn.applozic('loadContextualTab', {'userId': 'applozic', 'topicId' : topicId});
                            } else {
                              $applozic.fn.applozic('loadTab', '');
                            }
                        }
                      }
                  });
                   if (typeof callback === 'function') {
                       callback(response);
                   }
               },
               topicBox: false,
               getTopicDetail: function(topicId) {
                          return topics[topicId];
                       }
              });
       }
       if (userId) {
           $chatLoginModalLink.addClass('hide');
           initPlugin(userId);
       }

       $chatLoginModalLink.click(function (e) {
           $('.modal').modal('hide');
           $error_chat_login.html("");
           $error_chat_login.removeClass('show').addClass('hide');
           $form_chat_login[0].reset();
           $submit_chat_login.attr('disabled', false);
           $guestLogin.attr('disabled', false);
           $chatLoginModal.modal();
           $name.focus();
       });
       $form_chat_login.submit(function (e) {
           userId = $email.val();
           $submit_chat_login.attr('disabled', true);
           $submit_chat_login.html('Initiating chat...');
           $error_chat_login.removeClass('show').addClass('hide');
           $error_chat_login.html("");
           var formData = $(this).serialize();
           var request = $.ajax({
               url: "https://www.applozic.com/rest/ws/register/v2/admin",
               type: "post",
               data: formData,
               success: function (data) {
                   $submit_chat_login.attr('disabled', false);
                   $submit_chat_login.html('Start chat');
                   switch (data) {
                       case "error":
                           $error_chat_login.html("Oops! Looks like emailId is missing.</span>");
                           $error_chat_login.removeClass('hide').addClass('show');
                           break;
                       case "alu01.shortpass":
                           $error_chat_login.html("The password should be at least 6 characters.</span>");
                           $error_chat_login.removeClass('hide').addClass('show');
                           break;
                       case "alu01.diffpass":
                           $error_chat_login.html("The two passwords do not match.</span>");
                           $error_chat_login.removeClass('hide').addClass('show');
                           break;
                       case "INCORRECT_PASSWORD":
                           $error_chat_login.html("Oops! Looks like you have already registered. Please enter the correct password or <br><span> <a class='forgotPasswordModalLink' href='#'>Click here</a> if you forgot the password.</span>");
                           $error_chat_login.removeClass('hide').addClass('show');
                           break;
                       default:
                           initPlugin(userId, function (response) {
                             if(response && response === 'success'){
                               $submit_chat_login.attr('disabled', false);
                               $submit_chat_login.html('Start chat');
                               $error_chat_login.removeClass('show').addClass('hide');
                               $form_chat_login[0].reset();
                               $chatLoginModalLink.addClass('hide');
                               $chatLoginModal.modal('hide');
                               if (data === "USER_CREATED") {
                                   //$("#mck-msg-new").trigger('click');
                                   /*setTimeout(function() {
                                     $applozic.fn.applozic('addWelcomeMessage', {'sender': 'applozic', 'messageContent': welcomeMessage});
                                   }, "fast");      */
                                 }
                             } else if(response && response.status === 'error' && response.errorMessage === 'INVALID PASSWORD'){
                               window.location = "https://www.applozic.com/views/applozic/page/admin/dashboard.jsp";
                             } else {
                               if(response && response.errorMessage){
                                 alert(response.errorMessage);
                               } else{
                                 alert("There is some error. Please contact us at contact@applozic.com");
                               }
                             }
                           });
                   }
               },
               error: function (data, status) {
                   $submit_chat_login.attr('disabled', false);
                   $submit_chat_login.html('Start chat');
                   $error_chat_login.html('Unable to process your request. Please try again.');
                   $error_chat_login.removeClass('hide').addClass('show');
               }
           });
           return false;
       });
       $guestLogin.on('click', function () {
           $guestLogin.attr('disabled', true);
           $guestLogin.html('Initiating chat...');
           var firstTimeUser = false;
           if (!userId) {
               if ($.cookie("mckUserId"))
               {
                   userId = $.cookie("mckUserId");
               } else {
                   userId = getRandomId();
                   firstTimeUser = true;
                   $.cookie("mckUserId", userId);
               }
           }
           initPlugin(userId, function (response) {
               $guestLogin.html('Chat as guest');
               $guestLogin.attr('disabled', false);
               $chatLoginModalLink.addClass('hide');
               $chatLoginModal.modal('hide');
               if (firstTimeUser) {
                   /*setTimeout(function() {
                     $applozic.fn.applozic('addWelcomeMessage', {'sender': 'applozic', 'messageContent': welcomeMessage});
                   }, "fast");*/
               }
           });
       });
   });

function getRandomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function displayName(userId) {
    //Todo: replace this with users display users name
    if ("applozic" === userId) {
        return "Applozic";
    }
    return userId;
}
