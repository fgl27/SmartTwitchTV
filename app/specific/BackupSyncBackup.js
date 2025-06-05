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
    GDriveBackupTimeoutID = Main_setTimeout(GDriveBackup, 200 * 1000, GDriveBackupTimeoutID);
}

function GDriveBackup(skipAsync) {
    if (!Settings_value.backup_enabled.defaultValue) {
        return;
    }

    GDriveBackupAsyncID = Main_setTimeout(GDriveBackupStart, skipAsync ? 0 : 5000, GDriveBackupAsyncID);
}

function GDriveBackupStart() {
    if (!GDriveAccessToken || !GDriveCanDoBackup()) {
        return;
    }

    if (!GDriveFileID) {
        GDriveBackupGetFileInfo();
    } else {
        GDriveDownloadBackupFile(GDriveDownloadBackupFileSuccess, noop_fun, 0, 0);
    }

    GDriveBackupTimeout();
}

function GDriveDownloadBackupFileSuccess(obj) {
    //if has backup sync first
    if (obj.status === 200) {
        GDriveDownloadBackupFileSuccessSync(obj);
        GDriveUpdateFile();
    } else {
        console.log('GDriveDownloadBackupFileSuccess fail', obj);
    }
}

function GDriveDownloadBackupFileSuccessSync(obj) {
    var backupObj;

    try {
        //The file can be empty of the user change it and/or bricked it
        backupObj = JSON.parse(obj.responseText);
    } catch (error) {
        console.log('GDriveGetBackupFileSuccess try json', error);
        return null; //fail
    }

    if (AddUser_UserIsSet()) {
        GDriveDownloadSyncFromBackup(backupObj);
    } else {
        GDriveRestoreFromBackup(backupObj, true, true, true);
    }

    return backupObj; //Success
}

function GDriveDownloadSyncFromBackup(backup) {
    var date = JSON.parse(backup[GDriveBackupDateItemName]) || new Date().getTime();

    GDriveSyncFromBackup(backup, date);
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

    if (GDriveFileID) {
        GDriveBackup();
    } else {
        GDriveUploadFile(GDriveBackupFileSuccess, noop_fun, 0, 0);
    }
}

function GDriveBackupFileSuccess(obj) {
    if (obj.status === 200) {
        GDriveUpFileSuccessSave(obj);
    } else {
    }
}
