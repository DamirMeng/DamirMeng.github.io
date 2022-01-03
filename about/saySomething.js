var xmlhttp = new XMLHttpRequest()
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.querySelector("#container").setAttribute("value", "48")
        var saying = JSON.parse(this.responseText).saying //例化
        saying = saying.sort(function (a, b) { //按时间排序  整个对象已经排序
            return Date.parse(b.date) - Date.parse(a.date); //时间正序
        });
        var year = 0
        for (let index = 0; index < saying.length; index++) {
            const element = saying[index];
            if (year != element.date.replace(/[^0-9]/ig, "").substring(0, 4)) { //添加年
                var li = document.querySelector(".entry:not(.period)").cloneNode(true)
                li.classList.add("period")
                li.querySelector(".title div").classList.add("contents")
                li.querySelector(".title div").innerText = element.date.replace(/[^0-9]/ig, "").substring(0, 4)
                li.querySelector(".body a").innerText = " "
                li.querySelector(".title a").innerText = " "
                document.querySelector(".timeline").appendChild(li)
                year = element.date.replace(/[^0-9]/ig, "").substring(0, 4)
            }
            var li = document.querySelector(".entry:not(.period)").cloneNode(true)
            if (element.date) {
                li.querySelector(".title div").innerText = element.date
            } else {
                li.querySelector(".title div").innerText = " "
            }
            if (element.location) {
                li.querySelector(".title a").innerText = element.location
            } else {
                li.querySelector(".title a").innerText = " "
            }
            li.querySelector(".body a").innerText = element.content
            document.querySelector(".timeline").appendChild(li)
        }
        addLeftList()
    };
}
xmlhttp.open("GET", "../../../../json/saySomething.json", true);
xmlhttp.send();