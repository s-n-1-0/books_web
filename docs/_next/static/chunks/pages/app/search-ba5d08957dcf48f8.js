(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[276],{4373:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/app/search",function(){return t(9091)}])},1511:function(n,e,t){"use strict";var r=t(5893),i=t(9008),o=t.n(i);e.Z=function(n){var e=n.title,t=n.description,i=void 0===t?"":t,s=n.pageUrl,a=n.ogType,u=n.noindex,l=void 0!==u&&u;return(0,r.jsxs)(o(),{children:[(0,r.jsx)("title",{children:e}),function(){if(""!=i)return(0,r.jsx)("meta",{name:"description",content:i})}(),(0,r.jsx)("link",{rel:"icon",href:"/images/icon_web.png"}),(0,r.jsx)("link",{rel:"canonical",href:s}),(0,r.jsx)("meta",{property:"og:url",content:s}),(0,r.jsx)("meta",{property:"og:type",content:a}),(0,r.jsx)("meta",{property:"og:title",content:e}),(0,r.jsx)("meta",{property:"og:image",content:"https://books.sn-10.net/images/ogp.png"}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary"}),function(){if(l)return(0,r.jsx)("meta",{name:"robots",content:"noindex"})}()]})}},5921:function(n,e,t){"use strict";var r=t(5893);e.Z=function(){return(0,r.jsxs)("div",{className:"flex justify-center p-10",children:[(0,r.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full"}),(0,r.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full mx-4"}),(0,r.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full"})]})}},5474:function(n,e,t){"use strict";var r=t(5893);e.Z=function(n){var e=n.src;return(0,r.jsx)("img",{src:e,alt:"",style:{position:"relative",minWidth:"60px",maxWidth:"100px",height:"100px",maxHeight:"200px"},className:"object-contain"})}},3473:function(n,e,t){"use strict";t.d(e,{N:function(){return d}});var r=t(7568),i=t(655),o=t(5893),s=t(4946),a=t(9211),u=t(7294),l=t(5921),c=t(5474),d=(0,u.forwardRef)(function(n,e){var t=n.isNoheader,d=(0,u.useState)([]),f=d[0],m=d[1],h=(0,u.useState)(!0),v=h[0],p=h[1];function x(n){return g.apply(this,arguments)}function g(){return(g=(0,r.Z)(function(n){var e,t,r;return(0,i.__generator)(this,function(t){switch(t.label){case 0:return p(!0),[4,(0,s.W)({q:{intitle:n}})];case 1:return m(null!==(r=null===(e=t.sent().data)||void 0===e?void 0:e.items)&&void 0!==r?r:[]),p(!1),[2]}})})).apply(this,arguments)}return((0,u.useImperativeHandle)(e,function(){return{search:x}}),v)?(0,o.jsx)("div",{className:"text-center",children:(0,o.jsx)(l.Z,{})}):(0,o.jsxs)("div",{children:[" ",(0,o.jsx)("ul",{className:"m-2 text-left text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer",children:f.filter(function(n){var e,t,r=null==n?void 0:null===(e=n.volumeInfo)||void 0===e?void 0:null===(t=e.industryIdentifiers)||void 0===t?void 0:t[0];return!!r&&("ISBN_10"==r.type||"ISBN_13"==r.type)}).map(function(n){var e,r;return(0,o.jsx)("li",{onClick:function(){var e=(0,a.Sn)(n.volumeInfo.industryIdentifiers[0].identifier,"googlebooks","",t);window.open(e,"_blank")},className:"py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600",children:(0,o.jsxs)("div",{className:"flex items-center",children:[(0,o.jsx)(c.Z,{src:null!==(r=null===(e=n.volumeInfo.imageLinks)||void 0===e?void 0:e.smallThumbnail)&&void 0!==r?r:""}),(0,o.jsxs)("div",{className:"pl-2",children:[n.volumeInfo.title,(0,o.jsx)("br",{}),(0,o.jsxs)("small",{className:"text-secondary",children:["ISBN : ",n.volumeInfo.industryIdentifiers[0].identifier]})]})]})},n.id)})}),function(){if(0==f.length)return(0,o.jsx)("p",{className:"text-center text-secondary",children:"該当する書籍がヒットしませんでした..."})}()]})})},4946:function(n,e,t){"use strict";t.d(e,{W:function(){return a},a:function(){return u}});var r=t(7568),i=t(655),o=t(9669),s=t.n(o);function a(n){var e,t="".concat("https://www.googleapis.com/books/v1/volumes","?q="),r=n.q,i=!1;return(null==r?void 0:r.intitle)&&(i=!0,t+="intitle:".concat(encodeURI(r.intitle))),(null==r?void 0:r.isbn)&&(i&&(t+="+"),i=!0,t+="isbn:"+r.isbn),s().get("".concat(t,"&startIndex=").concat(null!==(e=n.startIndex)&&void 0!==e?e:0))}function u(n){return l.apply(this,arguments)}function l(){return(l=(0,r.Z)(function(n){var e,t,r,o;return(0,i.__generator)(this,function(e){switch(e.label){case 0:return[4,a({q:{isbn:n}})];case 1:return[2,null!=(o=(null!==(r=null==(t=e.sent().data)?void 0:t.items)&&void 0!==r?r:[]).find(function(e){return e.volumeInfo.industryIdentifiers.find(function(e){return e.identifier==n})}))?o:null]}})})).apply(this,arguments)}},9091:function(n,e,t){"use strict";t.r(e);var r=t(5893),i=t(3473),o=t(1511),s=t(1163),a=t(7294),u=function(){var n=(0,s.useRouter)(),e=n.query.title,t="string"==typeof e?e:"",u=(0,a.useRef)(null);return(0,a.useEffect)(function(){var e;n.isReady&&""!=t&&(null===(e=u.current)||void 0===e||e.search(t))},[t]),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.Z,{title:"Share Books",pageUrl:"https://books.sn-10.net/app/search",ogType:"website",noindex:!0}),(0,r.jsx)("main",{children:(0,r.jsx)("div",{className:"w-full px-2 py-3",children:(0,r.jsx)(i.N,{ref:u,isNoheader:!0})})}),(0,r.jsxs)("footer",{children:[(0,r.jsx)("hr",{}),(0,r.jsx)("p",{className:"text-center",children:(0,r.jsx)("a",{className:"underline",href:"https://hello.sn-10.net",children:"sn-10.net"})})]})]})};e.default=u},9211:function(n,e,t){"use strict";t.d(e,{xr:function(){return l},X7:function(){return f},xd:function(){return d},k5:function(){return c},Sn:function(){return u}});var r=t(7568),i=t(655),o=t(4946),s=t(9528),a=t.n(s);function u(n,e,t){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i="".concat(location.origin,"/ja/share?isbn=").concat(n,"&from=").concat(e);return""!=t&&(i+="&comment=".concat(encodeURIComponent(t))),r&&(i+="&noheader"),i}function l(n){var e;return!!n.href.startsWith(location.origin)&&!((null===(e=n.pathname.split("/"))||void 0===e?void 0:e[2])!=="share"||null==n.searchParams.get("isbn"))}function c(n,e,t){var r=new URLSearchParams;return n.forEach(function(n){return r.append("books",n.href)}),r.append("store",e),r.append("title",t),"".concat(location.origin,"/ja/share/list?").concat(r.toString())}function d(n){var e,t,r;return f(null!==(e=n.searchParams.get("isbn"))&&void 0!==e?e:"",null!==(t=n.searchParams.get("from"))&&void 0!==t?t:"")}function f(n,e){return m.apply(this,arguments)}function m(){return(m=(0,r.Z)(function(n,e){return(0,i.__generator)(this,function(t){switch(e){case"opendb":default:var r;return[2,a().get(n).then(function(n){var e,t,r,i=null===(e=n.data)||void 0===e?void 0:e[0];return i?{title:i.summary.title,author:i.summary.author,isbn:i.summary.isbn,publisher:i.summary.publisher,thumbnail:i.summary.cover,description:null!==(r=null===(t=i.onix.CollateralDetail.TextContent)||void 0===t?void 0:t[0].Text)&&void 0!==r?r:"",from:"openbd"}:null})];case"googlebooks":return[2,(0,o.a)(n).then(function(e){var t,r,i,o,s;return e?{title:e.volumeInfo.title,author:e.volumeInfo.authors.join(" "),isbn:n,publisher:null!==(i=e.volumeInfo.publisher)&&void 0!==i?i:"",thumbnail:null!==(o=null===(t=e.volumeInfo)||void 0===t?void 0:null===(r=t.imageLinks)||void 0===r?void 0:r.smallThumbnail)&&void 0!==o?o:"",description:null!==(s=e.volumeInfo.description)&&void 0!==s?s:"",from:"googlebooks"}:null})]}return[2,Promise.resolve(null)]})})).apply(this,arguments)}},9008:function(n,e,t){n.exports=t(5443)}},function(n){n.O(0,[61,774,888,179],function(){return n(n.s=4373)}),_N_E=n.O()}]);