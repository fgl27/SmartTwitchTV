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

//Used as based https://kevinfaguiar.github.io/vue-twemoji-picker/docs/emoji-datasets/
//https://github.com/kevinfaguiar/vue-twemoji-picker/tree/master/emoji-data/en
//https://emojipedia.org/
//But removed not working or not needed as is too much
var emojis = [
    {
        unicode: '😀',
        tags: 'grin'
    },
    {
        unicode: '😃',
        tags: 'smile'
    },
    {
        unicode: '😄',
        tags: 'smile2'
    },
    {
        unicode: '😁',
        tags: 'smile3'
    },
    {
        unicode: '😆',
        tags: 'satisfied'
    },
    {
        unicode: '😅',
        tags: 'sweat'
    },
    {
        unicode: '🤣',
        tags: 'rolling'
    },
    {
        unicode: '😂',
        tags: 'tear'
    },
    {
        unicode: '🙂',
        tags: 'smile4'
    },
    {
        unicode: '🙃',
        tags: 'smile-upside-down'
    },
    {
        unicode: '😉',
        tags: 'wink'
    },
    {
        unicode: '😊',
        tags: 'smile-blush'
    },
    {
        unicode: '😇',
        tags: 'angel'
    },
    {
        unicode: '🥰',
        tags: 'adore'
    },
    {
        unicode: '😍',
        tags: 'smile-love'
    },
    {
        unicode: '🤩',
        tags: 'smile-star'
    },
    {
        unicode: '😘',
        tags: 'kiss'
    },
    {
        unicode: '😗',
        tags: 'kiss2'
    },
    {
        unicode: '☺️',
        tags: 'relaxed'
    },
    {
        unicode: '😚',
        tags: 'kiss3'
    },
    {
        unicode: '😙',
        tags: 'kis4'
    },
    {
        unicode: '😋',
        tags: 'delicious'
    },
    {
        unicode: '😛',
        tags: 'tongue'
    },
    {
        unicode: '😜',
        tags: 'tongue-wink'
    },
    {
        unicode: '🤪',
        tags: 'goofy'
    },
    {
        unicode: '😝',
        tags: 'tongue-><'
    },
    {
        unicode: '🤑',
        tags: 'face-money'
    },
    {
        unicode: '🤗',
        tags: 'hugging'
    },
    {
        unicode: '🤭',
        tags: 'whoops'
    },
    {
        unicode: '🤫',
        tags: 'quiet'
    },
    {
        unicode: '🤔',
        tags: 'thinking'
    },
    {
        unicode: '🤐',
        tags: 'zipper'
    },
    {
        unicode: '🤨',
        tags: 'skeptic'
    },
    {
        unicode: '😑',
        tags: 'unexpressive'
    },
    {
        unicode: '😶',
        tags: 'silent'
    },
    {
        unicode: '😏',
        tags: 'smirk'
    },
    {
        unicode: '😒',
        tags: 'unhappy'
    },
    {
        unicode: '🙄',
        tags: 'eyeroll'
    },
    {
        unicode: '😬',
        tags: 'grimace'
    },
    {
        unicode: '🤥',
        tags: 'pinocchio'
    },
    {
        unicode: '😌',
        tags: 'relieved'
    },
    {
        unicode: '😔',
        tags: 'pensive'
    },
    {
        unicode: '😪',
        tags: 'sleep'
    },
    {
        unicode: '🤤',
        tags: 'drooling-face'
    },
    {
        unicode: '😴',
        tags: 'sleep-face'
    },
    {
        unicode: '😷',
        tags: 'cold-face'
    },
    {
        unicode: '🤒',
        tags: 'sick-face'
    },
    {
        unicode: '🤕',
        tags: 'bandage-face'
    },
    {
        unicode: '🤢',
        tags: 'nauseated-face'
    },
    {
        unicode: '🤮',
        tags: 'sick-face'
    },
    {
        unicode: '🤧',
        tags: 'sneeze'
    },
    {
        unicode: '🥵',
        tags: 'feverish'
    },
    {
        unicode: '🥶',
        tags: 'blue-faced'
    },
    {
        unicode: '🥴',
        tags: 'intoxicated'
    },
    {
        unicode: '😵',
        tags: 'dizzy'
    },
    {
        unicode: '🤯',
        tags: 'mind blown'
    },
    {
        unicode: '🤠',
        tags: 'cowboy'
    },
    {
        unicode: '🥳',
        tags: 'celebration'
    },
    {
        unicode: '😎',
        tags: 'cool-face'
    },
    {
        unicode: '🤓',
        tags: 'cool'
    },
    {
        unicode: '🧐',
        tags: 'stuffy'
    },
    {
        unicode: '😕',
        tags: 'confused'
    },
    {
        unicode: '😟',
        tags: 'worried'
    },
    {
        unicode: '🙁',
        tags: 'frown'
    },
    {
        unicode: '☹️',
        tags: 'frown'
    },
    {
        unicode: '😮',
        tags: 'mouth-open'
    },
    {
        unicode: '😯',
        tags: 'surprised'
    },
    {
        unicode: '😲',
        tags: 'astonished'
    },
    {
        unicode: '😳',
        tags: 'dazed'
    },
    {
        unicode: '🥺',
        tags: 'puppy eyes'
    },
    {
        unicode: '😦',
        tags: 'frown'
    },
    {
        unicode: '😧',
        tags: 'anguished'
    },
    {
        unicode: '😨',
        tags: 'fearful'
    },
    {
        unicode: '😰',
        tags: 'fearful2'
    },
    {
        unicode: '😥',
        tags: 'disappointed'
    },
    {
        unicode: '😢',
        tags: 'cry-face'
    },
    {
        unicode: '😭',
        tags: 'cry-face2'
    },
    {
        unicode: '😱',
        tags: 'fear-face'
    },
    {
        unicode: '😖',
        tags: 'confounded'
    },
    {
        unicode: '😣',
        tags: 'persevere'
    },
    {
        unicode: '😞',
        tags: 'disappointed'
    },
    {
        unicode: '😓',
        tags: 'cold'
    },
    {
        unicode: '😩',
        tags: 'weary'
    },
    {
        unicode: '😫',
        tags: 'tired'
    },
    {
        unicode: '😤',
        tags: 'triumph'
    },
    {
        unicode: '😡',
        tags: 'angry'
    },
    {
        unicode: '😠',
        tags: 'mad'
    },
    {
        unicode: '🤬',
        tags: 'swearing'
    },
    {
        unicode: '😈',
        tags: 'devil'
    },
    {
        unicode: '👿',
        tags: 'demon'
    },
    {
        unicode: '💀',
        tags: 'death'
    },
    {
        unicode: '☠️',
        tags: 'crossbones'
    },
    {
        unicode: '💩',
        tags: 'poop'
    },
    {
        unicode: '🤡',
        tags: 'clown'
    },
    {
        unicode: '👹',
        tags: 'creature'
    },
    {
        unicode: '👺',
        tags: 'creature2'
    },
    {
        unicode: '👻',
        tags: 'ghost'
    },
    {
        unicode: '👾',
        tags: 'alien'
    },
    {
        unicode: '🤖',
        tags: 'robot'
    },
    {
        unicode: '😺',
        tags: 'cat-face'
    },
    {
        unicode: '😸',
        tags: 'cat-smile'
    },
    {
        unicode: '😹',
        tags: 'cat-tear'
    },
    {
        unicode: '😻',
        tags: 'cat-heart'
    },
    {
        unicode: '😼',
        tags: 'cat-ironic'
    },
    {
        unicode: '😽',
        tags: 'cat-kiss'
    },
    {
        unicode: '🙀',
        tags: 'cat-surprised'
    },
    {
        unicode: '😿',
        tags: 'cat-sad'
    },
    {
        unicode: '😾',
        tags: 'cat-pouting'
    },
    {
        unicode: '👋',
        tags: 'hand-wave'
    },
    {
        unicode: '🤚',
        tags: 'backhand'
    },
    {
        unicode: '🖐️',
        tags: 'hand-open-finger'
    },
    {
        unicode: '✋',
        tags: 'hand'
    },
    {
        unicode: '🖖',
        tags: 'hand-vulcan'
    },
    {
        unicode: '👌',
        tags: 'hand-ok'
    },
    {
        unicode: '✌️',
        tags: 'hand-v'
    },
    {
        unicode: '🤞',
        tags: 'hand-cross'
    },
    {
        unicode: '🤟',
        tags: 'hand-ily'
    },
    {
        unicode: '🤘',
        tags: 'hand-horns'
    },
    {
        unicode: '🤙',
        tags: 'hand-call'
    },
    {
        unicode: '🖕',
        tags: 'hand-finger'
    },
    {
        unicode: '👈',
        tags: 'hand-point'
    },
    {
        unicode: '👇',
        tags: 'hand-poin2'
    },
    {
        unicode: '☝️',
        tags: 'hand-point3'
    },
    {
        unicode: '👍',
        tags: 'hand-thumb-up'
    },
    {
        unicode: '👎',
        tags: 'hand-thumb-down'
    },
    {
        unicode: '✊',
        tags: 'hand-punch'
    },
    {
        unicode: '👊',
        tags: 'hand-punch2'
    },
    {
        unicode: '🤛',
        tags: 'hand-punch3'
    },
    {
        unicode: '🤜',
        tags: 'hand-punch4'
    },
    {
        unicode: '👏',
        tags: 'hand-clap'
    },
    {
        unicode: '🙌',
        tags: 'hand-celebration'
    },
    {
        unicode: '👐',
        tags: 'hand-open'
    },
    {
        unicode: '🤲',
        tags: 'hand-prayer'
    },
    {
        unicode: '🤝',
        tags: 'hand-agreement'
    },
    {
        unicode: '🙏',
        tags: 'hand-please'
    },
    {
        unicode: '✍️',
        tags: 'hand-write'
    },
    {
        unicode: '💅',
        tags: 'cosmetics'
    },
    {
        unicode: '🤳',
        tags: 'self'
    },
    {
        unicode: '💪',
        tags: 'muscle'
    },
    {
        unicode: '🦵',
        tags: 'kick'
    },
    {
        unicode: '🦶',
        tags: 'kick2'
    },
    {
        unicode: '👂',
        tags: 'ear'
    },
    {
        unicode: '👃',
        tags: 'nose'
    },
    {
        unicode: '🧠',
        tags: 'brain'
    },
    {
        unicode: '🦷',
        tags: 'tooth'
    },
    {
        unicode: '👀',
        tags: 'eyes'
    },
    {
        unicode: '👁️',
        tags: 'eye'
    },
    {
        unicode: '👅',
        tags: 'tongue2'
    },
    {
        unicode: '👄',
        tags: 'lips'
    },
    {
        unicode: '👶',
        tags: 'baby'
    },
    {
        unicode: '👨‍🦲',
        tags: 'bald'
    },
    {
        unicode: '👴',
        tags: 'old-man'
    },
    {
        unicode: '👵',
        tags: 'old-woman'
    },
    {
        unicode: '🔥',
        tags: 'fire'
    },
    {
        unicode: '👨‍🚒',
        tags: 'firefighter'
    },
    {
        unicode: '👩‍🚒',
        tags: 'firefighter2'
    },
    {
        unicode: '👮‍♂️',
        tags: 'police-officer'
    },
    {
        unicode: '👮‍♀️',
        tags: 'police-officer-woman'
    },
    {
        unicode: '👨‍👩‍👧‍👦',
        tags: 'family'
    },
    {
        unicode: '🙈',
        tags: 'monkey-see'
    },
    {
        unicode: '🙉',
        tags: 'monkey-hear'
    },
    {
        unicode: '🙊',
        tags: 'monkey-speak'
    },
    {
        unicode: '💋',
        tags: 'kiss-lips'
    },
    {
        unicode: '💌',
        tags: 'heart-letter'
    },
    {
        unicode: '💘',
        tags: 'arrow-cupid'
    },
    {
        unicode: '💝',
        tags: 'valentine'
    },
    {
        unicode: '💖',
        tags: 'sparkle-heart'
    },
    {
        unicode: '💗',
        tags: 'pulse'
    },
    {
        unicode: '💓',
        tags: 'beating'
    },
    {
        unicode: '💞',
        tags: 'revolving'
    },
    {
        unicode: '💕',
        tags: 'love'
    },
    {
        unicode: '❣️',
        tags: 'exclamation'
    },
    {
        unicode: '💔',
        tags: 'broken-heart'
    },
    {
        unicode: '💟',
        tags: 'heart-Decoration'
    },
    {
        unicode: '🖤',
        tags: 'heart-black'
    },
    {
        unicode: '🤎',
        tags: 'heart-brown'
    },
    {
        unicode: '💙',
        tags: 'heart-blue'
    },
    {
        unicode: '💚',
        tags: 'heart-green'
    },
    {
        unicode: '🧡',
        tags: 'heart-orange'
    },
    {
        unicode: '💜',
        tags: 'heart-purple'
    },
    {
        unicode: '❤️',
        tags: 'heart-red'
    },
    {
        unicode: '🤍',
        tags: 'black-white'
    },
    {
        unicode: '💛',
        tags: 'heart-yellow'
    },
    {
        unicode: '💯',
        tags: 'hundred'
    },
    {
        unicode: '💢',
        tags: 'mad'
    },
    {
        unicode: '💥',
        tags: 'boom'
    },
    {
        unicode: '💫',
        tags: 'stars'
    },
    {
        unicode: '💦',
        tags: 'splashing'
    },
    {
        unicode: '💨',
        tags: 'comic-dash'
    },
    {
        unicode: '🕳️',
        tags: 'hole'
    },
    {
        unicode: '💬',
        tags: 'balloon-dialog'
    },
    {
        unicode: '🗨️',
        tags: 'dialog'
    },
    {
        unicode: '🗯️',
        tags: 'angry-balloon'
    },
    {
        unicode: '💭',
        tags: 'balloon-bubble'
    },
    {
        unicode: '💤',
        tags: 'comic-sleep'
    },
    {
        unicode: '🕶️',
        tags: 'glasses-dark'
    },
    {
        unicode: '🥽',
        tags: 'glasses-swimming'
    },
    {
        unicode: '🥼',
        tags: 'scientist'
    },
    {
        unicode: '👔',
        tags: 'tie'
    },
    {
        unicode: '👕',
        tags: 'tshirt'
    },
    {
        unicode: '👖',
        tags: 'pants'
    },
    {
        unicode: '🧣',
        tags: 'neck'
    },
    {
        unicode: '🧤',
        tags: 'hand'
    },
    {
        unicode: '🧥',
        tags: 'jacket'
    },
    {
        unicode: '🧦',
        tags: 'stocking'
    },
    {
        unicode: '👗',
        tags: 'clothing'
    },
    {
        unicode: '👘',
        tags: 'clothing2'
    },
    {
        unicode: '👙',
        tags: 'swim-clothing'
    },
    {
        unicode: '👚',
        tags: 'woman-clothing'
    },
    {
        unicode: '👛',
        tags: 'coin-clothing'
    },
    {
        unicode: '👜',
        tags: 'purse'
    },
    {
        unicode: '👝',
        tags: 'pouch'
    },
    {
        unicode: '🛍️',
        tags: 'shopping-bag'
    },
    {
        unicode: '🎒',
        tags: 'school-bag'
    },
    {
        unicode: '👞',
        tags: 'shoe'
    },
    {
        unicode: '👟',
        tags: 'sneaker'
    },
    {
        unicode: '🥾',
        tags: 'hiking-boot'
    },
    {
        unicode: '🥿',
        tags: 'ballet flat'
    },
    {
        unicode: '👠',
        tags: 'woman-shoe'
    },
    {
        unicode: '👡',
        tags: 'woman-shoe2'
    },
    {
        unicode: '👢',
        tags: 'woman-boot'
    },
    {
        unicode: '👑',
        tags: 'king'
    },
    {
        unicode: '👒',
        tags: 'hat'
    },
    {
        unicode: '🎩',
        tags: 'tophat'
    },
    {
        unicode: '🧢',
        tags: 'baseball cap'
    },
    {
        unicode: '⛑️',
        tags: 'aid'
    },
    {
        unicode: '📿',
        tags: 'beads'
    },
    {
        unicode: '💄',
        tags: 'lipstick'
    },
    {
        unicode: '💍',
        tags: 'diamond-ring'
    },
    {
        unicode: '💎',
        tags: 'diamond'
    },
    {
        unicode: '🔇',
        tags: 'mute'
    },
    {
        unicode: '🔉',
        tags: 'medium'
    },
    {
        unicode: '🔊',
        tags: 'loud'
    },
    {
        unicode: '📢',
        tags: 'loud2'
    },
    {
        unicode: '📣',
        tags: 'cheering'
    },
    {
        unicode: '📯',
        tags: 'horn'
    },
    {
        unicode: '🔔',
        tags: 'bell'
    },
    {
        unicode: '🔕',
        tags: 'bell'
    },
    {
        unicode: '🎼',
        tags: 'music-score'
    },
    {
        unicode: '🎵',
        tags: 'music-note'
    },
    {
        unicode: '🎶',
        tags: 'music-notes'
    },
    {
        unicode: '🎙️',
        tags: 'microphone'
    },
    {
        unicode: '🎤',
        tags: 'microphone2'
    },
    {
        unicode: '🎷',
        tags: 'sax'
    },
    {
        unicode: '🎸',
        tags: 'guitar'
    },
    {
        unicode: '🎹',
        tags: 'piano-keys'
    },
    {
        unicode: '🎺',
        tags: 'trumpet'
    },
    {
        unicode: '🎻',
        tags: 'violin'
    },
    {
        unicode: '🥁',
        tags: 'drumsticks'
    },
    {
        unicode: '📱',
        tags: 'cellphone'
    },
    {
        unicode: '☎️',
        tags: 'phone'
    },
    {
        unicode: '📞',
        tags: 'phone2'
    },
    {
        unicode: '📠',
        tags: 'fax'
    },
    {
        unicode: '🔋',
        tags: 'battery'
    },
    {
        unicode: '🔌',
        tags: 'plug'
    },
    {
        unicode: '🖥️',
        tags: 'computer-desktop'
    },
    {
        unicode: '🖨️',
        tags: 'printer'
    },
    {
        unicode: '⌨️',
        tags: 'keyboard'
    },
    {
        unicode: '🖱️',
        tags: 'mouse-computer'
    },
    {
        unicode: '💽',
        tags: 'computer-disk'
    },
    {
        unicode: '💾',
        tags: 'floppy-disk'
    },
    {
        unicode: '📀',
        tags: 'blu-ray'
    },
    {
        unicode: '🧮',
        tags: 'calculation'
    },
    {
        unicode: '🎥',
        tags: 'camera'
    },
    {
        unicode: '🎞️',
        tags: 'cinema'
    },
    {
        unicode: '📽️',
        tags: 'cinema2'
    },
    {
        unicode: '📸',
        tags: 'camera-flash'
    },
    {
        unicode: '📼',
        tags: 'vhs-tape'
    },
    {
        unicode: '🔎',
        tags: 'magnifying'
    },
    {
        unicode: '🕯️',
        tags: 'light'
    },
    {
        unicode: '💡',
        tags: 'bulb'
    },
    {
        unicode: '🔦',
        tags: 'electric-torch'
    },
    {
        unicode: '📒',
        tags: 'notebook'
    },
    {
        unicode: '📃',
        tags: 'note'
    },
    {
        unicode: '📰',
        tags: 'newspaper'
    },
    {
        unicode: '🗞️',
        tags: 'newspaper-rolled'
    },
    {
        unicode: '💴',
        tags: 'money-rolled'
    },
    {
        unicode: '💲',
        tags: 'dollar-sign'
    },
    {
        unicode: '✉️',
        tags: 'email'
    },
    {
        unicode: '✏️',
        tags: 'pencil'
    },
    {
        unicode: '✒️',
        tags: 'pen'
    },
    {
        unicode: '📝',
        tags: 'note-pencil'
    },
    {
        unicode: '💼',
        tags: 'briefcase'
    },
    {
        unicode: '🗓️',
        tags: 'calendar'
    },
    {
        unicode: '📌',
        tags: 'pin'
    },
    {
        unicode: '📍',
        tags: 'pin2'
    },
    {
        unicode: '📎',
        tags: 'paperclip'
    },
    {
        unicode: '📏',
        tags: 'ruler'
    },
    {
        unicode: '📐',
        tags: 'ruler2'
    },
    {
        unicode: '✂️',
        tags: 'cutting'
    },
    {
        unicode: '🗑️',
        tags: 'wastebasket'
    },
    {
        unicode: '🔑',
        tags: 'key'
    },
    {
        unicode: '🗝️',
        tags: 'key-old'
    },
    {
        unicode: '🔨',
        tags: 'hammer'
    },
    {
        unicode: '⛏️',
        tags: 'pickaxe'
    },
    {
        unicode: '⚒️',
        tags: 'hammer2'
    },
    {
        unicode: '🛠️',
        tags: 'hammer-wrench'
    },
    {
        unicode: '🗡️',
        tags: 'knife'
    },
    {
        unicode: '⚔️',
        tags: 'swords'
    },
    {
        unicode: '🔫',
        tags: 'gun-tool'
    },
    {
        unicode: '🏹',
        tags: 'archer'
    },
    {
        unicode: '🛡️',
        tags: 'shield'
    },
    {
        unicode: '🔧',
        tags: 'spanner'
    },
    {
        unicode: '🔩',
        tags: 'bolt'
    },
    {
        unicode: '⚙️',
        tags: 'cog'
    },
    {
        unicode: '⚖️',
        tags: 'balance'
    },
    {
        unicode: '🔗',
        tags: 'link'
    },
    {
        unicode: '🧲',
        tags: 'magnetic'
    },
    {
        unicode: '⚗️',
        tags: 'chemistry'
    },
    {
        unicode: '🧪',
        tags: 'chemist'
    },
    {
        unicode: '🧬',
        tags: 'gene'
    },
    {
        unicode: '🔬',
        tags: 'microscope'
    },
    {
        unicode: '🔭',
        tags: 'telescope'
    },
    {
        unicode: '📡',
        tags: 'antenna-dish'
    },
    {
        unicode: '💉',
        tags: 'medicine'
    },
    {
        unicode: '💊',
        tags: 'medicine'
    },
    {
        unicode: '🚪',
        tags: 'door'
    },
    {
        unicode: '🛏️',
        tags: 'hotel-bed'
    },
    {
        unicode: '🚽',
        tags: 'toilet'
    },
    {
        unicode: '🚿',
        tags: 'shower'
    },
    {
        unicode: '🛁',
        tags: 'bath'
    },
    {
        unicode: '🧴',
        tags: 'lotion'
    },
    {
        unicode: '🧷',
        tags: 'diaper'
    },
    {
        unicode: '🧹',
        tags: 'sweeping'
    },
    {
        unicode: '🧺',
        tags: 'farming'
    },
    {
        unicode: '🧻',
        tags: 'toilet paper'
    },
    {
        unicode: '🧯',
        tags: 'extinguisher'
    },
    {
        unicode: '🛒',
        tags: 'shopping-cart'
    },
    {
        unicode: '🚬',
        tags: 'smoking'
    },
    {
        unicode: '✔️',
        tags: 'check'
    },
    {
        unicode: '⚰️',
        tags: 'death'
    },
    {
        unicode: '🗿',
        tags: 'statue-face'
    },
    {
        unicode: '🐵',
        tags: 'monkey-face'
    },
    {
        unicode: '🐒',
        tags: 'monkey'
    },
    {
        unicode: '🦍',
        tags: 'gorilla'
    },
    {
        unicode: '🐶',
        tags: 'dog-face'
    },
    {
        unicode: '🐩',
        tags: 'dog'
    },
    {
        unicode: '🐺',
        tags: 'face'
    },
    {
        unicode: '🦊',
        tags: 'face'
    },
    {
        unicode: '🦝',
        tags: 'curious'
    },
    {
        unicode: '🐱',
        tags: 'cat'
    },
    {
        unicode: '🦁',
        tags: 'lion-face'
    },
    {
        unicode: '🐯',
        tags: 'tiger-face'
    },
    {
        unicode: '🐅',
        tags: 'tiger'
    },
    {
        unicode: '🐆',
        tags: 'leopard'
    },
    {
        unicode: '🐴',
        tags: 'horse-face'
    },
    {
        unicode: '🐎',
        tags: 'racehorse'
    },
    {
        unicode: '🦄',
        tags: 'unicorn-face'
    },
    {
        unicode: '🦓',
        tags: 'zebra'
    },
    {
        unicode: '🦌',
        tags: 'deer'
    },
    {
        unicode: '🐮',
        tags: 'cow'
    },
    {
        unicode: '🐂',
        tags: 'bull'
    },
    {
        unicode: '🐃',
        tags: 'buffalo'
    },
    {
        unicode: '🐄',
        tags: 'cow'
    },
    {
        unicode: '🐷',
        tags: 'pig-face'
    },
    {
        unicode: '🐖',
        tags: 'sow'
    },
    {
        unicode: '🐗',
        tags: 'pig'
    },
    {
        unicode: '🐽',
        tags: 'pig-nose'
    },
    {
        unicode: '🐏',
        tags: 'aries'
    },
    {
        unicode: '🐑',
        tags: 'sheep'
    },
    {
        unicode: '🐐',
        tags: 'capricorn'
    },
    {
        unicode: '🐪',
        tags: 'dromedary'
    },
    {
        unicode: '🐫',
        tags: 'camel'
    },
    {
        unicode: '🦙',
        tags: 'alpaca'
    },
    {
        unicode: '🦒',
        tags: 'spots'
    },
    {
        unicode: '🐘',
        tags: 'elephant'
    },
    {
        unicode: '🦏',
        tags: 'rhinoceros'
    },
    {
        unicode: '🦛',
        tags: 'hippo'
    },
    {
        unicode: '🐭',
        tags: 'mouse-face'
    },
    {
        unicode: '🐁',
        tags: 'mouse'
    },
    {
        unicode: '🐀',
        tags: 'rat'
    },
    {
        unicode: '🐹',
        tags: 'pet-face'
    },
    {
        unicode: '🐰',
        tags: 'bunny-face'
    },
    {
        unicode: '🐇',
        tags: 'bunny'
    },
    {
        unicode: '🐿️',
        tags: 'squirrel'
    },
    {
        unicode: '🦔',
        tags: 'spiny'
    },
    {
        unicode: '🦇',
        tags: 'vampire'
    },
    {
        unicode: '🐻',
        tags: 'face'
    },
    {
        unicode: '🐨',
        tags: 'bear'
    },
    {
        unicode: '🐼',
        tags: 'panda-face'
    },
    {
        unicode: '🦘',
        tags: 'marsupial'
    },
    {
        unicode: '🦡',
        tags: 'honey badger'
    },
    {
        unicode: '🐾',
        tags: 'paw'
    },
    {
        unicode: '🦃',
        tags: 'bird'
    },
    {
        unicode: '🐔',
        tags: 'chicken'
    },
    {
        unicode: '🐓',
        tags: 'rooster'
    },
    {
        unicode: '🐣',
        tags: 'baby-bird'
    },
    {
        unicode: '🐤',
        tags: 'baby-chick'
    },
    {
        unicode: '🐥',
        tags: 'baby-chick2'
    },
    {
        unicode: '🐧',
        tags: 'penguin'
    },
    {
        unicode: '🕊️',
        tags: 'bird-fly'
    },
    {
        unicode: '🦅',
        tags: 'eagle'
    },
    {
        unicode: '🦆',
        tags: 'duck'
    },
    {
        unicode: '🦢',
        tags: 'swan'
    },
    {
        unicode: '🦉',
        tags: 'owl'
    },
    {
        unicode: '🦚',
        tags: 'peahen'
    },
    {
        unicode: '🦜',
        tags: 'macaw'
    },
    {
        unicode: '🐸',
        tags: 'frog-face'
    },
    {
        unicode: '🐊',
        tags: 'crocodile'
    },
    {
        unicode: '🐢',
        tags: 'turtle'
    },
    {
        unicode: '🦎',
        tags: 'reptile'
    },
    {
        unicode: '🐍',
        tags: 'snake'
    },
    {
        unicode: '🐲',
        tags: 'dragon-face'
    },
    {
        unicode: '🐉',
        tags: 'dragon'
    },
    {
        unicode: '🦕',
        tags: 'brontosaurus'
    },
    {
        unicode: '🦖',
        tags: 't-rex'
    },
    {
        unicode: '🐳',
        tags: 'whale'
    },
    {
        unicode: '🐋',
        tags: 'whale2'
    },
    {
        unicode: '🐬',
        tags: 'flipper'
    },
    {
        unicode: '🐠',
        tags: 'tropical-fish'
    },
    {
        unicode: '🐡',
        tags: 'fish'
    },
    {
        unicode: '🦈',
        tags: 'shark'
    },
    {
        unicode: '🐙',
        tags: 'octopus'
    },
    {
        unicode: '🐚',
        tags: 'shell'
    },
    {
        unicode: '🐌',
        tags: 'snail'
    },
    {
        unicode: '🦋',
        tags: 'butterfly'
    },
    {
        unicode: '🐛',
        tags: 'insect'
    },
    {
        unicode: '🐜',
        tags: 'insect'
    },
    {
        unicode: '🐝',
        tags: 'bee'
    },
    {
        unicode: '🐞',
        tags: 'ladybug'
    },
    {
        unicode: '🦗',
        tags: 'grasshopper'
    },
    {
        unicode: '🕷️',
        tags: 'insect'
    },
    {
        unicode: '🕸️',
        tags: 'spider-web'
    },
    {
        unicode: '🦂',
        tags: 'scorpio'
    },
    {
        unicode: '🦟',
        tags: 'mosquito'
    },
    {
        unicode: '🦠',
        tags: 'amoeba'
    },
    {
        unicode: '💐',
        tags: 'flower'
    },
    {
        unicode: '🌸',
        tags: 'blossom'
    },
    {
        unicode: '🌹',
        tags: 'flower'
    },
    {
        unicode: '🥀',
        tags: 'flower-wilted'
    },
    {
        unicode: '🌺',
        tags: 'flower2'
    },
    {
        unicode: '🌻',
        tags: 'sun-flower'
    },
    {
        unicode: '🌼',
        tags: 'flower3'
    },
    {
        unicode: '🌷',
        tags: 'flower4'
    },
    {
        unicode: '🌱',
        tags: 'young-tree'
    },
    {
        unicode: '🌲',
        tags: 'tree'
    },
    {
        unicode: '🌳',
        tags: 'big-tree'
    },
    {
        unicode: '🌵',
        tags: 'plant'
    },
    {
        unicode: '🌿',
        tags: 'leaf'
    },
    {
        unicode: '☘️',
        tags: 'three-leaf clover'
    },
    {
        unicode: '🍀',
        tags: 'four-leaf clover'
    },
    {
        unicode: '🍁',
        tags: 'falling-leaf'
    },
    {
        unicode: '🏁',
        tags: 'checkered'
    },
    {
        unicode: '🚩',
        tags: 'post'
    },
    {
        unicode: '🎌',
        tags: 'japanese-celebration'
    },
    {
        unicode: '🏴',
        tags: 'flag-black'
    },
    {
        unicode: '🏳️',
        tags: 'flag-white'
    },
    {
        unicode: '🏳️‍🌈',
        tags: 'flag-pride'
    },
    {
        unicode: '🏴‍☠️',
        tags: 'flag-pirate'
    },
    {
        unicode: '🇦🇷',
        tags: 'AR'
    },
    {
        unicode: '🇦🇺',
        tags: 'AU'
    },
    {
        unicode: '🇧🇬',
        tags: 'BG'
    },
    {
        unicode: '🇧🇷',
        tags: 'BR'
    },
    {
        unicode: '🇨🇦',
        tags: 'CA'
    },
    {
        unicode: '🇨🇳',
        tags: 'CN'
    },
    {
        unicode: '🇨🇿',
        tags: 'CZ'
    },
    {
        unicode: '🇩🇪',
        tags: 'DE'
    },
    {
        unicode: '🇩🇰',
        tags: 'DK'
    },
    {
        unicode: '🇩🇲',
        tags: 'DM'
    },
    {
        unicode: '🇩🇴',
        tags: 'DO'
    },
    {
        unicode: '🇩🇿',
        tags: 'DZ'
    },
    {
        unicode: '🇪🇦',
        tags: 'EA'
    },
    {
        unicode: '🇪🇨',
        tags: 'EC'
    },
    {
        unicode: '🇪🇸',
        tags: 'ES'
    },
    {
        unicode: '🇫🇮',
        tags: 'FI'
    },
    {
        unicode: '🇫🇷',
        tags: 'FR'
    },
    {
        unicode: '🇬🇧',
        tags: 'GB'
    },
    {
        unicode: '🇭🇰',
        tags: 'HK'
    },
    {
        unicode: '🇮🇱',
        tags: 'IL'
    },
    {
        unicode: '🇮🇹',
        tags: 'IT'
    },
    {
        unicode: '🇯🇵',
        tags: 'JA'
    },
    {
        unicode: '🇰🇵',
        tags: 'KP'
    },
    {
        unicode: '🇰🇷',
        tags: 'KR'
    },
    {
        unicode: '🇳🇱',
        tags: 'NL'
    },
    {
        unicode: '🇳🇴',
        tags: 'NO'
    },
    {
        unicode: '🇵🇱',
        tags: 'PL'
    },
    {
        unicode: '🇵🇹',
        tags: 'PT'
    },
    {
        unicode: '🇷🇴',
        tags: 'RO'
    },
    {
        unicode: '🇷🇺',
        tags: 'RU'
    },
    {
        unicode: '🇸🇰',
        tags: 'SK'
    },
    {
        unicode: '🇸🇻',
        tags: 'SV'
    },
    {
        unicode: '🇹🇭',
        tags: 'TH'
    },
    {
        unicode: '🇹🇷',
        tags: 'TR'
    },
    {
        unicode: '🇻🇮',
        tags: 'VI'
    }
];

function SetEmojisObj() {
    var i = 0,
        len = emojis.length;
    for (i; i < len; i++) {
        emojis[i].id = i;
    }
    console.log(JSON.stringify(emojis));
}

SetEmojisObj();
