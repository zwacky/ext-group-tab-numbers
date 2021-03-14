const appPackageJson = require('../package.json');

module.exports = {
	name: appPackageJson.fullName,
	description: appPackageJson.description,
	version: appPackageJson.version,
	manifest_version: 3,
	icons: {
		128: 'assets/icon.png',
	},
	background: {
		service_worker: 'background.js',
	},
	permissions: ['tabs', 'tabGroups'],
};
