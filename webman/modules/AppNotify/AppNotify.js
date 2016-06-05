/* All rights reserved. */

Ext.define("SYNO.SDS.PollingTask.BadgeInfo",{statics:{getInfoOfApp:function(a){if(this.data&&this.data[a]){return this.data[a].unread}else{return 0}},getInfoOfFn:function(b,a){if(this.data&&this.data[b]&&this.data[b].fn[a]){return this.data[b].fn[a].unread}else{return 0}},each:function(b,a){if(this.data){Ext.iterate(this.data,b,a||this)}},eachFnOfApp:function(b,c,a){if(this.data&&this.data[b]&&this.data[b].fn){Ext.iterate(this.data[b].fn,c,a||this)}}}});Ext.define("SYNO.SDS.AppNotify.Instance",{extend:"SYNO.SDS.AppInstance",constructor:function(){this.customList={};this.callParent(arguments)},initInstance:function(){SYNO.SDS.StatusNotifier.fireEvent("appnotifyready");var a=new Ext.Component({appInstance:this});this.addInstance(a);this.startPollTask(true);this.mon(SYNO.SDS.StatusNotifier,"registerappnotify",this.onRegisterApp,this);this.mon(SYNO.SDS.StatusNotifier,"unregisterappnotify",this.unRegisterApp,this);this.mon(SYNO.SDS.StatusNotifier,"jsconfigLoaded",this.onJSConfigLoaded,this)},onRegisterApp:function(d,a,e,c){var b=(a)?a.api+a.method:d;if(this.customList[b]){return}this.customList[b]={callback:e,webapi:a,className:d,scope:c};this.startPollTask(true)},unRegisterApp:function(a){var b=a.api+a.method;if(this.customList[b]){delete this.customList[b];this.startPollTask(true)}},onJSConfigLoaded:function(a,c){var d,b=false;for(d in this.customList){if(this.customList.hasOwnProperty(d)&&this.customList[d].className&&!SYNO.SDS.StatusNotifier.isAppEnabled(this.customList[d].className)){delete this.customList[d];b=true}}if(b===true){this.startPollTask(true)}},startPollTask:function(c){var b=[{api:"SYNO.Core.AppNotify",method:"get",version:1}],d,a;this.stopPollTask();for(d in this.customList){if(this.customList.hasOwnProperty(d)){a=this.customList[d].webapi;b.push(a)}}this.pollTaskId=this.pollReg({interval:10,immediate:!!c,webapi:{api:"SYNO.Entry.Request",version:1,method:"request",stopwhenerror:true,params:{compound:b}},scope:this,status_callback:this.onAPIReturn})},stopPollTask:function(){if(Ext.isString(this.pollTaskId)&&this.pollUnreg(this.pollTaskId)){this.pollTaskId=null}},onAPIReturn:function(n,g,a){if(!n&&g.has_fail===false){return}var m,h,l,b,f,j;m=g.result[0].data||{};for(h=1;h<g.result.length;h++){b=g.result[h];f=b.api+b.method;j=this.customList[f];if(j&&j.callback){l=j.callback.call(j.scope||window,g.result[h].data);Ext.apply(m,l)}}SYNO.SDS.PollingTask.BadgeInfo.data=null;SYNO.SDS.PollingTask.BadgeInfo.data=m;SYNO.SDS.StatusNotifier.fireEvent("badgenumget",SYNO.SDS.PollingTask.BadgeInfo);var k=SYNO.SDS.AppView.appContainer.systemAppPanel;if(k.isVisible()){var e=k.getApps();Ext.defer(this.addBadgeToPanelItems,500,this,[e,m])}var d=SYNO.SDS.AppView.appContainer.searchResultPanel;if(d.isVisible()){var c=d.getApps();Ext.defer(this.addBadgeToPanelItems,500,this,[c,m])}this.addBadgeToDesktopItems(m)},addBadgeToPanelItems:function(a,c){for(var b=0;b<a.length;b++){if(a[b].badge instanceof SYNO.SDS.Utils.Notify.Badge&&!c[a[b].className]){a[b].badge.setNum(0)}if(c[a[b].className]&&!a[b].hidden){var d={alignPos:"br-tr",alignOffset:a[b].badgeAlignOffset};this.updateBadge(a[b],a[b].el.dom.lastChild,c[a[b].className].unread,d)}}},addBadgeToDesktopItems:function(m){var n=SYNO.SDS.Desktop.iconItems;var e={alignPos:"br-br",alignOffset:[8,4]};var f=function(q,s){var p=!q.param,j=q.param&&q.param.fn,i=q.className,r=(j)?q.param.fn:undefined;if(s[i]&&(p===true)){return s[i].unread}else{if(s[i]&&j&&s[i].fn&&s[i].fn[r]){return s[i].fn[r].unread}}return 0};for(var g=0;g<n.length;g++){if(n[g].className!="SYNO.SDS.VirtualGroup"){var h=f(n[g],m),o=n[g].li_el.dom.firstChild;this.updateBadge(n[g],o,h,e)}else{var l=0;var d=n[g].subItems;for(var c=0;c<d.length;c++){var a=f(d[c],m),b=n[g].iconItems[c],k=(b)?b.li_el.dom.firstChild:null;l+=a;if(b){this.updateBadge(b,k,a,e)}}this.updateBadge(n[g],n[g].li_el.dom.firstChild,l,e)}}},updateBadge:function(a,b,d,c){c=c||{};Ext.applyIf(c,{alignPos:"br-br",alignOffset:[0,0]});if(!(a.badge instanceof SYNO.SDS.Utils.Notify.Badge)){a.badge=new SYNO.SDS.Utils.Notify.Badge({renderTo:b,alignPos:c.alignPos,alignOffset:c.alignOffset});a.badge.setNum(d)}else{if(a.badge.badgeNum!=d){a.badge.setNum(d)}}}});