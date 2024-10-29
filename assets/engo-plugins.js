/* Most used theme JS files*/
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key),
                '=',
                config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };

})(jQuery, document);

/*!
Countdown
*/
jQuery(document).ready(function ($) {

    $.fn.ENGO_CountDown = function (options) {
        return this.each(function () {
            // get instance of the ENGO_CountDown.
            new $.ENGO_CountDown(this, options);
        });
    };
    $.ENGO_CountDown = function (obj, options) {

        this.options = $.extend({
            autoStart: true,
            LeadingZero: true,
            DisplayFormat: '<div><span>%%D%%</span> Days</div><div><span>%%H%%</span> Hours</div><div><span>%%M%%</span> Mins</div><div><span>%%S%%</span> Secs</div>',
            FinishMessage: 'Expired',
            CountActive: true,
            TargetDate: null
        }, options || {});
        if (this.options.TargetDate == null || this.options.TargetDate == '') {
            return;
        }
        this.timer = null;
        this.element = obj;
        this.CountStepper = -1;
        this.CountStepper = Math.ceil(this.CountStepper);
        this.SetTimeOutPeriod = (Math.abs(this.CountStepper) - 1) * 1000 + 990;
        var dthen = new Date(this.options.TargetDate);
        var dnow = new Date();
        if (this.CountStepper > 0) {
            ddiff = new Date(dnow - dthen);
        } else {
            ddiff = new Date(dthen - dnow);
        }
        gsecs = Math.floor(ddiff.valueOf() / 1000);
        this.CountBack(gsecs, this);

    };
    $.ENGO_CountDown.fn = $.ENGO_CountDown.prototype;
    $.ENGO_CountDown.fn.extend = $.ENGO_CountDown.extend = $.extend;
    $.ENGO_CountDown.fn.extend({
        calculateDate: function (secs, num1, num2) {
            var s = ((Math.floor(secs / num1)) % num2).toString();
            if (this.options.LeadingZero && s.length < 2) {
                s = '0' + s;
            }
            return '<b>' + s + '</b>';
        },
        CountBack: function (secs, self) {
            if (secs < 0) {
                self.element.innerHTML = '<div class="labelexpired"> ' + self.options.FinishMessage + '</div>';
                return;
            }
            clearInterval(self.timer);
            DisplayStr = self.options.DisplayFormat.replace(/%%D%%/g, self.calculateDate(secs, 86400, 100000));
            DisplayStr = DisplayStr.replace(/%%H%%/g, self.calculateDate(secs, 3600, 24));
            DisplayStr = DisplayStr.replace(/%%M%%/g, self.calculateDate(secs, 60, 60));
            DisplayStr = DisplayStr.replace(/%%S%%/g, self.calculateDate(secs, 1, 60));
            self.element.innerHTML = DisplayStr;
            if (self.options.CountActive) {
                self.timer = null;
                self.timer = setTimeout(function () {
                    self.CountBack((secs + self.CountStepper), self);
                }, (self.SetTimeOutPeriod));
            }
        }

    });

    $(document).ready(function () {
        /** Countdown **/
        $('[data-countdown="section-countdown"]').each(function (index, el) {
            var $this = $(this);
            var $date = $this.data('date').split('-');
            $this.ENGO_CountDown({
                TargetDate: $date[0] + '/' + $date[1] + '/' + $date[2] + ' ' + $date[3] + ':' + $date[4] + ':' +
                    $date[5],
                DisplayFormat: '<li class="list-inline-item mr-0"> <p class="mb-0">%%D%%</p> <span>day</span> </li> <li class="list-inline-item mr-0"> <p class="mb-0">%%H%%</p> <span>hours</span> </li> <li class="list-inline-item mr-0"> <p class="mb-0">%%M%%</p> <span>mins</span> </li> <li class="list-inline-item mr-0"> <p class="mb-0">%%S%%</p> <span>secs</span> </li>',
                FinishMessage: 'Expired'
            });
        });
    });

    $(document).ready(function () {
        /** Countdown **/
        $('[data-countdown="section-countdown-v2"]').each(function (index, el) {
            var $this = $(this);
            var $date = $this.data('date').split('-');
            $this.ENGO_CountDown({
                TargetDate: $date[0] + '/' + $date[1] + '/' + $date[2] + ' ' + $date[3] + ':' + $date[4] + ':' +
                    $date[5],
                DisplayFormat: '<li class="list-inline-item mr-0"> <p class="mb-0">%%D%%</p> <span>day</span> </li> <li class="list-inline-item mr-0"> <p class="mb-0">%%H%%</p> <span>hours</span> </li> <li class="list-inline-item mr-0"> <p class="mb-0">%%M%%</p> <span>mins</span> </li> <li class="list-inline-item mr-0"> <p class="mb-0">%%S%%</p> <span>secs</span> </li>',
                FinishMessage: 'Expired'
            });
        });
    });

    // <div data-countdown="countdown" data-date="08-20-2016 10:20:30"></div>
    $(document).ready(function () {
        /** Countdown **/
        $('[data-countdown="countdown"]').each(function (index, el) {
            var $this = $(this);
            var $date = $this.data('date').split('-');
            $this.ENGO_CountDown({
                TargetDate: $date[0] + '/' + $date[1] + '/' + $date[2] + ' ' + $date[3] + ':' + $date[4] + ':' +
                    $date[5],
                DisplayFormat: '<div class="countdown-times"><div class="day distance"><div class=\'number\'>%%D%%</div> <div class=\'text\'>days </div></div><div class="hours distance"><div class=\'number\'>%%H%%</div><div class=\'text\'> <div class=\'text\'>hours </div></div></div><div class="minutes distance"><div class=\'number\'>%%M%%</div><div class=\'text\'> mins</div> </div><div class="seconds distance"><div class=\'number\'>%%S%%</div> <div class=\'text\'>secs</div> </div></div>',
                FinishMessage: 'Expired'
            });
        });
    });

    $(document).ready(function () {
        /** Countdown **/
        $('[data-countdown="countdown-hd-1"]').each(function (index, el) {
            var $this = $(this);
            var $date = $this.data('date').split('-');
            $this.ENGO_CountDown({
                TargetDate: $date[0] + '/' + $date[1] + '/' + $date[2] + ' ' + $date[3] + ':' + $date[4] + ':' +
                    $date[5],
                DisplayFormat: '<div class="countdown-times"><div class="day distance"><div class=\'number\'>%%D%%</div> <div class=\'text\'>days </div></div><div class="hours distance"><div class=\'number\'>%%H%%</div><div class=\'text\'> <div class=\'text\'>hours </div></div></div><div class="minutes distance"><div class=\'number\'>%%M%%</div><div class=\'text\'> mins</div> </div><div class="seconds distance"><div class=\'number\'>%%S%%</div> <div class=\'text\'>secs</div> </div></div>',
                FinishMessage: 'Expired'
            });
        });
    });

    $(document).ready(function () {
        /** Countdown **/
        $('[data-countdown="countdown-hd-2"]').each(function (index, el) {
            var $this = $(this);
            var $date = $this.data('date').split('-');
            $this.ENGO_CountDown({
                TargetDate: $date[0] + '/' + $date[1] + '/' + $date[2] + ' ' + $date[3] + ':' + $date[4] + ':' +
                    $date[5],
                DisplayFormat: '<div class="countdown-times"><div class="day distance"><div class=\'number\'>%%D%%</div> <div class=\'text\'>days </div></div><div class="hours distance"><div class=\'number\'>%%H%%</div><div class=\'text\'> <div class=\'text\'>hours </div></div></div><div class="minutes distance"><div class=\'number\'>%%M%%</div><div class=\'text\'> mins</div> </div><div class="seconds distance"><div class=\'number\'>%%S%%</div> <div class=\'text\'>secs</div> </div></div>',
                FinishMessage: 'Expired'
            });
        });
    });

    $(document).ready(function () {
        /** Countdown **/
        $('[data-countdown="countdown-hd-3"]').each(function (index, el) {
            var $this = $(this);
            var $date = $this.data('date').split('-');
            $this.ENGO_CountDown({
                TargetDate: $date[0] + '/' + $date[1] + '/' + $date[2] + ' ' + $date[3] + ':' + $date[4] + ':' +
                    $date[5],
                DisplayFormat: '<div class="countdown-times"><div class="day distance"><div class=\'number\'>%%D%%</div> <div class=\'text\'>days </div></div><div class="hours distance"><div class=\'number\'>%%H%%</div><div class=\'text\'> <div class=\'text\'>hours </div></div></div><div class="minutes distance"><div class=\'number\'>%%M%%</div><div class=\'text\'> mins</div> </div><div class="seconds distance"><div class=\'number\'>%%S%%</div> <div class=\'text\'>secs</div> </div></div>',
                FinishMessage: 'Expired'
            });
        });
    });

    $(document).ready(function () {
        /** Countdown **/
        $('[data-countdown="countdown-v1"]').each(function (index, el) {
            var $this = $(this);
            var $date = $this.data('date').split('-');
            $this.ENGO_CountDown({
                TargetDate: $date[0] + '/' + $date[1] + '/' + $date[2] + ' ' + $date[3] + ':' + $date[4] + ':' +
                    $date[5],
                DisplayFormat: '<li><span id="days">%%D%%</span>Days</li><li><span id="hours">%%H%%</span>Hours</li><li><span id="minutes">%%M%%</span>Mins</li><li><span id="seconds">%%S%%</span>Sec</li>',
                FinishMessage: 'Expired'
            });
        });
    });

});

/* owl.carousel.min.js
 -----------------------------------------------------------------------------------------------*/
/*
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this.drag=a.extend({},m),this.state=a.extend({},n),this.e=a.extend({},o),this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._invalidated={},this._pipe=[],a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a[0].toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Pipe,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}function f(a){if(a.touches!==d)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(a.touches===d){if(a.pageX!==d)return{x:a.pageX,y:a.pageY};if(a.pageX===d)return{x:a.clientX,y:a.clientY}}}function g(a){var b,d,e=c.createElement("div"),f=a;for(b in f)if(d=f[b],"undefined"!=typeof e.style[d])return e=null,[d,b];return[!1]}function h(){return g(["transition","WebkitTransition","MozTransition","OTransition"])[1]}function i(){return g(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]}function j(){return g(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]}function k(){return"ontouchstart"in b||!!navigator.msMaxTouchPoints}function l(){return b.navigator.msPointerEnabled}var m,n,o;m={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,offsetX:0,offsetY:0,distance:null,startTime:0,endTime:0,updatedX:0,targetEl:null},n={isTouch:!1,isScrolling:!1,isSwiping:!1,direction:!1,inMotion:!1},o={_onDragStart:null,_onDragMove:null,_onDragEnd:null,_transitionEnd:null,_resizer:null,_responsiveCall:null,_goToLoop:null,_checkVisibile:null},e.Defaults={items:3,loop:!1,center:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,responsiveClass:!1,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",themeClass:"owl-theme",baseClass:"owl-carousel",itemClass:"owl-item",centerClass:"center",activeClass:"active"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Plugins={},e.Pipe=[{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){var a=this._clones,b=this.$stage.children(".cloned");(b.length!==a.length||!this.settings.loop&&a.length>0)&&(this.$stage.children(".cloned").remove(),this._clones=[])}},{filter:["items","settings"],run:function(){var a,b,c=this._clones,d=this._items,e=this.settings.loop?c.length-Math.max(2*this.settings.items,4):0;for(a=0,b=Math.abs(e/2);b>a;a++)e>0?(this.$stage.children().eq(d.length+c.length-1).remove(),c.pop(),this.$stage.children().eq(0).remove(),c.pop()):(c.push(c.length/2),this.$stage.append(d[c[c.length-1]].clone().addClass("cloned")),c.push(d.length-1-(c.length-1)/2),this.$stage.prepend(d[c[c.length-1]].clone().addClass("cloned")))}},{filter:["width","items","settings"],run:function(){var a,b,c,d=this.settings.rtl?1:-1,e=(this.width()/this.settings.items).toFixed(3),f=0;for(this._coordinates=[],b=0,c=this._clones.length+this._items.length;c>b;b++)a=this._mergers[this.relative(b)],a=this.settings.mergeFit&&Math.min(a,this.settings.items)||a,f+=(this.settings.autoWidth?this._items[this.relative(b)].width()+this.settings.margin:e*a)*d,this._coordinates.push(f)}},{filter:["width","items","settings"],run:function(){var b,c,d=(this.width()/this.settings.items).toFixed(3),e={width:Math.abs(this._coordinates[this._coordinates.length-1])+2*this.settings.stagePadding,"padding-left":this.settings.stagePadding||"","padding-right":this.settings.stagePadding||""};if(this.$stage.css(e),e={width:this.settings.autoWidth?"auto":d-this.settings.margin},e[this.settings.rtl?"margin-left":"margin-right"]=this.settings.margin,!this.settings.autoWidth&&a.grep(this._mergers,function(a){return a>1}).length>0)for(b=0,c=this._coordinates.length;c>b;b++)e.width=Math.abs(this._coordinates[b])-Math.abs(this._coordinates[b-1]||0)-this.settings.margin,this.$stage.children().eq(b).css(e);else this.$stage.children().css(e)}},{filter:["width","items","settings"],run:function(a){a.current&&this.reset(this.$stage.children().index(a.current))}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children("."+this.settings.activeClass).removeClass(this.settings.activeClass),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass(this.settings.activeClass),this.settings.center&&(this.$stage.children("."+this.settings.centerClass).removeClass(this.settings.centerClass),this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))}}],e.prototype.initialize=function(){if(this.trigger("initialize"),this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl",this.settings.rtl),this.browserSupport(),this.settings.autoWidth&&this.state.imagesLoaded!==!0){var b,c,e;if(b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e)return this.preloadAutoWidthImages(b),!1}this.$element.addClass("owl-loading"),this.$stage=a("<"+this.settings.stageElement+' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this._width=this.$element.width(),this.refresh(),this.$element.removeClass("owl-loading").addClass("owl-loaded"),this.eventsCall(),this.internalEvents(),this.addTriggerableEvents(),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),delete e.responsive,e.responsiveClass&&this.$element.attr("class",function(a,b){return b.replace(/\b owl-responsive-\S+/g,"")}).addClass("owl-responsive-"+d)):e=a.extend({},this.options),(null===this.settings||this._breakpoint!==d)&&(this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}}))},e.prototype.optionsLogic=function(){this.$element.toggleClass("owl-center",this.settings.center),this.settings.loop&&this._items.length<this.settings.items&&(this.settings.loop=!1),this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.settings.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={}},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){if(0===this._items.length)return!1;(new Date).getTime();this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$stage.addClass("owl-refresh"),this.update(),this.$stage.removeClass("owl-refresh"),this.state.orientation=b.orientation,this.watchVisibility(),this.trigger("refreshed")},e.prototype.eventsCall=function(){this.e._onDragStart=a.proxy(function(a){this.onDragStart(a)},this),this.e._onDragMove=a.proxy(function(a){this.onDragMove(a)},this),this.e._onDragEnd=a.proxy(function(a){this.onDragEnd(a)},this),this.e._onResize=a.proxy(function(a){this.onResize(a)},this),this.e._transitionEnd=a.proxy(function(a){this.transitionEnd(a)},this),this.e._preventClick=a.proxy(function(a){this.preventClick(a)},this)},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this.e._onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.trigger("resize").isDefaultPrevented()?!1:(this._width=this.$element.width(),this.invalidate("width"),this.refresh(),void this.trigger("resized")):!1},e.prototype.eventsRouter=function(a){var b=a.type;"mousedown"===b||"touchstart"===b?this.onDragStart(a):"mousemove"===b||"touchmove"===b?this.onDragMove(a):"mouseup"===b||"touchend"===b?this.onDragEnd(a):"touchcancel"===b&&this.onDragEnd(a)},e.prototype.internalEvents=function(){var c=(k(),l());this.settings.mouseDrag?(this.$stage.on("mousedown",a.proxy(function(a){this.eventsRouter(a)},this)),this.$stage.on("dragstart",function(){return!1}),this.$stage.get(0).onselectstart=function(){return!1}):this.$element.addClass("owl-text-select-on"),this.settings.touchDrag&&!c&&this.$stage.on("touchstart touchcancel",a.proxy(function(a){this.eventsRouter(a)},this)),this.transitionEndVendor&&this.on(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd,!1),this.settings.responsive!==!1&&this.on(b,"resize",a.proxy(this.onThrottledResize,this))},e.prototype.onDragStart=function(d){var e,g,h,i;if(e=d.originalEvent||d||b.event,3===e.which||this.state.isTouch)return!1;if("mousedown"===e.type&&this.$stage.addClass("owl-grab"),this.trigger("drag"),this.drag.startTime=(new Date).getTime(),this.speed(0),this.state.isTouch=!0,this.state.isScrolling=!1,this.state.isSwiping=!1,this.drag.distance=0,g=f(e).x,h=f(e).y,this.drag.offsetX=this.$stage.position().left,this.drag.offsetY=this.$stage.position().top,this.settings.rtl&&(this.drag.offsetX=this.$stage.position().left+this.$stage.width()-this.width()+this.settings.margin),this.state.inMotion&&this.support3d)i=this.getTransformProperty(),this.drag.offsetX=i,this.animate(i),this.state.inMotion=!0;else if(this.state.inMotion&&!this.support3d)return this.state.inMotion=!1,!1;this.drag.startX=g-this.drag.offsetX,this.drag.startY=h-this.drag.offsetY,this.drag.start=g-this.drag.startX,this.drag.targetEl=e.target||e.srcElement,this.drag.updatedX=this.drag.start,("IMG"===this.drag.targetEl.tagName||"A"===this.drag.targetEl.tagName)&&(this.drag.targetEl.draggable=!1),a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",a.proxy(function(a){this.eventsRouter(a)},this))},e.prototype.onDragMove=function(a){var c,e,g,h,i,j;this.state.isTouch&&(this.state.isScrolling||(c=a.originalEvent||a||b.event,e=f(c).x,g=f(c).y,this.drag.currentX=e-this.drag.startX,this.drag.currentY=g-this.drag.startY,this.drag.distance=this.drag.currentX-this.drag.offsetX,this.drag.distance<0?this.state.direction=this.settings.rtl?"right":"left":this.drag.distance>0&&(this.state.direction=this.settings.rtl?"left":"right"),this.settings.loop?this.op(this.drag.currentX,">",this.coordinates(this.minimum()))&&"right"===this.state.direction?this.drag.currentX-=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length):this.op(this.drag.currentX,"<",this.coordinates(this.maximum()))&&"left"===this.state.direction&&(this.drag.currentX+=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length)):(h=this.coordinates(this.settings.rtl?this.maximum():this.minimum()),i=this.coordinates(this.settings.rtl?this.minimum():this.maximum()),j=this.settings.pullDrag?this.drag.distance/5:0,this.drag.currentX=Math.max(Math.min(this.drag.currentX,h+j),i+j)),(this.drag.distance>8||this.drag.distance<-8)&&(c.preventDefault!==d?c.preventDefault():c.returnValue=!1,this.state.isSwiping=!0),this.drag.updatedX=this.drag.currentX,(this.drag.currentY>16||this.drag.currentY<-16)&&this.state.isSwiping===!1&&(this.state.isScrolling=!0,this.drag.updatedX=this.drag.start),this.animate(this.drag.updatedX)))},e.prototype.onDragEnd=function(b){var d,e,f;if(this.state.isTouch){if("mouseup"===b.type&&this.$stage.removeClass("owl-grab"),this.trigger("dragged"),this.drag.targetEl.removeAttribute("draggable"),this.state.isTouch=!1,this.state.isScrolling=!1,this.state.isSwiping=!1,0===this.drag.distance&&this.state.inMotion!==!0)return this.state.inMotion=!1,!1;this.drag.endTime=(new Date).getTime(),d=this.drag.endTime-this.drag.startTime,e=Math.abs(this.drag.distance),(e>3||d>300)&&this.removeClick(this.drag.targetEl),f=this.closest(this.drag.updatedX),this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(f),this.invalidate("position"),this.update(),this.settings.pullDrag||this.drag.updatedX!==this.coordinates(f)||this.transitionEnd(),this.drag.distance=0,a(c).off(".owl.dragEvents")}},e.prototype.removeClick=function(c){this.drag.targetEl=c,a(c).on("click.preventClick",this.e._preventClick),b.setTimeout(function(){a(c).off("click.preventClick")},300)},e.prototype.preventClick=function(b){b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation&&b.stopPropagation(),a(b.target).off("click.preventClick")},e.prototype.getTransformProperty=function(){var a,c;return a=b.getComputedStyle(this.$stage.get(0),null).getPropertyValue(this.vendorName+"transform"),a=a.replace(/matrix(3d)?\(|\)/g,"").split(","),c=16===a.length,c!==!0?a[4]:a[12]},e.prototype.closest=function(b){var c=-1,d=30,e=this.width(),f=this.coordinates();return this.settings.freeDrag||a.each(f,a.proxy(function(a,g){return b>g-d&&g+d>b?c=a:this.op(b,"<",g)&&this.op(b,">",f[a+1]||g-e)&&(c="left"===this.state.direction?a+1:a),-1===c},this)),this.settings.loop||(this.op(b,">",f[this.minimum()])?c=b=this.minimum():this.op(b,"<",f[this.maximum()])&&(c=b=this.maximum())),c},e.prototype.animate=function(b){this.trigger("translate"),this.state.inMotion=this.speed()>0,this.support3d?this.$stage.css({transform:"translate3d("+b+"px,0px, 0px)",transition:this.speed()/1e3+"s"}):this.state.isTouch?this.$stage.css({left:b+"px"}):this.$stage.animate({left:b},this.speed()/1e3,this.settings.fallbackEasing,a.proxy(function(){this.state.inMotion&&this.transitionEnd()},this))},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(a){this._invalidated[a]=!0},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(b,c){var e=c?this._items.length:this._items.length+this._clones.length;return!a.isNumeric(b)||1>e?d:b=this._clones.length?(b%e+e)%e:Math.max(this.minimum(c),Math.min(this.maximum(c),b))},e.prototype.relative=function(a){return a=this.normalize(a),a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=0,f=this.settings;if(a)return this._items.length-1;if(!f.loop&&f.center)b=this._items.length-1;else if(f.loop||f.center)if(f.loop||f.center)b=this._items.length+f.items;else{if(!f.autoWidth&&!f.merge)throw"Can not detect maximum absolute position.";for(revert=f.rtl?1:-1,c=this.$stage.width()-this.$element.width();(d=this.coordinates(e))&&!(d*revert>=c);)b=++e}else b=this._items.length-f.items;return b},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c=null;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)):c=this._coordinates[b-1]||0,c)},e.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(c,d){if(this.settings.loop){var e=c-this.relative(this.current()),f=this.current(),g=this.current(),h=this.current()+e,i=0>g-h?!0:!1,j=this._clones.length+this._items.length;h<this.settings.items&&i===!1?(f=g+this._items.length,this.reset(f)):h>=j-this.settings.items&&i===!0&&(f=g-this._items.length,this.reset(f)),b.clearTimeout(this.e._goToLoop),this.e._goToLoop=b.setTimeout(a.proxy(function(){this.speed(this.duration(this.current(),f+e,d)),this.current(f+e),this.update()},this),30)}else this.speed(this.duration(this.current(),c,d)),this.current(c),this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.transitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.state.inMotion=!1,void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)},this)),this.reset(a.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(a,b){b=b===d?this._items.length:this.normalize(b,!0),this.trigger("add",{content:a,position:b}),0===this._items.length||b===this._items.length?(this.$stage.append(a),this._items.push(a),this._mergers.push(1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)):(this._items[b].before(a),this._items.splice(b,0,a),this._mergers.splice(b,0,1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)),this.invalidate("items"),this.trigger("added",{content:a,position:b})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.addTriggerableEvents=function(){var b=a.proxy(function(b,c){return a.proxy(function(a){a.relatedTarget!==this&&(this.suppress([c]),b.apply(this,[].slice.call(arguments,1)),this.release([c]))},this)},this);a.each({next:this.next,prev:this.prev,to:this.to,destroy:this.destroy,refresh:this.refresh,replace:this.replace,add:this.add,remove:this.remove},a.proxy(function(a,c){this.$element.on(a+".owl.carousel",b(c,a+".owl.carousel"))},this))},e.prototype.watchVisibility=function(){function c(a){return a.offsetWidth>0&&a.offsetHeight>0}function d(){c(this.$element.get(0))&&(this.$element.removeClass("owl-hidden"),this.refresh(),b.clearInterval(this.e._checkVisibile))}c(this.$element.get(0))||(this.$element.addClass("owl-hidden"),b.clearInterval(this.e._checkVisibile),this.e._checkVisibile=b.setInterval(a.proxy(d,this),500))},e.prototype.preloadAutoWidthImages=function(b){var c,d,e,f;c=0,d=this,b.each(function(g,h){e=a(h),f=new Image,f.onload=function(){c++,e.attr("src",f.src),e.css("opacity",1),c>=b.length&&(d.state.imagesLoaded=!0,d.initialize())},f.src=e.attr("src")||e.attr("data-src")||e.attr("data-src-retina")})},e.prototype.destroy=function(){this.$element.hasClass(this.settings.themeClass)&&this.$element.removeClass(this.settings.themeClass),this.settings.responsive!==!1&&a(b).off("resize.owl.carousel"),this.transitionEndVendor&&this.off(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd);for(var d in this._plugins)this._plugins[d].destroy();(this.settings.mouseDrag||this.settings.touchDrag)&&(this.$stage.off("mousedown touchstart touchcancel"),a(c).off(".owl.dragEvents"),this.$stage.get(0).onselectstart=function(){},this.$stage.off("dragstart",function(){return!1})),this.$element.off(".owl"),this.$stage.children(".cloned").remove(),this.e=null,this.$element.removeData("owlCarousel"),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.unwrap()},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d){var e={item:{count:this._items.length,index:this.current()}},f=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),g=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},e,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(g)}),this.$element.trigger(g),this.settings&&"function"==typeof this.settings[f]&&this.settings[f].apply(this,g)),g},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.browserSupport=function(){if(this.support3d=j(),this.support3d){this.transformVendor=i();var a=["transitionend","webkitTransitionEnd","transitionend","oTransitionEnd"];this.transitionEndVendor=a[h()],this.vendorName=this.transformVendor.replace(/Transform/i,""),this.vendorName=""!==this.vendorName?"-"+this.vendorName.toLowerCase()+"-":""}this.state.orientation=b.orientation},a.fn.owlCarousel=function(b){return this.each(function(){a(this).data("owlCarousel")||a(this).data("owlCarousel",new e(this,b))})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b){var c=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,d=c.center&&Math.ceil(c.items/2)||c.items,e=c.center&&-1*d||0,f=(b.property&&b.property.value||this._core.current())+e,g=this._core.clones().length,h=a.proxy(function(a,b){this.load(b)},this);e++<d;)this.load(g/2+this._core.relative(f)),g&&a.each(this._core.clones(this._core.relative(f++)),h)},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this._core.$element.on(this._handlers)};c.Defaults={lazyLoad:!1},c.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},c.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=c}(window.Zepto||window.jQuery,window,document),function(a){var b=function(c){this._core=c,this._handlers={"initialized.owl.carousel":a.proxy(function(){this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass)===this._core.$stage.children().eq(this._core.current())&&this.update()},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this._core.$element.on(this._handlers)};b.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},b.prototype.update=function(){this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)},b.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=b}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this._core=b,this._videos={},this._playing=null,this._fullscreen=!1,this._handlers={"resize.owl.carousel":a.proxy(function(a){this._core.settings.video&&!this.isInFullScreen()&&a.preventDefault()},this),"refresh.owl.carousel changed.owl.carousel":a.proxy(function(){this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))},this)},this._core.options=a.extend({},d.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};d.Defaults={video:!1,videoHeight:!1,videoWidth:!1},d.prototype.fetch=function(a,b){var c=a.attr("data-vimeo-id")?"vimeo":"youtube",d=a.attr("data-vimeo-id")||a.attr("data-youtube-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else{if(!(d[3].indexOf("vimeo")>-1))throw new Error("Video URL not supported.");c="vimeo"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},d.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="http://img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type&&a.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}))},d.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null},d.prototype.play=function(b){this._core.trigger("play",null,"video"),this._playing&&this.stop();var c,d,e=a(b.target||b.srcElement),f=e.closest("."+this._core.settings.itemClass),g=this._videos[f.attr("data-video")],h=g.width||"100%",i=g.height||this._core.$stage.height();"youtube"===g.type?c='<iframe width="'+h+'" height="'+i+'" src="http://www.youtube.com/embed/'+g.id+"?autoplay=1&v="+g.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===g.type&&(c='<iframe src="http://player.vimeo.com/video/'+g.id+'?autoplay=1" width="'+h+'" height="'+i+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),f.addClass("owl-video-playing"),this._playing=f,d=a('<div style="height:'+i+"px; width:"+h+'px" class="owl-video-frame">'+c+"</div>"),e.after(d)},d.prototype.isInFullScreen=function(){var d=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return d&&a(d).parent().hasClass("owl-video-frame")&&(this._core.speed(0),this._fullscreen=!0),d&&this._fullscreen&&this._playing?!1:this._fullscreen?(this._fullscreen=!1,!1):this._playing&&this._core.state.orientation!==b.orientation?(this._core.state.orientation=b.orientation,!1):!0},d.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=d}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){this.swapping="translated"==a.type},this),"translate.owl.carousel":a.proxy(function(){this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&this.core.support3d){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c)),f&&e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.transitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this.core=b,this.core.options=a.extend({},d.Defaults,this.core.options),this.handlers={"translated.owl.carousel refreshed.owl.carousel":a.proxy(function(){this.autoplay()
},this),"play.owl.autoplay":a.proxy(function(a,b,c){this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(){this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.autoplay()},this)},this.core.$element.on(this.handlers)};d.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},d.prototype.autoplay=function(){this.core.settings.autoplay&&!this.core.state.videoPlay?(b.clearInterval(this.interval),this.interval=b.setInterval(a.proxy(function(){this.play()},this),this.core.settings.autoplayTimeout)):b.clearInterval(this.interval)},d.prototype.play=function(){return c.hidden===!0||this.core.state.isTouch||this.core.state.isScrolling||this.core.state.isSwiping||this.core.state.inMotion?void 0:this.core.settings.autoplay===!1?void b.clearInterval(this.interval):void this.core.next(this.core.settings.autoplaySpeed)},d.prototype.stop=function(){b.clearInterval(this.interval)},d.prototype.pause=function(){b.clearInterval(this.interval)},d.prototype.destroy=function(){var a,c;b.clearInterval(this.interval);for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=d}(window.Zepto||window.jQuery,window,document),function(a){"use strict";var b=function(c){this._core=c,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"add.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.splice(b.position,0,a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"remove.owl.carousel prepared.owl.carousel":a.proxy(function(a){this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"change.owl.carousel":a.proxy(function(a){if("position"==a.property.name&&!this._core.state.revert&&!this._core.settings.loop&&this._core.settings.navRewind){var b=this._core.current(),c=this._core.maximum(),d=this._core.minimum();a.data=a.property.value>c?b>=c?d:c:a.property.value<d?c:a.property.value}},this),"changed.owl.carousel":a.proxy(function(a){"position"==a.property.name&&this.draw()},this),"refreshed.owl.carousel":a.proxy(function(){this._initialized||(this.initialize(),this._initialized=!0),this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation")},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this.$element.on(this._handlers)};b.Defaults={nav:!1,navRewind:!0,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotData:!1,dotsSpeed:!1,dotsContainer:!1,controlsClass:"owl-controls"},b.prototype.initialize=function(){var b,c,d=this._core.settings;d.dotsData||(this._templates=[a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]),d.navContainer&&d.dotsContainer||(this._controls.$container=a("<div>").addClass(d.controlsClass).appendTo(this.$element)),this._controls.$indicators=d.dotsContainer?a(d.dotsContainer):a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container),this._controls.$indicators.on("click","div",a.proxy(function(b){var c=a(b.target).parent().is(this._controls.$indicators)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(c,d.dotsSpeed)},this)),b=d.navContainer?a(d.navContainer):a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container),this._controls.$next=a("<"+d.navElement+">"),this._controls.$previous=this._controls.$next.clone(),this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click",a.proxy(function(){this.prev(d.navSpeed)},this)),this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click",a.proxy(function(){this.next(d.navSpeed)},this));for(c in this._overrides)this._core[c]=a.proxy(this[c],this)},b.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},b.prototype.update=function(){var a,b,c,d=this._core.settings,e=this._core.clones().length/2,f=e+this._core.items().length,g=d.center||d.autoWidth||d.dotData?1:d.dotsEach||d.items;if("page"!==d.slideBy&&(d.slideBy=Math.min(d.slideBy,d.items)),d.dots||"page"==d.slideBy)for(this._pages=[],a=e,b=0,c=0;f>a;a++)(b>=g||0===b)&&(this._pages.push({start:a-e,end:a-e+g-1}),b=0,++c),b+=this._core.mergers(this._core.relative(a))},b.prototype.draw=function(){var b,c,d="",e=this._core.settings,f=(this._core.$stage.children(),this._core.relative(this._core.current()));if(!e.nav||e.loop||e.navRewind||(this._controls.$previous.toggleClass("disabled",0>=f),this._controls.$next.toggleClass("disabled",f>=this._core.maximum())),this._controls.$previous.toggle(e.nav),this._controls.$next.toggle(e.nav),e.dots){if(b=this._pages.length-this._controls.$indicators.children().length,e.dotData&&0!==b){for(c=0;c<this._controls.$indicators.children().length;c++)d+=this._templates[this._core.relative(c)];this._controls.$indicators.html(d)}else b>0?(d=new Array(b+1).join(this._templates[0]),this._controls.$indicators.append(d)):0>b&&this._controls.$indicators.children().slice(b).remove();this._controls.$indicators.find(".active").removeClass("active"),this._controls.$indicators.children().eq(a.inArray(this.current(),this._pages)).addClass("active")}this._controls.$indicators.toggle(e.dots)},b.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotData?1:c.dotsEach||c.items)}},b.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,function(a){return a.start<=b&&a.end>=b}).pop()},b.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},b.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},b.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},b.prototype.to=function(b,c,d){var e;d?a.proxy(this._overrides.to,this._core)(b,c):(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c))},a.fn.owlCarousel.Constructor.Plugins.Navigation=b}(window.Zepto||window.jQuery,window,document),function(a,b){"use strict";var c=function(d){this._core=d,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(){"URLHash"==this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");this._hashes[c]=b.content},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(){var a=b.location.hash.substring(1),c=this._core.$stage.children(),d=this._hashes[a]&&c.index(this._hashes[a])||0;return a?void this._core.to(d,!1,!0):!1},this))};c.Defaults={URLhashListener:!1},c.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=c}(window.Zepto||window.jQuery,window,document);
*/

/*!
History
*/
typeof JSON != 'object' && (JSON = {}), function () {
    'use strict';

    function f(e) {return e < 10 ? '0' + e : e;}

    function quote(e) {
        return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
            var t = meta[e];
            return typeof t == 'string' ? t : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + e + '"';
    }

    function str(e, t) {
        var n, r, i, s, o = gap, u, a = t[e];
        a && typeof a == 'object' && typeof a.toJSON == 'function' && (a = a.toJSON(e)), typeof rep == 'function' &&
        (a = rep.call(t, e, a));
        switch (typeof a) {
            case'string':
                return quote(a);
            case'number':
                return isFinite(a) ? String(a) : 'null';
            case'boolean':
            case'null':
                return String(a);
            case'object':
                if (!a) return 'null';
                gap += indent, u = [];
                if (Object.prototype.toString.apply(a) === '[object Array]') {
                    s = a.length;
                    for (n = 0; n < s; n += 1) u[n] = str(n, a) || 'null';
                    return i = u.length === 0 ? '[]' : gap ? '[\n' + gap + u.join(',\n' + gap) + '\n' + o + ']' : '[' +
                        u.join(',') + ']', gap = o, i;
                }
                if (rep && typeof rep == 'object') {
                    s = rep.length;
                    for (n = 0; n < s; n += 1) typeof rep[n] == 'string' &&
                    (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ': ' : ':') + i));
                } else for (r in a) Object.prototype.hasOwnProperty.call(a, r) &&
                (i = str(r, a), i && u.push(quote(r) + (gap ? ': ' : ':') + i));
                return i = u.length === 0 ? '{}' : gap ? '{\n' + gap + u.join(',\n' + gap) + '\n' + o + '}' : '{' +
                    u.join(',') + '}', gap = o, i;
        }
    }

    typeof Date.prototype.toJSON != 'function' && (Date.prototype.toJSON = function (e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' +
            f(this.getUTCSeconds()) + 'Z' : null;
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {return this.valueOf();});
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent,
        meta = { '\b': '\\b', '	': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep;
    typeof JSON.stringify != 'function' && (JSON.stringify = function (e, t, n) {
        var r;
        gap = '', indent = '';
        if (typeof n == 'number') for (r = 0; r < n; r += 1) indent += ' '; else typeof n == 'string' && (indent = n);
        rep = t;
        if (!t || typeof t == 'function' || typeof t == 'object' && typeof t.length == 'number') return str('',
            { '': e });
        throw new Error('JSON.stringify');
    }), typeof JSON.parse != 'function' && (JSON.parse = function (text, reviver) {
        function walk(e, t) {
            var n, r, i = e[t];
            if (i && typeof i == 'object') for (n in i) Object.prototype.hasOwnProperty.call(i, n) &&
            (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
            return reviver.call(e, t, i);
        }

        var j;
        text = String(text), cx.lastIndex = 0, cx.test(text) &&
        (text = text.replace(cx, function (e) {return '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);}));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) return j = eval('(' + text + ')'), typeof reviver == 'function'
            ? walk({ '': j }, '')
            : j;
        throw new SyntaxError('JSON.parse');
    });
}(), function (e, t) {
    'use strict';
    var n = e.History = e.History || {}, r = e.jQuery;
    if (typeof n.Adapter != 'undefined') throw new Error('History.js Adapter has already been loaded...');
    n.Adapter = {
        bind: function (e, t, n) {r(e).bind(t, n);},
        trigger: function (e, t, n) {r(e).trigger(t, n);},
        extractEventData: function (e, n, r) {
            var i = n && n.originalEvent && n.originalEvent[e] || r && r[e] || t;
            return i;
        },
        onDomLoad: function (e) {r(e);}
    }, typeof n.init != 'undefined' && n.init();
}(window), function (e, t) {
    'use strict';
    var n = e.document, r = e.setTimeout || r, i = e.clearTimeout || i, s = e.setInterval || s,
        o = e.History = e.History || {};
    if (typeof o.initHtml4 != 'undefined') throw new Error('History.js HTML4 Support has already been loaded...');
    o.initHtml4 = function () {
        if (typeof o.initHtml4.initialized != 'undefined') return !1;
        o.initHtml4.initialized = !0, o.enabled = !0, o.savedHashes = [], o.isLastHash = function (e) {
            var t = o.getHashByIndex(), n;
            return n = e === t, n;
        }, o.isHashEqual = function (e, t) {
            return e = encodeURIComponent(e).
                replace(/%25/g, '%'), t = encodeURIComponent(t).replace(/%25/g, '%'), e === t;
        }, o.saveHash = function (e) {
            return o.isLastHash(e) ? !1 : (o.savedHashes.push(e), !0);
        }, o.getHashByIndex = function (e) {
            var t = null;
            return typeof e == 'undefined' ? t = o.savedHashes[o.savedHashes.length - 1] : e < 0
                ? t = o.savedHashes[o.savedHashes.length + e]
                : t = o.savedHashes[e], t;
        }, o.discardedHashes = {}, o.discardedStates = {}, o.discardState = function (
            e, t, n) {
            var r = o.getHashByState(e), i;
            return i = { discardedState: e, backState: n, forwardState: t }, o.discardedStates[r] = i, !0;
        }, o.discardHash = function (e, t, n) {
            var r = { discardedHash: e, backState: n, forwardState: t };
            return o.discardedHashes[e] = r, !0;
        }, o.discardedState = function (e) {
            var t = o.getHashByState(e), n;
            return n = o.discardedStates[t] || !1, n;
        }, o.discardedHash = function (e) {
            var t = o.discardedHashes[e] || !1;
            return t;
        }, o.recycleState = function (e) {
            var t = o.getHashByState(e);
            return o.discardedState(e) && delete o.discardedStates[t], !0;
        }, o.emulated.hashChange && (o.hashChangeInit = function () {
            o.checkerFunction = null;
            var t = '', r, i, u, a, f = Boolean(o.getHash());
            return o.isInternetExplorer() ? (r = 'historyjs-iframe', i = n.createElement('iframe'), i.setAttribute('id',
                r), i.setAttribute('src', '#'), i.style.display = 'none', n.body.appendChild(
                i), i.contentWindow.document.open(), i.contentWindow.document.close(), u = '', a = !1, o.checkerFunction = function () {
                if (a) return !1;
                a = !0;
                var n = o.getHash(), r = o.getHash(i.contentWindow.document);
                return n !== t ? (t = n, r !== n &&
                (u = r = n, i.contentWindow.document.open(), i.contentWindow.document.close(), i.contentWindow.document.location.hash = o.escapeHash(
                    n)), o.Adapter.trigger(e, 'hashchange')) : r !== u &&
                    (u = r, f && r === '' ? o.back() : o.setHash(r, !1)), a = !1, !0;
            }) : o.checkerFunction = function () {
                var n = o.getHash() || '';
                return n !== t && (t = n, o.Adapter.trigger(e, 'hashchange')), !0;
            }, o.intervalList.push(s(o.checkerFunction, o.options.hashChangeInterval)), !0;
        }, o.Adapter.onDomLoad(o.hashChangeInit)), o.emulated.pushState && (o.onHashChange = function (t) {
            var n = t && t.newURL || o.getLocationHref(), r = o.getHashByUrl(n), i = null, s = null, u = null, a;
            return o.isLastHash(r) ? (o.busy(!1), !1) : (o.doubleCheckComplete(), o.saveHash(r), r &&
            o.isTraditionalAnchor(r) ? (o.Adapter.trigger(e, 'anchorchange'), o.busy(!1), !1) : (i = o.extractState(
                o.getFullUrl(r || o.getLocationHref()), !0), o.isLastSavedState(i)
                ? (o.busy(!1), !1)
                : (s = o.getHashByState(i), a = o.discardedState(i), a ? (o.getHashByIndex(-2) ===
                o.getHashByState(a.forwardState) ? o.back(!1) : o.forward(!1), !1) : (o.pushState(i.data, i.title,
                    encodeURI(i.url), !1), !0))));
        }, o.Adapter.bind(e, 'hashchange', o.onHashChange), o.pushState = function (t, n, r, i) {
            r = encodeURI(r).
                replace(/%25/g, '%');
            if (o.getHashByUrl(r)) throw new Error(
                'History.js does not support states with fragment-identifiers (hashes/anchors).');
            if (i !== !1 && o.busy()) return o.pushQueue(
                { scope: o, callback: o.pushState, args: arguments, queue: i }), !1;
            o.busy(!0);
            var s = o.createStateObject(t, n, r), u = o.getHashByState(s), a = o.getState(!1), f = o.getHashByState(a),
                l = o.getHash(), c = o.expectedStateId == s.id;
            return o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), u === f ? (o.busy(
                !1), !1) : (o.saveState(s), c || o.Adapter.trigger(e, 'statechange'), !o.isHashEqual(u, l) &&
            !o.isHashEqual(u, o.getShortUrl(o.getLocationHref())) && o.setHash(u, !1), o.busy(!1), !0);
        }, o.replaceState = function (t, n, r, i) {
            r = encodeURI(r).replace(/%25/g, '%');
            if (o.getHashByUrl(r)) throw new Error(
                'History.js does not support states with fragment-identifiers (hashes/anchors).');
            if (i !== !1 && o.busy()) return o.pushQueue(
                { scope: o, callback: o.replaceState, args: arguments, queue: i }), !1;
            o.busy(!0);
            var s = o.createStateObject(t, n, r), u = o.getHashByState(s), a = o.getState(!1), f = o.getHashByState(a),
                l = o.getStateByIndex(-2);
            return o.discardState(a, s, l), u === f ? (o.storeState(s), o.expectedStateId = s.id, o.recycleState(
                s), o.setTitle(s), o.saveState(s), o.Adapter.trigger(e, 'statechange'), o.busy(!1)) : o.pushState(
                s.data, s.title, s.url, !1), !0;
        }), o.emulated.pushState && o.getHash() && !o.emulated.hashChange &&
        o.Adapter.onDomLoad(function () {o.Adapter.trigger(e, 'hashchange');});
    }, typeof o.init != 'undefined' && o.init();
}(window), function (e, t) {
    'use strict';
    var n = e.console || t, r = e.document, i = e.navigator, s = !1, o = e.setTimeout, u = e.clearTimeout,
        a = e.setInterval, f = e.clearInterval, l = e.JSON, c = e.alert, h = e.History = e.History || {}, p = e.history;
    try {s = e.sessionStorage, s.setItem('TEST', '1'), s.removeItem('TEST');} catch (d) {s = !1;}
    l.stringify = l.stringify || l.encode, l.parse = l.parse || l.decode;
    if (typeof h.init != 'undefined') throw new Error('History.js Core has already been loaded...');
    h.init = function (e) {
        return typeof h.Adapter == 'undefined' ? !1 : (typeof h.initCore != 'undefined' &&
        h.initCore(), typeof h.initHtml4 != 'undefined' && h.initHtml4(), !0);
    }, h.initCore = function (d) {
        if (typeof h.initCore.initialized != 'undefined') return !1;
        h.initCore.initialized = !0, h.options = h.options ||
            {}, h.options.hashChangeInterval = h.options.hashChangeInterval ||
            100, h.options.safariPollInterval = h.options.safariPollInterval ||
            500, h.options.doubleCheckInterval = h.options.doubleCheckInterval ||
            500, h.options.disableSuid = h.options.disableSuid ||
            !1, h.options.storeInterval = h.options.storeInterval || 1e3, h.options.busyDelay = h.options.busyDelay ||
            250, h.options.debug = h.options.debug || !1, h.options.initialTitle = h.options.initialTitle ||
            r.title, h.options.html4Mode = h.options.html4Mode || !1, h.options.delayInit = h.options.delayInit ||
            !1, h.intervalList = [], h.clearAllIntervals = function () {
            var e, t = h.intervalList;
            if (typeof t != 'undefined' && t !== null) {
                for (e = 0; e < t.length; e++) f(t[e]);
                h.intervalList = null;
            }
        }, h.debug = function () {
            (h.options.debug || !1) && h.log.apply(h, arguments);
        }, h.log = function () {
            var e = typeof n != 'undefined' && typeof n.log != 'undefined' && typeof n.log.apply != 'undefined',
                t = r.getElementById('log'), i, s, o, u, a;
            e ? (u = Array.prototype.slice.call(arguments), i = u.shift(), typeof n.debug != 'undefined'
                ? n.debug.apply(n, [i, u])
                : n.log.apply(n, [i, u])) : i = '\n' + arguments[0] + '\n';
            for (s = 1, o = arguments.length; s < o; ++s) {
                a = arguments[s];
                if (typeof a == 'object' && typeof l != 'undefined') try {a = l.stringify(a);} catch (f) {}
                i += '\n' + a + '\n';
            }
            return t ? (t.value += i + '\n-----\n', t.scrollTop = t.scrollHeight - t.clientHeight) : e || c(i), !0;
        }, h.getInternetExplorerMajorVersion = function () {
            var e = h.getInternetExplorerMajorVersion.cached = typeof h.getInternetExplorerMajorVersion.cached !=
            'undefined' ? h.getInternetExplorerMajorVersion.cached : function () {
                var e = 3, t = r.createElement('div'), n = t.getElementsByTagName('i');
                while ((t.innerHTML = '<!--[if gt IE ' + ++e + ']><i></i><![endif]-->') && n[0]) ;
                return e > 4 ? e : !1;
            }();
            return e;
        }, h.isInternetExplorer = function () {
            var e = h.isInternetExplorer.cached = typeof h.isInternetExplorer.cached != 'undefined'
                ? h.isInternetExplorer.cached
                : Boolean(h.getInternetExplorerMajorVersion());
            return e;
        }, h.options.html4Mode ? h.emulated = { pushState: !0, hashChange: !0 } : h.emulated = {
            pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState &&
                !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent) &&
                !/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),
            hashChange: Boolean(!('onhashchange' in e || 'onhashchange' in r) || h.isInternetExplorer() &&
                h.getInternetExplorerMajorVersion() < 8)
        }, h.enabled = !h.emulated.pushState, h.bugs = {
            setHash: Boolean(!h.emulated.pushState && i.vendor === 'Apple Computer, Inc.' &&
                /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
            safariPoll: Boolean(!h.emulated.pushState && i.vendor === 'Apple Computer, Inc.' &&
                /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
            ieDoubleCheck: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 7)
        }, h.isEmptyObject = function (e) {
            for (var t in e) if (e.hasOwnProperty(t)) return !1;
            return !0;
        }, h.cloneObject = function (e) {
            var t, n;
            return e ? (t = l.stringify(e), n = l.parse(t)) : n = {}, n;
        }, h.getRootUrl = function () {
            var e = r.location.protocol + '//' + (r.location.hostname || r.location.host);
            if (r.location.port || !1) e += ':' + r.location.port;
            return e += '/', e;
        }, h.getBaseHref = function () {
            var e = r.getElementsByTagName('base'), t = null, n = '';
            return e.length === 1 && (t = e[0], n = t.href.replace(/[^\/]+$/, '')), n = n.replace(/\/+$/, ''), n &&
            (n += '/'), n;
        }, h.getBaseUrl = function () {
            var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
            return e;
        }, h.getPageUrl = function () {
            var e = h.getState(!1, !1), t = (e || {}).url || h.getLocationHref(), n;
            return n = t.replace(/\/+$/, '').
                replace(/[^\/]+$/, function (e, t, n) {return /\./.test(e) ? e : e + '/';}), n;
        }, h.getBasePageUrl = function () {
            var e = h.getLocationHref().
                replace(/[#\?].*/, '').
                replace(/[^\/]+$/, function (e, t, n) {return /[^\/]$/.test(e) ? '' : e;}).
                replace(/\/+$/, '') + '/';
            return e;
        }, h.getFullUrl = function (e, t) {
            var n = e, r = e.substring(0, 1);
            return t = typeof t == 'undefined' ? !0 : t, /[a-z]+\:\/\//.test(e) ||
            (r === '/' ? n = h.getRootUrl() + e.replace(/^\/+/, '') : r === '#' ? n = h.getPageUrl().
                replace(/#.*/, '') + e : r === '?' ? n = h.getPageUrl().replace(/[\?#].*/, '') + e : t
                ? n = h.getBaseUrl() + e.replace(/^(\.\/)+/, '')
                : n = h.getBasePageUrl() + e.replace(/^(\.\/)+/, '')), n.replace(/\#$/, '');
        }, h.getShortUrl = function (e) {
            var t = e, n = h.getBaseUrl(), r = h.getRootUrl();
            return h.emulated.pushState && (t = t.replace(n, '')), t = t.replace(r, '/'), h.isTraditionalAnchor(t) &&
            (t = './' + t), t = t.replace(/^(\.\/)+/g, './').replace(/\#$/, ''), t;
        }, h.getLocationHref = function (e) {
            return e = e || r, e.URL === e.location.href
                ? e.location.href
                : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash &&
                decodeURIComponent(e.location.href.replace(/^[^#]+/, '')) === e.location.hash
                    ? e.location.href
                    : e.URL.indexOf('#') == -1 && e.location.href.indexOf('#') != -1 ? e.location.href : e.URL ||
                        e.location.href;
        }, h.store = {}, h.idToState = h.idToState || {}, h.stateToId = h.stateToId || {}, h.urlToId = h.urlToId ||
            {}, h.storedStates = h.storedStates || [], h.savedStates = h.savedStates ||
            [], h.normalizeStore = function () {
            h.store.idToState = h.store.idToState || {}, h.store.urlToId = h.store.urlToId ||
                {}, h.store.stateToId = h.store.stateToId || {};
        }, h.getState = function (e, t) {
            typeof e == 'undefined' && (e = !0), typeof t == 'undefined' && (t = !0);
            var n = h.getLastSavedState();
            return !n && t && (n = h.createStateObject()), e && (n = h.cloneObject(n), n.url = n.cleanUrl || n.url), n;
        }, h.getIdByState = function (e) {
            var t = h.extractId(e.url), n;
            if (!t) {
                n = h.getStateString(e);
                if (typeof h.stateToId[n] != 'undefined') t = h.stateToId[n]; else if (typeof h.store.stateToId[n] !=
                    'undefined') t = h.store.stateToId[n]; else {
                    for (; ;) {
                        t = (new Date).getTime() + String(Math.random()).replace(/\D/g, '');
                        if (typeof h.idToState[t] == 'undefined' && typeof h.store.idToState[t] == 'undefined') break;
                    }
                    h.stateToId[n] = t, h.idToState[t] = e;
                }
            }
            return t;
        }, h.normalizeState = function (e) {
            var t, n;
            if (!e || typeof e != 'object') e = {};
            if (typeof e.normalized != 'undefined') return e;
            if (!e.data || typeof e.data != 'object') e.data = {};
            return t = {}, t.normalized = !0, t.title = e.title || '', t.url = h.getFullUrl(
                e.url ? e.url : h.getLocationHref()), t.hash = h.getShortUrl(t.url), t.data = h.cloneObject(
                e.data), t.id = h.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/,
                ''), t.url = t.cleanUrl, n = !h.isEmptyObject(t.data), (t.title || n) && h.options.disableSuid !== !0 &&
            (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ''), /\?/.test(t.hash) ||
            (t.hash += '?'), t.hash += '&_suid=' + t.id), t.hashedUrl = h.getFullUrl(t.hash), (h.emulated.pushState ||
                h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t;
        }, h.createStateObject = function (e, t, n) {
            var r = { data: e, title: t, url: n };
            return r = h.normalizeState(r), r;
        }, h.getStateById = function (e) {
            e = String(e);
            var n = h.idToState[e] || h.store.idToState[e] || t;
            return n;
        }, h.getStateString = function (e) {
            var t, n, r;
            return t = h.normalizeState(e), n = { data: t.data, title: e.title, url: e.url }, r = l.stringify(n), r;
        }, h.getStateId = function (e) {
            var t, n;
            return t = h.normalizeState(e), n = t.id, n;
        }, h.getHashByState = function (e) {
            var t, n;
            return t = h.normalizeState(e), n = t.hash, n;
        }, h.extractId = function (e) {
            var t, n, r, i;
            return e.indexOf('#') != -1 ? i = e.split('#')[0] : i = e, n = /(.*)\&_suid=([0-9]+)$/.exec(i), r = n
                ? n[1] || e
                : e, t = n ? String(n[2] || '') : '', t || !1;
        }, h.isTraditionalAnchor = function (e) {
            var t = !/[\/\?\.]/.test(e);
            return t;
        }, h.extractState = function (e, t) {
            var n = null, r, i;
            return t = t || !1, r = h.extractId(e), r && (n = h.getStateById(r)), n ||
            (i = h.getFullUrl(e), r = h.getIdByUrl(i) || !1, r && (n = h.getStateById(r)), !n && t &&
            !h.isTraditionalAnchor(e) && (n = h.createStateObject(null, null, i))), n;
        }, h.getIdByUrl = function (e) {
            var n = h.urlToId[e] || h.store.urlToId[e] || t;
            return n;
        }, h.getLastSavedState = function () {
            return h.savedStates[h.savedStates.length - 1] || t;
        }, h.getLastStoredState = function () {
            return h.storedStates[h.storedStates.length - 1] || t;
        }, h.hasUrlDuplicate = function (e) {
            var t = !1, n;
            return n = h.extractState(e.url), t = n && n.id !== e.id, t;
        }, h.storeState = function (e) {
            return h.urlToId[e.url] = e.id, h.storedStates.push(h.cloneObject(e)), e;
        }, h.isLastSavedState = function (e) {
            var t = !1, n, r, i;
            return h.savedStates.length && (n = e.id, r = h.getLastSavedState(), i = r.id, t = n === i), t;
        }, h.saveState = function (e) {
            return h.isLastSavedState(e) ? !1 : (h.savedStates.push(h.cloneObject(e)), !0);
        }, h.getStateByIndex = function (e) {
            var t = null;
            return typeof e == 'undefined' ? t = h.savedStates[h.savedStates.length - 1] : e < 0
                ? t = h.savedStates[h.savedStates.length + e]
                : t = h.savedStates[e], t;
        }, h.getCurrentIndex = function () {
            var e = null;
            return h.savedStates.length < 1 ? e = 0 : e = h.savedStates.length - 1, e;
        }, h.getHash = function (e) {
            var t = h.getLocationHref(e), n;
            return n = h.getHashByUrl(t), n;
        }, h.unescapeHash = function (e) {
            var t = h.normalizeHash(e);
            return t = decodeURIComponent(t), t;
        }, h.normalizeHash = function (e) {
            var t = e.replace(/[^#]*#/, '').replace(/#.*/, '');
            return t;
        }, h.setHash = function (e, t) {
            var n, i;
            return t !== !1 && h.busy() ? (h.pushQueue(
                { scope: h, callback: h.setHash, args: arguments, queue: t }), !1) : (h.busy(!0), n = h.extractState(e,
                !0), n && !h.emulated.pushState ? h.pushState(n.data, n.title, n.url, !1) : h.getHash() !== e &&
                (h.bugs.setHash
                    ? (i = h.getPageUrl(), h.pushState(null, null, i + '#' + e, !1))
                    : r.location.hash = e), h);
        }, h.escapeHash = function (t) {
            var n = h.normalizeHash(t);
            return n = e.encodeURIComponent(n), h.bugs.hashEscape ||
            (n = n.replace(/\%21/g, '!').replace(/\%26/g, '&').replace(/\%3D/g, '=').replace(/\%3F/g, '?')), n;
        }, h.getHashByUrl = function (e) {
            var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, '$2');
            return t = h.unescapeHash(t), t;
        }, h.setTitle = function (e) {
            var t = e.title, n;
            t || (n = h.getStateByIndex(0), n && n.url === e.url && (t = n.title || h.options.initialTitle));
            try {
                r.getElementsByTagName('title')[0].innerHTML = t.replace('<', '&lt;').
                    replace('>', '&gt;').
                    replace(' & ', ' &amp; ');
            } catch (i) {}
            return r.title = t, h;
        }, h.queues = [], h.busy = function (e) {
            typeof e != 'undefined' ? h.busy.flag = e : typeof h.busy.flag == 'undefined' && (h.busy.flag = !1);
            if (!h.busy.flag) {
                u(h.busy.timeout);
                var t = function () {
                    var e, n, r;
                    if (h.busy.flag) return;
                    for (e = h.queues.length - 1; e >= 0; --e) {
                        n = h.queues[e];
                        if (n.length === 0) continue;
                        r = n.shift(), h.fireQueueItem(r), h.busy.timeout = o(t, h.options.busyDelay);
                    }
                };
                h.busy.timeout = o(t, h.options.busyDelay);
            }
            return h.busy.flag;
        }, h.busy.flag = !1, h.fireQueueItem = function (e) {
            return e.callback.apply(e.scope || h, e.args || []);
        }, h.pushQueue = function (e) {
            return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [], h.queues[e.queue || 0].push(e), h;
        }, h.queue = function (e, t) {
            return typeof e == 'function' && (e = { callback: e }), typeof t != 'undefined' && (e.queue = t), h.busy()
                ? h.pushQueue(e)
                : h.fireQueueItem(e), h;
        }, h.clearQueue = function () {return h.busy.flag = !1, h.queues = [], h;}, h.stateChanged = !1, h.doubleChecker = !1, h.doubleCheckComplete = function () {return h.stateChanged = !0, h.doubleCheckClear(), h;}, h.doubleCheckClear = function () {
            return h.doubleChecker && (u(h.doubleChecker), h.doubleChecker = !1), h;
        }, h.doubleCheck = function (e) {
            return h.stateChanged = !1, h.doubleCheckClear(), h.bugs.ieDoubleCheck &&
            (h.doubleChecker = o(function () {return h.doubleCheckClear(), h.stateChanged || e(), !0;},
                h.options.doubleCheckInterval)), h;
        }, h.safariStatePoll = function () {
            var t = h.extractState(h.getLocationHref()), n;
            if (!h.isLastSavedState(t)) return n = t, n || (n = h.createStateObject()), h.Adapter.trigger(e,
                'popstate'), h;
            return;
        }, h.back = function (e) {
            return e !== !1 && h.busy()
                ? (h.pushQueue({ scope: h, callback: h.back, args: arguments, queue: e }), !1)
                : (h.busy(!0), h.doubleCheck(function () {h.back(!1);}), p.go(-1), !0);
        }, h.forward = function (e) {
            return e !== !1 && h.busy() ? (h.pushQueue(
                { scope: h, callback: h.forward, args: arguments, queue: e }), !1) : (h.busy(!0), h.doubleCheck(
                function () {h.forward(!1);}), p.go(1), !0);
        }, h.go = function (e, t) {
            var n;
            if (e > 0) for (n = 1; n <= e; ++n) h.forward(t); else {
                if (!(e < 0)) throw new Error('History.go: History.go requires a positive or negative integer passed.');
                for (n = -1; n >= e; --n) h.back(t);
            }
            return h;
        };
        if (h.emulated.pushState) {
            var v = function () {};
            h.pushState = h.pushState || v, h.replaceState = h.replaceState || v;
        } else h.onPopState = function (t, n) {
            var r = !1, i = !1, s, o;
            return h.doubleCheckComplete(), s = h.getHash(), s
                ? (o = h.extractState(s || h.getLocationHref(), !0), o
                    ? h.replaceState(o.data, o.title, o.url, !1)
                    : (h.Adapter.trigger(e, 'anchorchange'), h.busy(!1)), h.expectedStateId = !1, !1)
                : (r = h.Adapter.extractEventData('state', t, n) || !1, r ? i = h.getStateById(r) : h.expectedStateId
                    ? i = h.getStateById(h.expectedStateId)
                    : i = h.extractState(h.getLocationHref()), i ||
                (i = h.createStateObject(null, null, h.getLocationHref())), h.expectedStateId = !1, h.isLastSavedState(
                    i) ? (h.busy(!1), !1) : (h.storeState(i), h.saveState(i), h.setTitle(i), h.Adapter.trigger(e,
                    'statechange'), h.busy(!1), !0));
        }, h.Adapter.bind(e, 'popstate', h.onPopState), h.pushState = function (t, n, r, i) {
            if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error(
                'History.js does not support states with fragement-identifiers (hashes/anchors).');
            if (i !== !1 && h.busy()) return h.pushQueue(
                { scope: h, callback: h.pushState, args: arguments, queue: i }), !1;
            h.busy(!0);
            var s = h.createStateObject(t, n, r);
            return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.pushState(s.id,
                s.title, s.url), h.Adapter.trigger(e, 'popstate')), !0;
        }, h.replaceState = function (t, n, r, i) {
            if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error(
                'History.js does not support states with fragement-identifiers (hashes/anchors).');
            if (i !== !1 && h.busy()) return h.pushQueue(
                { scope: h, callback: h.replaceState, args: arguments, queue: i }), !1;
            h.busy(!0);
            var s = h.createStateObject(t, n, r);
            return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.replaceState(s.id,
                s.title, s.url), h.Adapter.trigger(e, 'popstate')), !0;
        };
        if (s) {
            try {h.store = l.parse(s.getItem('History.store')) || {};} catch (m) {h.store = {};}
            h.normalizeStore();
        } else h.store = {}, h.normalizeStore();
        h.Adapter.bind(e, 'unload', h.clearAllIntervals), h.saveState(
            h.storeState(h.extractState(h.getLocationHref(), !0))), s && (h.onUnload = function () {
            var e, t, n;
            try {e = l.parse(s.getItem('History.store')) || {};} catch (r) {e = {};}
            e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};
            for (t in h.idToState) {
                if (!h.idToState.hasOwnProperty(t)) continue;
                e.idToState[t] = h.idToState[t];
            }
            for (t in h.urlToId) {
                if (!h.urlToId.hasOwnProperty(t)) continue;
                e.urlToId[t] = h.urlToId[t];
            }
            for (t in h.stateToId) {
                if (!h.stateToId.hasOwnProperty(t)) continue;
                e.stateToId[t] = h.stateToId[t];
            }
            h.store = e, h.normalizeStore(), n = l.stringify(e);
            try {s.setItem('History.store', n);} catch (i) {
                if (i.code !== DOMException.QUOTA_EXCEEDED_ERR) throw i;
                s.length && (s.removeItem('History.store'), s.setItem('History.store', n));
            }
        }, h.intervalList.push(a(h.onUnload, h.options.storeInterval)), h.Adapter.bind(e, 'beforeunload',
            h.onUnload), h.Adapter.bind(e, 'unload', h.onUnload));
        if (!h.emulated.pushState) {
            h.bugs.safariPoll && h.intervalList.push(a(h.safariStatePoll, h.options.safariPollInterval));
            if (i.vendor === 'Apple Computer, Inc.' || (i.appCodeName || '') === 'Mozilla') h.Adapter.bind(e,
                'hashchange', function () {h.Adapter.trigger(e, 'popstate');}), h.getHash() &&
            h.Adapter.onDomLoad(function () {h.Adapter.trigger(e, 'hashchange');});
        }
    }, (!h.options || !h.options.delayInit) && h.init();
}(window);
