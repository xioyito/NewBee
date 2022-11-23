var if_origin_1 = 0, if_origin_2 = 0;
var darkHTML = "<link rel='stylesheet' href='/css/style-dark.css' /><link rel='stylesheet' href='/css/syntax-dark.css' />";
function jump(sel) {
    $("html,body").animate({ scrollTop: $(sel).offset().top - 60 }, 500);
}

if (sessionStorage.getItem('mode')) {
    if (sessionStorage.getItem('mode') == 'dark') {
        $("link[href='/css/_custom.css']").before(darkHTML);
    }
}

$(document).ready(function () {

    $('.loading').fadeOut("slow");
    if (mode_custom == 'auto') {
        
        if (!sessionStorage.getItem('mode')) {
            var mydate = new Date(), hourNow = mydate.getHours();
            var isDark = (hourNow <= 6 && hourNow >= 0) || (hourNow >= 18 && hourNow <= 23);
            if (isDark) {
                $("link[href='/css/_custom.css']").before(darkHTML);
                $(".sun").hide();
                $(".moon").show();
                sessionStorage.setItem('mode', 'dark');
            } else {
                sessionStorage.setItem('mode', 'light');
            }
        } else {
            if (sessionStorage.getItem('mode') == 'dark') {
                
                $(".sun").hide();
                $(".moon").show();
            }
        }

        $(".mode").click(function () {
            if (sessionStorage.getItem('mode') == 'light') {
                $("link[href='/css/_custom.css']").before(darkHTML);
                $(".sun").hide();
                $(".moon").show();
                sessionStorage.setItem('mode', 'dark');
            } else {
                $("link[href='/css/style-dark.css'], link[href='/css/syntax-dark.css']").remove();
                $(".sun").show();
                $(".moon").hide();
                sessionStorage.setItem('mode', 'light');
            }
        });
    } else if (mode_custom == 'light') {
        if ($("link[href='/css/style-dark.css']")) {
            $("link[href='/css/style-dark.css']").remove();
            $("link[href='/css/syntax-dark.css']").remove();
        }
        sessionStorage.setItem('mode', 'light');
    } else if (mode_custom == 'dark') {
        sessionStorage.setItem('mode', 'dark');
    }

    if ($('.down-summary a')) {
        $('.down-summary a').contents().unwrap();
    }

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

    var h_body = $("body").height();
    if (h_body > $(window).height()) {
        var w_window_min = 760;
    } else {
        var w_window_min = 768;
    }



    var lw = $(window).width();
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

    var zhuti_l_top = $(".zhuti-l").offset().top;
    var h_scrol = $(window).scrollTop();
    if (zhuti_l_top - h_scrol < 0) $(".toup").show();

    $(":checkbox").parent().css("list-style", "none");

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
            $(".burger-items").slideDown('fast');
            $('.long').css('z-index', 1);
        } else {
            $(".burger-items").slideUp('fast', function () {
                $(".navbar").css("border-bottom", "1px solid rgb(255, 255, 255)");
                $(".header-rest").fadeOut();
                $("header").height(60);
                $('.long').css('z-index', 2);
            });
        }

        $(".burger-items").width($(window).width());
    });

    $(".header-rest").click(function () {
        
        $(".burger-items").slideUp(300, function () {
            
            $(".header-rest").hide();
            $("#content, footer").removeClass("mask");
            $("header").height(60);
            $('.long').css('z-index', 2);
        });

    });

    $('.wait-lang-box').css('left', ($('.lang-now').width() - $('.wait-lang-box').width()) / 2);
    $('.lang').click(function() {
        var pathName = (function() {
            originPath = window.location.pathname.substring(1);
            var newPath;
            if (nowIsDefaultLang) {
                newPath = originPath;
            } else {
                theStrPosition = originPath.indexOf('/');
                newPath = originPath.substring(theStrPosition + 1);
            }
            return newPath;
        }());
        var toTransHref = $(this)['context']['attributes'][0].value + pathName;
        window.location.href = toTransHref;
    })
    $(".tosides-1").click(function () {
        $('.tosides-1').hide();
        $('.tosides-2').show();
        $(".zhuti-l").css("min-width", "100%"); // fix bug
        $('.zhuti-r').fadeOut("fast");
        $(".long").animate({ marginRight: 22 }, 'fast');
        if_origin_1 = 1;
    });

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

    $(".toup").click(function () {
        jump(".hero");
    })

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


    function findBq(bqs) {
        bqs.each(function() {
            var it = $(this);
            var p1 = it.children('p:first');
            var p1Html= p1.html();
            var indexOfSpace = p1Html.indexOf('\n');
            var noteKind = p1Html.slice(0, indexOfSpace);
            if (
                noteKind != 'primary' &&
                noteKind != 'success' &&
                noteKind != 'tip' &&
                noteKind != 'warning' &&
                noteKind != 'danger'
            ) {
                noteKind = 'default';
            } else {
                p1.html(p1Html.slice(indexOfSpace + 1));
            }
            var theIcon = (function() {
                switch(noteKind) {
                    case 'default': return 'fa-circle-o';
                    case 'primary': return 'fa-circle-o';
                    case 'success': return 'fa-check';
                    case 'tip': return 'fa-lightbulb-o';
                    case 'warning': return 'fa-exclamation-circle';
                    case 'danger': return 'fa-close';
                    default: return 'fa-circle-o';
                }
            })();
            
            var theHtml = it.html();

            it.after(
                '<div class="note ' + noteKind + '-box">' +
                    '<div class="note-header">' +
                        '<div>' +
                            '<i class="fa ' + theIcon + '"></i>' +
                        '</div>' +
                        '<div>' +
                            '<span>' +
                                '<i class="fa fa-angle-down"></i>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="note-content ' + noteKind + '-content">' +
                        theHtml +
                    '</div>' +
                '</div>'
            );
            if (it.children('blockquote').size() > 0) {
                findBq(it.next().children('.note-content').children('blockquote'));
            }
            it.remove();
        });
    }
    findBq($('.content-self > blockquote'));



    $(".note-header").click(function () {
        if ($(this).next().css('display') == 'block') {
            $(this).find(".fa-angle-down").css("transform", "rotate(-90deg)");
        } else {
            $(this).find(".fa-angle-down").css("transform", "rotate(0deg)");
        }
        $(this).next().slideToggle(300);
    });

    (function codeBlockToSc() {
        $('.content-self > .highlight').each(function() {
            
            var outer = $(this);
            var code_1 = outer.find('code:first');
            var code_2 = outer.find('code:last');
            var span_1 = code_2.find('span:first');
            var case_1 = code_2.html().slice(0, 5) == '<span';
            var case_2 = code_2.html().slice(0, 5) == 'close';
            
            var closeCase = 
                ((case_1 && span_1.text() == 'close') || case_2)
                ? true
                : false;
            if (closeCase) {
                if (case_1) {
                    span_1.remove();
                    code_2.html(code_2.html().slice(1));
                } else if (case_2) {
                    code_2.html(code_2.html().slice(6));
                }
                code_1.find('span:last').remove();
            }

            var theHtml = $(this).html();
            var theLang = (function() {
                var a = '';
                if (typeof code_2.attr('class') == 'string') {
                    a = code_2.attr('data-lang');
                }
                return a;
            })();
            
            outer.after(
                '<div class="code-box">' +
                    '<div class="code-header">' + 
                        '<span class="for-slidetoggle">' +
                            '<i class="fa fa-angle-down"></i>' +
                            '<span>' + theLang + '</span>' +
                        '</span>' +
                        '<span class="for-copy">' +
                            '<i class="fa fa-copy"></i>' +
                        '</span>' +
                    '</div>' +
                    '<div class="code-content ' + (closeCase? 'note-close': '') + '">' +
                        '<div class="highlight">' +
                            theHtml +
                        '</div>' +
                    '</div>' +
                '</div>'
            
            )
            if (closeCase) {
                 outer.next().find('.fa-angle-down').css("transform", "rotate(-90deg)");
            }
           
            outer.remove();
        })
    })();

    $(".for-slidetoggle").click(function () {
        if ($(this).parent().next().css('display') == 'block') {
            $(this).find(".fa-angle-down").css("transform", "rotate(-90deg)");
        } else {
            $(this).find(".fa-angle-down").css("transform", "rotate(0deg)");
        }
        $(this).parent().next().slideToggle(300);
    });



    (function codeLineTosc() {
        $('code').each(function() {
            var it = $(this);
            if (it.parent().prop('tagName') != 'PRE') {
                var theText = it.text()
                var indexBegin = theText.lastIndexOf('(');
                var indexEnd = theText.lastIndexOf(')');
                var kind = theText.slice(indexBegin+1, indexEnd);
                if (
                    kind != 'primary' &&
                    kind != 'success' &&
                    kind != 'tip' &&
                    kind != 'warning' &&
                    kind != 'danger'
                ) kind = 'default';
                var notInNote = (function() {
                    var a = true;
                    it.parents().each(function() {
                        if ($(this).attr('class')) {
                            if ($(this).attr('class').indexOf('note')) {
                                a = false;
                            }
                        }
                    })
                    return a;
                })();
                
                if ((kind != 'default') || ((kind == 'default') && notInNote)) {
                    it.text(theText.slice(0, indexBegin-1));
                }
                it.addClass('label label-' + kind);
            }
        });
    })()

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

    $(window).resize(function () {
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

        var display_bg = $(".burger-items").css("display");
        if (lw <= w_window_min) {
            if (display_bg == "block") {
                $(".burger-items").width(lw);
            }
        } else {
            $(".burger-items").hide();
            $("#content, footer").removeClass("mask");
            $(".header-rest").click();
        }
        $(".hero-img-home").height($(window).height() - 108);
    });

    $(window).scroll(function () {
        var zhuti_l_top = $(".zhuti-l").offset().top;
        var h_scroll = $(window).scrollTop();
        if ((zhuti_l_top - h_scroll >= 0) && ($(".toup").css('display') != 'none')) {
            $(".toup").css('opacity', 0);
            setTimeout(function () {
                $(".toup").hide();
            }, 300);
        } else if ((zhuti_l_top - h_scroll < 0) && ($(".toup").css('display') == 'none')) {
            $(".toup").show();
            $(".toup").css('opacity', 1);
        }

        var h_items = $(".content-self h1, .content-self h2");
        if ((h_items.size()) && ($('.zhuti-r').css('display') != 'none') && ($('.zhi').css('display') != 'none')) { // 有标题并且目录为打开状态才会执行
            h_items.each(function () {
                var id_h_item = $(this).attr("id");
                var top_h_item = $(this).offset().top;
                var h_item_nexts_h2 = $(this).nextAll("h1");
                var h_item_nexts_h3 = $(this).nextAll("h1, h2");
                var h_item_next_h2 = h_item_nexts_h2.first();
                var h_item_next_h3 = h_item_nexts_h3.first();

                if (h_item_next_h2.size() > 0) {
                    var top_h_item_next_h2 = h_item_next_h2.offset().top;
                    var below_h2_two = top_h_item_next_h2 - top_h_item;
                } else {
                    var below_h2_two = $("body").height();
                }

                if (h_item_next_h3.size() > 0) {
                    var top_h_item_next_h3 = h_item_next_h3.offset().top;
                    var below_h3_two = top_h_item_next_h3 - top_h_item;
                } else {
                    var below_h3_two = $("body").height();
                }

                $(".mulu-item").each(function () {
                    var tiaojian = ($(this).attr("id") == ("mulu-" + id_h_item));
                    if (tiaojian) {
                        var div_h_item = $(this);
                        var top_item_active = h_scroll - top_h_item;
                        if ($(this).attr("class").indexOf("heading1") != -1) {
                            var below_h_two = below_h2_two;
                        } else {
                            var below_h_two = below_h3_two;
                        }
                        if ((top_item_active >= -80) && (top_item_active < below_h_two - 80)) {
                            $(".mulu-item").children(".shu-lan").hide();
                            div_h_item.children(".shu-lan").show();
                        }
                    }
                });
            });
        }
    });

    $(".sponsor-btn div:first-child").addClass("add-sponsor-btn");

    $(".aixin").click(function () {
        $(".sponsor").fadeIn('fast');
    });

    for (var i = 0; i < 3; i++) {
        let obj_click = ".sponsor-btn-" + (i + 1);
        let obj_change = ".sponsor-img-" + (i + 1);
        $(obj_click).click(function () {
            $(obj_change).siblings().hide();
            $(obj_change).show();
            $(this).addClass("add-sponsor-btn");
            $(this).siblings().removeClass("add-sponsor-btn");
        });
    }

    $(".cancel").click(function () {
        $(".sponsor").fadeOut('fast');
    })

    $(".pinglun").click(function () {
        $(".tosides-2").click();
        $(".button-comment").click();
    });

    if ($('.mermaid')) {
        mermaid.initialize({ startOnLoad: true });
    }

    (function imgAddSd() {
       var imgs = $('.content-self img');
       imgs.each(function() {
            var it = $(this);
            var title = it.attr('title');
            it.attr({
                'data-src': it.attr('src'),
                'src': '/images/thumbnail.gif'
            });
            it.addClass('lazyload has-shadow');
            if (title) {
                if (title.slice(-3) == '_no') {
                    it.removeClass('has-shadow');
                    it.attr('title', title.slice(0, -3));
                    if (it.attr('title').length == 0) {
                        it.removeAttr('title');
                    } else {
                        it.after('<div class="img-title">' + it.attr('title') + '</div>');
                    }
                } else {
                    it.after('<div class="img-title">' + it.attr('title') + '</div>');
                }
            }
       });
    })();
});