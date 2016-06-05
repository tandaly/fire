/* All rights reserved. */

ace.define("ace/mode/abap",["require","exports","module","ace/tokenizer","ace/mode/abap_highlight_rules","ace/mode/folding/coffee","ace/range","ace/mode/text","ace/lib/oop"],function(d,f,b){var i=d("../tokenizer").Tokenizer;var h=d("./abap_highlight_rules").AbapHighlightRules;var a=d("./folding/coffee").FoldMode;var c=d("../range").Range;var e=d("./text").Mode;var g=d("../lib/oop");function j(){this.HighlightRules=h;this.foldingRules=new a()}g.inherits(j,e);(function(){this.getNextLineIndent=function(n,l,m){var k=this.$getIndent(l);return k};this.toggleCommentLines=function(p,q,n,m){var l=new c(0,0,0,0);for(var o=n;o<=m;++o){var k=q.getLine(o);if(hereComment.test(k)){continue}if(commentLine.test(k)){k=k.replace(commentLine,"$1")}else{k=k.replace(indentation,"$&#")}l.end.row=l.start.row=o;l.end.column=k.length+1;q.replace(l,k)}};this.$id="ace/mode/abap"}).call(j.prototype);f.Mode=j});ace.define("ace/mode/abap_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(d,c,e){var f=d("../lib/oop");var b=d("./text_highlight_rules").TextHighlightRules;var a=function(){var g=this.createKeywordMapper({"variable.language":"this",keyword:"ADD ALIAS ALIASES ASSERT ASSIGN ASSIGNING AT BACK CALL CASE CATCH CHECK CLASS CLEAR CLOSE CNT COLLECT COMMIT COMMUNICATION COMPUTE CONCATENATE CONDENSE CONSTANTS CONTINUE CONTROLS CONVERT CREATE CURRENCY DATA DEFINE DEFINITION DEFERRED DELETE DESCRIBE DETAIL DIVIDE DO ELSE ELSEIF ENDAT ENDCASE ENDCLASS ENDDO ENDEXEC ENDFORM ENDFUNCTION ENDIF ENDIFEND ENDINTERFACE ENDLOOP ENDMETHOD ENDMODULE ENDON ENDPROVIDE ENDSELECT ENDTRY ENDWHILE EVENT EVENTS EXEC EXIT EXPORT EXPORTING EXTRACT FETCH FIELDS FORM FORMAT FREE FROM FUNCTION GENERATE GET HIDE IF IMPORT IMPORTING INDEX INFOTYPES INITIALIZATION INTERFACE INTERFACES INPUT INSERT IMPLEMENTATION LEAVE LIKE LINE LOAD LOCAL LOOP MESSAGE METHOD METHODS MODIFY MODULE MOVE MULTIPLY ON OVERLAY OPTIONAL OTHERS PACK PARAMETERS PERFORM POSITION PROGRAM PROVIDE PUT RAISE RANGES READ RECEIVE RECEIVING REDEFINITION REFERENCE REFRESH REJECT REPLACE REPORT RESERVE RESTORE RETURNING ROLLBACK SCAN SCROLL SEARCH SELECT SET SHIFT SKIP SORT SORTED SPLIT STANDARD STATICS STEP STOP SUBMIT SUBTRACT SUM SUMMARY SUPPRESS TABLES TIMES TRANSFER TRANSLATE TRY TYPE TYPES UNASSIGN ULINE UNPACK UPDATE WHEN WHILE WINDOW WRITE OCCURS STRUCTURE OBJECT PROPERTY CASTING APPEND RAISING VALUE COLOR CHANGING EXCEPTION EXCEPTIONS DEFAULT CHECKBOX COMMENT ID NUMBER FOR TITLE OUTPUT WITH EXIT USING INTO WHERE GROUP BY HAVING ORDER BY SINGLE APPENDING CORRESPONDING FIELDS OF TABLE LEFT RIGHT OUTER INNER JOIN AS CLIENT SPECIFIED BYPASSING BUFFER UP TO ROWS CONNECTING EQ NE LT LE GT GE NOT AND OR XOR IN LIKE BETWEEN","constant.language":"TRUE FALSE NULL SPACE","support.type":"c n i p f d t x string xstring decfloat16 decfloat34","keyword.operator":"abs sign ceil floor trunc frac acos asin atan cos sin tan abapOperator cosh sinh tanh exp log log10 sqrt strlen xstrlen charlen numofchar dbmaxlen lines"},"text",true," ");var h="WITH\\W+(?:HEADER\\W+LINE|FRAME|KEY)|NO\\W+STANDARD\\W+PAGE\\W+HEADING|EXIT\\W+FROM\\W+STEP\\W+LOOP|BEGIN\\W+OF\\W+(?:BLOCK|LINE)|BEGIN\\W+OF|END\\W+OF\\W+(?:BLOCK|LINE)|END\\W+OF|NO\\W+INTERVALS|RESPECTING\\W+BLANKS|SEPARATED\\W+BY|USING\\W+(?:EDIT\\W+MASK)|WHERE\\W+(?:LINE)|RADIOBUTTON\\W+GROUP|REF\\W+TO|(?:PUBLIC|PRIVATE|PROTECTED)(?:\\W+SECTION)?|DELETING\\W+(?:TRAILING|LEADING)(?:ALL\\W+OCCURRENCES)|(?:FIRST|LAST)\\W+OCCURRENCE|INHERITING\\W+FROM|LINE-COUNT|ADD-CORRESPONDING|AUTHORITY-CHECK|BREAK-POINT|CLASS-DATA|CLASS-METHODS|CLASS-METHOD|DIVIDE-CORRESPONDING|EDITOR-CALL|END-OF-DEFINITION|END-OF-PAGE|END-OF-SELECTION|FIELD-GROUPS|FIELD-SYMBOLS|FUNCTION-POOL|MOVE-CORRESPONDING|MULTIPLY-CORRESPONDING|NEW-LINE|NEW-PAGE|NEW-SECTION|PRINT-CONTROL|RP-PROVIDE-FROM-LAST|SELECT-OPTIONS|SELECTION-SCREEN|START-OF-SELECTION|SUBTRACT-CORRESPONDING|SYNTAX-CHECK|SYNTAX-TRACE|TOP-OF-PAGE|TYPE-POOL|TYPE-POOLS|LINE-SIZE|LINE-COUNT|MESSAGE-ID|DISPLAY-MODE|READ(?:-ONLY)?|IS\\W+(?:NOT\\W+)?(?:ASSIGNED|BOUND|INITIAL|SUPPLIED)";this.$rules={start:[{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"doc.comment",regex:/^\*.+/},{token:"comment",regex:/".+$/},{token:"invalid",regex:"\\.{2,}"},{token:"keyword.operator",regex:/\W[\-+\%=<>*]\W|\*\*|[~:,\.&$]|->*?|=>/},{token:"paren.lparen",regex:"[\\[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"constant.numeric",regex:"[+-]?\\d+\\b"},{token:"variable.parameter",regex:/sy|pa?\d\d\d\d\|t\d\d\d\.|innnn/},{token:"keyword",regex:h},{token:"variable.parameter",regex:/\w+-\w+(?:-\w+)*/},{token:g,regex:"\\b\\w+\\b"},{caseInsensitive:true}],qstring:[{token:"constant.language.escape",regex:"''"},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:"``"},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}]}};f.inherits(a,b);c.AbapHighlightRules=a});ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(b,a,c){var d=b("../../lib/oop");var g=b("./fold_mode").FoldMode;var f=b("../../range").Range;var e=a.FoldMode=function(){};d.inherits(e,g);(function(){this.getFoldWidgetRange=function(o,k,s){var m=this.indentationBlock(o,s);if(m){return m}var r=/\S/;var t=o.getLine(s);var l=t.search(r);if(l==-1||t[l]!="#"){return}var i=t.length;var p=o.getLength();var q=s;var j=s;while(++s<p){t=o.getLine(s);var h=t.search(r);if(h==-1){continue}if(t[h]!="#"){break}j=s}if(j>q){var n=o.getLine(j).length;return new f(q,i,j,n)}};this.getFoldWidget=function(n,j,o){var p=n.getLine(o);var h=p.search(/\S/);var k=n.getLine(o+1);var i=n.getLine(o-1);var l=i.search(/\S/);var m=k.search(/\S/);if(h==-1){n.foldWidgets[o-1]=l!=-1&&l<m?"start":"";return""}if(l==-1){if(h==m&&p[h]=="#"&&k[h]=="#"){n.foldWidgets[o-1]="";n.foldWidgets[o+1]="";return"start"}}else{if(l==h&&p[h]=="#"&&i[h]=="#"){if(n.getLine(o-2).search(/\S/)==-1){n.foldWidgets[o-1]="start";n.foldWidgets[o+1]="";return""}}}if(l!=-1&&l<h){n.foldWidgets[o-1]="start"}else{n.foldWidgets[o-1]=""}if(h<m){return"start"}else{return""}}}).call(e.prototype)});