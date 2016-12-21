
 $(function() {

     //显示活动说明栏
     $("#intro").click(function () {
         //显示活动说明
         $("#mask1").show();
         //关闭视频播放  必须用原生的js控制 jquery不可以
         document.getElementById('wtvideo').pause();
         $('#wtvideo').css("display","none");
     })

     //点击×隐藏活动说明栏
     $("#cha").click(function () {
         $("#mask1").hide();
         $('#wtvideo').css("display","block");

     })
     //mask2 上点击隐藏当前框  再显示视频
     $("#maskcha2").click(function () {
         $(".mask2").hide();
         $('#wtvideo').css("display","block");

     })
     $("#wtbtn").click(function () {
         $('#wtvideo').css("display","none");
         //当前时间转化成number
         var data1 = Date.parse(new Date());

         var data2 = Date.parse("2017.1.1 18:00:00");
         // console.log(data2);
         // console.log(new Date(data2));
         if(data2-data1<0){
             $(".mask3").show();
             $(".videobox video").pause();
             return false;
         }else{
             $(".mask2").show();
             //点击领取元宝，发送请求
             var tel = $("#wttel").val();
             console.log(tel);
             // $.ajax({
             //     type: 'get',
             //     dataType: 'jsonp',
             //     url: 'http://www.baidu.com',
             //     data: {
             //         tel: tel
             //     },
             //     success: function(data) {
             //         // $("#msg").text(data.num);
             //
             //     },
             //     error: function() {
             //         /* Act on the event */
             //         // console.log(error);
             //     }
             // })
         }

     })
     $(".mask3>.cha").click(function () {
         $(".mask3").hide();
     })
 });