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
/* Copied from https://github.com/mchehab/zbar, release 0.23.90 */
declare enum ZBarSymbolType {
    ZBAR_NONE = 0,
    /**< no symbol decoded */ ZBAR_PARTIAL = 1,
    /**< intermediate status */ ZBAR_EAN2 = 2,
    /**< GS1 2-digit add-on */ ZBAR_EAN5 = 5,
    /**< GS1 5-digit add-on */ ZBAR_EAN8 = 8,
    /**< EAN-8 */ ZBAR_UPCE = 9,
    /**< UPC-E */ ZBAR_ISBN10 = 10,
    /**< ISBN-10 (from EAN-13). @since 0.4 */ ZBAR_UPCA = 12,
    /**< UPC-A */ ZBAR_EAN13 = 13,
    /**< EAN-13 */ ZBAR_ISBN13 = 14,
    /**< ISBN-13 (from EAN-13). @since 0.4 */ ZBAR_COMPOSITE = 15,
    /**< EAN/UPC composite */ ZBAR_I25 = 25,
    /**< Interleaved 2 of 5. @since 0.4 */ ZBAR_DATABAR = 34,
    /**< GS1 DataBar (RSS). @since 0.11 */ ZBAR_DATABAR_EXP = 35,
    /**< GS1 DataBar Expanded. @since 0.11 */ ZBAR_CODABAR = 38,
    /**< Codabar. @since 0.11 */ ZBAR_CODE39 = 39,
    /**< Code 39. @since 0.4 */ ZBAR_PDF417 = 57,
    /**< PDF417. @since 0.6 */ ZBAR_QRCODE = 64,
    /**< QR Code. @since 0.10 */ ZBAR_SQCODE = 80,
    /**< SQ Code. @since 0.20.1 */ ZBAR_CODE93 = 93,
    /**< Code 93. @since 0.11 */ ZBAR_CODE128 = 128,
    /*
    * Please see _zbar_get_symbol_hash() if adding
    * anything after 128
    */
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
    /**< enable symbology/feature */ ZBAR_CFG_ADD_CHECK = 1,
    /**< enable check digit when optional */ ZBAR_CFG_EMIT_CHECK = 2,
    /**< return check digit when present */ ZBAR_CFG_ASCII = 3,
    /**< enable full ASCII character set */ ZBAR_CFG_BINARY = 4,
    /**< don't convert binary data to text */ ZBAR_CFG_NUM = 5,
    /**< number of boolean decoder configs */ ZBAR_CFG_MIN_LEN = 32,
    /**< minimum data length for valid decode */ ZBAR_CFG_MAX_LEN = 33,
    /**< maximum data length for valid decode */ ZBAR_CFG_UNCERTAINTY = 64,
    /**< required video consistency frames */ ZBAR_CFG_POSITION = 128,
    /**< enable scanner to collect position data */ ZBAR_CFG_TEST_INVERTED = 129,
    /**< if fails to decode, test inverted */ ZBAR_CFG_X_DENSITY = 256,
    /**< image scanner vertical scan density */ ZBAR_CFG_Y_DENSITY = 257
}
declare enum ZBarOrientation {
    ZBAR_ORIENT_UNKNOWN = -1,
    /**< unable to determine orientation */ ZBAR_ORIENT_UP = 0,
    /**< upright, read left to right */ ZBAR_ORIENT_RIGHT = 1,
    /**< sideways, read top to bottom */ ZBAR_ORIENT_DOWN = 2,
    /**< upside-down, read right to left */ ZBAR_ORIENT_LEFT = 3
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
// Returns a new ZBarScanner instance that delegates QR code text decoding
// to the native TextDecoder (fixes #7: Issue with utf-8)
declare const getDefaultScanner: () => Promise<ZBarScanner>;
declare const scanGrayBuffer: (buffer: ArrayBuffer, width: number, height: number, scanner?: ZBarScanner | undefined) => Promise<Array<ZBarSymbol>>;
declare const scanRGBABuffer: (buffer: ArrayBuffer, width: number, height: number, scanner?: ZBarScanner | undefined) => Promise<Array<ZBarSymbol>>;
declare const scanImageData: (image: ImageData, scanner?: ZBarScanner | undefined) => Promise<Array<ZBarSymbol>>;
export { getInstance, ZBarSymbolType, ZBarConfigType, ZBarOrientation, getDefaultScanner, scanGrayBuffer, scanRGBABuffer, scanImageData, Point, ZBarSymbol, ZBarImage, ZBarScanner };
