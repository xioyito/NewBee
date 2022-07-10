
// global
var dir;
var if_origin_1 = 0;
var if_origin_2 = 0;
// 函数
function jump(sel) {
    $("html,body").animate({ scrollTop: $(sel).offset().top - 60 }, 500);
}
// 欢迎
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
        if (c.indexOf(name)  == 0) {
            return c.substring(name.length, c.length);
         }
    }
    return "";
}


var mydate = new Date();
var dark = "<link rel='stylesheet' href='/css/style-dark.css' /><link rel='stylesheet' href='/css/syntax-dark.css' />";
var isDark = (mydate.getHours() <= 6 && mydate.getHours() >= 0) || (mydate.getHours() >= 18 && mydate.getHours() <= 23);

// 夜晚
if (isDark) {
    if (getCookie('mode') != 'light') {
        $("link[href='/css/_custom.css']").before(dark);
    } else {
        $("link[href='/css/style-dark.css']").remove();
        $("link[href='/css/syntax-dark.css']").remove();
    }
}
// 白天
else {
    if (getCookie('mode') != 'dark') {
        $("link[href='/css/style-dark.css']").remove();
        $("link[href='/css/syntax-dark.css']").remove();
    } else {
        $("link[href='/css/_custom.css']").before(dark);
    }
}


// 加载动画消失
$(window).load(function () {
    $('.loading').fadeOut("slow", function() {
        var user = $(".name-jianjie .name").text();
    });
});

$(document).ready(function () {

    // 夜晚
    if (isDark) {
        if (getCookie('mode') != 'light') {
            $(".sun").hide();
            $(".moon").show();
        } else {
            $(".sun").show();
            $(".moon").hide();
        }
    }
    // 白天
    else {
        if (getCookie('mode') != 'dark') {
            $(".sun").show();
            $(".moon").hide();
        } else {
            $(".sun").hide();
            $(".moon").show();
        }
    }
    



    // 滚动条出现后的操作
    var h_body = $("body").height();
    if (h_body > $(window).height()) {
        var w_window_min = 760;
    } else {
        var w_window_min = 768;
    }

    $(".mode").click(function() {
        // 转深色模式
        if ($("link[href='/css/style-dark.css']").size() == 0) {
            $("link[href='/css/_custom.css']").before(dark);

            $(".sun").hide();
            $(".moon").show();

            setCookie('mode', 'dark', 1);
        }
        // 转浅色模式
        else {
            $("link[href='/css/style-dark.css']").remove();
            $("link[href='/css/syntax-dark.css']").remove();
            $(".sun").show();
            $(".moon").hide();
            

            setCookie('mode', 'light', 1);
        }
    });

    var lw = $(window).width(); // 初始宽度
    if (lw <= w_window_min) {
        $(".zhuti-r").hide();
        $(".tosides-1").hide();
        $(".tosides-2").show();
        $(".long").css("margin-right", 22);
        $(".zhuti-r-0").css({"max-height": $(window).height(), "height": $(window).height()});
    } else {
        $(".navbar-burger").hide();
        $(".navbar-menu > a").show();
        $(".zhuti-r-0").css({"max-height": $(window).height()-60, "height": $(window).height()-60});
    }

    // toup隐藏与显示
    var zhuti_l_top = $(".zhuti-l").offset().top;
    var h_scrol = $(window).scrollTop(); //滚动的高度
    if (zhuti_l_top - h_scrol >= 0) {
        $(".toup").hide();
    } else {
        $(".toup").show();
    }

    // 任务列表
    $(":checkbox").parent().css("list-style", "none");
    // 创建目录
    var mulu_items = $(".mulu-items");
    var h2_items = $(".content-self h1");
    var num_h2_item = h2_items.size();

    // h2
    var count_h2 = 0
    if (num_h2_item > 0) {
        h2_items.each(function () {
            var id_h2_item = $(this).attr("id");
            var href_h2_item = "#" + id_h2_item;
            var text_h2_item = $(this).text();
            count_h2++;
            var html_h2_item = '<div class="mulu-item heading2" id="mulu-' + id_h2_item + '">' +
                '<div class="shu-lan"></div>' +
                "<span>" + count_h2 + "</span> " + text_h2_item + '</div>';
            mulu_items.append(html_h2_item);

            var new_h2 = mulu_items.children(".heading2:last"); // 这个变量声明位置不能更改
            new_h2.click(function () {
                jump(href_h2_item);

            });

            mulu_items.append("<div class='father-h3'></div>");
            var father_h3 = mulu_items.children(".father-h3:last-child");

            // h3
            var h3_items = $(this).nextUntil("h1"); // 两个h1之间的所有标签？
            var num_h3_item = h3_items.size();
            var count_h3 = 0;
            if (num_h3_item > 0) {
                h3_items.each(function () {
                    if ($(this)[0].tagName == "H2") {
                        var id_h3_item = $(this).attr("id");
                        var href_h3_item = "#" + id_h3_item;
                        var text_h3_item = $(this).text();
                        count_h3++;
                        var html_h3_item = '<div class="mulu-item heading3" id="mulu-' + id_h3_item + '">' +
                            '<div class="shu-lan"></div>' +
                            "<span>" + count_h2 + "." + "</span>" + "<span>" + count_h3 + "</span> " + text_h3_item + '</div>';

                        father_h3.append(html_h3_item);

                        var new_h3 = father_h3.children(".heading3:last"); // 这个变量声明位置不能更改
                        new_h3.click(function () {
                            jump(href_h3_item);
                        });
                    }
                });
            }
        });
    } else {
        $(".zhi").hide();
    }

    $(".father-h3").show();

    // 主页hero图像尺寸调整
    $(".hero-img-home").height($(window).height() - 108);

    $(".burger-btn").click(function () {
        var lw = $(window).width();
        
        if ($(".header-rest").css("display") == "none") {
            $("header").height($(window).height());

            $(".header-rest").fadeIn();
            $("#content, footer").addClass("mask");
            $(".navbar").css("border-bottom", 0);
            $(".burger-items").slideDown();
        } else {
            $(".burger-items").slideUp(300, function () {
                $(".navbar").css("border-bottom", "1px solid rgb(255, 255, 255)");
                $(".header-rest").fadeOut();
                $("#content, footer").removeClass("mask");
                $("header").height(60);
            });
        }

        $(".burger-items").width(lw);
    });

    // 点击菜单的其他地方
    $(".header-rest").click(function () {
        $(".burger-items").slideUp(300, function () {
            $(".header-rest").hide();
            $("#content, footer").removeClass("mask");
            $("header").height(60);
        });

    });

    // 赞赏
    $(".aixin").click(function () {
        $(".appreciate").fadeIn('fast');
    });

    $(".appreciate-btn div:first-child").addClass("add-appreciate-btn");
    
    for (var i=0; i<3; i++) {
        let obj_click = ".appre-btn-" + (i+1);
        let obj_change = ".appre-img-" + (i+1);
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

    // 隐藏右栏
    $(".tosides-1").click(function () {

        // $('.zhuti-r').hide();
        $('.tosides-1').hide();
        $('.tosides-2').show();
        $(".zhuti-l").css("min-width", "100%"); // 解决bug
        $('.zhuti-r').fadeOut("fast");
        
        $(".long").animate({marginRight: 22}, 'fast');
        
        
        

        
        
        
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
            $(".long").animate({marginRight: 0}, 'fast');
            $(".zhuti-r-0").css({"max-height": $(window).height()-60, "height": $(window).height()-60});
        }
         else {
            $(".zhuti-r-0").css({"max-height": $(window).height(), "height": $(window).height()});
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

    



    var has_zhuti_r = $(".zhuti-r").size();
    // 窗口改变后运行
    $(window).resize(function () {
        // 响应式按钮
        var display_z_r = $(".zhuti-r").css("display");
        var lw = $(window).width();
        var lh = $(window).height();
        if (lw <= w_window_min) {

            $(".zhuti-r-0").css({"max-height": lh, "height": lh});

            $(".navbar-menu > a").hide();
            $(".navbar-burger").show(300);

            if (has_zhuti_r) {
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
            $(".zhuti-r-0").css({"max-height": lh-60, "height": lh-60});

            $(".navbar-burger").hide(300);
            $(".navbar-menu > a").fadeIn();
            

            if (has_zhuti_r) {
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


    // 判断鼠标滚动方向
    var scrolltop = new Array();
    var index = 0;
    scrolltop[0] = 0;
    $(document).scroll(function () {
        index++;
        scrolltop[index] = $(document).scrollTop();
        if (scrolltop[index] > scrolltop[index - 1]) {
            dir = "down";
        } else {
            dir = "up";
        };
    })
    
    // 滚动监视
    $(window).scroll(function () {

        // 回到顶部按钮隐藏与显示
        var zhuti_l_top = $(".zhuti-l").offset().top; // zhiti-l顶部与窗口顶部的距离
        var h_scroll = $(window).scrollTop(); //滚动的高度

        if ((zhuti_l_top - h_scroll >= 0) && ($(".toup").css('display') != 'none')) {

            $(".toup").css('opacity', 0);
            setTimeout(function() {
                $(".toup").hide();
            }, 300);
        } else if ((zhuti_l_top - h_scroll < 0) && ($(".toup").css('display') == 'none')) {
            $(".toup").show();
            $(".toup").css('opacity', 1);
        }

        // 目录高亮
        var h_items = $(".content-self h1, .content-self h2");
        var num_h_item = h_items.size();


        if ((num_h_item > 0) && ($('.zhuti-r').css('display') != 'none') && ($('.zhi').css('display') != 'none')) { // 有标题并且目录为打开状态才会执行
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

    // if ($('.katex').size()) {
        
    //     var katexText = $('.katex-header').text();
    //     var element = $('#katex-body');

    //     katex.render("c = \\pm\\sqrt{a^2 + b^2}", element, {
    //         throwOnError: false
    //     });
    // }



    if ($('.mermaid').size()) {
        var mermaidSrc = '<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>';
        $('head').append(mermaidSrc);
        mermaid.initialize({ startOnLoad: true });
    }
});

