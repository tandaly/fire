/* All rights reserved. */

Ext.ns("SYNO.SDS.Utils.DataView");SYNO.SDS.Utils.DataView.FlexcrollDataView=Ext.extend(Ext.DataView,{scrollCls:" ux-scroll",overScrollCls:" ux-scroll-over",autoFlexcroll:true,initComponent:function(){var a=this;SYNO.SDS.Utils.DataView.FlexcrollDataView.superclass.initComponent.call(a);a.addEvents("refresh","updateScrollbar");a.mon(a,"beforerender",function(){a.cls=a.cls?a.cls+a.scrollCls:a.scrollCls;a.overCls=a.overCls?a.overCls+a.overScrollCls:a.overScrollCls},a)},onStoreException:function(){this.el.unmask()},onStoreLoad:function(){var a=this;a.updateScrollbar(true);a.fireEvent("afterUpdateScrollbar",a)},onStoreClear:function(){var a=this;a.updateScrollbar(true)},bindStore:function(a,b){var c=this;SYNO.SDS.Utils.DataView.FlexcrollDataView.superclass.bindStore.apply(c,arguments);if(!b&&this.store){if(a!==this.store&&this.store.autoDestroy){this.store.destroy()}else{c.mun(a,"loadexception",c.onStoreException,c);c.mun(a,"load",c.onStoreLoad,c);c.mun(a,"clear",c.onStoreClear,c);c.mun(a,"datachanged",c.updateScrollbar,c);c.mun(a,"update",c.updateScrollbar,c)}if(!a){this.store=null}}if(a){a=Ext.StoreMgr.lookup(a);c.mon(a,"loadexception",c.onStoreException,c);c.mon(a,"load",c.onStoreLoad,c);c.mon(a,"clear",c.onStoreClear,c);c.mon(a,"datachanged",c.updateScrollbar,c);c.mon(a,"update",c.updateScrollbar,c)}},afterRender:function(){var a=this;SYNO.SDS.Utils.DataView.FlexcrollDataView.superclass.afterRender.call(a);a.mon(a,"resize",a.updateScrollbar,a);a.mon(a,"afterrender",a.updateScrollbar,a);a.mon(a,"afterlayout",a.updateScrollbar,a);a.mon(a,"updateScrollbar",a.onUpdateScrollbar,a,{buffer:100});a.updateScrollbar()},getTemplateTarget:function(){var a=this;if(!a.el.dom){return}a.scrollBar=a.scrollBar||a.el.createChild({tag:"div",style:"display:inline-block;width:auto;"});return a.scrollBar},updateScrollbar:function(a){var b=this;a=Ext.isBoolean(a)?a:false;if(a){this.onUpdateScrollbar(a)}else{b.fireEvent("updateScrollbar",a)}},onUpdateScrollbar:function(a){var b=this;if(b.isVisible()){var c=b.el.dom;if(c&&c.fleXcroll){if(a){c.fleXcroll.setScrollPos(false,0)}c.fleXcroll.updateScrollBars();if(!a){c.fleXcroll.setScrollPos(0,0,true)}}else{if(c){fleXenv.fleXcrollMain(c,this.disableTextSelect);c.onfleXcroll=(function(){this.fireEvent("flexcroll",this,this.getFleXcrollInfo(b.el.dom))}).createDelegate(this)}}c=null}},refresh:function(){var a=this;SYNO.SDS.Utils.DataView.FlexcrollDataView.superclass.refresh.call(a);a.fireEvent("refresh")},onDestroy:function(){var a=this;if(a.scrollBar){Ext.destroy(a.scrollBar);delete a.scrollBar}SYNO.SDS.Utils.DataView.FlexcrollDataView.superclass.onDestroy.apply(a,arguments)}});SYNO.SDS.Utils.DataView.SquenceStrategy=function(){var a=this;if(a.isDestroyed){return}if(a.all.getCount()===0){return}a.all.each(function(b){this.updateItem(b)},a)};SYNO.SDS.Utils.DataView.BinarySearchStrategy=function(){var e=this,d=null,a=-1,f=-1,h=-1,b=0;var g=function(){var l=null,k=0;var i=0,m=e.all.getCount()-1,j=-1;while(i<=m){j=Math.floor((i+m)/2);l=e.all.item(j);k=e.isIntens(l,e.getEl());if(l&&(k===true)){return j}else{if(k===false){i=j+1}else{if(k<0){m=j-1}}}}return -1};if(e.isDestroyed){return}if(e.all.getCount()===0){return}if((d=e.all.first())&&(e.isIntens(d,e.getEl())===true)){a=0}else{if((d=e.all.last())&&(e.isIntens(d,e.getEl())===true)){a=e.all.getCount()-1}else{a=g()}}if(a===-1){e.all.each(function(i){this.onUnLoadItem(i)},e)}else{var c;for(b=a;b<e.all.getCount();b++){c=e.isIntens(e.all.item(b),e.getEl());if(c===true){e.onLoadItem(d)}else{h=b;break}}for(b=a-1;b>=0;b--){c=e.isIntens(e.all.item(b),e.getEl());if(c===true){e.onLoadItem(d)}else{f=b;break}}if(f!==-1){for(b=f;b>=0;b--){e.onUnLoadItem(d)}}if(h!==-1){for(b=h;b<e.all.getCount();b++){e.onUnLoadItem(d)}}}};SYNO.SDS.Utils.DataView.ConstantSearchStrategy=function(){var f=this,e=null,b=-1,g=-1,h=-1,c=0;var a=function(k){var i=k.getSize(),j=k.getMargins(),l=f.el.dom.fleXdata?f.el.dom.fleXdata.scrollPosition[1][0]:0;return Math.floor(l/(i.height+j.top+j.bottom))*Math.floor(f.el.getWidth()/(i.width+j.right+j.left))};if(f.isDestroyed){return}if(f.all.getCount()===0){return}if((e=f.all.first())&&(f.isIntens(e,f.getEl())===true)){b=0}else{if((e=f.all.last())&&(f.isIntens(e,f.getEl())===true)){b=f.all.getCount()-1}else{b=a(f.all.first())}}if(b===-1){f.all.each(function(i){this.onUnLoadItem(i)},f)}else{var d;for(c=b;c<f.all.getCount();c++){d=f.isIntens(f.all.item(c),f.getEl());if(d===true){f.onLoadItem(e)}else{h=c;break}}for(c=b-1;c>=0;c--){d=f.isIntens(f.all.item(c),f.getEl());if(d===true){f.onLoadItem(e)}else{g=c;break}}if(g!==-1){for(c=g;c>=0;c--){f.onUnLoadItem(f.all.item(c))}}if(h!==-1){for(c=h;c<f.all.getCount();c++){f.onUnLoadItem(f.all.item(c))}}}};SYNO.SDS.Utils.DataView.LazyDataView=Ext.extend(SYNO.SDS.Utils.DataView.FlexcrollDataView,{delay:600,widthThreshold:0,heightThreshold:0,autoHeightThreshold:true,constructor:function(a){this.itemCls=a.itemCls||undefined;this.searchStrategy=this.searchStrategy||SYNO.SDS.Utils.DataView.SquenceStrategy.createDelegate(this);SYNO.SDS.Utils.DataView.LazyDataView.superclass.constructor.apply(this,arguments);this.last=false},initKeyNav:function(){var a;a=new Ext.KeyNav(this.el,{down:function(b){this.onKeyDown(b)},up:function(b){this.onKeyUp(b)},left:function(b){this.onKeyLeft(b)},right:function(b){this.onKeyRight(b)},scope:this})},focusNode:function(c){var b=this,a=b.getNode(c);if(!b.autoFlexcroll){return}b.fleXcrollTo(a)},getFirstSelItemIdx:function(){return this.getSelectedIndexes()[0]},getLastSelItemIdx:function(){return this.getSelectedIndexes()[this.getSelectedIndexes().length-1]},getThumbnailRowNum:function(a){var c=a.getTemplateTarget(),b=a.selected.elements[0].getStyles(),d=parseInt(b.width,10)+parseInt(b.marginLeft,10)+parseInt(b.marginRight,10);return Math.floor(c.getWidth()/d)},isNeedToShift:function(){var b=this,a=b.selected.elements[0];if(!a){return false}return true},selectItem:function(a,b){if(!b){this.select(a)}else{this.select(a,true,true)}this.focusNode(a)},selectPreItem:function(){var b=this.getFirstSelItemIdx(),a;a=(b===0)?0:b-1;this.selectItem(a)},selectNextItem:function(){var b=this.getFirstSelItemIdx(),c=this.store.getCount()-1,a;a=(b==c)?c:b+1;this.selectItem(a)},selectPreRowItem:function(c){var b=this.getFirstSelItemIdx(),a;if(b<c){this.selectItem(b);return}a=b-c;this.selectItem(a)},selectNextRowItem:function(d){var b=this.getFirstSelItemIdx(),c=this.store.getCount()-1,a;a=b+d;if(a>c){this.selectItem(b);return}this.selectItem(a)},selectPreItemIn:function(){var b=this.last,a;a=(this.getLastSelItemIdx()===0)?0:this.getLastSelItemIdx()-1;this.selectRange(b,a);this.last=b},selectNextItemIn:function(){var b=this.last,c=this.store.getCount()-1,a;a=(this.getLastSelItemIdx()+1>c)?c:this.getLastSelItemIdx()+1;this.selectRange(b,a);this.last=b},selectPreRowItemIn:function(c){var b=this.last,a;a=(this.getLastSelItemIdx()<c)?0:this.getLastSelItemIdx()-c;this.selectRange(b,a);this.last=b},selectNextRowItemIn:function(d){var b=this.last,c=this.store.getCount()-1,a;a=(this.getLastSelItemIdx()+d>c)?c:this.getLastSelItemIdx()+d;this.selectRange(b,a);this.last=b},onKeyUp:function(b){if(this.isNeedToShift()!==true){return}var a=this,c=a.getThumbnailRowNum(a);if(!b.shiftKey){a.selectPreRowItem(c)}else{a.selectPreRowItemIn(c)}},onKeyDown:function(b){if(this.isNeedToShift()!==true){return}var a=this,c=a.getThumbnailRowNum(a);if(!b.shiftKey){a.selectNextRowItem(c)}else{a.selectNextRowItemIn(c)}},onKeyRight:function(b){if(this.isNeedToShift()!==true){return}var a=this;if(!b.shiftKey){a.selectNextItem()}else{a.selectNextItemIn()}},onKeyLeft:function(b){if(this.isNeedToShift()!==true){return}var a=this;if(!b.shiftKey){a.selectPreItem()}else{a.selectPreItemIn()}},setSearchStategy:function(a){this.searchStrategy=a},onLoadItem:function(a){},onUnLoadItem:function(a){},belowthefold:function(c,a,d){var b;b=(d||a.getY())+a.dom.scrollTop+a.getHeight();return b-(c.getY()-this.heightThreshold)},rightoffold:function(d,b,a){var c;c=(a||b.getX())+b.dom.scrollLeft+b.getWidth();return c-(d.getX()-this.widthThreshold)},abovethetop:function(c,a,d){var b;b=(d||a.getY())+a.dom.scrollTop;return b>=c.getY()+this.heightThreshold+c.getHeight()},leftofbegin:function(d,b,a){var c;c=(a||b.getX())+b.dom.scrollLeft;return c>=d.getX()+this.widthThreshold+d.getWidth()},isIntens:function(e,d){var f=this,b=0,g=0,c=d.getX(),a=d.getY();if(!f.isVisible()){return false}if(!e){return false}if(f.abovethetop(e,d,a)||f.leftofbegin(e,d,c)){return false}else{if((g=f.belowthefold(e,d,a))>=0&&(b=f.rightoffold(e,d,c))>=0){return true}else{return b+g}}},fitWidth:function(){var e=this,a=e.getTemplateTarget(),f=0,c=0,d=0,h=e.all.item(0),i=true,b=0;if(!Ext.isObject(h)||!e.itemCls){return}var g=Ext.util.CSS.getRule(e.itemCls);if(!g){return}e.marginLeft=e.marginLeft||h.getMargins("l")||0;e.marginRight=e.marginRight||h.getMargins("r")||0;b=e.marginLeft+e.marginRight;if(!Ext.isNumber(b)){return}d=h.getWidth()+b;c=Math.floor(a.getWidth()/d);if(c===0){return}f=Math.floor(a.getWidth()%d);if(h.getMargins("l")!==Math.floor((e.marginLeft+f/2/c))){i=i&&Ext.util.CSS.updateRule(e.itemCls,"margin-left",Math.floor((e.marginLeft+f/2/c))+"px");i=i&&Ext.util.CSS.updateRule(e.itemCls,"margin-right",Math.floor((e.marginRight+f/2/c))+"px")}return i},updateScrollbar:function(a){var b=this;a=Ext.isBoolean(a)?a:false;if(a){this.onUpdateScrollbar(a)}else{b.fireEvent("updateScrollbar",a)}},onUpdateScrollbar:function(a){var b=this;if(b.isVisible()){var c=b.el.dom;if(c&&c.fleXcroll){if(a){c.fleXcroll.setScrollPos(false,0)}c.fleXcroll.updateScrollBars();if(!a){c.fleXcroll.setScrollPos(0,0,true)}}else{if(c){fleXenv.fleXcrollMain(c,this.disableTextSelect);c.onfleXcroll=(function(){if(b.isVisible()&&b.onUpdateView){b.onUpdateView()}this.fireEvent("flexcroll",this,this.getFleXcrollInfo(b.el.dom))}).createDelegate(this)}}c=null}},afterRender:function(){var a=this;SYNO.SDS.Utils.DataView.LazyDataView.superclass.afterRender.call(a);a.mon(a,{resize:a.onResize,scope:a});a.initKeyNav();this.updateHeightThreshold()},onUserResize:function(){this.updateScrollbar();this.updateHeightThreshold();this.fitWidth.createSequence(function(){this.updateScrollbar.defer(300,this)},this).defer(330,this)},onResize:function(){if(!this.resizeTask){this.resizeTask=new Ext.util.DelayedTask(this.onUserResize,this)}this.resizeTask.delay(350)},updateHeightThreshold:function(){if(this.autoHeightThreshold&&(!Ext.isIE||Ext.isModernIE)){this.heightThreshold=this.getEl().getHeight()}},onUpdateView:function(){if(this.delay){if(!this.renderTask){this.renderTask=new Ext.util.DelayedTask(this.searchStrategy,this)}this.renderTask.delay(this.delay)}else{this.searchStrategy()}},updateItem:function(a){var b=this;if(a.isVisible()&&b.isIntens(a,b.getEl())===true){b.onLoadItem(a)}else{b.onUnLoadItem(a)}},lazyLoadItem:function(a){var b=this;b.updateItem(Ext.fly(a))},onBeforeLoad:function(){if(this.loadingText){this.clearSelections(false,true);this.getEl().mask(this.loadingText,"x-mask-loading");this.all.clear()}},refresh:function(){var a=this;if(this.loadingText){this.getEl().unmask()}SYNO.SDS.Utils.DataView.LazyDataView.superclass.refresh.call(a);a.onUpdateView()},removeTask:function(b){var a=this[b];if(a&&a.cancel){a.cancel();this[b]=null}},destroy:function(){this.removeTask("renderTask");SYNO.SDS.Utils.DataView.LazyDataView.superclass.destroy.call(this)}});