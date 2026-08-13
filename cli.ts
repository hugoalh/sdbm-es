import {
	constants as fsConstants,
	open as openFile,
	type FileHandle
} from "node:fs/promises";
import {
	exit,
	stdin
} from "node:process";
import {
	parseArgs,
	styleText
} from "node:util";
import { SDBM } from "./mod.ts";
if (!import.meta.main) {
	throw new Error(`This entrypoint is for command line only!`);
}
addEventListener("unhandledrejection", (event: PromiseRejectionEvent): void => {
	event.preventDefault();
	let message: string;
	if (event.reason instanceof Error) {
		message = event.reason.message;
		if ((event.reason.stack ?? "").length > 0) {
			message += `\n${event.reason.stack}`;
		}
	} else {
		message = String(event.reason);
	}
	console.error(`${styleText(["red"], "ERROR", { validateStream: false })}\t${message}`);
	exit(1);
}, { capture: true });
const {
	positionals,
	values: {
		file: fromFile = false,
		stdin: fromStdin = false
	}
} = parseArgs({
	allowPositionals: true,
	options: {
		file: {
			type: "boolean"
		},
		stdin: {
			type: "boolean"
		}
	}
});
if (fromFile && fromStdin) {
	throw new SyntaxError(`Unable to request resource from file and stdin together!`);
}
const expectArgumentsLength: number = fromStdin ? 0 : 1;
if (positionals.length !== expectArgumentsLength) {
	throw new SyntaxError(`Invalid arguments length! Expect: ${expectArgumentsLength}, Current: ${positionals.length}.`);
}
const instance: SDBM = new SDBM();
if (fromFile) {
	await using file: FileHandle = await openFile(positionals[0], fsConstants.O_RDONLY);
	await instance.updateFromStream(file.readableWebStream() as ReadableStream<Uint8Array>);
} else if (fromStdin) {
	await instance.updateFromStream(stdin as unknown as ReadableStream<Uint8Array>);
} else {
	instance.update(positionals[0]);
}
console.log(instance.hashHex());
