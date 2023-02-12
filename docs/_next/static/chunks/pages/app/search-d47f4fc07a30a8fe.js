(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[276],{4184:function(n,t){var e; /*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ !function(){"use strict";var r={}.hasOwnProperty;function i(){for(var n=[],t=0;t<arguments.length;t++){var e=arguments[t];if(e){var o=typeof e;if("string"===o||"number"===o)n.push(e);else if(Array.isArray(e)){if(e.length){var a=i.apply(null,e);a&&n.push(a)}}else if("object"===o){if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]")){n.push(e.toString());continue}for(var s in e)r.call(e,s)&&e[s]&&n.push(s)}}}return n.join(" ")}n.exports?(i.default=i,n.exports=i):void 0!==(e=(function(){return i}).apply(t,[]))&&(n.exports=e)}()},4373:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/app/search",function(){return e(9091)}])},1511:function(n,t,e){"use strict";var r=e(5893),i=e(9008),o=e.n(i);t.Z=function(n){var t=n.title,e=n.description,i=void 0===e?"":e,a=n.pageUrl,s=n.ogType,u=n.noindex,l=void 0!==u&&u;return(0,r.jsxs)(o(),{children:[(0,r.jsx)("title",{children:t}),function(){if(""!=i)return(0,r.jsx)("meta",{name:"description",content:i})}(),(0,r.jsx)("link",{rel:"icon",href:"/images/icon_web.png"}),(0,r.jsx)("link",{rel:"canonical",href:a}),(0,r.jsx)("meta",{property:"og:url",content:a}),(0,r.jsx)("meta",{property:"og:type",content:s}),(0,r.jsx)("meta",{property:"og:title",content:t}),(0,r.jsx)("meta",{property:"og:image",content:"https://books.sn-10.net/images/ogp.png"}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary"}),function(){if(l)return(0,r.jsx)("meta",{name:"robots",content:"noindex"})}()]})}},5921:function(n,t,e){"use strict";var r=e(5893);t.Z=function(){return(0,r.jsxs)("div",{className:"flex justify-center p-10",children:[(0,r.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full"}),(0,r.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full mx-4"}),(0,r.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full"})]})}},7138:function(n,t,e){"use strict";e.d(t,{Q:function(){return c}});var r=e(5893),i=e(578),o=e(9211),a=e(4184),s=e.n(a),u=e(7294),l=e(5474);function c(n){var t=n.url,e=n.bookData,a=n.position,c=n.headText,d=n.onClick,f=n.makeRightElement,p=function(){return m?(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("span",{className:s()({"mr-2":""!=c}),children:null!=c?c:""}),(0,r.jsx)(l.Z,{src:m.thumbnail}),(0,r.jsxs)("div",{className:"pl-2",children:[m.title,(0,r.jsx)("br",{}),(0,r.jsxs)("small",{className:"text-secondary",children:["ISBN : ",m.isbn]})]})]}),(0,r.jsx)("div",{children:null==f?void 0:f(m)})]}):void 0},h=(0,u.useContext)(i.U),v=(0,u.useState)(null!=e?e:null),m=v[0],x=v[1];switch((0,u.useEffect)(function(){if(t){var n=t.searchParams.get("isbn");n&&n in h.bookDataCaches?x(h.bookDataCaches[n]):(0,o.xd)(t).then(function(n){n&&(h.addBookData(n.isbn,n),x(n))})}},[h,t]),a){case"top":return(0,r.jsx)("li",{className:"w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600",onClick:d,children:p()});case"center":return(0,r.jsx)("li",{className:"w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600",onClick:d,children:p()});case"bottom":return(0,r.jsx)("li",{className:"w-full px-4 py-2 rounded-b-lg",onClick:d,children:p()})}}},5474:function(n,t,e){"use strict";var r=e(5893);t.Z=function(n){var t=n.src;return(0,r.jsx)("img",{src:t,alt:"",style:{position:"relative",minWidth:"60px",maxWidth:"100px",height:"100px",maxHeight:"200px"},className:"object-contain"})}},3473:function(n,t,e){"use strict";e.d(t,{N:function(){return b}});var r=e(7568),i=e(655),o=e(5893),a=e(3430),s=e(4549),u=e(4946),l=e(9211),c=e(9417),d=e(7814),f=e(4184),p=e.n(f),h=e(7294),v=e(5921),m=e(7138);function x(n){var t=n.bookData,e=(0,h.useState)(!1),r=e[0],i=e[1];return(0,o.jsxs)("div",{className:"flex flex-col justify-end",onClick:function(n){s.Z.writeText((0,l.Sn)(t.isbn,t.from,"")),(0,a.b)({key:"completedSharing",data:{type:"default",url:""}}),i(!0),n.stopPropagation()},children:[(0,o.jsx)(d.G,{className:"text-my-color",icon:c.kZ_}),(0,o.jsx)("span",{className:p()({hidden:!r}),children:(0,o.jsx)("small",{className:"text-secondary",children:"コピー!"})})]})}var b=(0,h.forwardRef)(function(n,t){var e=n.isNoheader,a=(0,h.useState)([]),s=a[0],c=a[1],d=(0,h.useState)(!0),f=d[0],p=d[1];function b(n){return g.apply(this,arguments)}function g(){return(g=(0,r.Z)(function(n){var t,e,r;return(0,i.__generator)(this,function(e){switch(e.label){case 0:return p(!0),[4,(0,u.W)({q:{intitle:n}})];case 1:return c(null!==(r=null===(t=e.sent().data)||void 0===t?void 0:t.items)&&void 0!==r?r:[]),p(!1),[2]}})})).apply(this,arguments)}return((0,h.useImperativeHandle)(t,function(){return{search:b}}),f)?(0,o.jsx)("div",{className:"text-center",children:(0,o.jsx)(v.Z,{})}):(0,o.jsxs)("div",{children:[(0,o.jsx)("ul",{className:"m-2 text-left text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer",children:s.filter(function(n){var t,e,r=null==n?void 0:null===(t=n.volumeInfo)||void 0===t?void 0:null===(e=t.industryIdentifiers)||void 0===e?void 0:e[0];return!!r&&("ISBN_10"==r.type||"ISBN_13"==r.type)}).map(function(n,t){var r=(0,l.rP)(n),i=0==t?"top":t==s.length-1?"bottom":"center";return(0,o.jsx)(m.Q,{onClick:function(){var t=(0,l.Sn)(n.volumeInfo.industryIdentifiers[0].identifier,"googlebooks","",e);window.open(t,"_blank")},bookData:r,position:i,headText:String(t+1),makeRightElement:function(){return(0,o.jsx)(x,{bookData:r})}},n.id)})}),function(){if(0==s.length)return(0,o.jsx)("p",{className:"text-center text-secondary",children:"該当する書籍がヒットしませんでした..."})}()]})})},578:function(n,t,e){"use strict";e.d(t,{U:function(){return a},f:function(){return s}});var r=e(1799),i=e(5893),o=e(7294),a=(0,o.createContext)({bookDataCaches:{},addBookData:function(n,t){}}),s=function(n){var t=n.children,e=(0,o.useContext)(a),s=(0,o.useState)(e.bookDataCaches),u=s[0],l=s[1];return(0,i.jsx)(a.Provider,{value:{bookDataCaches:u,addBookData:function(n,t){if(!(n in u)){var e=(0,r.Z)({},u);e[n]=t,l(e)}}},children:t})}},3430:function(n,t,e){"use strict";function r(n){var t=window.flutter_inappwebview;return!!t&&(t.callHandler(n.key,n.data),!0)}e.d(t,{b:function(){return r}})},4549:function(n,t,e){"use strict";var r=e(7568),i=e(655);function o(){return(o=(0,r.Z)(function(){var n,t,e;return(0,i.__generator)(this,function(r){switch(r.label){case 0:if(!(t=window.flutter_inappwebview))return[3,2];return[4,t.callHandler("readClipboardText",{})];case 1:return[2,"string"==typeof(e=r.sent())?e:null];case 2:return[2,null===(n=navigator.clipboard)||void 0===n?void 0:n.readText()];case 3:return[2]}})})).apply(this,arguments)}function a(){return(a=(0,r.Z)(function(n){var t,e;return(0,i.__generator)(this,function(r){return(e=window.flutter_inappwebview)?[2,e.callHandler("writeClipboardText",{text:n})]:[2,null===(t=navigator.clipboard)||void 0===t?void 0:t.writeText(n)]})})).apply(this,arguments)}t.Z={readText:function(){return o.apply(this,arguments)},writeText:function(n){return a.apply(this,arguments)}}},4946:function(n,t,e){"use strict";e.d(t,{W:function(){return s},a:function(){return u}});var r=e(7568),i=e(655),o=e(9669),a=e.n(o);function s(n){var t,e="".concat("https://www.googleapis.com/books/v1/volumes","?q="),r=n.q,i=!1;return(null==r?void 0:r.intitle)&&(i=!0,e+="intitle:".concat(encodeURI(r.intitle))),(null==r?void 0:r.isbn)&&(i&&(e+="+"),i=!0,e+="isbn:"+r.isbn),a().get("".concat(e,"&startIndex=").concat(null!==(t=n.startIndex)&&void 0!==t?t:0))}function u(n){return l.apply(this,arguments)}function l(){return(l=(0,r.Z)(function(n){var t,e,r,o;return(0,i.__generator)(this,function(t){switch(t.label){case 0:return[4,s({q:{isbn:n}})];case 1:return[2,null!=(o=(null!==(r=null==(e=t.sent().data)?void 0:e.items)&&void 0!==r?r:[]).find(function(t){return t.volumeInfo.industryIdentifiers.find(function(t){return t.identifier==n})}))?o:null]}})})).apply(this,arguments)}},9091:function(n,t,e){"use strict";e.r(t);var r=e(5893),i=e(3473),o=e(1511),a=e(1163),s=e(7294),u=function(){var n=(0,a.useRouter)(),t=n.query.title,e="string"==typeof t?t:"",u=(0,s.useRef)(null);return(0,s.useEffect)(function(){var t;n.isReady&&""!=e&&(null===(t=u.current)||void 0===t||t.search(e))},[e]),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.Z,{title:"Share Books",pageUrl:"https://books.sn-10.net/app/search",ogType:"website",noindex:!0}),(0,r.jsx)("main",{children:(0,r.jsx)("div",{className:"w-full px-2 py-3",children:(0,r.jsx)(i.N,{ref:u,isNoheader:!0})})}),(0,r.jsxs)("footer",{children:[(0,r.jsx)("hr",{}),(0,r.jsx)("p",{className:"text-center",children:(0,r.jsx)("a",{className:"underline",href:"https://hello.sn-10.net",children:"sn-10.net"})})]})]})};t.default=u},9211:function(n,t,e){"use strict";e.d(t,{xr:function(){return c},rP:function(){return f},X7:function(){return h},xd:function(){return p},k5:function(){return d},Sn:function(){return u},Nk:function(){return l}});var r=e(7568),i=e(655),o=e(4946),a=e(9528),s=e.n(a);function u(n,t,e){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=new URLSearchParams;return i.append("isbn",n),i.append("from",t),""!=e&&i.append("comment",encodeURIComponent(e)),r&&i.append("noheader",""),l(i)}function l(n){return"".concat(location.origin,"/ja/share?").concat(n.toString())}function c(n){var t;return!!n.href.startsWith(location.origin)&&!((null===(t=n.pathname.split("/"))||void 0===t?void 0:t[2])!=="share"||null==n.searchParams.get("isbn"))}function d(n,t,e){var r=new URLSearchParams;return n.forEach(function(n){return r.append("books",n.searchParams.toString())}),r.append("store",t),r.append("title",e),"".concat(location.origin,"/ja/share/list?").concat(r.toString())}function f(n){var t,e,r,i,o,a,s=n.volumeInfo;return{title:s.title,author:null!==(r=null===(t=s.authors)||void 0===t?void 0:t.join(" "))&&void 0!==r?r:"",isbn:s.industryIdentifiers[0].identifier,publisher:null!==(i=s.publisher)&&void 0!==i?i:"",thumbnail:null!==(o=null==s?void 0:null===(e=s.imageLinks)||void 0===e?void 0:e.smallThumbnail)&&void 0!==o?o:"",description:null!==(a=s.description)&&void 0!==a?a:"",from:"googlebooks"}}function p(n){var t,e,r;return h(null!==(t=n.searchParams.get("isbn"))&&void 0!==t?t:"",null!==(e=n.searchParams.get("from"))&&void 0!==e?e:"")}function h(n,t){return v.apply(this,arguments)}function v(){return(v=(0,r.Z)(function(n,t){return(0,i.__generator)(this,function(e){switch(t){case"opendb":default:var r;return[2,s().get(n).then(function(n){var t,e,r,i=null===(t=n.data)||void 0===t?void 0:t[0];return i?{title:i.summary.title,author:i.summary.author,isbn:i.summary.isbn,publisher:i.summary.publisher,thumbnail:i.summary.cover,description:null!==(r=null===(e=i.onix.CollateralDetail.TextContent)||void 0===e?void 0:e[0].Text)&&void 0!==r?r:"",from:"openbd"}:null})];case"googlebooks":return[2,(0,o.a)(n).then(function(n){return n?f(n):null})]}return[2,Promise.resolve(null)]})})).apply(this,arguments)}},9008:function(n,t,e){n.exports=e(5443)},1163:function(n,t,e){n.exports=e(387)}},function(n){n.O(0,[976,639,774,888,179],function(){return n(n.s=4373)}),_N_E=n.O()}]);