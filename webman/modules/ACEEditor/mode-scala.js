/* All rights reserved. */

ace.define("ace/mode/scala",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/tokenizer","ace/mode/scala_highlight_rules"],function(c,a,d){var h=c("../lib/oop");var g=c("./javascript").Mode;var b=c("../tokenizer").Tokenizer;var f=c("./scala_highlight_rules").ScalaHighlightRules;var e=function(){g.call(this);this.HighlightRules=f};h.inherits(e,g);(function(){this.createWorker=function(i){return null};this.$id="ace/mode/scala"}).call(e.prototype);a.Mode=e});ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(d,f,b){var h=d("../lib/oop");var e=d("./text").Mode;var i=d("../tokenizer").Tokenizer;var g=d("./javascript_highlight_rules").JavaScriptHighlightRules;var k=d("./matching_brace_outdent").MatchingBraceOutdent;var c=d("../range").Range;var a=d("../worker/worker_client").WorkerClient;var l=d("./behaviour/cstyle").CstyleBehaviour;var m=d("./folding/cstyle").FoldMode;var j=function(){this.HighlightRules=g;this.$outdent=new k();this.$behaviour=new l();this.foldingRules=new m()};h.inherits(j,e);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.getNextLineIndent=function(t,p,r){var o=this.$getIndent(p);var s=this.getTokenizer().getLineTokens(p,t);var u=s.tokens;var n=s.state;if(u.length&&u[u.length-1].type=="comment"){return o}if(t=="start"||t=="no_regex"){var q=p.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);if(q){o+=r}}else{if(t=="doc-start"){if(n=="start"||n=="no_regex"){return""}var q=p.match(/^\s*(\/?)\*/);if(q){if(q[1]){o+=" "}o+="* "}}}return o};this.checkOutdent=function(p,n,o){return this.$outdent.checkOutdent(n,o)};this.autoOutdent=function(n,o,p){this.$outdent.autoOutdent(o,p)};this.createWorker=function(n){var o=new a(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");o.attachToDocument(n.getDocument());o.on("jslint",function(p){n.setAnnotations(p.data)});o.on("terminate",function(){n.clearAnnotations()});return o};this.$id="ace/mode/javascript"}).call(j.prototype);f.Mode=j});ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(c,b,e){var g=c("../lib/oop");var d=c("./doc_comment_highlight_rules").DocCommentHighlightRules;var a=c("./text_highlight_rules").TextHighlightRules;var f=function(){var i=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier");var k="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";var h="[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";var j="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={no_regex:[{token:"comment",regex:"\\/\\/",next:"line_comment"},d.getStartRule("doc-start"),{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+h+")(\\.)(prototype)(\\.)("+h+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+h+")(\\.)("+h+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+h+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+h+")(\\.)("+h+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+h+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+h+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"(?:"+k+")\\b",next:"start"},{token:["punctuation.operator","support.function"],regex:/(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:["punctuation.operator","support.function.dom"],regex:/(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:["punctuation.operator","support.constant"],regex:/(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},{token:i,regex:h},{token:"keyword.operator",regex:/--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,next:"start"},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"keyword.operator",regex:/\/=?/,next:"start"},{token:"comment",regex:/^#!.*$/}],start:[d.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/",next:"line_comment_regex_allowed"},{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:h},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],comment_regex_allowed:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],comment:[{token:"comment",regex:"\\*\\/",next:"no_regex"},{defaultToken:"comment"}],line_comment_regex_allowed:[{token:"comment",regex:"$|^",next:"start"},{defaultToken:"comment"}],line_comment:[{token:"comment",regex:"$|^",next:"no_regex"},{defaultToken:"comment"}],qqstring:[{token:"constant.language.escape",regex:j},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:j},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]};this.embedRules(d,"doc-",[d.getEndRule("no_regex")])};g.inherits(f,a);b.JavaScriptHighlightRules=f});ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(c,b,e){var f=c("../lib/oop");var a=c("./text_highlight_rules").TextHighlightRules;var d=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};f.inherits(d,a);d.getStartRule=function(g){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:g}};d.getEndRule=function(g){return{token:"comment.doc",regex:"\\*\\/",next:g}};b.DocCommentHighlightRules=d});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(c,b,d){var e=c("../range").Range;var a=function(){};(function(){this.checkOutdent=function(f,g){if(!/^\s+$/.test(f)){return false}return/^\s*\}/.test(g)};this.autoOutdent=function(k,l){var g=k.getLine(l);var h=g.match(/^(\s*\})/);if(!h){return 0}var i=h[1].length;var j=k.findMatchingBracket({row:l,column:i});if(!j||j.row==l){return 0}var f=this.$getIndent(k.getLine(j.row));k.replace(new e(l,0,l,i-1),f)};this.$getIndent=function(f){return f.match(/^\s*/)[0]}}).call(a.prototype);b.MatchingBraceOutdent=a});ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,h,c){var k=e("../../lib/oop");var f=e("../behaviour").Behaviour;var n=e("../../token_iterator").TokenIterator;var b=e("../../lib/lang");var j=["text","paren.rparen","punctuation.operator"];var d=["text","paren.rparen","punctuation.operator","comment"];var m=0;var a=-1;var o="";var g=0;var i=-1;var l="";var p="";var q=function(){q.isSaneInsertion=function(t,u){var v=t.getCursorPosition();var s=new n(u,v.row,v.column);if(!this.$matchTokenType(s.getCurrentToken()||"text",j)){var r=new n(u,v.row,v.column+1);if(!this.$matchTokenType(r.getCurrentToken()||"text",j)){return false}}s.stepForward();return s.getCurrentTokenRow()!==v.row||this.$matchTokenType(s.getCurrentToken()||"text",d)};q.$matchTokenType=function(s,r){return r.indexOf(s.type||s)>-1};q.recordAutoInsert=function(s,t,v){var u=s.getCursorPosition();var r=t.doc.getLine(u.row);if(!this.isAutoInsertedClosing(u,r,o[0])){m=0}a=u.row;o=v+r.substr(u.column);m++};q.recordMaybeInsert=function(s,t,v){var u=s.getCursorPosition();var r=t.doc.getLine(u.row);if(!this.isMaybeInsertedClosing(u,r)){g=0}i=u.row;l=r.substr(0,u.column)+v;p=r.substr(u.column);g++};q.isAutoInsertedClosing=function(t,r,s){return m>0&&t.row===a&&s===o[0]&&r.substr(t.column)===o};q.isMaybeInsertedClosing=function(s,r){return g>0&&s.row===i&&r.substr(s.column)===p&&r.substr(0,s.column)==l};q.popAutoInsertedClosing=function(){o=o.substr(1);m--};q.clearMaybeInsertedClosing=function(){g=0;i=-1};this.add("braces","insertion",function(s,v,y,B,D){var E=y.getCursorPosition();var F=B.doc.getLine(E.row);if(D=="{"){var C=y.getSelectionRange();var w=B.doc.getTextRange(C);if(w!==""&&w!=="{"&&y.getWrapBehavioursEnabled()){return{text:"{"+w+"}",selection:false}}else{if(q.isSaneInsertion(y,B)){if(/[\]\}\)]/.test(F[E.column])||y.inMultiSelectMode){q.recordAutoInsert(y,B,"}");return{text:"{}",selection:[1,1]}}else{q.recordMaybeInsert(y,B,"{");return{text:"{",selection:[1,1]}}}}}else{if(D=="}"){var z=F.substring(E.column,E.column+1);if(z=="}"){var r=B.$findOpeningBracket("}",{column:E.column+1,row:E.row});if(r!==null&&q.isAutoInsertedClosing(E,F,D)){q.popAutoInsertedClosing();return{text:"",selection:[1,1]}}}}else{if(D=="\n"||D=="\r\n"){var u="";if(q.isMaybeInsertedClosing(E,F)){u=b.stringRepeat("}",g);q.clearMaybeInsertedClosing()}var z=F.substring(E.column,E.column+1);if(z==="}"){var A=B.findMatchingBracket({row:E.row,column:E.column+1},"}");if(!A){return null}var x=this.$getIndent(B.getLine(A.row))}else{if(u){var x=this.$getIndent(F)}else{return}}var t=x+B.getTabString();return{text:"\n"+t+"\n"+x+u,selection:[1,t.length,1,t.length]}}else{q.clearMaybeInsertedClosing()}}}});this.add("braces","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&t=="{"){var r=x.doc.getLine(s.start.row);var y=r.substring(s.end.column,s.end.column+1);if(y=="}"){s.end.column++;return s}else{g--}}});this.add("parens","insertion",function(s,t,v,x,z){if(z=="("){var y=v.getSelectionRange();var u=x.doc.getTextRange(y);if(u!==""&&v.getWrapBehavioursEnabled()){return{text:"("+u+")",selection:false}}else{if(q.isSaneInsertion(v,x)){q.recordAutoInsert(v,x,")");return{text:"()",selection:[1,1]}}}}else{if(z==")"){var A=v.getCursorPosition();var B=x.doc.getLine(A.row);var w=B.substring(A.column,A.column+1);if(w==")"){var r=x.$findOpeningBracket(")",{column:A.column+1,row:A.row});if(r!==null&&q.isAutoInsertedClosing(A,B,z)){q.popAutoInsertedClosing();return{text:"",selection:[1,1]}}}}}});this.add("parens","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&t=="("){var r=x.doc.getLine(s.start.row);var y=r.substring(s.start.column+1,s.start.column+2);if(y==")"){s.end.column++;return s}}});this.add("brackets","insertion",function(s,t,v,x,z){if(z=="["){var y=v.getSelectionRange();var u=x.doc.getTextRange(y);if(u!==""&&v.getWrapBehavioursEnabled()){return{text:"["+u+"]",selection:false}}else{if(q.isSaneInsertion(v,x)){q.recordAutoInsert(v,x,"]");return{text:"[]",selection:[1,1]}}}}else{if(z=="]"){var A=v.getCursorPosition();var B=x.doc.getLine(A.row);var w=B.substring(A.column,A.column+1);if(w=="]"){var r=x.$findOpeningBracket("]",{column:A.column+1,row:A.row});if(r!==null&&q.isAutoInsertedClosing(A,B,z)){q.popAutoInsertedClosing();return{text:"",selection:[1,1]}}}}}});this.add("brackets","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&t=="["){var r=x.doc.getLine(s.start.row);var y=r.substring(s.start.column+1,s.start.column+2);if(y=="]"){s.end.column++;return s}}});this.add("string_dquotes","insertion",function(s,v,z,C,G){if(G=='"'||G=="'"){var r=G;var E=z.getSelectionRange();var w=C.doc.getTextRange(E);if(w!==""&&w!=="'"&&w!='"'&&z.getWrapBehavioursEnabled()){return{text:r+w+r,selection:false}}else{var F=z.getCursorPosition();var I=C.doc.getLine(F.row);var H=I.substring(F.column-1,F.column);if(H=="\\"){return null}var B=C.getTokens(E.start.row);var t=0,u;var y=-1;for(var D=0;D<B.length;D++){u=B[D];if(u.type=="string"){y=-1}else{if(y<0){y=u.value.indexOf(r)}}if((u.value.length+t)>E.start.column){break}t+=B[D].value.length}if(!u||(y<0&&u.type!=="comment"&&(u.type!=="string"||((E.start.column!==u.value.length+t-1)&&u.value.lastIndexOf(r)===u.value.length-1)))){if(!q.isSaneInsertion(z,C)){return}return{text:r+r,selection:[1,1]}}else{if(u&&u.type==="string"){var A=I.substring(F.column,F.column+1);if(A==r){return{text:"",selection:[1,1]}}}}}}});this.add("string_dquotes","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&(t=='"'||t=="'")){var r=x.doc.getLine(s.start.row);var y=r.substring(s.start.column+1,s.start.column+2);if(y==t){s.end.column++;return s}}})};k.inherits(q,f);h.CstyleBehaviour=q});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(b,a,c){var d=b("../../lib/oop");var f=b("../../range").Range;var g=b("./fold_mode").FoldMode;var e=a.FoldMode=function(h){if(h){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+h.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+h.end))}};d.inherits(e,g);(function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;this.getFoldWidgetRange=function(o,n,p,m){var h=o.getLine(p);var k=h.match(this.foldingStartMarker);if(k){var l=k.index;if(k[1]){return this.openingBracketBlock(o,k[1],p,l)}var j=o.getCommentFoldRange(p,l+k[0].length,1);if(j&&!j.isMultiLine()){if(m){j=this.getSectionRange(o,p)}else{if(n!="all"){j=null}}}return j}if(n==="markbegin"){return}var k=h.match(this.foldingStopMarker);if(k){var l=k.index+k[0].length;if(k[1]){return this.closingBracketBlock(o,k[1],p,l)}return o.getCommentFoldRange(p,l,-1)}};this.getSectionRange=function(m,p){var q=m.getLine(p);var i=q.search(/\S/);var o=p;var k=q.length;p=p+1;var l=p;var n=m.getLength();while(++p<n){q=m.getLine(p);var h=q.search(/\S/);if(h===-1){continue}if(i>h){break}var j=this.getFoldWidgetRange(m,"all",p);if(j){if(j.start.row<=o){break}else{if(j.isMultiLine()){p=j.end.row}else{if(i==h){break}}}}l=p}return new f(o,k,l,m.getLine(l).length)}}).call(e.prototype)});ace.define("ace/mode/scala_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(c,b,e){var g=c("../lib/oop");var d=c("./doc_comment_highlight_rules").DocCommentHighlightRules;var a=c("./text_highlight_rules").TextHighlightRules;var f=function(){var j=("case|default|do|else|for|if|match|while|throw|return|try|catch|finally|yield|abstract|class|def|extends|final|forSome|implicit|implicits|import|lazy|new|object|override|package|private|protected|sealed|super|this|trait|type|val|var|with");var h=("true|false");var k=("AbstractMethodError|AssertionError|ClassCircularityError|ClassFormatError|Deprecated|EnumConstantNotPresentException|ExceptionInInitializerError|IllegalAccessError|IllegalThreadStateException|InstantiationError|InternalError|NegativeArraySizeException|NoSuchFieldError|Override|Process|ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|SuppressWarnings|TypeNotPresentException|UnknownError|UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|InstantiationException|IndexOutOfBoundsException|ArrayIndexOutOfBoundsException|CloneNotSupportedException|NoSuchFieldException|IllegalArgumentException|NumberFormatException|SecurityException|Void|InheritableThreadLocal|IllegalStateException|InterruptedException|NoSuchMethodException|IllegalAccessException|UnsupportedOperationException|Enum|StrictMath|Package|Compiler|Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|Character|Boolean|StackTraceElement|Appendable|StringBuffer|Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|StackOverflowError|OutOfMemoryError|VirtualMachineError|ArrayStoreException|ClassCastException|LinkageError|NoClassDefFoundError|ClassNotFoundException|RuntimeException|Exception|ThreadDeath|Error|Throwable|System|ClassLoader|Cloneable|Class|CharSequence|Comparable|String|Object|Unit|Any|AnyVal|AnyRef|Null|ScalaObject|Singleton|Seq|Iterable|List|Option|Array|Char|Byte|Short|Int|Long|Nothing");var i=this.createKeywordMapper({"variable.language":"this",keyword:j,"support.function":k,"constant.language":h},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},d.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'"""',next:"tstring"},{token:"string",regex:'"(?=.)',next:"string"},{token:"symbol.constant",regex:"'[\\w\\d_]+"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:i,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}],string:[{token:"escape",regex:'\\\\"'},{token:"string",regex:'"',next:"start"},{token:"string.invalid",regex:'[^"\\\\]*$',next:"start"},{token:"string",regex:'[^"\\\\]+'}],tstring:[{token:"string",regex:'"{3,5}',next:"start"},{token:"string",regex:".+?"}]};this.embedRules(d,"doc-",[d.getEndRule("start")])};g.inherits(f,a);b.ScalaHighlightRules=f});