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

//Spacing for release maker not trow errors from jshint
function fr_FRLang() {
    // This is a false/true var change if day comes first in your language eg (27/12/2010) day 27 month 12 year 2010
    //Then copy this and set it to true, if doesn't don't copy it
    Main_IsDayFirst = true;

    // This is the size of side pannel a adjustments may be needed here so it can fit all words in the horizontal axis
    // If it need ajustment or yours language just copy the below line and change it value until it does
    Sidepannel_MoveldefaultMargin = 14.5;

    //Below are variables to translate
    STR_KEY_UP_DOWN = 'Pg préc/suiv';
    STR_KEY_MEDIA_FF = 'ou la touche média avance/retour rapide';
    STR_GUIDE_EXTRA = 'ou appuyez sur la touche 2';
    STR_GUIDE_EXTRA2 = 'ou touche média piste suivante';
    STR_REFRESH = 'Actualiser';
    STR_SEARCH = 'Rechercher';
    STR_SETTINGS = 'Paramètres';
    STR_CONTROLS = 'Commandes';
    STR_ABOUT = 'À propos';
    STR_HIDE = 'Masquer';
    STR_SEARCH_EMPTY = 'Vous avez saisi une recherche vide';
    STR_SEARCH_RESULT_EMPTY = 'Aucun résultat trouvé';
    STR_SWITCH = 'Changer d\'écran';
    STR_SWITCH_USER = 'Changer d\'écran utilisateur';
    STR_SWITCH_VOD = 'Changer : VOD ou temps forts';
    STR_SWITCH_CLIP = 'Changer : Période (24 h, 7 j, 30 j, tout)';
    STR_GO_TO = 'Aller à l\'écran';
    STR_USER = 'Utilisateur';
    STR_GAMES = 'Jeux';
    STR_PLAYING = 'Joue à';
    STR_FOR = 'pour';
    STR_WATCHING = 'Temps de visionnage';
    STR_WAITING = 'Temps d\'attente';
    STR_SINCE = 'Depuis';
    STR_AGAME = 'Un jeu';
    STR_PLACEHOLDER_PASS = 'Entrez votre mot de passe...';
    STR_PLACEHOLDER_SEARCH = 'Entrez votre recherche...';
    STR_PLACEHOLDER_OAUTH = 'Entrez votre clé d\'autorisation...';
    STR_PLACEHOLDER_USER = 'Entrez votre nom d\'utilisateur puis appuyez sur OK...';
    STR_PLACEHOLDER_PRESS = 'Appuyez sur OK ou Sélectionner pour';
    STR_CHANNELS = 'Chaînes';
    STR_CHANNEL = 'Chaîne';
    STR_GOBACK_START = 'Revenir à l\'écran précédent : appuyez sur Retour';
    STR_IS_OFFLINE = 's\'est terminé';
    STR_CHECK_HOST = ', vérification de l\'hôte';
    STR_IS_SUB_ONLY = 'Cette vidéo est réservée aux abonnés';
    STR_IS_SUB_ONLY_ERROR = 'est un contenu réservé aux abonnés.';
    STR_NOKEY_GENERAL_WARN = ', allez dans le panneau latéral (option du haut) Ajouter un utilisateur ou Utilisateur : changer, ajouter, clé, appuyez sur OK sur l\'utilisateur';
    STR_REFRESH_PROBLEM = 'Échec de la connexion ou aucun contenu disponible. Essayez d\'actualiser';
    STR_REFRESH_PROBLEM_ENTER = 'Échec de la connexion ou aucun contenu disponible. Essayez d\'actualiser.';
    STR_REFRESH_PROBLEM_ENTER_LANG =
        'Échec de la connexion ou aucun contenu pour cette langue. Changez la langue du contenu (maintenez Gauche) ou appuyez sur OK pour actualiser';
    STR_NO = 'Non';
    STR_FOR_THIS = 'pour ceci';
    STR_PLAYER_PROBLEM = 'Échec de la connexion, impossible de charger la vidéo, fermeture...';
    STR_VODS = 'VOD';
    STR_HIGHLIGHTS = 'Temps forts';
    STR_CONTENT = 'Contenu';
    STR_STREAM_ON = 'En live le';
    STR_DURATION = 'Durée';
    STR_VIEW = 'Vue';
    STR_VIEWS = 'Vues';
    STR_VIEWER = 'Spectateur';
    STR_VIEWERS = 'Spectateurs';
    STR_EXIT_AGAIN = 'Appuyez à nouveau pour quitter';
    STR_EXIT_AGAIN_PICTURE = 'Appuyez à nouveau pour quitter le mode picture-in-picture';
    STR_EXIT_AGAIN_MULTI = 'Appuyez à nouveau pour quitter le mode multistream';
    STR_EXIT_MESSAGE = 'Voulez-vous vraiment quitter SmartTV Client for Twitch ?';
    STR_EXIT = 'Quitter';
    STR_CHANGELOG = 'Journal des modifications';
    STR_FULL_CHANGELOG = 'Journal complet des modifications';
    STR_CHANGELOG_SUMMARY = 'Voici les dernières modifications. Pour la liste complète, consultez le lien ci-dessous :';
    STR_UPDATE = 'Cliquer pour mettre à jour';
    STR_UPDATE_CHECK = 'Rechercher des mises à jour';
    STR_UPDATE_CHECKING = 'Recherche de mises à jour...';
    STR_UPDATE_CHECKING_FAIL = 'Échec de la vérification des mises à jour';
    STR_NO_UPDATES = 'L\'application est à jour';
    STR_UPDATE_CHANGELOG = 'Mises à jour et journal des modifications';
    STR_UPDATE_LATEST = 'Dernière modification :';
    STR_UPDATE_FAIL = 'Échec du processus de mise à jour, veuillez essayer manuellement !';
    STR_UPDATE_FAIL_DOWNLOAD = 'Échec du téléchargement de la mise à jour. Veuillez essayer manuellement';
    STR_UPDATE_AVAILABLE = 'Mise à jour APK disponible';
    STR_WEB_UPDATE_AVAILABLE = 'Mise à jour Web disponible';
    STR_UPDATE_CHECK_SIDE = ', vérifiez le panneau latéral pour les mises à jour';
    STR_UPDATE_LAST_CHECK = 'Dernière vérification :';
    STR_UPDATE_OPT = 'Options de mise à jour';
    STR_UPDATE_CHECK_FOR = 'Rechercher des mises à jour en arrière-plan';
    STR_UPDATE_SHOW = 'Afficher une boîte de dialogue lorsqu\'une mise à jour est disponible';
    STR_UPDATE_SHOW_ARRAY = ['Oui', 'Seulement un toast', 'Non'];
    STR_UPDATE_START = 'Processus de mise à jour démarré. Cela peut prendre quelques secondes, veuillez patienter !';
    STR_UPDATE_PLAY = "Si le Play Store n'affiche pas la mise à jour, réessayez après quelques minutes !";
    STR_UPDATE_ERROR = 'Vous avez besoin de l\'APK version 3.0.303 ou plus récente pour utiliser ceci, mettez à jour de l\'ancienne façon !';
    STR_UPDATE_WARNING_OK = 'Application mise à jour avec succès';
    STR_CLOSE = 'Fermer';
    STR_MINIMIZE = 'Réduire';
    STR_CANCEL = 'Annuler';
    STR_RERUN = 'Relancer';
    STR_LIVE_CHANNELS = 'Chaînes en live';
    STR_LIVE_HOSTS = 'Hôtes';
    STR_LIVE_GAMES = 'Jeux en live';
    STR_USER_CHANNEL = 'Chaînes suivies';
    STR_USER_MY_CHANNEL = 'Ma chaîne';
    STR_USER_ADD = 'Ajouter un utilisateur';
    STR_USER_REMOVE = 'Supprimer un utilisateur';
    STR_USER_ERROR = 'L\'utilisateur n\'existe pas';
    STR_USER_HOSTING = 'héberge';
    STR_USER_HOSTED_BY = 'hébergé par';
    STR_USER_SET = 'déjà défini';
    STR_USER_MAKE_ONE = 'Basculer sur';
    STR_USER_NUMBER_ONE = 'Le premier utilisateur peut voir le flux des chaînes en live et suivre/ne plus suivre';
    STR_ADD_USER_SH = 'Ajoutez un utilisateur Twitch pour afficher ici les contenus qu\'il suit';
    STR_CLIP_WEEK = '7j';
    STR_CLIP_MONTH = '30j';
    STR_CLIP_ALL = 'tout';
    STR_JUMP_TIME = 'Saut';
    STR_JUMP_TIME_CLICK_AGAIN = 'Appuyez à nouveau pour sauter';
    STR_JUMP_T0 = 'vers';
    STR_JUMP_CANCEL = 'Saut annulé';
    STR_JUMP_TIME_BIG = ', temps de saut supérieur à la durée';
    STR_SEC = 's';
    STR_MIN = 'min';
    STR_MS = 'ms';
    STR_HR = 'h';
    STR_CLOSE_THIS = 'Appuyez sur Retour ou OK pour fermer ceci';
    STR_CLOSE_THIS2 = 'Appuyez sur Retour pour fermer ceci';
    STR_CLOSE_THIS3 = 'Appuyez sur Retour pour afficher la boîte de mise à jour ou sur OK pour fermer ceci';
    STR_PLAYER = 'Lecteur :';
    STR_CHAT = 'Chat :';
    STR_CHAT_SHOW = 'Afficher le chat';
    STR_CURRENT_VERSION = 'Version actuellement installée';
    STR_LATEST_VERSION = 'dernière version disponible';
    STR_CONTROLS_MAIN_2 = 'Lire une vidéo : naviguez avec le pavé directionnel (haut/bas/gauche/droite), appuyez sur OK, lecture/pause, touches média de prévisualisation ou touche 1';
    STR_CONTROLS_MAIN_3 = 'Actualiser le contenu de l\'écran :';
    STR_CONTROLS_MAIN_4 = 'Quitter l\'application : cliquez sur Quitter dans le panneau latéral';
    STR_CONTROLS_MAIN_5 = 'Forcer la fermeture de l\'application : maintenez Retour jusqu\'à la fermeture forcée';
    STR_CONTROLS_MAIN_6 = 'Changer d\'écran : appuyez sur Retour, puis utilisez le pavé directionnel haut/bas ou ' + STR_KEY_UP_DOWN + ' ' + STR_KEY_MEDIA_FF;
    STR_CONTROLS_MAIN_10 =
        'Lancer une recherche : dans le panneau latéral, cliquez sur Rechercher, tapez votre requête et appuyez sur OK sur le clavier virtuel, puis choisissez une des options de recherche';
    STR_CONTROLS_MAIN_14 = 'À propos de cette application : cliquez sur À propos dans le panneau latéral';
    STR_ABOUT_INFO_1 = 'Ceci est un client Twitch pour Android TV, disponible gratuitement pour tous.';
    STR_ABOUT_INFO_2 =
        'Cette application n\'est pas affiliée à Twitch, c\'est une application créée par un utilisateur, rendue possible uniquement parce que Twitch fournit toutes les API permettant d\'afficher le contenu Twitch.';
    STR_ABOUT_INFO_2_SOURCE = 'Cette version de l\'application est uniquement destinée aux tests dans le navigateur !';
    STR_ABOUT_INFO_3 = 'Coordonnées :';
    STR_ABOUT_INFO_4 = 'Cette application open source est distribuée sous licence GNU GPL v3.0, consultez-la sur GitHub :';

    STR_ABOUT_INFO_6 = 'Pour voir les dépendances de l\'application, utilisez le lien :';
    STR_ABOUT_INFO_18 = 'Support téléphone et tablette :';
    STR_ABOUT_INFO_19 =
        'Il est possible d\'utiliser cette application sur téléphone et tablette, mais elle est principalement conçue pour les téléviseurs. Le support des autres appareils est limité et, pour cette raison, l\'application n\'est pas publiée sur le Play Store. Utilisez le lien ci-dessous pour télécharger la dernière APK et installer manuellement l\'application sur un téléphone ou une tablette :';

    STR_CONTROLS_PLAY_0 = 'ou dans les commandes en bas du lecteur';
    STR_CONTROLS_PLAY_1 = 'Afficher le panneau d\'information : appuyez sur OK ou sur le pavé directionnel si le chat et le flux des chaînes en live ne sont pas affichés';
    STR_CONTROLS_PLAY_2 = 'Fermer la vidéo : appuyez deux fois sur Retour ou utilisez la touche média Stop';
    STR_CONTROLS_PLAY_3 = 'Mettre en pause / reprendre une vidéo : ouvrez le panneau d\'information et cliquez sur l\'icône Pause';
    STR_CONTROLS_PLAY_4 = 'Afficher le flux d\'aperçu : pavé directionnel Haut';
    STR_CONTROLS_PLAY_5 = 'Changer la qualité vidéo : choisissez l\'option « Qualité » en bas du lecteur';
    STR_CONTROLS_PLAY_6 = 'Forcer l\'actualisation d\'une vidéo (en cas de gel) : changez la qualité vidéo pour la même';
    STR_CONTROLS_PLAY_7 = 'Afficher ou masquer le chat : pavé directionnel Bas ou touche 3 ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_8 = 'Changer la position du chat : pavé directionnel Gauche, Pg haut ou touches de retour rapide (VOD et clips uniquement) ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_9 = 'Changer la taille du chat : pavé directionnel Droite, Pg bas ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_10 = 'Changer la luminosité du fond du chat : modifier dans les commandes en bas du lecteur';
    STR_CONTROLS_PLAY_11 =
        'Forcer l\'actualisation du chat sur un live (en cas de gel ou de non chargement) : choisissez l\'option « Forcer la désactivation du chat » en bas du lecteur (cliquez deux fois)';
    STR_CONTROLS_PLAY_12 = 'Lancer une recherche : ouvrez le panneau d\'information, utilisez le pavé directionnel (gauche/droite) pour aller sur « Rechercher » puis appuyez sur OK';
    STR_CONTROLS_PLAY_13 =
        'Toutes les touches média sont supportées (lecture, pause, stop, piste suivante, avance rapide, etc.), certaines servent de raccourcis pour les modes audio et vidéo';
    STR_CONTROLS_PLAY_14 =
        'Chat et vidéo côte à côte : touche 2 ou touche média avance rapide. Permet aussi de basculer entre l\'incrustation (picture-in-picture) et le mode 50/50';
    STR_F_DISABLE_CHAT = 'Forcer la désactivation du chat';
    STR_OAUTH_IN =
        'Ajouter une clé permet à l\'application d\'accéder au chat avec votre compte pour envoyer des messages et récupérer votre liste d\'émotes (permet aussi de recevoir les sub offerts dans le chat), suivre/ne plus suivre des chaînes et accéder plus rapidement à certains contenus utilisateur.<br><br>Ajouter une clé n\'est pas obligatoire et peut être fait plus tard.<br><br>En cas de doute, lisez le contenu de ce lien :<br><br>%x<br><br>Sur certains appareils, une souris est nécessaire pour terminer l\'autorisation, car vous devrez peut-être cliquer manuellement sur un bouton pour confirmer certaines actions.<br><br>Ajouter une clé pour';
    STR_USER_CODE = 'Ajouter une clé d\'autorisation';
    STR_USER_CODE_OK = 'Clé ajoutée avec succès';
    STR_KEY_BAD = 'Échec du test de la clé, une nouvelle clé doit être ajoutée';
    STR_OAUTH_WRONG = 'Vous essayez d\'ajouter une clé pour l\'utilisateur';
    STR_OAUTH_WRONG2 = 'mais cette clé appartient à l\'utilisateur';
    STR_FOLLOWING = 'Suivi';
    STR_FOLLOW = 'Non suivi';
    STR_IS_SUB_NOOAUTH = 'et vous n\'avez pas ajouté de clé d\'autorisation, l\'application ne peut donc pas vérifier votre statut d\'abonné.';
    STR_IS_SUB_NOT_SUB = 'et vous n\'êtes pas abonné à cette chaîne';
    STR_IS_SUB_IS_SUB = 'Vous êtes abonné à cette chaîne, mais un problème inconnu empêche la lecture.';
    STR_OAUTH_FAIL = 'Échec de la vérification d\'autorisation avec la clé fournie, veuillez vérifier et réessayer';
    STR_OAUTH_FAIL_USER = 'La clé ajoutée n\'appartient pas à l\'utilisateur';
    STR_NOKEY = 'Aucun utilisateur';
    STR_NOKEY_WARN = 'Vous devez définir un utilisateur pour suivre ou ne plus suivre des chaînes.';
    STR_FOLLOW_ISSUE =
        'Les applications tierces ne peuvent plus suivre ou ne plus suivre des chaînes. Le bouton n\'apparaîtra que si vous suivez déjà une chaîne.';
    STR_NOKUSER_WARN = 'Vous devez définir un utilisateur pour voir les contenus suivis.';
    STR_RESET = 'Redémarrer le';
    STR_CHANNEL_CONT = 'Contenu de la chaîne';
    STR_NET_DOWN = 'Aucune connexion réseau. L\'application nécessite une connexion Internet pour fonctionner.';
    STR_NET_UP = 'Connexion réseau rétablie';
    STR_CANT_FOLLOW = ', impossible de suivre ou de ne plus suivre';
    STR_GAME_CONT = 'Contenu du jeu';
    STR_YES = 'Oui';
    STR_REMOVE_USER = 'Voulez-vous vraiment supprimer l\'utilisateur';
    STR_PLACEHOLDER_PRESS_UP = 'Appuyez sur Haut pour';
    STR_FOLLOW_GAMES = 'Jeux en live suivis';
    STR_USER_GAMES_CHANGE = 'Alterner entre';
    STR_GUIDE = 'Maintenez OK';
    STR_MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    STR_DAYS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    STR_STARTED = 'Commencé';
    STR_VIDEOS = 'Vidéos';
    STR_REPLAY = 'Relecture';
    STR_STREAM_END = 'fermeture dans';
    STR_STREAM_END_EXIT = 'Appuyez sur Retour pour quitter';
    STR_FEATURED = 'Page d\'accueil';
    STR_CREATED_AT = 'Créée le';
    STR_OPEN_BROADCAST = 'Ouvrir la VOD';
    STR_OPEN_LAST_BROADCAST = 'Ouvrir la dernière VOD';
    STR_IS_LIVE = 'est maintenant en live';
    STR_OPEN_REWIND = 'Ouvrir le rewind';
    STR_OPEN_REWIND_SUMMARY = 'Ouvrir la VOD complète du rewind';
    STR_OPEN_REWIND_FAIL = 'Aucun rewind pour ce live';
    STR_SHOW_ISLIVE_WARNING = 'Afficher l\'alerte « Le streamer est en live »';
    STR_SHOW_ISLIVE_WARNING_SUMMARY =
        'Pendant que vous regardez un clip ou une VOD, l\'application peut vérifier si le streamer est en live. Si activé, un avertissement apparaît. Pour regarder le live, utilisez les commandes en bas du lecteur.';
    STR_OPEN_CHAT = 'Cliquez pour ouvrir le chat ou attendez que le live reprenne.';
    STR_STAY_OPEN = 'Rester sur le stream';
    STR_STAY_OPEN_SUMMARY = 'Rester sur le stream et l\'application vérifiera régulièrement s\'il redevient live.';
    STR_STAY_CHECK = 'Vérifier si le live est en cours dans :';
    STR_STAY_CHECKING = 'Vérification si le live est en cours...';
    STR_STAY_CHECK_LAST = 'Dernier résultat :';
    STR_STAY_IS_OFFLINE = 'Le live était hors ligne';
    STR_NO_BROADCAST = 'Aucune VOD';
    STR_NO_BROADCAST_WARNING = 'Il n\'y a aucune VOD pour ce clip';
    STR_NO_CHAT = 'et donc pas de chat';
    STR_IS_NOW = 'est maintenant';
    STR_OPEN_HOST = 'Ouvrir le host';
    STR_SETTINGS_PLAYER = 'Lecteur';
    STR_SETTINGS_BUFFER_SIZE = 'Taille du buffer de démarrage :';
    STR_SETTINGS_BUFFER_SIZE_SHORT_SUMMARY = 'Contrôle la taille du buffer de démarrage';
    STR_SETTINGS_BUFFER_SIZE_SUMMARY =
        'Spécifie la quantité de données à mettre en mémoire tampon avant de démarrer la lecture. Cette valeur est indépendante de la taille maximale du buffer, qui dépend de la RAM disponible sur l\'appareil. Une valeur plus faible démarre la lecture plus tôt, ce qui est généralement recommandé. Augmenter cette valeur améliore rarement les performances et peut provoquer des délais.';
    STR_SETTINGS_BUFFER_LIVE = 'Buffer de démarrage des lives';
    STR_SETTINGS_BUFFER_VOD = 'Buffer de démarrage des vidéos (replays et temps forts)';
    STR_SETTINGS_BUFFER_CLIP = 'Buffer de démarrage des clips';
    STR_SETTINGS_LANG = 'Langue';
    STR_LOADING_CHAT = 'Chat : connexion à';
    STR_LOADING_FAIL = 'Délai de connexion dépassé, échec de connexion...';
    STR_CHAT_CONNECTED = 'Chat : connecté';
    STR_CHAT_SEND_DELAY = 'Message envoyé. En raison du délai du chat, il apparaîtra dans quelques instants.';
    STR_CHAT_DELAY = 'Chat : délai';
    STR_VOD_HISTORY_BASE = 'Commencer la lecture depuis le début ou reprendre là où vous vous êtes arrêté.';
    STR_VOD_HISTORY = STR_VOD_HISTORY_BASE + ' VOD ?';
    STR_VOD_HISTORY_FORM_LIVE = STR_VOD_HISTORY_BASE + ' LIVE ?';
    STR_FROM = 'Depuis :' + STR_BR;
    STR_FROM_START = STR_FROM + 'Début';
    STR_CHAT_END = 'Chat : le chat est terminé !';
    STR_RECENT = ', plus récent';
    STR_VIWES = ', plus de vues';
    STR_NOKEY_VIDEO_WARN = 'Ajoutez un utilisateur pour accéder aux vidéos suivies.';
    STR_SWITCH_TYPE = 'Changer : plus récent ou vues';
    STR_ENABLE = 'Activer';
    STR_ENABLED = 'Activé';
    STR_DISABLE = 'Désactiver';
    STR_DISABLED = 'Désactivé';
    STR_DARK_MODE = 'Mode sombre';
    STR_BRIGHT_MODE = 'Mode clair';
    STR_RESTORE_PLAYBACK_WARN = 'L\'application a été fermée pendant la lecture. Restauration de la session précédente...';
    STR_RESTORE_PLAYBACK = 'Restaurer la lecture précédente';
    STR_RESTORE_PLAYBACK_SUMMARY =
        'L\'application enregistre la progression de lecture au cas où elle se fermerait involontairement. Le changement d\'application peut entraîner des problèmes de mémoire système qui ferment l\'application. À la réouverture, elle reprendra la lecture précédente.';
    STR_CHAT_FONT = 'Taille de police du chat';
    STR_VIDEOS_ANIMATION = 'Vignettes vidéo animées';
    STR_VIDEOS_ANIMATION_SUMMARY =
        'Lorsqu\'une VOD ou un temps fort est sélectionné, animer la vignette si une version animée est disponible (toutes les vidéos n\'en ont pas).';
    STR_SIDE_PANEL = 'Panneau latéral : pavé directionnel Gauche ou Retour';
    STR_SIZE = 'Taille';
    STR_BRIGHTNESS = 'Luminosité';
    STR_FORBIDDEN = 'Ce contenu est restreint dans votre région ou uniquement accessible via l\'application officielle Twitch.';
    STR_JUMPING_STEP = 'Pas de saut';
    STR_SECOND = 'seconde';
    STR_SECONDS = 'secondes';
    STR_CLOCK_OFFSET = 'Décalage de l\'horloge';
    STR_CLOCK_OFFSET_SUMMARY = 'Ajuster l\'horloge principale de l\'application selon le décalage souhaité.';
    STR_CLOCK_AM_PM = 'Format d\'horloge';
    STR_CLOCK_AM_PM_SUMMARY = 'Choisir 24 h ou 12 h AM/PM ou 12 h.';
    STR_CONTENT_LANG = 'Langue du contenu';
    STR_CONTENT_LANG_SUMMARY = 'Langue du contenu affiché à l\'écran : lives, VOD, clips.';
    STR_APP_LANG = 'Langue de l\'application';
    STR_APP_LANG_SUMMARY = 'Langue des textes de l\'application.';
    STR_ENTER_TO_OPEN = 'Appuyez sur OK pour accéder';
    STR_LANG_ALL = 'Toutes';
    STR_NO_GAME = 'Impossible de récupérer le jeu pour ceci';
    STR_EMPTY = 'Vide';
    STR_JUMP_BUFFER_WARNING = 'Impossible de sauter pendant la mise en mémoire tampon';
    STR_CHAT_DISABLE = 'Le chat est actuellement désactivé. Vous pouvez l\'activer avec l\'option « Forcer la désactivation du chat » en bas du lecteur.';
    STR_CLIP_FAIL = 'Échec du chargement de ce clip/de cette vidéo. Impossible de relire';
    STR_CHAT_BRIGHTNESS = 'Luminosité du fond du chat';
    STR_PLAY_NEXT = 'Lire le suivant';
    STR_PLAY_NEXT_IN = 'Lecture du suivant dans';
    STR_PLAY_ALL = 'Tout lire';
    STR_AUTO_PLAY_NEXT = 'Lecture automatique du clip suivant';
    STR_SIDE_PANEL_BACK_MAIN_MENU = 'Retour au menu principal';
    STR_UP = 'Appuyez sur Haut';
    STR_HOLD_UP = 'Maintenez Haut ou la touche 2';
    STR_LIVE_FEED = 'Flux live';
    STR_VOD_DIALOG = 'Boîte de dialogue de démarrage VOD';
    STR_VOD_DIALOG_SUMMARY =
        'Définir le comportement par défaut pour la lecture des VOD enregistrées dans votre historique. « Toujours depuis le début » s\'applique aussi aux aperçus VOD.';
    STR_VOD_DIALOG_START = 'Toujours depuis le début';
    STR_VOD_DIALOG_LAST = 'Toujours depuis le dernier arrêt';
    STR_VOD_DIALOG_SHOW = 'Toujours demander';
    STR_END_DIALOG_OPT = 'Options de fin du lecteur';
    STR_END_DIALOG_SETTINGS = 'Délai de la boîte de fin du lecteur';
    STR_END_DIALOG_SETTINGS_SUMMARY =
        'Quand un live, une VOD ou un clip se termine, une boîte de dialogue s\'affiche avec les options pour la suite. Définissez le temps (en secondes) avant que l\'option par défaut ne soit appliquée.';
    //TODO improve more after this
    STR_END_DIALOG_DISABLE = 'Désactiver le minuteur';
    STR_CHAT_SIZE = 'Taille du chat';
    STR_CHAT_POS = 'Position du chat';
    STR_CHAT_VIDEO_MODE = 'Mode vidéo';
    STR_CHAT_SIDE_FULL = 'Plein écran';
    STR_CHAT_PP_SIDE_FULL = 'Grand + petit écran';
    STR_CHAT_SIDE = 'Côte à côte, vidéo et chat';
    STR_CHAT_5050 = '50/50 et chats';
    STR_SPEED = 'Vitesse';
    STR_QUALITY = 'Qualité';
    STR_VERY_LOW = 'Très faible';
    STR_LOW = 'Faible';
    STR_HIGH = 'Élevée';
    STR_VERY_HIGH = 'Très élevée';
    STR_THUMB_RESOLUTION = 'Qualité des vignettes';
    STR_THUMB_RESOLUTION_SUMMARY =
        'Résolution par défaut des vignettes pour les lives, vidéos et jeux (non applicable aux clips). Une valeur plus faible aide l\'application à charger plus vite, mais la vignette peut paraître floue.';
    STR_PAYPAL_SUMMARY = 'Dons PayPal, utilisez le lien ou le QR code :';
    STR_BITCOIN_SUMMARY = 'Dons Bitcoin, utilisez l\'adresse du portefeuille ou scannez le QR code :';
    STR_PLAYER_PROBLEM_2 = 'Échec de la connexion, impossible de charger les informations du stream';
    STR_PLAYER_RESYNC = 'Redémarrage du lecteur';
    STR_PLAYER_MULTI_ALL = 'Tous';
    STR_QUALITY_PP = ['Petit', 'Grand', STR_PLAYER_MULTI_ALL];
    STR_QUALITY_MULTI = [STR_PLAYER_MULTI_ALL, 'En haut à gauche', 'En haut à droite', 'En bas à gauche', 'En bas à droite'];
    STR_QUALITY_MULTI_BIG = [STR_PLAYER_MULTI_ALL, 'Haut', 'Bas gauche', 'Bas centre', 'Bas droite'];
    STR_PLAYER_BITRATE_UNLIMITED = 'Illimité';
    STR_PLAYER_BITRATE = 'Résolution/Débit max en qualité Auto';
    STR_PLAYER_BITRATE_SHORT_SUMMARY = 'Permet de définir la résolution/le débit max utilisés par la lecture en qualité Auto';
    STR_PLAYER_BITRATE_SUMMARY =
        'Utilisé pour éviter les lags sur les appareils peu puissants lors de la lecture de plusieurs vidéos en même temps (la plupart des appareils ne sont conçus que pour une seule vidéo et sautent des images dans ce cas). Aide aussi à limiter la bande passante Internet en fixant une limite qui s\'applique à la qualité Auto. La résolution/débit recommandée pour tous les petits lecteurs est 720p/3 Mbit/s et illimité pour le lecteur principal sur la plupart des appareils d\'entrée de gamme.';
    STR_PLAYER_BITRATE_SUMMARY_ETC =
        'Des valeurs différentes pour la résolution ou le débit entre lecteur principal et petits lecteurs peuvent entraîner un court buffering/chargement lors d\'un changement avec le lecteur principal en incrustation (picture-in-picture). Pour éviter cela, définissez les mêmes valeurs au prix de possibles lags. Un débit trop élevé se remarque par une accumulation constante d\'images sautées ou un buffering continu.';
    STR_PLAYER_MAIN = 'Lecteur principal, pour le grand lecteur en incrustation ou le lecteur du haut en 50/50';
    STR_PLAYER_RES_SMALL = 'Petits lecteurs, pour le petit lecteur en incrustation et tous les lecteurs en multistream';
    STR_PLAYER_BITRATE_MAIN = 'Débit - ' + STR_PLAYER_MAIN;
    STR_PLAYER_BITRATE_SMALL = 'Débit - ' + STR_PLAYER_RES_SMALL;
    STR_PLAYER_RES_MAIN = 'Résolution - ' + STR_PLAYER_MAIN;
    STR_PLAYER_RES_SMALL = 'Résolution - ' + STR_PLAYER_RES_SMALL;
    STR_BLOCK_RES = 'Résolutions bloquées';
    STR_BLOCK_RES_SHORT_SUMMARY = 'Permet de bloquer une ou plusieurs résolutions pour qu\'elles ne soient jamais utilisées';
    STR_BLOCK_RES_SUMMARY =
        'En qualité Auto, il est possible de bloquer une ou plusieurs résolutions pour qu\'elles ne soient jamais utilisées. Utile pour les appareils qui laguent à une résolution particulière. Les clips ne pouvant être lus en mode Auto, cela bloque aussi la partie automatique de cette résolution pour un clip.';
    STR_BLOCK_RES_SUMMARY_EXTRA =
        'L\'utilisateur peut ignorer la sélection manuellement pendant la lecture.<br><br>XX signifie que toutes les résolutions commençant par la même valeur avant XX seront refusées si cette résolution est marquée comme bloquée.';
    STR_BLOCKED = 'Bloquée';
    STR_BLOCKED_NOT = 'Non bloquée';
    STR_AUDIO_SOURCE = 'Source audio';
    STR_VOLUME_CONTROLS = 'Commandes audio et volume';
    STR_AUDIO_ALL = 'Activer tout l\'audio';
    STR_AUDIO_ALL_ENA = 'Toutes les sources audio activées';
    STR_AUDIO_ALL_100 = 'Volume de tout à 100 %';
    STR_AUDIO_ALL_100_SET = 'Le volume de tous les lecteurs est réglé à 100 %';
    STR_DEF_QUALITY = 'Qualité par défaut du lecteur';
    STR_DEF_QUALITY_SUMMARY =
        'Cette option remplace toutes les autres lors de la lecture d\'une seule vidéo. En mode multi-lecteurs, la lecture doit utiliser la qualité Auto. La raison se trouve dans les paramètres « ' +
        STR_PLAYER_BITRATE +
        ' ».';
    STR_PICTURE_PICTURE = 'Picture-in-picture, 50/50 ou multistream (lives uniquement) :';
    STR_PICTURE_CONTROLS1 =
        'Activer le mode picture-in-picture : appuyez sur Haut pendant la lecture d\'une vidéo. Pour afficher le flux d\'aperçu, choisissez un stream, puis maintenez OK ou appuyez sur la touche 1 pour démarrer';
    STR_PICTURE_CONTROLS2 =
        'Changer le contenu vidéo : en mode multijoueur, cliquez toujours une fois depuis l\'aperçu. En mode picture-in-picture ou 50/50, un simple clic met à jour la grande ou la vidéo du haut, et maintenir OK ou appuyer sur la touche 1 met à jour la petite ou la vidéo du bas';
    STR_PICTURE_CONTROLS4 = 'Échanger le contenu entre les vidéos (picture-in-picture uniquement) : pavé directionnel Bas. Le grand devient petit et inversement';
    STR_PICTURE_CONTROLS5 = 'Changer la position de la petite vidéo (picture-in-picture uniquement) : pavé directionnel Gauche';
    STR_PICTURE_CONTROLS6 = 'Changer la taille de la petite vidéo (picture-in-picture uniquement) : pavé directionnel Droit';
    STR_PICTURE_CONTROLS7 =
        'Changer la source audio : choisissez l\'option « Source audio » en bas du lecteur. En 50/50 ou multistream, utilisez le pavé directionnel gauche/droite. En picture-in-picture, utilisez les touches média piste précédente/suivante';
    STR_PICTURE_CONTROLS3 = 'Changer la source audio pour toutes les vidéos : maintenez le pavé directionnel Bas.';
    STR_PICTURE_CONTROLS8 =
        'Redémarrer le lecteur : choisissez l\'option « Redémarrage du lecteur » en bas du lecteur. Cela ne redémarre que les lecteurs, utile pour resynchroniser le lecteur et le chat. Cela ne synchronise pas le contenu des différents lecteurs entre eux';
    STR_PICTURE_CONTROLS9 =
        'Synchronisation manuelle des lecteurs : comme solution, choisissez l\'option « Vitesse » en bas du lecteur pour ralentir le stream en avance ou inversement. Ne fonctionne qu\'en mode picture-in-picture';
    STR_PICTURE_CONTROLS10 = 'Qualité vidéo en picture-in-picture : consulter les paramètres « ' + STR_PLAYER_BITRATE + ' » dans l\'application';
    STR_PICTURE_CONTROLS11 =
        'Fermer la petite ou la vidéo du bas (picture-in-picture uniquement) : appuyer deux fois sur Retour quitte le picture-in-picture ou le mode 50/50';
    STR_PICTURE_CONTROLS12 =
        'Activer le mode 50/50 (deux streams et deux chats) : si le picture-in-picture est activé, appuyez sur la touche 2, la touche média avance rapide ou utilisez l\'option « Mode vidéo » en bas du lecteur, ou si vous êtes déjà en mode « côte à côte », maintenez OK sur une vignette dans le flux d\'aperçu';
    STR_PICTURE_CONTROLS13 = 'Activer le multistream : utilisez les commandes en bas du lecteur ou la touche média retour rapide';
    STR_PLAYER_INFO_VISIBILITY_ARRAY = ['Quand les infos du lecteur sont visibles', 'Toujours visibles', 'Jamais visibles'];
    STR_SINGLE_EXIT = 'Retour simple';
    STR_SINGLE_EXIT_SUMMARY = 'Quitter le lecteur, le picture-in-picture, le mode 50/50 ou multistream avec une seule pression sur Retour.';
    STR_NOTIFICATION_OPT = 'Options de notification';
    STR_NOW_LIVE_SHOW = 'Afficher la notification « Le streamer est en live » pour les chaînes suivies';
    STR_TITLE_CHANGE_SHOW = 'Afficher la notification « Le streamer a changé de titre » pour les chaînes suivies';
    STR_GAME_CHANGE_SHOW = 'Afficher la notification « Le streamer a changé de jeu » pour les chaînes suivies';
    STR_NOW_LIVE_GAME_SHOW = 'Afficher la notification « Le jeu est en live » pour les jeux suivis';
    STR_NOTIFICATION_BACKGROUND = 'Notifications au-dessus des autres applications quand l\'app tourne en arrière-plan';
    STR_NOTIFICATION_BACKGROUND_SUMMARY =
        'Pour activer cette fonction, assurez-vous que l\'application dispose de la permission de notifications dans les paramètres Android. Sur les appareils Android 11 ou plus récents, l\'application affichera une notification simple sur une seule ligne lorsqu\'elle fonctionne en arrière-plan.';
    STR_NOTIFICATION_BACKGROUND_WARNING = 'Permission de notifications Android manquante !';
    STR_NOTIFICATION_REPEAT = 'Nombre de fois qu\'une notification individuelle est affichée';
    STR_NOTIFICATION_REPEAT_SUMMARY =
        'Le délai d\'affichage d\'une notification individuelle est d\'environ 3 secondes et ne peut pas être modifié car contrôlé par le système, mais vous pouvez choisir le nombre de répétitions de cette même notification.';
    STR_NOTIFICATION_SINCE = 'Empêcher l\'affichage de « Le streamer est en live » pour les streams en cours depuis plus de';
    STR_NOTIFICATION_SINCE_SUMMARY =
        'Utile pour éviter une longue liste de notifications quand l\'application n\'a pas été utilisée depuis un moment, par exemple lorsque vous éteignez l\'appareil ou quand l\'écran est éteint (l\'application ne montre pas de notification si l\'appareil est allumé mais l\'écran éteint).';
    STR_GLOBAL_FONT = 'Décalage global de la taille de police';
    STR_GLOBAL_FONT_SUMMARY =
        'Modifie la taille de tous les textes et de la plupart des icônes de l\'application (sauf la taille de police du chat, qui a son propre réglage). Une valeur trop petite peut rendre le texte illisible, une valeur trop grande le fera déborder : c\'est pourquoi cette valeur est limitée. Changer cette valeur actualise tous les écrans.';
    STR_MAIN_MENU = 'Menu principal';
    STR_USER_MENU = 'Menu utilisateur';
    STR_CH_IS_OFFLINE = 'est hors ligne';
    STR_ROUND_IMAGES = 'Images de chaîne arrondies';
    STR_ROUND_IMAGES_SUMMARY = 'La plupart des images de chaîne sont carrées, certaines peuvent ne pas bien ressortir.';
    STR_SCREEN_COUNTER = 'Masquer l\'indicateur position/total';
    STR_SCREEN_COUNTER_SUMMARY =
        'Un indicateur affiche la position actuelle et le total de contenus chargés sur les écrans avec du contenu lisible. En faisant défiler, plus de contenu se charge et le total est mis à jour.';
    STR_SWITCH_POS = 'Changer : position de départ';
    STR_SWITCH_POS_SUMMARY =
        'Au lieu de commencer au premier élément possible, commencer plus bas dans la liste pour éviter de descendre pour trouver une vidéo plus ancienne.';
    STR_USER_OPTION = 'Choisissez une option pour l\'utilisateur';
    STR_MAIN_USER = 'Utilisateur principal';
    STR_USER_TOP_LABEL = 'Cliquez sur un utilisateur pour voir les options';
    STR_USER_EXTRAS = 'Utilisateur : bascule, ajout, clé';
    STR_LOW_LATENCY = 'Faible latence';
    STR_LOW_LATENCY_SUMMARY =
        'Si vous commencez à avoir des problèmes de buffer, désactivez ' +
        STR_LOW_LATENCY +
        '<br>Utilisez ' +
        STR_SETTINGS_BUFFER_LIVE +
        ' inférieur ou égal à 1 pour que cela ait un effet';
    STR_GAME_SORT = 'Tri des aperçus de jeux';
    STR_LIVE_FEED_SORT = 'Tri du flux live du panneau latéral ou du lecteur';
    STR_LIVE_FEED_SORT_SUMMARY =
        'Trie le flux live du panneau latéral et l\'aperçu du lecteur. Sur l\'aperçu, cela ne s\'applique qu\'aux lives de l\'utilisateur et à la page d\'accueil (tout ce qui n\'est pas historique est trié par vues, l\'historique est du plus récemment regardé au plus ancien, et les VOD sont les plus récentes).';
    STR_A_Z = 'Alphabétique A - Z';
    STR_Z_A = 'Alphabétique Z - A';
    STR_APP_ANIMATIONS = 'Activer les animations de l\'app';
    STR_APP_ANIMATIONS_SUMMARY = 'Active les animations du panneau latéral, du défilement et animations associées.';
    STR_UI_SETTINGS = 'Personnaliser l\'interface, les couleurs, les animations et associés';
    STR_GENERAL_CUSTOM = 'Personnaliser le contenu, le tri, l\'actualisation auto, les délais et associés';
    STR_RUNNINGTIME = 'Application en cours depuis :';
    STR_410_ERROR = 'Impossible d\'obtenir le lien vidéo';
    STR_PRESS_ENTER_TO_CHANGE = 'Appuyez sur OK pour changer en -';
    STR_CLICK_UNFOLLOW = '(Appuyez sur OK pour ne plus suivre)';
    STR_CLICK_FOLLOW = '(Appuyez sur OK pour suivre)';
    STR_TODAY = 'Aujourd\'hui';
    STR_DROOPED_FRAMES = 'Images sautées :';
    STR_BUFFER_HEALT = 'Taille du buffer (s) :';
    STR_NET_ACT = 'Activité réseau (Mbit) :';
    STR_NET_SPEED = 'Vitesse réseau (Mbit) :';
    STR_LATENCY_TO_BROADCASTER = 'Latence vers le streamer';
    STR_LATENCY = 'Latence vers le streamer (s) :';
    STR_CHAT_DELAY_LATENCY_TO_BROADCASTER = 'Basé sur ' + STR_LATENCY_TO_BROADCASTER;
    STR_PING = 'Ping vers Twitch (ms) :';
    STR_WARNINGS = 'Avertissements';
    STR_WELCOME = 'Bienvenue dans';
    STR_WELCOME_SUMMARY =
        'Cette application possède énormément de fonctionnalités. Consultez les paramètres et les commandes pour comprendre comment l\'utiliser. En cas de doute, regardez la vidéo de démonstration sur le Play Store, et si ce n\'est pas suffisant, utilisez les informations de contact.';
    STR_WARNING_PHONE = 'Avertissement téléphones';
    STR_WARNING_PHONE_SUMMARY =
        'Cette application est principalement conçue pour les téléviseurs, le support des autres appareils est limité et pourrait ne jamais être amélioré. Si vous n\'avez pas de clavier ou de manette avec pavé directionnel + OK et Retour (Échap fonctionne comme Retour sur un ordinateur), utilisez les touches virtuelles à l\'écran pour naviguer (visibles uniquement sur téléphone/tablette). Dans les paramètres, vous pouvez changer la position et l\'opacité du pavé directionnel virtuel ; cliquez n\'importe où sur l\'écran pour l\'afficher. Lorsqu\'il est caché, il ne fonctionne pas.';
    STR_DPAD_POSTION = 'Position du pavé directionnel à l\'écran';
    STR_DPAD_OPACITY = 'Opacité du pavé directionnel';
    STR_DPAD_OPT = 'Options du pavé directionnel';

    STR_MAX_RES = 'Résolution max :';
    STR_MAX_BIT = 'Débit max :';
    STR_MAX_LEVEL = 'Niveau max :';
    STR_MAX_FPS = 'FPS max par résolution :';
    STR_MAX_INSTANCES = 'Instances max :';
    STR_UNKNOWN = 'Inconnu';
    STR_USER_LIVE = 'Panneau latéral lives utilisateur : pavé directionnel Gauche depuis le panneau latéral ou touche 3 depuis n\'importe où';
    STR_PP_WORKAROUND = 'Solution multijoueur, PIP et mode aperçu';
    STR_PP_WORKAROUND_SUMMARY =
        'Sur certains appareils, il est nécessaire d\'activer ceci pour que le mode multistream fonctionne correctement. Le problème est généralement qu\'un des deux lecteurs reste en écran noir. Ne l\'activez pas si vous n\'avez pas de problème, car cela réduit la qualité d\'image et les performances.';
    STR_HISTORY = 'Historique';
    STR_WATCHED = 'Regardé le';
    STR_UNTIL = 'jusqu\'à';
    STR_SORTING = 'Tri';
    STR_DELETE_HISTORY = 'Supprimer cet historique';
    STR_DELETE_UNREACHABLE = 'Supprimer automatiquement le contenu inaccessible';
    STR_DELETE_UNREACHABLE_SUMMARY =
        'Si cette option est sur OUI, l\'application supprimera automatiquement de l\'historique les VOD et clips devenus inaccessibles (supprimés par le streamer/créateur).';
    STR_NAME_A_Z = 'Nom A - Z';
    STR_NAME_Z_A = 'Nom Z - A';
    STR_GAME_A_Z = 'Jeu A - Z';
    STR_GAME_Z_A = 'Jeu Z - A';
    STR_VIWES_MOST = 'Le plus de vues';
    STR_VIWES_LOWEST = 'Le moins de vues';
    STR_CHANNELS_MOST = 'Le plus de chaînes';
    STR_CHANNELS_LOWEST = 'Le moins de chaînes';
    STR_NEWEST = 'Regardé le plus récemment';
    STR_OLDEST = 'Regardé le plus ancien';
    STR_PRESS_ENTER_D = 'Appuyez sur OK pour supprimer';
    STR_LIVE_VOD = 'Ce live est maintenant une VOD<br>ouverture de la VOD là où vous avez arrêté de regarder le live :<br>';

    STR_DELETE_SURE = 'Voulez-vous vraiment tout supprimer de';
    STR_CREATED_NEWEST = 'Créé / Uptime le plus récent';
    STR_CREATED_OLDEST = 'Créé / Uptime le plus ancien';
    STR_THUMB_OPTIONS = 'Options de vignette';
    STR_HISTORY_LIVE_DIS = 'Activer l\'historique des lives';
    STR_HISTORY_VOD_DIS = 'Activer l\'historique des VOD';
    STR_HISTORY_CLIP_DIS = 'Activer l\'historique des clips';
    STR_OPEN_GAME = 'Ouvrir le jeu';
    STR_OPEN_CHANNEL = 'Ouvrir la chaîne';
    STR_THUMB_OPTIONS_KEY = 'Appuyez sur OK sur une action (pour l\'ouvrir ou l\'appliquer), Retour pour quitter sans appliquer';
    STR_DELETE_FROM_HISTORY = 'Supprimer ceci de l\'historique';
    STR_CHECK_FOLLOW = 'Vérification du statut de suivi...';
    STR_REFRESH_DELETE = 'Actualisez l\'écran après la suppression pour voir le changement.';
    STR_THUMB_OPTIONS_TOP = 'Maintenez Gauche pour les options de vignette';
    STR_REPLACE_MULTI = 'Choisir quoi remplacer par ce qui est au-dessus ?';
    STR_REPLACE_MULTI_ENTER = 'Appuyez sur OK pour remplacer ou Retour pour quitter sans appliquer.';
    STR_ALREDY_PLAYING = 'Déjà en lecture';
    STR_STREAM_ERROR = 'Impossible d\'ouvrir l\'aperçu';
    STR_PP_MODO = 'Mode picture-in-picture';
    STR_4_WAY_MULTI_INSTANCES = 'Votre appareil ne supporte que %x instances de codec (lecteurs en lecture) en même temps, impossible d\'utiliser';
    STR_MULTI_EMPTY = 'Terminé et/ou vide';
    STR_4_WAY_MULTI = 'Multistream 4 voies';
    STR_CONTROLS_MULTI_0 = 'Aide multistream :';
    STR_CONTROLS_MULTI_1 =
        'Si vous avez des lags après l\'activation du multistream, essayez de baisser la valeur du « Débit du petit lecteur » dans les paramètres ; une accumulation d\'images sautées ou un buffering constant indique un débit trop élevé ou une connexion trop lente';
    STR_CONTROLS_MULTI_2 = 'Ajouter des streams : ouvrez le flux d\'aperçu (touche Haut) et cliquez sur un live';
    STR_CONTROLS_MULTI_3 = 'Remplacer des streams : une fois le multistream plein, choisissez-en un dans le flux d\'aperçu et un à remplacer dans la boîte de dialogue';
    STR_CONTROLS_MULTI_4 = 'Changer la source audio : pavé directionnel gauche/droite ou touches média piste précédente/suivante, maintenir Bas pour appliquer à toutes les vidéos';
    STR_CONTROLS_MULTI_5 = 'Quitter le multistream : appuyez deux fois sur Retour ou utilisez l\'option en bas du lecteur.';
    STR_CONTROLS_MULTI_6 = 'Pour fermer ceci, ouvrez 4 lives';
    STR_PICTURE_LIVE_FEED = 'Picture-in-picture : maintenez OK ou appuyez sur la touche 1, puis utilisez Gauche pour déplacer, Droite pour redimensionner ou Bas pour changer les vidéos';
    STR_MULTI_TITLE = ', cliquez sur une vignette pour ouvrir ou remplacer un stream, utilisez Gauche/Droite pour changer la source audio';
    STR_FEED_END_DIALOG = ', appuyez sur Retour pour revenir au menu principal';
    STR_BACK_USER_GAMES = 'Appuyez sur Retour pour revenir à';
    STR_SHOW_LIVE_PLAYER = 'Afficher l\'aperçu sur les écrans live';
    STR_SHOW_VOD_PLAYER_WARNING = 'Lecture à partir du dernier arrêt :';
    STR_SHOW_VOD_PLAYER = 'Afficher l\'aperçu sur les écrans VOD';
    STR_SHOW_CLIP_PLAYER = 'Afficher l\'aperçu sur les écrans de clips';
    STR_PREVIEW_CLIP_NEXT = 'Quand l\'aperçu d\'un clip se termine, passer automatiquement au clip suivant.';
    STR_SHOW_SIDE_PLAYER = 'Afficher l\'aperçu dans le panneau latéral';
    STR_SHOW_FEED_PLAYER = 'Afficher l\'aperçu sur les vignettes du flux du lecteur';
    STR_SHOW_FEED_PLAYER_SUMMARY = 'Si vous ne le souhaitez pas, ou si votre appareil lag dès qu\'il y a plus d\'un lecteur actif, mettez ceci sur NON.';
    STR_DISABLED_FEED_PLAYER_MULTI = 'Désactiver l\'aperçu quand le multistream est activé';
    STR_DISABLED_FEED_PLAYER_MULTI_SUMMARY =
        'Pour des raisons de performances, certains appareils laguent avec plusieurs lecteurs. Si le multistream fonctionne, mais que l\'appareil lag quand l\'aperçu et un multistream sont actifs, mettez cette option sur NON.';
    STR_PREVIEW_ERROR_LOAD = 'Échec du chargement de l\'aperçu :';
    STR_PREVIEW_ERROR_LINK = 'inaccessible';
    STR_PREVIEW_VOD_DELETED = ', cette VOD a peut-être été supprimée';
    STR_PREVIEW_END = 'La vidéo d\'aperçu est terminée';
    STR_PLAYER_LAG_ERRO = 'Le lecteur ne peut pas lire à cause d\'un problème de connexion réseau';
    STR_PLAYER_ERROR = 'Le lecteur ne peut pas lire à cause d\'une erreur du lecteur';
    STR_PLAYER_ERROR_MULTI = ', essayez de réduire la valeur de débit du petit lecteur dans les paramètres';
    STR_PREVIEW_SIZE = 'Taille de l\'aperçu du lecteur';
    STR_PREVIEW_SIZE_SUMMARY =
        'Définit la taille du petit lecteur d\'aperçu qui s\'affiche en appuyant sur Haut lorsqu\'un live, une VOD ou un clip est ouvert.';
    STR_PREVIEW_SIZE_ARRAY = ['Petite', 'Moyenne', 'Grande', 'Très grande'];
    STR_PREVIEW_SIZE_SCREEN = 'Taille de l\'aperçu sur l\'écran';
    STR_PREVIEW_SIZE_SCREEN_SUMMARY = 'Définit la taille du lecteur d\'aperçu qui apparaît au-dessus des écrans principaux de l\'app.';
    STR_PREVIEW_VOLUME_SCREEN = 'Volume de l\'aperçu à l\'écran';
    STR_PREVIEW_VOLUME_SCREEN_SUMMARY = 'Définit le volume du lecteur d\'aperçu qui apparaît au-dessus des écrans principaux et du panneau latéral.';
    STR_PREVIEW_SIZE_SCREEN_ARRAY = ['Taille vignette', 'Plus grand'];
    STR_SIDE_PANEL_PLAYER_DELAY = 'Délai de l\'aperçu';
    STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY =
        'Définit le délai avant que l\'aperçu ne commence à charger après la sélection d\'une vignette. Aide les appareils lents qui laguent lors du défilement.';
    STR_PREVIEW_VOLUME = 'Volume du lecteur d\'aperçu';
    STR_PREVIEW_VOLUME_SUMMARY = 'Définit le volume du petit lecteur d\'aperçu qui apparaît en appuyant sur Haut en live, VOD ou clip.';
    STR_PREVIEW_OTHERS_VOLUME = 'Volume du lecteur principal (quand l\'aperçu est affiché)';
    STR_PREVIEW_OTHERS_VOLUME_SUMMARY =
        'Le lecteur principal (tous les lecteurs picture-in-picture et multistream) peut voir son volume réduit quand le lecteur d\'aperçu est affiché.';
    STR_SIDE_PANEL_PLAYER = 'Paramètres du lecteur d\'aperçu de vignettes';
    STR_START_AT_USER = 'Toujours démarrer l\'app sur l\'écran utilisateur';
    STR_START_AT_USER_SUMMARY = 'Cette option désactive « Restaurer la lecture », mais permet de choisir l\'utilisateur à l\'ouverture de l\'app.';
    STR_LAST_REFRESH = 'Dernière actualisation :';
    STR_PP_VOD_ERROR = 'Quittez le picture-in-picture ou le multistream pour ouvrir cette VOD';
    STR_SETTINGS_ACCESSIBILITY = 'Afficher l\'avertissement « Un service d\'accessibilité est en cours d\'exécution »';
    STR_SETTINGS_ACCESSIBILITY_SUMMARY =
        'Si un service d\'accessibilité est activé sur l\'appareil, l\'app affichera un avertissement. C\'est un problème Android connu : certains services d\'accessibilité peuvent faire laguer ou geler cette application.';
    STR_ACCESSIBILITY_WARN = 'Service(s) d\'accessibilité détecté(s)';
    STR_ACCESSIBILITY_WARN_EXTRA = 'En savoir plus sur ce lien :';
    STR_ACCESSIBILITY_WARN_EXTRA2 =
        'Si vous avez des gels ou des lags liés à cela, fermez l\'app et désactivez tous les services d\'accessibilité, après quoi tous les problèmes disparaîtront.<br>Pour ne plus afficher cet avertissement, désactivez-le dans les paramètres.';
    STR_AUTO_REFRESH = 'Délai d\'actualisation automatique';
    STR_AUTO_REFRESH_SUMMARY = 'Quand c\'est activé, l\'application actualise automatiquement le contenu en arrière-plan.';
    STR_AUTO_REFRESH_BACKGROUND = 'Actualisation automatique en arrière-plan';
    STR_AUTO_REFRESH_BACKGROUND_SUMMARY =
        'Quand « Délai d\'actualisation automatique » est défini et que ceci est activé, l\'actualisation automatique se fait en arrière-plan (mais avec l\'app visible, Android n\'autorise pas un fonctionnement totalement libre en arrière-plan pour éviter de faire laguer d\'autres apps). Quand l\'écran n\'est pas visible ou que vous revenez sur un écran où l\'actualisation n\'a pas eu lieu, attention : si l\'app a trop d\'écrans, l\'actualisation automatique peut provoquer des lags aléatoires sur certains appareils d\'entrée de gamme.';
    STR_MAIN_WINDOW = 'Vidéo principale';
    STR_MULTI_MAIN_WINDOW = 'Vidéo principale multistream';
    STR_MAIN_MULTI_BIG =
        STR_MULTI_MAIN_WINDOW + ' plus grande et chat : appuyez sur Bas puis utilisez Gauche/Droite pour changer la grande vidéo';
    STR_SOURCE_CHECK = 'Changer automatiquement la qualité de Source à Auto quand le lecteur lag';
    STR_SOURCE_CHECK_SUMMARY =
        'Quand c\'est activé et que vous n\'êtes pas en Auto, le lecteur bascule en qualité Auto et vous avertit si le lecteur lag. Un lag est détecté quand le lecteur ne peut plus lire pendant quelques secondes (l\'algorithme est plus complexe que le simple temps). Si vous lancez autre chose, la qualité repasse à l\'origine.';
    STR_PLAYER_LAG = 'Le lecteur lag, la qualité est passée en mode Auto';
    STR_PLAYER_SOURCE = 'Le lecteur lag, la qualité a été réduite';
    STR_TOO_ERRORS = 'ou trop d\'erreurs';
    STR_STREAM_ERROR_SMALL = 'Aperçu, stream terminé ' + STR_TOO_ERRORS;
    STR_CONTROLS_MEDIA_FF = 'Avance/retour rapide (VOD et clips uniquement) : utilisez le pavé directionnel Gauche/Droite ou les touches média avance/retour rapide';
    STR_VOD_MUTED = 'Une partie de cette VOD est muette car elle contient du contenu protégé par copyright, indiqué par les zones plus sombres sur la barre de lecture';
    STR_GIFT_SUB = 'vous a offert un sub !';
    STR_ANONYMOUS = 'Anonyme';
    STR_CHAT_BANNED = 'Vous êtes banni définitivement du chat de';
    STR_CHAT_WRITE = 'Écrire dans le chat';
    STR_CHAT_EXTRA = 'Paramètres supplémentaires du chat';
    STR_PLACEHOLDER_CHAT =
        'Quand ceci est sélectionné, appuyez sur OK pour afficher le clavier à l\'écran. Si vous avez un clavier physique, appuyez sur Retour ou Échap pour masquer le clavier à l\'écran';
    STR_CHAT_ROOMSTATE = 'Chat ROOMSTATE :';
    STR_CHAT_NO_RESTRICTIONS = 'Aucune restriction';
    STR_CHAT_DELL_ALL = 'Tout supprimer';
    STR_CHAT_UNICODE_EMOJI = 'Emoji Unicode';
    STR_CHAT_TW_EMOTES = 'Émotes Twitch';
    STR_CHAT_BTTV_GLOBAL = 'BTTV globales';
    STR_CHAT_BTTV_STREAM = 'BTTV du streamer';
    STR_CHAT_FFZ_GLOBAL = 'FFZ globales';
    STR_CHAT_FFZ_STREAM = 'FFZ du streamer';
    STR_CHAT_SEVENTV_GLOBAL = '7TV globales';
    STR_CHAT_SEVENTV_STREAM = '7TV du streamer';
    STR_CHAT_RESULT = 'Résultat attendu dans le chat :';
    STR_CHAT_SEND = 'Envoyer';
    STR_CHAT_EMOTE_EMPTY = 'Cette liste d\'émotes est vide';
    STR_CHAT_FOLLOWER_ONLY = 'Le chat est en mode « followers uniquement » et vous n\'êtes pas follower de';
    STR_CHAT_FOLLOWER_ONLY_USER_TIME = 'et vous ne suivez que depuis';
    STR_CHAT_EMOTE_ONLY = 'Mode émotes Twitch uniquement';
    STR_CHAT_CHOOSE = 'Choisissez dans quel chat écrire ou appuyez sur Retour pour fermer ceci';
    STR_CHAT_OPTIONS_TITLE = 'Options d\'écriture dans le chat';
    STR_CHAT_OPTIONS_KEYBOARD = 'Masquage auto du clavier logiciel';
    STR_CHAT_OPTIONS_KEYBOARD_SUMMARY =
        'Permet de contrôler le comportement du clavier logiciel à l\'écran. Si vous avez un clavier physique, utilisez-le, sinon mettez sur « jamais ».';
    STR_CHAT_OPTIONS_KEYBOARD_1 = 'Jamais';
    STR_CHAT_OPTIONS_KEYBOARD_2 = 'Si clavier détecté';
    STR_CHAT_OPTIONS_KEYBOARD_3 = 'Toujours';
    STR_CHAT_OPTIONS_EMOTE_SORT = 'Tri des émotes';
    STR_CHAT_OPTIONS_EMOTE_SORT_SUMMARY = 'Si désactivé, les listes d\'émotes sont affichées dans l\'ordre fourni par le serveur.';
    STR_CHAT_OPTIONS_FORCE_SHOW = 'Forcer l\'affichage du chat';
    STR_CHAT_OPTIONS_FORCE_SHOW_SUMMARY = 'Si vous voulez voir le chat quand la fonction « écrire dans le chat » est utilisée, activez ceci';
    STR_NOKEY_CHAT_WARN = 'Ajoutez une clé d\'autorisation utilisateur pour pouvoir se connecter et écrire dans le chat';
    STR_CHAT_NOT_READY = 'Le chat n\'est pas prêt à envoyer ! Réessayez dans une ou deux secondes.';
    STR_CHAT_REDEEMED_MESSAGE_HIGH = 'Message mis en avant via une récompense';
    STR_CHAT_FIRST_MESSAGE_HIGH = 'PREMIER MESSAGE';
    STR_CHAT_REDEEMED_MESSAGE_SUB = 'Message envoyé en mode abonnés via une récompense';
    STR_CHAT_OPTIONS = 'Options du chat';
    STR_CHAT_HIGHLIGHT_STREAMER_MSG = 'Surligner les messages du streamer (fond rose foncé)';
    STR_CHAT_HIGHLIGHT_MOD_MSG = 'Surligner les messages des modérateurs (fond cyan foncé)';
    STR_CHAT_HIGHLIGHT_REDEEMED = 'Surligner les messages de récompense (fond violet, message uniquement)';
    STR_CHAT_HIGHLIGHT_FIRST = 'Surligner les premiers messages (fond rose foncé)';
    STR_CHAT_HIGHLIGHT_STREAMER = 'Surligner les messages @streamer (fond rouge foncé, « @ » en bleu)';
    STR_CHAT_HIGHLIGHT_USER = 'Surligner vos messages @username (fond vert foncé, « @ » en bleu)';
    STR_CHAT_HIGHLIGHT_USER_SEND = 'Surligner vos messages envoyés (fond vert foncé)';
    STR_CHAT_SHOW_SUB = 'Afficher les messages de sub dans le chat (fond orange foncé)';
    STR_CHAT_HIGHLIGHT_BIT = 'Surligner les messages avec bits (fond jaune foncé)';
    STR_CHAT_HIGHLIGHT_ACTIONS = 'Afficher les messages d\'action (généralement des bots)';
    STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY =
        'Ces messages sont généralement équivalents aux messages de sub mais envoyés via un bot ; si « Afficher les messages de sub » est activé, c\'est redondant.';
    STR_CHAT_INDIVIDUAL_BACKGROUND = 'Différence de fond entre les messages individuels';
    STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY =
        'Les modes sont « désactivé », « activé » (auto), Clair ou Plus sombre. En mode auto, le fond alterne entre plus clair et plus sombre si le chat est au-dessus du stream ; sinon le fond est clair.';
    STR_CHAT_INDIVIDUAL_LINE = 'Insérer une ligne pour séparer les messages de chat';
    STR_CHAT_LINE_ANIMATION = 'Défilement animé à l\'arrivée d\'un nouveau message';
    STR_CHAT_LOGGING = 'Connexion au chat avec l\'utilisateur actuel';
    STR_CHAT_LOGGING_SUMMARY =
        'Quand une clé d\'autorisation est fournie, l\'app se connecte au chat en tant qu\'utilisateur actuel sauf si le chat est désactivé dans les contrôles du lecteur. Si ceci est sur NON, la connexion est anonyme, les messages sont possibles mais les bans et ROOMSTATE sont cachés.';
    STR_CHAT_BOTS = 'Bloquer les bots et commandes de bots (!commande) dans le chat';
    STR_CHAT_TIMESTAMP = 'Afficher l\'horodatage des messages';
    STR_CHAT_USER_NOTICE = 'Afficher les avertissements de notification utilisateur dans le chat';
    STR_CHAT_USER_NOTICE_SUMMARY =
        'Afficher un avertissement à l\'écran quand le chat reçoit une notification indirecte pour l\'utilisateur. Ex : « Chat : cette room est maintenant en mode émotes uniquement ».';
    STR_CHAT_NICK_COLOR = 'Couleurs de pseudo lisibles';
    STR_CHAT_NICK_COLOR_SUMMARY =
        'Au lieu des couleurs de pseudo par défaut parfois illisibles sur fond sombre, utiliser des couleurs personnalisées bien visibles.';
    STR_CHAT_CLEAR_MSG = 'Effacer le chat, supprimer les messages d\'un utilisateur';
    STR_CHAT_SHOW_BADGES = 'Afficher les badges utilisateur (hors ci-dessous)';
    STR_CHAT_SHOW_BADGES_MOD = 'Afficher les badges de modérateur';
    STR_CHAT_SHOW_BADGES_VIP = 'Afficher les badges VIP';
    STR_CHAT_SHOW_BADGES_SHARED = 'Afficher les badges de chat partagés';
    STR_CHAT_MESSAGE_DELETED = 'Ce message utilisateur a été demandé à la suppression';
    STR_CHAT_MESSAGE_DELETED_ALL = 'Tous les messages de cet utilisateur ont été demandés à la suppression';
    STR_CHAT_MESSAGE_DELETED_TIMEOUT = ', il/elle a été mis(e) en timeout pendant';
    STR_CHAT_CLEAR_MSG_SUMMARY =
        'Supprimer les messages d\'utilisateurs spécifiques (par exemple après un timeout ou un ban). Si activé, les messages sont supprimés ; sinon seul le fond devient bleu.';
    STR_OPEN_HOST_SETTINGS = 'Toujours ouvrir le live hébergé à la fin du stream si disponible';
    STR_ALWAYS_STAY = 'Toujours laisser le lecteur ouvert après la fin d\'un live';
    STR_PING_WARNING = 'Afficher l\'avertissement « Échec du ping vers Twitch »';
    STR_PING_WARNING_SUMMARY =
        'L\'app vérifie en permanence la connexion avec Twitch via un ping. Si cela échoue trop souvent, un avertissement s\'affiche. Si vous pensez que l\'avertissement est incorrect, mettez cette option sur NON.';
    STR_KEY_UP_TIMEOUT = 'Délai d\'appui long (en millisecondes)';
    STR_KEY_UP_TIMEOUT_SUMMARY =
        'Durée pendant laquelle il faut maintenir une touche avant qu\'une action longue se déclenche. Exemples : actualiser l\'écran, afficher les options de vignettes, etc.';
    STR_CURRENT_THUMB_STYLE = 'Style de focus actuel';
    STR_NEW_THUMB_STYLE = 'Nouveau style de focus';
    STR_COLOR_STYLE_TEXT = 'Utilisez Haut/Bas pour sélectionner une option, Retour pour quitter, OK sur « Appliquer les changements » pour confirmer avant de quitter.';
    STR_SHADOWS = 'Ombres';
    STR_SHADOWS_NONE = 'Aucune';
    STR_SHADOWS_WHITE = 'Blanches';
    STR_SHADOWS_GRAY = 'Grises';
    STR_SHADOWS_BLACK = 'Noires';
    STR_COLORS = 'Couleurs';
    STR_RESULT = 'Résultat';
    STR_APPLY = 'Appliquer les changements';
    STR_COLOR_TYPE = 'Type de couleur';
    STR_ENTER = 'Appuyez sur OK';
    STR_COLOR_ARRAY = 'Fond,Texte,Bordure,Barre de progression regardé';
    STR_STYLES_ARRAY = 'Par défaut,Personnalisé,Blanc,Gris,Rouge,Orange,Jaune,Vert,Bleu,Violet,Rose';
    STR_ENTER_RGB = STR_ENTER + ' pour valider le changement RGB';
    STR_THUMB_STYLE = 'Style de vignette sélectionné';
    STR_OPEN_EXTERNAL_PLAYER = 'Ouvrir dans un lecteur externe';
    STR_CHAT_SIDE_ARRAY = ['Gauche', 'Droite'];
    STR_CHAT_BASE_ARRAY = ['Bas droite', 'Centre droite', 'Haut droite', 'Centre haut', 'Haut gauche', 'Centre gauche', 'Bas gauche', 'Centre bas'];
    STR_CHAT_100_ARRAY = ['Droite', 'Centre', 'Gauche'];
    STR_NOTIFICATION_POS = 'Position des notifications à l\'écran';
    STR_NOTIFICATION_POS_ARRAY = ['Haut droite', 'Haut centre', 'Haut gauche', 'Bas gauche', 'Bas centre', 'Bas droite'];
    STR_LOWLATENCY_ARRAY = [STR_DISABLE, 'Mode normal, peut provoquer des re-buffers', 'Mode le plus faible, peut provoquer encore plus de re-buffers'];
    STR_LOWLATENCY_ENABLE_ARRAY = [STR_LOW_LATENCY + ' - ' + STR_DISABLED, STR_LOW_LATENCY + ' - Mode normal', STR_LOW_LATENCY + ' - Mode le plus faible'];
    STR_VOD_SEEK = 'Contrôles d\'avance/retour rapide VOD';
    STR_VOD_SEEK_SUMMARY =
        'Contrôle la vitesse des pas de retour/avance rapide. En maintenant Gauche/Droite, le pas augmente dans le temps jusqu\'à un maximum après un certain délai. Après relâchement et une seconde sans clic, le pas revient à sa valeur minimale.<br><br>Appuyer sur Haut écrase les valeurs min/max, permet de parcourir tous les pas possibles et de verrouiller la valeur tant que la barre de progression est affichée.<br><br>Les clics simples sans maintien n\'augmentent pas le temps.<br><br>Ces options ne fonctionnent que pour les VOD. Pour les clips, le pas est toujours de 1 seconde.';
    STR_VOD_SEEK_MIN = 'Durée minimale (de départ) du pas';
    STR_VOD_SEEK_MAX = 'Durée maximale du pas';
    STR_VOD_SEEK_TIME = 'Délai d\'augmentation après un maintien de';
    STR_UP_LOCKED = 'appuyez sur Haut pour verrouiller la valeur de pas';
    STR_LOCKED = 'verrouillé, appuyez sur Haut pour changer';
    STR_IN_CHAT = 'Dans le chat';
    STR_IN_SHARED_CHAT = 'Dans le chat partagé';
    STR_SHOW_IN_CHAT = 'Afficher en haut du chat le total d\'utilisateurs connectés ou de spectateurs';
    STR_SHOW_IN_CHAT_SUMMARY =
        'Aide à voir si le chat hors-ligne a des utilisateurs actifs et montre la différence entre le nombre total de spectateurs et les utilisateurs du chat.';
    STR_SHOW_IN_CHAT_VIEWERS = 'Afficher les spectateurs';
    STR_SHOW_IN_CHAT_CHATTERS = 'Afficher les utilisateurs du chat';
    STR_PLAYED = 'Joué';
    STR_CHAPTERS = 'Chapitres';
    STR_FROM_SIMPLE = 'depuis';
    STR_HIDE_MAIN_CLOCK = 'Masquer l\'horloge de l\'écran principal';
    STR_HIDE_PLAYER_CLOCK = 'Masquer l\'horloge du lecteur';
    STR_HIDE_MAIN_SCREEN_TITLE = 'Masquer le titre de l\'écran principal';
    STR_HIDE_MAIN_SCREEN_TITLE_SUMMARY = 'Le titre au centre : lives, clips, paramètres, etc.';
    STR_HIDE_ETC_HELP_INFO = 'Masquer les aides de navigation à l\'écran';
    STR_HIDE_ETC_HELP_INFO_SUMMARY = 'Aides de navigation comme « maintenir une touche pour une action » et similaires.';
    STR_INACTIVE_SETTINGS = 'Réduire automatiquement l\'app en cas d\'inactivité pendant';
    STR_INACTIVE_SETTINGS_SUMMARY =
        'Empêche l\'app de rester en fonctionnement quand personne ne regarde. Un avertissement s\'affichera, laissant 15 secondes à l\'utilisateur pour appuyer sur une touche et annuler la réduction.';
    STR_INACTIVE_WARNING = 'L\'application va se réduire pour cause d\'inactivité dans<br><br>%x<br><br>Appuyez sur une touche pour annuler';
    STR_REMAINING = 'Restant :';
    STR_PLAYER_INFO_VISIBILITY = 'Visibilité de l\'état du lecteur';
    STR_PREVIEW_SET = 'Paramètres d\'aperçu';
    STR_PREVIEW_SHOW = 'Afficher l\'aperçu';
    STR_PREVIEW_SIZE_CONTROLS = 'Taille de l\'aperçu';
    STR_OLED_BURN_IN = 'Protection anti marquage OLED';
    STR_OLED_BURN_IN_SUMMARY =
        'Quand c\'est activé, l\'écran devient entièrement noir pendant 50 ms toutes les 20 minutes. Utile uniquement pour les appareils OLED sensibles au marquage.';
    STR_AS = 'comme';
    STR_MILLISECONDS = 'millisecondes';
    STR_HOUR = 'heure';
    STR_HOURS = 'heures';
    STR_RIGHT = 'Droite';
    STR_LEFT = 'Gauche';
    STR_BOTTOM = 'Bas';
    STR_TOP = 'Haut';
    STR_AVG = 'Moy.';
    STR_OFFSET = 'Décalage';

    STR_AFFILIATE = 'Contenu affilié';
    STR_AFFILIATE_SUMMARY = 'Si vous ne voulez pas voir le contenu affilié, mettez ceci sur désactivé.';
    STR_AFFILIATE_ABOUT =
        'Cette application contient des liens et images affiliés, provenant de partenaires proposant des produits fortement recommandés. Le propriétaire de l\'application peut recevoir une commission pour les achats effectués via ces liens. Tous les liens, images et éléments liés à un produit sont vérifiés et/ou utilisés avant d\'être affichés dans l\'application.';
    STR_AFFILIATE_ABOUT_DIS = 'Le contenu affilié peut être désactivé dans les paramètres.';

    STR_HISTORY_EMPTY_CONTENT = 'L\'historique affiche ce que vous avez regardé dans l\'application uniquement si l\'historique est activé';
    STR_PREVIEW = 'l\'aperçu';

    STR_EMBED = 'Lecteur intégré ';
    STR_CLICK_EXIT = 'Cliquez ici pour quitter le lecteur';
    STR_GO_FULL = 'Plein écran';
    STR_GO_FULL_HELP = 'Cliquez, appuyez sur 9 ou F11';
    STR_NOT_SUPPORT_BROWSER = 'Ce n\'est pas supporté dans un navigateur';

    STR_WARNING_BROWSER = 'Avertissement navigateur';
    STR_WARNING_BROWSER_SUMMARY =
        'Cette application est principalement conçue pour les téléviseurs, le support des autres appareils est limité. Vous pouvez contrôler l\'app avec une souris mais elle fonctionne mieux avec les touches de clavier haut, bas, gauche, droite, OK et Retour (Échap fonctionne comme Retour).';
    STR_THUMB_OPTIONS_CLICK = 'Cliquez deux fois sur une action (pour l\'ouvrir ou l\'appliquer), cliquez en dehors de la boîte pour sortir sans appliquer';
    STR_CLOSE_THIS_BROWSER = 'Appuyez sur Retour, OK ou cliquez en dehors pour fermer ceci';

    STR_DISABLE_EMBED = 'Activer le lecteur Twitch Live et VOD';
    STR_DISABLE_EMBED_SUMMARY =
        'À désactiver uniquement si vous voulez voir le lecteur Android natif pour vérifier ses textes et son interface à des fins de test.';

    STR_SPECIAL_FEATURE = 'Utilisez le clavier pour cette fonctionnalité';
    STR_FAIL_VOD_INFO = 'Échec du chargement des informations de la VOD';

    STR_PROXY_DONATE_SUMMARY = 'Si vous voulez en savoir plus ou remercier le mainteneur du proxy, utilisez le lien :';

    STR_PROXY_TIMEOUT = 'Délai du proxy (en secondes)';
    STR_PROXY_TIMEOUT_SUMMARY =
        'Si le serveur proxy est hors ligne, c\'est le temps avant d\'« abandonner » la connexion et de revenir à l\'implémentation Twitch par défaut';

    PROXY_SERVICE = 'Proxy : ';
    PROXY_SERVICE_STATUS = 'Activé et fonctionnel';
    PROXY_SERVICE_OFF = 'Désactivé dans les paramètres';
    PROXY_SERVICE_FAIL = 'Ne fonctionne pas, échec %x fois';

    PROXY_SETTINGS = 'Paramètres Proxy (censure Internet et proxy associé)';
    PROXY_SETTINGS_SUMMARY =
        'Un seul proxy peut être activé. Il permet d\'obtenir les liens de stream depuis un autre serveur, ce qui peut permettre de voir du contenu interdit dans votre région et d\'éviter les pubs. Désactivez-le si vous avez des problèmes de live (trop de buffering, gels ou baisse de qualité).';
    SEEK_PREVIEW = 'Aperçu lors de l\'avance/retour';
    SEEK_PREVIEW_SUMMARY =
        'Permet de contrôler l\'image d\'aperçu VOD affichée pendant l\'avance/retour rapide. Tous les VOD ne disposent pas d\'un tel aperçu.';
    SEEK_PREVIEW_SINGLE = 'Image unique';
    SEEK_PREVIEW_CAROUSEL = 'Carrousel d\'images';

    OPEN_NEW_ISSUE = '(Cliquez sur New issue)';

    STR_CONFIRM = 'Confirmer';

    STR_MATURE_NO_CHANGES = 'Aucun changement au contenu réservé aux adultes faute de mot de passe';
    STR_MATURE_PROTECT = 'Protéger les réglages de contenu adulte par mot de passe';
    STR_MATURE_HELP_SET_PASS = 'Définissez un mot de passe et cliquez sur Confirmer, quitter réinitialise les paramètres de contenu adulte';
    STR_MATURE_HELP_CHECK_PASS = 'Entrez le mot de passe sauvegardé et cliquez sur Confirmer, quitter réinitialise les paramètres de contenu adulte';

    STR_MATURE_DISABLED = 'Le contenu adulte est désactivé';
    STR_ENABLE_MATURE = 'Contenu adulte';
    STR_ENABLE_MATURE_SUMMARY =
        'Quand c\'est désactivé, l\'app bloque tout contenu marqué comme mature, y compris les contenus suivis : lives marqués comme adulte, ainsi que tous les clips et VOD correspondants.';

    STR_SCREEN_OFF = 'Écran éteint (audio uniquement)';

    STR_UNBLOCK_CHANNEL = 'Débloquer la chaîne';
    STR_UNBLOCK_GAME = 'Débloquer le jeu';
    STR_BLOCK_CHANNEL = 'Bloquer la chaîne';
    STR_BLOCK_GAME = 'Bloquer le jeu';
    STR_BLOCK_NO_USER = 'Ajoutez d\'abord un utilisateur avant de pouvoir bloquer';
    STR_BLOCK_NO_CHANNEL = 'Impossible de récupérer la chaîne pour ceci';
    STR_BLOCK_OVERWRITE = 'Afficher les éléments bloqués';
    STR_BLOCK_SORT_DATE = 'Triés par date de blocage';
    STR_BLOCK_SORT_NAME = 'Triés par nom A à Z';
    STR_BLOCK_EMPTY_CONTENT = 'Il n\'y a aucun contenu bloqué de ce type';

    STR_NO_TOKEN_WARNING = 'Sans utilisateur ajouté, l\'app peut échouer à charger le contenu, c\'est une limitation de l\'API Twitch';
    STR_NO_TOKEN_WARNING_429 = 'L\'app échoue à charger le contenu à cause d\'une limitation de l\'API Twitch, ajoutez un utilisateur pour corriger ce problème.';

    STR_ADD_USER_TEXT = 'Visitez %site sur un autre appareil et entrez le code : %code';
    STR_ADD_USER_TEXT_COUNTER = 'Vérification de la confirmation d\'accès dans %d...';
    STR_ADD_USER_TEXT_COUNTER_NOW = 'Vérification maintenant !';
    STR_ADD_ERROR = 'Impossible d\'accéder au service d\'ajout d\'utilisateur';
    STR_USER_TOKEN_ERROR = 'Perte d\'accès à l\'utilisateur actuel, veuillez vérifier la section utilisateur';

    STR_WRONG_PASS = 'Mauvais mot de passe !';
    STR_PASS_MATURE_ENABLED = 'Le contenu adulte est activé, ancien mot de passe supprimé';

    STR_PLAYER_EXTRA_CODEC = 'Diffusion améliorée HEVC, AV1, support 1440p 4K';
    STR_PLAYER_EXTRA_CODEC_SUMMARY = 'La plupart des streams utilisent AVC (H.264) jusqu\'à 1080p60 ; HEVC/AV1 permettent le 1440p, 4K et 60+ fps quand disponible.';

    STR_PLAYER_EXTRA_CODEC_SUMMARY1 =
        'Cette fonctionnalité ne fonctionne que pour les utilisateurs connectés. Tous les streams ne sont pas compatibles : cela dépend du streamer et de la disponibilité de Twitch dans votre région.';

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA = 'L\'app vérifie si votre appareil supporte HEVC ou AV1 pour des streams de meilleure qualité.';

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA2 = 'Sans support sur l\'appareil, la lecture sera limitée et pourra échouer pour les streams améliorés.';

    STR_PLAYER_CODEC_SUPPORTED = 'appareil compatible';
    STR_PLAYER_CODEC_NOT_SUPPORTED = 'Appareil non compatible ! Activer ce codec peut provoquer des erreurs de lecture.';

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA3 = 'Pour mieux comprendre les capacités de l\'appareil, consultez les paramètres : ';

    STR_BLOCKED_CODEC = 'Capacité des codecs & codecs bloqués';
    STR_BLOCKED_CODEC_SUMMARY = 'Liste les capacités des codecs utilisés et permet de bloquer certains codecs.';

    STR_CODEC_DIALOG_SUMMARY_1 = 'Cette section liste tous les types de codecs supportés par l\'appareil (AVC H.264, HEVC H.265, AV1) utilisés par cette app.';

    STR_CODEC_DIALOG_SUMMARY_2 =
        'Les codecs logiciels (OMX.google) sont désactivés par défaut si un codec matériel est disponible. En cas de problème de lecture, essayez de désactiver le logiciel et d\'activer le matériel ou inversement (une accumulation constante d\'images sautées est typique d\'un souci de codec).';

    STR_CODEC_DIALOG_SUMMARY_3 = 'Au moins un codec de chaque type doit rester activé en permanence.';

    STR_SPEED_ADJUST = 'Rattraper en faible latence';
    STR_SPEED_ADJUST_SUMMARY =
        'Quand la faible latence est activée, ajuste automatiquement la latence si elle s\'écarte de la cible en ralentissant ou accélérant le stream de 1 %. Le changement de vitesse peut provoquer un léger bruit audio quand la latence est ajustée.';

    STR_SW_CODEC = 'Codec logiciel';
    STR_HW_CODEC = 'Codec matériel';

    STR_LOAD_ALL_LANG = 'Basculer automatiquement le contenu sur « Toutes » les langues';
    STR_LOAD_ALL_LANG_SUMMARY =
        'Bascule automatiquement sur la langue « Toutes » quand la langue actuelle n\'a pas de contenu, uniquement sur certains écrans (Jeux et Page d\'accueil).';
    STR_LOAD_ALL_LANG_WARNING = STR_LOAD_ALL_LANG + ' à cause d\'un contenu vide';

    STR_DISABLE_SHARED_CHAT = 'Désactiver le chat partagé';
    STR_DISABLE_SHARED_CHAT_SUMMARY = 'Si activé, n\'affiche que les messages du chat du stream que vous regardez.';

    STR_BACKUP_ACCOUNT_REMOVE = 'Supprimer le compte Google Drive';
    STR_BACKUP_ACCOUNT_ADD = 'Ajouter un compte Google Drive pour la sauvegarde';
    STR_BACKUP_ACCOUNT_ADD_SUMMARY = 'Pour restaurer une sauvegarde, ajoutez un compte et l\'app affichera les options de restauration disponibles.';
    STR_BACKUP_ACCOUNT_DIALOG_TITLE = 'Ajouter un compte Google Drive';

    STR_BACKUP_ACCOUNT_DIALOG_BODY = 'Récupération des informations d\'API, veuillez patienter...';
    STR_BACKUP_ACCOUNT_DIALOG_CODE_FAIL = 'Accès refusé';
    STR_BACKUP_ACCOUNT_DIALOG_CODE_SUCCESS = 'Accès réussi, veuillez patienter pendant la vérification...';

    STR_BACKUP_ACCOUNT_DIALOG_CODE_SUCCESS_END = 'L\'app restaurera et fermera cette boîte de dialogue dans quelques instants';
    STR_BACKUP_NO_BACKUP_FOUND = 'Aucune sauvegarde précédente trouvée, sauvegarde créée avec succès';
    STR_BACKUP_ACCOUNT_REFRESH_ERROR = 'Perte d\'accès au compte de sauvegarde et de synchronisation, compte de sauvegarde supprimé !';

    STR_BACKUP_SIZE = 'Taille de la sauvegarde :';
    STR_BACKUP_NAME = 'Nom de la sauvegarde :';
    STR_BACKUP_SYNC = 'Sync, Sauvegarde et Restauration';
    STR_BACKUP_SYNC_SUMMARY =
        'L\'app pourra voir, créer, modifier et supprimer uniquement les fichiers Google Drive qu\'elle crée elle-même ; elle ne pourra NI voir NI modifier, NI supprimer d\'autres fichiers sur votre Google Drive.' +
        '<br><br>' +
        'Elle pourra aussi lire votre adresse e-mail et votre image de profil pour afficher le compte actif. Ces informations ne seront qu\'affichées et jamais modifiées.';

    STR_BACKUP_USER_INFO = '(Infos utilisateur : utilisateurs, historique, blocages et paramètres)';

    STR_BACKUP_SYNC_USER = 'Synchroniser les utilisateurs';
    STR_BACKUP_SYNC_HISTORY = 'Synchroniser l\'historique et la liste des contenus bloqués.';
    STR_BACKUP_SYNC_SETTINGS = 'Synchroniser les paramètres';
    STR_BACKUP_RESTORE_USER = 'Restaurer les utilisateurs';
    STR_BACKUP_RESTORE_HISTORY = 'Restaurer l\'historique et la liste des contenus bloqués.';
    STR_BACKUP_RESTORE_SETTINGS = 'Restaurer les paramètres';
    STR_BACKUP_RESTORE_SUMMARY = 'En cas de problème après une restauration, essayez d\'effacer les données de l\'app et de restaurer en omettant une option.';

    STR_BACKUP_SYNC_SETTINGS_SUMMARY =
        'La sauvegarde contient un jeu unique de paramètres pour tous vos appareils. Tout changement sera appliqué aux autres appareils la prochaine fois que vous ouvrirez l\'app.';
    STR_BACKUP_SYNC_RESTORE = 'Sauvegarde trouvée';
    STR_BACKUP_SYNC_RESTORE_SUMMARY = 'Sauvegarde trouvée. Sélectionnez les éléments à restaurer, puis appuyez sur Retour ou OK pour confirmer.';
    STR_BACKUP_SYNC_RESTORE_SUCCESS = 'Restauration réussie !';
    STR_BACKUP_RESTORE_FAIL = 'Échec de la restauration de la sauvegarde';

    STR_BACKUP_ENABLE = 'Sauvegarde activée';
    STR_BACKUP_ENABLE_SUMMARY = 'Si OUI, l\'app gardera une sauvegarde de toutes les infos utilisateur ' + STR_BACKUP_USER_INFO;

    STR_BACKUP_SYNC_ENABLE = 'Synchroniser entre appareils';
    STR_BACKUP_SYNC_ENABLE_SUMMARY =
        'L\'activation ajoute un léger délai au démarrage de l\'app et est inutile si vous l\'utilisez sur un seul appareil. L\'app synchronise toutes les options activées ci-dessous entre cet appareil et les autres utilisant le même compte Google Drive. Pour changer d\'appareil et reprendre la lecture, réduisez l\'app sur l\'appareil actuel avec la touche Home. Puis, assurez-vous qu\'elle est totalement fermée sur l\'autre appareil avant de l\'ouvrir.';
}
