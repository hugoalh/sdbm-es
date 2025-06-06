import { deepStrictEqual } from "node:assert";
import { SDBM } from "./mod.ts";
Deno.test("Raw 1", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("").hash(), 0n);
});
Deno.test("Raw 2", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("🦄🌈").hash(), 4053542802n);
});
Deno.test("Raw 3", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("h").hash(), 104n);
});
Deno.test("Raw 4", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("he").hash(), 6822397n);
});
Deno.test("Raw 5", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hel").hash(), 865822127n);
});
Deno.test("Raw 6", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hell").hash(), 418186877n);
});
Deno.test("Raw 7", { permissions: "none" }, () => {
	const instance = new SDBM("hello");
	deepStrictEqual(instance.hash(), 684824882n);
	deepStrictEqual(instance.hashHexPadding(), "28D19932");
});
Deno.test("Raw 8", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello ").hash(), 2764485486n);
});
Deno.test("Raw 9", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello w").hash(), 1079257225n);
});
Deno.test("Raw 10", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello wo").hash(), 4248762918n);
});
Deno.test("Raw 11", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello wor").hash(), 1285918668n);
});
Deno.test("Raw 12", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello worl").hash(), 1821008800n);
});
Deno.test("Raw 13", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("hello world").hash(), 430867652n);
});
Deno.test("Raw 14", { permissions: "none" }, () => {
	deepStrictEqual(new SDBM("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.").hash(), 81306442n);
});
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	using file = await Deno.open("./README.md");
	console.log((await SDBM.fromStream(file.readable)).hashHexPadding());
});
