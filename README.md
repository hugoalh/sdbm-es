# SDBM (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/sdbm_ecmascript)
● [GitHub](https://github.com/hugoalh/sdbm-es)
● [JSR](https://jsr.io/@hugoalh/sdbm)
● [NPM](https://www.npmjs.com/package/@hugoalh/sdbm)

An ECMAScript module to get the non-cryptographic hash of the data with algorithm SDBM.

## 🌟 Features

- Support bits size of 32 and 64.
- Support data interpret mode of bytes, Unicode code points and UTF-16 code units.

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Entrypoints

| **Type** | **Name** | **Path** | **Description** |
|:--|:--|:--|:--|
| API | `.` | `./mod.ts` | Default. |
| CLI | `./cli` | `./cli.ts` | Default. |

> [!NOTE]
> - Different runtimes have vary support for the entrypoints, visit the runtime documentation for more information.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## 🧩 APIs

- ```ts
  class SDBM {
    constructor(options?: SDBMOptions);
    get freezed(): boolean;
    clone(): SDBM;
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
    | Uint8Array;
  ```
- ```ts
  interface SDBMOptions {
    interpret?: SDBMInterpretMode;
    size?: SDBMBitsSize;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc)
>   - [JSR](https://jsr.io/@hugoalh/sdbm)

## 🧩 CLIs

- ```powershell
  sdbm $Context [--interpret $Interpret] [--size $Size]
  ```
- ```powershell
  sdbm --file $FilePath [--interpret $Interpret] [--size $Size]
  ```
- ```powershell
  sdbm --stdin [--interpret $Interpret] [--size $Size]
  ```

| **Argument** | **Type** | **Description** |
|:--|:--|:--|
| `file` | `switch` | Whether the resource is from file. |
| `interpret` | `DJB2aInterpretMode = "bytes"` | Data interpret mode of the DJB2a. |
| `size` | `DJB2aBitsSize = 32` | Bits size of the DJB2a. |
| `stdin` | `switch` | Whether the resource is from standard stream input. |

## ✍️ Examples

- ```ts
  new SDBM({ interpret: "utf16-code-units" }).update("hello").hashHex();
  //=> "28D19932"
  ```
- ```powershell
  sdbm 'hello'
  ```
