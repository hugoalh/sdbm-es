if (typeof Uint8Array.fromHex === "undefined") {
	//deno-lint-ignore hugoalh/no-import-dynamic -- Polyfill.
	await import("npm:es-arraybuffer-base64@^1.1.2/Uint8Array.fromHex/auto");
}
export type SDBMAcceptDataType =
	| string
	| Uint8Array;
export type SDBMBitsSize =
	| 32
	| 64;
const bitsSizes: readonly SDBMBitsSize[] = [/* UNIQUE */
	32,
	64
];
export type SDBMInterpretMode =
	| "bytes"
	| "unicode-code-points"
	| "utf16-code-units";
const interpretModes: readonly SDBMInterpretMode[] = [/* UNIQUE */
	"bytes",
	"unicode-code-points",
	"utf16-code-units"
];
export interface SDBMOptions {
	/**
	 * Data interpret mode of the SDBM.
	 * 
	 * - **`bytes`:** UTF-8 encoded bytes.
	 * - **`unicode-code-points`:**: Unicode code points.
	 * - **`utf16-code-units`:** UTF-16 code units; Used in the previous versions.
	 * @default {"byte"}
	 */
	interpret?: SDBMInterpretMode;
	/**
	 * Bits size of the SDBM.
	 * @default {32}
	 */
	size?: SDBMBitsSize;
}
/**
 * Get the non-cryptographic hash of the data with algorithm SDBM.
 */
export class SDBM {
	get [Symbol.toStringTag](): string {
		return "SDBM";
	}
	#freezed: boolean = false;
	#hashHex: string | null = null;
	#interpret: SDBMInterpretMode;
	#size: SDBMBitsSize;
	#bin: bigint = 0n;
	/**
	 * Initialize.
	 * @param {SDBMOptions} [options={}] Options.
	 */
	constructor(options: SDBMOptions = {}) {
		const {
			interpret = "bytes",
			size = 32
		}: SDBMOptions = options;
		if (!interpretModes.includes(interpret)) {
			throw new RangeError(`\`${interpret}\` is not a valid SDBM hash data interpret mode! Only accept these values: ${interpretModes.join(", ")}.`);
		}
		if (!bitsSizes.includes(size)) {
			throw new RangeError(`\`${size}\` is not a valid SDBM hash bits size! Only accept these values: ${bitsSizes.join(", ")}.`);
		}
		this.#interpret = interpret;
		this.#size = size;
	}
	/**
	 * Whether the instance is freezed.
	 * @returns {boolean}
	 */
	get freezed(): boolean {
		return this.#freezed;
	}
	/**
	 * Clone the instance.
	 * @returns {SDBM}
	 */
	clone(): SDBM {
		const instance: SDBM = new SDBM();
		instance.#freezed = this.#freezed;
		instance.#hashHex = this.#hashHex;
		instance.#interpret = this.#interpret;
		instance.#size = this.#size;
		instance.#bin = this.#bin;
		return instance;
	}
	/**
	 * Freeze the instance to prevent any further update.
	 * @returns {this}
	 */
	freeze(): this {
		this.#freezed = true;
		return this;
	}
	/**
	 * Get the non-cryptographic hash of the data, in Uint8Array.
	 * @returns {Uint8Array}
	 */
	hash(): Uint8Array {
		return Uint8Array.fromHex(this.hashHex());
	}
	/**
	 * Get the non-cryptographic hash of the data, in hexadecimal with padding.
	 * @returns {string}
	 */
	hashHex(): string {
		if (this.#hashHex === null) {
			const result: string = BigInt.asUintN(this.#size, this.#bin).toString(16).toUpperCase().padStart(this.#size / 4, "0");
			if (result.length !== this.#size / 4) {
				throw new Error(`Unexpected hash hex result \`${result}\`! Please submit a bug report.`);
			}
			this.#hashHex = result;
		}
		return structuredClone(this.#hashHex);
	}
	/**
	 * Append data.
	 * @param {SDBMAcceptDataType} data Data.
	 * @returns {this}
	 */
	update(data: SDBMAcceptDataType): this {
		if (this.#freezed) {
			throw new Error(`Instance is freezed!`);
		}
		this.#hashHex = null;
		if (this.#interpret === "unicode-code-points") {
			const raw: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
			for (const character of raw) {
				this.#bin = BigInt(character.codePointAt(0)!) + (this.#bin << 6n) + (this.#bin << 16n) - this.#bin;
			}
		} else if (this.#interpret === "utf16-code-units") {
			const raw: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
			for (let index: number = 0; index < raw.length; index += 1) {
				this.#bin = BigInt(raw.charCodeAt(index)) + (this.#bin << 6n) + (this.#bin << 16n) - this.#bin;
			}
		} else {
			const bytes: Uint8Array = (typeof data === "string") ? new TextEncoder().encode(data) : data;
			for (const byte of bytes) {
				this.#bin = BigInt(byte) + (this.#bin << 6n) + (this.#bin << 16n) - this.#bin;
			}
		}
		return this;
	}
	/**
	 * Append data from the readable stream.
	 * @param {ReadableStream<SDBMAcceptDataType>} stream Data from the readable stream.
	 * @returns {Promise<this>}
	 */
	async updateFromStream(stream: ReadableStream<SDBMAcceptDataType>): Promise<this> {
		for await (const chunk of stream) {
			this.update(chunk);
		}
		return this;
	}
}
export default SDBM;
