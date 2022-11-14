

$(document).ready(function () {
    
    $(".search-in").click(function() {
        $(".search-root").show();
        $(".search").animate({
            marginTop: 10,
        }, 100, 'linear');
        $('.search input').focus();
    })
    $(".search-zz").click(function() {
        $(".search").css("margin-top", 0);
        $(".search-root").hide();
        document.getElementById("search-key").value = "";
        clearPosts();
    })

    $(".search button").click(function() {
        search(); 
    })
    $(".sclear").click(function() {
        $('#search-key').val('').focus();
        clearPosts();
    })
    window.onload = function() {
        document.onkeydown = function(ev) {
          var event = ev || event
          if (event.keyCode == 13) {
            search();
          }
        }
    }
})

function search() {
    clearPosts();
    var key = document.getElementById("search-key").value;
    var postCount = 0;
    var searchBy = 'Search by <a href="https://github.com/xioyito/NewBee" class="search-by" >NewBee</a>';

    if (!key) {
        $(".stip").html(search_nothing + '，' + searchBy);
        $(".at-bottom").hide();
        $(".sbody").show();
        return;
    }

    for (var i=0; i<postsCount; i++) {
        var postTitle = arrPosts[i].title;
        var postPubDate = arrPosts[i].pubDate;
        var postPlain = arrPosts[i].plain;
        var link = arrPosts[i].link;
        var keyIndex = postPlain.indexOf(key);
        
        if (keyIndex >= 0) {
            var postMark = toMark(postPlain, key);
            postCount ++;

            if (postMark) {
                addItem(hlHtml(postTitle, key), postPubDate, hlHtml(postMark, key), link);
            }

        }
        
    }
    if (postCount == 0) {
        $(".stip").html(search_nothing + '，' + searchBy);
    } else {
        $(".stip").html(search_found + ' ' + postCount + (postCount>1?(' ' + search_results + ', '):(' ' + search_result + ', ')) + searchBy);
        $(".sbody-1").append('<div class="at-bottom">' + search_theEnd + '</div>');
    }
    $(".sbody").show();
}

// 向页面中添加元素
function addItem(title, pubDate, mark, link) {
    var pHtml = "<a href=\"" + link + "\" target=\"_blank\" class=\"post\" >" +
            "<div class=\"post-header\">" +
            "<h4 class=\"post-title\">" + title + "</h4>" +
            "<div class=\"post-time\">" + pubDate + "</div>" +
            "</div>" +
            "<div class=\"post-mark\">" + mark + "</div>" +
            "</a>"
    var div = document.createElement("div");
    div.innerHTML = pHtml;
    div.setAttribute("class", "post-root");
    document.getElementsByClassName('sbody-1')[0].appendChild(div);
}

// 初始化搜索页面
function clearPosts() {
    $(".sbody").hide();
    $(".post-root, .at-bottom").remove();
}

// 截取段落
function toMark(oPlain, key) {
    var kIdx = oPlain.indexOf(key);
    var kLen = key.length;
    var beginIdx = kIdx;
    var postMark_l = '';
    var postMark_r = oPlain.slice(kIdx + kLen, kIdx + kLen + 201);
    
    while ((beginIdx > 0) && (oPlain[beginIdx-1] != ',') && (oPlain[beginIdx-1] != '.') && (oPlain[beginIdx-1] != '，') && (oPlain[beginIdx-1] != '。')) {
        beginIdx -= 1;
        postMark_l = oPlain[beginIdx] + postMark_l;
    }

    if (postMark_l == key) {
        return;
    }

    return postMark_l + key + postMark_r;
     
}

// 高亮关键字
function hlHtml(oMark, key) {
    var text = oMark;
    var newMark = '';
    var keyIdx = text.indexOf(key);
    var keyHtml = "<span class=\"key-hl\">" + key + "</span>";
    while (keyIdx >= 0) {
        newMark = newMark + text.slice(0, keyIdx) + keyHtml;
        text = text.slice(keyIdx + key.length);
        keyIdx = text.indexOf(key);
    }
    return newMark + text;
}

