/**
 * Created by Jack on 2017/5/3 0022.
 */
//const IP_ADDRESS = "ws://192.168.3.17:2017";
const IP_ADDRESS = "ws://59.110.30.245:2017";

const res_path = "";//"http://5941game.oss-cn-qingdao.aliyuncs.com/yakyuken/";

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

const TTF_FONT =
{
    FONT_HUAKANGSHAOLV:"http://5941game.oss-cn-qingdao.aliyuncs.com/font/huakangshaonv.TTF"
};

const res_Font =
    [
        //TTF_FONT.FONT_HUAKANGSHAOLV
    ];

const res_javascript =
    [
        ////
        "http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js",
        "http://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js",
        "http://5941game.oss-cn-qingdao.aliyuncs.com/common/jquery-3.1.1.js",
        "http://5941game.oss-cn-qingdao.aliyuncs.com/common/base64.js",

        ////
        "core/uiTouchSprite.js",

        ////
        "game/clientRequest.js",
        "game/network.js",
        "game/option.js",

        ////
        "game/sceneLogin.js",
        "game/sceneMain.js",
        "game/sceneGame.js"

    ];

const res_particles =
    [
    ];

const res_sound =
    [
        res_path + "res/soundeffect/touch.wav",
        res_path + "res/soundeffect/door.wav"
    ];

const res_music =
    [
    ];

const res_shader =
{
    ////
    VS_NORMAL:res_path + "res/shader/normal.vsh",

    ////
    PS_AROUND_RECT:res_path + "res/shader/around_rect.fsh"
};

var res_pix =
{
    PIX_PNG:res_path + "res/pix/pix_source.png",
    PIX_PLIST:res_path + "res/pix/pix_source.plist",


    PIX_WX_IMG:res_path + "res/pix/wx_image.jpg",
}

var gResource = [

    ////
    res_shader.VS_NORMAL,
    res_shader.PS_AROUND_RECT,

    ////
    res_pix.PIX_PNG,
    res_pix.PIX_PLIST,

    ////
    res_pix.PIX_WX_IMG,

];

gResource = gResource.concat(res_javascript);
gResource = gResource.concat(res_particles);
gResource = gResource.concat(res_sound);
gResource = gResource.concat(res_music);
gResource = gResource.concat(res_Font);