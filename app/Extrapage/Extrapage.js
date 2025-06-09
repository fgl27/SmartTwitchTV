/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
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

/* jshint eqeqeq: true, undef: true, unused: true, node: true, browser: true */
/*globals Android, Extrapage */
//To test run
//*jshint Extrapage/Extrapage.js
//Same method used by punycode to start as a API
(function (root) {
    /** Detect free variables */
    var ExtrapageGlobal = typeof global === 'object' && global;
    if (ExtrapageGlobal.global === ExtrapageGlobal || ExtrapageGlobal.window === ExtrapageGlobal || ExtrapageGlobal.self === ExtrapageGlobal) {
        root = ExtrapageGlobal;
    }

    var Main_body = document.body;
    var Main_IsOn_OSInterface = 0;

    function Main_Start() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                Main_load();
            });
        } else {
            // `DOMContentLoaded` already fired
            Main_load();
        }
    }

    // stylesheet[i].cssRules or stylesheet[i].rules is blocked in chrome
    // So in order to check if a css class is loaded one can check it's font-family
    // The simple test here it to remove the <link rel="stylesheet" href="https://werevere"> from index and see if the bellow funtion loads the css for you and vice versa
    function Main_Checktylesheet() {
        var span = document.createElement('span');

        span.className = 'fa';
        span.style.display = 'none';
        Main_body.insertBefore(span, Main_body.firstChild);

        if (window.getComputedStyle(span, null).getPropertyValue('font-family') !== 'icons') {
            Main_LoadStylesheet('https://fgl27.github.io/SmartTwitchTV/release/githubio/css/icons.min.css');
        }

        Main_body.removeChild(span);
    }

    function Main_LoadStylesheet(path) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;

        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function Main_load() {
        Main_Checktylesheet();

        try {
            Main_IsOn_OSInterface = OSInterface_getversion() !== '';
        } catch (e) {
            Main_body.style.backgroundColor = 'rgba(155, 155, 155, 1)'; //default rgba(0, 0, 0, 1)
        }
        calculateFontSize();
        Main_initClick();
    }

    var Main_initClickDoc = ['clickup', 'clickdown', 'clickleft', 'clickright', 'clickenter', 'clickback', 'clickpgup', 'clickpgdown', 'clickfeed'];
    var Main_setHideButtonsId;
    var Main_scenekeysDoc;
    var Main_scenekeysPositionDoc;
    var Main_isTV;

    function Main_initClick() {
        if (Main_IsOn_OSInterface) {
            Main_isTV = OSInterface_deviceIsTV();
            //Only show virtual d-pad on none TV devices
            if (Main_isTV) return;
        } else return;

        Main_scenekeysDoc = document.getElementById('scenekeys');
        Main_scenekeysPositionDoc = document.getElementById('scenekeys_position');

        var i = 0,
            len = Main_initClickDoc.length;
        for (i; i < len; i++) {
            Main_initClickSet(document.getElementById(Main_initClickDoc[i]), i);
        }

        Main_body.onpointerup = function () {
            initbodyClickSet();
        };
        Set_DpadPOsition();
    }

    function Main_setInterval(fun, timeout, id) {
        Main_clearInterval(id);
        if (timeout && timeout > 0) return window.setInterval(fun, timeout);
    }

    function Main_clearInterval(id) {
        window.clearInterval(id);
    }

    function Main_setTimeout(fun, timeout, id) {
        Main_clearTimeout(id);
        if (timeout && timeout > 0) return window.setTimeout(fun, timeout);
        else return window.setTimeout(fun);
    }

    function Main_clearTimeout(id) {
        window.clearTimeout(id);
    }

    function initbodyClickSet() {
        Set_DpadOpacity();
        Main_clearHideButtons();
        Main_setHideButtons();
    }

    function Main_buttonsVisible() {
        return parseInt(Main_scenekeysDoc.style.opacity * 100) === parseInt(dpad_opacity * 100);
    }

    function Main_clearHideButtons() {
        Main_clearTimeout(Main_setHideButtonsId);
    }

    function Main_setHideButtons() {
        Main_setHideButtonsId = Main_setTimeout(Main_HideButtons, 4000, Main_setHideButtonsId);
    }

    function Main_HideButtons() {
        Main_scenekeysDoc.style.opacity = '0';
    }

    var Main_initClickSetId;
    var Main_initClickTimeoutId;

    function Main_initClickSet(doc, pos) {
        doc.onpointerdown = function () {
            Main_ClickonpointerdownClear();

            if (!Main_buttonsVisible()) return;

            Main_Clickonpointerdown(pos);

            Main_initClickTimeoutId = Main_setTimeout(
                function () {
                    Main_ClickonpointerdownClear();
                    Main_initClickSetId = Main_setInterval(
                        function () {
                            Main_Clickonpointerdown(pos);
                        },
                        50,
                        Main_initClickSetId
                    );
                },
                600,
                Main_initClickTimeoutId
            );
        };

        doc.onpointerup = function () {
            Main_ClickonpointerdownClear();
            if (!Main_buttonsVisible()) return;

            OSInterface_keyEvent(pos, 1);
        };
    }

    function Main_ClickonpointerdownClear() {
        Main_clearTimeout(Main_initClickTimeoutId);
        Main_clearInterval(Main_initClickSetId);
    }

    function Main_Clickonpointerdown(pos) {
        OSInterface_keyEvent(pos, 0);
    }

    function Set_DpadOpacity() {
        if (!Main_IsOn_OSInterface) return;
        Main_scenekeysDoc.style.opacity = dpad_opacity;

        Main_clearHideButtons();
        Main_setHideButtons();
    }

    function Set_dpad_opacity(value) {
        dpad_opacity = value * 0.05;
        Set_DpadOpacity();
    }

    function Set_dpad_position(value) {
        dpad_position = value;
        Set_DpadPOsition();
    }

    var dpad_opacity = 12 * 0.05;
    var dpad_position = 0; //bottom right
    var Set_DpadPOsitions = [
        [6, 0],
        [6, 44],
        [63, 44],
        [63, 0]
    ];

    function Set_DpadPOsition() {
        if (!Main_IsOn_OSInterface) return;
        initbodyClickSet();
        Main_scenekeysPositionDoc.style.right = Set_DpadPOsitions[dpad_position][0] + '%';
        Main_scenekeysPositionDoc.style.bottom = Set_DpadPOsitions[dpad_position][1] + '%';
    }

    // Adapted from:
    // https://developer.tizen.org/community/tip-tech/using-css3-units-support-low-and-high-density-screens

    // BodyfontSize is used for px to em calculation used by scroll functions
    var BodyfontSize;
    var scaleFactor;

    function calculateFontSize() {
        // Initial sizes.
        var initialFontSize = 29,
            initialWidth = 1920,
            initialHeight = 1080,
            window_innerHeight = window.innerHeight,
            window_innerWidth = window.innerWidth,
            currentRatio = window_innerWidth / window_innerHeight,
            initialRatio = initialWidth / initialHeight,
            Horizontal_Wide_Mode = currentRatio >= initialRatio,
            calculated_Height,
            calculated_Width,
            currentHeight,
            scaledWidth;

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
        Main_body.style.width = scaledWidth + 'px';
        Main_body.style.height = currentHeight + 'px';
        Main_body.style.fontSize = BodyfontSize + 'px';
    }

    //Do the calculation and changes on proper events call
    window.addEventListener('resize', calculateFontSizeTizen, false);

    function calculateFontSizeTizen() {
        if (!Main_IsOn_OSInterface) calculateFontSize();
    }

    function OSInterface_getversion() {
        return Android.getversion();
    }

    function OSInterface_deviceIsTV() {
        return Android.deviceIsTV();
    }

    function OSInterface_keyEvent(key, keyaction) {
        if (Main_IsOn_OSInterface) Android.keyEvent(key, keyaction);
    }

    /**
     * Define the public API
     * and all function need to be called outiside the API
     * Extrapage + all functions called by java
     */
    var Extrapage = {
        // Extrapage var is defined in app/specific/Main.js
        mainstart: Main_Start,
        initbodyClickSet: initbodyClickSet,
        Set_dpad_opacity: Set_dpad_opacity,
        Set_dpad_position: Set_dpad_position
    };

    /** Expose `Extrapage` */
    root.Extrapage = Extrapage;
})(this);

Extrapage.mainstart();
//If running from fs and not from internet add a timeout to prevet crash as the parsing of the file will not be defer
//window.setTimeout(Extrapage.mainstart, 10000);
//APIEND this line is here so release_maker can work don't remove
