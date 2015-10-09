/*
Copyright (c) 2015 Mike Flynn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
function Egg(){this.eggs=[],this.hooks=[],this.kps=[],this.activeEgg="",this.ignoredKeys=[16],arguments.length&&this.AddCode.apply(this,arguments)}!function(){"use strict";angular.module("searchify",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ngRoute"])}(),function(){"use strict";angular.module("searchify").service("itemSearch",["$http",function(t){this.query=function(e,n){var i=t({method:"GET",url:"https://api.spotify.com/v1/search?q="+e+"&type="+n});return i}}])}(),Egg.prototype.__execute=function(t){return"function"==typeof t&&t.call(this)},Egg.prototype.__toCharCodes=function(t){var e={up:38,down:40,left:37,right:39,enter:13,space:32,ctrl:17,alt:18,tab:9,esc:27},n=Object.keys(e);"string"==typeof t&&(t=t.split(",").map(function(t){return t.trim()}));var i=t.map(function(t){return t===parseInt(t,10)?t:n.indexOf(t)>-1?e[t]:t.charCodeAt(0)});return i.join(",")},Egg.prototype.AddCode=function(t,e,n){return this.eggs.push({keys:this.__toCharCodes(t),fn:e,metadata:n}),this},Egg.prototype.AddHook=function(t){return this.hooks.push(t),this},Egg.prototype.handleEvent=function(t){var e=t.which,n=e>=65&&90>=e;if(!("keydown"!==t.type||t.metaKey||t.ctrlKey||t.altKey||t.shiftKey)){var i=t.target.tagName;if(("HTML"===i||"BODY"===i)&&n)return void t.preventDefault()}"keyup"===t.type&&this.eggs.length>0&&(n&&(t.shiftKey||(e+=32)),-1===this.ignoredKeys.indexOf(e)&&this.kps.push(e),this.eggs.forEach(function(t,e){var n=this.kps.toString().indexOf(t.keys)>=0;n&&(this.kps=[],this.activeEgg=t,this.__execute(t.fn,this),this.hooks.forEach(this.__execute,this),this.activeEgg="")},this))},Egg.prototype.Listen=function(){return void 0!==document.addEventListener&&(document.addEventListener("keydown",this,!1),document.addEventListener("keyup",this,!1)),this},Egg.prototype.listen=Egg.prototype.Listen,Egg.prototype.addCode=Egg.prototype.AddCode,Egg.prototype.addHook=Egg.prototype.AddHook,function(){"use strict";function t(t){var e=this;e.selOptions=[{value:"album",label:"Albums"},{value:"track",label:"Tracks"}],e.searchIn={q:""},e.itemList=[],e.getItemSearch=function(){e.itemList=t.query(e.searchIn.q,e.querySelect.value).success(function(t){e.itemList=t})}}angular.module("searchify").controller("MainController",["itemSearch",t]),t.$inject=["itemSearch"]}(),function(t){"use strict";new Egg("up,up,down,down,left,right,left,right,b,a",function(){t("#konami").show(),window.setTimeout(function(){t("#konami").css("display","none")},5e3)}).listen()}(jQuery),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("searchify").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t){t.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).otherwise({redirectTo:"/"})}angular.module("searchify").config(t),t.$inject=["$routeProvider"]}(),function(){"use strict";angular.module("searchify").constant("moment",moment)}(),function(){"use strict";function t(t){t.debugEnabled(!0)}angular.module("searchify").config(t),t.$inject=["$logProvider"]}(),angular.module("searchify").run(["$templateCache",function(t){t.put("app/main/main.html",'<main><div><nav class="navbar"><a>Searchify</a></nav></div><div class="jumbotron"><div id="konami"></div><h2>So I heard you like...</h2><select ng-model="main.querySelect" ng-options="option.label for option in main.selOptions"></select><h2>Let\'s find some.</h2><form name="search" ng-submit="main.getItemSearch()"><input type="text" placeholder="Search for {{ main.querySelect.label }}..." ng-model="main.searchIn.q"><br><button class="btn" type="submit">Search Albums</button></form></div><div class="grid" ng-switch="" on="main.querySelect.value"><h2>Search for: {{ main.searchIn.q }}</h2><a href="{{ album.external_urls.spotify }}" class="result-tile" ng-repeat="album in main.itemList.albums.items" ng-switch-when="album" target="_blank"><img ng-src="{{ album.images[1].url }}" alt="{{ album.name }}"><p>{{ album.name }}</p></a> <a href="{{ track.external_urls.spotify }}" class="result-tile" ng-repeat="track in main.itemList.tracks.items" ng-switch-when="track" target="_blank"><img ng-src="{{ track.album.images[1].url }}" alt="{{ track.name }}"><p>{{ track.name }} <small>{{ track.artists[0].name }}<small></small></small></p></a> <a ng-switch-default="">{{ main.querySelect }}<h1>Please select Album or Track above.</h1></a></div></main>')}]);