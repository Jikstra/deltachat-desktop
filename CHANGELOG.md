# Changelog

## [Unreleased]

## [2.0.0] - 2018-11-23

### Changed
* Simplify and refactor dialogs (@karissa)
* Refactor hamburger menu code (@karissa)
* Use `webpack` instead of `buble` (@karissa)
* Stop deploying from Travis (old Ubuntu caused problems with Debian and libssl) (@ralphtheninja)
* Options passed to node bindings should be in camelCase (@ralphtheninja)
* Upgrade `deltachat-node` dependency from `^0.23.0` to `^0.24.0` (@ralphtheninja)

### Added
* Introduce `styled-components` (@jikstra)
* Add single folder banner (@jikstra)
* Add `Content-Security-Policy` (@karissa)
* Add verified icon for verified users (@ralphtheninja)
* Add `jenkins/Jenkinsfile.linux` for building and deploying on [Jenkins](https://ci.delta.chat) (@ralphtheninja)

### Fixed
* Fix chat view scroll jumping (@jikstra)
* Fix links containing a double dash `--` (@jikstra)
* Clicking links opens up window in external browser (@karissa)
* `libetpan-dev` can be installed globally without messing up compilation (@ralphtheninja)

**Historical Note** This release contains an update to `deltachat-core` which contains the single folder implementation. See the [upgrade guide](UPGRADING.md) for more details.

## [1.7.5] - 2018-11-17

### Changed
* Load messages on demand using a paging model (@karissa)
* Improve troubleshooting section in README (@ralphtheninja)
* CSS tweaks to chat view (@karissa)
* Mark messages as seen when fetched (@karissa)
* Tweak group image and chat name margin (@ralphtheninja)

### Added
* Add verified groups with QR codes for group invite and user verification (@ralphtheninja)
* Add group image to chat list (@ralphtheninja)
* Add `appstream` data (@muelli)
* Send messages with a file attachment (@karissa)
* Add message details dialog (@karissa)
* Allow user to save a file attachment to disk (@karissa)

### Fixed
* Back button should go back to create chat screen from both create group and add contact (@karissa)
* Back button for edit group should go back to split view (@alfaslash)
* Add unique 'key' for messages in order to remove React warning (@karissa)
* Prevent the scrollbar from jiggling when new message arrives (@karissa)
* Only try setting group image if it's different (@ralphtheninja)
* Reference correct target when sending a message (@karissa)

## [1.7.4] - 2018-11-07

### Changed
* Upgrade `@sindresorhus/is` to `^0.13.0` (@greenkeeper)
* Update UI for Autocrypt key exchange (@jikstra)
* Main window and about dialog should show same version (@ralphtheninja)
* Tweak language resources for `New chat`, `New group` and `Add contact` (@ralphtheninja)

### Added
* Add search box for chat list (@karissa)
* Add group image (@ralphtheninja)

### Fixed
* Fix rendering of video messages (@ralphtheninja)
* Add back currently logged in user to main window title (@ralphtheninja)
* Make links clickable in About dialog (@ralphtheninja)
* Ensure `CONFIG_PATH` exists at startup (@ralphtheninja)
* Tweak Autocrypt Setup Message (@ralphtheninja)
* Pass configuration settings to core in `snake_key` format (@ralphtheninja)

## [1.7.3] - 2018-11-02

### Added
* Add about dialog (@jikstra, @ralphtheninja)
* Add confirmation dialog when deleting chat (@ralphtheninja)
* Hide password by default and add button to show it (@jikstra)

### Fixed
* Translate buttons in confirmation dialog (@ralphtheninja)
* Install `libssl-dev` on Travis (@ralphtheninja)
* Contact requests properly resolve when request is from a group chat (@karissa)
* Add key for chatlist to remove console warning (@karissa)

## [1.7.2] - 2018-10-31

### Changed
* Update translations from transifex (@ralphtheninja)
* Make conversations build only when necessary to improve build time (@karissa)
* Move `Preferences` menu (@karissa)
* Consolidate `'New Chat'` menu (@karissa)
* Upgrade `deltachat-node` to `^0.23.0` (@ralphtheninja)
* Translate strings coming from `deltachat-core` (@ralphtheninja)

### Added
* Add watch script for development (@karissa)
* Implement advanced login settings (@jikstra)
* Add functionality for blocking/unblocking contacts (@karissa)

### Removed
* Remove `nodemon` devDependency (@ralphtheninja)

### Fixed
* Don't select recent chat by default (@karissa)

## [1.7.1] - 2018-10-29

### Fixed
* Downgrade to electron 2 (fixes window bug on Debian) (@substack)

## [1.7.0] - 2018-10-25

### Changed
* Update translations from transifex (@ralphtheninja)
* Upgrade `deltachat-node` to `^0.22.0` (@ralphtheninja)
* Disable `eval()` in render process (@ralphtheninja)
* Disable navigation (@ralphtheninja)
* Disable opening new windows for now (@ralphtheninja)
* Update output of logged events (@ralphtheninja)
* Don't call `render()` when dispatching calls from render process to main process (@ralphtheninja)
* Move `Logout` button to hamburger menu (@ralphtheninja)
* Move state handling selected chat and archived chats to main process (@jikstra)
* Move logged in account email to window title (@ralphtheninja)
* Replace `(BETA)` with `(preview-$VERSION)` in window title (@ralphtheninja)
* Replace all `Delta.Chat` resources with `DeltaChat` (@ralphtheninja)

### Added
* Add fresh message counter in `ChatList` (@jikstra)
* Log when `render()` is called (@ralphtheninja)
* Add archived chats button in `ChatList` (@ralphtheninja)
* Add menu alternative for un-archiving chats (@ralphtheninja)

### Removed
* Remove `Go Back` menu item (#158) (@ralphtheninja)
* Remove `window.main.dispatch()` (@ralphtheninja)

### Fixed
* Fix `'stateSaveImmediate'` event issue during quit (@ralphtheninja)
* Propagate `'uncaughtError'` event to render process and log it (@ralphtheninja)
* Let unknown translations fall back to resource key (@ralphtheninja)

## [1.6.0] - 2018-10-23

### Changed
* Update translations from transifex (@ralphtheninja)
* Translate message input field and send button (@ralphtheninja)
* Translate Autocrypt key transfer dialogs (@ralphtheninja)
* Move avatar out of message and display it next to the message (@jikstra)
* Upgrade `electron` devDependency to `^3.0.5` (@ralphtheninja)
* Upgrade `spectron` devDependency to `^5.0.0` (@ralphtheninja)

### Added
* Add `Paste` menu item, fixes #161 (@ralphtheninja)

### Removed
* Remove `babel-eslint` devDependency (@ralphtheninja)

## [1.5.0] - 2018-10-20

### Changed
* Consolidate chat list and chat view (@jikstra)
* Upgrade `deltachat-node` to `^0.21.0` (@ralphtheninja)
* Update translations from transifex (@ralphtheninja)

### Added
* Add functionality to edit groups, e.g. group name, adding and removing members (@ralphtheninja)
* Add functionality to leave group (@ralphtheninja)

### Fixed
* Use default sort order from core in chat list (@ralphtheninja)
* If creating a chat that is already archived, unarchive it (@ralphtheninja)
* Fix issues with author name in group chats (@ralphtheninja)

## [1.4.0] - 2018-10-16

### Changed
* Pull in `conversations` module (@jikstra)
* Change window title (@ralphtheninja)
* Show full language names (and translate them) instead of abbreviations (@ralphtheninja)
* Upgrade `deltachat-node` to `^0.20.0` (@ralphtheninja)
* Update logins in login page on successful configure (@ralphtheninja)
* Translate all strings on login and create chat/group pages (@ralphtheninja)
* Translate all menu items (@ralphtheninja)
* Enable going to `Create Group` page from chat list page (@ralphtheninja)

### Added
* Implement delete message (@ralphtheninja)
* Add screenshot to README (@ralphtheninja)
* Add descriptions to language resources (@ralphtheninja)
* Add `Archive Chat` menu item (@ralphtheninja)
* Add `Delete Chat` menu item (@ralphtheninja)

### Removed
* Remove `+ Group` button from `Create Chat` page (moved to chat list, see above) (@ralphtheninja)

### Fixed
* Do not scroll to bottom when opening message context menu (@ralphtheninja)
* Make sure `Float on Top` menu item stays checked/unchecked when language is changed (@ralphtheninja)

[Unreleased]: https://github.com/deltachat/deltachat-desktop/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/deltachat/deltachat-desktop/compare/v1.7.5...v2.0.0
[1.7.5]: https://github.com/deltachat/deltachat-desktop/compare/v1.7.4...v1.7.5
[1.7.4]: https://github.com/deltachat/deltachat-desktop/compare/v1.7.3...v1.7.4
[1.7.3]: https://github.com/deltachat/deltachat-desktop/compare/v1.7.2...v1.7.3
[1.7.2]: https://github.com/deltachat/deltachat-desktop/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/deltachat/deltachat-desktop/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/deltachat/deltachat-desktop/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/deltachat/deltachat-desktop/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/deltachat/deltachat-desktop/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/deltachat/deltachat-desktop/compare/v1.3.0...v1.4.0
