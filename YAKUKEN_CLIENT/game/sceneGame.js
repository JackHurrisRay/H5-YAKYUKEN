/**
 * Created by Jack.L on 2017/5/13.
 */

function formatPlayerName(name)
{
    function chkstrlen(str, lengthcheck)
    {
        var strlen = 0;
        var index  = 0;

        for(var i = 0;i < str.length; i++)
        {
            if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
                strlen += 2;
            else
                strlen++;

            if(strlen > lengthcheck && index == 0)
            {
                index = i;
            }
        }
        return   {length:strlen, cut:index};
    }

    var _player_name = name;
    var _cutCheck    = chkstrlen(_player_name, 12);

    if( _cutCheck.cut != 0 )
    {
        _player_name = _player_name.substr(0, _cutCheck.cut);
        _player_name += "...";
    }

    return _player_name;
}

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

            this.initBackParticlesEffect();
            this.initAnimationBackground();

            ////////
            this.initFightPanel();

            ////////
            this.initPlayerInfo();

            ////////
            this.initButtonFight();
        },
        initBackParticlesEffect:function()
        {
            ////////
            var _effectParticlesBackAnim = new cc.ParticleSystem("res/particles/fight_back_animation.plist");
            _effectParticlesBackAnim.setPosition(SCREEN_SIZE.WIDTH/2, SCREEN_SIZE.HEIGHT/2);
            this.BACKGROUND.addChild(_effectParticlesBackAnim);

            _effectParticlesBackAnim.setScale(2.0);
            _effectParticlesBackAnim.resetSystem();
            this.PARTICLES_backAnim = _effectParticlesBackAnim;

        },
        initFightPanel:function()
        {
            var SELF = this;

            ////////
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
                    var action2Func =
                        function()
                        {
                            var _action_self =
                                cc.Sequence.create(
                                    cc.tintTo(1.8, 255, 10, 10),
                                    cc.MoveBy.create(0.8, cc.p(0, -200))
                                );

                            var _action_opps =
                                cc.Sequence.create(
                                    cc.tintTo(1.8, 100, 100, 255),
                                    cc.MoveBy.create(0.8, cc.p(0, 200)),
                                    cc.CallFunc.create(
                                        function()
                                        {
                                            ////////
                                            SELF.BUTTON_FIGHT[0].setPosition(SCREEN_SIZE.WIDTH + 128,0);
                                            SELF.BUTTON_FIGHT[0].setVisible(true);
                                            SELF.BUTTON_FIGHT[0].runAction(
                                                cc.Sequence.create(
                                                    cc.MoveBy.create(0.3, cc.p(- 128 * 3, 0)),
                                                    cc.CallFunc.create(
                                                        function()
                                                        {
                                                            SELF.BUTTON_FIGHT[1].setPosition(SCREEN_SIZE.WIDTH + 128, 0);
                                                            SELF.BUTTON_FIGHT[1].setVisible(true);
                                                            SELF.BUTTON_FIGHT[1].runAction(
                                                                cc.Sequence.create(
                                                                    cc.MoveBy.create(0.3, cc.p(-128 * 2, 0)),
                                                                    cc.CallFunc.create(
                                                                        function()
                                                                        {
                                                                            SELF.BUTTON_FIGHT[2].setPosition(SCREEN_SIZE.WIDTH + 128, 0);
                                                                            SELF.BUTTON_FIGHT[2].setVisible(true);
                                                                            SELF.BUTTON_FIGHT[2].runAction(cc.MoveBy.create(0.3, cc.p(-128, 0)));

                                                                            ////////
                                                                            SELF.SELF_PLAYER.setVisible(true);
                                                                            SELF.OPPS_PLAYER.setVisible(true);

                                                                            SELF.SELF_IMG.setOpacity(0);
                                                                            SELF.OPPS_IMG.setOpacity(0);

                                                                            SELF.SELF_IMG.runAction(cc.FadeIn.create(0.5, 255));
                                                                            SELF.OPPS_IMG.runAction(cc.FadeIn.create(0.5, 255));

                                                                            SELF.SET_SELF_NAME("JackHurrisRay");
                                                                            SELF.SET_OPPS_NAME("MichelJackson");

                                                                        },this,null
                                                                    )
                                                                )
                                                            );

                                                        },this,null
                                                    )
                                                )
                                            );

                                        },this,null
                                    )
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

            const _whFlag = SCREEN_SIZE.WIDTH / SCREEN_SIZE.HEIGHT;

            for( var i in _frameData )
            {
                var _frames = _frameData[i];
                this.ANIM_CONTROL[i] = {ARRAY:[]};

                const _nMax = 8;
                const _kMax = Math.floor(_nMax * _whFlag);
                for( var k=-_kMax; k<=_kMax; k++ )
                {
                    for( var n=-_nMax; n<=_nMax; n++)
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
                    cc.ScaleTo.create(5.0, 0.75),
                    cc.ScaleTo.create(2.0, 0.5),
                    cc.ScaleTo.create(2.0, 0.3),
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
                    cc.ScaleTo.create(2.0, 0.3),
                    cc.ScaleTo.create(2.0, 0.5),
                    cc.ScaleTo.create(5.0, 0.75)
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
        },
        initButtonFight:function()
        {
            const _frame_ButtonFight =
                [
                    cc.spriteFrameCache.getSpriteFrame("button_fight_shitou.png"),
                    cc.spriteFrameCache.getSpriteFrame("button_fight_jiandao.png"),
                    cc.spriteFrameCache.getSpriteFrame("button_fight_bu.png"),
                ];

            this.BUTTON_FIGHT = [null,null,null];

            for( var i in _frame_ButtonFight )
            {
                this.BUTTON_FIGHT[i] =
                    new uiTouchSprite(
                        null,
                        null,
                        function(touch, event, target)
                        {

                        }
                    );

                this.BUTTON_FIGHT[i].initWithSpriteFrame(_frame_ButtonFight[i]);
                this.BUTTON_FIGHT[i].setAnchorPoint(1.0, 0.0);

                this.BACKGROUND.addChild(this.BUTTON_FIGHT[i]);

                this.BUTTON_FIGHT[i].setVisible(false);
            }

        },
        initPlayerInfo:function()
        {
            this.SELF_PLAYER = cc.Node.create();
            this.OPPS_PLAYER = cc.Node.create();

            this.BACKGROUND.addChild(this.SELF_PLAYER);
            this.BACKGROUND.addChild(this.OPPS_PLAYER);

            this.SELF_IMG = cc.Sprite.create();
            this.OPPS_IMG = cc.Sprite.create();

            this.SELF_PLAYER.addChild(this.SELF_IMG);
            this.OPPS_PLAYER.addChild(this.OPPS_IMG);

            var _textureImg = cc.textureCache.getTextureForKey(res_pix.PIX_WX_IMG);

            this.SELF_IMG.initWithTexture(_textureImg);
            this.OPPS_IMG.initWithTexture(_textureImg);

            ////////
            const _IMG_FLAG = 428;
            this.SET_SHADER_TO_PLAYER_IMG =
                function(playerSpt, isup)
                {
                    if( isup )
                    {
                        playerSpt.setShaderProgram(cc.SHADER_playerGameImgUP);
                    }
                    else
                    {
                        playerSpt.setShaderProgram(cc.SHADER_playerGameImgDown);
                    }

                    var sp = playerSpt;
                    const _flag_w = _IMG_FLAG / sp.getContentSize().width;
                    const _flag_h = _IMG_FLAG / sp.getContentSize().height;

                    sp.setScale(_flag_w, _flag_h);
                };

            this.SET_SHADER_TO_PLAYER_IMG(this.SELF_IMG, false);
            this.SET_SHADER_TO_PLAYER_IMG(this.OPPS_IMG, true);

            this.SELF_IMG.setPosition(SCREEN_SIZE.WIDTH - _IMG_FLAG/2, _IMG_FLAG/2);
            this.OPPS_IMG.setPosition(_IMG_FLAG/2, SCREEN_SIZE.HEIGHT - _IMG_FLAG/2);

            this.SELF_PLAYER.setVisible(false);
            this.OPPS_PLAYER.setVisible(false);

            var selfNameLabel = cc.LabelTTF.create("Jack", FONT_NAME.FONT_HEITI, 24);
            selfNameLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            selfNameLabel.setAnchorPoint(1.0, 1.0);
            selfNameLabel.setPosition(SCREEN_SIZE.WIDTH - 16, _IMG_FLAG - 12);
            this.BACKGROUND.addChild(selfNameLabel);

            var oppsNameLabel = cc.LabelTTF.create("Jack", FONT_NAME.FONT_HEITI, 24);
            oppsNameLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            oppsNameLabel.setAnchorPoint(0.0, 0.0);
            oppsNameLabel.setPosition(16, SCREEN_SIZE.HEIGHT - _IMG_FLAG + 64);
            this.BACKGROUND.addChild(oppsNameLabel);

            selfNameLabel.setOpacity(0);
            oppsNameLabel.setOpacity(0);

            this.SET_SELF_NAME =
                function(name)
                {
                    var _player_name = formatPlayerName(name);
                    selfNameLabel.setString(_player_name);
                    selfNameLabel.runAction(cc.FadeIn.create(1.0, 255));
                };

            this.SET_OPPS_NAME =
                function(name)
                {
                    var _player_name = formatPlayerName(name);
                    oppsNameLabel.setString(_player_name);
                    oppsNameLabel.runAction(cc.FadeIn.create(1.0, 255));
                };
        }
    }
);