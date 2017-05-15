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

                    $.ajax(
                        {
                            type:"post",
                            url:"http://47.92.88.155:1021/login/login",
                            contentType:"application/json",
                            dataType:"json",
                            data:msg,
                            crossDomain:true,
                            success:function(data)
                            {
                                console.log(data);
                            },
                            error:function(error)
                            {
                                console.log(error.message);
                            }
                        }
                    );
                },

            };

            return instance;
        }
    )();