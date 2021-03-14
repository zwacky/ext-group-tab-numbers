// run tab name check and renaming on every tab update
chrome.tabs.onUpdated.addListener(() => checkTabNames());
// run tab name check and renaming immediately
checkTabNames();

async function checkTabNames() {
	const tabs = await getTabs();
	const tabGroups = await getTabGroups();

	tabGroups.forEach((group) => {
		const tabsInGroup = tabs.filter((tab) => tab.groupId === group.id);
		const postfix = tabsInGroup.length > 0 ? ` (${tabsInGroup.length})` : '';
		// check if current group has already "(#)" in its group title
		const matches = group.title.match(/ \([0-9]*\)$/);
		const title = matches
			? group.title.substr(0, group.title.length - matches[0].length) + postfix
			: group.title + postfix;
		chrome.tabGroups.update(group.id, {
			title,
		});
	});
}

function getTabs(): Promise<chrome.tabs.Tab[]> {
	return new Promise((resolve) => {
		// filtering on groupId isn't working yet - last tested Chrome 88
		chrome.tabs.query({}, (tabs) => {
			resolve(tabs);
		});
	});
}

function getTabGroups(): Promise<chrome.tabGroups.TabGroup[]> {
	return new Promise((resolve) => {
		chrome.tabGroups.query({}, (groups) => {
			resolve(groups);
		});
	});
}
