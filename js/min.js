var BaseManager = {
  reload: function() {
    document.location.reload(true);
  },
  getElement: function(el) {
    return document.getElementById(el);
  },
  addClass: function(el,name) {
    var class_name = el.className.concat(' '+name);
    el.className = class_name;
  },
  removeClass: function(el,name) {
    var class_name = el.className.replace(name,'');
    el.className = class_name;
  }
};

var StyleManager = {
  select: function() {
    var context,argument,arguments = StyleManager.select.arguments;
    var class_name,select,miss,page_display;

    page_display = function(displays={}) {
      var count=0,display = {
        0:'title',
        1:'head',
        2:'gallery',
        3:'generic',
        4:'half-header',
        5:'full-header',
        6:'full-gallery'
      };
      for (display[count] in displays) {
        BaseManager.getElement(display[count]).style.display = displays[display[count]];
        count++;
      }
      if(displays['gallery'] == "block") {
        BaseManager.getElement('gallery').style.backgroundColor = "#F1F1F1";
        BaseManager.getElement('gallery').children[2].style.marginBottom = "0";
        BaseManager.getElement('full-gallery-button').style.display = 'none';
      }
    };

    context = arguments[0];
    argument = {
      home: function() {
        page_display();
      },
      camera: function() {
        page_display({
          title: 'block',
          head: 'none',
          gallery: 'block',
          generic: 'none',
          'half-header': 'none',
          'full-header': 'flex',
          'full-gallery': 'flex'
        });
      },
      file: function() {
        page_display({
          title: 'block',
          head: 'none',
          gallery: 'none',
          generic: 'flex',
          'full-gallery': 'none'
        });
      },
      all: function() {

      },
      people: function() {

      },
      places: function() {

      },
      things: function() {

      }
    };
    select = BaseManager.getElement(context.id);
    class_name = select.className;

    if(null == class_name.match(/active/)) {
      BaseManager.addClass(select,'active');
      for(var i=1;i<arguments.length;i++) {
        miss = BaseManager.getElement(arguments[i]);
        BaseManager.removeClass(miss,'active');
      }
      if(argument.hasOwnProperty(context.id)) {
        argument[context.id]();
      }
    }
  },
  scroll: function(name) {
    var flag = 0;
    var init = null;

    var timer = function() {
      this.start = function() {
        if(!init) {
          flag = 1;
          init = setInterval(function(){
            scrollBy(0,20);
          },20);
        }
      };
      this.stop = function() {
        if(flag == 1) {
          clearInterval(init);
          flag = 0;
          init = null;
        }
      };
    };

    var timer = new timer();
    var event = function() {
      timer.start();
      setTimeout(function(){
        timer.stop();
        window.location.href = name;
      },550);
    };
    event();
  }
}

var ResponsiveManager = {
  init: function() {
    var page,style,width;

    page = document.getElementsByClassName('page-box');
    style= page[0].style;
    width= screen.width - 54.4;

    style.width = width+"px";
    screen.orientation.lock('portrait');
  }
}

/**
window.addEventListener("resize",function(){
  ResponsiveManager.init();
});
**/
