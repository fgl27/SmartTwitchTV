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
    GDriveConfig = Main_getItemJson(GDriveConfigItemName, {});
    GDriveDoBackupCall = Main_getItemJson(GDriveDoBackupCallItemName, []);

    if (!GDriveSyncEnabled()) {
        GDriveCheckMainStarted();
    }

    if (GDriveConfig.accessToken) {
        GDriveValidateToken();
        return;
    }

    GDriveCheckMainStarted();
}

function GDriveSyncEnabled() {
    return (
        Settings_value.sync_enabled.defaultValue &&
        (Settings_value.sync_users.defaultValue || Settings_value.sync_history.defaultValue || Settings_value.sync_settings.defaultValue)
    );
}

function GDriveValidateToken() {
    if (GDriveConfig.backupExpiresTime > new Date().getTime()) {
        GDriveSetExpiresId(GDriveConfig.backupExpiresTime - new Date().getTime());

        GDriveRestoreStart();
        return;
    }

    GDriveValidateAccessToken(GDriveValidateTokenSuccess, noop_fun, 0, 0);
}

function GDriveValidateTokenSuccess(obj) {
    if (obj.status === 200) {
        GDriveSetExpires(JSON.parse(obj.responseText));

        GDriveRestoreStart();
    } else {
        //expired or no longer has access to Gdrive
        //Only on 401 we erase Gdrive configuration
        //GDriveValidateAccessToken only returns 200 or 400
        GDriveValidateTokenRefreshAccessToken();
    }
}

function GDriveRestoreStart() {
    if (GDriveSyncEnabled()) {
        GDriveGetBackupFile();
    }

    GDriveGetUserInfo();
}

function GDriveGetUserInfo() {
    GDriveUserInfo(GDriveGetUserInfoSuccess, noop_fun, 0, 0);
}

function GDriveGetUserInfoSuccess(obj) {
    if (obj.status === 200) {
        var data = JSON.parse(obj.responseText);

        GDriveConfig.userEmail = data.email;
        GDriveConfig.userImgURL = data.picture;

        GDriveSaveConfig();
        Main_ImageLoaderWorker.postMessage(GDriveConfig.userImgURL);

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
        GDriveConfig.accessToken = data.access_token;

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
    if (!GDriveConfig.fileID) {
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

    GDriveConfig.backupSize = formatFileSize(data.files[0].size);
    GDriveConfig.fileID = data.files[0].id;

    GDriveSaveConfig();
}

function GDriveGetFileInfoSuccess(obj) {
    if (obj.status === 200) {
        GDriveSaveFileInfo(obj);
    } else {
        console.log('GDriveGetFileInfoSuccess fail', obj.responseText);
        GDriveCheckMainStarted();
    }

    if (GDriveConfig.fileID) {
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

        GDriveSyncBackupFile(backupObj);

        return;
    } else if (obj.status === 404) {
        var data = JSON.parse(obj.responseText);

        if (data && data.error && data.error.message && Main_A_includes_B(data.error.message, 'File not found')) {
            GDriveConfig.fileID = null;

            GDriveSaveConfig();
            GDriveGetFileInfo();

            console.log('GDriveGetBackupFileSuccess', data.error.message);
        }

        return;
    }

    GDriveCheckMainStarted();
}

function GDriveSyncBackupFile(backup) {
    var date = JSON.parse(backup[GDriveConfigItemName] || '{}').lastBackupDate || new Date().getTime(),
        syncEnabled = Settings_value.sync_enabled.defaultValue,
        doUser = syncEnabled && Settings_value.sync_users.defaultValue,
        doHistory = syncEnabled && Settings_value.sync_history.defaultValue,
        doSetting = syncEnabled && Settings_value.sync_settings.defaultValue;

    //skip sync if date is the same or smaller
    if (!GDriveNeedsSync(date)) {
        GDriveCheckMainStarted();
        return;
    }

    if (AddUser_UserIsSet()) {
        GDriveSyncFromBackup(backup, doUser, doHistory, doSetting);

        if (doUser) {
            GDriveCheckMainUser(backup);
        }
    } else {
        //we have no users update the storage items directly
        GDriveRestoreFromBackup(backup, doUser, doHistory, doSetting);
        //after make sure to restore users and update the main values as they may have changed
        AddUser_RestoreUsers(true);
        Main_RestoreValues();
    }

    GDriveCheckMainStarted();
}

function GDriveCheckMainUser(backup) {
    var backupUsersArray = JSON.parse(backup[AddUser_UserArrayItemName] || '[]');

    if (backupUsersArray.length && AddUser_UsernameArray.length && backupUsersArray[0].id !== AddUser_UsernameArray[0].id) {
        var position = AddUser_UserFindPos(backupUsersArray[0].id);

        if (position > -1) {
            AddUser_UserMakeOne(position, true);
        }
    }
}

function GDriveCheckMainStarted() {
    if (Main_started) {
        return;
    }

    Main_initWindows();
}
