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

//Same method used by punycode to start as a API
//APISTART this line is here so release_maker can work don't remove
(function(root) {

    /** Detect free variables */
    var smartTwitchTVGlobal = typeof global === 'object' && global;
    if (smartTwitchTVGlobal.global === smartTwitchTVGlobal ||
        smartTwitchTVGlobal.window === smartTwitchTVGlobal ||
        smartTwitchTVGlobal.self === smartTwitchTVGlobal) {

        root = smartTwitchTVGlobal;

    }
    //APIMID this line is here so release_maker can work don't remove
    //APICENTER this line is here so release_maker can work don't remove

    /**
     * Define the public API
     * and all function need to be called outiside the API
     * smartTwitchTV + all functions called by java
     */
    smartTwitchTV = {// smartTwitchTV var is defined in app/specific/Main.js
        'mainstart': Main_Start, //Main_Start id Main_Start() func from app/specific/Main.js
        'Play_PannelEndStart': Play_PannelEndStart, //Play_PannelEndStart() func from app/specific/Play.js
        'Play_PlayerCheck': Play_PlayerCheck, //Play_PlayerCheck() func from app/specific/Play.js
        'Play_UpdateDuration': Play_UpdateDuration, //Play_UpdateDuration() func from app/specific/Play.js
        'PlayExtra_End': PlayExtra_End, //PlayExtra_End() func from app/specific/PlayExtra.js
        'Play_MultiEnd': Play_MultiEnd, // Play_MultiEndede() func from app/specific/Play.js
        'Play_CheckIfIsLiveClean': Play_CheckIfIsLiveClean, // Play_CheckIfIsLiveClean() func from app/specific/Play.js
        'UserLiveFeed_CheckIfIsLiveResult': UserLiveFeed_CheckIfIsLiveResult, // UserLiveFeed_CheckIfIsLiveResult() func from app/specific/UserLiveFeed.js
        'Sidepannel_CheckIfIsLiveResult': Sidepannel_CheckIfIsLiveResult, // Sidepannel_CheckIfIsLiveResult() func from app/specific/Sidepannel.js
        'Main_CheckStop': Main_CheckStop, // Main_CheckStop() func from app/specific/Main.js
        'Main_CheckResume': Main_CheckResume, // Main_CheckResume() func from app/specific/Main.js
        'Play_getQualities': Play_getQualities, // Play_getQualities() func from app/specific/Play.js
        'Play_ShowVideoStatus': Play_ShowVideoStatus, // Play_ShowVideoStatus() func from app/specific/Play.js
        'Play_ShowVideoQuality': Play_ShowVideoQuality, // Play_ShowVideoQuality() func from app/specific/Play.js
        'PlayVod_previews_success': PlayVod_previews_success, // PlayVod_previews_success() func from app/specific/PlayVod.js
        'Play_PlayPauseChange': Play_PlayPauseChange, // Play_KeyPause() func from app/specific/PlayEtc.js
        'PlayClip_loadDataResult': PlayClip_loadDataResult, // PlayClip_QualityGenerate() func from app/specific/PlayClip.js
        'PlayVod_loadDataResult': PlayVod_loadDataResult, // PlayVod_loadDataResult() func from app/specific/PlayVod.js
        'PlayExtra_ResumeResult': PlayExtra_ResumeResult, // PlayExtra_ResumeResult() func from app/specific/PlayExtra.js
        'Play_loadDataResult': Play_loadDataResult, // Play_loadDataResult() func from app/specific/Play.js
        'PlayClip_CheckIfIsLiveResult': PlayClip_CheckIfIsLiveResult, // PlayClip_CheckIfIsLiveResult() func from app/specific/PlayClip.js
        'PlayVod_CheckIfIsLiveResult': PlayVod_CheckIfIsLiveResult, // PlayVod_CheckIfIsLiveResult() func from app/specific/PlayVod.js
        'Play_MultiResult': Play_MultiResult, // Play_MultiResult() func from app/specific/Play.js
        'ChannelContent_CheckHostResult': ChannelContent_CheckHostResult, // ChannelContent_CheckHostResult() func from app/specific/ChannelContent.js
        'Play_CheckHostResult': Play_CheckHostResult, // Play_CheckHostResult() func from app/specific/Play.js
        'PlayExtra_CheckHostResult': PlayExtra_CheckHostResult, // PlayExtra_CheckHostResult() func from app/specific/PlayExtra.js
        'Screens_LoadPreviewResult': Screens_LoadPreviewResult, // Screens_LoadPreviewResult() func from app/specific/Screens.js
        'ChannelContent_LoadPreviewResult': ChannelContent_LoadPreviewResult,// ChannelContent_LoadPreviewResult() func from app/specific/ChannelContent.js
        'Play_StayCheckHostResult': Play_StayCheckHostResult,// Play_StayCheckHostResult() func from app/specific/PlayEtc.js
        'Play_StayCheckLiveResult': Play_StayCheckLiveResult,// Play_StayCheckLiveResult() func from app/specific/PlayEtc.js
        'Play_CheckIfIsLiveResult': Play_CheckIfIsLiveResult, // Play_CheckIfIsLiveResult() func from app/specific/Play.js
        'Main_checkWebVersion': Main_checkWebVersion,// Main_checkWebVersion() func from app/specific/Main.js
        'Main_onNewIntent': Main_onNewIntent,// Main_onNewIntent() func from app/specific/Main.js
        'Main_EventChannelRefresh': Main_EventChannelRefresh,// Main_EventChannelRefresh() func from app/specific/Main.js
    };

    /** Expose `smartTwitchTV` */
    root.smartTwitchTV = smartTwitchTV;
}(this));

smartTwitchTV.mainstart();
//If running from fs and not from internet add a timeout to prevet crash as the parsing of the file will not be defer
//window.setTimeout(smartTwitchTV.mainstart, 10000);
//APIEND this line is here so release_maker can work don't remove
