/*！ 作用：
 *Aplayer播放器的配置与音乐加载
 */
var iframe = document.querySelector("#iframe")

//配置音乐播放器属性  new 一个播放器
window.ap = new APlayer({
    container: document.querySelector('#aplayer'),
    //  mini: true,
    fixed: true, //位置
    lrcType: 1, //歌词类型
    autoplay: false, //自动播放
});

// 通过id获取网易云歌曲的信息并添加到Aplayer歌单中通过id获得summary
function setMusic(id) { //形参为含有id的url  将网易云数据加载到网页中
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); //获得字符串形式的响应数据。data内含有所有数据
            ap.list.add([{
                name: data.songs[0].name, //歌曲名
                artist: data.songs[0].artists[0], //艺术家
                url: data.songs[0].url, //歌曲链接
                cover: data.songs[0].album.picture, //封面图片链接
                lrc: data.songs[0].lyric.base, //歌词
            }]);
        }
    }
    xhr.open('get', id);
    xhr.send();
}
// 入口函数
function getMusicId(name) { //形参为含有歌名的url
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); //获得字符串形式的响应数据。
            var id = data.result.songs[0].id; //通过搜索获取id
            var url_id = "https://v1.hitokoto.cn/nm/summary/" + id + "?common=true&lyric=true&quick=true" //改造id的HTTP格式
            setMusic(url_id);
        }
    }
    xhr.open('get', name, true); //name为搜索的歌曲的url
    xhr.send();
}
// 播放器设置与配置
function addMusic(params) {
    var songs = new Array( //歌曲列表  歌单
        "空",
        "sold out",
        "海阔天空",
        "boom",
        "平凡天使",
        "shake that",
        "像我这样的人",
        "bad gud",
        "rap god",
        "侧脸",
        "evolve",
        "只要平凡",
        "洋葱"
    )
    for (let index = 0; index < songs.length; index++) { //用for一次加载一首歌
        var name_url = "https://v1.hitokoto.cn/nm/search/" + songs[index] + "?type=SONG&offset=0&limit=1" //搜索歌曲  limit：歌曲数量
        getMusicId(name_url);
    }
    // 监听iframe的点击事件  make Aplayer go to  mini mode
    document.querySelector("#iframe").contentDocument.addEventListener("click", function (e) {
        ap.list.show()
        ap.setMode("mini")
    })
}
var isFirst = true;

function loadIframe(params) {
    if (isFirst) {
        // setTimeout("addMusic();", "0"); //2000毫秒后执行test()函数，只执行一次。
        addMusic();
        isFirst = false
    }
    document.querySelector(".aplayer-miniswitcher").addEventListener("click", function (e) {
        if (ap.audio.paused) {
            document.querySelector(".aplayer-body").style.left = "0px"
        }
    })

    //歌曲暂停和播放的设置
    ap.on('pause', function () {
        ap.setMode("mini") //
        ap.lrc.hide() //歌词设置
        document.querySelector(".aplayer-body").style.left = "-66px" //位置响应
    });
    ap.on('play', function () {
        ap.lrc.show()
        document.querySelector(".aplayer-body").style.left = "0px"
    })

    // 监听iframe的点击事件  make Aplayer go to  mini mode
    document.querySelector("#iframe").contentDocument.addEventListener("click", function (e) {
        ap.list.show()
        ap.setMode("mini")
    })
    document.querySelector("#iframe").contentDocument.addEventListener("scroll", function (e) {
        ap.list.show()
        ap.setMode("mini")
    })

    //移动端
    document.querySelector("#iframe").contentWindow.addEventListener("touchstart", function () {
        ap.setMode("mini")
        document.querySelector(".aplayer-body").style.left = "-66px" //位置响应
    })
    if (ap.audio.paused) {
        ap.lrc.hide() //优化、某些播放器不允许自动播放
    }

}
iframe.addEventListener("load", loadIframe); //加载完成再添加