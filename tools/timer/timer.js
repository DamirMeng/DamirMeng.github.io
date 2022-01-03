// 闹钟声音

var alarmSound = new Audio('ring.mp3');
alarmSound.volume = 1;
var timerSounds = false,
    timerTime = 0, // Time set on the interval.
    timerInterval = 0, // The interval for our loop.
    timerClock = $(".container.timer").find(".clock"), //时间显示
    timerInputHour = $('#timer-input-hour'), //输入的小时
    timerInputMinute = $('#timer-input-minute'), //输入的分钟
    timerInputSecond = $('#timer-input-second'), //输入的秒
    timerSoundsButton = $('#timer-sounds'), //声音按钮
    hours = 0,
    minutes = 0,
    seconds = 0;
// 默认25分钟
minutes = timerInputMinute.val().trim();
timerTime = (hours * 60 * 60 + minutes * 60) * 100 + seconds * 100;
$('#myProgress')[0].max = $('#myProgress')[0].value = timerTime;
timerClock.text(returnAllTime(timerTime));
// 当输入新的时间时,显示新的时间。
timerInputHour.on('change', function () {
    hours = timerInputHour.val().trim();
    if (hours < 0) {
        timerInputHour.val(4);
        hours = timerInputHour.val().trim();
    }
    if (hours > 59) {
        timerInputHour.val(0);
        hours = timerInputHour.val().trim();
    }
    timerTime = (hours * 60 * 60 + minutes * 60) * 100 + seconds * 100;
    $('#myProgress')[0].max = $('#myProgress')[0].value = timerTime;
    timerClock.text(returnAllTime(timerTime));
});
// 分
timerInputMinute.on('change', function () {
    minutes = timerInputMinute.val().trim();
    if (minutes < 0) {
        timerInputMinute.val(59);
        minutes = timerInputMinute.val().trim();
    }
    if (minutes > 59) {
        timerInputMinute.val(0);
        minutes = timerInputMinute.val().trim();
    };
    timerTime = (hours * 60 * 60 + minutes * 60) * 100 + seconds * 100;
    $('#myProgress')[0].max = $('#myProgress')[0].value = timerTime;
    timerClock.text(returnAllTime(timerTime));
});
// 秒
timerInputSecond.on('change', function () {
    seconds = timerInputSecond.val().trim();
    if (seconds < 0) {
        timerInputSecond.val(59);
        seconds = timerInputSecond.val().trim();
    }
    if (seconds > 59) {
        timerInputSecond.val(0);
        seconds = timerInputSecond.val().trim();
    }
    timerTime = (hours * 60 * 60 + minutes * 60) * 100 + seconds * 100;
    $('#myProgress')[0].max = $('#myProgress')[0].value = timerTime;
    timerClock.text(returnAllTime(timerTime));
});
// 返回时间格式
function returnAllTime(time) { //
    var milliseconds = Math.floor((time % 100)),
        second = Math.floor((time / 100) % 60),
        minute = Math.floor((time / (100 * 60)) % 60),
        hour = Math.floor((time / (100 * 60 * 60)));
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    return hour + ":" + minute + ":" + second + ":" + milliseconds;
}
// 监听按钮
$('.timer-btn.start').on('click', function () {
    if (timerTime > 0) {
        startTimer();
    }
});

$('.timer-btn.pause').on('click', function () {
    pauseTimer();
});

$('.timer-btn.reset').on('click', function () {
    resetTimer();
});
$('.timer-btn.timing').on('click', function () {
    positiveTiming();
});
//点击时钟监听。
if (window.innerWidth > 783) {
    timerClock.on('click', function (e) {

        if (timerClock.hasClass('inactive')) {
            if (timerTime > 0) {
                startTimer();
            }
        } else {
            pauseTimer();
        }

    });
    timerClock.on('dblclick', function (e) {
        resetTimer();
    });
}
// 计时程序
function startTimer(count) {
    // 防止同时进行多个间隔。
    var totalTime = timerTime,
        timeString = returnAllTime(totalTime);
    timeString = timeString.substring(0, timeString.length - 3);
    clearInterval(timerInterval);
    // 每10ms刷新一次
    timerInterval = setInterval(function () {
        timerTime--;
        $('#myProgress')[0].value = timerTime;
        timerClock.text(returnAllTime(timerTime));
        if (timerTime <= 0) {
            // 历史记录
            if (count) {
                $('#record ul').append('<li class="time" >' + timeString +' 剩余次数:'+ count/2-1 + '</li>');
            } else {
                $('#record ul').append('<li class="time" >' + timeString + '</li>');
            }
            alarmSound.play();
            pauseTimer();
        }
    }, 10);
    timerInputHour.prop('disabled', true);
    timerInputMinute.prop('disabled', true);
    timerInputSecond.prop('disabled', true);
    timerClock.removeClass('inactive');
}
// 暂停函数
function pauseTimer() {
    clearInterval(timerInterval);
    timerInputHour.prop('disabled', false);
    timerInputMinute.prop('disabled', false);
    timerInputSecond.prop('disabled', false);
    timerClock.addClass('inactive');
}
// 用以前的有效时间重置时钟。
// 用于反复设置同一个警报。
function resetTimer() {
    pauseTimer();
    timerTime = (hours * 60 * 60 + minutes * 60) * 100 + seconds * 100;
    $('#myProgress')[0].max = $('#myProgress')[0].value = timerTime;
    timerClock.text(returnAllTime(timerTime));
}
// 正计时程序
function positiveTiming() {
    // 防止同时进行多个间隔。
    clearInterval(timerInterval);
    timerTime = 0
    // 每10ms刷新一次
    timerInterval = setInterval(function () {
        timerTime++;
        $('#myProgress')[0].max = 0;
        timerClock.text(returnAllTime(timerTime));

    }, 10);
    timerInputHour.prop('disabled', true);
    timerInputMinute.prop('disabled', true);
    timerInputSecond.prop('disabled', true);
    timerClock.removeClass('inactive');
}
// 声音按钮
timerSoundsButton.on('click', function () {
    if (this.checked) {
        alarmSound.volume = 1;
    } else {
        alarmSound.volume = 0;
    }
});

// 番茄工作
$('.focus-start').on('click', function () {
    var focusTime = $('select[name="focus-time"] option:selected')[0].value, //获取工作时间
        restTime = $('select[name="rest-time"] option:selected')[0].value, //获取休息时间
        count = $('select[name="count"] option:selected')[0].value * 2, //重复的次数
        autoStart = $('#auto-start')[0].checked, //判断是否自动开始
        timeFlag = true; //判断是工作时间还是休息时间
    function loop() {
        timerTime = timeFlag ? focusTime * 6000 : restTime * 6000;
        timeFlag = !timeFlag;
        $('#myProgress')[0].max = $('#myProgress')[0].value = timerTime;
        timerClock.text(returnAllTime(timerTime));
        autoStart ? startTimer(count) : pauseTimer();
        judgeInterval = setInterval(function () {
            if (timerTime <= 0) {
                count--;
                if (count > 0) {
                    loop();
                } else {
                    clearInterval(judgeInterval);
                    timerClock.text(returnAllTime(timerTime));
                }
            }
        }, 10);
    }
    loop();
});


if (window.innerWidth < 783) {
    $(".focus,.timer form").css("display", "none");
    $('#toggle').on('click', function () {
        $("#toggle").toggleClass("showClock");
        if ($("#toggle").hasClass('showClock')) {
            $("#myProgress,.clock,#record").css("display", "block");
            $(".focus,.timer form").css("display", "none");
        } else {
            $("#myProgress,.clock,#record").css("display", "none");
            $(".focus,.timer form").css("display", "block");
        }
    });
} else {
    $("#toggle").text('计时器')
}

navigator.vibrate = navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

navigator.vibrate([500, 300, 400, 300]);