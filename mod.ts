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
	#hashHex: string | null = null;
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
	 * Get the non-cryptographic hash of the data, in Uint8Array.
	 * @returns {Uint8Array}
	 */
	hash(): Uint8Array {
		if (this.#hashUint8Array === null) {
			const hex: string = this.hashHex();
			const bytes: string[] = [];
			for (let index: number = 0; index < hex.length; index += 2) {
				bytes.push(hex.slice(index, index + 2));
			}
			this.#hashUint8Array = Uint8Array.from(bytes.map((byte: string): number => {
				return Number.parseInt(byte, 16);
			}));
		}
		return Uint8Array.from(this.#hashUint8Array);
	}
	/**
	 * Get the non-cryptographic hash of the data, in hexadecimal with padding.
	 * @returns {string}
	 */
	hashHex(): string {
		if (this.#hashHex === null) {
			this.#hashHex = BigInt.asUintN(32, this.#bin).toString(16).toUpperCase().padStart(8, "0");
			if (this.#hashHex.length !== 8) {
				throw new Error(`Unexpected hash hex result \`${this.#hashHex}\`! Please submit a bug report.`);
			}
		}
		return this.#hashHex;
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
		this.#hashUint8Array = null;
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
