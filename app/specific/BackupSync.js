/*
 * Copyright (c) 2017- Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

//Variable initialization
var GDriveValidateTokenUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=';
var GDriveUserInfoURL = 'https://www.googleapis.com/oauth2/v3/userinfo';
var GDriveUpdateUrl = 'https://www.googleapis.com/upload/drive/v3/files/%x?uploadType=media';
var GDriveUploadNewUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
var GDriveFileIdUrl = 'https://www.googleapis.com/drive/v3/files?q=%x&fields=files(id,name,createdTime,modifiedTime,mimeType,size,trashed)';
var GDriveDownLoadUrl = 'https://www.googleapis.com/drive/v3/files/%x?alt=media';
var GDriveUrl = 'https://oauth2.googleapis.com/';

var GDriveToken = GDriveUrl + 'token?';
var GDriveCode = GDriveUrl + 'device/code?';

var GDriveClientKey = 'MTAwNTQzNzk3NDA3MC1yZ2I5bGIyNmk1OGJlN2picXM0b2V1MWliOHA2ZTI1cy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbQ==';
var GDriveKey = 'R09DU1BYLU1PaE1UTkd6bTZ2UVF5d3d2YUJaVFFiZlNhQXo=';

var GDriveDeviceCodeTimeout = 5;
var GDriveBoundary = '--GDriveBoundary--';
var GDriveFileName = 'STTV_BACKUP.json';
var GDriveMetadata = JSON.stringify({
    name: GDriveFileName,
    mimeType: 'application/json'
});
var GDrivePreventClose = false;

var GDriveDeviceCode;
var GDriveCheckCodeId;
var GDriveBackupTimeoutID;
var GDriveBackupAsyncID;
var GDriveExpiresId;

var AddUser_UserArrayItemName = 'AddUser_UsernameArrayNew';
var AddUser_UsernameArrayRemovedItemName = 'AddUser_UsernameArrayRemoved';
var Main_values_History_data_ItemName = 'Main_values_History_data';

var GDriveDoBackupLimit = 100;
var GDriveDoBackupInterval = 100 * 1000;

var GDriveDoBackupCall = [];
var GDriveDoBackupCallItemName = 'GDriveDoBackupCall';

var GDriveConfig = {};
var GDriveConfigItemName = 'GDriveConfig';

function GDriveSetExpires(obj) {
    GDriveConfig.tokenExpiresTime = (parseInt(obj.expires_in) - 60) * 1000;
    GDriveConfig.backupExpiresTime = new Date().getTime() + GDriveConfig.tokenExpiresTime;

    GDriveSaveConfig();
    GDriveSetExpiresId(GDriveConfig.tokenExpiresTime);
}

function GDriveSetExpiresId(expiresTime) {
    GDriveExpiresId = Main_setTimeout(GDriveDeviceRefresh, expiresTime, GDriveExpiresId);
}

function GDriveSetHeader() {
    GDriveConfig.header = [['Authorization', 'Bearer ' + GDriveConfig.accessToken]];
}

function GDriveDeviceRefresh(sync) {
    GDriveRefreshAccessToken(GDriveDeviceRefreshSuccess, noop_fun, sync, 0);
}

function GDriveDeviceRefreshSuccess(obj) {
    if (obj.status === 200) {
        var data = JSON.parse(obj.responseText);
        GDriveConfig.accessToken = data.access_token;

        GDriveSetHeader();
        GDriveSetExpires(data);
        GDriveSaveConfig();
    } else {
        GDriveGetBackupAPI_Fail();
    }
}

function GDriveGetBackupAPI_Fail() {
    Main_PlayMainShowWarning(STR_BACKUP_ACCOUNT_REFRESH_ERROR, 7500, true);
    GDriveCheckMainStarted();
}

function GDriveClean() {
    GDriveConfig = {};
    GDriveDoBackupCall = [];

    localStorage.removeItem(GDriveConfigItemName);
    localStorage.removeItem(GDriveDoBackupCallItemName);

    Main_clearTimeout(GDriveBackupTimeoutID);
    Main_clearTimeout(GDriveSetExpiresId);
}

function GDriveErase() {
    GDriveClean();

    GDriveCheckMainStarted();
}

function GDriveUpdateFile() {
    GDriveUpdateFile2(GDriveUpFileSuccess, noop_fun, 0, 0);
}

function GDriveUpFileSuccess(obj) {
    if (obj.status === 200) {
        GDriveUpFileSuccessSave(obj);
    } else {
        Main_textContent('backup_body', STR_BACKUP_ACCOUNT_DIALOG_CODE_FAIL);
    }
}

function GDriveUpFileSuccessSave(obj) {
    var data = JSON.parse(obj.responseText);
    GDriveConfig.fileID = data.id;

    GDriveSaveConfig();
    console.log('GDriveUpFileSuccessSave data', data);
}

function GDriveGetBackupFileContent() {
    var backup = {},
        i = 0,
        len = localStorage.length,
        key = '';

    for (i; i < len; i++) {
        key = localStorage.key(i);
        backup[key] = localStorage.getItem(key);
    }

    GDriveConfig.lastBackupDate = new Date().getTime();
    GDriveSaveConfig();

    var backupString = JSON.stringify(backup);
    GDriveSetBackupSize(backupString);

    return backupString;
}

function GDriveSetBackupSize(backupString) {
    try {
        var sizeInBytes = new Blob([backupString]).size;
        GDriveConfig.backupSize = formatFileSize(sizeInBytes);
        GDriveSaveConfig();
    } catch (error) {}
}

var formatFileSizeArray = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    var i = Math.floor(Math.log(bytes) / Math.log(1024));

    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + formatFileSizeArray[i];
}

//api limit is 100 request per 100 seconds
function GDriveCanDoBackup() {
    var now = new Date().getTime(),
        result = false;

    // Remove calls that are outside the time window
    while (GDriveDoBackupCall.length > 0 && GDriveDoBackupCall[0] <= now - GDriveDoBackupInterval) {
        GDriveDoBackupCall.shift();
    }

    if (GDriveDoBackupCall.length < GDriveDoBackupLimit) {
        GDriveDoBackupCall.push(now);

        result = true;
    }

    Main_setItem(GDriveDoBackupCallItemName, JSON.stringify(GDriveDoBackupCall));

    return result;
}

function GDriveSyncBackupSetting(backup) {
    GDriveRestoreSettings(backup);
    Main_RestoreValues();
}

function GDriveRefresh() {
    if (Main_IsOn_OSInterface) {
        Main_RefreshPage();
    } else {
        window.location.reload();
    }
}

function GDriveSyncBackups(backupsObj) {
    var backupUsers = Object.keys(backupsObj),
        i = 0,
        len = backupUsers.length,
        user = '',
        userBackupObj,
        saveAfter;

    for (i; i < len; i++) {
        user = backupUsers[i];
        userBackupObj = backupsObj[user];

        if (Main_values_History_data[user]) {
            saveAfter =
                GDriveSyncBackupsByArray(
                    userBackupObj.clip,
                    Main_values_History_data[user].clip,
                    userBackupObj.deleted ? userBackupObj.deleted.clip : {},
                    Main_values_History_data[user].deleted ? Main_values_History_data[user].deleted.clip : {}
                ) || saveAfter;
            saveAfter =
                GDriveSyncBackupsByArray(
                    userBackupObj.live,
                    Main_values_History_data[user].live,
                    userBackupObj.deleted ? userBackupObj.deleted.live : {},
                    Main_values_History_data[user].deleted ? Main_values_History_data[user].deleted.live : {}
                ) || saveAfter;
            saveAfter =
                GDriveSyncBackupsByArray(
                    userBackupObj.vod,
                    Main_values_History_data[user].vod,
                    userBackupObj.deleted ? userBackupObj.deleted.vod : {},
                    Main_values_History_data[user].deleted ? Main_values_History_data[user].deleted.vod : {}
                ) || saveAfter;

            if (userBackupObj.blocked) {
                Screens_BlockSetDefaultObj();

                saveAfter =
                    GDriveSyncBackupsByObj(
                        userBackupObj.blocked && userBackupObj.blocked.channel ? userBackupObj.blocked.channel : {},
                        Main_values_History_data[user] && Main_values_History_data[user].blocked && Main_values_History_data[user].blocked.channel
                            ? Main_values_History_data[user].blocked.channel
                            : {},
                        userBackupObj.blocked.deleted && userBackupObj.blocked.deleted.channel ? userBackupObj.blocked.deleted.channel : {},
                        Main_values_History_data[user] &&
                            Main_values_History_data[user].blocked.deleted &&
                            Main_values_History_data[user].blocked.deleted.channel
                            ? Main_values_History_data[user].blocked.deleted.channel
                            : {}
                    ) || saveAfter;
                saveAfter =
                    GDriveSyncBackupsByObj(
                        userBackupObj.blocked && userBackupObj.blocked.game ? userBackupObj.blocked.game : {},
                        Main_values_History_data[user] && Main_values_History_data[user].blocked && Main_values_History_data[user].blocked.game
                            ? Main_values_History_data[user].blocked.game
                            : {},
                        userBackupObj.blocked.deleted && userBackupObj.blocked.deleted.game ? userBackupObj.blocked.deleted.game : {},
                        Main_values_History_data[user] &&
                            Main_values_History_data[user].blocked.deleted &&
                            Main_values_History_data[user].blocked.deleted.game
                            ? Main_values_History_data[user].blocked.deleted.game
                            : {}
                    ) || saveAfter;
            }
        } else {
            Main_values_History_data[user] = userBackupObj;
            saveAfter = true;
        }
    }

    if (saveAfter) {
        Main_SaveHistoryItem();

        Main_history_SetVod_Watched();
    }
}

function GDriveSyncBackupsByObj(backupObj, localObj, backupDeleted, localDeleted) {
    var i = 0,
        backupItems = Object.keys(backupObj),
        len = backupItems.length,
        saveAfter,
        key = '',
        toUpdateObj = {};

    //if any new entry add it
    //if date is newer update from
    for (i; i < len; i++) {
        key = backupItems[i];

        if (!localObj[key]) {
            //is not deleted locally or the date was delete is before the last watched date
            if (!localDeleted[key] || localDeleted[key].date < backupObj[key].date) {
                localObj[key] = backupObj[key];
                delete localDeleted[key];

                saveAfter = true;
            }
        } else if (localObj[key].date < backupObj[key].date) {
            // Entry exists on both, use the most recent one
            toUpdateObj[key] = backupObj[key];
        }
    }

    var localItems = Object.keys(localObj);
    i = 0;
    len = localItems.length;

    for (i; i < len; i++) {
        key = localItems[i];
        if (toUpdateObj[key]) {
            localObj[key] = toUpdateObj[key];
            saveAfter = true;
        }
    }

    i = localItems.length;

    while (i--) {
        key = localItems[i];

        if (localObj[key] && backupDeleted[key] && backupDeleted[key].date > localObj[key].date) {
            localDeleted[key] = backupDeleted[key];
            delete localObj[key];
            saveAfter = true;
        }
    }

    return saveAfter;
}

function GDriveSyncBackupsByArray(backupArray, localArray, backupDeleted, localDeleted, isUser) {
    var i = 0,
        len = backupArray.length,
        localObj = GDriveBackupObject(localArray),
        saveAfter,
        toUpdateArray = {};

    //if any new entry add it
    //if date is newer update from
    for (i; i < len; i++) {
        //for backupArray[i]
        // New entry on local

        if (!localObj[backupArray[i].id]) {
            //i snot deleted locally or the date was delete is before the last watched date
            if (!localDeleted[backupArray[i].id] || localDeleted[backupArray[i].id].date < backupArray[i].date) {
                localArray.push(backupArray[i]);
                delete localDeleted[backupArray[i].id];

                saveAfter = true;
            }
        } else if (localObj[backupArray[i].id].date < backupArray[i].date) {
            // Entry exists on both, use the most recent one
            toUpdateArray[backupArray[i].id] = backupArray[i];
        }
    }

    i = 0;
    len = localArray.length;

    for (i; i < len; i++) {
        if (toUpdateArray[localArray[i].id]) {
            localArray[i] = toUpdateArray[localArray[i].id];
            saveAfter = true;
        }
    }

    i = localArray.length;

    while (i--) {
        //skip removing main user if isUser
        if (isUser && !i) {
            continue;
        }

        if (localArray[i] && backupDeleted[localArray[i].id] && backupDeleted[localArray[i].id].date > localArray[i].date) {
            if (localArray[i].timeout_id) {
                Main_clearTimeout(localArray[i].timeout_id);
            }

            localDeleted[localArray[i].id] = backupDeleted[localArray[i].id];
            localArray.splice(i, 1);
            saveAfter = true;
        }
    }

    return saveAfter;
}

function GDriveBackupObject(mArray) {
    var i = 0,
        len = mArray.length,
        obj = {};

    for (i; i < len; i++) {
        obj[mArray[i].id] = mArray[i];
    }

    return obj;
}

function GDriveRestoreSettings(backup) {
    var backupItems = Object.keys(backup),
        i = 0,
        len = backupItems.length,
        item = '';

    for (i; i < len; i++) {
        item = backupItems[i];

        //Skip anything that is a app settings
        if (
            item === GDriveConfigItemName ||
            item === AddUser_UserArrayItemName ||
            item === AddUser_UsernameArrayRemovedItemName ||
            item === Main_values_History_data_ItemName
        ) {
            continue;
        }

        Main_setItem(item, backup[item]);
    }
}

// function deleteAllFiles() {
//     // Step 1: Get a list of all files
//     var xhr = new XMLHttpRequest();
//     var listUrl = 'https://www.googleapis.com/drive/v3/files?pageSize=1000';

//     xhr.open('GET', listUrl, true);
//     xhr.setRequestHeader('Authorization', 'Bearer ' + GDriveConfig.accessToken);

//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             var fileList = JSON.parse(xhr.responseText);
//             var files = fileList.files;

//             // Step 2: Delete each file
//             files.forEach(function (file) {
//                 deleteFile(file.id);
//             });
//         } else {
//             console.error('Error listing files:', xhr.statusText, xhr.responseText);
//         }
//     };

//     xhr.onerror = function () {
//         console.error('Error with the request.');
//     };

//     xhr.send();

//     // Step 3: Delete each file by ID
// }

// function deleteFile(fileId) {
//     var deleteXhr = new XMLHttpRequest();
//     var deleteUrl = 'https://www.googleapis.com/drive/v3/files/' + fileId;

//     deleteXhr.open('DELETE', deleteUrl, true);
//     deleteXhr.setRequestHeader('Authorization', 'Bearer ' + GDriveConfig.accessToken);

//     deleteXhr.onload = function () {
//         if (deleteXhr.status === 204) {
//             console.log('File with ID ' + fileId + ' deleted successfully.');
//         } else {
//             console.error('Failed to delete file ' + fileId + ':', deleteXhr.statusText, deleteXhr.responseText);
//         }
//     };

//     deleteXhr.onerror = function () {
//         console.error('Error deleting file ' + fileId + '.');
//     };

//     deleteXhr.send();
// }

function GDriveNeedsSync(date) {
    //skip sync if date is the same or smaller
    if (GDriveConfig.lastBackupDate === date || GDriveConfig.lastBackupDate > date) {
        return false;
    }

    return true;
}

function GDriveSyncFromBackup(backup, date, syncSettings) {
    GDriveSyncFromBackupSyncUser(backup, date);
    GDriveSyncFromBackupSyncUserEtc(backup, date);

    if (syncSettings) {
        GDriveSyncBackupSetting(backup);
    }
}

function GDriveSyncFromBackupSyncUser(backup) {
    var backupUsersArray = JSON.parse(backup[AddUser_UserArrayItemName] || '[]');
    var backupUsersDeletedArray = JSON.parse(backup[AddUser_UsernameArrayRemovedItemName] || '{}');

    if (
        backupUsersArray &&
        backupUsersArray.length &&
        GDriveSyncBackupsByArray(backupUsersArray, AddUser_UsernameArray, backupUsersDeletedArray, AddUser_UsernameArrayRemoved, true)
    ) {
        AddUser_SaveUserArray();
    }
}

function GDriveSyncFromBackupSyncUserEtc(backup) {
    var historyBlocked = JSON.parse(backup[Main_values_History_data_ItemName] || '{}');

    if (historyBlocked) {
        GDriveSyncBackups(historyBlocked);
    }
}

function GDriveRestoreFromBackup(backup, restoreUser, restoreHistoryBlocked, restoreSettings) {
    if (!restoreUser) {
        backup[AddUser_UserArrayItemName] = null;
    }

    if (!restoreHistoryBlocked) {
        backup[Main_values_History_data_ItemName] = null;
    }

    if (backup[AddUser_UserArrayItemName]) {
        Main_setItem(AddUser_UserArrayItemName, backup[AddUser_UserArrayItemName]);
    }

    if (backup[AddUser_UsernameArrayRemovedItemName]) {
        Main_setItem(AddUser_UsernameArrayRemovedItemName, backup[AddUser_UsernameArrayRemovedItemName]);
    }

    if (backup[Main_values_History_data_ItemName]) {
        Main_setItem(Main_values_History_data_ItemName, backup[Main_values_History_data_ItemName]);
    }

    if (restoreSettings) {
        GDriveRestoreSettings(backup);
    }
}
