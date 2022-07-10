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

// Adapted from:
// https://developer.tizen.org/community/tip-tech/using-css3-units-support-low-and-high-density-screens

// BodyfontSize is used for px to em calculation used by scroll functions
var BodyfontSize;
var scaleFactor;
var currentHeight;
var scaledWidth;

function calculateFontSize() {
    var offset = 0;
    //Prevent crash in case Settings_value is not yet loaded
    try {
        offset = Settings_value.global_font_offset.values[Main_getItemInt('global_font_offset', Settings_value.global_font_offset.defaultValue) - 1];
    } catch (e) {
        offset = 0;
    }

    // Initial sizes.
    var initialFontSize = 29 + offset,
        initialWidth = 1920,
        initialHeight = 1080,
        window_innerHeight = window.innerHeight,
        window_innerWidth = window.innerWidth,
        currentRatio = window_innerWidth / window_innerHeight,
        initialRatio = initialWidth / initialHeight,
        Horizontal_Wide_Mode = currentRatio >= initialRatio,
        calculated_Height,
        calculated_Width;

    if (Horizontal_Wide_Mode) {
        // Horizontal Wide mode scale app on a fix Height dynamic Width
        calculated_Height = window_innerHeight;
        // Calculate scale factor
        scaleFactor = window_innerHeight / initialHeight;
        //scale the Width
        calculated_Width = Math.ceil(initialWidth * scaleFactor);
        //reset center vertical align
        document.body.style.marginTop = 0;
        document.body.style.marginLeft = Math.ceil((window_innerWidth - calculated_Width) / 2) + 'px';
    } else {
        // Vertical Wide mode scale app on a fix Width dynamic Height
        calculated_Width = window_innerWidth;
        // Calculate scale factor
        scaleFactor = window_innerWidth / initialWidth;
        //scale the Height
        calculated_Height = Math.ceil(initialHeight * scaleFactor);
        //center vertical align
        document.body.style.marginTop = Math.ceil((window_innerHeight - calculated_Height) / 2) + 'px';
        document.body.style.marginLeft = 0;
    }

    // Set app global height.
    currentHeight = calculated_Height;
    // Set app global width.
    scaledWidth = calculated_Width;

    //Set new body width/height recalculated to 16 by 9 and scaled fontSize
    BodyfontSize = initialFontSize * scaleFactor;
    document.body.style.width = scaledWidth + 'px';
    document.body.style.height = currentHeight + 'px';
    document.body.style.fontSize = BodyfontSize + 'px';
    BrowserTestSetVideoSize();

    //Some sizes are based on VH but some devices have a wrong value for CSS vh
    var ele = Main_getElementById('settings_scroll');
    if (ele) {
        ele.style.fontSize = currentHeight * 0.0267 + 'px';
    }

    var cssClass =
        '.side_panel_fix{font-size: ' +
        currentHeight * 0.0265 +
        'px;}' +
        '.stream_thumbnail_feed_text_holder{font-size: ' +
        currentHeight * 0.0255 +
        'px;}' +
        '.stream_thumbnail_game_feed_text_holder{font-size: ' +
        currentHeight * 0.023 +
        'px;}' +
        '.icon_feed_refresh{font-size: ' +
        currentHeight * 0.018 +
        'px;}' +
        '.side_panel_dialog{margin-top: ' +
        currentHeight * 0.5 +
        'px;}';

    Main_innerHTML('vh_class', cssClass);
}

//Do the calculation and changes on proper events call
window.addEventListener('resize', calculateFontSizeTizen, false);

function calculateFontSizeTizen() {
    if (!Main_IsOn_OSInterface) calculateFontSize();
}
