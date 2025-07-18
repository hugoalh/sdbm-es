# SDBM (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/sdbm-es](https://img.shields.io/github/v/release/hugoalh/sdbm-es?label=hugoalh/sdbm-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/sdbm-es")](https://github.com/hugoalh/sdbm-es)
[![JSR: @hugoalh/sdbm](https://img.shields.io/jsr/v/@hugoalh/sdbm?label=@hugoalh/sdbm&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/sdbm")](https://jsr.io/@hugoalh/sdbm)
[![NPM: @hugoalh/sdbm](https://img.shields.io/npm/v/@hugoalh/sdbm?label=@hugoalh/sdbm&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/sdbm")](https://www.npmjs.com/package/@hugoalh/sdbm)

An ECMAScript (JavaScript & TypeScript) module to get the non-cryptographic hash of the data with algorithm SDBM.

Currently, only 32 bits is supported.

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/sdbm-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/sdbm[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/sdbm[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  class SDBM {
    constructor(data?: SDBMAcceptDataType);
    get freezed(): boolean;
    freeze(): this;
    hash(): bigint;
    hashBase16(): string;
    hashBase32Hex(): string;
    hashBase36(): string;
    hashBigInt(): bigint;
    hashHex(): string;
    hashHexPadding(): string;
    hashUint8Array(): Uint8Array;
    update(data: SDBMAcceptDataType): this;
    updateFromStream(stream: ReadableStream<SDBMAcceptDataType>): Promise<this>;
  }
  ```
- ```ts
  type SDBMAcceptDataType =
    | string
    | BigUint64Array
    | Uint8Array
    | Uint16Array
    | Uint32Array;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/sdbm)

## ✍️ Examples

- ```ts
  new SDBM("hello").hashHexPadding();
  //=> "28D19932"
  ```
