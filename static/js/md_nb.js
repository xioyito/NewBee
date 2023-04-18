$(document).ready(function () {


    var isInBox, afterTagStr, boxKind, goalBox;
    var tabsNum = 0, titleNum = -1;
    $('.content-self').children().each(function() {
        var theText = $(this).text();
        if (theText.slice(0, 3) == ':::') {
            afterTagStr = theText.slice(3);
            // 判断标签
            if (!isClose(afterTagStr)) {
                // 创建容器未闭合标识
                isInBox = true;
                // 获取容器类型
                boxKind = theText.slice(4);
                if (theText.indexOf('#') >= 0) {
                    boxKind = theText.slice(4, theText.indexOf('#'));
                    var boxId = theText.slice(theText.indexOf('#')+1);
                }
                
                // 初始化
                switch(boxKind) {
                    case 'tabs':
                        // 创建目标容器
                        $(this).before(`<div id="tabs-${tabsNum}" class="tabs">` +
                            '<div class="tabs-header"></div>' +
                            '<div class="tabs-content"></div>' +
                            '</div>');
                        goalBox = $(this).prev();
                        if (boxId) goalBox.attr('tabs-id', boxId);
                        tabsNum++;
                        break;

                }
            } else {
                isInBox = false;
                
            }

            // 删除此p
            $(this).remove();

        } else {
            // 对容器内的内容执行操作
            if (isInBox) {
                switch(boxKind) {
                    case 'tabs':
                        // 获取标题
                        if (theText.slice(0, 4) == '@tab') {
                            
                            titleNum++;
                            // 常规情况
                            var theTitle = theText.slice(5);
                            // 激活的情况
                            if (theText.slice(4, 11) == ':active') {
                                theTitle = theText.slice(12);
                                var isActive = true;
                            }

                            var titleHtml = `<span id="tab-title-${titleNum}" tab-id="${theTitle}">${theTitle}</span>`,
                                subBoxHtml = `<div id="tab-content-${titleNum}"></div>`;

                            // 对第一个选项卡的操作
                            if (!goalBox.children('.tabs-header').children().length) {
                                titleHtml = `<span id="tab-title-${titleNum}" tab-id="${theTitle}" class="efct-btn-tabs tab-title-active">${theTitle}</span>`;
                                subBoxHtml = `<div id="tab-content-${titleNum}" class="tab-content-active"></div>`;
                            }
                            
                            goalBox.children('.tabs-header').append(titleHtml);
                            goalBox.children('.tabs-content').append(subBoxHtml);

                            if (isActive) {
                                goalBox.find('.tabs-header > span').removeClass('efct-btn-tabs tab-title-active');
                                goalBox.find('.tabs-content > div').removeClass('tab-content-active');
                                goalBox.find('.tabs-header > span:last').addClass('efct-btn-tabs tab-title-active');
                                goalBox.find('.tabs-content > div:last').addClass('tab-content-active');
                                
                            }

                        // 获取内容
                        } else {
                            goalBox.find('#tab-content-' + titleNum).append($(this)[0].outerHTML);


                        }

                        break;
                    default:
                        break;
                        
                }
                
                $(this).remove();
            }
            
        }



    })

    // 收集 tabs id
    var arrTabsId = [];
    $('.tabs').each(function() {
        var attrId = $(this).attr('id');
        if (!$(this).attr('tabs-id')) {
            $(this).attr('tabs-id', attrId);
        }
        
        tabsId = $(this).attr('tabs-id');
        toArr(tabsId, arrTabsId);
    })

    // 收集 tab id
    for (var i=0; i<arrTabsId.length; i++) {
        var arrTabId = [];
        $(`[tabs-id="${arrTabsId[i]}"]`).each(function() {
            $(this).attr('tabs-id-link', i);
            $(this).children('.tabs-header').children().each(function() {
                toArr($(this).attr('tab-id'), arrTabId);
            })
        })
        // 添加同类链接id
        $(`[tabs-id="${arrTabsId[i]}"]`).each(function() {
            $(this).children('.tabs-header').children().each(function() {
                var tabIdLink = i + '-' + arrTabId.indexOf($(this).attr('tab-id'));
                $(this).attr('tab-title-id-link', tabIdLink);
                $('#tab-content-' + $(this).attr('id').slice(10)).attr('tab-content-id-link', tabIdLink);
            })
        })
        // 绑定点击事件
        for (var j=0; j<arrTabId.length; j++) {
            $(`[tab-title-id-link="${i}-${j}"]`).click(function() {
                var theIdLink = $(this).attr('tab-title-id-link');
                var goalLink = $(`[tab-title-id-link="${theIdLink}"]`);
                goalLink.siblings('.efct-btn-tabs').removeClass('efct-btn-tabs');
                goalLink.addClass('efct-btn-tabs');
                goalLink.parent().next().children().hide();
                $(`[tab-content-id-link="${theIdLink}"]`).show();
                
            })
        }
    }

    // 
    $('pre').each(function() {
        switch ($(this).children('code:first').attr('data-lang')) {
            case 'mermaid':
                $(this).before(`<div class="mermaid">${$(this).text()}</div>`);
                $(this).remove();
                break;
            case 'math':
                $(this).before(`<div>${$(this).text()}</div>`);
                var enen = $(this);
                var timer = setInterval(function() {
                    if (MathJax.typesetPromise) {
                        MathJax.typesetPromise(enen.prev());
                        enen.remove();
                        clearInterval(timer);
                    }
                }, 1000);
                break;
        }
    })
    


    
})

// 函数
function toArr(val, arr) {
    if (arr.length) {
        for (var i=0; i<arr.length; i++) {
            if (arr[i] == val) break;
            if (i == arr.length-1) arr.push(val);
        }
    } else {
        arr.push(val);
    }
}

function isClose(origin) {
    if (!origin) return true;
    for (var i=0; i<origin.length; i++) {
        if (origin[i] != ' ') return false;
    }
    return true;
}

function tabClick(tab) {
    var tabIndex = tab.attr('id').slice(10);
    tab.parent().next().children().hide();
    
    $('#tab-content-' + tabIndex).show();
}





