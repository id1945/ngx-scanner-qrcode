interface ZBarInstance extends Record<string, WebAssembly.ExportValue | ArrayBuffer> {
    _malloc(size: number): number;
    _free(ptr: number): void;
    HEAP8: Int8Array;
    HEAP16: Int16Array;
    HEAP32: Int32Array;
    HEAPU8: Uint8Array;
    HEAPU16: Uint16Array;
    HEAPU32: Uint32Array;
    _ImageScanner_create(): number;
    _ImageScanner_destory(scanner: number): void;
    _ImageScanner_set_config(scanner: number, symbology: number, config: number, value: number): number;
    _ImageScanner_enable_cache(scanner: number, enable: boolean): void;
    _ImageScanner_recycle_image(scanner: number, image: number): void;
    _ImageScanner_scan(ImageScanner_scannner: number, image: number): number;
    _ImageScanner_get_results(scanner: number): number;
    _Image_create(width: number, height: number, format: number, data: number, dataLength: number, sequenceNum: number): number;
    _Image_destory(image: number): void;
    _Image_get_symbols(image: number): number;
}

declare const getInstance: () => Promise<ZBarInstance>;

declare enum ZBarSymbolType {
    ZBAR_NONE = 0,
    ZBAR_PARTIAL = 1,
    ZBAR_EAN2 = 2,
    ZBAR_EAN5 = 5,
    ZBAR_EAN8 = 8,
    ZBAR_UPCE = 9,
    ZBAR_ISBN10 = 10,
    ZBAR_UPCA = 12,
    ZBAR_EAN13 = 13,
    ZBAR_ISBN13 = 14,
    ZBAR_COMPOSITE = 15,
    ZBAR_I25 = 25,
    ZBAR_DATABAR = 34,
    ZBAR_DATABAR_EXP = 35,
    ZBAR_CODABAR = 38,
    ZBAR_CODE39 = 39,
    ZBAR_PDF417 = 57,
    ZBAR_QRCODE = 64,
    ZBAR_SQCODE = 80,
    ZBAR_CODE93 = 93,
    ZBAR_CODE128 = 128,
    /** mask for base symbol type.
     * @deprecated in 0.11, remove this from existing code
     */
    ZBAR_SYMBOL = 255,
    /** 2-digit add-on flag.
     * @deprecated in 0.11, a ::ZBAR_EAN2 component is used for
     * 2-digit GS1 add-ons
     */
    ZBAR_ADDON2 = 512,
    /** 5-digit add-on flag.
     * @deprecated in 0.11, a ::ZBAR_EAN5 component is used for
     * 5-digit GS1 add-ons
     */
    ZBAR_ADDON5 = 1280,
    /** add-on flag mask.
     * @deprecated in 0.11, GS1 add-ons are represented using composite
     * symbols of type ::ZBAR_COMPOSITE; add-on components use ::ZBAR_EAN2
     * or ::ZBAR_EAN5
     */
    ZBAR_ADDON = 1792
}
declare enum ZBarConfigType {
    ZBAR_CFG_ENABLE = 0,
    ZBAR_CFG_ADD_CHECK = /**< enable check digit when optional */ 1,
    ZBAR_CFG_EMIT_CHECK = /**< return check digit when present */ 2,
    ZBAR_CFG_ASCII = /**< enable full ASCII character set */ 3,
    ZBAR_CFG_BINARY = /**< don't convert binary data to text */ 4,
    ZBAR_CFG_NUM = /**< number of boolean decoder configs */ 5,
    ZBAR_CFG_MIN_LEN = 32,
    ZBAR_CFG_MAX_LEN = /**< maximum data length for valid decode */ 33,
    ZBAR_CFG_UNCERTAINTY = 64,
    ZBAR_CFG_POSITION = 128,
    ZBAR_CFG_TEST_INVERTED = /**< if fails to decode, test inverted */ 129,
    ZBAR_CFG_X_DENSITY = 256,
    ZBAR_CFG_Y_DENSITY = /**< image scanner horizontal scan density */ 257
}
declare enum ZBarOrientation {
    ZBAR_ORIENT_UNKNOWN = -1,
    ZBAR_ORIENT_UP = /**< upright, read left to right */ 0,
    ZBAR_ORIENT_RIGHT = /**< sideways, read top to bottom */ 1,
    ZBAR_ORIENT_DOWN = /**< upside-down, read right to left */ 2,
    ZBAR_ORIENT_LEFT = /**< sideways, read bottom to top */ 3
}

declare class CppObject {
    protected ptr: number;
    protected inst: ZBarInstance;
    protected constructor(ptr: number, inst: ZBarInstance);
    protected checkAlive(): void;
    getPointer(): number;
}

interface Point {
    x: number;
    y: number;
}
declare class ZBarSymbol {
    type: ZBarSymbolType;
    typeName: string;
    data: Int8Array;
    points: Array<Point>;
    orientation: ZBarOrientation;
    time: number;
    cacheCount: number;
    quality: number;
    private constructor();
    static createSymbolsFromPtr(ptr: number, buf: ArrayBuffer): Array<ZBarSymbol>;
    decode(encoding?: string): string;
}

declare class ZBarImage extends CppObject {
    static createFromGrayBuffer(width: number, height: number, dataBuf: ArrayBuffer, sequence_num?: number): Promise<ZBarImage>;
    static createFromRGBABuffer(width: number, height: number, dataBuf: ArrayBuffer, sequence_num?: number): Promise<ZBarImage>;
    destroy(): void;
    getSymbols(): Array<ZBarSymbol>;
}

declare class ZBarScanner extends CppObject {
    static create(): Promise<ZBarScanner>;
    destroy(): void;
    setConfig(sym: ZBarSymbolType, conf: ZBarConfigType, value: number): number;
    enableCache(enable?: boolean): void;
    recycleImage(image: ZBarImage): void;
    getResults(): Array<ZBarSymbol>;
    scan(image: ZBarImage): number;
}

declare const getDefaultScanner: () => Promise<ZBarScanner>;
declare const scanGrayBuffer: (buffer: ArrayBuffer, width: number, height: number, scanner?: ZBarScanner) => Promise<Array<ZBarSymbol>>;
declare const scanRGBABuffer: (buffer: ArrayBuffer, width: number, height: number, scanner?: ZBarScanner) => Promise<Array<ZBarSymbol>>;
declare const scanImageData: (image: ImageData, scanner?: ZBarScanner) => Promise<Array<ZBarSymbol>>;

export { type Point, ZBarConfigType, ZBarImage, ZBarOrientation, ZBarScanner, ZBarSymbol, ZBarSymbolType, getDefaultScanner, getInstance, scanGrayBuffer, scanImageData, scanRGBABuffer };
