# ngx-scanner-qrcode

This library is built to provide a solution scanner QR code.\
This library takes in raw images and will locate, extract and parse any QR code found within.\
This demo [stackblitz](https://stackblitz.com/edit/angular-ngx-scanner-qrcode?file=src/app/app.component.html).

![Logo](https://raw.githubusercontent.com/id1945/ngx-scanner-qrcode/master/ngx-scanner-qrcode.png)

## Installation
Install `ngx-scanner-qrcode` from `npm`:
```bash
npm install ngx-scanner-qrcode --save
```

Add wanted package to NgModule imports:
```typescript
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
@NgModule({
    imports: [
        NgxScannerQrcodeModule,
    ]
})
```

In the Component:

```html
<ngx-scanner-qrcode #action="scanner" (data)="output = $event"></ngx-scanner-qrcode>
<span>{{output}}</span>
<button (click)="action.toggleCamera()" [disabled]="action.isLoading">{{action.isStart ? 'Stop' : 'Start'}}</button>
```

### API Documentation

#### Input

| Field | Description | Type | Default |
| --- | --- | --- | --- |
| line | line frame qrcode | number | 4 |
| color | color of line | string | `#008000` |

#### Ouput

| Field | Description | Type | Default |
| --- | --- | --- | --- |
| data | data of qrcode | string | - |
| error | error | any | - |

#### Component export

| Field | Description | Type | Default |
| --- | --- | --- | --- |
| toggleCamera | Active/Inactive camera | function | - |
| start | Active camera | function | - |
| stop | Inactive camera | function | - |
| isLoading | Check start fn | boolean | false |
| isStart | Start Video | boolean | false |

#### Support versions
    1.1.0 >= Angular 9
    1.0.17 >= Angular 8

Author: `DaiDH`, Tel: `0845882882`

#### License

[MIT License](https://github.com/id1945/ngx-scanner-qrcode/blob/master/LICENSE). Copyright (c) 2021 DaiDH