$(function() {;
    //显示活动说明栏
    $("#intro").click(function() {
        //显示活动说明
        $("#mask1").show();
        //关闭视频播放  必须用原生的js控制 jquery不可以
        document.getElementById('wtvideo').pause();
        $('#wtvideo').css("display", "none");

        //显示图片
        $(".videoimg").css("display", "block");
    })

    //点击×隐藏活动说明栏
    $("#cha").click(function() {
            $("#mask1").hide();
            $('#wtvideo').css("display", "block");
            $(".videoimg").css("display", "none");

        })
        //mask2 上点击隐藏当前框  再显示视频
    $("#maskcha2").click(function() {
        $(".mask2").hide();
        $('#wtvideo').css("display", "block");
        $(".videoimg").css("display", "none");

    })
    // $(".js-form").submit(function (e) {
    //     $('#wtvideo').css("display", "none");
    //
    //     var mobile_no, patt, share_id;
    //     mobile_no = $('.js-mobile').val();
    //     patt = new RegExp(/^1\d{10}$/);
    //     if (!patt.test(mobile_no)) {
    //         alert("手机号码有误，请重填");
    //         return false;
    //     }
    //     var data1 = Date.parse(new Date());
    //     var data2 = Date.parse("2017.1.1 18:00:00");
    //
    //     if (data2 - data1 < 0) {
    //         $(".mask3").show();
    //         $(".videobox video").pause();
    //         return false;
    //     }
    //     return $.ajax({
    //
    //     })
    //
    //
    // })
    $("#wtbtn").click(function() {

        var mobile_no, patt, share_id;
        mobile_no = $('.js-mobile').val();
        patt= new RegExp( /^1[3|4|5|7|8][0-9]{9}$/);
        // patt = new RegExp(/^1\d{10}$/);
        if (!patt.test(mobile_no)) {
            alert("手机号码有误，请重填");
            return false;
        }
        var data1 = Date.parse(new Date());
        var data2 = Date.parse("2017.1.1 18:00:00");

        if (data2 - data1 < 0) {
            $(".mask3").show();
            $(".videobox video").pause();
            return false;
        } else {
            //点击领取元宝，发送请求
            var mobile = $("#wttel").val();

            $.ajax({
                type: 'get',
                dataType: 'json',
                url: 'http://192.168.101.108:3000/api/premium/baobiEvt',
                data: {
                    mobile: mobile
                },
                success: function(data) {
                    console.log(data);
                    if (data.HasGet === 1) {
                        // 显示 弹出框2
                        $('#wtvideo').css("display", "none");
                        $(".mask2").show();
                        //设置宝币数量
                        $("#baobi").text(data.BaobiMount);
                        //设置分享伙伴数量
                        $("#msg").text(data.ShareViews);
                        // localStorage.setItem(ShareViews,data.ShareViews);

                        wx.config({
                            debug: false,
                            appId: data.WxConf.appId,
                            timestamp: data.WxConf.timestamp,
                            nonceStr: data.WxConf.nonceStr,
                            signature: data.WxConf.signature,
                            jsApiList: [
                                'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'
                            ]
                        });

                    }
                },
                error: function() {
                    /* Act on the event */
                    console.log('出错了！');
                }
            })
        }

    })
    $(".mask3>.cha").click(function() {
        $(".mask3").hide();
    })
});