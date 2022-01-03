

// 封装Ajax加载函数  形参为加载的json文件名
function getSentenceData(file_name) {
    //============================= 加载内容AJAX
  // 名人名言
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var sentence = JSON.parse(this.responseText).sentence
          var per_page_amount = 20 //决定每页卡片数量
          var nth_page = 0 //第几页
          setCardHTML(0);
          document.querySelector(".pagination").addEventListener("click", function (e) {
              for (let index = 0; index < document.querySelectorAll('.pagination li').length; index++) {
                  document.querySelectorAll(".pagination li")[index].classList.remove("active")
                  if (document.querySelectorAll(".pagination li")[index] == e.target.parentElement || document.querySelectorAll(".pagination li")[index] == e.target.parentElement.parentElement) {
                      if (index == 0) {
                          nth_page = 0
                      } else if (index == document.querySelectorAll('.pagination li').length - 1) {
                          nth_page = document.querySelectorAll('.pagination li').length - 3
                      } else {
                          nth_page = index - 1
                      }
                  }
              }
              document.querySelectorAll(".pagination li")[nth_page + 1].classList.add("active") //显示是第几页
              //清空li元素
              var child = document.querySelector("#columns").lastElementChild;
              while (child) {
                  document.querySelector("#columns").removeChild(child);
                  child = document.querySelector("#columns").lastElementChild;
              }
              setCardHTML(nth_page);
              //清空空的li元素
          })
  
          function setCardHTML(nth_page) {
              // var start_card = per_page_amount * nth_page //该页起始的序号
              var start_card = sentence.length-1-per_page_amount * nth_page //该页起始的序号
  
              if (sentence.length - per_page_amount * nth_page < per_page_amount) { //优化  防止下标越界
                  li_amount = sentence.length - per_page_amount * nth_page
              } else {
                  li_amount = per_page_amount
              }
              // 生成li
              for (let index = 0; index < li_amount; index++) {
                  var li = document.createElement('li')
                  document.querySelector('#columns').appendChild(li)
              }
              var sentenceHtml = document.querySelectorAll("#columns li") //生成后再遍历
              for (let nth_card = start_card; nth_card > start_card - li_amount; nth_card--) { //遍历所有的sentence数组
                  //nth_card是json中的序号
                  var nth_li =  start_card-nth_card  //nth_li是HTML的序号
                  // 添加img
                  if (sentence[nth_card].img_url) {
                      var img = document.createElement('img')
                      document.querySelectorAll('#columns li')[nth_li].appendChild(img)
                      document.querySelectorAll('#columns li')[nth_li].querySelector("img").src = sentence[nth_card].img_url
                  }
                  var content_length = sentence[nth_card].content.length
                  for (let index = 0; index < content_length + 1; index++) {
                      //每个li添加对应数量的p元素
                      var p = document.createElement('p')
                      document.querySelectorAll('#columns li')[nth_li].appendChild(p)
                  }
                  for (let nth_para = 0; nth_para < content_length; nth_para++) { //遍历content
                      sentenceHtml[nth_li].querySelectorAll("p")[nth_para].innerHTML = sentence[nth_card].content[nth_para]
                  }
                  //作家
                  sentenceHtml[nth_li].querySelector("p:last-child").innerHTML = "———— " + sentence[nth_card].writer
              }
          }
      }
  }
  xmlhttp.open("GET",file_name , true);
  xmlhttp.send();
  }