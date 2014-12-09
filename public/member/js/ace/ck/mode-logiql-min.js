ace.define("ace/mode/logiql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/logiql_highlight_rules","ace/mode/folding/coffee","ace/token_iterator","ace/range","ace/mode/behaviour/cstyle","ace/mode/matching_brace_outdent"],function(e,t,n){var r=e("../lib/oop"),o=e("./text").Mode,i=e("./logiql_highlight_rules").LogiQLHighlightRules,s=e("./folding/coffee").FoldMode,a=e("../token_iterator").TokenIterator,u=e("../range").Range,c=e("./behaviour/cstyle").CstyleBehaviour,l=e("./matching_brace_outdent").MatchingBraceOutdent,d=function(){this.HighlightRules=i,this.foldingRules=new s,this.$outdent=new l,this.$behaviour=new c};r.inherits(d,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens,s=o.state;if(/comment|string/.test(s))return r;if(i.length&&"comment.single"==i[i.length-1].type)return r;var a=t.match();return/(-->|<--|<-|->|{)\s*$/.test(t)&&(r+=n),r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)?!0:"\n"!==n&&"\r\n"!==n?!1:/^\s+/.test(t)?!0:!1},this.autoOutdent=function(e,t,n){if(!this.$outdent.autoOutdent(t,n)){var r=t.getLine(n),o=r.match(/^\s+/),i=r.lastIndexOf(".")+1;if(!o||!n||!i)return 0;var s=t.getLine(n+1),a=this.getMatching(t,{row:n,column:i});if(!a||a.start.row==n)return 0;i=o[0].length;var c=this.$getIndent(t.getLine(a.start.row));t.replace(new u(n+1,0,n+1,i),c)}},this.getMatching=function(e,t,n){void 0==t&&(t=e.selection.lead),"object"==typeof t&&(n=t.column,t=t.row);var r=e.getTokenAt(t,n),o="keyword.start",i="keyword.end",s;if(r){if(r.type==o){var c=new a(e,t,n);c.step=c.stepForward}else{if(r.type!=i)return;var c=new a(e,t,n);c.step=c.stepBackward}for(;(s=c.step())&&s.type!=o&&s.type!=i;);if(s&&s.type!=r.type){var l=c.getCurrentTokenColumn(),t=c.getCurrentTokenRow();return new u(t,l,t,l+s.value.length)}}},this.$id="ace/mode/logiql"}.call(d.prototype),t.Mode=d}),ace.define("ace/mode/logiql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"comment.block",regex:"/\\*",push:[{token:"comment.block",regex:"\\*/",next:"pop"},{defaultToken:"comment.block"}]},{token:"comment.single",regex:"//.*"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?"},{token:"string",regex:'"',push:[{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"constant.language",regex:"\\b(true|false)\\b"},{token:"entity.name.type.logicblox",regex:"`[a-zA-Z_:]+(\\d|\\a)*\\b"},{token:"keyword.start",regex:"->",comment:"Constraint"},{token:"keyword.start",regex:"-->",comment:"Level 1 Constraint"},{token:"keyword.start",regex:"<-",comment:"Rule"},{token:"keyword.start",regex:"<--",comment:"Level 1 Rule"},{token:"keyword.end",regex:"\\.",comment:"Terminator"},{token:"keyword.other",regex:"!",comment:"Negation"},{token:"keyword.other",regex:",",comment:"Conjunction"},{token:"keyword.other",regex:";",comment:"Disjunction"},{token:"keyword.operator",regex:"<=|>=|!=|<|>",comment:"Equality"},{token:"keyword.other",regex:"@",comment:"Equality"},{token:"keyword.operator",regex:"\\+|-|\\*|/",comment:"Arithmetic operations"},{token:"keyword",regex:"::",comment:"Colon colon"},{token:"support.function",regex:"\\b(agg\\s*<<)",push:[{include:"$self"},{token:"support.function",regex:">>",next:"pop"}]},{token:"storage.modifier",regex:"\\b(lang:[\\w:]*)"},{token:["storage.type","text"],regex:"(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)"},{token:"entity.name",regex:"[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))"},{token:"variable.parameter",regex:"([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))"}]},this.normalizeRules()};r.inherits(i,o),t.LogiQLHighlightRules=i}),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,n){var r=e("../../lib/oop"),o=e("./fold_mode").FoldMode,i=e("../../range").Range,s=t.FoldMode=function(){};r.inherits(s,o),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var o=/\S/,s=e.getLine(n),a=s.search(o);if(-1!=a&&"#"==s[a]){for(var u=s.length,c=e.getLength(),l=n,d=n;++n<c;){s=e.getLine(n);var g=s.search(o);if(-1!=g){if("#"!=s[g])break;d=n}}if(d>l){var m=e.getLine(d).length;return new i(l,u,d,m)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),o=r.search(/\S/),i=e.getLine(n+1),s=e.getLine(n-1),a=s.search(/\S/),u=i.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=a&&u>a?"start":"","";if(-1==a){if(o==u&&"#"==r[o]&&"#"==i[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(a==o&&"#"==r[o]&&"#"==s[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return e.foldWidgets[n-1]=-1!=a&&o>a?"start":"",u>o?"start":""}}.call(s.prototype)}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){var r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,s=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],u=["text","paren.rparen","punctuation.operator","comment"],c,l={},d=function(e){var t=-1;return e.multiSelect&&(t=e.selection.id,l.rangeCount!=e.multiSelect.rangeCount&&(l={rangeCount:e.multiSelect.rangeCount})),l[t]?c=l[t]:void(c=l[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},g=function(){this.add("braces","insertion",function(e,t,n,r,o){var i=n.getCursorPosition(),a=r.doc.getLine(i.row);if("{"==o){d(n);var u=n.getSelectionRange(),l=r.doc.getTextRange(u);if(""!==l&&"{"!==l&&n.getWrapBehavioursEnabled())return{text:"{"+l+"}",selection:!1};if(g.isSaneInsertion(n,r))return/[\]\}\)]/.test(a[i.column])||n.inMultiSelectMode?(g.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(g.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){d(n);var m=a.substring(i.column,i.column+1);if("}"==m){var f=r.$findOpeningBracket("}",{column:i.column+1,row:i.row});if(null!==f&&g.isAutoInsertedClosing(i,a,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){d(n);var h="";g.isMaybeInsertedClosing(i,a)&&(h=s.stringRepeat("}",c.maybeInsertedBrackets),g.clearMaybeInsertedClosing());var m=a.substring(i.column,i.column+1);if("}"===m){var k=r.findMatchingBracket({row:i.row,column:i.column+1},"}");if(!k)return null;var p=this.$getIndent(r.getLine(k.row))}else{if(!h)return void g.clearMaybeInsertedClosing();var p=this.$getIndent(a)}var b=p+r.getTabString();return{text:"\n"+b+"\n"+p+h,selection:[1,b.length,1,b.length]}}g.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.end.column,o.end.column+1);if("}"==a)return o.end.column++,o;c.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){d(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"("+s+")",selection:!1};if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){d(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),c=u.substring(a.column,a.column+1);if(")"==c){var l=r.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==l&&g.isAutoInsertedClosing(a,u,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(")"==a)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){d(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"["+s+"]",selection:!1};if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){d(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),c=u.substring(a.column,a.column+1);if("]"==c){var l=r.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==l&&g.isAutoInsertedClosing(a,u,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if("]"==a)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){d(n);var i=o,s=n.getSelectionRange(),a=r.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return{text:i+a+i,selection:!1};var u=n.getCursorPosition(),c=r.doc.getLine(u.row),l=c.substring(u.column-1,u.column);if("\\"==l)return null;for(var m=r.getTokens(s.start.row),f=0,h,k=-1,p=0;p<m.length&&(h=m[p],"string"==h.type?k=-1:0>k&&(k=h.value.indexOf(i)),!(h.value.length+f>s.start.column));p++)f+=m[p].value.length;if(!h||0>k&&"comment"!==h.type&&("string"!==h.type||s.start.column!==h.value.length+f-1&&h.value.lastIndexOf(i)===h.value.length-1)){if(!g.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(h&&"string"===h.type){var b=c.substring(u.column,u.column+1);if(b==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(a==i)return o.end.column++,o}})};g.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",a)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",a))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",u)},g.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},g.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,c.autoInsertedLineEnd[0])||(c.autoInsertedBrackets=0),c.autoInsertedRow=r.row,c.autoInsertedLineEnd=n+o.substr(r.column),c.autoInsertedBrackets++},g.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(c.maybeInsertedBrackets=0),c.maybeInsertedRow=r.row,c.maybeInsertedLineStart=o.substr(0,r.column)+n,c.maybeInsertedLineEnd=o.substr(r.column),c.maybeInsertedBrackets++},g.isAutoInsertedClosing=function(e,t,n){return c.autoInsertedBrackets>0&&e.row===c.autoInsertedRow&&n===c.autoInsertedLineEnd[0]&&t.substr(e.column)===c.autoInsertedLineEnd},g.isMaybeInsertedClosing=function(e,t){return c.maybeInsertedBrackets>0&&e.row===c.maybeInsertedRow&&t.substr(e.column)===c.maybeInsertedLineEnd&&t.substr(0,e.column)==c.maybeInsertedLineStart},g.popAutoInsertedClosing=function(){c.autoInsertedLineEnd=c.autoInsertedLineEnd.substr(1),c.autoInsertedBrackets--},g.clearMaybeInsertedClosing=function(){c&&(c.maybeInsertedBrackets=0,c.maybeInsertedRow=-1)},r.inherits(g,o),t.CstyleBehaviour=g}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){var r=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var n=e.getLine(t),o=n.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,s=e.findMatchingBracket({row:t,column:i});if(!s||s.row==t)return 0;var a=this.$getIndent(e.getLine(s.row));e.replace(new r(t,0,t,i-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o});