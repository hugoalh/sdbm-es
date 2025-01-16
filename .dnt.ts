import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: [
		...configJSR.getExports(),
		{
			executable: true,
			name: "sdbm",
			path: "./cli.ts"
		}
	],
	fixInjectedImports: true,
	generateDeclarationMap: true,
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
		description: "A CLI and module to get the non-cryptographic hash of the data with algorithm SDBM.",
		keywords: [
			"hash",
			"sdbm"
		],
		homepage: "https://github.com/hugoalh/sdbm-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/sdbm-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/sdbm-es.git"
		},
		scripts: {
		},
		engines: {
			node: ">=16.13.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "npm",
	outputDirectoryPreEmpty: true
});
