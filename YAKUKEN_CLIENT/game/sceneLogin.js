/**
 * Created by Jack.L on 2017/5/3.
 */

var sceneLogin = cc.Scene.extend(
    {
        size:cc.director.getWinSize(),
        ctor:function(){
            this._super();

            const size = this.size;

            cc.textureCache.addImage(res_pix.PIX_PNG);
            //cc.spriteFrameCache.addSpriteFrames(res_pix.PIX_PLIST, res_pix.PIX_PNG);
            cc.spriteFrameCache.addSpriteFrames(res_pix.PIX_PLIST, cc.textureCache.getTextureForKey(res_pix.PIX_PNG));

            var _frame =
                [
                    cc.spriteFrameCache.getSpriteFrame("background_login.jpg"),
                    cc.spriteFrameCache.getSpriteFrame("button_login.png")
                ];

            var sptBackground = cc.Sprite.createWithSpriteFrame(_frame[0]);
            sptBackground.setPosition(size.width / 2, size.height / 2);
            this.addChild(sptBackground, 0);

            var button_Login = new uiTouchSprite(
                null,null,
                function(touch, event, target)
                {
                    ////////
                    var scene = new sceneMain();
                    var _trans = new cc.TransitionCrossFade(1, scene);
                    cc.director.runScene(_trans);
                }
            );

            button_Login.initWithSpriteFrame(_frame[1]);
            button_Login.setPosition(SCREEN_SIZE.WIDTH / 2, 128.0 );
            sptBackground.addChild(button_Login);

        }
    }
);
