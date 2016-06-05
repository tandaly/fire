/* All rights reserved. */

Ext.namespace("SYNO.SDS.App.PersonalSettings");SYNO.SDS.App.PersonalSettings.EmailAccountWizard=Ext.extend(SYNO.SDS.Wizard.ModalWindow,{next_step:null,WIZRAD_HEIGHT:490,constructor:function(b){this.saveData={};this.welcomeStep=new SYNO.SDS.App.PersonalSettings.EmailAccountWizard.WelcomeStep({itemId:"welcome",nextId:"normal_email_setting"});this.normalEmailSettingStep=new SYNO.SDS.App.PersonalSettings.EmailAccountWizard.NormalEmailSettingStep({itemId:"normal_email_setting",nextId:"sync_contact"});this.normalEmailWithoutSyncSettingStep=new SYNO.SDS.App.PersonalSettings.EmailAccountWizard.NormalEmailWithoutSyncSettingStep({itemId:"normal_email_withoutsync_setting",nextId:null});this.customEmailSettingStep=new SYNO.SDS.App.PersonalSettings.EmailAccountWizard.CustomEmailSettingStep({itemId:"custom_email_setting",nextId:null});this.syncContactStep=new SYNO.SDS.App.PersonalSettings.EmailAccountWizard.SyncContactStep({itemId:"sync_contact",nextId:null});var a=[this.welcomeStep,this.normalEmailSettingStep,this.normalEmailWithoutSyncSettingStep,this.customEmailSettingStep,this.syncContactStep];SYNO.SDS.App.PersonalSettings.EmailAccountWizard.superclass.constructor.call(this,Ext.apply({title:_T("mail","email_wizard_title"),showHelp:false,width:650,height:this.WIZRAD_HEIGHT,steps:a},b));SYNO.SDS.Utils.AddTip(this.normalEmailSettingStep.getComponent("sender_name").getEl(),String.format(_T("mail","sender_name_hint"),_T("notification","alert_smtp_user")));SYNO.SDS.Utils.AddTip(this.normalEmailWithoutSyncSettingStep.getComponent("sender_name").getEl(),String.format(_T("mail","sender_name_hint"),_T("notification","alert_smtp_user")));SYNO.SDS.Utils.AddTip(this.customEmailSettingStep.getComponent("sender_name").getEl(),String.format(_T("mail","sender_name_hint"),_T("notification","label_smtp_sender_mail")))},onOpen:function(){this.setActiveStep("welcome");SYNO.SDS.App.PersonalSettings.OTPWizard.superclass.onOpen.apply(this,arguments)},displayError:function(a){var b;if(8006===a){b=_T("mail","account_already_saved")}else{if(8011===a){b=_T("mail","mail_setting_error")}else{b=_T("error","error_error_system")}}this.getMsgBox().alert(this.title,b)},setNextStep:function(a,b){if(0>this.stepStack.indexOf(a)){this.stepStack.push(a)}if(Ext.isString(b)){this.stepStack.push(b)}},onClose:function(){}});Ext.ns("SYNO.SDS.App.PersonalSettings.EmailAccountWizard");SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils={};Ext.apply(SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils,{emailConfig:{gmail:{desc:_T("mail","mail_gmail_desc"),btn_text:_T("mail","mail_authentication"),unsync_text:_T("mail","mail_cancel_authentication"),sync_success:_T("mail","mail_authentication_success"),cancel:true},other:{desc:_T("mail","mail_syncpage_desc"),btn_text:_T("mail","sync_contact"),unsync_text:_T("mail","unsync_contact"),sync_success:_T("mail","sync_success"),cancel:false}},getNormalProviderConfig:function(b){if(!Ext.isDefined(b)){b=true}var a={items:[{xtype:"syno_textfield",itemId:"account",name:"account",width:250,allowBlank:false,vtype:"email",fieldLabel:_T("mail","application_title")},{xtype:"syno_textfield",itemId:"passwd",name:"passwd",width:250,allowBlank:false,inputType:"password",hidden:!b,disabled:!b,fieldLabel:_T("notification","alert_smtp_pass")},{xtype:"syno_textfield",itemId:"sender_name",name:"sender_name",width:250,fieldLabel:_T("notification","label_smtp_sender_name")}]};return a},getCustomProviderConfig:function(){var a={items:[{xtype:"syno_textfield",itemId:"host",name:"host",width:250,allowBlank:false,fieldLabel:_T("notification","alert_smtp")},{xtype:"syno_textfield",itemId:"port",name:"port",width:250,allowBlank:false,fieldLabel:_T("notification","alert_port"),vtype:"port"},{xtype:"syno_checkbox",itemId:"enable_auth_checkbox",name:"auth",boxLabel:_T("notification","alert_smtp_need_auth")},{xtype:"syno_textfield",itemId:"account",name:"account",width:250,allowBlank:false,indent:1,fieldLabel:_T("notification","alert_smtp_user")},{xtype:"syno_textfield",itemId:"passwd",name:"passwd",width:250,allowBlank:false,inputType:"password",indent:1,fieldLabel:_T("notification","alert_smtp_pass")},{xtype:"syno_checkbox",itemId:"tls",name:"tls",width:300,boxLabel:_T("notification","alert_use_ssl")},{xtype:"syno_textfield",itemId:"sender_account",name:"sender_account",width:250,allowBlank:false,vtype:"email",fieldLabel:_T("notification","label_smtp_sender_mail")},{xtype:"syno_textfield",itemId:"sender_name",name:"sender_name",width:250,fieldLabel:_T("notification","label_smtp_sender_name")}]};return a},isNeedAlert:function(b,a){if("gmail"===a&&!b.include("@gmail.com")){return true}else{if("hotmail"===a&&!b.include("@hotmail.com")&&!b.include("@outlook.com")){return true}else{if("yahoomail"===a&&!b.include("@yahoo.com")){return true}else{if("aolmail"===a&&!b.include("@aol.com")){return true}else{return false}}}}},getEmailProviderName:function(a){if("gmail"===a){return"Gmail"}else{if("hotmail"===a){return"Outlook"}else{if("yahoomail"===a){return"Yahoo!"}else{if("aolmail"===a){return"AOL"}else{return"Custom"}}}}},getEmailConfig:function(b){var a=SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils.emailConfig;if(a.hasOwnProperty(b)){return a[b]}else{return a.other}}});SYNO.SDS.App.PersonalSettings.EmailAccountWizard.NormalEmailSettingStep=Ext.extend(SYNO.ux.FormPanel,{constructor:function(c){var d=(!SYNO.SDS.UIFeatures.test("isRetina"))?"../../../scripts/ext-3/ux/images/Components/icon_success.png":"../../../synohdpack/images/Components/icon_success.png";var a=SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils.getNormalProviderConfig().items;a.push({xtype:"syno_checkbox",itemId:"default_use_checkbox",name:"default_use",boxLabel:_T("mail","default_use_checkbox")});this.testConnectBtn=new SYNO.ux.Button({text:_T("mail","mail_test_connection"),handler:this.onTestConnect,scope:this});this.statusIcon=new Ext.BoxComponent({autoEl:{tag:"img",src:d,height:24,width:24}});this.statusField=new SYNO.ux.DisplayField({cls:"email-status-error"});a.push({xtype:"compositefield",itemId:"test_connection_item",hideLabel:true,items:[this.testConnectBtn,this.statusIcon,this.statusField]});var b=Ext.apply({headline:_T("mail","email_settings_title"),items:a},c);this.isNeedAlert=SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils.isNeedAlert;SYNO.SDS.App.PersonalSettings.EmailAccountWizard.NormalEmailSettingStep.superclass.constructor.call(this,b)},load:function(){var b=this.getComponent("account");var a=this.getComponent("test_connection_item");b.emptyText=this.owner.emptyText;b.applyEmptyText();if(this.owner.blFirstCreate){this.getComponent("default_use_checkbox").setValue(true);this.getComponent("default_use_checkbox").setDisabled(true)}if("gmail"===this.owner.saveData.email_type){this.getComponent("passwd").setDisabled(true);this.getComponent("passwd").hide();a.setDisabled(true);a.hide()}else{this.getComponent("passwd").setDisabled(false);this.getComponent("passwd").show();a.setDisabled(false);a.show();this.statusIcon.hide()}},getNext:function(){if(!this.form.isValid()){this.owner.getMsgBox().alert("",_T("common","forminvalid"));return false}var b=this.owner.normalEmailSettingStep.getComponent("account").getValue();var a=SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils.getEmailProviderName(this.owner.saveData.email_type);var c=String.format(_T("mail","email_setting_alert"),b,a);this.owner.saveData.is_default=this.form.findField("default_use_checkbox").getValue();if(this.isNeedAlert(b,this.owner.saveData.email_type)){this.owner.getMsgBox().confirm("",c,function(d){if("yes"===d){this.testConnect(this.getNextCallback)}},this);return false}else{this.testConnect(this.getNextCallback);return false}},getNextCallback:function(c,b,a){this.owner.clearStatusBusy();if(c){this.owner.goNext(this.nextId);this.disableApplyBtn()}else{this.owner.displayError(b.code)}},disableApplyBtn:function(){if("gmail"===this.owner.saveData.email_type){this.owner.getButton("next").disable();this.owner.setHeadline(_T("mail","mail_gmail_title"))}},onTestConnect:function(){this.statusIcon.hide();this.statusField.setValue("");if(!this.form.isValid()){this.owner.getMsgBox().alert("",_T("common","forminvalid"));return false}this.testConnect(this.setConnectionStatus)},testConnect:function(d){if("gmail"===this.owner.saveData.email_type){this.owner.goNext(this.nextId);this.disableApplyBtn();return}var b=this.getComponent("account").getValue();var a=this.getComponent("passwd").getValue();var c={email_type:this.owner.saveData.email_type,auth:"true",tls:"true",account:b,passwd:a};this.owner.setStatusBusy();this.owner.sendWebAPI({api:"SYNO.PersonMailAccount",method:"test",version:1,params:c,encryption:["passwd"],callback:d,scope:this})},setConnectionStatus:function(d,c,b){this.owner.clearStatusBusy();if(d){var a=this.statusIcon.getPosition();if(!Ext.isEmpty(a)&&0===a[0]){a[0]+=this.testConnectBtn.getWidth()+4;this.statusIcon.setPosition(a)}this.statusIcon.show();this.statusField.setValue("")}else{this.statusIcon.hide();this.statusField.setValue(_T("mail","mail_setting_error"))}}});SYNO.SDS.App.PersonalSettings.EmailAccountWizard.NormalEmailWithoutSyncSettingStep=Ext.extend(SYNO.SDS.App.PersonalSettings.EmailAccountWizard.NormalEmailSettingStep,{getNext:function(){if(!this.form.isValid()){this.owner.getMsgBox().alert("",_T("common","forminvalid"));return false}var b=this.owner.normalEmailWithoutSyncSettingStep.getComponent("account").getValue();var a=SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils.getEmailProviderName(this.owner.saveData.email_type);var c=String.format(_T("mail","email_setting_alert"),b,a);if(this.isNeedAlert(b,this.owner.saveData.email_type)){this.owner.getMsgBox().confirm("",c,function(d){if("yes"===d){this.testConnect(this.getNextCallback)}},this);return false}this.testConnect(this.getNextCallback);return false},getNextCallback:function(c,b,a){this.owner.clearStatusBusy();if(c){this.onApply()}else{this.owner.displayError(b.code)}},onApply:function(){var a=this.owner.normalEmailWithoutSyncSettingStep.getForm().getValues();Ext.apply(this.owner.saveData,a);this.owner.saveData.alias=this.owner.saveData.account||this.owner.saveData.sender_account;this.owner.saveData.is_default=this.form.findField("default_use_checkbox").getValue();this.owner.saveData.sender_name=this.owner.saveData.sender_name||this.owner.saveData.account;this.owner.setStatusBusy();this.owner.sendWebAPI({api:"SYNO.PersonMailAccount",method:"set",version:1,params:this.owner.saveData,encryption:["passwd"],callback:function(d,c,b){this.owner.clearStatusBusy();if(!d){this.owner.displayError(c.code);return false}if(this.owner.saveData.is_default){SYNO.SDS.UserSettings.setProperty("SYNO.SDS.App.PersonalSettings.Instance","email_type",this.owner.saveData.email_type);SYNO.SDS.UserSettings.setProperty("SYNO.SDS.App.PersonalSettings.Instance","email_alias",this.owner.saveData.alias)}this.owner.close()},scope:this})}});SYNO.SDS.App.PersonalSettings.EmailAccountWizard.CustomEmailSettingStep=Ext.extend(SYNO.ux.FormPanel,{constructor:function(c){var d=(!SYNO.SDS.UIFeatures.test("isRetina"))?"../../../scripts/ext-3/ux/images/Components/icon_success.png":"../../../synohdpack/images/Components/icon_success.png";var a=SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils.getCustomProviderConfig().items;a.push({xtype:"syno_checkbox",itemId:"default_use_checkbox",name:"default_use",boxLabel:_T("mail","default_use_checkbox")});this.testConnectBtn=new SYNO.ux.Button({text:_T("mail","mail_test_connection"),handler:this.onTestConnect,scope:this});this.statusIcon=new Ext.BoxComponent({hidden:true,autoEl:{tag:"img",src:d,height:24,width:24}});this.statusField=new SYNO.ux.DisplayField({cls:"email-status-error"});a.push({xtype:"compositefield",hideLabel:true,items:[this.testConnectBtn,this.statusIcon,this.statusField]});var b=Ext.apply({headline:_T("mail","email_settings_title"),items:a},c);SYNO.SDS.App.PersonalSettings.EmailAccountWizard.CustomEmailSettingStep.superclass.constructor.call(this,b);this.mon(this,"afterrender",this.onBindCheckbox,this,{single:true})},load:function(){var a=this.getComponent("sender_account");a.emptyText=this.owner.emptyText;a.applyEmptyText();if(this.owner.blFirstCreate){this.getComponent("default_use_checkbox").setValue(true);this.getComponent("default_use_checkbox").setDisabled(true)}this.statusIcon.hide();this.statusField.setValue("")},getNext:function(){if(!this.form.isValid()){this.owner.getMsgBox().alert("",_T("common","forminvalid"));return false}var a=this.owner.customEmailSettingStep.getForm().getValues();Ext.apply(this.owner.saveData,a);this.owner.saveData.alias=this.owner.saveData.host+"_"+(this.owner.saveData.account||this.owner.saveData.sender_account);this.owner.saveData.is_default=this.form.findField("default_use_checkbox").getValue();this.owner.saveData.sender_name=this.owner.saveData.sender_name||this.owner.saveData.sender_account;this.testConnect(this.getNextCallback);return false},getNextCallback:function(c,b,a){this.owner.clearStatusBusy();if(c){this.onApply()}else{this.owner.displayError(b.code)}},onApply:function(){this.owner.setStatusBusy();this.owner.sendWebAPI({api:"SYNO.PersonMailAccount",method:"set",version:1,params:this.owner.saveData,encryption:["passwd"],callback:function(c,b,a){this.owner.clearStatusBusy();if(!c){this.owner.displayError(b.code);return false}if(this.owner.saveData.is_default){SYNO.SDS.UserSettings.setProperty("SYNO.SDS.App.PersonalSettings.Instance","email_type",this.owner.saveData.email_type);SYNO.SDS.UserSettings.setProperty("SYNO.SDS.App.PersonalSettings.Instance","email_alias",this.owner.saveData.alias)}this.owner.close()},scope:this});return false},onBindCheckbox:function(){var a;a=new SYNO.ux.Utils.EnableCheckGroup(this.form,"auth",["account","passwd"])},onTestConnect:function(){this.statusIcon.hide();this.statusField.setValue("");if(!this.form.isValid()){this.owner.getMsgBox().alert("",_T("common","forminvalid"));return false}this.testConnect(this.setConnectionStatus)},testConnect:function(h){var e=this.getComponent("account").getValue();var b=this.getComponent("passwd").getValue();var d=this.getComponent("host").getValue();var a=this.getComponent("port").getValue();var c=this.getComponent("enable_auth_checkbox").getValue();var g=this.getComponent("tls").getValue();var f={email_type:this.owner.saveData.email_type,account:e,passwd:b,host:d,port:a,auth:c,tls:g};this.owner.setStatusBusy();this.owner.sendWebAPI({api:"SYNO.PersonMailAccount",method:"test",version:1,params:f,encryption:["passwd"],callback:h,scope:this})},setConnectionStatus:function(d,c,b){this.owner.clearStatusBusy();if(d){var a=this.statusIcon.getPosition();if(!Ext.isEmpty(a)&&0===a[0]){a[0]+=this.testConnectBtn.getWidth()+4;this.statusIcon.setPosition(a)}this.statusIcon.show();this.statusField.setValue("")}else{this.statusIcon.hide();this.statusField.setValue(_T("mail","mail_setting_error"))}}});SYNO.SDS.App.PersonalSettings.EmailAccountWizard.SyncContactStep=Ext.extend(SYNO.ux.FormPanel,{constructor:function(b){this.syncBtn=new SYNO.ux.Button({itemId:"sync_contact",text:_T("mail","sync_contact"),handler:this.onSyncClick,scope:this});this.msgField=new SYNO.ux.DisplayField({itemId:"msg_field"});var a=Ext.apply({headline:_T("mail","sync_contact"),items:[{xtype:"syno_displayfield",itemId:"sync_displayfield",value:_T("mail","mail_syncpage_desc")},{xtype:"syno_displayfield",itemId:"sync_note",value:_T("mail","mail_syncpage_note")},{xtype:"compositefield",itemId:"sync_composite",hideLabel:true,items:[this.syncBtn,this.msgField]}],listeners:{activate:function(){var d=this.getComponent("sync_displayfield");var c=this.getEmailConfig(this.owner.saveData.email_type);d.setValue(c.desc);this.syncBtn.setText(c.btn_text)},scope:this}},b);this.getEmailConfig=SYNO.SDS.App.PersonalSettings.EmailAccountWizard.Utils.getEmailConfig;SYNO.SDS.App.PersonalSettings.EmailAccountWizard.SyncContactStep.superclass.constructor.call(this,a)},load:function(){},getNext:function(){var a=this.owner.normalEmailSettingStep.getForm().getValues();Ext.apply(this.owner.saveData,a);this.owner.saveData.alias=this.owner.saveData.account||this.owner.saveData.sender_account;this.owner.saveData.sender_name=this.owner.saveData.sender_name||this.owner.saveData.account;this.owner.setStatusBusy();this.owner.sendWebAPI({api:"SYNO.PersonMailAccount",method:"set",version:1,params:this.owner.saveData,encryption:["passwd","access_token","refresh_token"],callback:function(d,c,b){this.owner.clearStatusBusy();if(!d){this.owner.displayError(c.code);return false}if(this.owner.saveData.is_default){SYNO.SDS.UserSettings.setProperty("SYNO.SDS.App.PersonalSettings.Instance","email_type",this.owner.saveData.email_type);SYNO.SDS.UserSettings.setProperty("SYNO.SDS.App.PersonalSettings.Instance","email_alias",this.owner.saveData.alias)}this.owner.close()},scope:this});return false},onSyncClick:function(b){var a=this.getEmailConfig(this.owner.saveData.email_type);if(a.btn_text===b.getText()){this.onSyncContacts(this.owner.saveData.email_type)}else{this.onCancelSyncContacts()}},onCancelSyncContacts:function(){var a=this.getEmailConfig(this.owner.saveData.email_type);this.owner.saveData.access_token="";this.owner.saveData.refresh_token="";this.owner.saveData.expires_in="";this.syncBtn.setText(a.btn_text);this.owner.getButton("next").setDisabled(a.cancel)},onSyncContacts:function(a){window._loginCallback=this.onSyncCallback.createDelegate(this);var e="_loginCallback";var c=window.location.href.indexOf("/",window.location.protocol.length+2);var d=window.location.href.slice(0,c)+"/webman/modules/PersonalSettings/index_ds.php";var b="http://update.synology.com/email/login.php?callback="+e+"&host="+d+"&type="+a;window.open(b,"mywindow","menubar=1,resizable=0,width=600,height=520, top=100, left=300")},onSyncCallback:function(d){var c=new Date();var a=parseInt(c.getTime()/1000,10)+parseInt(d.expires_in,10)-100;var b=this.getEmailConfig(this.owner.saveData.email_type);this.owner.saveData.access_token=d.token;this.owner.saveData.refresh_token=d.refresh_token;this.owner.saveData.expires_in=a.toString();this.syncBtn.setText(b.unsync_text);this.showSyncMessage();this.owner.getButton("next").enable()},showSyncMessage:function(){var b=this.getEmailConfig(this.owner.saveData.email_type);var c='<span class="syno-ux-note">'+b.sync_success+"</span>";this.msgField.setValue(c);this.doLayout();var a=new Ext.util.DelayedTask(function(){if(Ext.isDefined(this.msgField.el.dom)){this.msgField.setValue("")}},this);a.delay(3000)}});SYNO.SDS.App.PersonalSettings.EmailAccountWizard.WelcomeStep=Ext.extend(SYNO.ux.FormPanel,{constructor:function(b){var a=Ext.apply({headline:_T("mail","add_email_title"),items:[{xtype:"syno_displayfield",value:_T("mail","add_email_desc")},this.createDataView()]},b);SYNO.SDS.App.PersonalSettings.EmailAccountWizard.WelcomeStep.superclass.constructor.call(this,a)},createStore:function(){var a=new Ext.data.ArrayStore({fields:["name","type","img","text"],data:[["Gmail","gmail",this.getIconSrc("gmail"),"user@gmail.com"],["Outlook","hotmail",this.getIconSrc("outlook"),"user@hotmail.com"],["Yahoo!","yahoomail",this.getIconSrc("yahoo"),"user@yahoo.com"],["AOL","aolmail",this.getIconSrc("aol"),"user@aol.com"],["Customize","custom",this.getIconSrc("customize"),"user@domain.com"]]});return a},createDataView:function(){var a=new Ext.XTemplate('<tpl for=".">','<div class="email-provider-template">','<div style="padding-right:52px; padding-left:52px; margin-top:6px; margin-bottom:4px;">','<img width="80" height="80" src="{img}" draggable="false"/></div>','<div style="text-align:center;margin-bottom:6px;"><strong>{name}</strong></div>',"</div>","</tpl>");var b=new SYNO.ux.FleXcroll.DataView({autoFlexcroll:true,store:this.createStore(),tpl:a,singleSelect:true,itemSelector:"div.email-provider-template",overClass:"email-provider-over",listeners:{selectionchange:{fn:this.onSelectDone,scope:this},dblclick:{fn:this.onDblclickDone,scope:this}}});this.dataView=b;return b},getNext:function(){var a;if(!this.owner.saveData.email_type){this.owner.getMsgBox().alert("",_T("mail","add_email_desc"));return}if("custom"===this.owner.saveData.email_type){this.owner.customEmailSettingStep.load();a="custom_email_setting"}else{if("aolmail"===this.owner.saveData.email_type){this.owner.normalEmailWithoutSyncSettingStep.load();a="normal_email_withoutsync_setting"}else{this.owner.normalEmailSettingStep.load();a="normal_email_setting"}}return a},onSelectDone:function(d,c,a){if(0!==d.getSelectionCount()){var b=d.getSelectedRecords();this.owner.saveData.email_type=b[0].data.type;this.owner.emptyText=b[0].data.text}},onDblclickDone:function(d,a,c,b){this.onSelectDone(d);this.owner.goNext(this.getNext())},getIconSrc:function(b){var c="../../../webman/modules/PersonalSettings/images/";var a="mail_"+b;if(SYNO.SDS.UIFeatures.test("isRetina")){a+="_160"}a+=".png";return c+a}});