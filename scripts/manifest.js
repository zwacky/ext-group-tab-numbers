const fs = require('fs');

generate();

async function generate() {
	const [inputFile, outputDir] = process.argv.slice(2);
	const { default: manifest } = await import(inputFile);
	const jsonString = JSON.stringify(manifest, undefined, 2);
	// write it as manifest.json
	fs.writeFileSync(`${outputDir}/manifest.json`, jsonString);
}
