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

//Spacing for release maker not trow errors from jshint
var nordvpn = {
    event_name: "nord",
    display_url: "tiny.cc/nordvpn27",
    url: "https://go.nordvpn.net/SH3SM",
    //image_base: "https://fgl27.github.io/SmartTwitchTV/release/githubio/images/nordvpn/",
    banners_folder: "/release/githubio/images/nordvpn/",
    de: {
        short_text: "NordVPN nutzt den Link %x für die neuesten Angebote",
        long_text: "Klicken Sie hier oder verwenden Sie den Link %x für die neuesten Angebote und um die App zu unterstützen",
    },
    en: {
        short_text: "NordVPN use the link %x for the latest deals",
        long_text: "Click here or use the link %x for the latest deals and to support the app",
        banner: [
            "/banner/v4-970x250-3.png",
            "/banner/970x250-gaming.png",
            "/banner/970x250-streaming.png",
            "/banner/v4-970x250-4.png",
            "/banner/970x250-speed.png",
            "/banner/v4-970x250-1.png",
            "/banner/970x250-gaming-1.png",
            "/banner/970x250-streaming-1.png",
            "/banner/v4-970x250-5.png",
            "/banner/970x250-speed-1.png",
            "/banner/v4-970x250-2.png",
            "/banner/970x250-gaming-2.png"
        ],
        banner_16by9: [
            "/banner_16by9/v4-480x320-3.png",
            "/banner_16by9/480x320-gaming.png",
            "/banner_16by9/480x320-streaming.png",
            "/banner_16by9/v4-480x320-4.png",
            "/banner_16by9/480x320-speed.png",
            "/banner_16by9/v4-480x320-1.png",
            "/banner_16by9/480x320-gaming-1.png",
            "/banner_16by9/480x320-streaming-1.png",
            "/banner_16by9/v4-480x320-5.png",
            "/banner_16by9/480x320-speed-1.png",
            "/banner_16by9/v4-480x320-2.png",
            "/banner_16by9/480x320-gaming-2.png"
        ]
    },
    fr: {
        short_text: "NordVPN utilise le lien %x pour les dernières offres",
        long_text: "Cliquez ici ou utilisez le lien %x pour les dernières offres et pour soutenir l'application",
    },
    ja: {
        short_text: "NordVPNは、最新のお得な情報にリンク %x を使用します",
        long_text: "ここをクリックするか、リンク %x を使用して最新のお得な情報を入手し、アプリをサポートしてください",
    },
    ko: {
        short_text: "NordVPN 은 최신 거래를 위해 링크 %x 를 사용합니다",
        long_text: "여기를 클릭하거나 링크 %x 를 사용하여 최신 거래 및 앱 지원",
    },
    pt: {
        short_text: "NordVPN use o link %x para as últimas ofertas",
        long_text: "Clique aqui ou use o link %x para as últimas ofertas e para apoiar o aplicativo",
    },
    zh: {
        short_text: "NordVPN 使用鏈接 %x 獲取最新交易",
        long_text: "單擊此處或使用鏈接 %x 獲取最新優惠並支持該應用程序",
        banner: [
            "/banner/v4-970x250-1.png",
            "/banner/v4-970x250-2.png",
            "/banner/v4-970x250-3.png",
            "/banner/v4-970x250-4.png",
            "/banner/v4-970x250-5.png"
        ],
        banner_16by9: [
            "/banner_16by9/v4-480x320-1.png",
            "/banner_16by9/v4-480x320-2.png",
            "/banner_16by9/v4-480x320-3.png",
            "/banner_16by9/v4-480x320-4.png",
            "/banner_16by9/v4-480x320-5.png"
        ]
    },
};

var array_extra_lang = ['fr', 'de', 'ja', 'pt'];

var i = 0, len = array_extra_lang.length;
for (i; i < len; i++) {
    nordvpn[array_extra_lang[i]].banner = nordvpn.en.banner;
    nordvpn[array_extra_lang[i]].banner_16by9 = nordvpn.en.banner_16by9;
}

nordvpn.ko.banner = nordvpn.zh.banner;
nordvpn.ko.banner_16by9 = nordvpn.zh.banner_16by9;

