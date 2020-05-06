$(document).ready(function() {
    // 注意： 轮播图不能判断， 要单独拿出来，因为这是通用的属性
    // 公共轮播图
    // 导航栏下面的轮播图
    var bannerSlider = $(".js_banner").oSlider({
        loop: true,
        pager: ".js_pager",
        pagerHover: false,
        speed: 3000,
        startFn: function() {
            // console.log("1");
        },
        playFn: function() {
            // console.log("1");
        }
    });
    bannerSlider.init();



    // 轮播图箭头
    $('.js_banner .btn_prev').html('<i class="iconfont">&#xe6a5;</i>');
    $('.js_banner .btn_next').html('<i class="iconfont">&#xe6a3;</i>');

    // 注意：o_picture一定需要放在read里面
    // 响应式图片自己下载 start 头部下面第一个轮播第一张图片更换
    $(".o_picture").each(function() {
        $(this).oPicture({
            //自定义节点宽度
        }).init();
    });
    // 响应式图片自己下载 end


    //禁止滚动条滚动
    function unScroll() {
        var top = $(document).scrollTop();
        $(document).on('scroll.unable', function(e) {
            $(document).scrollTop(top);
        })
    };
    //移除禁止滚动条滚动
    function removeUnScroll() {
        $(document).unbind("scroll.unable");
    };

    // 点击模拟登录 start pc
    // 声明一个变量，记录是否登录
    var logintrue = false;
    $('.header').on('click', '.js_denglu', function() {
        $this = $(this);
        $this.parents('.pcduan').addClass('displaynone');
        $this.parents('.pcduan').siblings('.js_login_success').removeClass('displaynone');
        logintrue = true;
    });
    // 点击模拟登录 end

    // 点击模拟退出 start
    $('.header').on('click', '.tuichu', function() {
        $this = $(this);
        $this.parents('.js_login_success').addClass('displaynone');
        $this.parents('.js_login_success').siblings('.pcduan').removeClass('displaynone');
        logintrue = false;

    });
    // 点击模拟退出 end

    //延迟加载视频 start
    setTimeout(function() {
        $(".o_video").each(function() {
            $(this).oVideo().init();
        });
    }, 2000);
    //延迟加载视频 end

    var page = 1;
    // 调取主页ajax封装成函数 start
    function zhuye_ajax() {
        $.ajax({
            // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
            // async: false,
            url: "../images/cansaizuopin.json", //json文件位置,必须从images开始写
            type: "GET", //请求方式为get
            dataType: "json", //返回数据格式为json
            success: function(data) { //请求成功完成后要执行的方法 
                // console.log(data);
                ++page;
                var html = '';
                $.each(data.cansaizuopin, function(index, item) {
                    // 注意！select值(value)就等于选中option的值，可以找到category_id直接赋值就行，不用转换了
                    // console.log(data.cansaizuopin);
                    html += `<div class="item o_u o_df_1-4">
                    <div class="content">
                        <div class="img_box">
                            <img src="${item.img}" alt="">
                        </div>
                        <p class="name">${item.name}</p>
                        <p class="author">${item.author}</p>
                    </div>
                </div>`
                });
                // html方法会把无弄没有，所以用append来添加，无是默认的
                $('.entries .work_list .rongqi').append(html);
            }
        })
    }

    zhuye_ajax();
    // 调取主页ajax封装成函数 end
    function zhuye_ajax2() {
        $.ajax({
            // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
            // async: false,
            url: "../images/cansaizuopin.json", //json文件位置,必须从images开始写
            type: "GET", //请求方式为get
            dataType: "json", //返回数据格式为json
            success: function(data) { //请求成功完成后要执行的方法 
                // console.log(data);
                ++page;
                var html = '';
                $.each(data.cansaizuopin, function(index, item) {
                    // 注意！select值(value)就等于选中option的值，可以找到category_id直接赋值就行，不用转换了
                    // console.log(data.cansaizuopin);
                    html += `<div class="item o_u o_df_1-4">
                    <div class="content">
                        <div class="img_box">
                            <img src="${item.img}" alt="">
                        </div>
                        <p class="name">${item.name}</p>
                        <p class="author">${item.author}</p>
                    </div>
                </div>`
                });
                // html方法会把无弄没有，所以用append来添加，无是默认的
                $('.entries .work_list .rongqi').empty();
                $('.entries .work_list .rongqi').append(html);
            }
        })
    }

    // 调取主页项单封装成函数 start
    function xiangdan() {
        $.ajax({
            // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
            // async: false,
            url: "../images/monifenlei.json", //json文件位置,必须从images开始写
            type: "GET", //请求方式为get
            dataType: "json", //返回数据格式为json
            success: function(data) { //请求成功完成后要执行的方法 
                // console.log(data);
                var html1 = '';
                var jiben = ' <div class="name o_u o_df_1-12 xiang">城市:</div><div class="all lei o_u o_df_1-12 xiang"><span class="xuanshang">全选</span></div>';
                $.each(data.monifenlei, function(index, item) {
                    // 注意！select值(value)就等于选中option的值，可以找到category_id直接赋值就行，不用转换了
                    // console.log(data.cansaizuopin);
                    html1 += `<div class="lei o_u o_df_1-12 xiang"><span>${item.diqu}</span></div>`;
                });
                // html方法会把无弄没有，所以用append来添加，无是默认的
                html1 = jiben + html1;

                $('.entries .chengshi').empty();
                $('.entries .chengshi').append(html1);
            }
        })
    }

    function xiangshuang() {
        $.ajax({
            // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
            // async: false,
            url: "../images/monifenlei2.json", //json文件位置,必须从images开始写
            type: "GET", //请求方式为get
            dataType: "json", //返回数据格式为json
            success: function(data) { //请求成功完成后要执行的方法 
                // console.log(data);
                var html1 = '';
                var jiben = ' <div class="name o_u o_df_1-12 xiang">城市:</div><div class="all lei o_u o_df_1-12 xiang"><span class="xuanshang">全选</span></div>';
                $.each(data.monifenlei2, function(index, item) {
                    // 注意！select值(value)就等于选中option的值，可以找到category_id直接赋值就行，不用转换了
                    // console.log(data.cansaizuopin);
                    html1 += `<div class="lei o_u o_df_1-12 xiang"><span>${item.diqu}</span></div>`;
                });
                // html方法会把无弄没有，所以用append来添加，无是默认的
                html1 = jiben + html1;

                $('.entries .chengshi').empty();
                $('.entries .chengshi').append(html1);
            }
        })
    }

    function quanbufenlei() {
        $.ajax({
            // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
            // async: false,
            url: "../images/quanbufenlei.json", //json文件位置,必须从images开始写
            type: "GET", //请求方式为get
            dataType: "json", //返回数据格式为json
            success: function(data) { //请求成功完成后要执行的方法 
                // console.log(data);
                var html1 = '';
                var jiben = ' <div class="name o_u o_df_1-12 xiang">城市:</div><div class="all lei o_u o_df_1-12 xiang"><span class="xuanshang">全选</span></div>';
                $.each(data.quanbufenlei, function(index, item) {
                    // 注意！select值(value)就等于选中option的值，可以找到category_id直接赋值就行，不用转换了
                    // console.log(data.cansaizuopin);
                    html1 += `<div class="lei o_u o_df_1-12 xiang"><span>${item.diqu}</span></div>`;
                });
                // html方法会把无弄没有，所以用append来添加，无是默认的
                html1 = jiben + html1;

                $('.entries .chengshi').empty();
                $('.entries .chengshi').append(html1);
            }
        })
    }

    // 调取项单封装成函数 end



    // 点击加载更多 start 主页
    $('.js_loadmore').on('click', function() {
        if (page <= 3) {
            zhuye_ajax();
            if (page == 3) {
                setTimeout(function() {
                    $('.js_loadmore').text('暂无数据');
                }, 800);
            }
        }
    });
    // 点击加载更多 end

    // 搜索选项更换 start
    $('.entries').on('click', '.lei', function() {
        $this = $(this);
        var index = $this.index();
        console.log(index);
        $this.find('span').addClass('xuanshang');
        $this.siblings('.lei').find('span').removeClass('xuanshang');
    });

    // 搜索选项更换 end

    // 模拟更改分类 start
    $('.entries').on('click', '.xiangdan', function() {
        $this = $(this);
        xiangdan();
    });
    $('.entries').on('click', '.xiangshuang', function() {
        xiangshuang();
    });
    $('.entries').on('click', '.diququanxuan', function() {
        quanbufenlei();
    });
    // 模拟更改分类 end
    $('.entries').on('click', '.zuidaall', function() {
        $('.saiqu').removeClass('displaynone');
        $('.chengshi').removeClass('displaynone');
        $('.zhihuilei').addClass('displaynone');
    });

    // 智慧场景 start
    $('.entries').on('click', '.zhihui', function() {
        $('.saiqu').addClass('displaynone');
        $('.chengshi').addClass('displaynone');
        $('.zhihuilei').removeClass('displaynone');
    });
    $('.entries').on('click', '.zhengchang', function() {
        $('.saiqu').removeClass('displaynone');
        $('.chengshi').removeClass('displaynone');
        $('.zhihuilei').addClass('displaynone');
    });
    // 智慧场景 end






    // 判断屏幕尺寸
    var width = $(window).width();
    var height = $(window).height();
    console.log(width);
    console.log(height);
    if (width > 1200) {
        // 尾部二维码
        $('.js_weichat').on('mouseenter', function() {
            var $this = $(this);
            $this.parents('.js_wechat_box').siblings('.js_sweep_code_box').removeClass('displaynone');
        });
        $('.js_weichat').on('mouseleave', function() {
            var $this = $(this);
            $this.parents('.js_wechat_box').siblings('.js_sweep_code_box').addClass('displaynone');
        });
        var width2 = $('.work_list').width();
        width2 = width2 + 30;
        $('.rongqi').width(width2);

    } else if (width < 1200) {
        var width2 = $('.work_list').width();
        width2 = width2 + 20;
        $('.rongqi').width(width2);
        // width<750
        if (width <= 750) {

            // 手机端回到顶部 start
            $('.goback').removeClass('displaynone');
            $('.goback').on('click', function() {
                $("html,body").animate({ scrollTop: 0 }, 500);
            });
            // 手机端回到顶部 end


            // 点击搜索 start
            $('.searchicon').on('click', function() {
                $('.allsearch').removeClass('displaynone');
                $('.diqu_leibie').addClass('displayblock');
                unScroll();
                var height3 = $('.allsearch').height();
                $('.diqu_leibie').height(height - height3);
                $('.diqu_leibie').css('top', height3);

            });
            $('.search_close').on('click', function() {
                $('.allsearch').addClass('displaynone');
                $('.diqu_leibie').removeClass('displayblock');
                removeUnScroll();
            });
            // 点击搜索 end

            // 确认搜索 
            $('.queren').on('click', function() {
                $('.allsearch').addClass('displaynone');
                $('.diqu_leibie').removeClass('displayblock');
                $('.shaixuan').find('span').addClass('color_005AAA');
                zhuye_ajax2();
            });
            //重置
            $('.chongzhi').on('click', function() {
                $('.lei').find('span').removeClass('xuanshang');
                $('.all').find('span').addClass('xuanshang');
                quanbufenlei();
            });


        }
        // width>750&&width<1200
        if (width > 750) {


        }

        // 点击模拟登录 start pad and phone
        $('.header').on('click', '.js_login_icon', function() {
            logintrue = true;
        });
        // 点击模拟登录 end

        // 点击模拟退出 start
        $('.js_menu_zhezhao').on('click', '.tuichu', function() {
            logintrue = false;
            $this = $(this);
            $this.parents('.login_success_pad_phone').addClass('displaynone');
        });
        // 点击模拟退出 end

        // 点击打开pad菜单栏
        $('.header').on('click', '.menu', function() {
            var $this = $(this);
            var headwidth = $('.header').height();
            var $zhezhao = $('.js_menu_zhezhao');
            $zhezhao.css('top', headwidth);
            var flag = $zhezhao.hasClass('displaynone');
            if (flag) {
                $zhezhao.removeClass('displaynone');
                $this.siblings('.js_close_menu').removeClass('displaynone');
                $('body').css({ overflow: 'hidden', height: "100%" });
                if (logintrue) {
                    $('.login_success_pad_phone').removeClass('displaynone');
                    var login_height = $('.js_last_menu_item').offset().top + 2 * ($('.js_last_menu_item').height());
                    $('.login_success_pad_phone').css('top', login_height);
                }
            }
        });
        //点击关闭pad菜单栏
        $('.header').on('click', '.js_close_menu', function() {
            var $this = $(this);
            $this.addClass('displaynone');
            $('.js_menu_zhezhao').addClass('displaynone');
            $('body').css('overflow', 'auto');
        });
    }
});


// 窗口函数改变执行的
$(window).resize(function() {
    var widthnow = $(window).width();
    var heigthnow = $(window).height();
    if (widthnow < 1200) {
        // 菜单栏顶部 start
        var headwidth = $('.header').height();
        var $zhezhao = $('.js_menu_zhezhao');
        $zhezhao.css('top', headwidth);
        // 菜单栏顶部 end

        var width2 = $('.work_list').width();
        width2 = width2 + 30;
        $('.rongqi').width(width2);
        if (widthnow < 750) {
            var width2 = $('.work_list').width();
            width2 = width2 + 20;
            $('.rongqi').width(width2);


            var height4 = $('.allsearch').height();
            $('.diqu_leibie').css('top', height4);
            $('.diqu_leibie').height(heigthnow);
        }
        if (widthnow > 750) {
            $('.diqu_leibie').css('height', 'auto');
        }

    }
});