//首页显示文章列表的js文件、文章列表包括原创文章、原创技术文章、转载文章、转载技术文章、全部文章五种 
/*
    会根据锚点来添加不同的json文件
    会根据列表上部分的按钮来加载json
    会根据pc端菜单或移动端菜单来加载加载json
    *加载主页和sentence的内容AJAX　　
    * 即异步加载json的数据到HTMl中
    *json数据将会随页码变化  网页不跳转
    *<li>将在HTML中设置  这里不再设置  要十个
    *文件只有一个函数
    调用方法：
    *调用函数：getArticleData(file_name)
    *参数：file_name为json文件名（带json后缀）
    
    更多：
    *卡片数量可以动态更改：
    *修改per_page_amount即可
    说明：
    *所有的HTML节点都是HTML文件自带的
 */

function getArticleData(file_name) { //file_name为要加载的json文件名  需要在相应的HTML中调用
    // window.parent.Loading(); //显示加载特效
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var articles = JSON.parse(this.responseText); //例化
            articles.sort(function (a, b) { //按时间排序  整个对象已经排序
                return Date.parse(b.日期) - Date.parse(a.日期); //时间正序
            });
            var indexOfDisplayed = 0;//已显示的文章数量
            var per_page_amount = 10; //每次加载的数量  
            var top = new Array; //存储top的序号
            var art = new Array; //存储没有top的所有序号
            // 处理“加载更多”按钮
            var more_button = document.querySelector('.load-more');
            more_button.classList.remove("not-more");
            more_button.innerHTML = "加载更多";
            // 提取文章
            for (let index = 0; index < articles.length; index++) {
                if (articles[index].置顶 == true) { //用数组来取序号
                    top.push(index); //置顶文章
                } else {
                    art.push(index); //未置顶的文章
                }
            }
            var articlesHTML = document.querySelectorAll("#article_ul li");//卡片
            // 删除多余的节点
            for (let index = 1; index < articlesHTML.length; index++) {
                const element = articlesHTML[index];
                element.remove();
            }

            // 设置单个卡片的html
            function setHtmlCard(element, content) {
                element.querySelector("span a img").src = content.图片链接; //图片链接src用于图片显示
                element.querySelector(".blogtitle a").innerHTML = content.标题; //标题
                element.querySelector(".blogtitle a").href = content.文章链接; //标题的目的链接
                element.querySelector(".bloginfo p").innerHTML = content.简介; //文章简介
                element.querySelector(".lm a").innerHTML = content.标签; //标签
                element.querySelector(".lm a").href = '../../../../about/search.html' + '#' + content.标签;
                element.querySelector(".dtime a").innerHTML = content.日期; //发表时间
                element.querySelector(".dtime a").href = '../../../../about/search.html' + '#' + content.日期;
                element.querySelector(".writer a").innerHTML = content.作者; //作者
                element.querySelector(".writer a").href = '../../../../about/search.html' + '#' + content.作者;
            }
            // 点击加载更多按钮
            document.querySelector(".load-more").addEventListener("click", function (e) {
                // 点击后进行克隆
                for (let index = 0; index < per_page_amount; index++) {
                    if (indexOfDisplayed + top.length > articles.length - 1) {
                        more_button.innerHTML = "———— 没有更多文章了！————";
                        more_button.classList.add("not-more");
                        break;
                    }
                    i = art[indexOfDisplayed++];
                    var li = document.querySelectorAll("#article_ul li")[per_page_amount - 1].cloneNode(true);
                    setHtmlCard(li, articles[i]);
                    document.querySelector("#article_ul").appendChild(li);
                }
            })
            // ==================HTML的设置函数

            // 设置置顶文章
            for (let index = 0; index < top.length; index++) {
                var i = top[index];
                if (index == 0) {
                    element = document.querySelector("#article_ul li");
                    element.querySelector(".isTop-div").classList.add("isTop-ribbon"); //添加左上角置顶标志
                    setHtmlCard(element, articles[i]);
                    continue;
                }
                var li = document.querySelector("#article_ul li").cloneNode(true);
                setHtmlCard(li, articles[i]);
                document.querySelector("#article_ul").appendChild(li);
            }
            // 其他文章
            for (let index = top.length; index < per_page_amount; index++) {

                var i = art[indexOfDisplayed++];
                var li = document.querySelector("#article_ul li").cloneNode(true);
                setHtmlCard(li, articles[i]);
                document.querySelector("#article_ul").appendChild(li);
                if (li.querySelector(".isTop-div")) {
                    li.querySelector(".isTop-div").classList.remove("isTop-ribbon");
                }
            }
            // window.parent.LoadingClose(); //关闭
        }
    }
    xmlhttp.open("GET", file_name, true);
    xmlhttp.send();
}

function switchContent(buttonString) {//显示文章的切换
    for (let index = 0; index < topItems.length; index++) {
        topItems[index].classList.remove("active");
    }
    switch (buttonString) {
        case secondMenuStr[1][0][0]:
        case "article":
            getArticleData("json/转载文章.json"); //展示转载的文章
            topItems[1].classList.add("active"); //按钮添加active
            break;

        case secondMenuStr[2][0][0]:
        case "myArticle":
            getArticleData("json/我的文章.json");
            topItems[2].classList.add("active");
            break;

        default:
            getArticleData("json/全部文章.json");
            topItems[0].classList.add("active");
            break;
    }
    document.documentElement.scrollTop = window.innerHeight - 60;//直接滚到下面
}

const topItems = document.querySelectorAll(".top-items li");
//secondMenuStr是nav.js中定义的标题名称
// 设置标题名称
topItems[0].textContent = "全部文章";
topItems[1].textContent = secondMenuStr[1][0][0];
topItems[2].textContent = secondMenuStr[2][0][0];
(function () { //根据跳转时的锚点来响应展示的内容
    var text = decodeURI(document.location.hash.substring(1));//获取锚点文本
    switchContent(text);

    //文章列表上面的按钮的点击事件，显示效果、点击哪个就active哪个
    if (document.querySelector(".top-items")) {
        document.querySelector(".top-items").addEventListener("click", function (e) {
            switchContent(e.target.innerHTML);
        });
    }
})();

(function () { //监听菜单来动态加载json、不必判断移动端还是pc，因为菜单是动态加载的pc、移动端只存在其一
    //移动端菜单点击 响应
    // secondMenuStr在nav.js中定义
    const mobileNav = document.querySelector(".mobile-navbar")
    if (mobileNav) {
        mobileNav.addEventListener("click", function (e) {
            var target = e.target.textContent;
            switchContent(target);

            if (target == secondMenuStr[1][0][0] || target == secondMenuStr[1][0][1] || target == secondMenuStr[2][0][0] || target == secondMenuStr[2][0][1]) {
                if (document.querySelector(".menubar").classList.contains('arrow')) {
                    document.querySelector(".menubar").classList.remove("arrow");
                    document.querySelector(".nav-container").style.display = "none";
                } else {
                    document.querySelector(".menubar").classList.add("arrow");
                    document.querySelector(".nav-container").style.display = "block";
                }
            }
        });
    }
    //pc菜单点击 响应
    const reprint = document.querySelector(".nav-list")
    if (reprint) {
        reprint.addEventListener("click", function (e) {
            var target = e.target.textContent;
            switchContent(target);
        });
    }

})();

(function () { //文章列表上面的按钮、首页向下箭头
    //首页向下箭头
    document.querySelector(".top_svg").style.height = window.innerHeight + "px";
    document.querySelector("#headerDown").addEventListener("click", function (e) {
        document.documentElement.scrollTop = window.innerHeight - 60;
    });
})();