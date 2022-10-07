/* 
 *所有网页均添加
 */
var width = document.documentElement.clientWidth;
var container = document.querySelector('#container');

function addListSVg() { //添加移动端菜单键与监听
    if (width < 783) {
        // 添加svg——目录按钮是否展示
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute("id", "list");
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute("d", "M30 18h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM30 6.25h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM2 25.75h28c1.1 0 2 0.9 2 2s-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2z");
        svg.appendChild(path);
        document.body.appendChild(svg);
        svg.addEventListener('click', function (params) {
            if (document.querySelector('#side-nav').classList.contains('left')) {
                document.querySelector('#side-nav').classList.remove("left");
            } else {
                document.querySelector('#side-nav').classList.add("left");
            }
        })
    }
}

function addLeftList() { // 生成左侧菜单栏   
    // 有.contents的添加到左边菜单栏
    var contents = document.querySelectorAll(".contents");
    if (contents.length > 0) {
        var li = document.createElement("li");
        var ul = document.createElement("ul");
        var a = document.createElement("a");
        var container = document.querySelector('body');
        ul.id = "side-nav";
        li.appendChild(a);
        ul.appendChild(li);
        container.insertBefore(ul, container.lastChild);
        var id = "";

        for (let index = 0; index < contents.length; index++) { //生成侧边导航栏并设id、href
            var element = contents[index];
            var li = document.querySelector("#side-nav li").cloneNode(true) //克隆  true：子节点也克隆
            //有data-title-name的设置为标题，否则设置其文本
            if (element.dataset.titleName != undefined) {
                id = element.dataset.titleName;
            } else {
                id = element.innerText;
            }
            li.firstChild.innerHTML = id;
            li.firstChild.href = "#" + id;
            element.setAttribute("id", id);//利用id号来进行跳转
            ul.appendChild(li);
        }

        document.querySelector("#side-nav").addEventListener("click", function (e) {// 添加监听ul
            if (e.target.localName == "a") {
                for (let index = 0; index < this.childNodes.length; index++) { //清空.active
                    this.childNodes[index].classList.remove("active");
                }
                e.target.parentNode.classList.add("active");// 被点击后添加样式
            }
        })
        window.addEventListener("scroll", function (e) { //监听滚动 便于active的响应
            // h获取被滚动的高度
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            for (let index = 0; index < document.querySelectorAll(".contents").length; index++) { // 遍历标题
                var element = document.querySelectorAll(".contents")[index];
                //element.getBoundingClientRect().top);可以直接获取元素到浏览器顶部的距离
                if (element.getBoundingClientRect().top < 120) { //如果滚到对应位置 && d - scrollTop < 200
                    for (let index = 0; index < document.querySelector("#side-nav").childNodes
                        .length; index++) { //清空.active
                        if (document.querySelector("#side-nav").childNodes[index].classList.contains('active')) {
                            document.querySelector("#side-nav").childNodes[index].classList.remove("active");
                        }
                    }
                    document.querySelector("#side-nav").childNodes[index + 1].classList.add("active");
                }
            }
            // 目录栏响应
            if ((scrollTop > 250 && scrollTop < document.documentElement.scrollHeight - 900) && width > 800) { //防止移动端出现
                document.querySelector('#side-nav').classList.add("left");
            } else {
                document.querySelector('#side-nav').classList.remove("left");
            }
        })
        addListSVg();
    }
}

! function () { //文章字数、左侧目录、头部粒子文字、留言板块

    function fnGetCpmisWords(str) {//用word方式计算正文字数
        var sLen = 0;
        try {
            //先将回车换行符做特殊处理
            str = str.replace(/(\r\n+|\s+|　+)/g, "龘");
            //处理英文字符数字，连续字母、数字、英文符号视为一个单词
            str = str.replace(/[\x00-\xff]/g, "m");
            //合并字符m，连续字母、数字、英文符号视为一个单词
            str = str.replace(/m+/g, "*");
            //去掉回车换行符
            str = str.replace(/龘+/g, "");
            //返回字数
            sLen = str.length;
        } catch (e) { }
        return sLen;
    }

    if (document.querySelector("#word") || document.querySelector("#write")) { //文章详情页的内容设置
        //设置页头的字数
        if (document.querySelector('#word')) {
            var p = document.querySelector('.massage').textContent;
            document.querySelector('#word').innerHTML = fnGetCpmisWords(p) + "字";
        }

        addLeftList(); //添加左侧目录

        // 添加来必力评论
        var main = document.querySelector("main"),
            h2 = document.createElement("h2"),
            div = document.createElement("div"),
            span = document.createElement("span");
        h2.innerText = "留言";
        span.innerText = "文明上网，理性发言";
        span.setAttribute('id', 'tips');
        h2.appendChild(span);
        div.setAttribute('id', 'lv-container');
        div.setAttribute('data-id', 'city');
        div.setAttribute('data-uid', 'MTAyMC80OTE3Mi8yNTY2Ng==');
        main.appendChild(h2);
        main.appendChild(div);
        //添加js
        (function (d, s) {
            var j, e = d.getElementsByTagName(s)[0];
            if (typeof LivereTower === 'function') {
                return;
            }
            j = d.createElement(s);
            j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
            j.async = true;
            e.parentNode.insertBefore(j, e);
        })(document, 'script');

        // add iframe  添加头部粒子文字
        var h = window.innerHeight / 2 - 50 + "px"
        if (!document.querySelector(".none-top-word")) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("id", "top_h");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("height", h);
            iframe.setAttribute("src", "../../../iframe/particleWord.html");
            container.insertBefore(iframe, container.childNodes[0]);
        }
    }
}()
var HtmlTitleText = document.querySelector("title").innerText;
! function () { //main边框、进度条
    //随机边框颜色
    if (document.querySelector('main')) {
        document.querySelector('main').style.borderColor = "#" + Math.round(Math.random() * 0x1000000).toString(16);
    }
    // 添加进度条标签
    var progress = document.createElement("progress");
    progress.setAttribute("class", "top_progress");
    progress.setAttribute("value", "0");
    document.body.appendChild(progress);

    // 进度条的响应
    if (document.querySelector('.top_progress')) {
        window.onscroll = function () {
            document.querySelector('.top_progress').max = document.body.scrollHeight - window.screen.availHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            document.querySelector('.top_progress').value = scrollTop;
        }
    }

    //标题添加“蒙大明的个人博客”

    if (document.querySelector("title").innerText != "蒙大明的个人博客") {
        document.querySelector("title").innerText += " - 蒙大明的个人博客"
    }

    console.log("%cBlue Blog%c\n 蒙大明的博客\n\n  用于发布一些文章！", "font-size:96px;color:#3b3e43",
        "font-size:12px;color:#4285f4;");
}();

(function () { // 站长推荐、相关阅读、随机阅读栏目DOM的生成与内容加载
    if (document.querySelector(".massage")) { //通过是否有标题判断是否要添加    推荐算法
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var articles = JSON.parse(this.responseText);//例化
                // 顶部
                var card = document.createElement("div"),
                    head = document.createElement("div");
                head.setAttribute("class", "h-htc");
                //   div.innerHTML="&lt;div></div>"
                var ul = document.createElement("ul");
                ul.setAttribute("class", "h-tablist-s");
                var str = ["站长推荐", "相关阅读", "随机阅读"];
                //由str的长度添加<li><a></a></li>
                //并设置文字  href
                for (let index = 0; index < str.length; index++) {
                    var a = document.createElement("a");
                    a.innerHTML = str[index];
                    var li = document.createElement("li");
                    if (index == 1) {
                        li.setAttribute("class", "active");
                    }
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                head.appendChild(ul);
                //底部列表
                var bottom = document.createElement("div");
                bottom.setAttribute("class", "b-htc");
                var ul = document.createElement("ul");
                for (let index = 0; index < 12; index++) {
                    var a = document.createElement("a");
                    var span = document.createElement("span");
                    span.innerHTML = index + 1;//文章列表序号
                    var li = document.createElement("li");
                    li.appendChild(span);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                bottom.appendChild(ul);
                card.appendChild(head);
                card.appendChild(bottom);
                card.setAttribute("class", "bottom_card");
                var container = document.querySelector("#container");
                container.insertBefore(card, document.querySelector(".footer"));
                var list = document.querySelectorAll(".b-htc ul li");
                var text = new Array();
                var title = HtmlTitleText;
                // 设标题
                document.querySelector(".title h2").innerText = title;
                // if (document.querySelector(".title h2")) {
                //     var title = document.querySelector(".title h2").innerText;
                // } else {
                //     var title = document.querySelector(".title h1").innerText;
                // }
                var writer;
                var tag;
                var time;
                var classification;
                var index_have = false;//判断index.json中是否存在
                // 判断在json是否有对应的标题
                // 读取标题所对应的json的信息  将其序号加入text中
                for (let index = 0; index < articles.length; index++) {
                    const element = articles[index];
                    if (element.标题 == title) {
                        classification = element.分类;
                        writer = element.作者;
                        tag = element.标签;
                        time = element.日期;
                        text.push(index);
                        index_have = true;
                    }
                }
                //设置标题下面的信息栏
                var spanHTML = document.querySelectorAll(".later");
                if (spanHTML.length > 0) {
                    spanHTML[0].id = "busuanzi_value_page_pv";
                    if (tag == undefined) {
                        spanHTML[1].innerHTML = "--";
                    } else {
                        spanHTML[1].innerHTML = tag;
                    }
                    if (writer == undefined) {
                        spanHTML[2].innerHTML = "--";
                    } else {
                        spanHTML[2].innerHTML = writer;
                    }
                    if (time == undefined) {
                        spanHTML[3].innerHTML = "--";
                    } else {
                        spanHTML[3].innerHTML = time;
                    }
                }
                // ---------------------------------------添加下面的文章推荐---------------------------------------
                if (index_have) { //index.json中存在
                    // 1 !text.includes(index)用于防止有同一篇文章
                    // 提取标题中有同样文字的文章序号
                    if (text.length < list.length + 1) {
                        var title_word = title.split(""); //剪辑成数组
                        for (let index = 0; index < articles.length; index++) {
                            var element = articles[index];
                            for (let i = 0; i < title_word.length; i++) { //遍历是否有对应的字
                                if (element.标题.includes(title_word[i]) && text.length < list.length + 1 && !text.includes(index)) {
                                    text.push(index);
                                }
                            }
                        }
                    }
                    // 提取同一个分类（classification）的文章序号
                    if (text.length < list.length + 1) {
                        for (let index = 0; index < articles.length; index++) {
                            var element = articles[index];
                            if (element.分类 == classification && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index);
                            }
                        }
                    }
                    // 提取同一个作者（writer）的文章序号
                    if (text.length < list.length + 1) {
                        for (let index = 0; index < articles.length; index++) {
                            var element = articles[index];
                            if (element.作者 == writer && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index);
                            }
                        }
                    }
                    // 提取同一个标签（tag）的文章序号
                    if (text.length < list.length + 1) {
                        for (let index = 0; index < articles.length; index++) {
                            var element = articles[index];
                            if (element.标签 == tag && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index);
                            }
                        }
                    }
                    // 提取同一个同一年（time）的文章序号
                    if (text.length < list.length + 1) {
                        for (let index = 0; index < articles.length; index++) {
                            var element = articles[index];
                            if (element.日期.substring(0, 4) == time.substring(0, 4) && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index);
                            }
                        }
                    }

                } else { //index.json中不存在时
                    // 提取标题中有同样文字的文章序号
                    text.push("none")
                    if (text.length < list.length + 1) {
                        var title_word = title.split(""); //剪辑成数组
                        for (let index = 0; index < articles.length; index++) {
                            var element = articles[index];
                            for (let i = 0; i < title_word.length; i++) { //遍历是否有对应的字
                                if (element.标题.includes(title_word[i]) && text.length < list.length + 1 && !text.includes(index)) {
                                    text.push(index);
                                }
                            }
                        }
                    }
                }
                // 如果数量不够，随机添加
                while (text.length < list.length + 1) {
                    var random = Math.floor(Math.random() * articles.length)
                    if (!text.includes(random)) {
                        text.push(random)
                    }
                }
                // 使用text数组添加，title和href
                for (let index = 0; index < list.length; index++) {
                    var element = list[index];
                    element.querySelector("a").innerHTML = articles[text[index + 1]].标题 //index+1是因为第一个是当前的文章的序号
                    element.querySelector("a").href = articles[text[index + 1]].文章链接
                }

                // 添加监听ul
                document.querySelector(".h-tablist-s").addEventListener("click", function name(e) {
                    for (let index = 0; index < this.childNodes.length; index++) { //清空.active
                        if (this.childNodes[index].classList.contains('active')) {
                            this.childNodes[index].classList.remove("active")
                        }
                    }
                    // 防止触发源的不理想（好像不存在）  添加active
                    if (e.target.localName == "a") {
                        e.target.parentNode.classList.add("active")
                    }
                    if (e.target.innerHTML == "站长推荐") { //点击站长推荐
                        var num = new Array
                        for (let index = 0; index < articles.length; index++) {
                            var element = articles[index];
                            if (element.推荐) { //优先显示json中recommend=true的文章
                                num.push(index)
                            }
                        }
                        // 防止数量不够，随机添加
                        while (num.length < list.length) {
                            var random = Math.floor(Math.random() * articles.length)
                            if (!num.includes(random)) {
                                num.push(random)
                            }
                        }
                        // 添加底部展示信息
                        for (let index = 0; index < list.length; index++) {
                            var element = list[index];
                            element.querySelector("a").innerHTML = articles[num[index]].标题
                            element.querySelector("a").href = articles[num[index]].文章链接
                        }
                    } else if (e.target.innerHTML == "相关阅读") { //点击相关阅读
                        // 利用数组text设置信息
                        for (let index = 0; index < list.length; index++) {
                            var element = list[index];
                            element.querySelector("a").innerHTML = articles[text[index + 1]].标题
                            element.querySelector("a").href = articles[text[index + 1]].文章链接
                        }
                    } else if (e.target.innerHTML == "随机阅读") { //点击随机阅读
                        var Random = new Array
                        // 获取随机序号且无重复
                        while (Random.length < list.length) {
                            var random = Math.floor(Math.random() * articles.length)
                            if (!Random.includes(random)) {
                                Random.push(random)
                            }
                        }
                        // 设置信息
                        for (let index = 0; index < list.length; index++) {
                            var element = list[index];
                            element.querySelector("a").innerHTML = articles[Random[index]].标题
                            element.querySelector("a").href = articles[Random[index]].文章链接
                        }
                    }
                })
            }
        }
        xmlhttp.open("GET", "../../../../json/全部文章.json", true);
        xmlhttp.send();
    }
})();

(function () {
    // 添加jquery以支持动态带子
    var secScript = document.createElement("script");
    secScript.setAttribute("type", "text/javascript");
    secScript.setAttribute("src", "https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js");
    document.body.insertBefore(secScript, document.body.lastChild);

    //添加一言API的script
    var secScript = document.createElement("script");
    secScript.setAttribute("type", "text/javascript");
    secScript.setAttribute("src", "https://v1.hitokoto.cn/?c=d&c=i&c=j&c=k&encode=js&select=%23hitokoto&max_length=22"); //一言c参数可以设置句子类型
    document.body.insertBefore(secScript, document.body.lastChild);
})();

(function () { // 代码块右上角添加复制按钮和功能
    if (document.querySelector('.md-fences')) {
        var codes = document.querySelectorAll('.md-fences');
        for (let index = 0; index < codes.length; index++) { //添加按钮
            const element = codes[index];
            element.classList.add('copy-code' + "-" + index);
            var div = document.createElement('div');
            div.classList.add('copy-button');
            div.setAttribute("data-clipboard-target", ".copy-code" + "-" + index);
            div.innerText = "复制代码";
            element.appendChild(div);
        }

        function loadScript(src, callback) { //添加clipboard.min.js
            var script = document.createElement('script'),
                head = document.getElementsByTagName('head')[0];
            script.type = 'text/javascript';
            script.charset = 'UTF-8';
            script.src = src;
            if (script.addEventListener) {
                script.addEventListener('load', function () {
                    callback();
                }, false);
            } else if (script.attachEvent) {
                script.attachEvent('onreadystatechange', function () {
                    var target = window.event.srcElement;
                    if (target.readyState == 'loaded') {
                        callback();
                    }
                });
            }
            head.appendChild(script);
        }

        loadScript('https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js', function () {
            // 加载完成以后的回调函数
            var clipboard = new ClipboardJS('.copy-button');
            clipboard.on('success', function (e) {
                if (e.trigger.innerText == '复制成功') {
                    e.trigger.innerText = '复制代码'
                    e.trigger.style.color = "#22222c"
                } else {
                    e.trigger.innerText = '复制成功'
                    e.trigger.style.color = "#9e9e9e"
                }
                e.clearSelection();
            });

            clipboard.on('error', function (e) {
                if (e.trigger.innerText == '复制失败') {
                    e.trigger.innerText = '复制代码'
                    e.trigger.style.color = "red"
                } else {
                    e.trigger.innerText = '复制失败'
                    e.trigger.style.color = "#9e9e9e"
                }
                e.clearSelection();
            });
        });
    }
})();

// onXXXX函数只能有一个，因此禁止在其他地方定义
window.onload = function () {
    // 添加动态带子
    var secScript = document.createElement("script");
    secScript.setAttribute("type", "text/javascript");
    secScript.setAttribute("src", "../../../../js/ribbon.js");
    document.body.insertBefore(secScript, document.body.lastChild);

}

// 添加反馈层页面的HTML
function writeMaskHTML() {
    document.write("    <div class=\"mask\"><\/div>");
    document.write("    <div id=\"loading\">");
    document.write("        <h2>Loading ···<\/h2><img src=\"..\/..\/..\/..\/svg\/loading.svg\">");
    document.write("    <\/div>");
    document.write("    <div id=\"feedback\">");
    document.write("        <div class=\"morph-shape\">");
    document.write("            <svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 560 280\"");
    document.write("                preserveAspectRatio=\"none\">");
    document.write("                <rect x=\"3\" y=\"3\" fill=\"none\" width=\"556\" height=\"276\" \/>");
    document.write("            <\/svg>");
    document.write("        <\/div>");
    document.write("        <div class=\"dialog-inner\">");
    document.write("            <h2>欢迎访问至简博客！<\/h2>");
    document.write("            <img>");
    document.write("            <div><button type=\"button\" class=\"feedback-close\">关闭<\/button><\/div>");
    document.write("        <\/div>");
    document.write("    <\/div>");
}
writeMaskHTML()
// 遮盖层的实现
const feedback = document.querySelector('#feedback');
const mask = document.querySelector(".mask");
// 反馈层函数
function Feedback(text, src) {
    feedback.classList.add('feedback-open');
    mask.classList.add('feedback-open');
    if (text) {
        feedback.querySelector('.dialog-inner h2').innerHTML = text;
    } else {
        feedback.querySelector('.dialog-inner h2').innerHTML = " ";
    }
    if (src) {
        feedback.querySelector('.dialog-inner img').src = src;
    } else {
        feedback.querySelector('.dialog-inner img').src = " ";
    }

    mask.addEventListener("click", function (e) { //点击灰色部位 反馈层消失
        feedback.classList.remove('feedback-open');
        mask.classList.remove('feedback-open');
    })

    feedback.querySelector('.feedback-close').addEventListener("click", function (e) { //点击按键 反馈层消失
        feedback.classList.remove('feedback-open');
        mask.classList.remove('feedback-open');
    })

}

// 对节点监听，节点被点击后会调用 遮盖层
function listToCallFeedback(element,txt,img_url) {
    if (element) {
        element.addEventListener("click", function (e) {
            Feedback(txt, img_url);
        })
    }
}


// 加载提示
const loading = document.querySelector('#loading');
var myLoading
function Loading() {
    myLoading = setTimeout(function () { //延时，加载快的话不必显示
        mask.classList.add('feedback-open');
        loading.classList.add('loading-open');
        mask.addEventListener("click", function (e) { //点击灰色部位 反馈层消失
            mask.classList.remove('feedback-open');
            loading.classList.remove('loading-open');
        })
    }, 500);
}

function LoadingClose() { //关闭加载提示
    clearTimeout(myLoading);
    mask.classList.remove('feedback-open');
    loading.classList.remove('loading-open');
}