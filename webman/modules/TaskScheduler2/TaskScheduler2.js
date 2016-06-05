/* All rights reserved. */

Ext.namespace("SYNO.SDS.TaskScheduler2.Script.FormPanel");Ext.define("SYNO.SDS.TaskScheduler2.Script.FormPanel",{extend:"SYNO.ux.FormPanel",constructor:function(b){var a=this.fillConfig(b);this.callParent([a])},fillConfig:function(b){var a={autoFlexcroll:false,items:[{xtype:"syno_fieldset",title:_T("schedule","run_command"),items:[{xtype:"syno_textarea",allowBlank:false,fieldLabel:_T("common","command_line_wrap"),itemId:"script",name:"script",emptyText:"/volume1/public/job.sh",id:this.script_id=Ext.id(),width:300,validator:function(c){if(8192<c.length){return false}return true},height:100}]}]};Ext.apply(a,b);return a},getAppType:function(){return"script"},getData:function(){return this.getForm().getValues()},setData:function(a){this.getForm().setValues(a);this.getForm().findField("script").clearInvalid()},isValid:function(){return Ext.getCmp(this.script_id).isValid()}});Ext.namespace("SYNO.SDS.TaskScheduler2.Recycle.FormPanel");Ext.define("SYNO.SDS.TaskScheduler2.Recycle.ReserveFilePanel",{extend:"SYNO.ux.FormPanel",constructor:function(b){var a=this.fillConfig(b);SYNO.LayoutConfig.fill(a);this.callParent([a])},fillConfig:function(b){this.ext_store=new Ext.data.SimpleStore({fields:["file_ext"]});this.addManagedComponent(this.ext_store);var a={layout:"form",trackResetOnLoad:true,border:false,autoFlexcroll:false,items:[{xtype:"syno_displayfield",value:_T("schedule","clean_recycle_reserve_file_policy_desc")},{xtype:"syno_checkbox",boxLabel:_T("schedule","clean_recycle_reserve_file_extension"),name:"extension_check"},{xtype:"syno_superboxselect",id:this.superbox_file_ext=Ext.id(),hideLabel:true,width:350,fieldLabel:"",displayField:"file_ext",valueField:"file_ext",grow:true,resizable:true,name:"extension",triggerAction:"all",mode:"local",allowAddNewData:true,addNewDataOnBlur:true,renderFieldBtns:false,emptyText:_T("schedule","clean_recycle_reserve_file_extension_example"),maskRe:/[^.\\\?\/\:\*"><\|]/,store:this.ext_store,listeners:{scope:this,newitem:this.onAddNewitem}},{xtype:"syno_compositefield",hideLabel:true,items:[{xtype:"syno_checkbox",name:"size_greater_check",boxLabel:_T("schedule","clean_recycle_reserve_file_size_greater")},{xtype:"syno_numberfield",vtype:"number",allowBlank:false,maxlength:9,name:"size_greater",value:"100",width:80},{xtype:"syno_displayfield",value:_T("common","size_mb")}]},{xtype:"syno_compositefield",hideLabel:true,items:[{xtype:"syno_checkbox",name:"size_smaller_check",boxLabel:_T("schedule","clean_recycle_reserve_file_size_less")},{xtype:"syno_numberfield",vtype:"number",allowBlank:false,maxlength:9,name:"size_smaller",value:"1",width:80},{xtype:"syno_displayfield",value:_T("common","size_mb")}]}]};Ext.apply(a,b);return a},getValues:function(){var a=this.getForm().getValues();a.extension=this.getForm().findField("extension").getValueEx();a.extension_check="true"===a.extension_check?true:false;a.size_greater_check="true"===a.size_greater_check?true:false;a.size_smaller_check="true"===a.size_smaller_check?true:false;if(a.size_greater_check){a.size_greater=parseInt(a.size_greater,10)}if(a.size_smaller_check){a.size_smaller=parseInt(a.size_smaller,10)}return a},onAddNewitem:function(b,a,c){a=a.trim();if(a){b.addItem({file_ext:Ext.util.Format.htmlEncode(a)})}}});Ext.define("SYNO.SDS.TaskScheduler2.Recycle.AdvanceWindow",{extend:"SYNO.SDS.ModalWindow",constructor:function(b){this.override=b;var a=this.fillConfig(b);this.callParent([a]);try{this.ReserveFilePanel.getForm().setValues(this.override.clean_file_policy.reserve_policy);this.ReserveFilePanel.getForm().findField("extension").setValueEx(this.override.clean_file_policy.reserve_policy.extension)}catch(c){}this.mon(this.ReserveFilePanel,"afterlayout",this.setDomRelation,this,{single:true})},setDomRelation:function(b,c){var a,e,d;a=new SYNO.ux.Utils.EnableCheckGroup(this.ReserveFilePanel.getForm(),"extension_check",["extension"]);e=new SYNO.ux.Utils.EnableCheckGroup(this.ReserveFilePanel.getForm(),"size_greater_check",["size_greater"]);d=new SYNO.ux.Utils.EnableCheckGroup(this.ReserveFilePanel.getForm(),"size_smaller_check",["size_smaller"])},fillConfig:function(b){this.ReserveFilePanel=new SYNO.SDS.TaskScheduler2.Recycle.ReserveFilePanel(b);var a={title:_T("schedule","clean_recycle_advance_setting_title"),width:550,minWidth:500,autoHeight:true,items:this.ReserveFilePanel,cls:"recycletask-advanced-dialog",buttons:[{xtype:"syno_button",btnStyle:"blue",text:_T("common","apply"),scope:this,handler:this.onOk},{xtype:"syno_button",btnStyle:"grey",text:_T("common","cancel"),scope:this,handler:this.onCancel}]};Ext.apply(a,b);return a},onOk:function(){if(!this.ReserveFilePanel.getForm().isValid()||(this.ReserveFilePanel.getValues().extension_check&&""===this.ReserveFilePanel.getForm().getValues().extension)){this.setStatusError({text:_T("common","forminvalid"),clear:true});return}try{if(parseInt(this.ReserveFilePanel.getForm().getValues().size_greater,10)<=parseInt(this.ReserveFilePanel.getForm().getValues().size_smaller,10)){this.ReserveFilePanel.getForm().findField("size_greater").markInvalid(_T("error","error_bad_field"));this.ReserveFilePanel.getForm().findField("size_smaller").markInvalid(_T("error","error_bad_field"));this.setStatusError({text:_T("common","forminvalid"),clear:true});return}}catch(a){}this.ReserveFilePanel.getForm().setValues(this.ReserveFilePanel.getForm().getValues());this.override.advconfig=this.ReserveFilePanel.getValues();this.hide()},onCancel:function(){this.close()}});Ext.define("SYNO.SDS.TaskScheduler2.Recycle.FormPanel",{extend:"SYNO.ux.FormPanel",constructor:function(c){var a=this.fillConfig(c);SYNO.LayoutConfig.fill(a);this.callParent([a]);var b=this.getComponent("clean_policy_form");this.mon(b,"afterlayout",this.setDomRelation,this,{single:true});this.shareApi={api:"SYNO.Core.Share",method:"list",params:{additional:["recyclebin"]},version:1};this.userHomeApi={api:"SYNO.Core.User.Home",method:"get",version:1}},setDomRelation:function(b,c){var a;a=new SYNO.ux.Utils.EnableRadioGroup(this.getForm(),"policy",{time:["time"],size:["size","sort_type"]})},fillConfig:function(b){this.share_store=new Ext.data.Store({reader:new Ext.data.JsonReader({root:"shares"},["name","enable_recycle_bin","recycle_bin_admin_only"])});this.addManagedComponent(this.share_store);var a={autoFlexcroll:false,cls:"syno-task-scheduler",items:[{xtype:"syno_fieldset",title:_T("schedule","clean_recycle_bin"),items:[{xtype:"syno_radio",id:this.clean_all_id=Ext.id(),boxLabel:_T("share","share_clean_all_recycle_bin"),name:"clean_all",inputValue:"true",handler:this.Changed,scope:this},{xtype:"syno_radio",boxLabel:_T("schedule","clean_recycle_bin_select_share_desc"),name:"clean_all",inputValue:"false"},{xtype:"syno_superboxselect",hideLabel:true,height:150,width:400,indent:1,fieldLabel:"",displayField:"name",id:this.selected_shares_id=Ext.id(),resizable:true,valueField:"name",name:"selected_shares",triggerAction:"all",mode:"local",store:this.share_store}]},{xtype:"syno_fieldset",title:_T("schedule","clean_recycle_basic_policy_title"),itemId:"clean_policy_form",items:[{xtype:"syno_radio",hideLabel:true,boxLabel:_T("schedule","clean_recycle_basic_policy_clean_all"),name:"policy",checked:true,inputValue:"clean_all"},{xtype:"syno_compositefield",hideLabel:true,items:[{xtype:"syno_radio",boxLabel:_T("schedule","clean_recycle_basic_policy_clean_older"),name:"policy",inputValue:"time"},{xtype:"syno_numberfield",vtype:"number",allowBlank:false,maxlength:9,name:"time",value:"7",width:80},{xtype:"syno_displayfield",value:_T("common","time_days")}]},{xtype:"syno_compositefield",hideLabel:true,items:[{xtype:"syno_radio",hideLabel:true,boxLabel:_T("schedule","clean_recycle_basic_policy_clean_size"),name:"policy",inputValue:"size"},{xtype:"syno_numberfield",vtype:"number",allowBlank:false,name:"size",maxlength:9,value:"50",width:80},{xtype:"syno_displayfield",value:_T("common","size_mb")}]},{indent:1,name:"sort_type",hiddenName:"sort_type",xtype:"syno_combobox",hideLabel:true,triggerAction:"all",editable:false,mode:"local",value:0,width:400,store:new Ext.data.ArrayStore({fields:["value","desc"],data:[[0,_T("schedule","clean_recycle_basic_policy_clean_size_sort_by_size")],[1,_T("schedule","clean_recycle_basic_policy_clean_size_sort_by_time")]]}),valueField:"value",displayField:"desc"},{xtype:"syno_displayfield"},{xtype:"syno_button",name:"advance_btn",text:_T("schedule","clean_recycle_advance_setting_title"),handler:this.openAdvance,scope:this}]}]};Ext.apply(a,b);return a},openAdvance:function(){var a=this.obj;try{this.adv.show();return}catch(b){}Ext.apply(a,{owner:this.owner});this.adv=new SYNO.SDS.TaskScheduler2.Recycle.AdvanceWindow(a);this.adv.show()},Changed:function(d,c){if(c){Ext.getCmp(this.selected_shares_id).setDisabled(true)}else{Ext.getCmp(this.selected_shares_id).setDisabled(false)}},getAppType:function(){return"recycle"},getAdditionalAPI:function(){return[this.shareApi,this.userHomeApi]},getData:function(){var a=this.getForm().getValues();a.clean_share_policy={};a.clean_file_policy={};a.clean_share_policy.clean_all="true"===a.clean_all?true:false;if(Ext.isString(a.selected_shares)){a.clean_share_policy.shares=[a.selected_shares]}else{a.clean_share_policy.shares=a.selected_shares}a.clean_file_policy.policy=a.policy;if("size"===a.policy){a.clean_file_policy.size=parseInt(a.size,10);a.clean_file_policy.sort_type=parseInt(a.sort_type,10)}else{if("time"===a.policy){a.clean_file_policy.time=parseInt(a.time,10)}}a.clean_file_policy.reserve_policy=this.obj.advconfig;delete a.clean_all;delete a.selected_shares;delete a.policy;delete a.size;delete a.time;delete a.sort_type;return a},setData:function(d,a){var b={shares:[]};var c=0;this.blEnableAllRecycle=true;this.blEnableHome=false;if(this.preloadConfig&&this.preloadConfig.share){d.clean_share_policy.clean_all=false;d.clean_share_policy.shares=[];for(c=0;c<this.preloadConfig.share.length;c++){d.clean_share_policy.shares.push(this.preloadConfig.share[c].id)}}for(c=0;c<a.length;c++){if(SYNO.ux.Utils.checkApiConsistency(a[c],this.shareApi)){b=a[c].data}if(SYNO.ux.Utils.checkApiConsistency(a[c],this.userHomeApi)){if(a[c].data.enable){b.shares.push({name:"home"});this.blEnableHome=true}if(a[c].data.enable_recycle_bin===false){this.blEnableAllRecycle=false}}}this.share_store.loadData(b);if(this.blEnableAllRecycle){for(c=0;c<this.share_store.getTotalCount();c++){if(this.share_store.getAt(c).data.enable_recycle_bin===false){this.blEnableAllRecycle=false;break}}}this.obj=d;if(d.clean_share_policy.clean_all){Ext.getCmp(this.clean_all_id).setValue("true")}else{Ext.getCmp(this.clean_all_id).setValue("false")}this.getForm().setValues(d.clean_file_policy);this.getForm().setValues(d.clean_share_policy);if(d.clean_share_policy.shares){Ext.getCmp(this.selected_shares_id).setValue(d.clean_share_policy.shares)}if(d.clean_file_policy.policy){this.getForm().findField("policy").setValue(d.clean_file_policy.policy)}else{this.getForm().findField("policy").setValue("clean_all")}},isValid:function(){if("false"===this.getForm().getValues().clean_all&&""===Ext.getCmp(this.selected_shares_id).getValue()){return false}if("time"===this.getForm().getValues().policy&&(!this.getForm().findField("time").isValid()||""===this.getForm().getValues().time)){return false}if("size"===this.getForm().getValues().policy&&(!this.getForm().findField("size").isValid()||""===this.getForm().getValues().size)){return false}return true}});Ext.namespace("SYNO.SDS.TaskScheduler2.Beep.FormPanel");Ext.define("SYNO.SDS.TaskScheduler2.Beep.FormPanel",{extend:"SYNO.ux.FormPanel",constructor:function(b){var a=this.fillConfig(b);SYNO.LayoutConfig.fill(a);this.callParent([a])},fillConfig:function(b){var a={items:[{xtype:"syno_fieldset",title:_T("beep","beep_title"),items:[{xtype:"syno_textfield",vtype:"beepduration",allowBlank:false,fieldLabel:_T("schedule","beep_duration"),name:"beep_duration",id:this.beep_duration_id=Ext.id(),width:100}]}]};Ext.apply(a,b);return a},getAppType:function(){return"beep"},getData:function(){return this.getForm().getValues()},setData:function(a){this.getForm().setValues(a)},isValid:function(){return Ext.getCmp(this.beep_duration_id).isValid()}});Ext.namespace("SYNO.SDS.TaskScheduler2.Service.FormPanel");SYNO.SDS.TaskScheduler2.Service.PackageType="package";Ext.define("SYNO.SDS.TaskScheduler2.Service.FormPanel",{extend:"SYNO.ux.FormPanel",constructor:function(b){var a=this.fillConfig(b);this.callParent([a])},fillConfig:function(b){this.service_list=new SYNO.SDS.TaskScheduler2.Service.List({owner:this.owner,title:""});var a={autoFlexcroll:false,listeners:{scope:this,afterlayout:this.onAfterlayout},items:[{xtype:"syno_fieldset",title:_T("schedule","service_action"),items:[{xtype:"syno_compositefield",hideLabel:true,items:[{xtype:"syno_radio",id:this.service_action_id=Ext.id(),boxLabel:_T("common","stop_service"),name:"service_action",inputValue:"stop"},{xtype:"syno_radio",indent:1,boxLabel:_T("common","start_service"),name:"service_action",inputValue:"start"}]}]},this.service_list]};Ext.apply(a,b);return a},onAfterlayout:function(){this.service_list.getView().refresh()},getAppType:function(){return"service"},getData:function(){var a={services:this.service_list.getData(),action:Ext.getCmp(this.service_action_id).getGroupValue()};return a},setData:function(a){this.service_list.serviceStore.loadData(a.services);Ext.getCmp(this.service_action_id).setValue(a.action)},isValid:function(){for(var a=0;a<this.service_list.getData().length;++a){if(this.service_list.getData()[a].enable){return true}}return false}});Ext.define("SYNO.SDS.TaskScheduler2.Service.List",{extend:"SYNO.ux.GridPanel",constructor:function(a){this.remoteItems=null;this.owner=a.owner;this.initServiceItems();var b=this.fillConfig(a);this.callParent([b])},getData:function(){var a=[],c;for(var b=0;b<this.getStore().getTotalCount();++b){c=this.getStore().getAt(b).data;a.push({enable:c.enable,name:c.name,type:c.type,id:c.id})}return a},fillConfig:function(){var c=new SYNO.ux.EnableColumn({header:_T("common","enabled"),dataIndex:"enable",width:150,align:"center",menuDisabled:true,enableFastSelectAll:true});var b=new Ext.grid.ColumnModel([{id:"name",sortable:true,menuDisabled:true,header:_T("common","name"),dataIndex:"name",renderer:this.nameRenderer.createDelegate(this),width:250},{id:"type",menuDisabled:true,hidden:true,dataIndex:"type",renderer:this.typeRenderer.createDelegate(this),groupRenderer:function(d,f,h,i,e,g){if(d==="package"){return _T("schedule","title_package")}else{return _T("schedule","title_service")}}},c]);this.serviceStore=new Ext.data.GroupingStore({reader:new Ext.data.JsonReader({},["enable","name","type","id"]),remoteGroup:false,groupField:"type",sortInfo:{field:"name",direction:"ASC"}});this.view=new SYNO.SDS.Utils.GroupingView({forceFit:true,groupTextTpl:"{group}"});this.addManagedComponent(this.serviceStore);var a={ds:this.serviceStore,cm:b,autoExpandColumn:"name",height:270,view:this.view,plugins:[c]};return a},initServiceItems:function(){this.serviceItems=[{name:"Samba",label:_T("network","wnds_file_service")},{name:"AFP",label:_T("network","apple_subject")},{name:"NFS",label:_T("nfs","nfs_title")},{name:"BonjourPrinter",label:_T("network","bonjourPrinter_subject")},{name:"AutoBlock",label:_T("tree","leaf_autoblock")},{name:"FTP",label:_T("tree","leaf_ftp")},{name:"FTPES",label:_T("tree","leaf_ftpes")},{name:"SFTP",label:_T("tree","leaf_sftp")},{name:"WebStation",label:_T("tree","leaf_service")},{name:"WebDAV",label:_T("tree","leaf_webdav")},{name:"SecureWebDAV",label:this.appendHTTPS(_T("tree","leaf_webdav"))},{name:"FileStation",label:_T("tree","leaf_filestation")},{name:"SecureFileStation",label:this.appendHTTPS(_T("tree","leaf_filestation"))},{name:"NTP",label:_T("time","ntp_service")}]},appendHTTPS:function(a){return a+" (HTTPS)"},typeRenderer:function(e,b,a,f,d,c){if(e===1){return"Service"}else{if(e===2){return"Package"}}return e},nameRenderer:function(f,b,a,g,d,c){for(var e=0;e<this.serviceItems.length;++e){if(this.serviceItems[e].name===f){return this.serviceItems[e].label}}return f}});Ext.namespace("SYNO.SDS.TaskScheduler2.Power.FormPanel");SYNO.SDS.TaskScheduler2.Power.FormPanel=Ext.extend(Ext.form.FormPanel,{constructor:function(b){var a=this.fillConfig(b);SYNO.SDS.TaskScheduler2.Power.FormPanel.superclass.constructor.call(this,a)},fillConfig:function(b){var a={title:"Setting",items:[{xtype:"syno_fieldset",title:_T("helptoc","power"),items:[{xtype:"syno_radio",id:this.power_action_id=Ext.id(),boxLabel:_T("schedule","power_on"),name:"power_action",inputValue:"1"},{xtype:"syno_radio",boxLabel:_T("schedule","power_off"),name:"power_action",inputValue:"0"}]}]};Ext.apply(a,b);return a},getData:function(){return this.getForm().getValues()},setData:function(a){Ext.getCmp(this.power_action_id).setValue(a.power_action)}});Ext.namespace("SYNO.SDS.TaskScheduler2");Ext.define("SYNO.SDS.TaskScheduler2.EditDialog",{extend:"SYNO.SDS.ModalWindow",constructor:function(b){var a=this.fillConfig(b);this.callParent([a])},fillConfig:function(d){this.EditPanelBasic=new SYNO.SDS.TaskScheduler2.EditBasicPanel(d.basic_limitation);if(d.app==="SYNO.SDS.TaskScheduler.AutoPower"||d.app==="SYNO.SDS.TaskScheduler.DSMAutoUpdate"||d.app==="SYNO.SDS.DataAnalysis"){this.EditPanelSchedule=new SYNO.SDS.TaskScheduler2.EditSchedulePanelAutoPower()}else{this.EditPanelSchedule=new SYNO.SDS.TaskScheduler2.EditSchedulePanel({needTitle:true,needBorder:false})}if(d.app==="SYNO.SDS.TaskScheduler2.Recycle"){d.simple=0}var c=[];if(""===d.appPanel){c=[{title:_T("schedule","basic_info"),hideBorders:true,items:[this.EditPanelBasic]},this.EditPanelSchedule];this.EditPanelApp=""}else{var e=Ext.namespace(d.appPanel);this.EditPanelApp=new e({title:"",owner:this,preloadConfig:d.preloadConfig});if(d.simple){c=[{title:_T("schedule","basic_info"),hideBorders:true,items:[this.EditPanelBasic,this.EditPanelApp]},this.EditPanelSchedule]}else{c=[{title:_T("schedule","basic_info"),hideBorders:true,items:[this.EditPanelBasic]},this.EditPanelSchedule,{title:_T("schedule","task_settings"),hideBorders:true,items:[this.EditPanelApp]}]}}var b=new SYNO.ux.TabPanel({deferredRender:false,layoutOnTabChange:true,activeTab:0,plain:true,height:450,items:c});var f=_T("schedule","create_task");if(-1!==d.task_id){f=_T("schedule","edit_task")}var a={title:f,width:550,height:530,minWidth:530,minHeight:530,items:b,buttons:[{xtype:"syno_button",btnStyle:"blue",disabled:_S("demo_mode"),text:_T("common","apply"),scope:this,handler:this.hClickOK},{xtype:"syno_button",btnStyle:"grey",text:_T("common","cancel"),scope:this,handler:this.hClickCancel}]};Ext.apply(a,d);return a},hClickOK:function(){var a="basic";if(!this.EditPanelBasic.isValid()||!this.EditPanelSchedule.isValid()||!(""===this.EditPanelApp||!this.EditPanelApp.isValid||this.EditPanelApp.isValid())){this.setStatusError({text:_T("common","forminvalid"),clear:true});return}var b=this.EditPanelBasic.getData();b.schedule=this.EditPanelSchedule.getData();if(this.EditPanelApp){b.extra=this.EditPanelApp.getData();a=this.EditPanelApp.getAppType()}if(a==="recycle"){if(false===b.extra.clean_share_policy.clean_all){b.extra.enableRecycle="select"}else{if(false===this.EditPanelApp.blEnableAllRecycle){this.getMsgBox().confirm("",_T("schedule","schedule_enable_all_recycle_bin"),function(c){if(c==="yes"){if(this.EditPanelApp.blEnableHome){b.extra.enableRecycle="all_include_home"}else{b.extra.enableRecycle="all_exclude_home"}}this.hClickOK2(b,a)},this);return}}}this.hClickOK2(b,a)},hClickOK2:function(d,c){var b="SYNO.Core.TaskScheduler";var a=false;if(-1===d.id){delete d.id;a=true;d.type=c}this.setStatusBusy();this.sendWebAPI({api:b,method:!a?"set":"create",version:2,params:d,callback:function(g,f,e){this.clearStatusBusy();this.close();this.owner_grid.loadData()},scope:this})},hClickCancel:function(){this.close()},onOpen:function(){this.loadTask(this.task_id);this.callParent()},loadTask:function(a){this.setStatusBusy();var d="SYNO.Core.TaskScheduler";var c="basic";if(this.EditPanelApp){c=this.EditPanelApp.getAppType()}var f={api:"SYNO.Core.User",method:"list",version:1};var e={api:d,method:"get",version:2,params:{id:a}};if(-1===a){e.params.type=c}var b=[f,e];if(this.EditPanelApp&&this.EditPanelApp.getAdditionalAPI){b=b.concat(this.EditPanelApp.getAdditionalAPI())}this.sendWebAPI({params:{},compound:{stopwhenerror:false,params:b},scope:this,callback:function(i,h,g){if(i&&!h.has_fail){this.loadSuccess(h.result)}else{this.clearStatusBusy();this.getMsgBox().alert(_T("schedule","load_task"),_T("schedule","load_task_error"),function(){this.close()},this)}}})},loadSuccess:function(b){this.clearStatusBusy();var a=b[1].data;a.users=[{name:"root"}];a.users=a.users.concat(b[0].data.users);this.EditPanelBasic.setData(a);this.EditPanelSchedule.setData(b[1].data.schedule,b[1].data.type);if(""!==this.EditPanelApp){this.EditPanelApp.setData(b[1].data.extra,b)}}});Ext.define("SYNO.SDS.TaskScheduler2.EditBasicPanel",{extend:"SYNO.ux.FormPanel",constructor:function(b){var a=this.fillConfig(b);this.callParent([a])},fillConfig:function(b){this.owner_store=new Ext.data.Store({reader:new Ext.data.JsonReader({root:"users"},["name"])});this.addManagedComponent(this.owner_store);var a={autoHeight:true,items:[{xtype:"syno_fieldset",title:_T("vpnc","basic_setting"),items:[{xtype:"syno_textfield",allowBlank:false,emptyText:"Task name",id:this.task_name_id=Ext.id(),fieldLabel:_T("localbkp","localbkp_bkpset_name"),name:"name",width:200,validator:function(c){if(4095<c.length){return false}return true},itemId:"name"},{xtype:"hidden",name:"id"},{xtype:"syno_combobox",triggerAction:"all",width:200,id:this.task_owner_id=Ext.id(),listWidth:200,fieldLabel:_T("common","owner"),name:"owner",editable:false,valueField:"name",displayField:"name",mode:"local",store:this.owner_store},{xtype:"syno_checkbox",id:this.enabled_id=Ext.id(),hidden:b.hide_enable?true:false,boxLabel:_T("common","enabled"),name:"enable",itemId:"enabled"}]}]};Ext.apply(a,b);return a},getData:function(){var a;a=this.getForm().getValues();if(!Ext.getCmp(this.enabled_id).getValue()){a.enable=false}else{a.enable=true}a.id=parseInt(a.id,10);return a},setData:function(a){this.owner_store.loadData(a);this.getForm().setValues(a);if(!a.can_edit_name){Ext.getCmp(this.task_name_id).setDisabled(true)}if(!a.can_edit_owner){Ext.getCmp(this.task_owner_id).setDisabled(true)}},isValid:function(){return Ext.getCmp(this.task_name_id).isValid()}});Ext.define("SYNO.SDS.TaskScheduler2.EditSchedulePanel",{extend:"SYNO.ux.FormPanel",title:null,border:false,constructor:function(b){var a=this.fillConfig(b);this.callParent([a])},hSwitchType:function(d,c){if(c){Ext.getCmp(this.week_name_id).setDisabled(false);Ext.getCmp(this.date_id).setDisabled(true);Ext.getCmp(this.repeat_id).setDisabled(true)}else{Ext.getCmp(this.week_name_id).setDisabled(true);Ext.getCmp(this.date_id).setDisabled(false);Ext.getCmp(this.repeat_id).setDisabled(false)}},setData:function(b,a){Ext.getCmp(this.week_name_id).setValue(b.week_day);Ext.getCmp(this.date_id).setValue(b.date);Ext.getCmp(this.repeat_id).setValue(b.repeat_date);if(b.date_type===0){Ext.getCmp(this.by_date_id).setValue(false);Ext.getCmp(this.per_week_id).setValue(true);Ext.getCmp(this.date_id).setDisabled(true);Ext.getCmp(this.repeat_id).setDisabled(true)}else{Ext.getCmp(this.by_date_id).setValue(true);Ext.getCmp(this.per_week_id).setValue(false);Ext.getCmp(this.week_name_id).setDisabled(true)}Ext.getCmp(this.hour_id).setValue(b.hour);Ext.getCmp(this.min_id).setValue(b.minute);this.updateRepeatHourStore(b,a);if(b.repeat_min){Ext.getCmp(this.repeat_hour_id).setValue(b.repeat_hour+b.repeat_min*100)}else{Ext.getCmp(this.repeat_hour_id).setValue(b.repeat_hour)}this.updateLastWorkTimeStore();Ext.getCmp(this.last_work_hour_id).setValue(b.last_work_hour)},getData:function(){var a={};if(true===Ext.getCmp(this.per_week_id).getValue()){a.date_type=0;a.week_day=Ext.getCmp(this.week_name_id).getValue()}else{a.date_type=1;a.date=Ext.getCmp(this.date_id).getValue().format("Y/n/j");a.repeat_date=Ext.getCmp(this.repeat_id).getValue()}a.hour=Ext.getCmp(this.hour_id).getValue();a.minute=Ext.getCmp(this.min_id).getValue();a.repeat_hour=Ext.getCmp(this.repeat_hour_id).getValue()%100;a.repeat_min=parseInt(Ext.getCmp(this.repeat_hour_id).getValue()/100,10);a.last_work_hour=Ext.getCmp(this.last_work_hour_id).getValue();a.repeat_min_store_config=this.MinInterval?this.MinInterval:[];a.repeat_hour_store_config=this.HourInterval?this.HourInterval:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];return a},updateRepeatHourStore:function(d,h){var l=Ext.getCmp(this.hour_id).getValue();var f=[];var a=0;var k=[];var c=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];var e=0,b=0;if(h&&h==="script"){k=[1,5,10,15,20,30]}if(d&&d.repeat_min_store_config){k=d.repeat_min_store_config}if(d&&d.repeat_hour_store_config){c=d.repeat_hour_store_config}this.MinInterval=this.MinInterval?this.MinInterval:k;this.HourInterval=this.HourInterval?this.HourInterval:c;f.push([_T("schedule","schedule_every_once"),0]);for(e=0;e<this.MinInterval.length;e++){f.push([String.format(_T("schedule","every_x_minutes"),this.MinInterval[e]),this.MinInterval[e]*100])}for(e=0;e<24;e++){if(e>l){a=e-l;for(b=0;b<this.HourInterval.length;b++){if(a===this.HourInterval[b]){var g=String.format(_T("schedule","every_x_hours"),a);f.push([g,a]);break}}}}this.repeat_hour_store.loadData(f);var m=Ext.getCmp(this.repeat_hour_id).getValue();if(m>a){Ext.getCmp(this.repeat_hour_id).setValue(0)}},updateLastWorkTimeStore:function(){var j=Ext.getCmp(this.hour_id).getValue();var h=Ext.getCmp(this.min_id).getValue();var d=parseInt(Ext.getCmp(this.repeat_hour_id).getValue()/100,10);var b=Ext.getCmp(this.repeat_hour_id).getValue()%100;var e=Ext.getCmp(this.last_work_hour_id).getValue();var a=-1;var f=[];if(d>0){if(h!==0){Ext.getCmp(this.min_id).setValue(0);h=Ext.getCmp(this.min_id).getValue()}Ext.getCmp(this.min_id).disable(false);b=1}else{Ext.getCmp(this.min_id).enable(false)}for(var c=j;c<24;c+=b){var g=String.leftPad(String(c),2,"0")+":";if(d>0){g+=String.leftPad(String(60-d),2,"0")}else{g+=String.leftPad(String(h),2,"0")}f.push([g,c]);if(c===e){a=c}if(b===0){break}}this.last_work_hour_store.loadData(f);if(-1===a){Ext.getCmp(this.last_work_hour_id).setValue(f[0][1])}else{Ext.getCmp(this.last_work_hour_id).setValue(a)}if(d>0){Ext.getCmp(this.last_work_hour_id).setValue(f[0][1])}},fillConfig:function(e){var d;var g=[];var c=[];for(d=0;d<24;++d){g.push([String.leftPad(String(d),2,"0"),d])}var h=new Ext.data.ArrayStore({fields:["display","value"],data:g});this.addManagedComponent(h);for(d=0;d<60;++d){c.push([String.leftPad(String(d),2,"0"),d])}var a=new Ext.data.ArrayStore({fields:["display","value"],data:c});this.addManagedComponent(a);var f=new Ext.data.ArrayStore({fields:["display","value"],data:[[_T("schedule","no_repeat"),0],[_T("schedule","repeat_monthly"),1],[_T("schedule","repeat_yearly"),2]]});this.addManagedComponent(f);this.repeat_hour_store=new Ext.data.ArrayStore({fields:["display","value"]});this.addManagedComponent(this.repeat_hour_store);this.last_work_hour_store=new Ext.data.ArrayStore({fields:["display","value"]});this.addManagedComponent(this.last_work_hour_store);if(true===e.needTitle){this.title=_T("common","schedule")}if(true===e.needBorder){this.border=true}var b={height:500,title:this.title,border:this.border,items:[{xtype:"syno_fieldset",title:_T("time","time_date"),items:[{xtype:"syno_radio",id:this.per_week_id=Ext.id(),boxLabel:_T("schedule","run_on_days"),name:"date",width:300,inputValue:0,hideLabel:true,scope:this,handler:this.hSwitchType},{xtype:"syno_schedulefield",id:this.week_name_id=Ext.id(),indent:1,fieldLabel:"",hideLabel:true,allowBlank:false,editable:false,width:200},{xtype:"syno_displayfield",height:5,value:"&nbsp;"},{xtype:"syno_radio",name:"date",hideLabel:true,id:this.by_date_id=Ext.id(),boxLabel:_T("schedule","by_date"),width:300,inputValue:1},{xtype:"syno_datefield",fieldLabel:"",id:this.date_id=Ext.id(),width:200,indent:1,format:"Y/n/j",hideLabel:true,allowBlank:false,editable:false,maxValue:"2037/12/31",minValue:"2005/1/1"},{xtype:"syno_combobox",store:f,hideLabel:true,value:0,indent:1,displayField:"display",valueField:"value",id:this.repeat_id=Ext.id(),triggerAction:"all",width:200,mode:"local",editable:false}]},{xtype:"syno_fieldset",title:_T("time","time_time"),labelWidth:150,items:[{xtype:"syno_compositefield",fieldLabel:_T("schedule","run_time_first"),items:[{xtype:"syno_combobox",store:h,displayField:"display",id:this.hour_id=Ext.id(),valueField:"value",triggerAction:"all",mode:"local",width:93,editable:false,listeners:{select:{fn:function(){this.updateRepeatHourStore();this.updateLastWorkTimeStore()},scope:this}}},{xtype:"syno_displayfield",value:":"},{xtype:"syno_combobox",store:a,displayField:"display",valueField:"value",id:this.min_id=Ext.id(),triggerAction:"all",width:93,mode:"local",editable:false,listeners:{select:{fn:function(){this.updateLastWorkTimeStore()},scope:this}}}]},{xtype:"syno_combobox",store:this.repeat_hour_store,value:0,fieldLabel:_T("schedule","schedule_every"),labelStyle:"width: 150px;",displayField:"display",valueField:"value",id:this.repeat_hour_id=Ext.id(),triggerAction:"all",width:200,mode:"local",editable:false,listeners:{select:{fn:function(){this.updateLastWorkTimeStore()},scope:this}}},{xtype:"syno_combobox",store:this.last_work_hour_store,value:0,labelStyle:"width: 150px;",fieldLabel:_T("schedule","run_time_last"),displayField:"display",valueField:"value",id:this.last_work_hour_id=Ext.id(),triggerAction:"all",width:200,mode:"local",editable:false}]}]};Ext.apply(b,e);return b},isValid:function(){return true}});Ext.define("SYNO.SDS.TaskScheduler2.ScheduleDialog",{extend:"SYNO.SDS.ModalWindow",scheduleowner:null,constructor:function(b){var a=this.fillConfig(b);this.scheduleowner=b.owner;this.callParent([a])},fillConfig:function(b){this.EditPanelSchedule=new SYNO.SDS.TaskScheduler2.EditSchedulePanel({needTitle:false,needBorder:false});var a={title:b.title,width:510,minWidth:490,height:450,items:this.EditPanelSchedule,buttons:[{xtype:"syno_button",btnStyle:"blue",text:_T("common","apply"),scope:this,handler:this.hClickOK},{xtype:"syno_button",btnStyle:"grey",text:_T("common","cancel"),scope:this,handler:this.hClickCancel}]};Ext.apply(a,b);return a},hClickOK:function(){this.scheduleowner.schedule=this.EditPanelSchedule.getData();this.close()},hClickCancel:function(){this.close()},onOpen:function(a){this.EditPanelSchedule.setData(a);this.callParent()}});Ext.define("SYNO.SDS.TaskScheduler2.EditSchedulePanelAutoPower",{extend:"SYNO.ux.FormPanel",constructor:function(b){var a=this.fillConfig(b);this.callParent([a])},setData:function(a){Ext.getCmp(this.week_name_id).setValue(a.week_day);Ext.getCmp(this.hour_id).setValue(a.hour);Ext.getCmp(this.min_id).setValue(a.minute)},getData:function(){var a={};a.date_type=0;a.week_day=Ext.getCmp(this.week_name_id).getValue();a.hour=Ext.getCmp(this.hour_id).getValue();a.minute=Ext.getCmp(this.min_id).getValue();return a},fillConfig:function(e){var d;var f=[];var c=[];for(d=0;d<24;++d){f.push([String.leftPad(String(d),2,"0"),d])}var g=new Ext.data.ArrayStore({fields:["display","value"],data:f});this.addManagedComponent(g);for(d=0;d<60;++d){c.push([String.leftPad(String(d),2,"0"),d])}var a=new Ext.data.ArrayStore({fields:["display","value"],data:c});this.addManagedComponent(a);var b={height:500,title:_T("common","schedule"),items:[{xtype:"syno_fieldset",title:_T("time","time_date"),items:[{xtype:"syno_schedulefield",id:this.week_name_id=Ext.id(),indent:1,fieldLabel:"",hideLabel:true,allowBlank:false,editable:false,width:200}]},{xtype:"syno_fieldset",title:_T("time","time_time"),labelWidth:150,items:[{xtype:"syno_compositefield",fieldLabel:_T("schedule","run_time_first"),items:[{xtype:"syno_combobox",store:g,displayField:"display",id:this.hour_id=Ext.id(),valueField:"value",triggerAction:"all",mode:"local",width:70,editable:false},{xtype:"syno_displayfield",value:":"},{xtype:"syno_combobox",store:a,displayField:"display",valueField:"value",id:this.min_id=Ext.id(),triggerAction:"all",width:70,mode:"local",editable:false}]}]}]};Ext.apply(b,e);return b},isValid:function(){return true}});