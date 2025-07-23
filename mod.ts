export type SDBMAcceptDataType =
	| string
	| BigUint64Array
	| Uint8Array
	| Uint16Array
	| Uint32Array;
/**
 * Get the non-cryptographic hash of the data with algorithm SDBM (32 bits).
 */
export class SDBM {
	get [Symbol.toStringTag](): string {
		return "SDBM";
	}
	#freezed: boolean = false;
	#hash: bigint | null = null;
	#hashBase16: string | null = null;
	#hashUint8Array: Uint8Array | null = null;
	#bin: bigint = 0n;
	/**
	 * Initialize.
	 * @param {SDBMAcceptDataType} [data] Data. Can append later via the method {@linkcode SDBM.update} and {@linkcode SDBM.updateFromStream}.
	 */
	constructor(data?: SDBMAcceptDataType) {
		if (typeof data !== "undefined") {
			this.update(data);
		}
	}
	#clearStorage(): void {
		if (this.#freezed) {
			throw new Error(`Instance is freezed!`);
		}
		this.#hash = null;
		this.#hashBase16 = null;
		this.#hashUint8Array = null;
	}
	/**
	 * Whether the instance is freezed.
	 * @returns {boolean}
	 */
	get freezed(): boolean {
		return this.#freezed;
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
	 * Get the non-cryptographic hash of the data, in original format.
	 * @returns {bigint}
	 */
	hash(): bigint {
		this.#hash ??= BigInt.asUintN(32, this.#bin);
		return this.#hash;
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base16.
	 * @returns {string}
	 */
	hashBase16(): string {
		this.#hashBase16 ??= this.hashBigInt().toString(16).toUpperCase();
		return this.#hashBase16;
	}
	/**
	 * Get the non-cryptographic hash of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInt(): bigint {
		return this.hash();
	}
	/**
	 * Get the non-cryptographic hash of the data, in hexadecimal with padding.
	 * @returns {string}
	 */
	hashHex(): string {
		return this.hashBase16().padStart(8, "0");
	}
	/**
	 * Get the non-cryptographic hash of the data, in Uint8Array.
	 * @returns {Uint8Array}
	 */
	hashUint8Array(): Uint8Array {
		if (this.#hashUint8Array === null) {
			const hex: string = this.hashHex();
			const hexFmt: string = (hex.length % 2 === 0) ? hex : `0${hex}`;
			const bytes: string[] = [];
			for (let index: number = 0; index < hexFmt.length; index += 2) {
				bytes.push(hexFmt.slice(index, index + 2));
			}
			this.#hashUint8Array = Uint8Array.from(bytes.map((byte: string): number => {
				return Number.parseInt(byte, 16);
			}));
		}
		return Uint8Array.from(this.#hashUint8Array);
	}
	/**
	 * Append data.
	 * @param {SDBMAcceptDataType} data Data.
	 * @returns {this}
	 */
	update(data: SDBMAcceptDataType): this {
		this.#clearStorage();
		const dataFmt: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
		for (let index: number = 0; index < dataFmt.length; index += 1) {
			this.#bin = BigInt(dataFmt.charCodeAt(index)) + (this.#bin << 6n) + (this.#bin << 16n) - this.#bin;
		}
		return this;
	}
	/**
	 * Append data from the readable stream.
	 * @param {ReadableStream<SDBMAcceptDataType>} stream Data from the readable stream.
	 * @returns {Promise<this>}
	 */
	async updateFromStream(stream: ReadableStream<SDBMAcceptDataType>): Promise<this> {
		const reader: ReadableStreamDefaultReader<SDBMAcceptDataType> = stream.getReader();
		let done: boolean = false;
		let textDecoder: TextDecoder | undefined;
		while (!done) {
			const {
				done: end,
				value
			}: ReadableStreamReadResult<SDBMAcceptDataType> = await reader.read();
			done = end;
			if (typeof value === "undefined") {
				continue;
			}
			if (typeof value === "string") {
				this.update(value);
			} else {
				textDecoder ??= new TextDecoder();
				this.update(textDecoder.decode(value, { stream: !done }));
			}
		}
		return this;
	}
}
export default SDBM;
