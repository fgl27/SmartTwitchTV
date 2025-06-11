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

function GDriveStart() {
    GDriveGetCodes(GDriveGetCodesSuccess, noop_fun, 0, 0);
}

function GDriveGetCodesSuccess(obj) {
    if (obj.status === 200) {
        var data = JSON.parse(obj.responseText);
        GDriveDeviceCode = data.device_code;

        //update instruction on the screen
        var urlDiv = STR_DIV_LINK + DefaultMakeLink(data.verification_url) + '</div>',
            codeDiv = STR_BR + STR_BR + data.user_code.replace(/-/g, '') + STR_BR + STR_BR;

        Main_innerHTML('backup_body', STR_ADD_USER_TEXT.replace('%site', urlDiv).replace('%code', codeDiv));
        GDriveCheckCode(GDriveDeviceCodeTimeout);
    } else {
        Main_innerHTML('backup_body', obj.responseText);
    }
}

function GDriveCheckCode(counter) {
    if (counter) {
        Main_textContent('backup_body_checking', STR_ADD_USER_TEXT_COUNTER.replace('%d', counter));

        GDriveCheckCodeId = Main_setTimeout(
            function () {
                GDriveCheckCode(counter - 1);
            },
            1000,
            GDriveCheckCodeId
        );
    } else {
        Main_textContent('backup_body_checking', STR_ADD_USER_TEXT_COUNTER_NOW);
        GDriveCheckDeviceCode(GDriveDeviceCodeSuccess, noop_fun, 0, 0);
    }
}

function GDriveDeviceCodeSuccess(obj) {
    if (obj.status === 200) {
        GDriveSave(JSON.parse(obj.responseText));
    } else if (obj.status === 428) {
        //authorization_pending
        GDriveCheckCode(GDriveDeviceCodeTimeout);
    } else {
        //authorization_fail
        Main_textContent('backup_body', STR_BACKUP_ACCOUNT_DIALOG_CODE_FAIL);
        Main_textContent('backup_body_checking', obj.responseText);
    }
}

function GDriveSave(obj) {
    GDriveConfig.refreshToken = obj.refresh_token;
    GDriveConfig.accessToken = obj.access_token;

    GDriveSetHeader();
    GDriveSetExpires(obj);

    Main_textContent('backup_body', STR_BACKUP_ACCOUNT_DIALOG_CODE_SUCCESS);
    Main_textContent('backup_body_checking', '');
    Main_textContent('backup_end_info', '');

    //Used by browser clicks
    GDrivePreventClose = true;

    GDriveBackupAndSync();
    GDriveGetUserInfo();
    GDriveSaveConfig();
}

function GDriveSaveConfig() {
    Main_setItem(GDriveConfigItemName, JSON.stringify(GDriveConfig));
}

function GDriveBackupAndSync() {
    if (!GDriveCanDoBackup()) {
        return;
    }

    if (!GDriveConfig.fileID) {
        GDriveBackupAndSyncGetFileInfo();
        return;
    }

    GDriveDownloadBackupFile(GDriveBackupAndSyncSuccess, noop_fun, 0, 0);
}

function GDriveBackupAndSyncSuccess(obj) {
    GDriveBackupAndSyncValidate(obj);
}

var GDriveBackupAndSyncValidateBackup;
function GDriveBackupAndSyncValidate(obj) {
    if (obj.status === 200) {
        GDriveBackupAndSyncValidateBackup = JSON.parse(obj.responseText);

        Main_HideElement('backup_dialog');
        Settings_DialogShowRestoreBackup(!Main_IsOn_OSInterface);
    } else {
        console.log('GDriveDoBackupSuccess fail', obj);
        Main_textContent('backup_body', STR_BACKUP_RESTORE_FAIL);
        Main_textContent('backup_end_info', STR_CLOSE_THIS);
    }
}

function GDriveBackupAndSyncRunRestore() {
    var backupObj = GDriveBackupAndSyncValidateBackup,
        date = JSON.parse(backupObj[GDriveConfigItemName] || '{}').lastBackupDate || new Date().getTime(),
        syncEnabled = Settings_value.sync_enabled.defaultValue,
        doUser = syncEnabled && Settings_value.sync_users.defaultValue,
        doHistory = syncEnabled && Settings_value.sync_history.defaultValue,
        doSetting = syncEnabled && Settings_value.sync_settings.defaultValue,
        refresh;

    if (AddUser_UserIsSet()) {
        GDriveSyncFromBackup(backupObj, doUser, doHistory, doSetting);

        refresh = doSetting;
    } else {
        GDriveRestoreFromBackup(backupObj, doUser, doHistory, doSetting);
        refresh = true;
    }

    if (refresh) {
        OSInterface_showToast(STR_BACKUP_SYNC_RESTORE_SUCCESS);
        GDriveRefresh();
    } else {
        Main_showWarningDialog(STR_BACKUP_SYNC_RESTORE_SUCCESS, 3000);
    }
}

function GDriveBackupAndSyncGetFileInfo() {
    GDriveGetFileByName(GDriveBackupAndSyncGetFileInfoSuccess, noop_fun, 0, 0);
}

function GDriveBackupAndSyncGetFileInfoSuccess(obj) {
    if (obj.status === 200) {
        GDriveSaveFileInfo(obj);
    } else {
        console.log('GDriveGetFileInfoSuccess fail', obj.responseText);
    }

    if (GDriveConfig.fileID) {
        GDriveBackupAndSync();
    } else {
        GDriveUploadFile(GDriveBackupFileSuccess, noop_fun, 0, 0);

        var extraSummary = !Settings_Dialog_isVisible() ? STR_BR + STR_BR + STR_BACKUP_NO_BACKUP_FOUND_SUMMARY : '';

        Main_innerHTML('backup_body', STR_BACKUP_NO_BACKUP_FOUND + extraSummary);
        Main_textContent('backup_body_checking', '');
        Main_textContent('backup_end_info', STR_CLOSE_THIS);
        GDrivePreventClose = false;
    }
}
