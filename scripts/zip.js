const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const [buildDir, distDir] = process.argv.slice(2);

const extractExtensionData = () => {
	const extPackageJson = require('../package.json');

	return {
		name: extPackageJson.name,
		version: extPackageJson.version,
	};
};

const makeDestZipDirIfNotExists = () => {
	if (!fs.existsSync(distDir)) {
		fs.mkdirSync(distDir);
	}
};

const buildZip = (src, dist, zipFilename) => {
	console.info(`Building ${zipFilename}...`);

	const archive = archiver('zip', { zlib: { level: 9 } });
	const stream = fs.createWriteStream(path.join(dist, zipFilename));

	return new Promise((resolve, reject) => {
		archive
			.directory(src, false)
			.on('error', (err) => reject(err))
			.pipe(stream);

		stream.on('close', () => resolve());
		archive.finalize();
	});
};

const main = () => {
	const { name, version } = extractExtensionData();
	const zipFilename = `${name}-v${version}.zip`;

	makeDestZipDirIfNotExists();

	console.log('build zip', buildDir, distDir);
	buildZip(buildDir, distDir, zipFilename)
		.then(() => console.info('OK'))
		.catch(console.err);
};

main();
