(function(t){function e(e){for(var o,a,s=e[0],l=e[1],c=e[2],u=0,f=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&f.push(r[a][0]),r[a]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(o=!1)}o&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},r={app:0},i=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("md-app",[n("md-app-toolbar",[n("span",{staticClass:"md-title hacked"},[t._v("DA_DRONE")])]),n("md-app-content",[n("drone-output",{attrs:{drone:t.drone}}),n("action-buttons",{attrs:{drone:t.drone}})],1)],1)],1)},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"md-layout md-alignment-top-center"},[n("div",{staticClass:"md-layout-item",staticStyle:{"text-align":"center"}},[n("div",{staticClass:"droneStreamParent"},[n("div",{attrs:{id:"droneStream"}}),n("p",{staticClass:"md-subheading pixelop",staticStyle:{"text-align":"left"},attrs:{id:"status-text"}},[t._v(" >> Drone: "),n("span",[t.drone.isOnline?t._e():n("span",{staticStyle:{color:"red"}},[t._v("Offline")]),t.drone.isOnline?n("span",{staticStyle:{color:"lime"}},[t._v("Online")]):t._e()]),t.drone.isOnline?n("span",{staticStyle:{float:"right"}},[t._v("Battery: "),n("span",{staticStyle:{color:"lime"}},[t._v(t._s(t.drone.battery)+"%")])]):t._e()])])])])},s=[],l=n("bc3a"),c=n.n(l),d={name:"DroneOutput",components:{},props:["drone"],data:function(){return{control:{forward:0,backward:0,left:0,right:0,up:0,down:0,rotL:0,rotR:0},lastControl:{forward:0,backward:0,left:0,right:0,up:0,down:0,rotL:0,rotR:0},controlSettings:{keyboardSpeed:.5}}},methods:{_setupKeyboardControls:function(){var t=this;document.addEventListener("keydown",(function(e){var n=e.key,o=t.controlSettings.keyboardSpeed;t._setControls(n,o)})),document.addEventListener("keyup",(function(e){var n=e.key;t._setControls(n,0)}))},_setControls:function(t,e){"w"===t.toLowerCase()||"ArrowUp"===t?this.control.forward=e:"a"===t.toLowerCase()||"ArrowLeft"===t?this.control.left=e:"d"===t.toLowerCase()||"ArrowRight"===t?this.control.right=e:"s"===t.toLowerCase()||"ArrowDown"===t?this.control.backward=e:"q"===t.toLowerCase()?this.control.rotL=e:"e"===t.toLowerCase()?this.control.rotR=e:"Shift"===t?this.control.up=e:"Control"===t&&(this.control.down=e),JSON.stringify(this.control)!==JSON.stringify(this.lastControl)&&(this.sendControlsToBackend(this.control),Object.assign(this.lastControl,this.control))},sendControlsToBackend:function(t){c.a.put("/drone/move",t).then((function(){console.log("Successful movement")})).catch((function(t){console.error(t)}))}},mounted:function(){this._setupKeyboardControls(),new NodecopterStream(document.getElementById("droneStream"))}},u=d,f=(n("e2a9"),n("2877")),m=Object(f["a"])(u,a,s,!1,null,null,null),p=m.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"action-buttons md-layout md-alignment-top-center"},[t.drone.isInTheAir?t._e():n("div",{staticClass:"button-container md-layout-item md-medium-size-25 md-small-size-33"},[n("md-button",{staticClass:"md-raised md-primary",attrs:{disabled:!t.drone.isOnline},on:{click:t.takeoff}},[t._v("Takeoff")])],1),t.drone.isInTheAir?n("div",{staticClass:"button-container md-layout-item md-medium-size-25 md-small-size-33"},[n("md-button",{staticClass:"md-raised",attrs:{disabled:!t.drone.isOnline},on:{click:t.land}},[t._v("Land")])],1):t._e(),n("div",{staticClass:"button-container md-layout-item md-medium-size-25 md-small-size-33"},[n("md-button",{staticClass:"md-raised",attrs:{disabled:!t.drone.isOnline||!(t.drone.isInTheAir&&t.drone.isMoving)},on:{click:t.stop}},[t._v("Stop")])],1),n("div",{staticClass:"button-container md-layout-item md-medium-size-25 md-small-size-33"},[n("md-button",{staticClass:"md-raised md-accent",attrs:{disabled:!t.drone.isOnline},on:{click:t.askKill}},[t._v("Kill")])],1)]),n("div",[n("md-dialog",{attrs:{"md-active":t.askKillDialogActive},on:{"update:mdActive":function(e){t.askKillDialogActive=e},"update:md-active":function(e){t.askKillDialogActive=e}}},[n("md-dialog-title",[t._v("Confirm kill")]),n("md-dialog-content",[t._v(" Do you really want to kill the drone? If it is in the air it will fall out of the sky. ")]),n("md-dialog-actions",[n("md-button",{staticClass:"md-default",on:{click:function(e){t.askKillDialogActive=!1}}},[t._v(" Cancel ")]),n("md-button",{staticClass:"md-accent",on:{click:t.onKillConfirm}},[t._v(" KILL ")])],1)],1)],1)])},h=[],g={name:"ActionButtons",components:{},props:["drone"],methods:{takeoff:function(){var t=this;c.a.get("/drone/takeoff").then((function(e){console.log(e),t.drone.isInTheAir=!0})).catch((function(t){console.error(t)}))},land:function(){var t=this;c.a.get("/drone/land").then((function(e){console.log(e),t.drone.isInTheAir=!1})).catch((function(t){console.error(t)}))},stop:function(){var t=this;c.a.get("/drone/stop").then((function(e){console.log(e),t.drone.isMoving=!1})).catch((function(t){console.error(t)}))},askKill:function(){this.askKillDialogActive=!0},onKillConfirm:function(){var t=this;this.askKillDialogActive=!1,c.a.get("/drone/kill").then((function(e){console.log(e),t.drone.isInTheAir=!1,t.drone.isMoving=!1})).catch((function(t){console.error(t)}))}},data:function(){return{askKillDialogActive:!1}}},b=g,y=(n("be13"),Object(f["a"])(b,v,h,!1,null,null,null)),k=y.exports,w={name:"App",components:{DroneOutput:p,ActionButtons:k},data:function(){return{drone:{isOnline:!0,battery:0,isInTheAir:!1,isMoving:!1},batteryIntervall:null}},methods:{getBattery:function(){var t=this;c.a.get("/drone/battery").then((function(e){t.drone.battery=e.data})).catch((function(){}))}},mounted:function(){var t=this;this.getBattery(),this.batteryIntervall=setInterval((function(){t.getBattery()}),1e4)}},C=w,_=(n("5c0b"),Object(f["a"])(C,r,i,!1,null,null,null)),O=_.exports,A=n("9483");Object(A["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});n("51de"),n("0759");var S=n("9c30");o["default"].use(S["MdApp"]),o["default"].use(S["MdToolbar"]),o["default"].use(S["MdContent"]),o["default"].use(S["MdButton"]),o["default"].use(S["MdDialog"]),o["default"].config.productionTip=!1,new o["default"]({render:function(t){return t(O)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var o=n("9c0c"),r=n.n(o);r.a},"9c0c":function(t,e,n){},b45d:function(t,e,n){},be13:function(t,e,n){"use strict";var o=n("b45d"),r=n.n(o);r.a},c27f:function(t,e,n){},e2a9:function(t,e,n){"use strict";var o=n("c27f"),r=n.n(o);r.a}});
//# sourceMappingURL=app.b46e8d02.js.map