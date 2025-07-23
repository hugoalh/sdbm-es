import { deepStrictEqual } from "node:assert";
import { SDBM } from "./mod.ts";
Deno.test("Text 1", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("").hash(), 0n);
});
Deno.test("Text 2", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("🦄🌈").hash(), 4053542802n);
});
Deno.test("Text 3", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("h").hash(), 104n);
});
Deno.test("Text 4", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("he").hash(), 6822397n);
});
Deno.test("Text 5", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hel").hash(), 865822127n);
});
Deno.test("Text 6", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hell").hash(), 418186877n);
});
Deno.test("Text 7", { permissions: "none" }, () => {
	const instance = new SDBM("hello");
	deepStrictEqual(instance.hash(), 684824882n);
	deepStrictEqual(instance.hashHex(), "28D19932");
});
Deno.test("Text 8", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello ").hash(), 2764485486n);
});
Deno.test("Text 9", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello w").hash(), 1079257225n);
});
Deno.test("Text 10", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello wo").hash(), 4248762918n);
});
Deno.test("Text 11", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello wor").hash(), 1285918668n);
});
Deno.test("Text 12", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello worl").hash(), 1821008800n);
});
Deno.test("Text 13", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello world").hash(), 430867652n);
});
Deno.test("Text 14", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.").hash(), 81306442n);
});
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	const sampleFilePath = "./README.md";
	const sampleText = await Deno.readTextFile(sampleFilePath);
	const hashFromText = new SDBM(sampleText).hash();
	await using sampleFile = await Deno.open(sampleFilePath);
	const hashFromStream = (await new SDBM().updateFromStream(sampleFile.readable)).hash();
	deepStrictEqual(hashFromText, hashFromStream);
});
