/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
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

var SettingsColor_DefaultColorsPos = 0;
//Add a new Theme add the array pos + a name on STR_STYLES_ARRAY that is it
var SettingsColor_DefaultColors = [
    [
        //Default
        'rgba(0,0,0,1)', //background
        'rgba(255,255,255,1)', //TextColor
        'rgba(235,235,235,1)', //border
        'rgba(195,0,0,1)' //progressColor
    ],
    [], //Custom
    [
        //White
        'rgba(235,235,235,1)',
        'rgba(0,0,0,1)',
        'rgba(235,235,235,1)',
        'rgba(195,0,0,1)'
    ],
    [
        //Grey
        'rgba(56,56,56,1)',
        'rgba(255,255,255,1)',
        'rgba(56,56,56,1)',
        'rgba(195,0,0,1)'
    ],
    [
        //Red
        'rgba(235,0,0,1)',
        'rgba(255,255,255,1)',
        'rgba(235,0,0,1)',
        'rgba(255,255,255,1)'
    ],
    [
        //Orange
        'rgba(255,75,0,1)',
        'rgba(255,255,255,1)',
        'rgba(255,75,0,1)',
        'rgba(255,255,255,1)'
    ],
    [
        //Yellow
        'rgba(255,208,0,1)',
        'rgba(0,0,0,1)',
        'rgba(255,208,0,1)',
        'rgba(255,0,0,1)'
    ],
    [
        //Green
        'rgba(0,200,0,1)',
        'rgba(0,0,0,1)',
        'rgba(0,200,0,1)',
        'rgba(255,0,0,1)'
    ],
    [
        //Blue
        'rgba(0,0,255,1)',
        'rgba(255,255,255,1)',
        'rgba(0,0,255,1)',
        'rgba(255,0,0,1)'
    ],
    [
        //Purple
        'rgba(100,65,164,1)',
        'rgba(255,255,255,1)',
        'rgba(100,65,164,1)',
        'rgba(255,0,0,1)'
    ],
    [
        //Pink
        'rgba(255,0,180,1)',
        'rgba(255,255,255,1)',
        'rgba(255,0,180,1)',
        'rgba(255,255,255,1)'
    ]
];
var SettingsColor_DefaultColors_Len = SettingsColor_DefaultColors[0].length;

var SettingsColor_InitialColors = [];

var SettingsColor_DialogColorPosStep = 0.5;
var SettingsColor_DialogColorPosMax = 99.5;
var SettingsColor_canvasPosY = 2;
var SettingsColor_canvasPosX;
var SettingsColor_canvasDiv;
var SettingsColor_DivColorResult;
var SettingsColor_canvasPosDiv;
var SettingsColor_canvasDivContext;

var SettingsColor_ColorsObjCavasShadow = 0;
var SettingsColor_ColorsObjCavasColor = 1;
var SettingsColor_ColorsObjStyles = 2;
var SettingsColor_ColorsObjApply = 3;
var SettingsColor_ColorsObjColorType = 4;
var SettingsColor_ColorsObjR = 5;
var SettingsColor_ColorsObjG = 6;
var SettingsColor_ColorsObjB = 7;
var SettingsColor_ColorsObj = {};

var SettingsColor_DialogColorsResultRGBA;
var SettingsColor_ColorTemp;
var SettingsColor_RBG_temp;

function SettingsColor_DialogColorsShow() {
    if (!SettingsColor_canvasDivContext) SettingsColor_DialogColorsStart();

    Main_ShowElement('dialog_color');
    Main_removeEventListener('keydown', Settings_DialoghandleKeyDown);
    Main_addEventListener('keydown', SettingsColor_DialogColorKeyDown);
    SettingsColor_canvasPosY = 2;
    SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].pos = SettingsColor_DefaultColorsPos;

    SettingsColor_ColorsReset(SettingsColor_ColorsObj[SettingsColor_canvasPosY], SettingsColor_ColorsObj[SettingsColor_canvasPosY].pos);

    SettingsColor_ColorsObj[SettingsColor_canvasPosY].focus();
}

function SettingsColor_DialogColorsHide() {
    Main_HideElement('dialog_color');
    Main_removeEventListener('keydown', SettingsColor_DialogColorKeyDown);
    Main_addEventListener('keydown', Settings_DialoghandleKeyDown);
    SettingsColor_ColorsObj[SettingsColor_canvasPosY].removefocus();
}

function SettingsColor_DialogisVisible() {
    return Main_isElementShowing('dialog_color');
}

function SettingsColor_DialogColorKeyDown(event) {
    switch (event.keyCode) {
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            SettingsColor_DialogColorsHide();
            break;
        case KEY_LEFT:
            SettingsColor_ColorsObj[SettingsColor_canvasPosY].left();
            break;
        case KEY_RIGHT:
            SettingsColor_ColorsObj[SettingsColor_canvasPosY].right();
            break;
        case KEY_UP:
            SettingsColor_ColorsObj[SettingsColor_canvasPosY].removefocus();
            SettingsColor_canvasPosY--;
            if (SettingsColor_canvasPosY < 0) SettingsColor_canvasPosY = 0;
            SettingsColor_ColorsObj[SettingsColor_canvasPosY].focus();
            break;
        case KEY_DOWN:
            SettingsColor_ColorsObj[SettingsColor_canvasPosY].removefocus();
            SettingsColor_canvasPosY++;
            if (SettingsColor_canvasPosY > 7) SettingsColor_canvasPosY = 7;
            SettingsColor_ColorsObj[SettingsColor_canvasPosY].focus();
            break;
        case KEY_ENTER:
            if (SettingsColor_ColorsObj[SettingsColor_canvasPosY].enter) SettingsColor_ColorsObj[SettingsColor_canvasPosY].enter();
            break;
        default:
            break;
    }
}

function SettingsColor_DivShadowsUpdate() {
    SettingsColor_canvasPosDiv[0].style.left = SettingsColor_canvasPosX[0] + '%';
    SettingsColor_DialogColorsResultSet();
}

function SettingsColor_DivColorsUpdate() {
    SettingsColor_DivShadowsSet();
    SettingsColor_DialogColorsResultSet();
}

function SettingsColor_DialogColorsGet() {
    SettingsColor_canvasPosDiv[1].style.left = SettingsColor_canvasPosX[1] + '%';

    var imgData = SettingsColor_canvasDivContext[1].getImageData(SettingsColor_canvasPosX[1], 50, 1, 1),
        rgba = imgData.data;

    return 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', 1)';
}

function SettingsColor_DialogColorsResultSet() {
    SettingsColor_ColorUPdateResult(SettingsColor_canvasDivContext[0].getImageData(SettingsColor_canvasPosX[0], 50, 1, 1).data);
}

function SettingsColor_ColorUPdateResult(rgba) {
    SettingsColor_ColorTemp = 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', 1)';

    SettingsColor_DivColorResult.style.backgroundColor = SettingsColor_ColorTemp;

    Main_textContent('cavas_text2', STR_RESULT + ' R: ' + rgba[0] + ' G: ' + rgba[1] + ' B: ' + rgba[2]);
    SettingsColor_DialogColorsResultRGBA = rgba;
    SettingsColor_ColorsSetRGBTest();
}

function SettingsColor_DivShadowsSet() {
    var color = SettingsColor_DialogColorsGet();
    var gradient = SettingsColor_canvasDivContext[0].createLinearGradient(0, 0, SettingsColor_canvasDiv[0].width, 0);

    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color);

    SettingsColor_canvasDivContext[0].fillStyle = gradient;
    SettingsColor_canvasDivContext[0].fillRect(0, 0, SettingsColor_canvasDiv[0].width, SettingsColor_canvasDiv[0].height);

    gradient = SettingsColor_canvasDivContext[0].createLinearGradient(0, 0, SettingsColor_canvasDiv[0].width, 0);

    gradient.addColorStop(0.04, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.36, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.36, 'rgba(125, 125, 125, 1)');
    gradient.addColorStop(0.68, 'rgba(125, 125, 125, 0)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

    SettingsColor_canvasDivContext[0].fillStyle = gradient;
    SettingsColor_canvasDivContext[0].fillRect(0, 0, SettingsColor_canvasDiv[0].width, SettingsColor_canvasDiv[0].height);
}

function SettingsColor_DialogColorsStart() {
    SettingsColor_SetColorsObj();

    var DivContent = '';

    DivContent += SettingsColor_DivColorText('color_options' + SettingsColor_ColorsObjStyles, STR_STYLES, STR_STYLES_ARRAY.split(',')[0]);
    DivContent += SettingsColor_DivColorText('color_options' + SettingsColor_ColorsObjApply, STR_APPLY, STR_ENTER);
    DivContent += SettingsColor_DivColorText('color_options' + SettingsColor_ColorsObjColorType, STR_COLOR_TYPE, STR_COLOR_ARRAY.split(',')[0]);
    DivContent += SettingsColor_DivColorText(
        'color_options' + SettingsColor_ColorsObjR,
        'R',
        SettingsColor_ColorsObj[SettingsColor_ColorsObjR].pos[0]
    );
    DivContent += SettingsColor_DivColorText(
        'color_options' + SettingsColor_ColorsObjG,
        'G',
        SettingsColor_ColorsObj[SettingsColor_ColorsObjG].pos[0]
    );
    DivContent +=
        SettingsColor_DivColorText('color_options' + SettingsColor_ColorsObjB, 'B', SettingsColor_ColorsObj[SettingsColor_ColorsObjB].pos[0]) +
        STR_BR +
        STR_BR;

    Main_innerHTML('dialog_color_options', DivContent);

    Main_textContent('cavas_text0', STR_SHADOWS);
    Main_textContent('cavas_text1', STR_COLORS);
    Main_textContent('cavas_text2', STR_RESULT);
    Main_textContent('dialog_color_text', STR_COLOR_STYLE_TEXT);

    Main_textContent('cavas_shadows0', STR_SHADOWS_NONE);
    Main_textContent('cavas_shadows1', STR_SHADOWS_WHITE);
    Main_textContent('cavas_shadows2', STR_SHADOWS_GRAY);
    Main_textContent('cavas_shadows3', STR_SHADOWS_BLACK);

    SettingsColor_DivColorResult = Main_getElementById('color_result');
    SettingsColor_canvasPosX = [];
    SettingsColor_canvasPosX[0] = 0;
    SettingsColor_canvasPosX[1] = 0;

    SettingsColor_canvasPosDiv = [];
    SettingsColor_canvasPosDiv[0] = Main_getElementById('colorCanvas_pos0');
    SettingsColor_canvasPosDiv[1] = Main_getElementById('colorCanvas_pos1');

    SettingsColor_canvasDiv = [];
    SettingsColor_canvasDivContext = [];

    SettingsColor_canvasDiv[0] = Main_getElementById('colorCanvas0');
    SettingsColor_canvasDiv[1] = Main_getElementById('colorCanvas1');
    SettingsColor_canvasDivContext[0] = SettingsColor_canvasDiv[0].getContext('2d');
    SettingsColor_canvasDivContext[1] = SettingsColor_canvasDiv[1].getContext('2d');

    var offset = 0.008;
    var divider = 8;
    var gradient = SettingsColor_canvasDivContext[1].createLinearGradient(0, 0, SettingsColor_canvasDiv[1].width, 0);
    //Separate it color with a offset so that they look defined
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(offset, '#ff0000');

    gradient.addColorStop(1 / divider, '#ffff00');
    gradient.addColorStop(1 / divider + offset, '#ffff00');

    gradient.addColorStop((1 / divider) * 2, '#00ff00');
    gradient.addColorStop((1 / divider) * 2 + offset, '#00ff00');

    gradient.addColorStop((1 / divider) * 3, '#00ffff');
    gradient.addColorStop((1 / divider) * 3 + offset, '#00ffff');

    gradient.addColorStop((1 / divider) * 4, '#0000ff');
    gradient.addColorStop((1 / divider) * 4 + offset, '#0000ff');

    gradient.addColorStop((1 / divider) * 5, '#ff00ff');
    gradient.addColorStop((1 / divider) * 5 + offset, '#ff00ff');

    gradient.addColorStop((1 / divider) * 6, '#ff0000');
    gradient.addColorStop((1 / divider) * 6 + offset, '#ff0000');

    gradient.addColorStop((1 / divider) * 7, '#ffffff');
    gradient.addColorStop((1 / divider) * 7 + offset, '#ffffff');

    gradient.addColorStop(1 - offset, '#000000');
    gradient.addColorStop(1, '#000000');
    SettingsColor_canvasDivContext[1].fillStyle = gradient;
    SettingsColor_canvasDivContext[1].fillRect(0, 0, SettingsColor_canvasDiv[1].width, SettingsColor_canvasDiv[1].height);

    SettingsColor_canvasPosDiv[0].style.left = 0;
    SettingsColor_DivColorsUpdate();

    Main_getElementById('color_thumb0_img').src = IMG_404_VIDEO;
    Main_AddClass('color_thumb0', 'stream_thumbnail_focused_no_ani');
    SettingsColor_DivResultUpdate('color_thumb0_text', STR_CURRENT_THUMB_STYLE);

    Main_getElementById('color_thumb1_img').src = IMG_404_VIDEO;
    SettingsColor_DivResultUpdate('color_thumb1_text', STR_NEW_THUMB_STYLE);
}

function SettingsColor_DivColorText(key, title, result) {
    return (
        '<div id="' +
        key +
        '_div" class="settings_div" style="width: 96%;"><div id="' +
        key +
        '_name" class="settings_name color_name">' +
        title +
        '</div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        'arrow_left" class="left"></div></div>' +
        '<div id="' +
        key +
        '" class="strokedeline settings_value">' +
        result +
        '</div>' +
        '<div class="settings_arraw_div"><div id="' +
        key +
        'arrow_right" class="right"></div></div></div>'
    );
}

function SettingsColor_DivResultUpdate(div, text) {
    Main_innerHTML(
        div,
        '<i class="icon-circle live_icon strokedeline" style="color: red;"></i>' +
            STR_SPACE_HTML +
            '<i class="icon-circle live_icon strokedeline" style="color: #FED000;">' +
            STR_SPACE_HTML +
            '</i><i class="icon-circle live_icon strokedeline" style="color: #00a94b;"></i>' +
            STR_SPACE_HTML +
            '</i><i class="icon-refresh live_icon strokedeline" style="color: #FFFFFF;"></i>' +
            STR_SPACE_HTML +
            text
    );
}

function SettingsColor_ColorExtrackRGB(DefaultColorsPos) {
    var rgba = [],
        tempArray = [],
        i = 0,
        len = DefaultColorsPos.length;

    for (i; i < len; i++) {
        tempArray.push(DefaultColorsPos[i].replace(/\s/g, '').split('(')[1].split(','));
    }

    i = 0;
    len = tempArray.length;
    for (i; i < len; i++) {
        rgba.push([parseInt(tempArray[0][i]), parseInt(tempArray[1][i]), parseInt(tempArray[2][i]), parseInt(tempArray[3][i])]);
    }

    return rgba;
}

function SettingsColor_SetAnimationStyleRestore() {
    SettingsColor_DefaultColorsPos = Main_getItemInt('SettingsColor_ColorsObj' + SettingsColor_ColorsObjStyles, 0);

    //Workaround to fix color as default changed to black that was pos 2 now 0
    if (!Main_getItemInt('SettingsColor_DefaultColorsPos_check', 0) && SettingsColor_DefaultColorsPos === 2) {
        SettingsColor_DefaultColorsPos = 0;
        Main_setItem('SettingsColor_ColorsObj' + SettingsColor_ColorsObjStyles, SettingsColor_DefaultColorsPos);
        Main_setItem('SettingsColor_DefaultColorsPos_check', 1);
    }

    SettingsColor_InitialColors = SettingsColor_ColorExtrackRGB(SettingsColor_DefaultColors[0]);
    //Restore custom color
    var rgba = [],
        i = SettingsColor_ColorsObjR,
        len = SettingsColor_ColorsObjB + 1;

    for (i; i < len; i++) {
        rgba.push(Main_getItemJson('colo_rgb' + i, SettingsColor_InitialColors[i - SettingsColor_ColorsObjR]));
    }

    i = 0;
    len = SettingsColor_DefaultColors_Len;
    for (i; i < len; i++) {
        SettingsColor_DefaultColors[1][i] = 'rgba(' + rgba[0][i] + ', ' + rgba[1][i] + ', ' + rgba[2][i] + ', 1)';
    }

    SettingsColor_SetAnimationStyle(SettingsColor_DefaultColorsPos);
}

function SettingsColor_SetAnimationStyle(pos) {
    var animate = Settings_Obj_default('app_animations'),
        background = SettingsColor_DefaultColors[pos][0],
        TextColor = SettingsColor_DefaultColors[pos][1],
        border = SettingsColor_DefaultColors[pos][2],
        progressColor = SettingsColor_DefaultColors[pos][3],
        cssClass =
            '.feed_thumbnail_focused_no_ani,.feed_thumbnail_focused,.stream_thumbnail_focused_no_ani,.stream_thumbnail_focused {background-color:' +
            background +
            ' !important;color:' +
            TextColor +
            ' !important;border-color:' +
            border +
            ' !important;}' +
            //feed_thumbnail_focused same animation time as user_feed_scroll
            '.feed_thumbnail_focused {transition:background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s,color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s,border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s;}' +
            //stream_thumbnail_focused same animation time as animate_height_transition
            '.stream_thumbnail_focused {transition:background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s,border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s;}';

    cssClass +=
        '.vod_watched{background:' +
        progressColor +
        ' !important;height:1.5%;max-width:100%;position:absolute;bottom:0;transform:translateY(150%);' +
        (animate ? 'transition: width 1s linear;' : '') +
        '}';

    Main_innerHTML('focus_class_holder', cssClass);

    SettingsColor_SetAnimationStyleTest([background, TextColor, border, progressColor]);
}

function SettingsColor_SetAnimationStyleTest(arrayColors) {
    var cssClass =
        '.stream_thumbnail_focused_test {background-color:' +
        arrayColors[0] +
        ' !important;color:' +
        arrayColors[1] +
        ' !important;border-color:' +
        arrayColors[2] +
        ' !important;}';

    cssClass +=
        '.vod_watched_test{background:' +
        arrayColors[3] +
        ' !important;height:1.5%;max-width:100%;position:absolute;bottom:0;transform:translateY(150%);}';

    Main_innerHTML('focus_class_test', cssClass);
}

function SettingsColor_SetColorsObj() {
    var baseCavasObj = {
        left: function () {
            SettingsColor_DialogColorsLeftRight(-SettingsColor_DialogColorPosStep);
        },
        right: function () {
            SettingsColor_DialogColorsLeftRight(SettingsColor_DialogColorPosStep);
        },
        focus: function () {
            SettingsColor_AddCavasFocus();
            Main_innerHTML('cavas_text' + this.property, this.str + STR_SPACE_HTML + '(' + STR_ENTER_RGB + ')');
        },
        removefocus: function () {
            SettingsColor_RemoveCavasFocus();
            Main_innerHTML('cavas_text' + this.property, this.str);
        },
        enter: SettingsColor_SetRGB
    };

    var baseRGBObj = {
        left: function () {
            SettingsColor_ColorsObjRGBLeftRight(this, -1, 255);
        },
        right: function () {
            SettingsColor_ColorsObjRGBLeftRight(this, 1, 255);
        },
        focus: function () {
            SettingsColor_optFocus();

            Main_textContent('color_options' + this.property, this.pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos]);

            SettingsColor_ColorSetarrowsKey(this.property, this.pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos], 255);
        },
        removefocus: SettingsColor_RemoveoptFocus
    };

    var baseStrigbj = {
        left: function () {
            SettingsColor_ColorsObjLeftRight(this, -1, this.values.length - 1);
        },
        right: function () {
            SettingsColor_ColorsObjLeftRight(this, 1, this.values.length - 1);
        },
        focus: function () {
            SettingsColor_optFocus();

            Main_textContent('color_options' + this.property, this.values[this.pos]);

            SettingsColor_ColorSetarrowsKey(this.property, this.pos, this.values.length - 1);
        },
        removefocus: SettingsColor_RemoveoptFocus
    };

    SettingsColor_ColorsObj[SettingsColor_ColorsObjApply] = {
        left: noop_fun,
        right: noop_fun,
        focus: SettingsColor_optFocus,
        removefocus: SettingsColor_RemoveoptFocus,
        enter: SettingsColor_CollorApply
    };

    SettingsColor_ColorsObj[SettingsColor_ColorsObjCavasShadow] = Screens_assign(
        {
            property: SettingsColor_ColorsObjCavasShadow,
            str: STR_SHADOWS
        },
        baseCavasObj
    );
    SettingsColor_ColorsObj[SettingsColor_ColorsObjCavasColor] = Screens_assign(
        {
            property: SettingsColor_ColorsObjCavasColor,
            str: STR_COLORS
        },
        baseCavasObj
    );

    SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType] = Screens_assign(
        {
            pos: 0,
            property: SettingsColor_ColorsObjColorType,
            values: STR_COLOR_ARRAY.split(',')
        },
        baseStrigbj
    );

    SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles] = Screens_assign(
        {
            pos: SettingsColor_DefaultColorsPos,
            property: SettingsColor_ColorsObjStyles,
            values: STR_STYLES_ARRAY.split(',')
        },
        baseStrigbj
    );

    for (var i = SettingsColor_ColorsObjR; i < SettingsColor_ColorsObjB + 1; i++) {
        SettingsColor_ColorsObj[i] = Screens_assign(
            {
                property: i,
                pos: Main_getItemJson('colo_rgb' + i, SettingsColor_InitialColors[i - SettingsColor_ColorsObjR])
            },
            baseRGBObj
        );
    }
}

function SettingsColor_CollorApply() {
    SettingsColor_DefaultColorsPos = SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].pos;
    Main_setItem('SettingsColor_ColorsObj' + SettingsColor_ColorsObjStyles, SettingsColor_DefaultColorsPos);

    if (SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].pos === 1) {
        //Custom
        var i;
        for (i = SettingsColor_ColorsObjR; i < SettingsColor_ColorsObjB + 1; i++) {
            Main_setItem('colo_rgb' + i, JSON.stringify(SettingsColor_ColorsObj[i].pos));
        }

        for (i = 0; i < SettingsColor_DefaultColors_Len; i++) {
            SettingsColor_DefaultColors[1][i] =
                'rgba(' +
                SettingsColor_ColorsObj[SettingsColor_ColorsObjR].pos[i] +
                ', ' +
                SettingsColor_ColorsObj[SettingsColor_ColorsObjG].pos[i] +
                ', ' +
                SettingsColor_ColorsObj[SettingsColor_ColorsObjB].pos[i] +
                ', 1)';
        }
    }

    SettingsColor_SetAnimationStyle(SettingsColor_DefaultColorsPos);
}

function SettingsColor_SetRGB() {
    SettingsColor_DialogColorsResultSet();

    for (var i = 0; i < 3; i++) {
        SettingsColor_ColorsObj[i + SettingsColor_ColorsObjR].pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos] =
            SettingsColor_DialogColorsResultRGBA[i];
        Main_textContent('color_options' + (i + SettingsColor_ColorsObjR), SettingsColor_DialogColorsResultRGBA[i]);
    }
}

function SettingsColor_DialogColorsLeftRight(adder) {
    SettingsColor_canvasPosX[SettingsColor_canvasPosY] += adder;

    if (SettingsColor_canvasPosX[SettingsColor_canvasPosY] > SettingsColor_DialogColorPosMax) SettingsColor_canvasPosX[SettingsColor_canvasPosY] = 0;
    else if (SettingsColor_canvasPosX[SettingsColor_canvasPosY] < 0)
        SettingsColor_canvasPosX[SettingsColor_canvasPosY] = SettingsColor_DialogColorPosMax;

    if (!SettingsColor_canvasPosY) SettingsColor_DivShadowsUpdate();
    else SettingsColor_DivColorsUpdate();

    SettingsColor_ColorsSetAsCustom();
    SettingsColor_ColorsSetRGBTest();
}

function SettingsColor_ColorsObjRGBLeftRight(obj, adder, maxValue) {
    obj.pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos] += adder;

    if (obj.pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos] > maxValue) {
        obj.pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos] = maxValue;
    } else if (obj.pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos] < 0) {
        obj.pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos] = 0;
    }

    obj.focus();
    SettingsColor_ColorsSetAsCustom();
    SettingsColor_ColorsSetRGB();
    SettingsColor_ColorsSetRGBTest();
}

function SettingsColor_ColorsSetAsCustom() {
    SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].pos = 1;

    Main_textContent(
        'color_options' + SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].property,
        SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].values[1]
    );
}

function SettingsColor_ColorsSetRGBTest() {
    if (SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].pos === 1) {
        var rgba = [],
            colors = [],
            i = SettingsColor_ColorsObjR,
            len = SettingsColor_ColorsObjB + 1;

        for (i; i < len; i++) {
            rgba.push(SettingsColor_ColorsObj[i].pos);
        }

        i = 0;
        len = SettingsColor_DefaultColors_Len;
        for (i; i < len; i++) {
            colors.push('rgba(' + rgba[0][i] + ', ' + rgba[1][i] + ', ' + rgba[2][i] + ', 1)');
        }

        colors[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos] = SettingsColor_ColorTemp;

        SettingsColor_SetAnimationStyleTest(colors);
    } else {
        SettingsColor_SetAnimationStyleTest(SettingsColor_DefaultColors[SettingsColor_ColorsObj[SettingsColor_ColorsObjStyles].pos]);
    }
}

function SettingsColor_ColorsSetRGB() {
    SettingsColor_ColorUPdateResult([
        SettingsColor_ColorsObj[SettingsColor_ColorsObjR].pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos],
        SettingsColor_ColorsObj[SettingsColor_ColorsObjG].pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos],
        SettingsColor_ColorsObj[SettingsColor_ColorsObjB].pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos]
    ]);
}

function SettingsColor_ColorsSetRGBText() {
    for (var i = SettingsColor_ColorsObjR; i < SettingsColor_ColorsObjB + 1; i++) {
        Main_textContent('color_options' + i, SettingsColor_ColorsObj[i].pos[SettingsColor_ColorsObj[SettingsColor_ColorsObjColorType].pos]);
    }
}

function SettingsColor_ColorsObjLeftRight(obj, adder, maxValue) {
    var CurPos = obj.pos;

    obj.pos += adder;

    if (obj.pos > maxValue) obj.pos = maxValue;
    else if (obj.pos < 0) obj.pos = 0;

    obj.focus();
    SettingsColor_ColorsReset(obj, CurPos);
}

function SettingsColor_ColorsReset(obj, CurPos) {
    if (obj.property === SettingsColor_ColorsObjStyles) {
        var i,
            array = SettingsColor_ColorExtrackRGB(SettingsColor_DefaultColors[obj.pos]),
            len;

        if (obj.pos === 1) {
            if (SettingsColor_RBG_temp) {
                i = 0;
                len = array.length;
                for (i; i < len; i++) {
                    array[i] = SettingsColor_RBG_temp[i];
                }
                SettingsColor_RBG_temp = null;
            }
        } else if (CurPos === 1) {
            SettingsColor_RBG_temp = [];
            i = 0;
            len = 3;
            for (i; i < len; i++) {
                SettingsColor_RBG_temp.push(SettingsColor_ColorsObj[i + SettingsColor_ColorsObjR].pos);
            }
        }

        i = 0;
        len = 3;

        for (i; i < len; i++) {
            SettingsColor_ColorsObj[i + SettingsColor_ColorsObjR].pos = array[i];
        }
    }

    SettingsColor_ColorsSetRGB();
    SettingsColor_ColorsSetRGBText();
}

function SettingsColor_AddCavasFocus() {
    Main_ShowElement('colorCanvas_pos' + SettingsColor_canvasPosY);
    Main_AddClass('Canvas_holder' + SettingsColor_canvasPosY, 'cavas_holder_focused');
    SettingsColor_DivColorsUpdate();
}

function SettingsColor_RemoveCavasFocus() {
    Main_HideElement('colorCanvas_pos' + SettingsColor_canvasPosY);
    Main_RemoveClass('Canvas_holder' + SettingsColor_canvasPosY, 'cavas_holder_focused');
}

function SettingsColor_optFocus() {
    Main_AddClass('color_options' + SettingsColor_canvasPosY, 'settings_value_focus');
    Main_AddClass('color_options' + SettingsColor_canvasPosY + '_div', 'settings_div_focus');
}

function SettingsColor_RemoveoptFocus() {
    var key = 'color_options' + SettingsColor_canvasPosY;
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
    Main_getElementById(key + 'arrow_left').style.opacity = '0';
    Main_getElementById(key + 'arrow_right').style.opacity = '0';
}

function SettingsColor_ColorSetarrowsKey(pos, currentValue, maxValue) {
    if (currentValue > 0 && currentValue < maxValue) {
        Main_getElementById('color_options' + pos + 'arrow_left').style.opacity = '1';
        Main_getElementById('color_options' + pos + 'arrow_right').style.opacity = '1';
    } else if (currentValue === maxValue) {
        Main_getElementById('color_options' + pos + 'arrow_left').style.opacity = '1';
        Main_getElementById('color_options' + pos + 'arrow_right').style.opacity = '0.2';
    } else {
        Main_getElementById('color_options' + pos + 'arrow_left').style.opacity = '0.2';
        Main_getElementById('color_options' + pos + 'arrow_right').style.opacity = '1';
    }
}
