// not needed as soon as https://github.com/DefinitelyTyped/DefinitelyTyped/pull/51351 is merged.

type ColorEnum = 'grey' | 'blue' | 'red' | 'yellow' | 'green' | 'pink' | 'purple' | 'cyan';
declare namespace chrome.tabGroups {
	interface TabGroup {
		/** Whether the group is collapsed. A collapsed group is one whose tabs are hidden. */
		collapsed: boolean;
		/** The group's color. */
		color: ColorEnum;
		/** The ID of the group. Group IDs are unique within a browser session. */
		id: number;
		/** The title of the group. */
		title?: string;
		/** The ID of the window that contains the group. */
		windowId: number;
	}
	export interface UpdateProperties {
		/** Whether the group should be collapsed. */
		collapsed?: boolean;
		/** The color of the group. */
		color?: ColorEnum;
		/** The title of the group. */
		title?: string;
	}

	export interface MoveProperties {
		/** The position to move the group to. Use -1 to place the group at the end of the window. */
		index: number;
		/** The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with chrome.windows.WindowType type "normal". */
		windowId?: number;
	}

	export interface QueryInfo {
		/** Whether the groups are collapsed. */
		collapsed?: boolean;
		/** The color of the groups. */
		color?: ColorEnum;
		/** Match group titles against a pattern. */
		title?: string;
		/** The ID of the parent window, or chrome.windows.WINDOW_ID_CURRENT for the current window. */
		windowId?: number;
	}

	/**
	 * Retrieves details about the specified group.
	 * @param groupId The ID of the tab group.
	 * @param callback Called with the retrieved tab group.
	 */
	export function get(groupId: number, callback: (group: TabGroup) => void): void;

	/**
	 * Moves the group and all its tabs within its window, or to a new window.
	 * @param groupId The ID of the group to move.
	 * @param moveProperties Move properties. Specify tab index, windowId
	 * @param callback Called with details about the moved group.
	 */
	export function move(groupId: number, moveProperties: MoveProperties, callback: (group: TabGroup) => void): void;

	/**
	 * Queries all groups that have the specified properties, or all groups if no properties are specified.
	 * @param queryInfo Object with search parameters.
	 * @param callback Called with retrieved tab groups
	 */
	export function query(queryInfo: QueryInfo, callback: (result: TabGroup[]) => void): void;

	/**
	 * Modifies the properties of a group. Properties that are not specified in updateProperties are not modified.
	 * @param groupId The ID of the group to modify.
	 * @param updateProperties The properties to update.
	 * @param callback Called with an updated tab group as parameter.
	 */
	export function update(
		groupId: number,
		updateProperties: UpdateProperties,
		callback?: (group: TabGroup) => void
	): void;

	export interface TabGroupCreatedEvent extends chrome.events.Event<(group: TabGroup) => void> {}
	export interface TabGroupMovedEvent extends chrome.events.Event<(group: TabGroup) => void> {}
	export interface TabGroupRemovedEvent extends chrome.events.Event<(group: TabGroup) => void> {}
	export interface TabGroupUpdated extends chrome.events.Event<(group: TabGroup) => void> {}

	/**
	 * Fired when a group is created.
	 */
	export var onCreated: TabGroupCreatedEvent;
	/**
	 * Fired when a group is moved within a window. Move events are still fired for the individual tabs within the group, as well as for the group itself. This event is not fired when a group is moved between windows; instead, it will be removed from one window and created in another.
	 */
	export var onMoved: TabGroupMovedEvent;
	/**
	 * Fired when a group is closed, either directly by the user or automatically because it contained zero.
	 */
	export var onRemoved: TabGroupRemovedEvent;
	/**
	 * Fired when a group is updated.
	 */
	export var onUpdated: TabGroupUpdated;
}

declare namespace chrome.tabs {
	export interface Tab {
		groupId: number;
	}
}
