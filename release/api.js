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
//APISTART this line is here so release_maker can work don't remove APISPLITSTART
(function (root) {
    /** Detect free variables */
    var smartTwitchTVGlobal = typeof global === 'object' && global;
    if (
        smartTwitchTVGlobal.global === smartTwitchTVGlobal ||
        smartTwitchTVGlobal.window === smartTwitchTVGlobal ||
        smartTwitchTVGlobal.self === smartTwitchTVGlobal
    ) {
        root = smartTwitchTVGlobal;
    }
    //APIMID this line is here so release_maker can work don't remove
    //APICENTER this line is here so release_maker can work don't remove APISPLITCENTER

    /**
     * Define the public API
     * and all function need to be called outiside the API
     * smartTwitchTV + all functions called by java
     */
    smartTwitchTV = {
        // smartTwitchTV var is defined in app/specific/Main.js
        mainstart: Main_Start,
        Play_PannelEndStart: Play_PannelEndStart,
        Play_PlayerCheck: Play_PlayerCheck,
        Play_UpdateDuration: Play_UpdateDuration,
        PlayExtra_End: PlayExtra_End,
        Play_MultiEnd: Play_MultiEnd,
        Play_CheckIfIsLiveClean: Play_CheckIfIsLiveClean,
        UserLiveFeed_CheckIfIsLiveResult: UserLiveFeed_CheckIfIsLiveResult,
        Sidepannel_CheckIfIsLiveResult: Sidepannel_CheckIfIsLiveResult,
        Main_CheckStop: Main_CheckStop,
        Main_CheckResume: Main_CheckResume,
        Play_getQualities: Play_getQualities,
        Play_ShowVideoStatus: Play_ShowVideoStatus,
        Play_ShowVideoQuality: Play_ShowVideoQuality,
        Play_PlayPauseChange: Play_PlayPauseChange,
        PlayVod_loadDataResult: PlayVod_loadDataResult,
        PlayExtra_ResumeResult: PlayExtra_ResumeResult,
        Play_loadDataResult: Play_loadDataResult,
        PlayClip_CheckIfIsLiveResult: PlayClip_CheckIfIsLiveResult,
        PlayVod_CheckIfIsLiveResult: PlayVod_CheckIfIsLiveResult,
        Play_MultiResult: Play_MultiResult,
        Screens_LoadPreviewResult: Screens_LoadPreviewResult,
        ChannelContent_LoadPreviewResult: ChannelContent_LoadPreviewResult,
        Play_StayCheckLiveResult: Play_StayCheckLiveResult,
        Play_CheckIfIsLiveResult: Play_CheckIfIsLiveResult,
        Play_ClipCheckIfIsLiveEnd: Play_ClipCheckIfIsLiveEnd,
        Main_onNewIntent: Main_onNewIntent,
        Main_EventChannelRefresh: Main_EventChannelRefresh,
        ChatLive_SetLatency: ChatLive_SetLatency,
        Main_CheckBasexmlHttpGet: Main_CheckBasexmlHttpGet,
        BaseXmlHttpGetFull_Process: BaseXmlHttpGetFull_Process,
        Main_CheckFullxmlHttpGet: Main_CheckFullxmlHttpGet,
        PlayHLS_GetTokenResult: PlayHLS_GetTokenResult,
        PlayHLS_PlayListUrlResult: PlayHLS_PlayListUrlResult,
        AddCode_AppTokenResult: AddCode_AppTokenResult,
        Play_UpdateDurationDiv: Play_UpdateDurationDiv,
        Screens_PlaybackTimeSetVodDuration: Screens_PlaybackTimeSetVodDuration
    };

    /** Expose `smartTwitchTV` */
    root.smartTwitchTV = smartTwitchTV;
})(this);

smartTwitchTV.mainstart();
//If running from fs and not from internet add a timeout to prevent crash as the parsing of the file will not be defer
//window.setTimeout(smartTwitchTV.mainstart, 10000);
//APIEND this line is here so release_maker can work don't remove
