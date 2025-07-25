import {
	deepStrictEqual,
	throws
} from "node:assert";
import { SDBM } from "./mod.ts";
Deno.test("Lock", { permissions: "none" }, () => {
	throws(() => {
		new SDBM().freeze().update("");
	});
});
Deno.test("Direct 1", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("").hashHex(), "00000000");
});
Deno.test("Direct 2", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("🦄🌈").hashHex(), "F19C2792");
});
Deno.test("Direct 3", { permissions: "none" }, () => {
	const instance = new SDBM();
	deepStrictEqual(instance.update("h").hashHex(), "00000068");
	deepStrictEqual(instance.update("e").hashHex(), "006819FD");
	deepStrictEqual(instance.update("l").hashHex(), "339B65AF");
	deepStrictEqual(instance.update("l").hashHex(), "18ED067D");
	deepStrictEqual(instance.update("o").hashHex(), "28D19932");
	deepStrictEqual(instance.update(" ").hashHex(), "A4C6B36E");
	deepStrictEqual(instance.update("w").hashHex(), "40542889");
	deepStrictEqual(instance.update("o").hashHex(), "FD3EFA26");
	deepStrictEqual(instance.update("r").hashHex(), "4CA58FCC");
	deepStrictEqual(instance.update("l").hashHex(), "6C8A63A0");
	deepStrictEqual(instance.update("d").hashHex(), "19AE84C4");
});
Deno.test("Direct 4", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.").hashHex(), "04D8A34A");
});
async function testerStream(filePath: string): Promise<void> {
	const sampleText = await Deno.readTextFile(filePath);
	const hashFromText = new SDBM(sampleText).hash();
	await using sampleFile = await Deno.open(filePath);
	const hashFromStream = (await new SDBM().updateFromStream(sampleFile.readable)).hash();
	deepStrictEqual(hashFromText, hashFromStream);
}
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./LICENSE.md");
});
Deno.test("Stream 2", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./README.md");
});
Deno.test("Stream 3", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./deno.jsonc");
});
