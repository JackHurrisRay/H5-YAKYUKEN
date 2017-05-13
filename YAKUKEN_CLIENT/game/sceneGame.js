/**
 * Created by Jack.L on 2017/5/13.
 */

var sceneGame = cc.Scene.extend(
    {
        size:cc.director.getWinSize(),
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

            this.initAnimationBackground();

            ////////
            this.initFightPanel();
        },
        initFightPanel:function()
        {
            var _frame_panel = cc.spriteFrameCache.getSpriteFrame("fight_panel.png");

            const _colorFlag = 1.5;

            this.SELF_PANEL = cc.Sprite.createWithSpriteFrame(_frame_panel);
            this.SELF_PANEL.setAnchorPoint(0.0, 0.0);
            this.SELF_PANEL.setPosition(0.0, 0.0);
            this.BACKGROUND.addChild(this.SELF_PANEL);

            var SELF_PANEL = this.SELF_PANEL;

            this.OPPS_PANEL = cc.Sprite.createWithSpriteFrame(_frame_panel);
            this.OPPS_PANEL.setAnchorPoint(0.0, 1.0);
            this.OPPS_PANEL.setPosition(0.0, SCREEN_SIZE.HEIGHT + 2);
            this.OPPS_PANEL.setFlippedY(true);
            this.OPPS_PANEL.setFlippedX(true);
            this.BACKGROUND.addChild(this.OPPS_PANEL);

            var OPPS_PANEL = this.OPPS_PANEL;

            var _frame_logoicon = cc.spriteFrameCache.getSpriteFrame("icon_yakyuken.png");
            var _sptYakyuken = cc.Sprite.createWithSpriteFrame(_frame_logoicon);

            _sptYakyuken.setPosition(SCREEN_SIZE.WIDTH/2, SCREEN_SIZE.HEIGHT/2);
            this.BACKGROUND.addChild(_sptYakyuken);

            setTimeout(
                function()
                {
                    /*
                    SELF_PANEL.runAction(
                        cc.tintTo(0.5, 0, 0, 255)
                    );
                    */

                    var action2Func =
                        function()
                        {
                            var _action_self =
                                cc.Sequence.create(
                                    cc.tintTo(1.2, 255, 10, 10),
                                    cc.MoveBy.create(0.8, cc.p(0, -200))
                                );

                            var _action_opps =
                                cc.Sequence.create(
                                    cc.tintTo(1.2, 100, 100, 255),
                                    cc.MoveBy.create(0.8, cc.p(0, 200))
                                );


                            SELF_PANEL.runAction(_action_self);
                            OPPS_PANEL.runAction(_action_opps);

                        };

                    var action1 =
                        cc.Sequence.create(
                            cc.FadeIn.create(2.0,255),
                            cc.FadeOut.create(1.0,0),
                            cc.CallFunc.create(
                                function()
                                {
                                    action2Func();
                                },this,null
                            )
                        );

                    _sptYakyuken.runAction(
                        action1
                    );


                },
                200
            );

        },
        initAnimationBackground:function()
        {
            var SELF = this;
            var texture = cc.textureCache.getTextureForKey(res_pix.PIX_PNG);
            this.ANIM_BACKGROUND = cc.SpriteBatchNode.createWithTexture(texture);
            this.ANIM_BACKGROUND.setPosition(SCREEN_SIZE.WIDTH/2, SCREEN_SIZE.HEIGHT/2);

            var texture = this.ANIM_BACKGROUND.getTexture();
            this.BACKGROUND.addChild(this.ANIM_BACKGROUND);

            this.ANIM_CONTROL = [];

            var _frameData =
                [
                    [
                        cc.spriteFrameCache.getSpriteFrame("anim_0_0.png"),
                        cc.spriteFrameCache.getSpriteFrame("anim_0_1.png")
                    ],
                    [
                        cc.spriteFrameCache.getSpriteFrame("anim_1_0.png"),
                        cc.spriteFrameCache.getSpriteFrame("anim_1_1.png"),
                    ],
                    [
                        cc.spriteFrameCache.getSpriteFrame("anim_3_0.png"),
                        cc.spriteFrameCache.getSpriteFrame("anim_3_1.png"),
                        cc.spriteFrameCache.getSpriteFrame("anim_3_2.png"),
                        cc.spriteFrameCache.getSpriteFrame("anim_3_3.png"),
                    ],
                    [
                        cc.spriteFrameCache.getSpriteFrame("anim_2_0.png"),
                        cc.spriteFrameCache.getSpriteFrame("anim_2_1.png"),
                    ],
                ];

            for( var i in _frameData )
            {
                var _frames = _frameData[i];
                this.ANIM_CONTROL[i] = {ARRAY:[]};

                for( var k=-8; k<=8; k++ )
                {
                    for( var n=-8; n<=8; n++)
                    {
                        var animation = new cc.Animation(_frames, 0.3);
                        var animate = new cc.Animate(animation);
                        var action = animate.repeatForever();

                        var spt = cc.Sprite.createWithTexture(texture);
                        spt.runAction(action);
                        spt.setPosition(k * 256, n * 256);
                        this.ANIM_BACKGROUND.addChild(spt);
                        this.ANIM_CONTROL[i].ARRAY.push(spt);
                    }
                }

                this.ANIM_CONTROL[i].setVisible =
                    function(visible)
                    {
                        for( var i in this.ARRAY )
                        {
                            var spt = this.ARRAY[i];
                            spt.setVisible(visible);
                        }
                    };

                this.ANIM_CONTROL[i].setVisible(false);
            }

            var _ANIM_CTRL = this.ANIM_CONTROL;
            var _anim_index = 0;

            var _actionList =
                cc.Sequence.create(
                    cc.ScaleTo.create(2.0, 0.75),
                    cc.ScaleTo.create(1.0, 0.5),
                    cc.ScaleTo.create(2.0, 0.25),
                    cc.CallFunc.create(
                        function()
                        {
                            _ANIM_CTRL[_anim_index].setVisible(false);

                            _anim_index += 1;
                            if( _anim_index >= _frameData.length )
                            {
                                _anim_index = 0;
                            }

                            _ANIM_CTRL[_anim_index].setVisible(true);
                        },
                        this,
                        null
                    ),
                    cc.ScaleTo.create(2.0, 0.25),
                    cc.ScaleTo.create(1.0, 0.5),
                    cc.ScaleTo.create(2.0, 0.75)
                );

            var _totalAction =
                cc.RepeatForever.create(
                    _actionList
                );

            this.ANIM_BACKGROUND.runAction(
                _totalAction
            );

            setTimeout(
                function()
                {
                    SELF.ANIM_CONTROL[_anim_index].setVisible(true);
                },
                this, null
            );
        }
    }
);