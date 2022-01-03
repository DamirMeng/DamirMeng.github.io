//原创内容
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var articles = JSON.parse(this.responseText).articles //例化
        //前面是HTML中的类名、后面是json中的classification
        setItems("myarticle", "我的文章")
        setItems("mymind", "思维导图")
        setItems("other", "其他")
        //转载
        setItems("essay", "散文")
        setItems("novel", "小说")
        setItems("poetry", "诗歌")
        setItems("classical", "文言文")
        setItems("mind", "思维导图")
        setItems("other_c", "其他")

        function setItems(classname, chinese) {
            classname = "." + classname
            //遍历json
            var index1 = 0
            for (let index = articles.length - 1; index >= 0; index--) {
                const element = articles[index];
                if (element.classification == chinese) {
                    index1++
                    var li = document.createElement("li");
                    li.setAttribute("class", "alarm_item bottom");
                    var a = document.createElement("a");
                    a.setAttribute("href", element.url);
                    li.appendChild(a)
                    var div1 = document.createElement("div");
                    div1.setAttribute("class", "time")
                    div1.innerHTML = element.time
                    a.appendChild(div1)
                    var div2 = document.createElement("div");
                    div2.setAttribute("class", "alarm_item_description")
                    div2.innerHTML = element.title + " — " + element.writer
                    a.appendChild(div2)
                    document.querySelector("" + classname + " ul").appendChild(li);
                }
            }
            document.querySelector("" + classname + " .card_description .number").innerHTML = index1 + "篇"
        }
    }
}
xmlhttp.open("GET", "../json/index.json", true);
xmlhttp.send();