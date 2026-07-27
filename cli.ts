import { parseArgs } from "jsr:@std/cli@^1.0.32/parse-args";
import { SDBM } from "./mod.ts";
if (!import.meta.main) {
	throw new Error(`This entrypoint is for command line only!`);
}
const args = parseArgs(Deno.args, {
	boolean: [
		"file",
		"stdin"
	]
});
const fromFile: boolean = args.file;
const fromStdin: boolean = args.stdin;
const argsValues: readonly string[] = args._.map((value: number | string): string => {
	return String(value);
});
if (fromFile && fromStdin) {
	throw new SyntaxError(`Unable to request resource from file and stdin together!`);
}
const expectArgumentsLength: number = fromStdin ? 0 : 1;
if (argsValues.length !== expectArgumentsLength) {
	throw new SyntaxError(`Invalid arguments length! Expect: ${expectArgumentsLength}, Current: ${argsValues.length}.`);
}
const instance: SDBM = new SDBM();
if (fromFile) {
	await using file: Deno.FsFile = await Deno.open(argsValues[0]);
	await instance.updateFromStream(file.readable);
} else if (fromStdin) {
	await instance.updateFromStream(Deno.stdin.readable);
} else {
	instance.update(argsValues[0]);
}
console.log(instance.hashHex());
