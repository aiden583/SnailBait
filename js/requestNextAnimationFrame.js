window.requestNextAnimationFrame = (function () {
    var originalWebkitRequestAnimationFrame = undefined,
      wrapper = undefined,
      callback = undefined,
      geckoVersion = 0,
      userAgent = navigator.userAgent,
      index = 0,
      self = this;
  
    if (window.webkitRequestAnimationFrame) {
      // 定义wrapper函数
      wrapper = function (time) {
        if (time === undefined) {
          time = +new Date();
        }
        self.callback(time);
      };
  
      // 改变函数调用关系
      originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
      window.webkitRequestAnimationFrame = function (callback, element) {
        self.callback = callback;
  
        //浏览器调用wrapper函数，wrapper函数调用回调函数
        originalWebkitRequestAnimationFrame(wrapper, element);
      };
    }
  
    //解决Gecko2.0内核浏览器bug
    if (window.mozRequestAnimationFrame) {
      index = userAgent.indexOf('rv:');
      if(userAgent.indexOf('Gecko') != -1){
        geckoVersion = userAgent.substr(index + 3, 3);
        if(geckoVersion === '2.0') {
          window.mozRequestAnimationFrame = undefined;
        }
      }
    }
  
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      winsow.msRequestAnimationFrame ||
      function (callback, element) {
        var start, finish;
        window.setTimeout(function () {
          start = +new Date();
          callback(start);
          finish = +new Date();
          self.timeout = 1000 / 60 - (finish - start);
        }, self.timeout);
      }
    );
  })();