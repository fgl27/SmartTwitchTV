//A general file with fun for testing proposes

//Call this from a key down
//Also one can use Android.PlayerEventListenerClearTest() for testing this from android side
//PLus change   PlayExtra_data.data[6] = 'channel hosting name'; PlayExtra_data.data[14] = 'channel hosting id';
function PlayExtra_End_Test() {
    //Enable PP before call this
    Play_data.data[14] = 70661496; //The id of a channel that is hosting
    PlayExtra_End(true); //If testing main player Play_data and true, else PlayExtra_data and false for small player
}

//Call this from Play_Start() end
function PlayExtra_UpdatePanelTest() {
    PlayExtra_data = Play_data;
    PlayExtra_UpdatePanel();
    Play_SetAudioIcon();
    Main_HideElement('stream_info');
    Main_ShowElement('stream_info_pp');
}

//Call this from Play_Start() end or start of Play_Resume
function Play_FakeMulti() {
    //Play_MultiEnable = true;
    //Uncomment the bellow to test Play_Multi_MainBig
    //Play_Multi_MainBig = true;
    //Main_ShowElement('stream_info_multi_big');
    Play_Multi_SetPanel();
    //Main_HideElement('stream_info_multi');
    var i = 0;
    for (i; i < 4; i++) {
        Play_MultiArray[i] = Play_data;
        // Play_MultiArray[i] = JSON.parse(JSON.stringify(Play_data_base));
        // Play_MultiArray[i].data = [
        //     IMG_404_VIDEO,
        //     "ashlynn",
        //     "title",
        //     "game",
        //     "for 67,094&nbsp;Viewers",
        //     "720p30 [EN]",
        //     "ashlynn",
        //     616702257,
        //     false,
        //     "https://static-cdn.jtvnw.net/jtv_user_pictures/9a67eb66-66b8-47fa-b388-61f2f74ce213-profile_image-300x300.png",
        //     true,
        //     "Since 11:04:36&nbsp;",
        //     "2020-01-25T09:49:05Z",
        //     67094,
        //     213749122];

        // Play_MultiSetinfo(
        //     i,
        //     Play_MultiArray[i].data[3],
        //     Play_MultiArray[i].data[13],
        //     Play_MultiArray[i].data[1],
        //     Play_MultiArray[i].data[8],
        //     Play_MultiArray[i].data[9],
        //     twemoji.parse(Play_MultiArray[i].data[2])
        // );

        Play_MultiSetinfo(i, Play_data.data[3], Play_data.data[13], Play_data.data[1], Play_data.data[8], Play_data.data[9], twemoji.parse(Play_data.data[2]));
    }
}
