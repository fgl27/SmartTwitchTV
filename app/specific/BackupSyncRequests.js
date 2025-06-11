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

function GDriveGetCodes(callbackSuccess, callbackError, key_1, key_2) {
    var body =
        'client_id=' +
        encodeURIComponent(GDriveClientKey) +
        '&' +
        'scope=' +
        encodeURIComponent('https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email');

    FullxmlHttpGet(GDriveCode, GDriveDefaultBodyToken, callbackSuccess, callbackError, key_1, key_2, 'POST', body);
}

function GDriveCheckDeviceCode(callbackSuccess, callbackError, key_1, key_2) {
    var body =
        'grant_type=' +
        encodeURIComponent('urn:ietf:params:oauth:grant-type:device_code') +
        '&' +
        'client_id=' +
        encodeURIComponent(GDriveClientKey) +
        '&' +
        'client_secret=' +
        GDriveKey +
        '&' +
        'device_code=' +
        encodeURIComponent(GDriveDeviceCode);

    FullxmlHttpGet(GDriveToken, GDriveDefaultBodyToken, callbackSuccess, callbackError, key_1, key_2, 'POST', body);
}

function GDriveValidateAccessToken(callbackSuccess, callbackError, key_1, key_2) {
    var theUrl = GDriveValidateTokenUrl + GDriveConfig.accessToken;

    FullxmlHttpGet(theUrl, null, callbackSuccess, callbackError, key_1, key_2, 'POST', null);
}

function GDriveRefreshAccessToken(callbackSuccess, callbackError, key_1, key_2) {
    var body =
        'grant_type=refresh_token' +
        '&' +
        'client_id=' +
        encodeURIComponent(GDriveClientKey) +
        '&' +
        'client_secret=' +
        GDriveKey +
        '&' +
        'refresh_token=' +
        encodeURIComponent(GDriveConfig.refreshToken);

    FullxmlHttpGet(GDriveToken, GDriveDefaultBodyToken, callbackSuccess, callbackError, key_1, key_2, 'POST', body);
}

function GDriveGetFileByName(callbackSuccess, callbackError, key_1, key_2) {
    FullxmlHttpGet(
        GDriveFileIdUrl.replace('%x', "name='" + encodeURIComponent(GDriveFileName) + "' and trashed=false"),
        GDriveConfig.header,
        callbackSuccess,
        callbackError,
        key_1,
        key_2,
        null, //null = GET
        null
    );
}

function GDriveUploadFile(callbackSuccess, callbackError, key_1, key_2) {
    var header = JSON.parse(JSON.stringify(GDriveConfig.header));
    header.push(['Content-Type', 'multipart/related; boundary=' + GDriveBoundary]);

    var body =
        '--' +
        GDriveBoundary +
        '\r\n' +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        GDriveMetadata +
        '\r\n' +
        '--' +
        GDriveBoundary +
        '\r\n' +
        'Content-Type: application/json\r\n\r\n' +
        GDriveGetBackupFileContent() +
        '\r\n' +
        '--' +
        GDriveBoundary +
        '--';

    FullxmlHttpGet(GDriveUploadNewUrl, header, callbackSuccess, callbackError, key_1, key_2, 'POST', body);
}

function GDriveUpdateFile2(callbackSuccess, callbackError, key_1, key_2) {
    FullxmlHttpGet(
        GDriveUpdateUrl.replace('%x', encodeURIComponent(GDriveConfig.fileID)),
        GDriveConfig.header,
        callbackSuccess,
        callbackError,
        key_1,
        key_2,
        'PATCH',
        GDriveGetBackupFileContent()
    );
}

function GDriveDownloadBackupFile(callbackSuccess, callbackError, key_1, key_2) {
    FullxmlHttpGet(
        GDriveDownLoadUrl.replace('%x', GDriveConfig.fileID),
        GDriveConfig.header,
        callbackSuccess,
        callbackError,
        key_1,
        key_2,
        null,
        null
    );
}

function GDriveUserInfo(callbackSuccess, callbackError, key_1, key_2) {
    FullxmlHttpGet(GDriveUserInfoURL, GDriveConfig.header, callbackSuccess, callbackError, key_1, key_2, null, null);
}
