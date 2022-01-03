// 用来存储一些废弃的或者重要的函数  可以看成是个函数库
function addMusic(data) {
    player.list.add([{
        theme: '#2196f3',
        name: data.songs[0].name,
        artist: data.songs[0].artists[0],
        url: data.songs[0].url,
        cover: data.songs[0].album.picture,
        lrc: data.songs[0].lyric.base,
    }]);
}
// addMusic()
function aplayer() { //配置音乐播放器属性
    window.player = new APlayer({
        theme: '#e9e9e9',
        container: document.querySelector('#aplayer'),
        fixed: true,
        lrcType: 1,
        autoplay: true,
    });
}
aplayer();
// aplayer0();

function getYiyan(nth_li) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); //获得字符串形式的响应数据。
            document.querySelectorAll("#columns li")[nth_li].querySelector("p").innerHTML = data.hitokoto
            document.querySelectorAll("#columns li")[nth_li].querySelectorAll("p")[1].innerHTML = "————《" + data.from + "》"
        }
    }
    xhr.open('get', " https://international.v1.hitokoto.cn/?c=b");
    xhr.send();
}

function setMusic(id) { //形参为含有id的url

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); //获得字符串形式的响应数据。data内含有所有数据
            // addMusic(data);
            player.list.add([{
                theme: '#2196f3',
                name: data.songs[0].name,
                artist: data.songs[0].artists[0],
                url: data.songs[0].url,
                cover: data.songs[0].album.picture,
                lrc: data.songs[0].lyric.base,
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
            var url_id = "https://v1.hitokoto.cn/nm/summary/" + id + "?common=true&lyric=true&quick=true"
            setMusic(url_id);
        }

    }
    xhr.open('get', name, false); //name为搜索的歌曲的url
    xhr.send();
}
var songs =  new Array() //歌曲名
songs[0]="海阔天空"
songs[1]="sold out"
songs[2]="空"
songs[3]="boom"
songs[4]="平凡天使"
songs[5]="shake that"
for (let index = 0; index < songs.length; index++) {
    const element = songs[index];
    var name_url = "https://v1.hitokoto.cn/nm/search/" + element + "?type=SONG&offset=0&limit=1" //搜索歌曲  limit：歌曲数量
    getMusicId(name_url);
}
// 遮盖层反馈函数
function Mask(tips_text) {
    document.querySelector('.feedback_msg').style.display = "block"
    document.querySelector('.feedback_msg p').innerHTML = tips_text
    document.querySelector('.mask').style.display = "block"
    $(".mask").bind('click', function (e) {
        this.style.display = "none"
        document.querySelector('.feedback_msg').style.display = "none"
    })
}