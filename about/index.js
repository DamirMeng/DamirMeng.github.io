// 根据页面大小设置页面属性
if (window.screen.availWidth < 600) {
    //页面属性
    function loadApp() {

        // Create the flipbook

        $('.flipbook').turn({
            // Width

            width: (document.documentElement.clientWidth) * 0.92,

            // Height

            height: (document.documentElement.clientHeight) * 0.84,

            // Elevation

            elevation: 50,
            // Enable gradients

            gradients: true,

            // Auto center this flipbook

            autoCenter: true

        });
    }
    //加载文件
    yepnope({
        test: Modernizr.csstransforms,
        yep: ['js/turn.js'],
        nope: ['js/turn.html4.min.js'],
        both: ['css/index.css'],
        complete: loadApp
    });
} else {
    //页面属性
    function loadApp() {

        // Create the flipbook

        $('.flipbook').turn({
            // Width

            width: (document.documentElement.clientWidth) * 0.666,

            // Height

            height: (document.documentElement.clientHeight) * 0.86,

            // Elevation

            elevation: 50,

            // Enable gradients

            gradients: true,

            // Auto center this flipbook

            autoCenter: true

        });
    }
    //加载文件
    yepnope({
        test: Modernizr.csstransforms,
        yep: ['js/turn.js'],
        nope: ['js/turn.html4.min.js'],
        both: ['css/index.css'],
        complete: loadApp
    });


}
// 统计字数
String.prototype.byteLength = function () { //获取字符串的字节数，扩展string类型方法
    var b = 0;
    o = this.length; //初始化字节数递加变量并获取字符串参数的字符个数
    if (o) { //如果存在字符串，则执行计划
        for (var i = 0; i < o; i++) { //遍历字符串，枚举每个字符
            if (this.charCodeAt(i) > 255) { //字符编码大于255，说明是双字节字符
                b++; //则累加2个
            } else {
                b += 0.5; //否则递加一次
            }
        }
        return b; //返回字节数
    } else {
        return 0; //如果参数为空，则返回0个
    }
}
$(".flipbook").bind("first", function (event) {
    // alert("You are at the beginning of the flipbook");d第一页回调函数
    document.querySelector('.feedback_msg').style.display = "block"
    document.querySelector('.feedback_msg p').innerHTML = "已经到首页啦！"

    document.querySelector('.mask').style.display = "block"
    $(".mask").bind('click', function (e) {
        this.style.display = "none"
        document.querySelector('.feedback_msg').style.display = "none"
    })

});
$(".flipbook").bind("last", function (event) {
    // alert("You are at the end of the flipbook");最后一页回调函数
    document.querySelector('.feedback_msg').style.display = "block"
    document.querySelector('.feedback_msg p').innerHTML = "已经是最后一页啦！"

    document.querySelector('.mask').style.display = "block"
    $(".mask").bind('click', function (e) {
        this.style.display = "none"
        document.querySelector('.feedback_msg').style.display = "none"
    })

});
//键盘事件  换页
$(window).bind('keydown', function (e) {
    if (e.keyCode == 40 || e.keyCode == 39) { //下、右方向键
        $(".flipbook").turn("next"); //下一页
    }
    if (e.keyCode == 38 || e.keyCode == 37) { //上、左方向键
        $(".flipbook").turn("previous"); //上一页
    }
});
//　　　　AJAX设置
var First = 8
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var length = myObj.pages.length //pages的长度，即json页数
        createPages(length)
        var diary = $(".flipbook").children() //总的页数
        setFooter()
        setTop()
        setContents()
        createElements()
        setArticle()
        //生成日记页面的主载体div   class="flipbook"的子元素div
        function createPages(pageNumber) { //总的页数pageNumber
            pageNumber++
            if (pageNumber % 2 == 0) {
                pageNumber++ //保证最后一页可以合上
            }
            for (let index = 0; index < pageNumber; index++) { //在 class="last-page"前插入页面
                var element = document.querySelector('.flipbook')
                var div = document.createElement('div')
                element.insertBefore(div, document.querySelector('.last-page'));
            }
        }

        function setContents() {
            for (let index = 0; index < length; index++) {
                var number = document.querySelector('.list-number')
                var li = document.createElement('li') //date
                var li2 = document.createElement('li') //date
                number.appendChild(li2)
                document.querySelector('.contents-list').appendChild(li)
                var title = document.querySelector('.contents-list').querySelectorAll('li')[index + 1]
                var jsontitle = myObj.pages[index].title
                var jsondate = myObj.pages[index].date
                title.innerHTML = jsontitle + "（" + jsondate + "）"
                if (index < 9) {
                    number.querySelectorAll('li')[index + 1].innerHTML = "0" + (index + 1)
                } else {
                    number.querySelectorAll('li')[index + 1].innerHTML = (index + 1)
                }
            }
        }
        //设置下方页码div与class  为上方页眉的笔添加div与class   和list  待办事项
        function setFooter() {
            for (let index = First; index < First + length; index++) {
                const element = diary[index];
                var div = document.createElement('div') //页码
                var img1 = document.createElement('img') //切换按钮
                var img = document.createElement('img') //上面的🖊
                element.appendChild(img)
                element.appendChild(div)
                element.appendChild(img1)
                img.classList.add('title-image')
                div.classList.add('page-number')
                if (index % 2 == 0) {
                    img1.classList.add('change', 'change-right')
                    img1.src = "https://s3.ax1x.com/2020/11/18/DneSpV.png"
                } else {
                    img1.classList.add('change', 'change-left')
                    img1.src = "https://s3.ax1x.com/2020/11/18/DneSpV.png"
                }
                if (index > 0) {
                    document.querySelectorAll('.title-image')[index - First].src = "image/title.png"
                    if (index - First < 9) {
                        var u = index - First + 1
                        document.querySelectorAll('.page-number')[index - First].innerHTML = "0" + u
                    } else {
                        document.querySelectorAll('.page-number')[index - First].innerHTML = index - First + 1
                    }
                }
            }
        }
        //设置上方的date与tag的div、添加class  
        function setTop() {
            for (let index = First; index < First + length; index++) {
                const element = diary[index];
                var div = document.createElement('div') //date
                var div1 = document.createElement('div') //tag
                element.appendChild(div)
                element.appendChild(div1)
                div1.classList.add('tag')
                div.classList.add('date')
            }
            //为date和tag加载json数据
            for (let index = 0; index < length; index++) {
                const element = myObj.pages[index];
                if (element.date) {
                    var date = element.date
                    document.querySelectorAll('.date')[index].innerHTML = "Date：" + date
                }
                if (myObj.pages[index].tag) {
                    var tag = myObj.pages[index].tag
                    document.querySelectorAll('.tag')[index].innerHTML = "Tag：" + tag
                }

            }
        }

        function createElements() {
            for (let index = First; index < First + length; index++) { //每页都创建	<div class="content">
                const element = diary[index];
                var div = document.createElement('div')
                var div1 = document.createElement('ul')
                element.appendChild(div1)
                element.appendChild(div)
                div.classList.add('content')
                div1.classList.add('items')
            }
            var content = document.querySelectorAll('.content')
            for (let index = 0; index < content.length; index++) { //遍历每一个	<div class="content">
                var div1 = document.createElement('div')
                const element = content[index];
                element.appendChild(div1)
                div1.classList.add('daily-title')
            }
        }
        //遍历所有的pages      设置文章的内容
        function setArticle() {
            for (let index = 0; index < length; index++) {
                //获取json中content的段数
                var contents = myObj.pages[index].content.length
                //选择P元素的数组
                for (let i = 0; i < contents; i++) { //设置p的数量
                    var p = document.createElement('p')
                    document.querySelectorAll('.content')[index].appendChild(p)
                    p.classList.add('daily-content')
                    var title = document.querySelectorAll('.content')[index].querySelector('.daily-title')
                    if (myObj.pages[index].title) {
                        var jsontitle = myObj.pages[index].title
                        title.innerHTML = jsontitle
                    }
                    if (myObj.pages[index].content[i]) {
                        var paragraph = document.querySelectorAll('.content')[index].querySelectorAll('.daily-content')[i]
                        var jsonparagraph = myObj.pages[index].content[i]
                        paragraph.innerHTML = jsonparagraph
                    }

                }
            }

            // 遍历所有的pages    设置秘密secret
            for (let index = 0; index < length; index++) {
                //获取json中content的段数
                if (myObj.pages[index].secret) {
                    var secrets = myObj.pages[index].secret.length
                    // 设置secret（未完成）de 的内容
                    for (let i = 0; i < secrets; i++) { //设置li的数量
                        var p = document.createElement('p')
                        document.querySelectorAll('.items')[index].appendChild(p)
                        p.classList.add('secret')
                        var items_secret = document.querySelectorAll('.items')[index].querySelectorAll('.secret')[i]
                        var json_secret = myObj.pages[index].secret[i]
                        items_secret.innerHTML = json_secret
                    }
                }
            }
        }
        //扉页的设置
        document.querySelector('#articles-number').innerHTML = "日记篇数：" + myObj.pages.length + " 篇"
        document.querySelector('#page-count').innerHTML = "总页数：" + (myObj.pages.length + 10) + " 页"
        //获取总字数：
        var words = 0
        for (let index = 0; index < length; index++) {
            var ContentLength = myObj.pages[index].content.length
            for (let i = 0; i < ContentLength; i++) {
                const element = myObj.pages[index].content[i];
                words += (element.byteLength())
            }
        }
        words = parseInt(words)
        document.querySelector('#word-number').innerHTML = "总字数：" + words + " 字"
    }
};
xmlhttp.open("GET", "json/diary.json", true);
xmlhttp.send();
//切换页面
var change_index = 0
function setControl() {
    //切换按钮的设置
    $(document).on("click", ".change", function () {
        if (change_index % 2 == 0) {
            $(".content").css("display", "none");
            $(".items").css("display", "block");
            //可添加提示内容
        } else {
            $(".content").css("display", "block");
            $(".items").css("display", "none");
        }
        change_index++
    });
    // 改变QQ地址


    if (document.documentElement.clientWidth < 600) {

        document.querySelector('#qq').href = "mqqwpa://im/chat?chat_type=wpa&uin=790430354&version=1&src_type=web&web_src=oicqzone.com"
    }
    $(".flipbook").bind("end", function (event, pageObject, turned) { //翻页后回调函数
        $(".items").css("display", "none");
        $(".content").css("display", "block"); //优化换页后的页面
    });

    //目录设置
    $(document).on("click", ".contents-list", function () {
        var length2 = document.querySelector('.contents-list').querySelectorAll('li').length
        for (let index = 0; index < length2; index++) {
            var li = document.querySelector('.contents-list').querySelectorAll('li')[index]
            if ($(event.target).is($(li))) {
                if (index == 0) {
                    $(".flipbook").turn("page", 6)
                } else {
                    index += First
                    $(".flipbook").turn("page", index)
                }
            }
        }
    });
}
setControl()
var h = document.documentElement.clientHeight + "px"
$("#font-cover").css("height", h);
document.querySelector("#val").onchange = function () {
    if (window.screen.availWidth < 600) {

        $(".flipbook").turn("display", "single"); //单页展示


    } else {
        // $(".flipbook").turn("zoom", 1.5);
        $(".flipbook").turn("display", "double"); //单页展示

    }
    var password = "mdm"
    if (this.value == password) {
        $("#font-cover").css("display", "none")
    } else {
        this.value = ""
    }
}
$("#control").click(function () {
    // 动作触发后执行的代码!!
    switch ($(event.target)[0].id) {
        case "pre":
            $(".flipbook").turn("previous"); //上一页
            break;
        case "next":
            $(".flipbook").turn("next"); //下一页
            break;
        case "content":
            $(".flipbook").turn("page", 5); //跳转到首页
            break;
        case "home":
            window.location.href = "../";
            break;
        default:
    }
});