(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6],{910:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ja/share",function(){return n(1313)}])},5921:function(e,t,n){"use strict";var s=n(5893);t.Z=function(){return(0,s.jsxs)("div",{className:"flex justify-center p-10",children:[(0,s.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full"}),(0,s.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full mx-4"}),(0,s.jsx)("div",{className:"animate-ping h-2 w-2 bg-my-color rounded-full"})]})}},3473:function(e,t,n){"use strict";n.d(t,{N:function(){return b}});var s=n(7568),r=n(655),l=n(5893),i=n(3430),a=n(4549),c=n(4946),o=n(2336),d=n(9417),u=n(7814),x=n(4184),m=n.n(x),h=n(7294),f=n(5921),p=n(7138);function j(e){var t=e.bookData,n=(0,h.useState)(!1),s=n[0],r=n[1];return(0,l.jsxs)("div",{className:"flex flex-col justify-end",onClick:function(e){a.Z.writeText((0,o.Sn)(t.isbn,t.from,"")),(0,i.bG)({key:"completedSharing",data:{type:"default",url:""}}),r(!0),e.stopPropagation()},children:[(0,l.jsx)(u.G,{className:"text-my-color",icon:d.kZ_}),(0,l.jsx)("span",{className:m()({hidden:!s}),children:(0,l.jsx)("small",{className:"text-secondary",children:"コピー!"})})]})}var b=(0,h.forwardRef)(function(e,t){var n=(0,h.useState)([]),i=n[0],a=n[1],d=(0,h.useState)(!0),u=d[0],x=d[1];function m(e){return b.apply(this,arguments)}function b(){return(b=(0,s.Z)(function(e){var t,n,s;return(0,r.__generator)(this,function(n){switch(n.label){case 0:return x(!0),[4,(0,c.W)({q:{intitle:e}})];case 1:return a(null!==(s=null===(t=n.sent().data)||void 0===t?void 0:t.items)&&void 0!==s?s:[]),x(!1),[2]}})})).apply(this,arguments)}return((0,h.useImperativeHandle)(t,function(){return{search:m}}),u)?(0,l.jsx)("div",{className:"text-center",children:(0,l.jsx)(f.Z,{})}):(0,l.jsxs)("div",{children:[(0,l.jsx)("ul",{className:"m-2 text-left text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer",children:i.filter(function(e){var t,n,s=null==e?void 0:null===(t=e.volumeInfo)||void 0===t?void 0:null===(n=t.industryIdentifiers)||void 0===n?void 0:n[0];return!!s&&("ISBN_10"==s.type||"ISBN_13"==s.type)}).map(function(e,t){var n=(0,o.rP)(e),s=0==t?"top":t==i.length-1?"bottom":"center";return(0,l.jsx)(p.Q,{onClick:function(){var t=(0,o.Sn)(e.volumeInfo.industryIdentifiers[0].identifier,"googlebooks","");window.open(t,"_blank")},bookData:n,position:s,headText:String(t+1),makeRightElement:function(){return(0,l.jsx)(j,{bookData:n})}},e.id)})}),function(){if(0==i.length)return(0,l.jsx)("p",{className:"text-center text-secondary",children:"該当する書籍がヒットしませんでした..."})}()]})})},1313:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return D}});var s=n(5893),r=n(9417),l=n(7814),i=n(7294),a=(0,i.forwardRef)(function(e,t){var n,a=e.comment,c=e.onChange,o=(0,i.useState)(!1),d=o[0],u=o[1];return((0,i.useImperativeHandle)(t,function(){return{finishEditing:function(){u(!1)}}}),d||""!=a)?d?(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400",children:["コメント",(0,s.jsx)("small",{className:"ml-2",children:"コメントが2行以上の場合、1行目がタイトルとして表示されます。"})]}),(0,s.jsx)("textarea",{rows:4,className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"この本は...",value:a,onChange:function(e){c(e.target.value)}})]}):(0,s.jsxs)("div",{className:"",children:[(0,s.jsx)("div",{className:" lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden",title:"Woman holding a mug"}),(0,s.jsx)("div",{className:"border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal",children:(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsxs)("p",{className:"text-sm text-gray-600 flex items-center",children:[(0,s.jsx)(l.G,{icon:r.Mzg}),(0,s.jsx)("span",{className:"pl-1",children:"コメント"}),(0,s.jsxs)("span",{className:"font-bold text-secondary",children:["(",(0,s.jsx)("u",{className:"cursor-pointer",onClick:function(){u(!0)},children:"編集"})," ","/"," ",(0,s.jsx)("u",{className:"cursor-pointer",onClick:function(){c(""),u(!0)},children:"新しくコメントする"}),")"]})]}),(n=a.split("\n")).length>1?(0,s.jsxs)("div",{children:[" ",(0,s.jsx)("div",{className:"text-gray-900 font-bold text-xl my-2",children:n[0]}),(0,s.jsx)("p",{className:"text-gray-700 text-base",children:n.slice(1).join("\n")})]}):(0,s.jsx)("p",{className:"text-gray-700 text-base",children:a})]})})]}):(0,s.jsx)("div",{className:"text-center",children:(0,s.jsx)("span",{className:"underline cursor-pointer",onClick:function(){u(!0)},children:"この本にコメントを残す"})})}),c=n(5474),o=n(7568),d=n(655),u=n(3430),x=n(2336),m=n(4946),h=n(1242);function f(){return(f=(0,o.Z)(function(e){var t,n,s,r,l,i;return(0,d.__generator)(this,function(n){switch(n.label){case 0:return[4,h.U(e)];case 1:if(!(s=null===(t=n.sent().data)||void 0===t?void 0:t[0]))return[3,2];return[2,{title:s.summary.title,author:s.summary.author,isbn:s.summary.isbn,publisher:s.summary.publisher,thumbnail:s.summary.cover,description:null!==(l=null===(r=s.onix.CollateralDetail.TextContent)||void 0===r?void 0:r[0].Text)&&void 0!==l?l:"",from:"openbd"}];case 2:return[4,(0,m.a)(e)];case 3:if(i=n.sent())return[2,(0,x.rP)(i)];return[2,null];case 4:return[2]}})})).apply(this,arguments)}var p=n(4274),j=n(4184),b=n.n(j),g=n(1664),v=n.n(g),y=n(3473),N=n(3454),w=(0,i.forwardRef)(function(e,t){var n=function(){u(!1)},a=(0,i.useState)(!1),c=a[0],u=a[1],x=(0,i.useState)(""),m=x[0],h=x[1],f=(0,i.useRef)(null);function p(e){return j.apply(this,arguments)}function j(){return(j=(0,o.Z)(function(e){return(0,d.__generator)(this,function(t){return u(!0),h(e),N.nextTick(function(){var t;null===(t=f.current)||void 0===t||t.search(e)}),[2]})})).apply(this,arguments)}return((0,i.useImperativeHandle)(t,function(){return{openModal:p,closeModal:n}}),c)?(0,s.jsx)("div",{className:"absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden z-20",children:(0,s.jsxs)("div",{className:"relative h-5/6 w-full mx-4 lg:mx-0 lg:w-3/4 md:p-4 bg-white rounded-md shadow-xl overflow-y-auto",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-1",children:[(0,s.jsxs)("p",{className:"flex justify-end w-full m-1",children:[(0,s.jsx)("input",{type:"text",value:m,className:"w-full inline-block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5",onChange:function(e){h(e.target.value)}}),(0,s.jsx)("button",{className:"bg-my-color text-white font-bold py-1 px-3 rounded-lg ml-1",onClick:function(){N.nextTick(function(){var e;null===(e=f.current)||void 0===e||e.search(m)})},children:(0,s.jsx)(l.G,{icon:r.wn1})})]}),(0,s.jsx)(l.G,{className:"text-3xl p-2 cursor-pointer",icon:r.g82,onClick:n})]}),(0,s.jsx)("hr",{className:"mb-3"}),(0,s.jsx)(y.N,{ref:f,isNoheader:!1})]})}):(0,s.jsx)("span",{})}),k=function(e){var t,n=e.errorText,a=(0,i.useState)(""),c=a[0],m=a[1],h=(0,i.useState)(""),j=h[0],g=h[1],y=(0,i.useRef)(null),N="Kindle(電子書籍)のURLは現在非対応です。Amazonの商品ページで紙の書籍を選択してください。";function k(e){return S.apply(this,arguments)}function S(){return(S=(0,o.Z)(function(e){var t,n,s,r;return(0,d.__generator)(this,function(l){switch(l.label){case 0:if(n=null,""!=(s=(0,p.convertUrl2Isbn13)(e)).isbn)n=s.isbn;else if("KINDLE"==s.error)return g(N),[2];else if(e.startsWith("http"))return g("無効なURLです。"),[2];if(e.startsWith("978")&&(n=e),!n)return[3,2];return[4,function(e){return f.apply(this,arguments)}(n)];case 1:return(r=l.sent())?location.href=(0,x.Sn)(r.isbn,r.from,""):g("書籍を見つけることができませんでした..."),[3,3];case 2:null===(t=y.current)||void 0===t||t.openModal(e),l.label=3;case 3:return[2]}})})).apply(this,arguments)}return(0,s.jsxs)("div",{className:"text-center mt-2 mx-auto",style:{maxWidth:"1250px"},children:[(0,s.jsxs)("div",{className:"py-10 text-start px-3 bg-gray-100 relative mx-auto",style:{height:"80vh",minHeight:"500px",maxHeight:"800px"},children:[(0,s.jsxs)("div",{className:"relative flex flex-col justify-between z-10 h-full",children:[(0,s.jsxs)("div",{className:"bg-white rounded w-fit mx-2 p-2",style:{fontFamily:"'游明朝 Medium','Yu Mincho',YuMincho,'Hiragino Mincho Pro',serif"},children:[(0,s.jsx)("h1",{className:"text-3xl text-my-color md:text-4xl",children:"読書日より"}),(0,s.jsx)("hr",{className:"mt-1"}),(0,s.jsx)("p",{className:"text-slate-500 text-sm md:text-base",children:"登録不要で簡単に書籍を共有することができます。"})]}),(0,s.jsxs)("div",{className:"bg-slate-100 rounded py-4 px-2 lg:px-4 mx-auto w-full",style:{maxWidth:"800px"},children:[(0,s.jsx)("p",{className:"text-red-600 text-center",children:n}),(0,s.jsxs)("div",{className:"flex justify-end items-center w-full",children:[(0,s.jsxs)("div",{className:"relative mb-1 w-full",children:[(0,s.jsx)("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:(0,s.jsx)(l.G,{icon:r.wn1})}),(0,s.jsx)("input",{className:"shadow appearance-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",inputMode:"text",placeholder:"ISBN、書籍タイトル または URL...",value:c,onChange:function(e){m(e.target.value)},onKeyDown:(t=(0,o.Z)(function(e){return(0,d.__generator)(this,function(t){return"Enter"==e.key&&(e.preventDefault(),e.currentTarget.blur(),k(c)),[2]})}),function(e){return t.apply(this,arguments)})})]}),(0,s.jsx)("button",{className:"bg-my-color text-white font-bold rounded-lg ml-1 h-8 w-8 "+b()({hidden:!(0,u.TS)()}),onClick:(0,o.Z)(function(){var e;return(0,d.__generator)(this,function(t){switch(t.label){case 0:return[4,(0,u.my)()];case 1:return""!=(e=t.sent())&&k(e),[2]}})}),children:(0,s.jsx)(l.G,{icon:r.VdD})})]}),(0,s.jsxs)("p",{className:"text-secondary text-center text-xs "+b()({hidden:""!=j||(0,u.TS)()}),children:[(0,s.jsx)(l.G,{icon:r.VdD,className:"px-1"}),"バーコードからISBNを読み取る機能は、アプリをダウンロードすると利用可能です!"]}),(0,s.jsxs)("div",{className:"mb-2",children:[(0,s.jsx)("p",{className:"text-red-600 text-center",children:j}),(0,s.jsx)("div",{className:"p-10 mx-auto "+b()({hidden:j!=N}),children:(0,s.jsx)("img",{src:"https://i.gyazo.com/c13353fcbacce087b7dd3a42985d19c0.png",style:{maxHeight:"89px",width:"100%",objectFit:"contain"},alt:""})})]})]}),(0,s.jsx)("p",{className:"pt-2 px-2 text-white text-end opacity-90",children:(0,s.jsxs)("small",{children:["Painted by"," ",(0,s.jsx)("a",{href:"https://www.midjourney.com/",className:"underline",children:"Midjourney"}),"."]})})]}),(0,s.jsx)("div",{className:"absolute py-3 px-1 h-full w-full top-0 right-0",children:(0,s.jsx)("div",{className:"relative h-full w-full",children:(0,s.jsx)("img",{className:"object-cover ml-auto z-0 rounded-md h-full w-full",src:"https://hello.sn-10.net/apps/books/mid_thumbnail.webp",alt:"Painted by Midjourney"})})})]}),(0,s.jsx)(w,{ref:y}),(0,s.jsx)("p",{className:"text-center text-secondary",children:(0,s.jsx)(v(),{href:"/ja/help/find",children:(0,s.jsxs)("a",{className:"underline",children:[(0,s.jsx)(l.G,{icon:r.Psp,className:"mr-2"}),"書籍が見つからない場合..."]})})})]})},S=n(1511),_=n(9028),Z=n(5921),C=n(1326),T=n(1055),R=n(909),G=function(e){var t=e.isbn;return(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"flex justify-center items-center m-3",children:[(0,s.jsx)(C.Z,{isbn:t}),(0,s.jsx)(R.Z,{isbn:t}),(0,s.jsx)(T.Z,{isbn:t})]}),(0,s.jsx)("p",{className:"text-center text-secondary",children:(0,s.jsx)(v(),{href:"/ja/help/find",children:(0,s.jsxs)("a",{className:"underline",children:[(0,s.jsx)(l.G,{icon:r.Psp,className:"mr-2"}),"取り扱い書店の追加をリクエストする..."]})})})]})},I=n(7313),E=n(4549),M=n(9881),U=n(1163),D=function(){var e=function(){return"string"==typeof m?decodeURIComponent(m):""},t=(0,U.useRouter)(),n=t.query,o=n.isbn,d=n.from,m=n.comment,h=(0,i.useState)(null),f=h[0],p=h[1],j=(0,i.useState)(""),b=j[0],g=j[1],v=(0,i.useState)(!1),y=v[0],N=v[1],w=(0,i.useState)(""),C=w[0],T=w[1],R=(0,i.useRef)(null);(0,i.useEffect)(function(){z(e())},[m]);var D,P,L=(0,i.useState)(e()),W=L[0],z=L[1];return(0,i.useEffect)(function(){t.isReady&&("string"==typeof o?(N(!1),(0,x.X7)(o,"string"==typeof d?d:"").then(function(e){e?(p(e),N(!1)):g("書籍情報を見つけることができませんでした。")}).catch(function(){g("通信エラー。時間を置いてからご確認ください。")})):N(!0))},[t.query]),(0,s.jsxs)("div",{children:[(0,s.jsx)(S.Z,{title:"本を知り合いに紹介する - 読書日より/Share Books",description:"登録不要で簡単に書籍を共有・紹介できるサイトです。書籍レビューや書店へのリンクを含む共有URLを発行することができます。ご自由にお使いください。",pageUrl:"https://books.sn-10.net/ja/share",ogType:"product"}),(0,s.jsx)(_.Z,{}),(0,s.jsx)("main",{children:(0,s.jsx)("div",{className:"w-full px-2 ",children:y||""!=b?(0,s.jsx)(k,{errorText:b}):f?(0,s.jsxs)("div",{className:"mx-auto",style:{maxWidth:"1250px"},children:[(0,s.jsxs)("div",{className:"flex items-center justify-center pt-5 pb-2",children:[function(){if(""!=f.thumbnail)return(0,s.jsx)("span",{className:"mr-2",children:(0,s.jsx)(c.Z,{src:f.thumbnail})})}(),(0,s.jsx)("span",{className:"text-3xl",children:f.title})]}),(0,s.jsxs)("p",{className:"text-secondary text-center",children:[(0,s.jsxs)("span",{className:"text-xl",children:["ISBN : ",f.isbn]}),(0,s.jsx)("button",{className:"text-sm bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded ml-2",onClick:function(){E.Z.writeText(f.isbn)},children:"コピー"})]}),(0,s.jsxs)("p",{className:"text-center",children:[function(){if(""!=f.author)return(0,s.jsxs)("span",{children:["著者: ",f.author]})}(),function(){if(""!=f.publisher){var e=""!=f.author?" / ":"";return(0,s.jsxs)("span",{children:[e,"出版社 :",f.publisher]})}}()]}),(0,s.jsx)("p",{className:"text-center mt-1 line-clamp-5",children:f.description}),(0,s.jsxs)("div",{className:"p-10",children:[(0,s.jsx)(a,{comment:W,onChange:function(e){z(e)},ref:R}),(0,s.jsxs)("div",{className:"text-center mt-6 mb-10",children:[(0,s.jsxs)("button",{className:"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded",onClick:function(){var e;T("共有URLをコピーしました。"),null==R||null===(e=R.current)||void 0===e||e.finishEditing(),E.Z.writeText((0,x.Sn)(f.isbn,f.from,W)),(0,u.bG)({key:"completedSharing",data:{type:"default",url:""}})},children:["この本を共有する",(0,s.jsx)("br",{}),(0,s.jsx)("small",{children:"URLをコピー"})]}),function(){if(""!=C)return(0,s.jsx)("p",{className:"text-center text-secondary",children:(0,s.jsx)("small",{children:C})})}(),(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"mt-3 flex justify-center items-center flex-wrap",children:[(D="",D=""!=W?(W.length>75?W.slice(0,70)+"...":W)+"\n\n"+"書籍「".concat(f.title,"」の紹介"):"書籍「".concat(f.title,"」の紹介です。"),P=(0,x.Sn)(f.isbn,f.from,W),(0,s.jsx)(I.Z,{text:D,url:P})),(0,s.jsxs)("button",{onClick:function(){var e;T("マークダウン形式でコピーしました。"),null==R||null===(e=R.current)||void 0===e||e.finishEditing(),E.Z.writeText((0,M.GE)({bookData:f,comment:W,isWriteSiteName:!0})),(0,u.bG)({key:"completedSharing",data:{type:"default",url:""}})},className:"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center m-2",children:[(0,s.jsx)(l.G,{icon:r.kZ_,className:"mr-1"}),(0,s.jsx)("span",{children:"マークダウン形式で共有"})]})]}),(0,s.jsxs)("small",{className:"text-secondary",children:[(0,s.jsx)("b",{children:"note"}),"や",(0,s.jsx)("b",{children:"Notion"}),"などのサイトには「マークダウン形式で共有」がおすすめです!"]})]}),(0,s.jsx)("a",{href:(0,x.k5)([new URL((0,x.Sn)(f.isbn,f.from,W)),],"amazon",""),className:"underline text-blue-500 mt-2",children:"他の書籍とまとめて共有する"})]}),(0,s.jsx)("hr",{}),(0,s.jsxs)("div",{className:"pt-2",children:[(0,s.jsxs)("h1",{className:"text-xl",children:[(0,s.jsx)(l.G,{icon:r.Y$T,className:"mr-2"}),"書店を探す"]}),(0,s.jsx)("small",{children:"紙の書籍と電子書籍両方のリンクが含まれます。選択にご注意ください。"}),(0,s.jsx)(G,{isbn:f.isbn})]})]})]}):(0,s.jsx)("div",{children:(0,s.jsx)(Z.Z,{})})})}),(0,s.jsxs)("footer",{children:[(0,s.jsx)("hr",{}),(0,s.jsx)("p",{className:"text-center",children:(0,s.jsx)("a",{className:"underline",href:"https://hello.sn-10.net",children:"sn-10.net"})})]})]})}}},function(e){e.O(0,[976,948,119,136,422,675,774,888,179],function(){return e(e.s=910)}),_N_E=e.O()}]);