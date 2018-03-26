// created by henryLung on 2018/3/14
import FastClick from 'fastclick'

! function (n) {
  var e = n.document,
    t = e.documentElement,
    i = 1080,
    d = i / 100,
    o = "orientationchange" in n ? "orientationchange" : "resize",
    a = function () {
      var n = t.clientWidth || 320;
      n > 1080 && (n = 1080);
      t.style.fontSize = n / d + "px"
      console.log(t.style.fontSize)
    };
  e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
}(window);
//监听加载状态改变  
document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果  
function completeLoading() {
  if (document.readyState == "complete") {
    document.getElementsByTagName('body')[0].style.visibility = 'visible';
  }
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

