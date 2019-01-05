var content = {
    "sections": [{
        "title": "Live",
        "tiles": [{
            "title": "Go to Live",
            "subtitle": "",
            "image_ratio": "4by3",
            "image_url": "https://fgl27.github.io/smarttv-twitch/release/githubio/images/smart_live.png",
            "action_data": "{\"screenIdx\":1}",
            "is_playable": false
        }]
    }, {
        "title": " Add User",
        "tiles": [{
            "title": "Go to Add User",
            "subtitle": "Add a Twitch user to display it's Followed Channels content here",
            "image_ratio": "4by3",
            "image_url": "https://fgl27.github.io/smarttv-twitch/release/githubio/images/smart_add_user.png",
            "action_data": "{\"screenIdx\":2}",
            "is_playable": false
        }]
    }, {
        "title": "Featured",
        "tiles": [{
            "title": "Go to Featured",
            "subtitle": "",
            "image_ratio": "4by3",
            "image_url": "https://fgl27.github.io/smarttv-twitch/release/githubio/images/smart_featured.png",
            "action_data": "{\"screenIdx\":22}",
            "is_playable": false
        }]
    }, {
        "title": "Games",
        "tiles": [{
            "title": "Go to Games",
            "subtitle": "",
            "image_ratio": "4by3",
            "image_url": "https://fgl27.github.io/smarttv-twitch/release/githubio/images/smart_games.png",
            "action_data": "{\"screenIdx\":3}",
            "is_playable": false
        }]
    }, {
        "title": "Videos",
        "tiles": [{
            "title": "Go to Videos",
            "subtitle": "",
            "image_ratio": "4by3",
            "image_url": "https://fgl27.github.io/smarttv-twitch/release/githubio/images/smart_videos.png",
            "action_data": "{\"screenIdx\":18}",
            "is_playable": false
        }]
    }, {
        "title": " Clips",
        "tiles": [{
            "title": "Go to Clips",
            "subtitle": "",
            "image_ratio": "4by3",
            "image_url": "https://fgl27.github.io/smarttv-twitch/release/githubio/images/smart_cips.png",
            "action_data": "{\"screenIdx\":19}",
            "is_playable": false
        }]
    }]
};

function UpdatePreview() {
    try {
        console.log(content);
        console.log(JSON.stringify(content));
        webapis.preview.setPreviewData(JSON.stringify(content));
    } catch (ex) {
        console.log(ex.message);
    }
}
