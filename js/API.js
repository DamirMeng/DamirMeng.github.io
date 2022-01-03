/*
 * 存储本网站的各种API
 *本文件不起作用　　用于理解本网站　　便于维护
 *有以下API
 *1.一言API>>>>用于加载随机的句子 并附带句子出处 作者from_who 好像有问题，不会返回数据
 *2.canvas_ribbon.js>>>>>>页面的带子，每次都会随机产生，点击也会变化
 *3.Aplayer>>>一个音乐播放器  可用于播放音乐
 *4.ScrollReveal>>>>页面的出现效果（动画），他是根据标签的顺序来出现的，有时候并不理想。
 *5.网易云音乐API>>>获取网易云音乐的链接，加载到Aplayer中
 *6.不蒜子网页浏览数据统计>>统计用户访问信息
 *7.必应随机图片（每日一图）
 *8.百度分享  实现链接分享（本站未使用）
 *9.来必力评论功能>>留言板和部分原创文章开启了功能
 *10.反馈层函数使用方法
 */


//*1.一言API
/*
*文档地址：https://developer.hitokoto.cn/sentence/
*引用一下script即可在id=hitokoto出生成句子  当然更改script中的select请求参数可更换id
*c为句子类型：
a	动画
b	漫画
c	游戏
d	文学
e	原创
f	来自网络
g	其他
h	影视
i	诗词
j	网易云
k	哲学
l	抖机灵
<script type="text/javascript" src="https://v1.hitokoto.cn/?c=d&encode=js&select=%23hitokoto "></scrip
下面为一个通过AJAX处理的例子例子
 */
function getYiyan(nth_li) { // 用一言api添加  没有json数据的卡片
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); //获得字符串形式的响应数据。
            document.querySelectorAll("#columns li")[nth_li].querySelector("p").innerHTML = data.hitokoto //加载句子
            document.querySelectorAll("#columns li")[nth_li].querySelectorAll("p")[1].innerHTML = "————《" + data.from + "》" //加载来源并格式化
        }
    }
    xhr.open('get', " https://international.v1.hitokoto.cn/?c=b"); //c参数可以的设置不同类型的句子
    xhr.send();
}

/*2.canvas_ribbon.js>>>直接引入script既可以：	
 *<script id="ribbon" zindex="-1111" alpha="0.2" size="100" src="js/canvasRibbon .js"></script>
 *size>>带子宽度   alpha>>>颜色的深度
 */
//3.Aplayer
/*
 *加载的JS：https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js 
 *加载的CSS：https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css 
 *文档地址： https://aplayer.js.org/#/zh-Hans/
 */
//配置音乐播放器属性  new 一个播放器
window.ap = new APlayer({
    container: document.querySelector('#aplayer'), //选择加载的容器
    fixed: true, //位置
    lrcType: 1, //歌词类型
    autoplay: true, //自动播放
});
//Aplayer方法
var data = JSON.parse(this.responseText); //获得字符串形式的响应数据。data内含有所有数据
ap.list.add([{ //添加歌曲
    name: data.songs[0].name,
    artist: data.songs[0].artists[0],
    url: data.songs[0].url,
    cover: data.songs[0].album.picture, //封面
    lrc: data.songs[0].lyric.base,
}]);

//*4.ScrollReveal
/*
 *文档地址https://scrollrevealjs.org/api/reveal.html
 *引入script>>> <script src="https://unpkg.com/scrollreveal"></script>
 *并设置参数 可用默认 #article_ul li为添加动画的标签
 */
ScrollReveal().reveal('#article_ul li', {
    delay: 100, //延时
    distance: '24px', //距离
    duration: 800, //持续事件
    easing: 'ease-in-out', //动画
    interval: 300, //间隔F
    origin: 'bottom', //起点
    cleanup: false,
    reset: true, //是否重复
});
//*5.网易云音乐API
/*
 *文档地址：https://github.com/a632079/teng-koa/blob/master/netease.md
 *搜索音乐>获取id>由id读取链接>加载到Aplayer中
 *搜索音乐 https://v1.hitokoto.cn/nm/search/歌曲名?type=SONG&offset=0&limit=30
 *由id获取链接  https://v1.hitokoto.cn/nm/summary/id?common=true&lyric=true&quick=true
 返回的数据：
                data.songs[0].name,//歌曲名
                data.songs[0].artists[0],//艺术家
                data.songs[0].url,//歌曲链接
                data.songs[0].album.picture,//封面图片链接
                data.songs[0].lyric.base,//歌词
 */
//*6.不蒜子网页浏览数据统计
/*
*文档地址：http://ibruce.info/2015/04/04/busuanzi/
*安装脚本：<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
*安装标签：
  <span id="busuanzi_value_site_pv"></span>>> 会复制给改id  其他可自定义
 */
//*7.必应随机图片（每日一图）
//src = "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"  直接src上就行
//8.*8.百度分享  实现链接分享（本站未使用）
//感觉没必要
//可参考>>https://blog.csdn.net/weixin_41187842/article/details/81502700

/***9.来必力评论功能
 * 来必力官网：http://livere.com/
 * 直接上代码  挺简单
 * <!-- 来必力City版安装代码 -->
<div id="lv-container" data-id="city" data-uid="MTAyMC80OTE3Mi8yNTY2Ng==">
<script type="text/javascript">
   (function(d, s) {
       var j, e = d.getElementsByTagName(s)[0];
       if (typeof LivereTower === 'function') { return; }
       j = d.createElement(s);
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
   })(document, 'script');
</script>
<noscript>为正常使用来必力评论功能请激活JavaScript</noscript>
</div>
<!-- City版安装代码已完成 -->
 */
/**10.反馈层函数使用 */
/**
 * 反馈层函数在框架外定义，即Aplayer.js文件定义
 * 调用方法： window.parent.Mask("显示的文字","要显示的图片的地址")
 */
/**更多API
 * 
  * 手机号码归属地API接口：https://www.juhe.cn/docs/api/id/11
历史上的今天API接口：https://www.juhe.cn/docs/api/id/63
股票数据API接口：https://www.juhe.cn/docs/api/id/21
全国WIFI接口：https://www.juhe.cn/docs/api/id/18
星座运势接口：https://www.juhe.cn/docs/api/id/58
黄金数据接口：https://www.juhe.cn/docs/api/id/29
语音识别接口：https://www.juhe.cn/docs/api/id/134
周公解梦接口：https://www.juhe.cn/docs/api/id/64
天气预报API接口：https://www.juhe.cn/docs/api/id/73
身份证查询API接口：https://www.juhe.cn/docs/api/id/38
笑话大全API接口：https://www.juhe.cn/docs/api/id/95
邮编查询接口：https://www.juhe.cn/docs/api/id/66
老黄历接口：https://www.juhe.cn/docs/api/id/65
网站安全检测接口：https://www.juhe.cn/docs/api/id/19
手机固话来电显示接口：https://www.juhe.cn/docs/api/id/72
基金财务数据接口：https://www.juhe.cn/docs/api/id/28
成语词典接口：https://www.juhe.cn/docs/api/id/157
新闻头条接口：https://www.juhe.cn/docs/api/id/235
IP地址接口：https://www.juhe.cn/docs/api/id/1
问答机器人接口：https://www.juhe.cn/docs/api/id/112
汇率API接口：https://www.juhe.cn/docs/api/id/80
电影票房接口：https://www.juhe.cn/docs/api/id/44
万年历API接口：https://www.juhe.cn/docs/api/id/177
NBA赛事接口：https://www.juhe.cn/docs/api/id/92

百度 api集市免费接口
IP地址查询 http://apistore.baidu.com/apiworks/servicedetail/114.html
频道新闻API_易源 http://apistore.baidu.com/apiworks/servicedetail/688.html
微信热门精选 http://apistore.baidu.com/apiworks/servicedetail/632.html
天气查询 http://apistore.baidu.com/apiworks/servicedetail/112.html
中国和世界天气预报 http://apistore.baidu.com/apiworks/servicedetail/478.html
股票查询 http://apistore.baidu.com/apiworks/servicedetail/115.html
身份证查询http://apistore.baidu.com/apiworks/servicedetail/113.html
美女图片 http://apistore.baidu.com/apiworks/servicedetail/720.html
音乐搜索 http://apistore.baidu.com/apiworks/servicedetail/1020.html
图灵机器人 http://apistore.baidu.com/apiworks/servicedetail/736.html
汇率转换 http://apistore.baidu.com/apiworks/servicedetail/119.html
节假日 http://apistore.baidu.com/apiworks/servicedetail/1116.html
pullword在线分词服务 http://apistore.baidu.com/apiworks/servicedetail/143.html
去哪儿网火车票 http://apistore.baidu.com/apiworks/servicedetail/697.html
笑话大全 http://apistore.baidu.com/apiworks/servicedetail/864.html
银行卡查询服务http://apistore.baidu.com/apiworks/servicedetail/735.html
语音合成 http://apistore.baidu.com/apiworks/servicedetail/867.html
宅言API-动漫台词接口 http://apistore.baidu.com/apiworks/servicedetail/446.html
去哪儿景点门票查询 http://apistore.baidu.com/apiworks/servicedetail/140.html
手机号码归属地 http://apistore.baidu.com/apiworks/servicedetail/794.html
体育新闻 http://apistore.baidu.com/apiworks/servicedetail/711.html
手机归属地查询http://apistore.baidu.com/apiworks/servicedetail/709.html
科技新闻 http://apistore.baidu.com/apiworks/servicedetail/1061.html
空气质量指数 http://apistore.baidu.com/apiworks/servicedetail/116.html
天狗健康菜谱 http://apistore.baidu.com/apiworks/servicedetail/987.html
热门游记列表 http://apistore.baidu.com/apiworks/servicedetail/520.html
天狗药品查询 http://apistore.baidu.com/apiworks/servicedetail/916.html
汉字转拼音 http://apistore.baidu.com/apiworks/servicedetail/1124.html
国际新闻 http://apistore.baidu.com/apiworks/servicedetail/823.html
彩票 http://apistore.baidu.com/apiworks/servicedetail/164.html
微信精选 http://apistore.baidu.com/apiworks/servicedetail/863.html
天狗健康资讯 http://apistore.baidu.com/apiworks/servicedetail/888.html
兴趣点检索 http://apistore.baidu.com/apiworks/servicedetail/182.html
用药参考 http://apistore.baidu.com/apiworks/servicedetail/754.html
天狗健康知识 http://apistore.baidu.com/apiworks/servicedetail/899.html
奇闻趣事 http://apistore.baidu.com/apiworks/servicedetail/633.html
花边新闻 http://apistore.baidu.com/apiworks/servicedetail/768.html
天狗医院大全 http://apistore.baidu.com/apiworks/servicedetail/988.html
生活健康 http://apistore.baidu.com/apiworks/servicedetail/989.html

一些其他的API接口：
豆瓣开放 https://developers.douban.com/wiki/?title=guide
淘宝开放平台 http://open.taobao.com/?spm=a219a.7395905.1.1.YdFDV6
图灵语音 http://www.tuling123.com/help/h_cent_andriodsdk.jhtml?nav=doc
讯飞语音http://www.xfyun.cn/robots/solution
马化腾的微信开放平台（对应的还有腾讯开放平台）https://open.weixin.qq.com/
融云IMhttps://developer.rongcloud.cn/signin?returnUrl=%2Fapp%2Fappkey%2FPv4vYQwaxSZdfpLX5AI%3D
百度开发者中心http://developer.baidu.com/
人脸识别http://www.faceplusplus.com.cn/
高德地图http://lbs.amap.com/
蜻蜓FMhttp://open.qingting.fm
  */