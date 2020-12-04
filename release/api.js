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
        'mainstart': Main_Start,
        'Play_PannelEndStart': Play_PannelEndStart,
        'Play_PlayerCheck': Play_PlayerCheck,
        'Play_UpdateDuration': Play_UpdateDuration,
        'PlayExtra_End': PlayExtra_End,
        'Play_MultiEnd': Play_MultiEnd,
        'Play_CheckIfIsLiveClean': Play_CheckIfIsLiveClean,
        'UserLiveFeed_CheckIfIsLiveResult': UserLiveFeed_CheckIfIsLiveResult,
        'Sidepannel_CheckIfIsLiveResult': Sidepannel_CheckIfIsLiveResult,
        'Main_CheckStop': Main_CheckStop,
        'Main_CheckResume': Main_CheckResume,
        'Play_getQualities': Play_getQualities,
        'Play_ShowVideoStatus': Play_ShowVideoStatus,
        'Play_ShowVideoQuality': Play_ShowVideoQuality,
        'PlayVod_previews_success': PlayVod_previews_success,
        'Play_PlayPauseChange': Play_PlayPauseChange,
        'PlayClip_loadDataResult': PlayClip_loadDataResult,
        'PlayVod_loadDataResult': PlayVod_loadDataResult,
        'PlayExtra_ResumeResult': PlayExtra_ResumeResult,
        'Play_loadDataResult': Play_loadDataResult,
        'PlayClip_CheckIfIsLiveResult': PlayClip_CheckIfIsLiveResult,
        'PlayVod_CheckIfIsLiveResult': PlayVod_CheckIfIsLiveResult,
        'Play_MultiResult': Play_MultiResult,
        'ChannelContent_CheckHostResult': ChannelContent_CheckHostResult,
        'Play_CheckHostResult': Play_CheckHostResult,
        'PlayExtra_CheckHostResult': PlayExtra_CheckHostResult,
        'Screens_LoadPreviewResult': Screens_LoadPreviewResult,
        'ChannelContent_LoadPreviewResult': ChannelContent_LoadPreviewResult,
        'Play_StayCheckHostResult': Play_StayCheckHostResult,
        'Play_StayCheckLiveResult': Play_StayCheckLiveResult,
        'Play_CheckIfIsLiveResult': Play_CheckIfIsLiveResult,
        'Main_checkWebVersion': Main_checkWebVersion,
        'Main_onNewIntent': Main_onNewIntent,
        'Main_EventChannelRefresh': Main_EventChannelRefresh,
        'ChatLive_loadChattersSuccess': ChatLive_loadChattersSuccess,
        'PlayVod_updateChaptersResult': PlayVod_updateChaptersResult,
        'ChatLive_SetLatency': ChatLive_SetLatency,
        'Screens_CheckGetResult': Screens_CheckGetResult,
        'UserLiveFeedobj_loadChannelUserLiveGetResult': UserLiveFeedobj_loadChannelUserLiveGetResult,
        'UserLiveFeedobj_loadUserVodGetResult': UserLiveFeedobj_loadUserVodGetResult,
        'Main_CheckBasexmlHttpGet': Main_CheckBasexmlHttpGet,
        'AddCode_BasexmlHttpGetValidateGet': AddCode_BasexmlHttpGetValidateGet,
        'AddCode_BasexmlHttpGetResult': AddCode_BasexmlHttpGetResult,
        'AddCode_refreshTokensResult': AddCode_refreshTokensResult,
        'Main_CheckFullxmlHttpGet': Main_CheckFullxmlHttpGet
    };

    /** Expose `smartTwitchTV` */
    root.smartTwitchTV = smartTwitchTV;
}(this));

smartTwitchTV.mainstart();
//If running from fs and not from internet add a timeout to prevet crash as the parsing of the file will not be defer
//window.setTimeout(smartTwitchTV.mainstart, 10000);
//APIEND this line is here so release_maker can work don't remove
