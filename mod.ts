if (typeof Uint8Array.fromHex === "undefined") {
	//deno-lint-ignore hugoalh/no-import-dynamic -- Polyfill.
	await import("npm:es-arraybuffer-base64@^1.1.2/Uint8Array.fromHex/auto");
}
export type SDBMAcceptDataType =
	| string
	| Uint8Array;
/**
 * Get the non-cryptographic hash of the data with algorithm SDBM (32 bits).
 */
export class SDBM {
	get [Symbol.toStringTag](): string {
		return "SDBM";
	}
	#freezed: boolean = false;
	#hashHex: string | null = null;
	#bin: bigint = 0n;
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
		return Uint8Array.from(this.hashHex());
	}
	/**
	 * Get the non-cryptographic hash of the data, in hexadecimal with padding.
	 * @returns {string}
	 */
	hashHex(): string {
		if (this.#hashHex === null) {
			const result: string = BigInt.asUintN(32, this.#bin).toString(16).toUpperCase().padStart(8, "0");
			if (result.length !== 8) {
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
		const raw: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
		for (let index: number = 0; index < raw.length; index += 1) {
			this.#bin = BigInt(raw.charCodeAt(index)) + (this.#bin << 6n) + (this.#bin << 16n) - this.#bin;
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
