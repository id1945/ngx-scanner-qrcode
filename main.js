(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1> ngx-scanner-qrcode </h1>\n\n  <!-- devices -->\n  <div class=\"row\">\n    <div class=\"col-xs-12 col-md-6 col-lg-4 col-xl-3 my-1\">\n      <select #select1 (change)=\"action.playDevice(select1.value)\" class=\"form-select form-select-sm\">\n        <option [value]=\"null\" selected>Select device</option>\n        <option *ngFor=\"let c of action.devices.value; let i = index\" [value]=\"c.deviceId\" [selected]=\"i == action.deviceIndexActive\">{{c.label}}</option>\n      </select>\n    </div>\n\n    <div class=\"col-xs-12 col-md-6 col-lg-4 col-xl-3 my-1\">\n      <select #select2 (change)=\"action.decode = select2.value\" class=\"form-select form-select-sm\">\n        <option value=\"utf-8\" [selected]=\"action.decode == 'utf-8'\">UTF-8</option>\n        <option value=\"iso-8859-15\" [selected]=\"action.decode == 'iso-8859-15'\">ISO-8859-15</option>\n        <option value=\"windows-1252\" [selected]=\"action.decode == 'windows-1252'\">Windows-1252</option>\n        <option value=\"macintosh\" [selected]=\"action.decode == 'macintosh'\">Macintosh</option>\n      </select>\n    </div>\n  </div>\n  \n  <!-- ngx-scanner-qrcode -->\n  <ngx-scanner-qrcode #action=\"scanner\" [config]=\"config\" (event)=\"onEvent($event, action)\"></ngx-scanner-qrcode>\n\n  <!-- data  -->\n  <!-- <p class=\"data\">{{ action.data | async }}</p> -->\n\n  <!-- loading -->\n  <p *ngIf=\"action.isLoading\">⌛ Loading...</p>\n\n  <!-- start/stop -->\n  <button class=\"btn\" [class.btn-info]=\"!action.isStart\" [class.btn-warning]=\"action.isStart\" [disabled]=\"action.isLoading\">\n    <img *ngIf=\"!action.isStart\" (click)=\"handle(action, 'start')\" src=\"assets/images/camera-on.svg\" width=\"30px\"/>\n    <img *ngIf=\"action.isStart\" (click)=\"handle(action, 'stop')\" src=\"assets/images/camera-off.svg\" width=\"30px\"/>\n  </button>\n  \n  <!-- play/pause -->\n  <button class=\"btn\" [class.btn-info]=\"!action.isStart\" [class.btn-warning]=\"action.isStart\" [disabled]=\"!action.isStart\" (click)=\"handle(action, action.isPause ? 'play' : 'pause')\">\n    <img [src]=\"action.isPause ? 'assets/images/play.svg ': 'assets/images/pause.svg'\" width=\"30px\"/>\n  </button>\n\n  <!-- isTorch -->\n  <button class=\"btn\" [class.btn-info]=\"!action.isStart\" [class.btn-warning]=\"action.isStart\" [disabled]=\"!action.isStart\" (click)=\"action.isTorch = !action.isTorch; handle(action, 'torcher')\">\n    <img [src]=\"action.isTorch ? 'assets/images/flash-off.svg' : 'assets/images/flash-on.svg'\" width=\"30px\"/>\n  </button>\n\n  <!-- download -->\n  <button class=\"btn\" [class.btn-info]=\"!action.isStart\" [class.btn-warning]=\"action.isStart\" [disabled]=\"!action.isStart\" (click)=\"handle(action, 'download')\">\n    <img src=\"https://id1945.github.io/images/svg/capture.svg\" width=\"30px\"/>\n  </button>\n  <br>\n\n  <!-- For select files -->\n  <input #file type=\"file\" (change)=\"onSelects(file.files)\" [multiple]=\"'multiple'\" [accept]=\"'.jpg, .png, .gif, .jpeg'\" class=\"btn btn-success my-2\"/>\n  <br>\n  <input #file2 type=\"file\" (change)=\"onSelects2(file2.files)\" [multiple]=\"'multiple'\" [accept]=\"'.jpg, .png, .gif, .jpeg'\" class=\"btn btn-success my-2\"/>\n  <br>\n\n  <div class=\"d-flex justify-content-center\">\n    <div class=\"col-xs-12 col-md-6 col-lg-4 col-xl-3 m-1\">\n      <select #select3 (change)=\"percentage = select3.value\" class=\"form-select form-select-sm\">\n        <option *ngFor=\"let item of [10,20,30,40,50,60,70,80,90,100]\" [value]=\"item\" [selected]=\"item == percentage\">Scale {{item}}%</option>\n      </select>\n    </div>\n    <div class=\"col-xs-12 col-md-6 col-lg-4 col-xl-3 m-1\">\n      <select #select4 (change)=\"quality = select4.value\" class=\"form-select form-select-sm\">\n        <option *ngFor=\"let item of [10,20,30,40,50,60,70,80,90,100]\" [value]=\"item\" [selected]=\"item == quality\">Quality {{item}}%</option>\n      </select>\n    </div>\n  </div>\n\n  <div *ngFor=\"let item of qrCodeResult\">\n    <ngx-scanner-qrcode #actionFile=\"scanner\" [src]=\"item.url\" [config]=\"config\" (event)=\"onEvent($event)\"></ngx-scanner-qrcode>\n    <!-- <p class=\"data\">{{ actionFile.data | async }}</p> -->\n  </div>\n \n  <div *ngFor=\"let item of qrCodeResult2\">\n    <img [src]=\"item.url | safe: 'url'\" alt=\"\" style=\"max-width: 100%\">\n    <!-- <p class=\"data\">{{ item | json }}</p> -->\n  </div>\n\n  <ngx-scanner-qrcode\n    #actionFile=\"scanner\"\n    (event)=\"onEvent($event)\"\n    [src]=\"'https://raw.githubusercontent.com/id1945/ngx-scanner-qrcode/master/supported-barcode-types.png'\"\n    [config]=\"config\"> \n  </ngx-scanner-qrcode>\n  <!-- <p class=\"data\">{{ actionFile.data | async }}</p> -->\n\n  <!-- License -->\n  <p class=\"center\"><a href=\"https://github.com/id1945/ngx-scanner-qrcode/blob/master/LICENSE\">LGPL-2.1+ License</a></p>\n\n  <!-- Copyright -->\n  <p class=\"center\">Author: DaiDH</p>\n  <p class=\"center\">Copyright (C) 1991, 1999 Free Software Foundation, Inc.</p>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1,\nh5,\np {\n  font-weight: 600;\n  word-break: break-all;\n  font-family: 'Courier New', Courier, monospace; }\n\ndiv {\n  text-align: center;\n  background: #fdfdfd; }\n\ndiv button {\n    border-radius: 50%;\n    height: 60px;\n    width: 60px;\n    margin: 4px; }\n\ndiv buttondisabled {\n      cursor: no-drop; }\n\ndiv .data {\n    background: antiquewhite;\n    border-radius: 5px; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_scanner_qrcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-scanner-qrcode */ "./node_modules/ngx-scanner-qrcode/fesm5/ngx-scanner-qrcode.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(qrcode) {
        this.qrcode = qrcode;
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#front_and_back_camera
        this.config = {
            constraints: {
                video: {
                    width: window.innerWidth
                },
            },
        };
        this.qrCodeResult = [];
        this.qrCodeResult2 = [];
        this.percentage = 80;
        this.quality = 100;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        //this.action.isReady.pipe(delay(1000)).subscribe(res => {
        this.action.isReady.subscribe(function (res) {
            //this.handle(this.action, 'start');
        });
    };
    AppComponent.prototype.onEvent = function (e, action) {
        // e && action && action.pause();
        console.log(e);
    };
    AppComponent.prototype.handle = function (action, fn) {
        // Fix issue #27, #29
        var playDeviceFacingBack = function (devices) {
            // front camera or back camera check here!
            var device = devices.find(function (f) { return (/back|rear|environment/gi.test(f.label)); }); // Default Back Facing Camera
            action.playDevice(device ? device.deviceId : devices[0].deviceId);
        };
        if (fn === 'start') {
            action[fn](playDeviceFacingBack).subscribe(function (r) { return console.log(fn, r); }, alert);
        }
        else {
            action[fn]().subscribe(function (r) { return console.log(fn, r); }, alert);
        }
    };
    AppComponent.prototype.onSelects = function (files) {
        var _this = this;
        this.qrcode.loadFiles(files, this.percentage, this.quality).subscribe(function (res) {
            _this.qrCodeResult = res;
        });
    };
    AppComponent.prototype.onSelects2 = function (files) {
        var _this = this;
        this.qrcode.loadFilesToScan(files, this.config, this.percentage, this.quality).subscribe(function (res) {
            console.log(res);
            _this.qrCodeResult2 = res;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('action'),
        __metadata("design:type", ngx_scanner_qrcode__WEBPACK_IMPORTED_MODULE_1__["NgxScannerQrcodeComponent"])
    ], AppComponent.prototype, "action", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [ngx_scanner_qrcode__WEBPACK_IMPORTED_MODULE_1__["NgxScannerQrcodeService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _safe_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./safe.pipe */ "./src/app/safe.pipe.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_scanner_qrcode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-scanner-qrcode */ "./node_modules/ngx-scanner-qrcode/fesm5/ngx-scanner-qrcode.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






Object(ngx_scanner_qrcode__WEBPACK_IMPORTED_MODULE_5__["LOAD_WASM"])().subscribe(function (res) { return console.log('LOAD_WASM', res); });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _safe_pipe__WEBPACK_IMPORTED_MODULE_3__["SafePipe"],
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                ngx_scanner_qrcode__WEBPACK_IMPORTED_MODULE_5__["NgxScannerQrcodeModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/safe.pipe.ts":
/*!******************************!*\
  !*** ./src/app/safe.pipe.ts ***!
  \******************************/
/*! exports provided: SafePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return SafePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Angular


/**
 * Sanitize HTML
 * Author: DaiDH
 */
var SafePipe = /** @class */ (function () {
    /**
     * Pipe Constructor
     *
     * @param _sanitizer: DomSanitezer
     */
    // tslint:disable-next-line
    function SafePipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * Transform
     *
     * @param value: string
     * @param type: string
     */
    SafePipe.prototype.transform = function (value, type) {
        switch (type) {
            case 'html':
                return this._sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this._sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this._sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this._sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                return this._sanitizer.bypassSecurityTrustHtml(value);
        }
    };
    SafePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'safe',
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], SafePipe);
    return SafePipe;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/ngx-scanner-qrcode/ngx-scanner-qrcode/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map