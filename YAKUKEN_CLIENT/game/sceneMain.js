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
                ];

            var sptBackground = cc.Sprite.createWithSpriteFrame(_frame[0]);
            sptBackground.setPosition(size.width / 2, size.height / 2);
            this.addChild(sptBackground, 0);
            this.BACKGROUND = sptBackground;

            ////////
            this.initBackGroundAnimation();

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
        }
    }
);