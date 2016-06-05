/* All rights reserved. */

Ext.ns("SYNO.SDS.FileTaskMonitor");SYNO.SDS.FileTaskMonitor.BKMonitorGrid=Ext.extend(SYNO.ux.GridPanel,{constructor:function(a){if(!_S("standalone")){this.BKToolbar=this.initToolbar()}this.gridCtxMenu=this.initCtxMenu(a.baseURL);this.fileds=["id","title","progress","processed_num","processed_size","total","processing_path","status"];SYNO.SDS.FileTaskMonitor.BKMonitorGrid.superclass.constructor.call(this,Ext.apply({enableHdMenu:false,autoExpandColumn:"status",store:new Ext.data.JsonStore({autoDestroy:true,idProperty:"id",fields:this.fileds}),colModel:this.initColumnModel(a.baseURL),sm:new Ext.grid.RowSelectionModel({listeners:{selectionchange:{fn:this.onUpdateBtnStatus,scope:this}}}),listeners:{rowcontextmenu:{scope:this,fn:this.rowContextMenuHandle},rowclick:{fn:function(b,d,c){if(c&&d&&!c.hasModifier()){b.getSelectionModel().selectRow(d)}}}},tbar:this.BKToolbar},a))},initToolbar:function(){var a=new Ext.Toolbar({items:[{xtype:"syno_button",itemId:"gc_remove",text:_WFT("upload","upload_itm_remove"),handler:this.onClickCancels,scope:this,disabled:true}]});return a},onUpdateBtnStatus:function(){if(_S("standalone")){return}var a=this.BKToolbar.get("gc_remove");var c=this.getSelectionModel();var b=c.getSelections();if(b.length>0){a.enable()}else{a.disable()}},initColumnModel:function(b){var a=new Ext.grid.ColumnModel({columns:[{id:"status",header:_WFT("filetable","filetable_file"),renderer:function(h,d,c,i,g,e){var f=Ext.util.Format.htmlEncode(c.data.title);d.attr='ext:qtip="'+Ext.util.Format.htmlEncode(f)+'"';return f}},{header:_WFT("upload","files_progress"),width:360,renderer:function(j,e,g,i,l,k){var f=g.data;if("NOT_STARTED"===f.status){return _T("background_task","task_waiting")}else{if(f.progress>0){var d="";if(f.total&&0<f.total&&(f.processed_num||f.processed_size)){if(Ext.isNumber(f.processed_size)){d="&nbsp;("+Ext.util.Format.fileSize(f.processed_size||0)+"/"+Ext.util.Format.fileSize(f.total)+")"}else{d="&nbsp;("+(f.processed_num||0)+"/"+f.total+")"}}var c=g.data.progress*100;var h=new SYNO.SDS.Utils.ProgressBar({barWidth:125,barHeight:14,showValueText:true});return String.format('{0}<div class="progress-text">{1}</div>',h.fill(c.toFixed(2)),d)}}return _T("background_task","task_processing")}}]});return a},initCtxMenu:function(){var a=new SYNO.ux.Menu({cls:"syno-webfm",items:[{itemId:"gc_remove",iconCls:"webfm-delete-icon",text:_WFT("upload","upload_itm_remove"),handler:this.onClickCancels,scope:this}]});this.addManagedComponent(a);return a},rowContextMenuHandle:function(a,d,b){b.preventDefault();var c=a.getSelectionModel();if(!c.isSelected(d)){c.selectRow(d)}this.gridCtxMenu.showAt(b.getXY())},onClickCancel:function(b,e,d,c){var a=SYNO.SDS.BackgroundTaskMgr.getTask(e.data.id);if(a){a.cancel()}this.onRemove(e)},onClickCancels:function(){var b=this.getSelectionModel().getSelections();if(b.length<1){return}for(var a=0;a<b.length;a++){this.onClickCancel(this,b[a])}},localizeTpl:function(b){for(var a=0;a<b.length;a++){b[a]=SYNO.SDS.Utils.GetLocalizedString(b[a])}return b},onAdd:function(b){var a=this.getStore(),c={};Ext.copyTo(c,b,this.fileds);c.title=b.title||b.id;if(!Ext.isArray(c.title)){c.title=[c.title]}c.progress=0;c.title=String.format.apply(String,this.localizeTpl(c.title));a.add(new a.recordType(c,c.id))},onRemove:function(a){this.getStore().remove(a)},onProgress:function(b,e,g,c,d){var a=this.getStore(),f=a.getById(b.id);if(!f){return}if("fail"===e||"cancel"===e){this.onRemove(f)}else{if(g){this.onRemove(f)}else{if(Ext.isNumber(c)){Ext.copyTo(f.data,d,this.fileds);f.data.progress=c;f.commit()}}}},initEvents:function(){var b,a;for(b in SYNO.SDS.BackgroundTaskMgr.tasks){if(SYNO.SDS.BackgroundTaskMgr.tasks.hasOwnProperty(b)){a=SYNO.SDS.BackgroundTaskMgr.getTask(b);if(a){this.onAdd(a)}}}this.mon(SYNO.SDS.BackgroundTaskMgr,"add",this.onAdd,this);this.mon(SYNO.SDS.BackgroundTaskMgr,"progress",this.onProgress,this);SYNO.SDS.FileTaskMonitor.BKMonitorGrid.superclass.initEvents.apply(this,arguments)}});Ext.ns("SYNO.SDS.FileTaskMonitor");SYNO.SDS.FileTaskMonitor.MailMonitorGrid=Ext.extend(SYNO.ux.GridPanel,{constructor:function(a){if(!_S("standalone")){this.MailToolbar=this.initToolbar()}this.gridCtxMenu=this.initCtxMenu(a.baseURL);this.fileds=["id","title","progress","sender","reciever","subject"];SYNO.SDS.FileTaskMonitor.MailMonitorGrid.superclass.constructor.call(this,Ext.apply({enableHdMenu:false,autoExpandColumn:"status",store:new Ext.data.JsonStore({autoDestroy:true,idProperty:"id",fields:this.fileds}),colModel:this.initColumnModel(a.baseURL),sm:new Ext.grid.RowSelectionModel({listeners:{selectionchange:{fn:this.onUpdateBtnStatus,scope:this}}}),listeners:{rowcontextmenu:{scope:this,fn:this.rowContextMenuHandle},rowclick:{fn:function(b,d,c){if(c&&d&&!c.hasModifier()){b.getSelectionModel().selectRow(d)}}}},tbar:this.MailToolbar},a))},initToolbar:function(){var a=new Ext.Toolbar({items:[{xtype:"syno_button",itemId:"gc_remove",text:_WFT("upload","upload_itm_remove"),handler:this.onClickCancels,scope:this,disabled:true}]});return a},onUpdateBtnStatus:function(){if(_S("standalone")){return}var a=this.MailToolbar.get("gc_remove");var c=this.getSelectionModel();var b=c.getSelections();if(b.length>0){a.enable()}else{a.disable()}},initColumnModel:function(b){var a=new Ext.grid.ColumnModel({columns:[{id:"status",header:_T("mail","mail_from_desc"),width:200,renderer:function(h,d,c,i,g,e){var f=Ext.util.Format.htmlEncode(c.data.sender);d.attr='ext:qtip="'+Ext.util.Format.htmlEncode(f)+'"';return f}},{header:_T("mail","mail_to_desc"),width:200,renderer:function(h,d,c,i,g,e){var f=Ext.util.Format.htmlEncode(c.data.reciever);d.attr='ext:qtip="'+Ext.util.Format.htmlEncode(f)+'"';return f}},{header:_T("mail","mail_subject"),width:200,renderer:function(h,d,c,i,g,e){var f=Ext.util.Format.htmlEncode(c.data.subject);d.attr='ext:qtip="'+Ext.util.Format.htmlEncode(f)+'"';return f}},{header:_WFT("upload","files_progress"),renderer:function(g,d,c,h,f,e){return _T("background_task","task_processing")}}]});return a},initCtxMenu:function(){var a=new SYNO.ux.Menu({cls:"syno-webfm",items:[{itemId:"gc_remove",iconCls:"webfm-delete-icon",text:_WFT("upload","upload_itm_remove"),handler:this.onClickCancels,scope:this}]});this.addManagedComponent(a);return a},rowContextMenuHandle:function(a,d,b){b.preventDefault();var c=a.getSelectionModel();if(!c.isSelected(d)){c.selectRow(d)}this.gridCtxMenu.showAt(b.getXY())},onClickCancel:function(b,e,d,c){var a=SYNO.SDS.MailTaskMgr.getTask(e.data.id);if(a){a.cancel()}this.onRemove(e)},onClickCancels:function(){var b=this.getSelectionModel().getSelections();if(b.length<1){return}for(var a=0;a<b.length;a++){this.onClickCancel(this,b[a])}},localizeTpl:function(b){for(var a=0;a<b.length;a++){b[a]=SYNO.SDS.Utils.GetLocalizedString(b[a])}return b},onAdd:function(b){var a=this.getStore(),c={};Ext.copyTo(c,b,this.fileds);c.title=b.title||b.id;if(!Ext.isArray(c.title)){c.title=[c.title]}c.progress=0;c.sender=b.sender;c.reciever=b.reciever;c.subject=b.subject;c.title=String.format.apply(String,this.localizeTpl(c.title));a.add(new a.recordType(c,c.id))},onRemove:function(a){this.getStore().remove(a)},onProgress:function(b,e,g,c,d){var a=this.getStore(),f=a.getById(b.id);if(!f){return}if("fail"===e||"cancel"===e){this.onRemove(f)}else{if(g){this.onRemove(f)}else{if(Ext.isNumber(c)){Ext.copyTo(f.data,d,this.fileds);f.data.progress=c;f.commit()}}}},initEvents:function(){var b,a;for(b in SYNO.SDS.MailTaskMgr.tasks){if(SYNO.SDS.MailTaskMgr.tasks.hasOwnProperty(b)){a=SYNO.SDS.MailTaskMgr.getTask(b);if(a){this.onAdd(a)}}}this.mon(SYNO.SDS.MailTaskMgr,"add",this.onAdd,this);this.mon(SYNO.SDS.MailTaskMgr,"progress",this.onProgress,this);SYNO.SDS.FileTaskMonitor.MailMonitorGrid.superclass.initEvents.apply(this,arguments)}});