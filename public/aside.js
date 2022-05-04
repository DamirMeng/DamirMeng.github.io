/**
 * 右下角置顶键和联系方式的显示与事件等
 */
function writeAside() {
    document.write("<aside class=\"aside\">");
    document.write("    <div><a id=\"qq\" target=\"_blank\" href=\"http:\/\/wpa.qq.com\/msgrd?v=3&uin=790430354&site=qq&menu=yes\">");
    document.write("            <img src=\"https:\/\/ae01.alicdn.com\/kf\/H7af94cac043845c9a8779d35c29da9a7A.png\" alt=\"\"><\/a><\/div>");
    document.write("    <div class=\"top\">");
    document.write("        <a href=\"#top\"><img src=\"https:\/\/ae01.alicdn.com\/kf\/H9227752dda6c455ead9336cb46fffdd8T.png\" alt=\"\"><\/a>");
    document.write("    <\/div>");
    document.write("<\/aside>");
}
writeAside();

var width = document.documentElement.clientWidth;
//置顶键、qq相应
! function () {
    // 改变QQ地址  （腾讯QQ的API移动端与PC端链接不同） PC优先
    if (width < 600) {
        document.querySelector('#qq').href = "mqqwpa://im/chat?chat_type=wpa&uin=790430354&version=1&src_type=web&web_src=oicqzone.com";
    }
    // 置顶键的响应（右下角）
    var scrollTop = 0;
    //依据scrollTop判断页面滚动的方向
    document.onscroll = function () {
        if ((scrollTop < 250) || (scrollTop < (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset))) {
            //在顶部、向上
            document.querySelector('.aside').style.right = -45 + "px";
        } else { //向下
            document.querySelector('.aside').style.right = 5 + "px";
        }
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    }
}()