/**
 * Created by Jack on 2017/5/3 0022.
 */
//const IP_ADDRESS = "ws://192.168.3.17:2017";
const IP_ADDRESS = "ws://59.110.30.245:2017";

const FONT_NAME =
{
    FONT_ARIAL:"Arial",
    FONT_THONBURI:"Thonburi",
    FONT_APPLEGOTHIC:"AppleGothic",
    FONT_HEITI:"黑体",
    FONT_YOUYUAN:"幼圆",

    FONT_SKETCHFLOW_PRINT:"SketchFlow Print",
    FONT_BRADLEY_HAND_ITC:"Bradley Hand ITC",
};

const SCREEN_SIZE =
{
    WIDTH:640,
    HEIGHT:1040
};

const BM_FONT =
{
};

const res_bmFont =
    [
    ];

const res_javascript =
    [
        ////
        "http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js",
        "http://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js",
        "jquery-3.1.1.js",
        "core/base64.js",

        ////
        "core/uiTouchSprite.js",
        "game/option.js",

        ////
        "game/sceneLogin.js",
        "game/sceneMain.js"

    ];

const res_particles =
    [
    ];

const res_sound =
{
};

const res_music =
    [
    ];

const res_shader =
{
    ////
    VS_NORMAL:"res/shader/normal.vsh",

    ////
    PS_AROUND_RECT:"res/shader/around_rect.fsh"
};

var res_pix =
{
    PIX_PNG:"res/pix/pix_source.png",
    PIX_PLIST:"res/pix/pix_source.plist"
}

var gResource = [

    ////
    res_shader.VS_NORMAL,
    res_shader.PS_AROUND_RECT,

    ////
    res_pix.PIX_PNG,
    res_pix.PIX_PLIST

    ////


];

gResource = gResource.concat(res_javascript);
gResource = gResource.concat(res_particles);
gResource = gResource.concat(res_music);
gResource = gResource.concat(res_bmFont);