export var BMapLib=window.BMapLib=BMapLib||{};(function(){var a=a||{guid:"$BAIDU$"};(function(){window[a.guid]={};a.extend=function(h,f){for(var g in f){if(f.hasOwnProperty(g)){h[g]=f[g]}}return h};a.lang=a.lang||{};a.lang.guid=function(){return"TANGRAM__"+(window[a.guid]._counter++).toString(36)};window[a.guid]._counter=window[a.guid]._counter||1;window[a.guid]._instances=window[a.guid]._instances||{};a.lang.Class=function(f){this.guid=f||a.lang.guid();window[a.guid]._instances[this.guid]=this};window[a.guid]._instances=window[a.guid]._instances||{};a.lang.isString=function(f){return"[object String]"==Object.prototype.toString.call(f)};a.isString=a.lang.isString;a.lang.isFunction=function(f){return"[object Function]"==Object.prototype.toString.call(f)};a.lang.Event=function(f,g){this.type=f;this.returnValue=true;this.target=g||null;this.currentTarget=null};a.lang.Class.prototype.addEventListener=function(i,h,g){if(!a.lang.isFunction(h)){return}!this.__listeners&&(this.__listeners={});var f=this.__listeners,j;if(typeof g=="string"&&g){if(/[^\w\-]/.test(g)){throw ("nonstandard key:"+g)}else{h.hashCode=g;j=g}}i.indexOf("on")!=0&&(i="on"+i);typeof f[i]!="object"&&(f[i]={});j=j||a.lang.guid();h.hashCode=j;f[i][j]=h};a.lang.Class.prototype.removeEventListener=function(h,g){if(a.lang.isFunction(g)){g=g.hashCode}else{if(!a.lang.isString(g)){return}}!this.__listeners&&(this.__listeners={});h.indexOf("on")!=0&&(h="on"+h);var f=this.__listeners;if(!f[h]){return}f[h][g]&&delete f[h][g]};a.lang.Class.prototype.dispatchEvent=function(j,f){if(a.lang.isString(j)){j=new a.lang.Event(j)}!this.__listeners&&(this.__listeners={});f=f||{};for(var h in f){j[h]=f[h]}var h,g=this.__listeners,k=j.type;j.target=j.target||this;j.currentTarget=this;k.indexOf("on")!=0&&(k="on"+k);a.lang.isFunction(this[k])&&this[k].apply(this,arguments);if(typeof g[k]=="object"){for(h in g[k]){g[k][h].apply(this,arguments)}}return j.returnValue};a.dom=a.dom||{};a.dom._g=function(f){if(a.lang.isString(f)){return document.getElementById(f)}return f};a._g=a.dom._g;a.event=a.event||{};a.event._listeners=a.event._listeners||[];a.event.on=function(g,j,l){j=j.replace(/^on/i,"");g=a.dom._g(g);var k=function(n){l.call(g,n)},f=a.event._listeners,i=a.event._eventFilter,m,h=j;j=j.toLowerCase();if(i&&i[j]){m=i[j](g,j,k);h=m.type;k=m.listener}if(g.addEventListener){g.addEventListener(h,k,false)}else{if(g.attachEvent){g.attachEvent("on"+h,k)}}f[f.length]=[g,j,l,k,h];return g};a.on=a.event.on;a.event.un=function(h,k,g){h=a.dom._g(h);k=k.replace(/^on/i,"").toLowerCase();var n=a.event._listeners,i=n.length,j=!g,m,l,f;while(i--){m=n[i];if(m[1]===k&&m[0]===h&&(j||m[2]===g)){l=m[4];f=m[3];if(h.removeEventListener){h.removeEventListener(l,f,false)}else{if(h.detachEvent){h.detachEvent("on"+l,f)}}n.splice(i,1)}}return h};a.un=a.event.un;a.preventDefault=a.event.preventDefault=function(f){if(f.preventDefault){f.preventDefault()}else{f.returnValue=false}}})();var e=BMapLib.RichMarker=function(h,f,g){if(!h||!f||!(f instanceof BMap.Point)){return}this._map=null;this._content=h;this._position=f;this._container=null;this._size=null;g=g||{};this._opts=a.extend(a.extend(this._opts||{},{enableDragging:false,anchor:new BMap.Size(0,0)}),g)};e.prototype=new BMap.Overlay();e.prototype.initialize=function(g){var f=this,h=f._container=document.createElement("div");f._map=g;a.extend(h.style,{position:"absolute",zIndex:BMap.Overlay.getZIndex(f._position.lat),cursor:"pointer"});g.getPanes().labelPane.appendChild(h);f._appendContent();f._setEventDispath();f._getContainerSize();return h};e.prototype.draw=function(){var h=this._map,g=this._opts.anchor,f=h.pointToOverlayPixel(this._position);this._container.style.left=f.x+g.width+"px";this._container.style.top=f.y+g.height+"px"};e.prototype.enableDragging=function(){this._opts.enableDragging=true};e.prototype.disableDragging=function(){this._opts.enableDragging=false};e.prototype.isDraggable=function(){return this._opts.enableDragging};e.prototype.getPosition=function(){return this._position};e.prototype.setPosition=function(f){if(!f instanceof BMap.Point){return}this._position=f;this.draw()};e.prototype.getAnchor=function(){return this._opts.anchor};e.prototype.setAnchor=function(f){if(!f instanceof BMap.Size){return}this._opts.anchor=f;this.draw()};e.prototype._appendContent=function(){var g=this._content;if(typeof g=="string"){var h=document.createElement("DIV");h.innerHTML=g;if(h.childNodes.length==1){g=(h.removeChild(h.firstChild))}else{var f=document.createDocumentFragment();while(h.firstChild){f.appendChild(h.firstChild)}g=f}}this._container.innerHTML="";this._container.appendChild(g)};e.prototype.getContent=function(){return this._content};e.prototype.setContent=function(f){if(!f){return}this._content=f;this._appendContent()};e.prototype._getContainerSize=function(){if(!this._container){return}var g=this._container.offsetHeight;var f=this._container.offsetWidth;this._size=new BMap.Size(f,g)};e.prototype.getWidth=function(){if(!this._size){return}return this._size.width};e.prototype.setWidth=function(f){if(!this._container){return}this._container.style.width=f+"px";this._getContainerSize()};e.prototype.getHeight=function(){if(!this._size){return}return this._size.height};e.prototype.setHeight=function(f){if(!this._container){return}this._container.style.height=f+"px";this._getContainerSize()};e.prototype._setEventDispath=function(){var k=this,l=k._container,g=false,i=null;function j(p){var p=window.event||p,n=p.pageX||p.clientX||0,q=p.pageY||p.clientY||0,o=new BMap.Pixel(n,q),m=k._map.pixelToPoint(o);return{pixel:o,point:m}}a.on(l,"onclick",function(m){c(k,"onclick");d(m)});a.on(l,"ontouchend",function(m){c(k,"ontouchend");c(k,"onclick");d(m)});a.on(l,"ondblclick",function(n){var m=j(n);c(k,"ondblclick",{point:m.point,pixel:m.pixel});d(n)});l.onmouseover=function(n){var m=j(n);c(k,"onmouseover",{point:m.point,pixel:m.pixel});d(n)};l.onmouseout=function(n){var m=j(n);c(k,"onmouseout",{point:m.point,pixel:m.pixel});d(n)};var h=function(n){var m=j(n);c(k,"onmouseup",{point:m.point,pixel:m.pixel});if(k._container.releaseCapture){a.un(l,"onmousemove",f);a.un(l,"onmouseup",h)}else{a.un(window,"onmousemove",f);a.un(window,"onmouseup",h)}if(!k._opts.enableDragging){d(n);return}k._container.releaseCapture&&k._container.releaseCapture();c(k,"ondragend",{point:m.point,pixel:m.pixel});g=false;i=null;k._setCursor("dragend");k._container.style.MozUserSelect="";k._container.style.KhtmlUserSelect="";k._container.style.WebkitUserSelect="";k._container.unselectable="off";k._container.onselectstart=function(){};d(n)};var f=function(o){if(!k._opts.enableDragging||!g){return}var n=j(o);var p=k._map.pointToPixel(k._position);var m=n.pixel.x-i.x+p.x;var q=n.pixel.y-i.y+p.y;i=n.pixel;k._position=k._map.pixelToPoint(new BMap.Pixel(m,q));k.draw();k._setCursor("dragging");c(k,"ondragging",{point:n.point,pixel:n.pixel});d(o)};a.on(l,"onmousedown",function(n){var m=j(n);c(k,"onmousedown",{point:m.point,pixel:m.pixel});if(k._container.setCapture){a.on(l,"onmousemove",f);a.on(l,"onmouseup",h)}else{a.on(window,"onmousemove",f);a.on(window,"onmouseup",h)}if(!k._opts.enableDragging){d(n);return}i=m.pixel;c(k,"ondragstart",{point:m.point,pixel:m.pixel});g=true;k._setCursor("dragstart");k._container.setCapture&&k._container.setCapture();k._container.style.MozUserSelect="none";k._container.style.KhtmlUserSelect="none";k._container.style.WebkitUserSelect="none";k._container.unselectable="on";k._container.onselectstart=function(){return false};d(n)})};e.prototype._setCursor=function(f){var h="";var g={moz:{dragstart:"-moz-grab",dragging:"-moz-grabbing",dragend:"pointer"},other:{dragstart:"move",dragging:"move",dragend:"pointer"}};if(navigator.userAgent.indexOf("Gecko/")!==-1){h=g.moz[f]}else{h=g.other[f]}if(this._container.style.cursor!=h){this._container.style.cursor=h}};e.prototype.remove=function(){c(this,"onremove");if(this._container){b(this._container)}if(this._container&&this._container.parentNode){this._container.parentNode.removeChild(this._container)}};function c(f,g,i){g.indexOf("on")!=0&&(g="on"+g);var h=new a.lang.Event(g);if(!!i){for(var j in i){h[j]=i[j]}}f.dispatchEvent(h)}function b(j){if(!j){return}var g=j.attributes,f="";if(g){for(var h=0,l=g.length;h<l;h++){f=g[h].name;if(typeof j[f]==="function"){j[f]=null}}}var k=j.childnodes;if(k){for(var h=0,l=k.length;h<l;h++){b(j.childnodes[h])}}}function d(f){var f=window.event||f;f.stopPropagation?f.stopPropagation():f.cancelBubble=true;return a.preventDefault(f)}})();

(function () {
    var T,
    baidu = T = baidu || {version: "1.5.1"};
    baidu.guid = "$BAIDU$";
    (function(){
        window[baidu.guid] = window[baidu.guid] || {};
        baidu.object = baidu.object || {};
        baidu.extend =
        baidu.object.extend = function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }

            return target;
        };
        T.undope=true;
    })();
    /**
     * @exports MarkerManager as BMapLib.MarkerManager
     */

    var MarkerManager =
    /**
     * MarkerManger类的构造函数
     * @class MarkerManager <b>入口</b>。
     * 实例化该类后，可调用addMarkers,show,hide等方法，控制marker。
     * 请注意，此类比较适用于以下情况：
     * 大量marker分布到不同的zoom级别中，比如：18级的时候显示100个marker，15级的时候显示另外的100个marker
     * @constructor
         * @param {Map} map Baidu map的实例对象.
         * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：<br />
         * {<br />"<b>borderPadding</b>" : {Number} 当前viewport额外的padding，落在这个padding中的marker会被添加到地图上，即使他们不是完全可见的。
         * <br />"<b>maxZoom</b>" : {Number} 设置需要marker manager需要监视的最大的zoom，如果没有给出，默认为地图的最大的zoom。.
         *<br />
         * }<br />.
         * @example <b>参考示例：</b><br />
         * var mgr = new BMapLib.MarkerManager(map,{borderPadding: padding,maxZoom: 18,trackMarkers: true});
     */
    BMapLib.MarkerManager = function (map, opts) {
            this._opts = opts || {};
            this._map = map;
            this._zoom = map.getZoom();
            //用于存放添加的marker数组
            this._numMarkers = [];

            if (typeof opts.maxZoom === 'number') {
                this._opts.maxZoom = this._opts.maxZoom;
            } else {
                this._opts.maxZoom = 19;
            }
            if (typeof opts.borderPadding === 'number') {
                this._opts.borderPadding = opts.borderPadding;
            } else {
                this._opts.borderPadding = 0;
            }

            var me = this;
            //绑定zoomend事件
            this._map.addEventListener("zoomend", function () {
                //me._visible && me._showMarkers();
                me._showMarkers();
            });
            //绑定dragend事件
            this._map.addEventListener("dragend", function () {
                //me._visible && me._showMarkers();
                me._showMarkers();
            });
        }
    /**
     * 添加单个marker
     * @param {Marker} marker 要添加的marker
     * @param {Number} minZoom 当地图缩放到小于此zoom的时候，marker不会加载到地图上
     * @param {Number} maxZoom 当地图缩放到大于此zoom的时候，marker不会加载到地图上
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * mgr.addMarker(marker,4,15);
     */
    MarkerManager.prototype.addMarker = function (marker, minZoom, maxZoom) {
        minZoom = minZoom && minZoom > 0 ? minZoom : 1;
        maxZoom = maxZoom && maxZoom <= 19 ? maxZoom : this._opts.maxZoom;
        marker.minZoom = minZoom;
        marker.maxZoom = maxZoom;
        marker.bAdded = false;
        this._numMarkers.push(marker);
        // marker.enableDragging();
    }
        /**
         * 批量添加marker
         * @param {Array} markers 要添加的marker数组
         * @param {Number} minZoom 当地图缩放到小于此zoom的时候，marker不会加载到地图上
         * @param {Number} maxZoom 当地图缩放到大于此zoom的时候，marker不会加载到地图上
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.addMarker(markers,4,15);
         */
        MarkerManager.prototype.addMarkers = function (markers, minZoom, maxZoom) {
            var len = markers.length,
                me = this;
            for (var i = len; i--;) {
                this.addMarker(markers[i], minZoom, maxZoom);
            }
        }
        /**
         * 从manager跟地图中，移除marker（如果它现在可见）
         * @param {Marker} marker 要删除的marker
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.removeMarker(Marker);
         */
        MarkerManager.prototype.removeMarker = function (marker) {
            if (marker instanceof BMap.Marker) {
                //移除地图上的marker
                this._map.removeOverlay(marker);
                //移除markerManager中的marker
                this._removeMarkerFromArray(marker);
            }
        }
        /**
         * 返回此zoom下可见marker的数量
         * @param {Number} zoom 地图缩放级别
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.getMarkerCount(15);
         */
        MarkerManager.prototype.getMarkerCount = function (zoom) {
            var len = this._numMarkers.length,
                t = this._numMarkers,
                count = 0;
            for (var i = len; i--;) {
                count = t[i].bInBounds ? ((t[i].minZoom <= zoom && t[i].maxZoom >= zoom) ? ++count : count) : count;
            }
            //如果隐藏掉所有marker则marker数量为0
            return this._visible ? count : 0;
        }
        /**
         * 显示marker,此方法只是控制css样式中的display的值。
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.show();
         */
        MarkerManager.prototype.show = function () {
            var num = this._numMarkers.length;
            for (var i = num; i--;) {
                //将视野中的marker显示
                this._numMarkers[i].bInBounds && this._numMarkers[i].show();
            }
            this._visible = true;
        }
        /**
         * 隐藏marker，此方法只是控制css样式中的display的值。
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.hide();
         */
        MarkerManager.prototype.hide = function () {
            var num = this._numMarkers.length;
            for (var i = num; i--;) {
                this._numMarkers[i].bInBounds && this._numMarkers[i].hide();
            }
            this._visible = false;
        }
        /**
         * 显示或者隐藏marker
         * @param {Marker} marker 要删除的marker
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.toggle(marker,4,15);
         */
        MarkerManager.prototype.toggle = function () {
            this._visible ? this.hide() : this.show();
        }
        /**
         * 显示地图上的marker
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.showMarkers();
         */
        MarkerManager.prototype.showMarkers = function () {
            this._visible = true;
            this._showMarkers();
        }
        /**
         * 移除在manager中的所有marker,并清空。
         * @param none
         * @return none
         *
         * @example <b>参考示例：</b><br />
         * mgr.clearMarkers();
         */
        MarkerManager.prototype.clearMarkers = function () {
            var len = this._numMarkers.length;
            for (var i = len; i--;) {
                this._numMarkers[i].bInBounds && this._map.removeOverlay(this._numMarkers[i]);
            }
            this._numMarkers.length = 0;
        }
    baidu.object.extend(MarkerManager.prototype, {
        _showMarkers: function () {
            var num = this._numMarkers.length,
                curZoom = this._map.getZoom(),
                t = this._numMarkers,
                curBounds = this._getRealBounds();
            for (var i = num; i--;) {
                //在可视区域内 && 当前zoom符合marker的显示条件
                if (curBounds.containsPoint(t[i].getPosition()) && curZoom >= t[i].minZoom && curZoom <= t[i].maxZoom) {
                    t[i].bInBounds = true;
                    //没有被添加到地图
                    if(!t[i].bAdded){
                        this._map.addOverlay(t[i]);
                        !this._visible && t[i].hide();
                        t[i].bAdded = true;
                    }else{
                        //显示marker
                        this._visible && t[i].show();
                    }
                } else if(t[i].bAdded){
                    // 当前地图zoom小于marker的最小zoom或者大于最大zoom,并且已经被添加到地图上。就将此marker隐藏
                    t[i].bInBounds = false;
                    //this._map.removeOverlay(t[i]);
                    t[i].hide();
                }
            }
        },
        /**
         * 得到实际的bound范围
         * @return none
         */
        _getRealBounds: function () {
            var curBounds = this._map.getBounds(),
                southWest = this._map.pointToPixel(curBounds.getSouthWest()),
                northEast = this._map.pointToPixel(curBounds.getNorthEast()),
                extendSW = {
                    x: southWest.x - this._opts.borderPadding,
                    y: southWest.y + this._opts.borderPadding
                },
                extendNE = {
                    x: northEast.x + this._opts.borderPadding,
                    y: northEast.y - this._opts.borderPadding
                },
                extendSwPoint = this._map.pixelToPoint(extendSW),
                extendNePoint = this._map.pixelToPoint(extendNE);
            return new BMap.Bounds(extendSwPoint, extendNePoint);
        },
        /**
         * 从数组中删除marker
         * @param {Marker} marker 要删除的marker
         * @return {String} 被删除的marker的数量
         */
        _removeMarkerFromArray: function (marker) {
            var num = this._numMarkers.length,
                i = num,
                shift = 0;
            for (i = num; i--;) {
                if (marker === this._numMarkers[i]) {
                    this._numMarkers.splice(i--, 1)
                    shift++;
                }
            }
            return shift;
        }
    });
})();

