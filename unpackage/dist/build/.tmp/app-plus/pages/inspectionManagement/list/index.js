(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/inspectionManagement/list/index"],{"524c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2f62");function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={data:function(){return{checkno:"",supplier:"",curPage:1,pageSize:10,total:0,listData:[{orderNo:"SH1907200001",date:"",supplier:"",status:"为收料"},{orderNo:"SH1907200001",date:"",supplier:"",status:""}]}},computed:a({},(0,i.mapState)({urlPre:function(t){return t.urlPre}})),onLoad:function(){},onShow:function(){this.getList()},methods:{GoDetail:function(e){t.navigateTo({url:"/pages/inspectionManagement/detail/index?Info="+JSON.stringify(e)})},getList:function(){var e=this,n="/serCheckmalist?number="+this.pageSize+"&page_num="+this.curPage;t.showLoading({title:"加载中"}),this.checkno&&(n=n+"&checkno="+this.checkno),this.supplier&&(n=n+"&providername="+this.supplier),t.request({url:this.urlPre+n,data:{},success:function(n){switch(n.data.code){case 1:e.listData=n.data.checkmalist.map(function(t){return t.dateTxt=e.formatToString(t.sheetdate.time,"Simple","-"),t}),e.total=n.data.receiveCount,t.hideLoading();break;default:t.hideLoading(),t.showToast({image:"/static/images/attention.png",title:"服务器繁忙!"})}},fail:function(n){e.listData=[],e.total=0,console.log("request fail",n," at pages\\inspectionManagement\\list\\index.vue:113"),t.hideLoading(),t.showModal({content:"接口报错!",showCancel:!1})},complete:function(){}})},formatToString:function(t,e,n){var i;i="object"===typeof t?t:new Date(t);var a=i.getFullYear(),o=i.getMonth()+1,r=i.getDate(),u=i.getHours(),c=i.getMinutes(),s=i.getSeconds();switch(e){case"Complete":return a+n+this.getzf(o)+n+this.getzf(r)+" "+this.getzf(u)+":"+this.getzf(c)+":"+this.getzf(s);case"Simple":return a+n+this.getzf(o)+n+this.getzf(r);case"NotSecond":return a+n+this.getzf(o)+n+this.getzf(r)+" "+this.getzf(u)+":"+this.getzf(c)}},getzf:function(t){return parseInt(t)<10&&(t="0"+t),t}}};e.default=r}).call(this,n("6e42")["default"])},7216:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"95f9":function(t,e,n){},a5da:function(t,e,n){"use strict";var i=n("95f9"),a=n.n(i);a.a},c64f:function(t,e,n){"use strict";n.r(e);var i=n("7216"),a=n("d510");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("a5da");var r=n("2877"),u=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=u.exports},d510:function(t,e,n){"use strict";n.r(e);var i=n("524c"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a}},[["800f","common/runtime","common/vendor"]]]);