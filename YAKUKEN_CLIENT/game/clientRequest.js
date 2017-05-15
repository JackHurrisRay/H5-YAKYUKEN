/**
 * Created by Jack.L on 2017/5/15.
 */

var clientRequest =
    (
        function()
        {
            var instance =
            {
                ////////
                login:function()
                {
                    var msg = {"account_id":"18302079187", "account_pwd":"passord"};
                    const URL = "http://47.92.88.155:1021/login/login";

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "http://47.92.88.155:1021/login/login",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json"
                        },
                        "processData": false,
                        "data": JSON.stringify(msg)
                    }

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                    });

                },

            };

            return instance;
        }
    )();