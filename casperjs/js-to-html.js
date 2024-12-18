"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
(function codenautasModuleDefinition(root, name, factory) {
    /* global define */
    /* global globalModuleName */
    /* istanbul ignore next */
    if(typeof root.globalModuleName !== 'string'){
        root.globalModuleName = name;
    }
    /* istanbul ignore next */
    if(typeof exports === 'object' && typeof module === 'object'){
        module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        define(factory);
    }else if(typeof exports === 'object'){
        exports[root.globalModuleName] = factory();
    }else{
        root[root.globalModuleName] = factory();
    }
    root.globalModuleName = null;
})(/*jshint -W040 */this, 'jsToHtml', function() {
/*jshint +W040 */

/*jshint -W004 */
var jsToHtml = {};
/*jshint +W004 */

/* global document */

function isPlainObject(x){
    return typeof x==="object" && x && x.constructor === Object;
}

function spaces(n){
    return new Array(n+1).join(' ');
}

var htmlReservedSymbols={
    '&' :'&amp;',
    '<' :'&lt;',
    '>' :'&gt;',
    "'" :'&#39;',
    '"' :'&quot;'
};

jsToHtml.html={
    mandatoryTitle:true
};

function escapeChar(simpleText){
    simpleText=''+simpleText;
    return /[&<>'"]/.test(simpleText)?simpleText.replace(/[&<>'"]/g,function(c){ return htmlReservedSymbols[c]; }):simpleText;
}

jsToHtml.couldDirectTextContent=function couldDirectTextContent(x){
    return typeof x==="string" || typeof x==="number";
};

function identity(x){ return x; }

var validDirectProperties={
    textNode:{
        className:'HtmlTextNode',
        properties:{
            textNode:{
                checks:[
                    {check:function(x){ return x!=null;}, text:"textNodes must not contains null"}, 
                    {check:jsToHtml.couldDirectTextContent, text:"must be string or number"}
                ], 
                transform:function(x){ return typeof x==="string" || x==null?x:''+x; }
            }
        }
    },
    tagName:{
        className:'Html',
        properties:{
            tagName:   {checks:[
                {check:function(x){ return typeof x==="string"; }, text:"must be a string"},
                {check:function(x){
                    if(!jsToHtml.htmlTags[x]){ 
                        throw new Error("jsToHtml.Html error: directObject tagName "+x+" not exists");
                    } 
                    return true;
                }}  
            ]},
            attributes:{checks:[
                {check:function(attributes){ return isPlainObject(attributes); }, text:"must be a plain Object"},
                {check:function(attributes){
                    /*jshint forin:false */
                    for(var attrName in attributes){
                        /*jshint forin:true */
                        var attrValue=attributes[attrName];
                        if(attrValue==null){
                            throw new Error('js-to-html: attributes must not contain null value');
                        }
                        if((attrName in jsToHtml.htmlAttrs) && (jsToHtml.htmlAttrs[attrName].rejectSpaces)){
                            var pattWhiteSpaces=new RegExp( "\\s");
                            if(pattWhiteSpaces.test(attrValue)){   
                                throw new Error('js-to-html: ' + attrName + 'class attribute could not contain spaces. Use classList attribute.');
                            }
                            if(attrValue instanceof Array){
                                attrValue = attrValue.join('');
                            }
                        }
                    }
                    return true;
                }}
            ]},
            content:{checks:[
                {check:function(x){ return typeof x==="object" && x instanceof Array; }, text:"must be an Array"},
                {check:function(x,o){ return !jsToHtml.htmlTags[o.tagName]["void"] || !x.length; }, text:"void elements must not have content"},
            ]},
        }
    },
    htmlCode:{
        className:'HtmlDirectNode',
        properties:{
            htmlCode:{
                checks:[
                    {check:function(x){ return x!=null;}, text:"htmlCode must not contains null"}, 
                    {check:function(x){ return typeof x == "string"; }, text:"htmlCode must be a string"},
                    {check:function(){ return jsToHtml.html.insecureModeEnabled; }, text:"insecure functions not allowed"},
                    {check:function(x,o){ return o.validator(x); }, text:"invalid htmlCode"},
                ]
            },
            validator:{
                checks:[
                    {check:function(x){ return x instanceof Function; }, text: "validator must be a function"}
                ]
            }
        },
    },
    commentText:{
        className:'HtmlComment',
        properties:{
            commentText:{
                checks:[
                    {check:function(x){ return typeof x == "string"; }, text:"commentText must be a string"},
                    {check:function(x){ return !/-->/.test(x);}, text:"invalid text in comment"}
                ]
            }
        },
    }
};

function HtmlBase(directObject, validProperties){
    /*jshint forin:false */
    for(var property in validProperties){
        /*jshint forin:true */
        var propertyDef=validProperties[property];
        var value=(propertyDef.transform||identity)(directObject[property]);
        if(!(property in directObject)){
            throw new Error('jsToHtml.Html error: directObject must include '+property);
        }
        for(var c=0; c<propertyDef.checks.length; c++){
            var check=propertyDef.checks[c];
            if(!check.check(value, directObject)){
                throw new Error('jsToHtml.Html error: directObject '+property+' '+check.text);
            }
        }
        this[property]=value;
    }
    /*jshint forin:false */
    for(property in directObject){
        /*jshint forin:true */
        if(!(property in validProperties)){
            throw new Error('jsToHtml.Html error: directObject not recognized '+property+' property');
        }
    }
}

jsToHtml.Html=function Html(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.tagName.properties);
};
jsToHtml.Html.prototype = Object.create(HtmlBase.prototype);

jsToHtml.HtmlTextNode=function HtmlTextNode(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.textNode.properties);
};
jsToHtml.HtmlTextNode.prototype = Object.create(HtmlBase.prototype);

jsToHtml.HtmlDirectNode=function HtmlDirectNode(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.htmlCode.properties);
};
jsToHtml.HtmlDirectNode.prototype = Object.create(HtmlBase.prototype);

jsToHtml.HtmlComment=function HtmlComment(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.commentText.properties);
};
jsToHtml.HtmlComment.prototype = Object.create(HtmlBase.prototype);

HtmlBase.prototype.attributesToHtmlText=function attributesToHtmlText(){
    var pattNonWordChar=new RegExp(/\W/);
    return Object.keys(this.attributes).map(function(attrName){
        var attrVal=this.attributes[attrName];
        var textAttrVal=attrVal;
        var attrDefinition=jsToHtml.htmlAttrs[attrName] || {};
        if(attrDefinition.synonym){
            attrName=attrDefinition.synonym;
            attrDefinition=jsToHtml.htmlAttrs[attrName];
        }
        if(attrDefinition.listType && typeof attrVal!=="string"){
            textAttrVal=attrVal.join(' ');
        } 
        var escapedAttrVal=escapeChar(textAttrVal);
        var quotingAttrVal=textAttrVal===''||pattNonWordChar.test(textAttrVal)?'\''+escapedAttrVal+'\'':escapedAttrVal;
        return ' '+attrName+'='+quotingAttrVal;
    },this).join('');
};

HtmlBase.prototype.contentToHtmlText=function contentToHtmlText(opts,recurseOpts){
    return this.content.map(function(node){
        return node.toHtmlText(opts,{margin:recurseOpts.margin+2});
    }).join('');
};

HtmlBase.prototype.toHtmlDoc=function toHtmlDoc(opts,recurseOpts){
    opts = opts||{};
    var html = jsToHtml.html;
    var target=this;
    if(!opts.incomplete){
        var source=this;
        var head;
        if(source.tagName==='html'){
            target=source;
        }else{
            target=html.html([source]);
        }
        if(!target.content.length){
            target.content.push(html.body());
        }
        if(target.content[0].tagName==='head'){
            head=target.content[0];
        }else{
            head=html.head();
            target.content.unshift(head);
        }
        if(target.content[1].tagName!=='body'){
            target.content.shift();
            // var body=html.body([target.content[0]]);
            var body=html.body(target.content);
            target.content=[head, body];
        }
        var titles=head.content.filter(function(element){
            return element.tagName==='title';
        });
        if(titles.length>1){
            throw new Error("toHtmlDoc ERROR: multiple title");
        }else if(titles.length==1){
            if(opts.title){
                throw new Error("toHtmlDoc ERROR: double title");
            }
        }else{
            var titleText = opts.title||html.defaultTitle;
            if(titleText){
                head.content.unshift(html.title(titleText));
            }else if(jsToHtml.html.mandatoryTitle){
                throw new Error("toHtmlDoc ERROR: missing mandatory title");
            }
        }
    }
    return '<!doctype html>\n'+target.toHtmlText(opts,recurseOpts);
};
/* istanbul ignore next */
HtmlBase.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    throw new Error('must implement toHtmlText');
};

jsToHtml.Html.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    opts=opts||{};
    recurseOpts=recurseOpts||{};
    recurseOpts.margin=recurseOpts.margin||0;
    var tagInfo=jsToHtml.htmlTags[this.tagName];
    var tagInfoFirstChild=jsToHtml.htmlTags[(this.content[0]||{}).tagName]||{};
    var isvoidTag=tagInfo["void"]||false;
    var inlineBlock=((tagInfo.display||'inline')==='inline');
    var firstChildInline=(tagInfoFirstChild.display||'inline')!=='inline';
    var nl=(opts.pretty && !inlineBlock?'\n':'');
    var sp=(opts.pretty && !inlineBlock?spaces:function(){return ''; });
    return sp(recurseOpts.margin)+"<"+
        this.tagName+
        this.attributesToHtmlText()+
        ">"+(firstChildInline?nl:'')+
        this.contentToHtmlText(opts,recurseOpts)+
        (firstChildInline?sp(recurseOpts.margin):'')+
        (isvoidTag?'':"</"+this.tagName+">")+nl;

};

jsToHtml.HtmlTextNode.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    return escapeChar(this.textNode);
};

jsToHtml.HtmlDirectNode.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    return this.htmlCode;
};

jsToHtml.HtmlComment.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    return "<!--"+this.commentText+"-->";
};

jsToHtml.direct=function direct(directObject){
    for(var mainAttr in validDirectProperties){
        if(mainAttr in directObject){
            return new jsToHtml[validDirectProperties[mainAttr].className](directObject);
        }
    }
    throw new Error('js-to-html.direct error: invalid arguments to direct function');
};

jsToHtml.indirect=function indirect(tagName,contentOrAttributes,contentIfThereAreAttributes){
    var thereAreAttributes=isPlainObject(contentOrAttributes);
    if(!thereAreAttributes && contentOrAttributes instanceof Object && !(contentOrAttributes instanceof Array)){
        throw new Error('jsToHmlt.'+tagName+' expects plain object of attributes or array of content');
    }
    var attributes = thereAreAttributes?contentOrAttributes:{};
    var content    = thereAreAttributes?contentIfThereAreAttributes:contentOrAttributes;
    if(!thereAreAttributes && (arguments.length>3 || contentIfThereAreAttributes != null)){
        throw new Error('jsToHtml.'+tagName+' ERROR: the first parameter is not an attribute object then must there no be a second parameter');
    }
    return jsToHtml.direct({
        tagName:tagName,
        attributes:attributes,
        content:(content instanceof Array?content:[content]).filter(function(element){
            return element!==null && element!==undefined;
        }).map(function(element){
            return jsToHtml.couldDirectTextContent(element)?jsToHtml.direct({textNode:element}):element;
        })
    });
};

jsToHtml.htmlAttrs={
    "class"        :{ domName:'className', listType:'classList', rejectSpaces:true},
    "for"          :{ domName:'htmlFor'  },
    classList      :{ synonym:'class' },
    className      :{ synonym:'class' },
    htmlFor        :{ synonym:'for' }
};


// https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
jsToHtml.htmlTags={
    "a"            :{type:'HTML4', description:"Defines a hyperlink"},
    "abbr"         :{type:'HTML4', description:"Defines an abbreviation"},
    "acronym"      :{type:'HTML4', description:"Not supported in HTML5. Defines an acronym"},
    "address"      :{type:'HTML4', description:"Defines contact information for the author/owner of a document"},
    "applet"       :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines an embedded applet"},
    "area"         :{type:'HTML4', "void":true, description:"Defines an area inside an image-map"},
    "article"      :{type:'HTML5', description:"Defines an article"},
    "aside"        :{type:'HTML5', description:"Defines content aside from the page content"},
    "audio"        :{type:'HTML5', description:"Defines sound content"},
    "b"            :{type:'HTML4', description:"Defines bold text"},
    "base"         :{type:'HTML4', "void":true, description:"Specifies the base URL/target for all relative URLs in a document"},
    "basefont"     :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Specifies a default color, size, and font for all text in a document"},
    "bdi"          :{type:'HTML5', description:"Isolates a part of text that might be formatted in a different direction from other text outside it"},
    "bdo"          :{type:'HTML4', description:"Overrides the current text direction"},
    "big"          :{type:'HTML4', description:"Not supported in HTML5. Defines big text"},
    "blockquote"   :{type:'HTML4', description:"Defines a section that is quoted from another source"},
    "body"         :{type:'HTML4', description:"Defines the document's body"},
    "br"           :{type:'HTML4', "void":true, description:"Defines a single line break"},
    "button"       :{type:'HTML4', description:"Defines a clickable button"},
    "canvas"       :{type:'HTML5', description:"Used to draw graphics, on the fly, via scripting (usually JavaScript)"},
    "caption"      :{type:'HTML4', display:'not-inline', description:"Defines a table caption"},
    "center"       :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines centered text"},
    "cite"         :{type:'HTML4', description:"Defines the title of a work"},
    "code"         :{type:'HTML4', description:"Defines a piece of computer code"},
    "col"          :{type:'HTML4', display:'not-inline', "void":true, description:"Specifies column properties for each column within a <colgroup> element "},
    "colgroup"     :{type:'HTML4', display:'not-inline', description:"Specifies a group of one or more columns in a table for formatting"},
    "command"      :{type:'HTML5', "void":true, description:"Defines a command button that a user can invoke"},
    "datalist"     :{type:'HTML5', description:"Specifies a list of pre-defined options for input controls"},
    "dd"           :{type:'HTML4', description:"Defines a description of an item in a definition list"},
    "del"          :{type:'HTML4', description:"Defines text that has been deleted from a document"},
    "details"      :{type:'HTML5', description:"Defines additional details that the user can view or hide"},
    "dfn"          :{type:'HTML4', description:"Defines a definition term"},
    "dialog"       :{type:'HTML5', description:"Defines a dialog box or window"},
    "dir"          :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines a directory list"},
    "div"          :{type:'HTML4', display:'block', description:"Defines a section in a document"},
    "dl"           :{type:'HTML4', description:"Defines a definition list"},
    "dt"           :{type:'HTML4', description:"Defines a term (an item) in a definition list"},
    "em"           :{type:'HTML4', description:"Defines emphasized text "},
    "embed"        :{type:'HTML5', "void":true, description:"Defines a container for an external (non-HTML) application"},
    "fieldset"     :{type:'HTML4', description:"Groups related elements in a form"},
    "figcaption"   :{type:'HTML5', description:"Defines a caption for a <figure> element"},
    "figure"       :{type:'HTML5', description:"Specifies self-contained content"},
    "font"         :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines font, color, and size for text"},
    "footer"       :{type:'HTML5', description:"Defines a footer for a document or section"},
    "form"         :{type:'HTML4', description:"Defines an HTML form for user input"},
    "frame"        :{type:'HTML4', description:"Not supported in HTML5. Defines a window (a frame) in a frameset"},
    "frameset"     :{type:'HTML4', description:"Not supported in HTML5. Defines a set of frames"},
    "h1"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 1"},
    "h2"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 2"},
    "h3"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 3"},
    "h4"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 4"},
    "h5"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 5"},
    "h6"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 6"},
    "head"         :{type:'HTML4', description:"Defines information about the document"},
    "header"       :{type:'HTML5', description:"Defines a header for a document or section"},
    "hgroup"       :{type:'HTML5', description:"Groups heading ( <h1> to <h6>) elements"},
    "hr"           :{type:'HTML4', "void":true, description:" Defines a thematic change in the content"},
    "html"         :{type:'HTML4', description:"Defines the root of an HTML document"},
    "i"            :{type:'HTML4', description:"Defines a part of text in an alternate voice or mood"},
    "iframe"       :{type:'HTML4', description:"Defines an inline frame"},
    "img"          :{type:'HTML4', "void":true, description:"Defines an image"},
    "input"        :{type:'HTML4', "void":true, description:"Defines an input control"},
    "ins"          :{type:'HTML4', description:"Defines a text that has been inserted into a document"},
    "kbd"          :{type:'HTML4', description:"Defines keyboard input"},
    "keygen"       :{type:'HTML5', description:"Defines a key-pair generator field (for forms)"},
    "label"        :{type:'HTML4', description:"Defines a label for an <input> element"},
    "legend"       :{type:'HTML4', description:"Defines a caption for a <fieldset>, <figure>, or <details> element"},
    "li"           :{type:'HTML4', description:"Defines a list item"},
    "link"         :{type:'HTML4', "void":true, description:"Defines the relationship between a document and an external resource (most used to link to style sheets)"},
    "map"          :{type:'HTML4', description:"Defines a client-side image-map"},
    "mark"         :{type:'HTML5', description:"Defines marked/highlighted text"},
    "menu"         :{type:'HTML4', description:"Defines a list/menu of commands"},
    "meta"         :{type:'HTML4', "void":true, description:"Defines metadata about an HTML document"},
    "meter"        :{type:'HTML5', description:"Defines a scalar measurement within a known range (a gauge)"},
    "nav"          :{type:'HTML5', description:"Defines navigation links"},
    "noframes"     :{type:'HTML4', description:"Not supported in HTML5. Defines an alternate content for users that do not support frames"},
    "noscript"     :{type:'HTML4', description:"Defines an alternate content for users that do not support client-side scripts"},
    "object"       :{type:'HTML4', description:"Defines an embedded object"},
    "ol"           :{type:'HTML4', description:"Defines an ordered list"},
    "optgroup"     :{type:'HTML4', description:"Defines a group of related options in a drop-down list"},
    "option"       :{type:'HTML4', description:"Defines an option in a drop-down list"},
    "output"       :{type:'HTML5', description:"Defines the result of a calculation"},
    "p"            :{type:'HTML4', display:'block', description:"Defines a paragraph"},
    "param"        :{type:'HTML4', "void":true, description:"Defines a parameter for an object"},
    "pre"          :{type:'HTML4', description:"Defines preformatted text"},
    "progress"     :{type:'HTML5', description:"Represents the progress of a task"},
    "q"            :{type:'HTML4', description:"Defines a short quotation"},
    "rp"           :{type:'HTML5', description:"Defines what to show in browsers that do not support ruby annotations"},
    "rt"           :{type:'HTML5', description:"Defines an explanation/pronunciation of characters (for East Asian typography)"},
    "ruby"         :{type:'HTML5', description:"Defines a ruby annotation (for East Asian typography)"},
    "s"            :{type:'HTML4', description:"Defines text that is no longer correct"},
    "samp"         :{type:'HTML4', description:"Defines sample output from a computer program"},
    "script"       :{type:'HTML4', description:"Defines a client-side script"},
    "section"      :{type:'HTML5', description:"Defines a section in a document"},
    "select"       :{type:'HTML4', description:"Defines a drop-down list"},
    "small"        :{type:'HTML4', description:"Defines smaller text"},
    "source"       :{type:'HTML5', "void":true, description:"Defines multiple media resources for media elements (<video> and <audio>)"},
    "span"         :{type:'HTML4', description:"Defines a section in a document"},
    "strike"       :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines strikethrough text"},
    "strong"       :{type:'HTML4', description:"Defines important text"},
    "style"        :{type:'HTML4', description:"Defines style information for a document"},
    "sub"          :{type:'HTML4', description:"Defines subscripted text"},
    "summary"      :{type:'HTML5', description:"Defines a visible heading for a <details> element"},
    "sup"          :{type:'HTML4', description:"Defines superscripted text"},
    "table"        :{type:'HTML4', display:'not-inline', description:"Defines a table"},
    "tbody"        :{type:'HTML4', display:'not-inline', description:"Groups the body content in a table"},
    "td"           :{type:'HTML4', display:'not-inline', description:"Defines a cell in a table"},
    "textarea"     :{type:'HTML4', description:"Defines a multiline input control (text area)"},
    "tfoot"        :{type:'HTML4', display:'not-inline', description:"Groups the footer content in a table"},
    "th"           :{type:'HTML4', display:'not-inline', description:"Defines a header cell in a table"},
    "thead"        :{type:'HTML4', display:'not-inline', description:"Groups the header content in a table"},
    "time"         :{type:'HTML5', description:"Defines a date/time"},
    "title"        :{type:'HTML4', description:"Defines a title for the document"},
    "tr"           :{type:'HTML4', display:'not-inline', description:"Defines a row in a table"},
    "track"        :{type:'HTML5', description:"Defines text tracks for media elements (<video> and <audio>)"},
    "tt"           :{type:'HTML4', description:"Not supported in HTML5. Defines teletype text"},
    "u"            :{type:'HTML4', description:"Defines text that should be stylistically different from normal text"},
    "ul"           :{type:'HTML4', description:"Defines an unordered list"},
    "var"          :{type:'HTML4', description:"Defines a variable"},
    "video"        :{type:'HTML5', description:"Defines a video or movie"},
    "wbr"          :{type:'HTML5', description:"Defines a possible line-break"}
};

jsToHtml.html._text=function _text(text){
    return jsToHtml.direct({textNode:text});
};

jsToHtml.html._comment=function _comment(text){
    return jsToHtml.direct({commentText:text});
};

jsToHtml.html.includeHtml=function _text(htmlCode){
    if(!this.insecureModeEnabled){
        throw new Error("jsToHtml.html.includeHtml: insecure functions not allowed");
    }
    return jsToHtml.direct({htmlCode:htmlCode, validator:this.includeHtmlValidator});
};

Object.keys(jsToHtml.htmlTags).map(function(tagName){
    jsToHtml.html[tagName]=function(contentOrAttributes,contentIfThereAreAttributes){
        return jsToHtml.indirect(tagName,contentOrAttributes,contentIfThereAreAttributes);
    };
});

jsToHtml.HtmlTextNode.prototype.create = function create(){
    return document.createTextNode(this.textNode);
};

jsToHtml.html.includeHtmlValidator=function(htmlText){
    return /^((<[^<>]+>)|[^<>]+|\n)*$/.test(htmlText);
};

jsToHtml.Html.prototype.create = function create(){
    var element = document.createElement(this.tagName);
    /*jshint -W089 */
    Object.keys(this.attributes).map(function(attr){
        var value=this.attributes[attr];
        var defAttr=jsToHtml.htmlAttrs[attr]||{};
        if(('listType' in defAttr) && (typeof value!=="string")){
            Array.prototype.forEach.call(value,function(subValue){
                element[defAttr.listType].add(subValue);
            });
        }else{
            element[defAttr.domName||attr] = value;
        }
    },this);
    this.content.forEach(function(node){
        element.appendChild(node.create());
    });
    /*jshint +W089 */
    return element;
};

return jsToHtml;

});
