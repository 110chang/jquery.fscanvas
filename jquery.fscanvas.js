/*!
 * jQuery.FSCanvas r1
 * Auther: Yuji Ito @110chang
 * Licenced under the MIT Licence.
 */

;(function($) {
  // const
  var PLUGIN_NAME = 'FSCanvas';
  var IDENTIFY_NAME = '__plugin_fscanvas';

  // protected varibles
  var screenWidth;
  var screenHeight;

  // protected functions

  // plugin instance base
  function FSCanvas($el) {
    console.log('FSCanvas#constructor');
    this.options = $.extend({}, $.fn.FSCanvas.defaults);
    this.$el = $el.addClass(IDENTIFY_NAME);
    this.ctx = this.$el.get(0).getContext('2d');
    this.dpr = window.devicePixelRatio;

    return this;
  }
  $.extend(FSCanvas.prototype, {
    init: function(options) {
      console.log('FSCanvas#init');
      $.extend(this.options, options || {});

      if (this.options.forceLowDPR) {
        this.dpr = 1;
      }
      this.applySize();

      $(window).on('resize', $.proxy(this.onResize, this));
    },
    onResize: function(e) {
      this.applySize();
    },
    applySize: function() {
      screenWidth = window.innerWidth || document.documentElement.clientWidth;
      screenHeight = window.innerHeight || document.documentElement.clientHeight;

      // Set double value when retina display
      this.$el.attr('width', screenWidth * this.dpr);
      this.$el.attr('height', screenHeight * this.dpr);
      this.ctx.scale(this.dpr, this.dpr);

      // Set display bounds in CSS
      this.$el.width(screenWidth);
      this.$el.height(screenHeight);
    }
  });
  
  $.fn.FSCanvas = function(options) {
    var method, args, instance;
    
    if (typeof options === 'string') {
      method = Array.prototype.shift.call(arguments);
    }
    args = arguments;

    return this.each(function() {
      instance = $(this).data('plugin_' + PLUGIN_NAME);
      
      if (!instance) {
        instance = new FSCanvas($(this));
        $(this).data('plugin_' + PLUGIN_NAME, instance);
      }
      if (method) {
        if (instance[method]) {
          instance[method].apply(instance, args);
        } else {
          $.error('Method ' + method + ' does not exist on jQuery.' + PLUGIN_NAME);
        }
      } else {
        instance.init.apply(instance, args);
      }
    });
  };
  $.fn.FSCanvas.defaults = {
    forceLowDPR: false
  };
}(jQuery));

//