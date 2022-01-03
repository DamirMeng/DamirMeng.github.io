var xmlhttp = new XMLHttpRequest()
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.querySelector("#container").setAttribute("value", "48")
        var articles = JSON.parse(this.responseText).articles //例化
        articles = articles.sort(function (a, b) { //按时间排序  整个对象已经排序
            return Date.parse(b.time) - Date.parse(a.time); //时间正序
        });
        var year = 0
        var Month = 0
        for (let index = 0; index < articles.length; index++) {
            const element = articles[index];
            if (year != element.time.replace(/[^0-9]/ig, "").substring(0, 4)) {//添加年
                var li = document.querySelector(".entry:not(.period)").cloneNode(true)
                li.classList.add("period")
                li.querySelector(".title div").classList.add("contents")
                li.querySelector(".title div").innerHTML = element.time.replace(/[^0-9]/ig, "").substring(0, 4)
                li.querySelector(".title a").innerHTML = " "
                li.querySelector(".body a").innerHTML = " "
                document.querySelector(".timeline").appendChild(li)
                year = element.time.replace(/[^0-9]/ig, "").substring(0, 4)
            }
            if (Month != element.time.replace(/[^0-9]/ig, "").substring(0, 6)) {//添加月
                var li = document.querySelector(".entry:not(.period)").cloneNode(true)
                Month = element.time.replace(/[^0-9]/ig, "").substring(0, 6)
                li.classList.add("period")
                li.querySelector(".title div").classList.add("contents")
                li.querySelector(".title div").innerHTML = Month.substring(0, 4) + "年" + Month.substring(4, 6) + "月"
                li.querySelector(".title a").innerHTML = " "
                li.querySelector(".body a").innerHTML = " "
                document.querySelector(".timeline").appendChild(li)
            }
            var li = document.querySelector(".entry:not(.period)").cloneNode(true)
            li.querySelector(".title div").innerHTML = element.time
            li.querySelector(".body a").innerHTML = element.title
            li.querySelector(".body a").href = element.url
            li.querySelector(".title a").innerHTML = element.writer
            li.querySelector(".title a").href="../../../../about/search.html#"+element.writer
            document.querySelector(".timeline").appendChild(li)
        }
        addLeftList()
    };
}
xmlhttp.open("GET", "../../../../json/index.json", true);
xmlhttp.send();
