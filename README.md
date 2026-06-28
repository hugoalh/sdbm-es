# SDBM (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/sdbm_ecmascript)
● [GitHub](https://github.com/hugoalh/sdbm-es)
● [JSR](https://jsr.io/@hugoalh/sdbm)
● [NPM](https://www.npmjs.com/package/@hugoalh/sdbm)

An ECMAScript module to get the non-cryptographic hash of the data with algorithm SDBM (32 bits).

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources & Entrypoints

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

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

> [!NOTE]
> - Different runtimes have vary support for the sources and entrypoints, visit the runtime documentation for more information.
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

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
