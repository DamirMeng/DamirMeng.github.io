/*
 *PC、移动端菜单栏的显示与事件绑定等
 */
function writePCNav() {
    document.write(" <div class='tabbed round'>");
    document.write("<a href=\"..\/..\/..\/..\/\" class=\"logo\">");
    document.write("    <img src=\"https:\/\/s3.ax1x.com\/2020\/11\/18\/DneSpV.png\" class=\"logo-img\">");
    document.write("    <span class=\"logo-text\">至简博客<\/span>");
    document.write("<\/a>");
    document.write("        <ul class=\"nav-list\">");
    document.write("            <li><a><\/a><\/li>");
    document.write("        <\/ul>");
    document.write("        <h1 class=\"t_nav\"><span id=\"hitokoto\">生如逆旅，一苇以航！<\/span><\/h1>");
    document.write(" <\/div");
}

function writeMobileTopBar() {
    document.write("<div id=\"top-menu\">");
    document.write("			<div class=\"menubar\">");
    document.write("				<svg>");
    document.write("					<path class=\"line--1\" d=\"M0 40h62c18 0 18-20-17 5L31 55\"><\/path>");
    document.write("					<path class=\"line--2\" d=\"M0 50h80\"><\/path>");
    document.write("					<path class=\"line--3\" d=\"M0 60h62c18 0 18 20-17-5L31 45\"><\/path>");
    document.write("				<\/svg>");
    document.write("			<\/div>");
    document.write("			<div class=\"top-title\">");
    document.write("				<div><a href=\"..\/..\/..\/..\/\" class=\"logo\"> <img src=\"https:\/\/s3.ax1x.com\/2020\/11\/18\/DneSpV.png\" class=\"logo-img\"><\/a><\/div>");
    document.write("			<\/div>");
    document.write("<a href=\"..\/..\/..\/..\/about\/search.html\"><span class=\"search-button\"><\/span><\/a>");
    document.write("		<\/div>");
}

function writeMobileNav() {
    document.write("<div class=\"nav-container\">");
    document.write("		<div class=\"mobile-navbar\">");
    document.write("			<ul>");
    document.write("				<li><a><\/a><\/li>");
    document.write("			<\/ul>");
    document.write("			<h1 class=\"t_nav\"><span id=\"hitokoto\">爱欲于人，犹如执炬，逆风而行，必有烧手之患<\/span><\/h1>");
    document.write("		<\/div>");
    document.write("<\/div>");
}

var width = document.documentElement.clientWidth;
var container = document.querySelector('#container');

// 导航栏菜单信息
var secondMenuStr = [
    //** ------------------------一级菜单--------------
    [
        [ //导航栏一级文字
            "首页",
            "知海拾贝",
            "我的原创",
            "查找文章",
            "关于",
            "发现更多"
        ],
        [ //导航栏一级链接 
            "../../../../homePage.html",
            "javascript:void(0);",
            "javascript:void(0);",
            "../../../../about/search.html",
            "../../../../about",
            "javascript:void(0);"
        ]
    ],
    //** ------------------------二级菜单--------------
    [
        // 第二个
        [
            "经典文章",
            "技术文章",
            "美句收录"
        ],
        [ //链接
            "../../../../homePage.html#article",
            "../../../../homePage.html#knowledge",
            "../../../../sentence"
        ]
    ],
    [
        // 第三个
        [
            "传统文章",
            "技术",
            "个人句子",
            "我的说说"
        ],
        [ //链接
            "../../../../homePage.html#myArticle",
            "../../../../homePage.html#myKnowledge",
            "../../../../sentence/mySentence.html",
            "../../../../about/saySomething.html"
        ]

    ],
    [
        [
            "分类",
            "标签",
            "存档",
            "搜索"
        ],
        [
            "../../../../about/classification.html",
            "../../../../about/tags.html",
            "../../../../about/file.html",
            "../../../../about/search.html#我的",
        ]

    ],
    [
        [
            "关于本站",
            "更新日志",
            // "本站统计",
            "本站概述",
            "留言板"
        ],
        [
            "../../../../about",
            "../../../../about/timeline.html",
            // "https://tongji.baidu.com/web/welcome/ico?s=dfb2e9af2c4ea3536c96e73ddb3dc6b8",
            "../../../../about/summary.html",
            "../../../../about/guestbook.html"
        ]

    ],
    [
        [
            "首个网站",
            "每日明记",
            "计时器",
            "投资计算器",
            "ETF投资计算器",
        ],
        [
            "https://damirmeng.github.io/oldBlog",
            "../../../../diary",
            "../../../../tools/timer",
            "../../../../tools/calculator/iCalculator.html",
            "../../../../tools/calculator/ETFCalculator.html",
        ]
    ]

]

function setNav() { //导航栏设置

    if (width < 1200) { //移动端菜单栏
        writeMobileNav();
        writeMobileTopBar();

        secondMenuStr[0][1] = [ //一级菜单链接优化，防止点击打不开按钮 
            "../../../../homePage.html",
            "javascript:void(0);",
            "javascript:void(0);",
            "javascript:void(0);",
            "javascript:void(0);",
            "javascript:void(0);"
        ]

        // 添加一级目录
        var mobileNavbar = document.querySelectorAll(".mobile-navbar ul li")
        for (let index = 0; mobileNavbar.length < secondMenuStr[0][0].length; index++) { //为每个一级目录设置文字与链接
            if (index == 0) { //第一个设置
                mobileNavbar[0].querySelector("a").innerHTML = secondMenuStr[0][0][index]
                mobileNavbar[0].querySelector("a").href = secondMenuStr[0][1][index]
            } else { //其他克隆
                var li = mobileNavbar[0].cloneNode(true);
                li.querySelector("a").innerHTML = secondMenuStr[0][0][index]
                li.querySelector("a").href = secondMenuStr[0][1][index]
                document.querySelector(".mobile-navbar ul").appendChild(li);
            }
            mobileNavbar = document.querySelectorAll(".mobile-navbar ul li")
        }

        // 从第2个一级菜单开始的展开页（二级菜单），第一个为首页，不设置
        for (let index = 1; index < secondMenuStr.length; index++) {
            const element = secondMenuStr[index];
            var ul = document.querySelector(".mobile-navbar ul")
            var article_li = ul.children[index]
            var ul2 = document.createElement("ul");
            ul2.setAttribute("class", "second-menu")
            for (let index = 0; index < element[0].length; index++) {
                var a = document.createElement("a");
                a.innerHTML = element[0][index]
                a.href = element[1][index]
                var li1 = document.createElement("li");
                li1.appendChild(a)
                ul2.appendChild(li1)
            }
            article_li.appendChild(ul2)
        }

        // 监听菜单键，点击动画
        document.querySelector(".menubar").addEventListener("click", function () {
            // 手机端菜单键点击后执行的函数
            if (document.querySelector(".menubar").classList.contains('arrow')) {
                document.querySelector(".menubar").classList.remove("arrow");
                document.querySelector(".nav-container").style.display = "none";
            } else {
                document.querySelector(".menubar").classList.add("arrow");
                document.querySelector(".nav-container").style.display = "block";
            }
        })

        //移动端一级菜单点击展开二级菜单
        window.onload = function (params) {
            var navButton = document.querySelectorAll('.mobile-navbar li');
            for (let index = 1; index < navButton.length; index++) {
                const element = navButton[index];
                element.addEventListener("click", function (e) {
                    if (this.classList.contains('second-menu-open') == true) { //如果已经展开
                        this.classList.remove("second-menu-open") //关闭
                    } else { //如果没展开
                        this.classList.add("second-menu-open") //展开点击的地方
                    }
                    for (var j = 1; j < navButton.length; j++) { //把其他的关闭
                        if (navButton[j] != this) {
                            navButton[j].classList.remove("second-menu-open")
                        }
                    }
                })

            }
        }
    } else { //PC端导航栏

        //设置导航栏HTML 
        writePCNav();

        // 添加一级目录
        var tabbed = document.querySelectorAll(".tabbed ul li");
        for (let index = 0; tabbed.length < secondMenuStr[0][0].length; index++) { //为每个一级目录设置文字与链接
            if (index == 0) { //第一个设置
                tabbed[0].querySelector("a").innerHTML = secondMenuStr[0][0][index]
                tabbed[0].querySelector("a").href = secondMenuStr[0][1][index]
            } else { //其他克隆
                var li = tabbed[0].cloneNode(true);
                li.querySelector("a").innerHTML = secondMenuStr[0][0][index]
                li.querySelector("a").href = secondMenuStr[0][1][index]
                document.querySelector(".tabbed ul").appendChild(li);
            }
            tabbed = document.querySelectorAll(".tabbed ul li"); //更新
        }

        // 从第2个一级菜单开始的展开页（二级菜单），第一个为首页，不设置
        for (let index = 1; index < secondMenuStr.length; index++) {
            const element = secondMenuStr[index];
            var ul = document.querySelector(".tabbed ul")
            var article_li = ul.children[index]
            var ul2 = document.createElement("ul");
            ul2.setAttribute("class", "ul_c")
            for (let index = 0; index < element[0].length; index++) {
                var a = document.createElement("a");
                a.innerHTML = element[0][index]
                a.href = element[1][index]
                var li1 = document.createElement("li");
                li1.appendChild(a)
                ul2.appendChild(li1)
            }
            article_li.appendChild(ul2)
        }

        window.addEventListener("scroll", function (e) { //pc导航栏背景
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            const tabbed = document.querySelector('.tabbed');
            if (tabbed) { // 目录栏响应
                if (scrollTop > 100) { //防止移动端出现
                    tabbed.classList.add("tabbed-bg")
                } else {
                    tabbed.classList.remove("tabbed-bg")
                }
            }

        })
    }
};

setNav();