# ngx-scanner-qrcode

This library is built to provide a solution scanner QR code.\
This library takes in raw images and will locate, extract and parse any QR code found within.\
This demo [Github](https://id1945.github.io/ngx-scanner-qrcode), [Stackblitz](https://stackblitz.com/edit/angular-ngx-scanner-qrcode).

![Logo](https://raw.githubusercontent.com/id1945/ngx-scanner-qrcode/master/ngx-scanner-qrcode.png)

<table>
  <tr>
    <th colspan="4">Supported Barcode Types</th>
  </tr>
  <tr>
    <td>QR Code</td>
    <td>Code-39</td>
    <td>Code-93</td>
    <td>Code-128</td>
  </tr>
  <tr>
    <td>Codabar</td>
    <td>Databar/Expanded</td>
    <td>EAN/GTIN-5/8/13</td>
    <td>ISBN-10/13</td>
  </tr>
  <tr>
    <td>ISBN-13+2</td>
    <td>ISBN-13+5</td>
    <td>ITF (Interleaved 2 of 5)</td>
    <td>UPC-A/E.</td>
  </tr>
</table>

## Installation

Install `ngx-scanner-qrcode` from `npm`:

```bash
npm install ngx-scanner-qrcode@<version> --save
```

Add wanted package to NgModule imports:
```typescript
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

// Necessary to solve the problem of losing internet connection
LOAD_WASM().subscribe();

@NgModule({
    imports: [
        NgxScannerQrcodeModule
    ]
})
```

angular.json

```json
{
  "architect": {
    "build": {
      "options": {
        "assets": [
          /* Necessary to solve the problem of losing internet connection */
          {
            "glob": "**/*",
            "input": "node_modules/ngx-scanner-qrcode/wasm/", 
            "output": "./assets/wasm/"
          }
        ]
      }
    }
  }
}
```

In the Component:

```html
<!-- For camera -->
<ngx-scanner-qrcode #action="scanner"></ngx-scanner-qrcode>

<!-- data  -->
<span>{{ action.data.value | json }}</span><!-- value -->
<span>{{ action.data | async | json }}</span><!-- async -->

<!-- Loading -->
<p *ngIf="action.isLoading">⌛ Loading...</p>

<!-- start -->
<button (click)="action.isStart ? action.stop() : action.start()">{{action.isStart ? 'Stop' : 'Start'}}</button>
```

<details><summary><b>Image src</b></summary>

```html
<!-- For image src -->
<ngx-scanner-qrcode #action="scanner" [src]="'https://domain.com/test.png'"></ngx-scanner-qrcode>

<span>{{ action.data.value | json }}</span><!-- value -->
<span>{{ action.data | async | json }}</span><!-- async -->
```

</details>

<details><summary><b>Select files</b></summary>

```html
<!-- For select files -->
<input #file type="file" (change)="onSelects(file.files)" [multiple]="'multiple'" [accept]="'.jpg, .png, .gif, .jpeg'"/>

<div *ngFor="let item of qrCodeResult">
  <ngx-scanner-qrcode #actionFile="scanner" [src]="item.url" [config]="config"></ngx-scanner-qrcode>
  <p>{{ actionFile.data.value | json }}</p><!-- value -->
  <p>{{ actionFile.data | async | json }}</p><!-- async -->
</div>
```

```typescript
import { Component } from '@angular/core';
import { NgxScannerQrcodeService, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];

  public config: ScannerQRCodeConfig = {
    constraints: { 
      video: {
        width: window.innerWidth
      }
    } 
  };

  constructor(private qrcode: NgxScannerQrcodeService) { }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }
}
```

</details>

<details><summary><b>Select files to Scan</b></summary>

```html
<!-- For select files -->
<input #file type="file" (change)="onSelects(file.files)" [multiple]="'multiple'" [accept]="'.jpg, .png, .gif, .jpeg'"/>

<div *ngFor="let item of qrCodeResult">
  <img [src]="item.url | safe: 'url'" [alt]="item.name" style="max-width: 100%"><!-- Need bypassSecurityTrustUrl -->
  <p>{{ item.data | json }}</p>
</div>
```

```typescript
import { Component } from '@angular/core';
import { NgxScannerQrcodeService, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];

  public config: ScannerQRCodeConfig = {
    constraints: { 
      video: {
        width: window.innerWidth
      }
    } 
  };

  constructor(private qrcode: NgxScannerQrcodeService) { }

  public onSelects(files: any) {
    this.qrcode.loadFilesToScan(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }
}
```

</details>

### API Documentation

#### Input

|   Field         |   Description                 |     Type                    |     Default                                                                                                                                 |
|   ---           |       ---                     |     ---                     |       ---                                                                                                                                   |
| [src]           | image url                     | string                      | -                                                                                                                                           |
| [fps]           | fps/ms                        | number                      | 30                                                                                                                                          |
| [vibrate]       | vibrate for mobile            | number                      | 300                                                                                                                                         |
| [decode]        | decode value                  | string                      | utf-8                                                                                                                                       |
| [isBeep]        | beep                          | boolean                     | true                                                                                                                                        |
| [constraints]   | setting video                 | MediaStreamConstraints      | ``` {audio:false,video:true} ```                                                                                                            |
| [canvasStyles]  | setting canvas                | CanvasRenderingContext2D[]  | ``` [{ lineWidth: 1, strokeStyle: 'green', fillStyle: '#55f02880' },{ font: '15px serif', strokeStyle: '#fff0', fillStyle: '#ff0000' }] ``` |
| [config]        | config                        | ScannerQRCodeConfig         | ``` {src:..,fps..,vibrate..,decode:..,isBeep:..,config:..,constraints:..,canvasStyles:..} ```                                               |

#### Ouput

| Field     | Description   | Type                                      | Default |
| ---       | ---           | ---                                       | ---     |
| (event)   | data response | BehaviorSubject<ScannerQRCodeResult[]>    | []      |

#### Component exports

| Field             | Description               | Type                                        | Default   |
| ---               | ---                       | ---                                         | ---       |
| isStart           | status                    | boolean                                     | false     | 
| isLoading         | status                    | boolean                                     | false     | 
| isTorch           | torch                     | boolean                                     | false     | 
| isPause           | status                    | boolean                                     | -         | 
| isReady           | status wasm               | AsyncSubject<boolean>                       | -         | 
| data              | data response             | BehaviorSubject<ScannerQRCodeResult[]>      | []        |
| devices           | data devices              | BehaviorSubject<ScannerQRCodeDevice[]>      | []        |
| deviceIndexActive | device index              | number                                      | 0         |
| ---               | ---                       | ---                                         | ---       |
| (start)           | start camera              | AsyncSubject                                | -         |
| (stop)            | stop camera               | AsyncSubject                                | -         |
| (play)            | play video                | AsyncSubject                                | -         |
| (pause)           | pause video               | AsyncSubject                                | -         |
| (torcher)         | toggle on/off flashlight  | AsyncSubject                                | -         |
| (applyConstraints)| set media constraints     | AsyncSubject                                | -         |
| (getConstraints)  | get media constraints     | AsyncSubject                                | -         |
| (playDevice)      | play deviceId             | AsyncSubject                                | -         |
| (loadImage)       | load image from src       | AsyncSubject                                | -         |
| (download)        | download image            | AsyncSubject<ScannerQRCodeSelectedFiles[]>  | -         |

#### Service

| Field             | Description         | Type                                        | Default |
| ---               | ---                 | ---                                         | ---     |
| (loadFiles)       | Convert files       | AsyncSubject<ScannerQRCodeSelectedFiles[]>  | []      |
| (loadFilesToScan) | Scanner files       | AsyncSubject<ScannerQRCodeSelectedFiles[]>  | []      |

#### Models

<details><summary><b>ScannerQRCodeConfig</b></summary>

```typescript
interface ScannerQRCodeConfig {
  src?: string;
  fps?: number;
  vibrate?: number; /** support mobile */
  decode?: string;
  isBeep?: boolean;
  constraints?: MediaStreamConstraints;
  canvasStyles?: CanvasRenderingContext2D[];
}
```
</details>

<details><summary><b>ScannerQRCodeDevice</b></summary>

```typescript
interface ScannerQRCodeDevice {
  kind: string;
  label: string;
  groupId: string;
  deviceId: string;
}
```
</details>

<details><summary><b>ScannerQRCodeResult</b></summary>

```typescript
class ScannerQRCodeResult {
  type: ScannerQRCodeSymbolType;
  typeName: string;
  data: Int8Array;
  points: Array<ScannerQRCodePoint>;
  orientation: ScannerQRCodeOrientation;
  time: number;
  cacheCount: number;
  quality: number;
  value: string;
}
```

```typescript

enum ScannerQRCodeSymbolType {
  ScannerQRCode_NONE = 0,   /**< no symbol decoded */
  ScannerQRCode_PARTIAL = 1,   /**< intermediate status */
  ScannerQRCode_EAN2 = 2,   /**< GS1 2-digit add-on */
  ScannerQRCode_EAN5 = 5,   /**< GS1 5-digit add-on */
  ScannerQRCode_EAN8 = 8,   /**< EAN-8 */
  ScannerQRCode_UPCE = 9,   /**< UPC-E */
  ScannerQRCode_ISBN10 = 10,  /**< ISBN-10 (from EAN-13). @since 0.4 */
  ScannerQRCode_UPCA = 12,  /**< UPC-A */
  ScannerQRCode_EAN13 = 13,  /**< EAN-13 */
  ScannerQRCode_ISBN13 = 14,  /**< ISBN-13 (from EAN-13). @since 0.4 */
  ScannerQRCode_COMPOSITE = 15,  /**< EAN/UPC composite */
  ScannerQRCode_I25 = 25,  /**< Interleaved 2 of 5. @since 0.4 */
  ScannerQRCode_DATABAR = 34,  /**< GS1 DataBar (RSS). @since 0.11 */
  ScannerQRCode_DATABAR_EXP = 35,  /**< GS1 DataBar Expanded. @since 0.11 */
  ScannerQRCode_CODABAR = 38,  /**< Codabar. @since 0.11 */
  ScannerQRCode_CODE39 = 39,  /**< Code 39. @since 0.4 */
  ScannerQRCode_PDF417 = 57,  /**< PDF417. @since 0.6 */
  ScannerQRCode_QRCODE = 64,  /**< QR Code. @since 0.10 */
  ScannerQRCode_SQCODE = 80,  /**< SQ Code. @since 0.20.1 */
  ScannerQRCode_CODE93 = 93,  /**< Code 93. @since 0.11 */
  ScannerQRCode_CODE128 = 128, /**< Code 128 */

  /*
   * Please see _ScannerQRCode_get_symbol_hash() if adding
   * anything after 128
   */

  /** mask for base symbol type.
   * @deprecated in 0.11, remove this from existing code
   */
  ScannerQRCode_SYMBOL = 0x00ff,
  /** 2-digit add-on flag.
   * @deprecated in 0.11, a ::ScannerQRCode_EAN2 component is used for
   * 2-digit GS1 add-ons
   */
  ScannerQRCode_ADDON2 = 0x0200,
  /** 5-digit add-on flag.
   * @deprecated in 0.11, a ::ScannerQRCode_EAN5 component is used for
   * 5-digit GS1 add-ons
   */
  ScannerQRCode_ADDON5 = 0x0500,
  /** add-on flag mask.
   * @deprecated in 0.11, GS1 add-ons are represented using composite
   * symbols of type ::ScannerQRCode_COMPOSITE; add-on components use ::ScannerQRCode_EAN2
   * or ::ScannerQRCode_EAN5
   */
  ScannerQRCode_ADDON = 0x0700,
}

interface ScannerQRCodePoint {
  x: number;
  y: number;
}

enum ScannerQRCodeOrientation {
  ScannerQRCode_ORIENT_UNKNOWN = -1,  /**< unable to determine orientation */
  ScannerQRCode_ORIENT_UP,            /**< upright, read left to right */
  ScannerQRCode_ORIENT_RIGHT,         /**< sideways, read top to bottom */
  ScannerQRCode_ORIENT_DOWN,          /**< upside-down, read right to left */
  ScannerQRCode_ORIENT_LEFT,          /**< sideways, read bottom to top */
}
```
</details>

<details><summary><b>ScannerQRCodeSelectedFiles</b></summary>

```typescript
interface ScannerQRCodeSelectedFiles {
  url: string;
  name: string;
  file: File;
  data?: ScannerQRCodeResult[];
  canvas?: HTMLCanvasElement;
}
```
</details>


#### Support versions

<table>
  <tr>
    <th colspan="2">Support versions</th>
  </tr>
  <tr>
    <td>Angular 16+</td>
    <td>1.6.8</td>
  </tr>
  <tr>
    <td>Angular 6+</td>
    <td>1.6.6</td>
  </tr>
</table>

#### Author Information
  
<table>
  <tr>
    <th colspan="2">Author Information</th>
  </tr>
  <tr>
    <td>Author</td>
    <td>DaiDH</td>
  </tr>
  <tr>
    <td>Phone</td>
    <td>+84845882882</td>
  </tr>
  <tr>
    <td>Country</td>
    <td>Vietnam</td>
  </tr>
</table>

#### To make this library more complete, please donate to me if you can!

<table>
  <tr>
    <th>Bitcoin</th>
    <th>Paypal</th>
    <th>MbBank</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/id1945/id1945/master/donate-bitcoin.png" width="182px"></td>
    <td><img src="https://raw.githubusercontent.com/id1945/id1945/master/donate-paypal.png" width="182px"></td>
    <td><img src="https://raw.githubusercontent.com/id1945/id1945/master/donate-mbbank.png" width="182px"></td>
  </tr>
</table>

![Vietnam](https://raw.githubusercontent.com/id1945/id1945/master/vietnam.gif)

[LGPL-2.1+ License](https://github.com/id1945/ngx-scanner-qrcode/blob/master/LICENSE). Copyright (C) 1991, 1999 Free Software Foundation, Inc.
