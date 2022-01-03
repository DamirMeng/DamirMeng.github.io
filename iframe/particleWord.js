/**
 * demo.js
 * https://coidea.website
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, COIDEA
 * https://coidea.website
 */
var index = window.parent.document.querySelector("title").innerHTML.indexOf(" ");
var title = window.parent.document.querySelector("title").innerHTML.substring(0, index); //获取标题名称
var headline

function getByteLen(val) { //字节数
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) { //\x00-\xff→GBK双字节编码范围
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

if (self != top && getByteLen(title) <= 10) { //最多10个字
  headline = title;
} else if (window.parent.document.querySelectorAll(".mini .later")[1]) { //显示标签文字
  headline = window.parent.document.querySelectorAll(".mini .later")[1].innerHTML;
} else {
  headline = "至简博客";
}

var canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = {
    x: -9999,
    y: -9999
  },
  radius = 1,
  colors = [ //粒子颜色
    "#F44336",
    "##FF5722",
    "#00CCFF",
    "#006699",
    "#FF5722"
  ],


  ww = window.innerWidth,
  wh = window.innerHeight;

function Particle(x, y) {

  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y
  };
  this.r = Math.random() * 2 * Math.PI; //粒子大小
  // this.r = 2 * Math.PI;//粒子大小
  this.vx = (Math.random() - 0.5) * 25;
  this.vy = (Math.random() - 0.5) * 25; //形成时的动作
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.025 + 0.94;
  // this.color = colors[Math.floor(Math.random() * colors.length)];
  this.color = "#" + Math.round(Math.random() * 0x1000000).toString(16);//随机颜色
}

Particle.prototype.render = function () {

  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;
  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < (radius * 75)) {

    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
}


function initScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //清除画布
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
  var amount2 = 200;
  ctx.textAlign = "center"; //文字的位置
  if (ww < 600) {
    amount2 = 200;
    ctx.font = '100 18vw "Serif"'; //文字样式
    ctx.fillText(headline, ww / 2, wh / 2); //被填充的文本及其位置

  } else {
    amount2 = 200;
    ctx.font = '400 14vw "Serif"'; //文字样式
    ctx.fillText(headline, ww / 2, wh / 1.2); //被填充的文本及其位置

  }


  var data = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for (var i = 0; i < ww; i += Math.round(ww / amount2)) {
    for (var j = 0; j < wh; j += Math.round(ww / amount2)) {
      if (data[((i + j * ww) * 4) + 3] > amount2) {

        particles.push(new Particle(i, j));
      }
    }
  }
  amount = particles.length;
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {

    particles[i].render();
  }
}

function onMouseMove(e) {

  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onMouseout(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function onTouchMove(e) {

  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseout", onMouseout);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);