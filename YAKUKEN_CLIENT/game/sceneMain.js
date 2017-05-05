/**
 * Created by Jack.L on 2017/5/3.
 */

var sceneMain = cc.Scene.extend(
    {
        size:cc.director.getWinSize(),
        BACKGROUND:null,
        ctor:function()
        {
            this._super();
            const size = this.size;

            var _frame =
                [
                    cc.spriteFrameCache.getSpriteFrame("background_main.jpg"),
                    cc.spriteFrameCache.getSpriteFrame("ui_main.png"),
                    cc.spriteFrameCache.getSpriteFrame("button_play_friend.png"),
                    cc.spriteFrameCache.getSpriteFrame("button_play_com.png"),
                    cc.spriteFrameCache.getSpriteFrame("button_play_ai.png")
                ];

            var sptBackground = cc.Sprite.createWithSpriteFrame(_frame[0]);
            sptBackground.setPosition(size.width / 2, size.height / 2);
            this.addChild(sptBackground, 0);
            this.BACKGROUND = sptBackground;

            ////////
            this.initBackGroundAnimation();

            ////////
            this.UI_MAIN = cc.Sprite.createWithSpriteFrame(_frame[1]);
            this.UI_MAIN.setPosition(SCREEN_SIZE.WIDTH/2, SCREEN_SIZE.HEIGHT/2);
            this.BACKGROUND.addChild(this.UI_MAIN);

            ////////
            var button_player_ai =
                new uiTouchSprite(
                    null,null,
                    function(touch, event, target)
                    {

                    }
                );

            button_player_ai.initWithSpriteFrame(_frame[4]);
            button_player_ai.setPosition(SCREEN_SIZE.WIDTH * 0.75, SCREEN_SIZE.HEIGHT/2 - 96);
            button_player_ai.setScale(0.85);
            this.BACKGROUND.addChild(button_player_ai);

            ////////
            var button_player_friend =
                new uiTouchSprite(
                    null,null,
                    function(touch, event, target)
                    {

                    }
                );

            button_player_friend.initWithSpriteFrame(_frame[2]);
            button_player_friend.setPosition(SCREEN_SIZE.WIDTH * 0.75, SCREEN_SIZE.HEIGHT/2 - 96 - 160);
            button_player_friend.setScale(0.85);
            this.BACKGROUND.addChild(button_player_friend);

            ////////
            var button_player_com =
                new uiTouchSprite(
                    null,null,
                    function(touch, event, target)
                    {

                    }
                );

            button_player_com.initWithSpriteFrame(_frame[3]);
            button_player_com.setPosition(SCREEN_SIZE.WIDTH * 0.75, SCREEN_SIZE.HEIGHT/2 - 96 - 160 * 2 );
            button_player_com.setScale(0.85);
            this.BACKGROUND.addChild(button_player_com);
        },
        initBackGroundAnimation:function()
        {
            ////////
            var SELF = this;

            ////////
            var _frameCloud =
                [
                    cc.spriteFrameCache.getSpriteFrame("cloud_1.png"),
                    cc.spriteFrameCache.getSpriteFrame("cloud_2.png")
                ];

            this.CLOUD_ARRAY = [];
            var CLOUD_CLASS = cc.Sprite.extend(
            {
                INDEX:0,
                HEIGHT_FLAG:0,
                ctor:function(index, height_flag)
                {
                    this._super();
                    this.INDEX = index;
                    this.HEIGHT_FLAG = height_flag;
                },
                setAnim:function()
                {
                    const rand_flag = GET_RAND(_frameCloud.length);
                    this.initWithSpriteFrame(_frameCloud[rand_flag]);

                    const rand_height = GET_RAND( this.HEIGHT_FLAG )/ 8.0;

                    const pos_start = cc.p( SCREEN_SIZE.WIDTH * 2, this.INDEX * this.HEIGHT_FLAG + this.HEIGHT_FLAG / 2.0 + rand_height);
                    const pos_end   = cc.p( -SCREEN_SIZE.WIDTH, this.INDEX * this.HEIGHT_FLAG + this.HEIGHT_FLAG / 2.0 + rand_height)

                    const duration = 48.0 + GET_RAND(48);

                    this.setPosition(pos_start);

                    this.setOpacity(0);

                    var action = cc.Sequence.create(
                        cc.FadeIn.create(duration/8 + GET_RAND(24), 255),
                        cc.MoveTo.create(duration, pos_end),
                        cc.FadeOut.create(duration/8, 0),
                        cc.CallFunc.create(
                            function(target, data)
                            {
                                target.end();
                            },
                            this,
                            null
                        )
                    );

                    this.runAction(action);
                },
                end:function()
                {
                    SELF.CLOUD_ARRAY.push(this);
                }
            });

            ////////
            const cut_y = 4;
            const cut_height = SCREEN_SIZE.HEIGHT / cut_y;

            for( var i=0; i<cut_y; i++ )
            {
                var cloud = new CLOUD_CLASS(i, cut_height);
                this.BACKGROUND.addChild(cloud);

                cloud.end();
            }

            var TIMER =
                function()
                {
                    setTimeout(
                        function()
                        {
                            var cloud = SELF.CLOUD_ARRAY.pop();
                            if( cloud )
                            {
                                cloud.setAnim();
                            }

                            TIMER();
                        },
                        1000
                    );
                };

            TIMER();

            ////
            //bird animation
            var bird_frame =
                [
                    cc.spriteFrameCache.getSpriteFrame("bird_0.png"),
                    cc.spriteFrameCache.getSpriteFrame("bird_1.png")
                ];

            var animation = new cc.Animation(bird_frame, 0.3);
            var animate = new cc.Animate(animation);
            var action = animate.repeatForever();

            var sptBird = new cc.Sprite();
            sptBird.setScale(0.6);
            sptBird.runAction(action);

            var nodeBird = cc.Node.create();
            nodeBird.addChild(sptBird);
            nodeBird.anim_flag = 0;

            this.BACKGROUND.addChild(nodeBird);

            nodeBird.setAnimation =
                function()
                {
                    ////////
                    const y_bird_flag =
                        [
                            SCREEN_SIZE.HEIGHT * 0.25 + GET_RAND(SCREEN_SIZE.HEIGHT/3),
                            SCREEN_SIZE.HEIGHT * 0.6 + GET_RAND(SCREEN_SIZE.HEIGHT/4)
                        ];


                    this.setPosition( 2.0 * SCREEN_SIZE.WIDTH, y_bird_flag[this.anim_flag % 2]);

                    ////////
                    var bird_move = cc.sequence(
                        cc.moveBy(24.0, cc.p(-3.0 * SCREEN_SIZE.WIDTH, 0.0)),
                        cc.CallFunc.create(
                            function(target, data)
                            {
                                nodeBird.anim_flag += 1;
                                nodeBird.setAnimation();
                            },
                            this,null
                        )
                    );

                    this.runAction(bird_move);
                };

            nodeBird.setAnimation();
            /*
            sptBird.runAction(action);
            sptBird.setPosition(SCREEN_SIZE.WIDTH/2, SCREEN_SIZE.HEIGHT/4 + GET_RAND(SCREEN_SIZE.HEIGHT/2));
            */

        }
    }
);