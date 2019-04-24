//The bellow are some function or adptations of function from https://www.nightdev.com/kapchat/
function extraEmoticonize(sender, message, emote) {
    if (emote.restrictions) {
        if (emote.restrictions.channels && emote.restrictions.channels.length && emote.restrictions.channels.indexOf(Main_values.Play_selectedChannel) === -1) return message;

        if (emote.restrictions.games && emote.restrictions.games.length) return message;
    }

    return message.replace(emote.code, extraEmoteTemplate(emote));
}

function extraEmoteTemplate(emote) {
    return '<img class="emoticon ' + emote.source + '-emo-' + emote.id + '" src="' + emote['1x'] + '" srcset="' + emote['2x'] + ' 2x, ' + emote['3x'] + ' 4x" />';
}

function mescape(message) {
    return message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function extraMessageTokenize(sender, message) {
    var tokenizedString = message.split(' ');

    for (var i = 0; i < tokenizedString.length; i++) {
        var piece = tokenizedString[i];

        var test = piece.replace(/(^[~!@#$%\^&\*\(\)]+|[~!@#$%\^&\*\(\)]+$)/g, '');
        var emote = extraEmotes[test] || extraEmotes[piece];

        if (emote) {
            piece = extraEmoticonize(sender, piece, emote);
        } else {
            piece = mescape(piece);
        }

        tokenizedString[i] = piece;
    }

    return tokenizedString.join(' ');
}

function emoteTemplate(id) {
    return '<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/' + id + '/3.0 4x" />';
}

function emoticonize(message, emotes) {
    if (!emotes) return [message];

    var tokenizedMessage = [];

    var emotesList = Object.keys(emotes);

    var replacements = [];

    emotesList.forEach(function(id) {
        var emote = emotes[id];

        for (var i = emote.length - 1; i >= 0; i--) {
            replacements.push({
                id: id,
                first: emote[i][0],
                last: emote[i][1]
            });
        }
    });

    replacements.sort(function(a, b) {
        return b.first - a.first;
    });

    // Tokenizes each character into an array
    // punycode deals with unicode symbols on surrogate pairs
    // punycode is used in the replacements loop below as well
    message = punycode.ucs2.decode(message);

    replacements.forEach(function(replacement) {
        // Unshift the end of the message (that doesn't contain the emote)
        tokenizedMessage.unshift(punycode.ucs2.encode(message.slice(replacement.last + 1)));

        // Unshift the emote HTML (but not as a string to allow us to process links and escape html still)
        tokenizedMessage.unshift([emoteTemplate(replacement.id)]);

        // Splice the unparsed piece of the message
        message = message.slice(0, replacement.first);
    });

    // Unshift the remaining part of the message (that contains no emotes)
    tokenizedMessage.unshift(punycode.ucs2.encode(message));

    return tokenizedMessage;
}

function transformBadges(sets) {
    return Object.keys(sets).map(function(b) {
        var badge = sets[b];
        badge.type = b;
        badge.versions = Object.keys(sets[b].versions).map(function(v) {
            var version = sets[b].versions[v];
            version.type = v;
            return version;
        });
        return badge;
    });
}

function tagCSS(type, version, url, doc) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.' + type + '-' + version + ' { background-image: url("' + url.replace('http:', 'https:') + '"); }';
    if (doc) doc.appendChild(style);
    else document.head.appendChild(style);
}