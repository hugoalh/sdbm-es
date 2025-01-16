const bitClamp: bigint = 2n ** 32n - 1n;
export type SDBMAcceptDataType = string | BigUint64Array | Uint8Array | Uint16Array | Uint32Array;
/**
 * Get the non-cryptographic hash of the data with algorithm SDBM (32 bits).
 */
export class SDBM {
	#bin: bigint = 0n;
	#hash: bigint | null = null;
	/**
	 * Initialize.
	 * @param {SDBMAcceptDataType} [data] Data. Can append later via the method {@linkcode SDBM.update}.
	 */
	constructor(data?: SDBMAcceptDataType) {
		if (typeof data !== "undefined") {
			this.update(data);
		}
	}
	/**
	 * Get the non-cryptographic hash of the data, in original format.
	 * @returns {bigint}
	 */
	hash(): bigint {
		if (this.#hash === null) {
			this.#hash = this.#bin & bitClamp;
		}
		return this.#hash;
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base16.
	 * @returns {string}
	 */
	hashBase16(): string {
		return this.hashNumber().toString(16).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base32Hex ({@link https://datatracker.ietf.org/doc/html/rfc4648#section-7 RFC 4648 §7}).
	 * @returns {string}
	 */
	hashBase32Hex(): string {
		return this.hashNumber().toString(32).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in Base36.
	 * @returns {string}
	 */
	hashBase36(): string {
		return this.hashNumber().toString(36).toUpperCase();
	}
	/**
	 * Get the non-cryptographic hash of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInt(): bigint {
		return this.hash();
	}
	/**
	 * Get the non-cryptographic hash of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInteger: () => bigint = this.hashBigInt;
	/**
	 * Get the non-cryptographic hash of the data, in hex/hexadecimal without padding.
	 * @returns {string}
	 */
	hashHex(): string {
		return this.hashBase16();
	}
	/**
	 * Get the non-cryptographic hash of the data, in hex/hexadecimal with padding.
	 * @returns {string}
	 */
	hashHexPadding(): string {
		return this.hashHex().padStart(8, "0");
	}
	/**
	 * Get the non-cryptographic hash of the data, in number.
	 * @returns {number}
	 */
	hashNumber(): number {
		return Number(this.hash());
	}
	/**
	 * Append data.
	 * @param {SDBMAcceptDataType} data Data.
	 * @returns {this}
	 */
	update(data: SDBMAcceptDataType): this {
		this.#hash = null;
		const raw: string = (typeof data === "string") ? data : new TextDecoder().decode(data);
		for (let index: number = 0; index < raw.length; index += 1) {
			this.#bin = BigInt(raw.charCodeAt(index)) + (this.#bin << 6n) + (this.#bin << 16n) - this.#bin;
		}
		return this;
	}
	/**
	 * Initialize from file, asynchronously.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
	 * >   - *Resources*
	 * @param {string | URL} filePath Path of the file.
	 * @returns {Promise<SDBM>}
	 */
	static async fromFile(filePath: string | URL): Promise<SDBM> {
		using file: Deno.FsFile = await Deno.open(filePath);
		return await this.fromStream(file.readable);
	}
	/**
	 * Initialize from file, synchronously.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
	 * >   - *Resources*
	 * @param {string | URL} filePath Path of the file.
	 * @returns {SDBM}
	 */
	static fromFileSync(filePath: string | URL): SDBM {
		return new this(Deno.readFileSync(filePath));
	}
	/**
	 * Initialize from readable stream, asynchronously.
	 * @param {ReadableStream<SDBMAcceptDataType>} stream Readable stream.
	 * @returns {Promise<SDBM>}
	 */
	static async fromStream(stream: ReadableStream<SDBMAcceptDataType>): Promise<SDBM> {
		const instance: SDBM = new this();
		for await (const chunk of stream) {
			instance.update(chunk);
		}
		return instance;
	}
}
export default SDBM;
