$(function () {



    // 发送ga 报告

    var wtvideo = document.getElementById("wtvideo");
    wtvideo.addEventListener('click',function () {
        console.log("视频被点击")
            if (wtvideo.paused) {
                wtvideo.play();
            } else  {
                wtvideo.pause();
            }

            ga('send', 'event', {
                eventCategory: '跨年红包大放送视频点击',
                eventAction: 'click',
                eventLabel: '跨年红包大放送'
            })

    },false)

    $(".videoimg").click(function () {
        ga('send', 'event', {
            eventCategory: '跨年红包大放送视频点击',
            eventAction: 'click',
            eventLabel: '跨年红包大放送'
        })
    })

    $(".download").click(function (e) {
        e.preventDefault();
        ga('send', 'event', {
                eventCategory: '跨年红包大放送下载',
                eventAction: 'click',
                eventLabel: '跨年红包大放送'
            }
        );
        setTimeout(function () {
            window.location.href = "http://bao.wallstreetcn.com/static/app.html?from=yuanbao";
        }, 500)
    })


    //显示活动说明栏
    $("#intro").click(function () {
        console.log('说明被点击');
        //显示活动说明
        $("#mask1").show();
        //关闭视频播放  必须用原生的js控制 jquery不可以
        document.getElementById('wtvideo').pause();
        $('#wtvideo').css("display", "none");
        $(".videoimg").css("display", "block");

        //显示图片
    })

    //点击×隐藏活动说明栏
    $("#cha").click(function () {
        $("#mask1").hide();
        $('#wtvideo').css("display", "block");
        $(".videoimg").css("display", "none");

    })
    //mask2 上点击隐藏当前框  再显示视频
    $("#maskcha2").click(function () {
        $(".mask2").hide();
        $('#wtvideo').css("display", "block");
        $(".videoimg").css("display", "none");

    })
    $("#lasttext").click(function () {
        $(".mask1").show();
        $(".mask2").hide();
    })
    $("#wtbtn").click(function () {

        var mobile_no, patt;
        mobile_no = $('.js-mobile').val();
        patt = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);
        if (!patt.test(mobile_no)) {
            alert("手机号码有误，请重填");
            return false;
        }
        // var data1 = Date.parse(new Date());
        // var data2 = Date.parse("2017.1.21 18:00:00");
        //
        // if (data2 - data1 < 0) {
        //     $(".mask3").show();
        //     $(".videobox video").pause();
        //     return false;
        // }
        //点击领取元宝，发送请求
        $(".mask2").show();
        $('#wtvideo').css("display", "none");
        $(".videoimg").css("display", "block");
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://192.168.101.108:3000/api/premium/baobiEvt',
            data: {
                mobile: mobile_no
            },
            success: function (data) {
                console.log(data);
                $(".mask2").show();
                if (data.HasGet === 1) {
                    // 显示 弹出框2
                    $('#wtvideo').css("display", "none");

                    //设置宝币数量
                    $("#baobi").text(data.BaobiMount);
                    //设置分享伙伴数量
                    $("#msg").text(data.ShareViews);
                    // localStorage.setItem(ShareViews,data.ShareViews);


                }
            },
            error: function () {
                /* Act on the event */
                console.log('出错了！');
            }
        })


    })
    $(".mask3>.cha").click(function () {
        $(".mask3").hide();
    })
});