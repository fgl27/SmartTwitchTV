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

function GDriveRestore() {
    GDriveRefreshToken = Main_getItemString('GDriveRefreshToken', null);
    GDriveAccessToken = Main_getItemString('GDriveAccessToken', null);

    GDriveUserEmail = Main_getItemString('GDriveUserEmail', null);
    GDriveUserImgURL = Main_getItemString('GDriveUserImgURL', null);
    GDriveFileID = Main_getItemString('GDriveFileID', null);
    GDriveLastBackupDate = Main_getItemInt('GDriveLastBackupDate', 0);
    GDriveBackupSize = Main_getItemString('GDriveBackupSize', null);
    GDriveDoBackupCall = Main_getItemJson('GDriveDoBackupCall', []);
    GDriveBackupExpiresTime = Main_getItemInt('GDriveBackupExpiresTime', 0);
    GDriveSetHeader();

    if (GDriveAccessToken && Settings_value.sync_enabled.defaultValue) {
        GDriveValidateToken();
    } else {
        GDriveCheckMainStarted();
    }
}

function GDriveValidateToken() {
    if (GDriveBackupExpiresTime > new Date().getTime()) {
        GDriveSetExpiresId(GDriveBackupExpiresTime - new Date().getTime());

        GDriveGetBackupFile();
        GDriveGetUserInfo();

        return;
    }

    GDriveValidateAccessToken(GDriveValidateTokenSuccess, noop_fun, 0, 0);
}

function GDriveValidateTokenSuccess(obj) {
    if (obj.status === 200) {
        GDriveSetExpires(JSON.parse(obj.responseText));

        GDriveGetBackupFile();
        GDriveGetUserInfo();
    } else {
        //expired or no longer has access to Gdrive
        //Only on 401 we erase Gdrive configuration
        //GDriveValidateAccessToken only returns 200 or 400
        GDriveValidateTokenRefreshAccessToken();
    }
}

function GDriveGetUserInfo() {
    GDriveUserInfo(GDriveGetUserInfoSuccess, noop_fun, 0, 0);
}

function GDriveGetUserInfoSuccess(obj) {
    if (obj.status === 200) {
        var data = JSON.parse(obj.responseText);

        GDriveUserEmail = data.email;
        GDriveUserImgURL = data.picture;

        Main_setItem('GDriveUserEmail', GDriveUserEmail);
        Main_setItem('GDriveUserImgURL', GDriveUserImgURL);
        Main_ImageLoaderWorker.postMessage(GDriveUserImgURL);

        if (Settings_Dialog_isVisible()) {
            Settings_DialogBackupSync();
        }
    }
}

function GDriveValidateTokenRefreshAccessToken() {
    GDriveRefreshAccessToken(GDriveRefreshSuccess, noop_fun, 0, 0);
}

function GDriveRefreshSuccess(obj) {
    if (obj.status === 200) {
        var data = JSON.parse(obj.responseText);
        GDriveAccessToken = data.access_token;

        Main_setItem('GDriveAccessToken', GDriveAccessToken);

        GDriveSetHeader();
        GDriveSetExpires(data);

        GDriveGetBackupFile();
    } else if (obj.status === 401) {
        //401 lost access need to erase the config let the user know
        Main_PlayMainShowWarning(STR_BACKUP_ACCOUNT_REFRESH_ERROR, 7500, true);
        GDriveErase();
    } else {
        GDriveCheckMainStarted();
    }
}

function GDriveGetBackupFile() {
    if (!GDriveFileID) {
        GDriveGetFileInfo();
        return;
    }

    if (!GDriveCanDoBackup()) {
        console.log('GDriveGetBackupFile GDriveCanDoBackup return');
        GDriveCheckMainStarted();
        return;
    }

    GDriveDownloadBackupFile(GDriveGetBackupFileSuccess, noop_fun, 0, 0);
}

function GDriveGetFileInfo() {
    GDriveGetFileByName(GDriveGetFileInfoSuccess, noop_fun, 0, 0);
}

function GDriveSaveFileInfo(obj) {
    var data = JSON.parse(obj.responseText);

    if (!data.files || !data.files.length) {
        return;
    }

    GDriveBackupSize = formatFileSize(data.files[0].size);
    GDriveFileID = data.files[0].id;

    Main_setItem('GDriveBackupSize', GDriveBackupSize);
    Main_setItem('GDriveFileID', GDriveFileID);
}

function GDriveGetFileInfoSuccess(obj) {
    if (obj.status === 200) {
        GDriveSaveFileInfo(obj);
    } else {
        console.log('GDriveGetFileInfoSuccess fail', obj.responseText);
        GDriveCheckMainStarted();
    }

    if (GDriveFileID) {
        GDriveGetBackupFile();
    } else {
        GDriveUploadFile(GDriveBackupFileFromRestore, noop_fun, 0, 0);
    }
}

function GDriveBackupFileFromRestore(obj) {
    if (obj.status === 200) {
        GDriveUpFileSuccessSave(obj);
    } else {
        console.log('GDriveUpFileSuccess fail', obj.responseText);
    }

    GDriveCheckMainStarted();
}

function GDriveGetBackupFileSuccess(obj) {
    //if has backup sync first
    if (obj.status === 200) {
        var backupObj;

        try {
            //The file can be empty of the user change it and/or bricked it
            backupObj = JSON.parse(obj.responseText);
        } catch (error) {
            console.log('GDriveGetBackupFileSuccess try json', error);
            GDriveCheckMainStarted();
            return;
        }

        if (AddUser_UserIsSet()) {
            GDriveSyncBackupFile(backupObj);
        } else {
            GDriveRestoreBackupFile(backupObj, true, true, true);
        }

        return;
    } else if (obj.status === 404) {
        var data = JSON.parse(obj.responseText);

        if (data && data.error && data.error.message && Main_A_includes_B(data.error.message, 'File not found')) {
            GDriveFileID = null;
            localStorage.removeItem('GDriveFileID');

            GDriveGetFileInfo();
        }
        return;
    }

    GDriveCheckMainStarted();
}

function GDriveSyncBackupFile(backup) {
    var date = JSON.parse(backup[GDriveBackupDateItemName]) || new Date().getTime();

    //skip sync if date is the same or smaller
    if (!GDriveNeedsSync(date)) {
        GDriveCheckMainStarted();
        return;
    }

    GDriveSyncFromBackup(backup, date, true);

    GDriveCheckMainStarted();
}

function GDriveRestoreBackupFile(backup, restoreUser, restoreHistoryBlocked, restoreSettings) {
    GDriveRestoreFromBackup(backup, restoreUser, restoreHistoryBlocked, restoreSettings);

    GDriveCheckMainStarted();
}

function GDriveCheckMainStarted() {
    if (Main_started) {
        return;
    }

    Main_initWindows();
}
