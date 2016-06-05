/* All rights reserved. */

ace.define("ace/mode/logiql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/logiql_highlight_rules","ace/mode/folding/coffee","ace/token_iterator","ace/range","ace/mode/behaviour/cstyle","ace/mode/matching_brace_outdent"],function(d,f,b){var g=d("../lib/oop");var e=d("./text").Mode;var j=d("../tokenizer").Tokenizer;var h=d("./logiql_highlight_rules").LogiQLHighlightRules;var a=d("./folding/coffee").FoldMode;var i=d("../token_iterator").TokenIterator;var c=d("../range").Range;var m=d("./behaviour/cstyle").CstyleBehaviour;var l=d("./matching_brace_outdent").MatchingBraceOutdent;var k=function(){this.HighlightRules=h;this.foldingRules=new a();this.$outdent=new l();this.$behaviour=new m()};g.inherits(k,e);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.getNextLineIndent=function(t,p,r){var o=this.$getIndent(p);var s=this.getTokenizer().getLineTokens(p,t);var u=s.tokens;var n=s.state;if(/comment|string/.test(n)){return o}if(u.length&&u[u.length-1].type=="comment.single"){return o}var q=p.match();if(/(-->|<--|<-|->|{)\s*$/.test(p)){o+=r}return o};this.checkOutdent=function(p,n,o){if(this.$outdent.checkOutdent(n,o)){return true}if(o!=="\n"&&o!=="\r\n"){return false}if(!/^\s+/.test(n)){return false}return true};this.autoOutdent=function(n,s,u){if(this.$outdent.autoOutdent(s,u)){return}var t=s.getLine(u);var q=t.match(/^\s+/);var p=t.lastIndexOf(".")+1;if(!q||!u||!p){return 0}var v=s.getLine(u+1);var r=this.getMatching(s,{row:u,column:p});if(!r||r.start.row==u){return 0}p=q[0].length;var o=this.$getIndent(s.getLine(r.start.row));s.replace(new c(u+1,0,u+1,p),o)};this.getMatching=function(s,v,o){if(v==undefined){v=s.selection.lead}if(typeof v=="object"){o=v.column;v=v.row}var q=s.getTokenAt(v,o);var t="keyword.start",r="keyword.end";var u;if(!q){return}if(q.type==t){var p=new i(s,v,o);p.step=p.stepForward}else{if(q.type==r){var p=new i(s,v,o);p.step=p.stepBackward}else{return}}while(u=p.step()){if(u.type==t||u.type==r){break}}if(!u||u.type==q.type){return}var n=p.getCurrentTokenColumn();var v=p.getCurrentTokenRow();return new c(v,n,v,n+u.value.length)};this.$id="ace/mode/logiql"}).call(k.prototype);f.Mode=k});ace.define("ace/mode/logiql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(c,b,d){var f=c("../lib/oop");var a=c("./text_highlight_rules").TextHighlightRules;var e=function(){this.$rules={start:[{token:"comment.block",regex:"/\\*",push:[{token:"comment.block",regex:"\\*/",next:"pop"},{defaultToken:"comment.block"}],},{token:"comment.single",regex:"//.*",},{token:"constant.numeric",regex:"\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?",},{token:"string",regex:'"',push:[{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}],},{token:"constant.language",regex:"\\b(true|false)\\b",},{token:"entity.name.type.logicblox",regex:"`[a-zA-Z_:]+(\\d|\\a)*\\b",},{token:"keyword.start",regex:"->",comment:"Constraint"},{token:"keyword.start",regex:"-->",comment:"Level 1 Constraint"},{token:"keyword.start",regex:"<-",comment:"Rule"},{token:"keyword.start",regex:"<--",comment:"Level 1 Rule"},{token:"keyword.end",regex:"\\.",comment:"Terminator"},{token:"keyword.other",regex:"!",comment:"Negation"},{token:"keyword.other",regex:",",comment:"Conjunction"},{token:"keyword.other",regex:";",comment:"Disjunction"},{token:"keyword.operator",regex:"<=|>=|!=|<|>",comment:"Equality"},{token:"keyword.other",regex:"@",comment:"Equality"},{token:"keyword.operator",regex:"\\+|-|\\*|/",comment:"Arithmetic operations"},{token:"keyword",regex:"::",comment:"Colon colon"},{token:"support.function",regex:"\\b(agg\\s*<<)",push:[{include:"$self"},{token:"support.function",regex:">>",next:"pop"}],},{token:"storage.modifier",regex:"\\b(lang:[\\w:]*)",},{token:["storage.type","text"],regex:"(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)",},{token:"entity.name",regex:"[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))",},{token:"variable.parameter",regex:"([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))",}]};this.normalizeRules()};f.inherits(e,a);b.LogiQLHighlightRules=e});ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(b,a,c){var d=b("../../lib/oop");var g=b("./fold_mode").FoldMode;var f=b("../../range").Range;var e=a.FoldMode=function(){};d.inherits(e,g);(function(){this.getFoldWidgetRange=function(o,k,s){var m=this.indentationBlock(o,s);if(m){return m}var r=/\S/;var t=o.getLine(s);var l=t.search(r);if(l==-1||t[l]!="#"){return}var i=t.length;var p=o.getLength();var q=s;var j=s;while(++s<p){t=o.getLine(s);var h=t.search(r);if(h==-1){continue}if(t[h]!="#"){break}j=s}if(j>q){var n=o.getLine(j).length;return new f(q,i,j,n)}};this.getFoldWidget=function(n,j,o){var p=n.getLine(o);var h=p.search(/\S/);var k=n.getLine(o+1);var i=n.getLine(o-1);var l=i.search(/\S/);var m=k.search(/\S/);if(h==-1){n.foldWidgets[o-1]=l!=-1&&l<m?"start":"";return""}if(l==-1){if(h==m&&p[h]=="#"&&k[h]=="#"){n.foldWidgets[o-1]="";n.foldWidgets[o+1]="";return"start"}}else{if(l==h&&p[h]=="#"&&i[h]=="#"){if(n.getLine(o-2).search(/\S/)==-1){n.foldWidgets[o-1]="start";n.foldWidgets[o+1]="";return""}}}if(l!=-1&&l<h){n.foldWidgets[o-1]="start"}else{n.foldWidgets[o-1]=""}if(h<m){return"start"}else{return""}}}).call(e.prototype)});ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,h,c){var k=e("../../lib/oop");var f=e("../behaviour").Behaviour;var n=e("../../token_iterator").TokenIterator;var b=e("../../lib/lang");var j=["text","paren.rparen","punctuation.operator"];var d=["text","paren.rparen","punctuation.operator","comment"];var m=0;var a=-1;var o="";var g=0;var i=-1;var l="";var p="";var q=function(){q.isSaneInsertion=function(t,u){var v=t.getCursorPosition();var s=new n(u,v.row,v.column);if(!this.$matchTokenType(s.getCurrentToken()||"text",j)){var r=new n(u,v.row,v.column+1);if(!this.$matchTokenType(r.getCurrentToken()||"text",j)){return false}}s.stepForward();return s.getCurrentTokenRow()!==v.row||this.$matchTokenType(s.getCurrentToken()||"text",d)};q.$matchTokenType=function(s,r){return r.indexOf(s.type||s)>-1};q.recordAutoInsert=function(s,t,v){var u=s.getCursorPosition();var r=t.doc.getLine(u.row);if(!this.isAutoInsertedClosing(u,r,o[0])){m=0}a=u.row;o=v+r.substr(u.column);m++};q.recordMaybeInsert=function(s,t,v){var u=s.getCursorPosition();var r=t.doc.getLine(u.row);if(!this.isMaybeInsertedClosing(u,r)){g=0}i=u.row;l=r.substr(0,u.column)+v;p=r.substr(u.column);g++};q.isAutoInsertedClosing=function(t,r,s){return m>0&&t.row===a&&s===o[0]&&r.substr(t.column)===o};q.isMaybeInsertedClosing=function(s,r){return g>0&&s.row===i&&r.substr(s.column)===p&&r.substr(0,s.column)==l};q.popAutoInsertedClosing=function(){o=o.substr(1);m--};q.clearMaybeInsertedClosing=function(){g=0;i=-1};this.add("braces","insertion",function(s,v,y,B,D){var E=y.getCursorPosition();var F=B.doc.getLine(E.row);if(D=="{"){var C=y.getSelectionRange();var w=B.doc.getTextRange(C);if(w!==""&&w!=="{"&&y.getWrapBehavioursEnabled()){return{text:"{"+w+"}",selection:false}}else{if(q.isSaneInsertion(y,B)){if(/[\]\}\)]/.test(F[E.column])||y.inMultiSelectMode){q.recordAutoInsert(y,B,"}");return{text:"{}",selection:[1,1]}}else{q.recordMaybeInsert(y,B,"{");return{text:"{",selection:[1,1]}}}}}else{if(D=="}"){var z=F.substring(E.column,E.column+1);if(z=="}"){var r=B.$findOpeningBracket("}",{column:E.column+1,row:E.row});if(r!==null&&q.isAutoInsertedClosing(E,F,D)){q.popAutoInsertedClosing();return{text:"",selection:[1,1]}}}}else{if(D=="\n"||D=="\r\n"){var u="";if(q.isMaybeInsertedClosing(E,F)){u=b.stringRepeat("}",g);q.clearMaybeInsertedClosing()}var z=F.substring(E.column,E.column+1);if(z==="}"){var A=B.findMatchingBracket({row:E.row,column:E.column+1},"}");if(!A){return null}var x=this.$getIndent(B.getLine(A.row))}else{if(u){var x=this.$getIndent(F)}else{return}}var t=x+B.getTabString();return{text:"\n"+t+"\n"+x+u,selection:[1,t.length,1,t.length]}}else{q.clearMaybeInsertedClosing()}}}});this.add("braces","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&t=="{"){var r=x.doc.getLine(s.start.row);var y=r.substring(s.end.column,s.end.column+1);if(y=="}"){s.end.column++;return s}else{g--}}});this.add("parens","insertion",function(s,t,v,x,z){if(z=="("){var y=v.getSelectionRange();var u=x.doc.getTextRange(y);if(u!==""&&v.getWrapBehavioursEnabled()){return{text:"("+u+")",selection:false}}else{if(q.isSaneInsertion(v,x)){q.recordAutoInsert(v,x,")");return{text:"()",selection:[1,1]}}}}else{if(z==")"){var A=v.getCursorPosition();var B=x.doc.getLine(A.row);var w=B.substring(A.column,A.column+1);if(w==")"){var r=x.$findOpeningBracket(")",{column:A.column+1,row:A.row});if(r!==null&&q.isAutoInsertedClosing(A,B,z)){q.popAutoInsertedClosing();return{text:"",selection:[1,1]}}}}}});this.add("parens","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&t=="("){var r=x.doc.getLine(s.start.row);var y=r.substring(s.start.column+1,s.start.column+2);if(y==")"){s.end.column++;return s}}});this.add("brackets","insertion",function(s,t,v,x,z){if(z=="["){var y=v.getSelectionRange();var u=x.doc.getTextRange(y);if(u!==""&&v.getWrapBehavioursEnabled()){return{text:"["+u+"]",selection:false}}else{if(q.isSaneInsertion(v,x)){q.recordAutoInsert(v,x,"]");return{text:"[]",selection:[1,1]}}}}else{if(z=="]"){var A=v.getCursorPosition();var B=x.doc.getLine(A.row);var w=B.substring(A.column,A.column+1);if(w=="]"){var r=x.$findOpeningBracket("]",{column:A.column+1,row:A.row});if(r!==null&&q.isAutoInsertedClosing(A,B,z)){q.popAutoInsertedClosing();return{text:"",selection:[1,1]}}}}}});this.add("brackets","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&t=="["){var r=x.doc.getLine(s.start.row);var y=r.substring(s.start.column+1,s.start.column+2);if(y=="]"){s.end.column++;return s}}});this.add("string_dquotes","insertion",function(s,v,z,C,G){if(G=='"'||G=="'"){var r=G;var E=z.getSelectionRange();var w=C.doc.getTextRange(E);if(w!==""&&w!=="'"&&w!='"'&&z.getWrapBehavioursEnabled()){return{text:r+w+r,selection:false}}else{var F=z.getCursorPosition();var I=C.doc.getLine(F.row);var H=I.substring(F.column-1,F.column);if(H=="\\"){return null}var B=C.getTokens(E.start.row);var t=0,u;var y=-1;for(var D=0;D<B.length;D++){u=B[D];if(u.type=="string"){y=-1}else{if(y<0){y=u.value.indexOf(r)}}if((u.value.length+t)>E.start.column){break}t+=B[D].value.length}if(!u||(y<0&&u.type!=="comment"&&(u.type!=="string"||((E.start.column!==u.value.length+t-1)&&u.value.lastIndexOf(r)===u.value.length-1)))){if(!q.isSaneInsertion(z,C)){return}return{text:r+r,selection:[1,1]}}else{if(u&&u.type==="string"){var A=I.substring(F.column,F.column+1);if(A==r){return{text:"",selection:[1,1]}}}}}}});this.add("string_dquotes","deletion",function(w,v,u,x,s){var t=x.doc.getTextRange(s);if(!s.isMultiLine()&&(t=='"'||t=="'")){var r=x.doc.getLine(s.start.row);var y=r.substring(s.start.column+1,s.start.column+2);if(y==t){s.end.column++;return s}}})};k.inherits(q,f);h.CstyleBehaviour=q});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(c,b,d){var e=c("../range").Range;var a=function(){};(function(){this.checkOutdent=function(f,g){if(!/^\s+$/.test(f)){return false}return/^\s*\}/.test(g)};this.autoOutdent=function(k,l){var g=k.getLine(l);var h=g.match(/^(\s*\})/);if(!h){return 0}var i=h[1].length;var j=k.findMatchingBracket({row:l,column:i});if(!j||j.row==l){return 0}var f=this.$getIndent(k.getLine(j.row));k.replace(new e(l,0,l,i-1),f)};this.$getIndent=function(f){return f.match(/^\s*/)[0]}}).call(a.prototype);b.MatchingBraceOutdent=a});