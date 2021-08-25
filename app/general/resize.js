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
        initialHeight = 1080;

    // Get current client/screen height.
    currentHeight = window.innerHeight;

    // Calculate scale factor and scaled font size.
    scaleFactor = currentHeight / initialHeight;
    BodyfontSize = initialFontSize * scaleFactor;

    // Calculate scaled body/divs size.
    scaledWidth = initialWidth * scaleFactor;

    //Set new body width/height recalculated to 16 by 9 and scaled fontSize 
    document.body.style.width = scaledWidth + 'px';
    document.body.style.height = currentHeight + 'px';
    document.body.style.fontSize = BodyfontSize + 'px';

    if (!Main_IsOn_OSInterface) {
        if (!clip_player) clip_player = Main_getElementById('clip_player');
        clip_player.width = scaledWidth;
        clip_player.height = currentHeight;
    }
}

//Do the calculation and changes on proper events call
window.addEventListener('resize', calculateFontSizeTizen, false);

function calculateFontSizeTizen() {
    if (!Main_IsOn_OSInterface) calculateFontSize();
}
