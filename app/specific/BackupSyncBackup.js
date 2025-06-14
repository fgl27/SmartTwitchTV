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

function GDriveBackupTimeout() {
    GDriveBackupTimeoutID = Main_setTimeout(GDriveBackup, 300 * 1000, GDriveBackupTimeoutID);
}

function GDriveBackup(skipAsync) {
    if (!Settings_value.backup_enabled.defaultValue) {
        return;
    }

    GDriveBackupAsyncID = Main_setTimeout(GDriveBackupStart, skipAsync ? 0 : 5000, GDriveBackupAsyncID);
}

function GDriveBackupStart() {
    if (!GDriveConfig.accessToken || !GDriveCanDoBackup()) {
        return;
    }

    if (!GDriveConfig.fileID) {
        GDriveBackupGetFileInfo();
    } else {
        if (GDriveSyncEnabled()) {
            GDriveDownloadBackupFile(GDriveDownloadBackupFileSuccess, noop_fun, 0, 0);
        } else {
            GDriveUpdateFile();
        }
    }

    GDriveBackupTimeout();
}

function GDriveDownloadBackupFileSuccess(obj) {
    //if has backup sync first
    if (obj.status === 200) {
        GDriveDownloadBackupFileSuccessSync(obj);
    } else if (obj.status === 404) {
        var data = JSON.parse(obj.responseText);

        if (data && data.error && data.error.message && Main_A_includes_B(data.error.message, 'File not found')) {
            GDriveConfig.fileID = null;

            GDriveSaveConfig();
            GDriveBackupStart();

            console.log('GDriveDownloadBackupFileSuccess', data.error.message);
        }

        return;
    } else {
        console.log('GDriveDownloadBackupFileSuccess fail', obj);
    }

    GDriveUpdateFile();
}

function GDriveUpdateFile() {
    GDriveUpdateFileRequest(GDriveUpFileSuccess, noop_fun, 0, 0);
}

function GDriveUpFileSuccess(obj) {
    if (obj.status === 200) {
        GDriveUpFileSuccessSave(obj);
    } else if (obj.status === 404) {
        var data = JSON.parse(obj.responseText);

        if (data && data.error && data.error.message && Main_A_includes_B(data.error.message, 'File not found')) {
            console.log('GDriveUpFileSuccess', data.error.message);

            GDriveConfig.fileID = null;

            GDriveSaveConfig();
            GDriveBackupStart();

            console.log('GDriveDownloadBackupFileSuccess', data.error.message);
        }
    } else {
        Main_textContent('backup_body', STR_BACKUP_ACCOUNT_DIALOG_CODE_FAIL);
    }
}

function GDriveDownloadBackupFileSuccessSync(obj) {
    var backupObj;

    try {
        //The file can be empty or the user change it and/or bricked it
        backupObj = JSON.parse(obj.responseText);
    } catch (error) {
        console.log('GDriveGetBackupFileSuccess try json', error);
        return null;
    }

    var date = JSON.parse(backupObj[GDriveConfigItemName] || '{}').lastBackupDate || new Date().getTime(),
        syncEnabled = Settings_value.sync_enabled.defaultValue,
        doUser = syncEnabled && Settings_value.sync_users.defaultValue,
        doHistory = syncEnabled && Settings_value.sync_history.defaultValue,
        //do not sync settings as it will overwrite the changes
        //we only sync setting on first app start at GDriveGetBackupFileSuccess()
        doSetting = false;

    //skip sync if date is the same or smaller
    if (!GDriveNeedsSync(date)) {
        return;
    }

    if (AddUser_UserIsSet()) {
        GDriveSyncFromBackup(backupObj, doUser, doHistory, doSetting);
    } else {
        //we have no users update the storage items directly
        GDriveRestoreFromBackup(backupObj, doUser, doHistory, doSetting);
        //after make sure to restore users and update the header
        AddUser_RestoreUsers(true);
        Play_SetUserHeader();
    }
}

function GDriveBackupGetFileInfo() {
    GDriveGetFileByName(GDriveBackupGetFileInfoSuccess, noop_fun, 0, 0);
}

function GDriveBackupGetFileInfoSuccess(obj) {
    if (obj.status === 200) {
        GDriveSaveFileInfo(obj);
    } else {
        console.log('GDriveBackupGetFileInfoSuccess fail', obj.responseText);
    }

    if (GDriveConfig.fileID) {
        GDriveBackup();
    } else {
        GDriveUploadFile(GDriveBackupFileSuccess, noop_fun, 0, 0);
    }
}

function GDriveBackupFileSuccess(obj) {
    if (obj.status === 200) {
        GDriveUpFileSuccessSave(obj);
    } else {
        console.log('GDriveBackupFileSuccess fail', obj.responseText);
    }
}
