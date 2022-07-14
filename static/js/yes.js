
// global
var if_origin_1 = 0, if_origin_2 = 0;

// 函数
function jump(sel) {
    $("html,body").animate({ scrollTop: $(sel).offset().top - 60 }, 500);
}

var mydate = new Date(), hourNow = mydate.getHours();
var darkHTML = "<link rel='stylesheet' href='/css/style-dark.css' /><link rel='stylesheet' href='/css/syntax-dark.css' />";
var isDark = (hourNow <= 6 && hourNow >= 0) || (hourNow >= 18 && hourNow <= 23);


if (!sessionStorage.getItem('mode')) {
    if (isDark) {
        sessionStorage.setItem('mode', 'dark');
    } else {
        sessionStorage.setItem('mode', 'light');
    }
    
}

// 自动深色模式
if ((isDark && (sessionStorage.getItem('mode') != 'light')) || (!isDark && sessionStorage.getItem('mode') == 'dark')) {
    $("link[href='/css/_custom.css']").before(darkHTML);
}

$(window).load(function () {
    $('.loading').fadeOut("slow");
});

$(document).ready(function () {

    if (sessionStorage.getItem('mode') == 'dark') {
        $(".sun").hide();
        $(".moon").show();
    }

    if ($('.down-summary a')) {
        $('.down-summary a').contents().unwrap();
    }

    // 主页hero图像尺寸调整
    $(".hero-img-home").height($(window).height() - 108);

    var termsRoot = $('.terms-root');
    if (termsRoot) {
        termsRoot.each(function() {
            if ($(this).children('.down-type').size() == 0) {
                $(this).css('margin-bottom', 35);
            }
        })

        var readMore = $('.card-readmore');
        readMore.each(function() {
            $(this).css('top', $(this).parent().height() / 2 - 30) ;
            
        })
    }

    // 滚动条出现后的操作
    var h_body = $("body").height();
    if (h_body > $(window).height()) {
        var w_window_min = 760;
    } else {
        var w_window_min = 768;
    }

    $(".mode").click(function () {
        // 转深色模式
        if (sessionStorage.getItem('mode') == 'light') {
            $("link[href='/css/_custom.css']").before(darkHTML);
            $(".sun").hide();
            $(".moon").show();
            sessionStorage.setItem('mode', 'dark');
        }
        // 转浅色模式
        else {
            $("link[href='/css/style-dark.css'], link[href='/css/syntax-dark.css']").remove();
            $(".sun").show();
            $(".moon").hide();
            sessionStorage.setItem('mode', 'light');
        }
    });

    var lw = $(window).width(); // 初始宽度
    var lh = $(window).height(); // 初始高度
    if (lw <= w_window_min) {
        $(".zhuti-r, .tosides-1").hide();
        $(".tosides-2").show();
        $(".long").css("margin-right", 22);
        $(".zhuti-r-0").css({ "max-height": $(window).height(), "height": $(window).height() });
    } else {
        $(".navbar-burger").hide();
        $(".navbar-menu > a").show();
        $(".zhuti-r-0").css({ "max-height": $(window).height() - 60, "height": $(window).height() - 60 });
    }

    // toup隐藏与显示
    var zhuti_l_top = $(".zhuti-l").offset().top;
    var h_scrol = $(window).scrollTop(); //滚动的高度
    if (zhuti_l_top - h_scrol < 0) $(".toup").show();

    // 任务列表
    $(":checkbox").parent().css("list-style", "none");

    // 创建目录
    function createDir(theItem) {
        var nodeNameCustom = theItem[0].nodeName;
        var appendTo = $('.mulu-items');
        var titleId = theItem.attr('id');
        var titleHref = '#' + titleId;
        var titleText = theItem.text();
        var titleHtml;
        if (nodeNameCustom == 'H1') {
            count_h1++;
            titleHtml = '<div class="mulu-item heading1" id="mulu-' + titleId + '">' +
                '<div class="shu-lan"></div>' +
                "<span>" + count_h1 + "</span> " + titleText + '</div>';
        } else if (nodeNameCustom == 'H2') {

            count_h2++;
            titleHtml = '<div class="mulu-item heading2" id="mulu-' + titleId + '">' +
                '<div class="shu-lan"></div>' +
                "<span>" + count_h1 + "." + "</span>" +
                "<span>" + count_h2 + "</span> " + titleText + '</div>';

            appendTo = $('.mulu-items').children(".father-h2:last-child");
        } else {
            titleHtml = '<div class="mulu-item heading1" id="mulu-' + titleId + '">' +
                '<div class="shu-lan"></div>' + titleText + '</div>';
                
        }
        appendTo.append(titleHtml);

        var newTitle = appendTo.children('.heading1:last');
        if (nodeNameCustom == 'H2') {
            newTitle = appendTo.children('.heading2:last');
        }
        newTitle.click(function () {
            jump(titleHref);
        })
    }

    // h1
    var h1_items = $(".content-self > h1");
    var count_h1 = 0, count_h2;
    if (h1_items.size()) {
        h1_items.each(function () {
            createDir($(this));

            $(".mulu-items").append("<div class='father-h2'></div>");
            // h2
            var h2_items = $(this).nextUntil("h1");
            count_h2 = 0;
            if (h2_items.size()) {
                h2_items.each(function () {
                    if ($(this)[0].nodeName == "H2") {
                        createDir($(this));
                    }
                });
            }
        })
    } else if ($('.year').size()) {
        var h3_item = $('.year-head');
        h3_item.each(function() {
            $(this).attr('id', $(this).text());
            createDir($(this));
        })
    } else {
        $(".zhi").hide();
    }

    $(".burger-btn").click(function () {

        if ($(".header-rest").css("display") == "none") {
            $("header").height($(window).height());
            $(".header-rest").fadeIn();
            // $("#content, footer").addClass("mask");
            $(".navbar").css("border-bottom", 0);
            $(".burger-items").slideDown('fast');
            // $('.tosides-1, tosides-2').hide()
        } else {
            $(".burger-items").slideUp('fast', function () {
                $(".navbar").css("border-bottom", "1px solid rgb(255, 255, 255)");
                $(".header-rest").fadeOut();
                // $("#content, footer").removeClass("mask");
                $("header").height(60);
                // $('.tosides-1, tosides-2').show()
            });
        }

        $(".burger-items").width($(window).width());
    });

    // 点击菜单的其他地方
    $(".header-rest").click(function () {
        $(".burger-items").slideUp(300, function () {
            $(".header-rest").hide();
            $("#content, footer").removeClass("mask");
            $("header").height(60);
        });

    });

    // 隐藏右栏
    $(".tosides-1").click(function () {
        $('.tosides-1').hide();
        $('.tosides-2').show();
        $(".zhuti-l").css("min-width", "100%"); // fix bug
        $('.zhuti-r').fadeOut("fast");
        $(".long").animate({ marginRight: 22 }, 'fast');
        if_origin_1 = 1;
    });

    // 显示右栏
    $(".tosides-2").click(function () {

        $('.zhuti-r').fadeIn("fast");
        $('.tosides-1').show();
        $('.tosides-2').hide();
        $(".zhuti-l").css("min-width", "calc(100% - 310px)"); // 解决bug

        var lw = $(window).width();
        if (lw > w_window_min) {
            $(".long").animate({ marginRight: 0 }, 'fast');
            $(".zhuti-r-0").css({ "max-height": $(window).height() - 60, "height": $(window).height() - 60 });
        }
        else {
            $(".zhuti-r-0").css({ "max-height": $(window).height(), "height": $(window).height() });
        }
        if_origin_2 = 1;
    });

    // toup
    $(".toup").click(function () {
        jump(".hero");
    })

    // 评论和目录的切换
    $(".button-mulu").addClass("button-r-add");
    $(".comment-text").hide();

    $(".button-mulu").click(function () {
        $('#r2').hide();
        $('#r1').show();
        $(".button-comment").removeClass("button-r-add");

        $(this).addClass("button-r-add");
        $(".comment-text").hide();
        $(".bars-text").fadeIn();
    })
    $(".button-comment").click(function () {
        $('#r1').hide();
        $('#r2').show();
        $(".button-mulu").removeClass("button-r-add");

        $(this).addClass("button-r-add");
        $(".bars-text").hide();
        $(".comment-text").fadeIn();
    })

    $(".todown").click(function () {
        jump(".zhuti-0");
    })

    $(".note-content").each(function () {
        if ($(this).css("display") == "none") {
            $(this).prev().find(".fa-angle-down").css("transform", "rotate(-90deg)");
        }

    })

    // note的fa
    $(".note-header").click(function () {
        var h_the_box = $(this).parent().height();
        $(this).next().slideToggle(300, function () {
            if (h_the_box > 35) {
                $(this).prev().find(".fa-angle-down").css("transform", "rotate(-90deg)");
            } else {
                $(this).prev().find(".fa-angle-down").css("transform", "rotate(0deg)");
            }
        });
    });

    // code
    $(".for-slidetoggle").click(function () {
        var h_the_box = $(this).parent().parent().height();
        $(this).parent().next().slideToggle(300, function () {
            if (h_the_box > 30) {
                $(this).prev().find(".fa-angle-down").css("transform", "rotate(-90deg)");
            } else {
                $(this).prev().find(".fa-angle-down").css("transform", "rotate(0deg)");
            }
        });
    });


    // 点击复制
    function copy(that) {
        var ta = document.createElement('textarea');
        document.body.appendChild(ta)
        ta.value = that.text();
        ta.select();
        document.execCommand("copy");
        ta.remove();
    }
    $(".code-header .fa-copy").click(function () {
        copy($(this).parents(".code-box").find("code").last());
    })

    // 窗口改变后运行
    $(window).resize(function () {
        // 响应式按钮
        var display_z_r = $(".zhuti-r").css("display");
        var lw = $(window).width();
        var lh = $(window).height();
        if (lw <= w_window_min) {

            $(".zhuti-r-0").css({ "max-height": lh, "height": lh });

            $(".navbar-menu > a").hide();
            $(".navbar-burger").show(300);

            if ($(".zhuti-r")) {
                if (if_origin_2 == 1) {
                    if (if_origin_1 == 0) {
                        $('.zhuti-r').show();
                    }
                    $(".long").css("margin-right", 22);
                } else {
                    $(".long").css("margin-right", 22);
                    $(".tosides-1").hide();
                    $(".tosides-2").show();
                }
            }

            
        } else {
            $(".zhuti-r-0").css({ "max-height": lh - 60, "height": lh - 60 });

            $(".navbar-burger").hide(300);
            $(".navbar-menu > a").fadeIn();


            if ($(".zhuti-r")) {
                if (display_z_r != "none") {
                    $(".long").css("margin-right", 0);
                    $(".tosides-2").hide();
                    $(".tosides-1").show();
                } else {
                    $(".long").css("margin-right", 22);
                    $(".tosides-2").show();
                }
            }
        }

        if (termsRoot) {
            readMore.each(function() {
                $(this).css('top', $(this).parent().height() / 2 - 30) ;
            })
        }

        // 菜单栏下拉宽度自动调整
        var display_bg = $(".burger-items").css("display");
        if (lw <= w_window_min) {
            if (display_bg == "block") {
                $(".burger-items").width(lw);
            }
        } else {
            $(".burger-items").hide();
            $("#content, footer").removeClass("mask");
            // 屏幕宽度超过时执行点击动作
            $(".header-rest").click();
        }
        // 主页hero图像尺寸调整
        $(".hero-img-home").height($(window).height() - 108);
    });

    // 滚动监视
    $(window).scroll(function () {

        // 回到顶部按钮隐藏与显示
        var zhuti_l_top = $(".zhuti-l").offset().top; // zhiti-l顶部与窗口顶部的距离
        var h_scroll = $(window).scrollTop(); //滚动的高度

        if ((zhuti_l_top - h_scroll >= 0) && ($(".toup").css('display') != 'none')) {

            $(".toup").css('opacity', 0);
            setTimeout(function () {
                $(".toup").hide();
            }, 300);
        } else if ((zhuti_l_top - h_scroll < 0) && ($(".toup").css('display') == 'none')) {
            $(".toup").show();
            $(".toup").css('opacity', 1);
        }

        // 目录高亮
        var h_items = $(".content-self h1, .content-self h2");

        if ((h_items.size()) && ($('.zhuti-r').css('display') != 'none') && ($('.zhi').css('display') != 'none')) { // 有标题并且目录为打开状态才会执行
            h_items.each(function () {
                var id_h_item = $(this).attr("id");
                var top_h_item = $(this).offset().top;
                var h_item_nexts_h2 = $(this).nextAll("h1");
                var h_item_nexts_h3 = $(this).nextAll("h1, h2");
                var h_item_next_h2 = h_item_nexts_h2.first();
                var h_item_next_h3 = h_item_nexts_h3.first();

                if (h_item_next_h2.size() > 0) { //如果有下一个h2
                    var top_h_item_next_h2 = h_item_next_h2.offset().top; // 下一个item距top的距离
                    var below_h2_two = top_h_item_next_h2 - top_h_item;
                } else {
                    var below_h2_two = $("body").height();
                }

                if (h_item_next_h3.size() > 0) { //如果有下一个h3
                    var top_h_item_next_h3 = h_item_next_h3.offset().top; // 下一个item距top的距离
                    var below_h3_two = top_h_item_next_h3 - top_h_item;
                } else {
                    var below_h3_two = $("body").height();
                }

                // 确定目录表里相应的item
                $(".mulu-item").each(function () {
                    // 符合的条件
                    var tiaojian = ($(this).attr("id") == ("mulu-" + id_h_item));
                    if (tiaojian) {
                        var div_h_item = $(this); // 匹配的元素
                        var top_item_active = h_scroll - top_h_item;
                        if ($(this).attr("class").indexOf("heading1") != -1) { // 如果是h2
                            var below_h_two = below_h2_two;
                        } else { // 如果是h3
                            var below_h_two = below_h3_two;
                        }
                        if ((top_item_active >= -80) && (top_item_active < below_h_two - 80)) {
                            // 改变相应的的样式
                            $(".mulu-item").children(".shu-lan").hide();
                            div_h_item.children(".shu-lan").show();
                        }
                    }
                });
            });
        }
    });

    // 赞赏

    $(".appreciate-btn div:first-child").addClass("add-appreciate-btn");

    $(".aixin").click(function () {
        $(".appreciate").fadeIn('fast');
    });

    for (var i = 0; i < 3; i++) {
        let obj_click = ".appre-btn-" + (i + 1);
        let obj_change = ".appre-img-" + (i + 1);
        $(obj_click).click(function () {
            $(obj_change).siblings().hide();
            $(obj_change).show();
            $(this).addClass("add-appreciate-btn");
            $(this).siblings().removeClass("add-appreciate-btn");
        });
    }

    // 取消
    $(".cancel").click(function () {
        $(".appreciate").fadeOut('fast');
    })

    // .pinglun
    $(".pinglun").click(function () {
        $(".tosides-2").click();
        $(".button-comment").click();
    });

    if ($('.mermaid')) {
        mermaid.initialize({ startOnLoad: true });
    }
});