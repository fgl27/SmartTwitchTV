// The bellow are some function or adaptations of function from
// © NightDev 2016 https://www.nightdev.com/kapchat/

var emoteURLSizes = {
    1: '1.0',
    2: '2.0',
    3: '3.0',
    4: '3.0'
};
var emoteURLSize;

var badgeURLSizes = {
    1: 'image_url_1x',
    2: 'image_url_2x',
    3: 'image_url_4x',
    4: 'image_url_4x'
};
var badgeURLSize;

function emoteURL(id) {
    return 'https://static-cdn.jtvnw.net/emoticons/v2/' + id + '/default/dark/' + emoteURLSize;
}

function emoteURLFromObj(obj, replaceDark) {
    var value = Object.values(obj).pop();

    return replaceDark ? value.replace('light', 'dark') : value;
}

function emoteTemplate(url, srcset) {
    return (
        '<img class="emoticon" alt="" ' +
        (srcset ? 'srcset="' + srcset + '"' : '') +
        ' src="' +
        url +
        '" onerror="this.onerror=null;this.src=\'' +
        url +
        '\';">'
    );
}

function mescape(message) {
    return message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function extraMessageTokenize(message, chat_number, bits, previewsEmote) {
    var SplittedMessage = message.split(' '),
        retArray = [],
        emote,
        cheer,
        i = 0,
        len = SplittedMessage.length,
        skipEscape;

    if (previewsEmote) {
        SplittedMessage[0] = previewsEmote;
        skipEscape = true;
    }

    for (i; i < len; i++) {
        cheer = bits ? findCheerInToken(SplittedMessage[i], chat_number) : 0;

        if (cheer) {
            retArray.push(cheer);
        } else {
            emote = extraEmotes[chat_number][SplittedMessage[i]];

            //some 7tv emotes goes direct on top of the center of the previews emote
            if (retArray.length && emote && emote.chat_div_zero && Main_A_includes_B(retArray[retArray.length - 1], 'emoticon')) {
                retArray[retArray.length - 1] = Main_A_includes_B(retArray[retArray.length - 1], 'zero-width-container')
                    ? zeroWidthDiv(retArray[retArray.length - 1], emote.chat_div_zero)
                    : zeroWidth(retArray[retArray.length - 1], emote.chat_div_zero);
            } else if (emote) {
                retArray.push(emote.chat_div);
            } else {
                retArray.push(!i && skipEscape ? SplittedMessage[i] : twemoji.parse(mescape(SplittedMessage[i]), true, true));
            }
        }
    }

    return retArray.join(' ') + (bits ? ' ' + bits + ' bits' : '');
}

function zeroWidth(parent, zero) {
    return '<div class="zero-width-container" >' + parent.replace('emoticon', 'emoticon zero-width-emote') + zero + '</div>';
}

function zeroWidthDiv(parent, zero) {
    return parent.replace('</div>', zero) + '</div>';
}

function findCheerInToken(message, chat_number) {
    var cheerPrefixes = Object.keys(cheers[ChatLive_selectedChannel_id[chat_number]]),
        tokenLower = message.toLowerCase(),
        index = -1,
        i = 0,
        len = cheerPrefixes.length;

    for (i; i < len; i++) {
        //Try  case sensitive first as some prefixes start the same, but some users type without carrying about case
        if (Main_startsWith(message, cheerPrefixes[i])) {
            return getCheer(cheerPrefixes[i], parseInt(message.slice(cheerPrefixes[i].length), 10), chat_number);
        }

        //Try  case insensitive after
        if (Main_startsWith(tokenLower, cheerPrefixes[i].toLowerCase())) {
            index = i;
        }
    }

    return index > -1 ? getCheer(cheerPrefixes[index], parseInt(tokenLower.slice(cheerPrefixes[index].toLowerCase().length), 10), chat_number) : null;
}

function getCheer(prefix, amount, chat_number) {
    var amounts = cheers[ChatLive_selectedChannel_id[chat_number]][prefix],
        amountsArray = Object.keys(amounts),
        length = amountsArray.length;

    //Run on reverse order to catch the correct position amountsArray = 1000, 500, 100, 1 ... amount = 250
    while (length--) {
        if (amount >= amountsArray[length]) return amounts[amountsArray[length]];
    }

    //Fail safe
    return amounts[amountsArray[0]];
}

function emoticonize(message, emotes) {
    if (!emotes) return [message];

    var tokenizedMessage = [],
        property,
        replacements = [],
        replacement,
        emote,
        i,
        len;

    for (property in emotes) {
        emote = emotes[property];

        for (i = 0, len = emote.length; i < len; i++) {
            replacements.push({
                id: property,
                first: emote[i][0],
                last: emote[i][1]
            });
        }
    }

    replacements.sort(function (a, b) {
        return b.first - a.first;
    });

    // Tokenizes each character into an array
    // punycode deals with unicode symbols on surrogate pairs
    // punycode is used in the replacements loop below as well
    message = punycode.ucs2.decode(message);

    for (i = 0, len = replacements.length; i < len; i++) {
        replacement = replacements[i];

        // Unshift the end of the message (that doesn't contain the emote)
        tokenizedMessage.unshift(punycode.ucs2.encode(message.slice(replacement.last + 1)));

        // Unshift the emote HTML (but not as a string to allow us to process links and escape html still)
        tokenizedMessage.unshift([emoteTemplate(emoteURL(replacement.id))]);

        // Splice the unparsed piece of the message
        message = message.slice(0, replacement.first);
    }

    // Unshift the remaining part of the message (that contains no emotes)
    tokenizedMessage.unshift(punycode.ucs2.encode(message));
    return tokenizedMessage;
}

// function calculateColorReplacement(color) {
//     // Modified from http://www.sitepoint.com/javascript-generate-lighter-darker-color/
//     var rgb = "#",
//         brightness = "0.5", c, i;

//     if (color === '#000000') return "#2cffa2";//Black can't be see on a black background

//     color = String(color).replace(/[^0-9a-f]/gi, '');
//     if (color.length < 6) {
//         color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
//     }

//     for (i = 0; i < 3; i++) {
//         c = parseInt(color.slice(i * 2, 2), 16);
//         if (c < 10) c = 10;
//         c = Math.round(Math.min(Math.max(0, c + (c * brightness)), 255)).toString(16);
//         rgb += ("00" + c).slice(c.length);
//     }

//     return rgb;
// }
