# SDBM (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/sdbm-es](https://img.shields.io/github/v/release/hugoalh/sdbm-es?label=hugoalh/sdbm-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/sdbm-es")](https://github.com/hugoalh/sdbm-es)
[![JSR: @hugoalh/sdbm](https://img.shields.io/jsr/v/@hugoalh/sdbm?label=@hugoalh/sdbm&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/sdbm")](https://jsr.io/@hugoalh/sdbm)
[![NPM: @hugoalh/sdbm](https://img.shields.io/npm/v/@hugoalh/sdbm?label=@hugoalh/sdbm&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/sdbm")](https://www.npmjs.com/package/@hugoalh/sdbm)

An ECMAScript module to get the non-cryptographic hash of the data with algorithm SDBM (32 bits).

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/sdbm-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/sdbm[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/sdbm[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  class SDBM {
    constructor(data?: SDBMAcceptDataType);
    get freezed(): boolean;
    freeze(): this;
    hash(): Uint8Array;
    hashHex(): string;
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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/sdbm)

## ✍️ Examples

- ```ts
  new SDBM("hello").hashHex();
  //=> "28D19932"
  ```
