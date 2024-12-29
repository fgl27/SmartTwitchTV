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
function es_ESLang() {
    // This is a false/true var change if day comes first in your language eg (27/12/2010) day 27 month 12 year 2010
    //Then copy this and set it to true, if doesn't don't copy it
    Main_IsDayFirst = false;

    // This is the size of side pannel a adjustments may be needed here so it can fit all words in the horizontal axis
    // If it need ajustment or yours language just copy the bellow line and change it value until it does
    Sidepannel_MoveldefaultMargin = 17;

    //Below are variables to translate
    STR_KEY_UP_DOWN = 'PG Arriba/Abajo';

    STR_REFRESH = 'Actualizar';
    STR_SEARCH = 'Buscar';
    STR_SETTINGS = 'Configuración';
    STR_CONTROLS = 'Controles';
    STR_ABOUT = 'Acerca de';
    STR_HIDE = 'Ocultar';
    STR_SEARCH_EMPTY = 'El texto que ingresaste está vacío.';
    STR_SEARCH_RESULT_EMPTY = 'El resultado de la búsqueda está vacío.';
    STR_SWITCH = 'Cambiar de pantalla';
    STR_SWITCH_USER = 'Cambiar pantalla de usuario';
    STR_SWITCH_VOD = 'Cambiar: Vods o Highlights';
    STR_SWITCH_CLIP = 'Cambiar: Periodo (24 h, 7 días, 30 días, todos)';
    STR_GO_TO = 'Ir a la pantalla';
    STR_USER = 'Usuario';
    STR_LIVE = 'En directo';
    STR_GAMES = 'Juegos';
    STR_PLAYING = 'Jugando';
    STR_FOR = 'para';
    STR_WATCHING = 'Viendo hace';
    STR_WAITING = 'Tiempo de espera';
    STR_SINCE = 'Desde';

    STR_PLACEHOLDER_SEARCH = 'Escriba su búsqueda ...';
    STR_PLACEHOLDER_OAUTH = 'Escriba su clave de autorización...';
    STR_PLACEHOLDER_USER = 'Escriba su nombre de usuario...';
    STR_PLACEHOLDER_PRESS = 'Presione la tecla Enter o Seleccionar para,';
    STR_CHANNELS = 'Canales';
    STR_CHANNEL = 'Canal';
    STR_GOBACK_START = 'Volver a la pantalla anterior: tecla de retorno';
    STR_IS_OFFLINE = 'ha terminado';
    STR_CHECK_HOST = ', comprobación de host';
    STR_IS_SUB_ONLY = 'Este video solo está disponible para suscriptores.';
    STR_IS_SUB_ONLY_ERROR = 'es contenido solo para suscriptores.';
    STR_REFRESH_PROBLEM = 'La conexión falló, no se pudo cargar el contenido. Presiona actualizar para volver a intentarlo';
    STR_NO = 'No';
    STR_FOR_THIS = 'for this';
    STR_PLAYER_PROBLEM = 'La conexión falló, no se pudo cargar el contenido de video saliendo...';
    STR_VODS = 'Vods';
    STR_HIGHLIGHTS = 'Destacados';
    STR_CLIPS = 'Clips';
    STR_CONTENT = 'Contenido';
    STR_STREAM_ON = 'Transmitido';
    STR_DURATION = 'Duración';
    STR_VIEWS = 'Vistas';
    STR_VIEWER = 'Espectadores';
    STR_EXIT_AGAIN = 'Haga clic de nuevo para salir!';
    STR_EXIT_AGAIN_PICTURE = 'Pulse de nuevo para salir de Imagen en Imagen!';
    STR_EXIT_AGAIN_MULTI = 'Pulse de nuevo para salir de MultiStream!';
    STR_EXIT_MESSAGE = '¿Quieres salir del Cliente SmartTV para Twitch?';
    STR_EXIT = 'Salir';
    STR_CHANGELOG = 'Cambios';
    STR_FULL_CHANGELOG = 'Registro de cambios completo';
    STR_CHANGELOG_SUMMARY = 'Estos son sólo los últimos cambios, para leer los cambios completos consulte el siguiente enlace:';
    STR_UPDATE = 'Haga clic para actualizar';
    STR_UPDATE_CHECK = 'Buscar actualizaciones';
    STR_UPDATE_CHECKING = 'Buscando actualizaciones...';
    STR_UPDATE_CHECKING_FAIL = 'Error de comprobación de actualización';
    STR_NO_UPDATES = 'La aplicación está actualizada';
    //STR_UPDATE_CHANGELOG = 'Actualización & Cambios';
    STR_UPDATE_LATEST = 'Último cambio:';
    STR_UPDATE_FAIL = 'El proceso de actualización ha fallado, por favor, inténtelo manualmente!';
    STR_UPDATE_FAIL_DOWNLOAD = 'El proceso de actualización no logra descargar el APK, por favor inténtelo manualmente!';
    STR_UPDATE_AVAILABLE = 'Actualización de Apk disponible';
    STR_WEB_UPDATE_AVAILABLE = 'Actualización Web disponible';
    STR_UPDATE_CHECK_SIDE = ', comprobar en el panel lateral';
    STR_UPDATE_LAST_CHECK = 'Última comprobación:';
    STR_UPDATE_OPT = 'Opciones de actualización';
    STR_UPDATE_CHECK_FOR = 'Buscar actualizaciones en segundo plano';
    STR_UPDATE_SHOW = 'Mostrar el diálogo de actualizaciones cuando éstas están disponibles';
    STR_UPDATE_SHOW_ARRAY = ['Si', 'Sólo un mensaje de brindis', 'No'];
    STR_UPDATE_START = 'El proceso de actualización ha comenzado, esto puede tardar unos segundos, por favor espere!';
    STR_UPDATE_PLAY = 'Si Play Store no muestra la actualización inténtalo de nuevo después de unos minutos!';
    STR_UPDATE_ERROR = 'Necesitas la versión 3.0.303 o superior del APK para poder usar esto, por favor actualiza de la forma antigua';
    STR_UPDATE_WARNING_OK = 'Aplicación actualizada OK';
    STR_CLOSE = 'Cerrar';
    STR_MINIMIZE = 'Minimizar';
    STR_CANCEL = 'Cancelar';

    STR_LIVE_CHANNELS = 'Canales en directo';
    STR_LIVE_HOSTS = 'Hosts';
    STR_LIVE_GAMES = 'Juegos en Directo';
    STR_USER_CHANNEL = 'Canales seguidos';
    STR_USER_MY_CHANNEL = 'Mi canal';
    STR_USER_ADD = 'Agregar usuario';
    STR_USER_REMOVE = 'Remover usuario';
    STR_USER_ERROR = 'El usuario no existe';
    STR_USER_HOSTING = 'hosteando';
    STR_USER_SET = 'ya está configurado';
    STR_USER_MAKE_ONE = 'Cambiar a';
    STR_USER_NUMBER_ONE = 'El primer usuario puede seguir (al proporcionar una clave) y ver los canales en directo fuera de la pantalla del usuario';
    STR_ADD_USER_SH = 'Añade un usuario de Twitch para mostrar el contenido de los canales seguidos aquí';
    STR_CLIP_DAY = '24h';
    STR_CLIP_WEEK = '7d';
    STR_CLIP_MONTH = '30d';
    STR_CLIP_ALL = 'todo';
    STR_JUMP_TIME = 'Saltar';
    STR_JUMP_T0 = 'a';
    STR_JUMP_CANCEL = 'Salto cancelado';
    STR_JUMP_TIME_BIG = ', tiempo de salto mayor que la duración';
    STR_SEC = 'Seg';
    STR_MIN = 'Min';
    STR_MS = 'Ms';
    STR_HR = 'Hr';
    STR_SOURCE = 'Fuente';
    STR_TWITCH_TV = 'Cliente SmartTV para Twitch';
    STR_CLOSE_THIS = 'Presione Regresar o Enter para cerrar este.';
    STR_CLOSE_THIS2 = 'Presione regresar para cerrar esto.';
    STR_CLOSE_THIS3 = 'Presione volver para mostrar el cuadro de diálogo de actualización o enter para cerrar este.';
    STR_PLAYER = 'Relacionado al Reproductor:';
    STR_CHAT = 'Relacionado al Chat:';
    STR_CHAT_SHOW = 'Mostrar chat';
    STR_CURRENT_VERSION = 'Versión actual instalada';
    STR_LATEST_VERSION = 'última versión disponible';
    STR_CONTROLS_MAIN_2 =
        'Reproduce un vídeo: Navega con el pad direccional (arriba/abajo/izquierda/derecha), pulsa enter o las teclas multimedia de reproducir/pausa o ver pista o 1 tecla';
    STR_CONTROLS_MAIN_3 = 'Actualizar el contenido de la pantalla:';
    STR_CONTROLS_MAIN_4 = 'Salir de la aplicación: desde el panel lateral haga clic en salir';
    STR_CONTROLS_MAIN_5 = 'Forzar el cierre de la aplicación: Mantenga la tecla de retorno hasta que se cierre automáticamente';
    STR_CONTROLS_MAIN_6 = 'Cambiar de pantalla: tecla de retorno y luego D-Pad arriba/abajo o' + STR_KEY_UP_DOWN + STR_KEY_MEDIA_FF;
    STR_CONTROLS_MAIN_10 =
        'Inicie una búsqueda: desde el panel lateral haga clic en buscar, escribiendo la búsqueda pulse la tecla Enter en el teclado virtual y elija una opción de búsqueda';
    STR_CONTROLS_MAIN_14 = 'Acerca de esta aplicación: en el panel lateral haga clic en Acerca de';
    STR_ABOUT_INFO_1 = 'Se trata de un cliente de Twitch para Android TV, liberado de forma gratuita para todo aquel que quiera utilizarlo';
    STR_ABOUT_INFO_2_SOURCE = 'Esta versión de la aplicación es sólo de prueba en el navegador!';
    STR_ABOUT_INFO_3 = 'Información de contacto:';
    STR_ABOUT_INFO_4 = 'Esta es una aplicación de código abierto licenciada bajo la Licencia Pública General GNU v3.0, consúltela en GitHub';
    STR_ABOUT_INFO_6 = 'Esta aplicación utiliza las siguientes dependencias:';

    STR_CONTROLS_PLAY_14 =
        'Chat y vídeo (lado a lado): tecla 2 o tecla multimedia avance rápido, también cambia entre los modos Picture in Picture y 50/50';
    STR_F_DISABLE_CHAT = 'Forzar deshabilitar el chat';
    STR_OAUTH_IN =
        'Añadir una clave permite que la aplicación acceda al chat usando tu usuario para enviar mensajes y obtener tu lista de emote (te permite obtener sub dones para el chat), seguir/deshacer canales y acceder a algunos contenidos de los usuarios más rápidamente<br><br>Añadir una clave no es exigente y puede hacerse en cualquier momento posterior<br><br>En caso de duda lee este enlace:<br><br>%x<br><br>Para algunos dispositivos es necesario un ratón para completar la acción de autorización ya que puede ser necesario pulsar manualmente un botón para confirmar.<br><br>Añadir clave para';
    STR_USER_CODE = 'Añadir clave de autorización';
    STR_USER_CODE_OK = 'Clave añadida OK';
    STR_KEY_BAD = 'La prueba de la llave ha fallado, hay que añadir una nueva';
    STR_OAUTH_WRONG = 'Intenta añadir una clave para el usuario';
    STR_OAUTH_WRONG2 = 'pero esta clave es para el usuario';
    STR_FOLLOWING = 'Siguiendo';
    STR_FOLLOW = 'Seguir';
    STR_IS_SUB_NOOAUTH = 'Y si no has añadido una clave de autorización, la aplicación no puede comprobar el estado de tu sub..';
    STR_IS_SUB_NOT_SUB = 'Y no eres un sub de este canal';

    STR_OAUTH_FAIL = 'Fallo en la comprobación de la autorización con la clave del proveedor, por favor, compruebe y vuelva a intentarlo';
    STR_OAUTH_FAIL_USER = 'La clave añadida no pertenece al usuario';
    STR_NOKEY = 'Ningún usuario';
    STR_NOKEY_WARN = 'Establecer un usuario y una clave de autorización para poder seguir o dejar de seguir';
    STR_NOKUSER_WARN = 'Añade primero un usuario';
    STR_RESET = 'Reinicie el';
    STR_CLIP = 'Clip';
    STR_CHANNEL_CONT = 'Contenido del canal';

    STR_FOLLOWERS = 'Seguidores';
    STR_CANT_FOLLOW = ', No se puede seguir o dejar de seguir';
    STR_GAME_CONT = 'Contenido del juego';
    STR_YES = 'Si';

    STR_GUIDE = 'Mantenga pulsado enter';
    STR_MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
    STR_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    STR_VIDEOS = 'Vídeos';
    STR_REPLAY = 'Repetición';
    STR_STREAM_END = 'saliendo en';
    STR_STREAM_END_EXIT = 'pulse "Retorno" para salir';
    STR_CREATED_AT = 'Creado';

    STR_SHOW_ISLIVE_WARNING = 'Mostrar Advertencia de "Streamer en directo"';
    STR_SHOW_ISLIVE_WARNING_SUMMARY =
        'Al ver un clip o un VOD, la aplicación puede comprobar si ese streamer está en directo, si esto está configurado como SÍ, se mostrará una advertencia, para abrir el directo sólo tienes que utilizar la opción de controles inferiores del reproductor';

    STR_STAY_OPEN = 'Permanecer en el stream';

    STR_STAY_CHECK_LAST = 'Último resultado:';

    STR_IS_NOW = 'es ahora';

    STR_SETTINGS_BUFFER_SIZE = 'Tamaño del buffer de inicio:';
    STR_SETTINGS_BUFFER_SIZE_SUMMARY =
        'Cuánto se necesita para almacenar en el buffer antes de comenzar la reproducción, esto no está relacionado con el tamaño máximo que puede alcanzar el buffer (el tamaño máximo del buffer se basa en el tamaño de la RAM del dispositivo), un valor más bajo aquí hará que la reproducción comience antes y eso es siempre recomendable. Cambiar este valor a un valor más grande en la mayoría de los casos no causará ninguna mejora pero sí contratiempos';
    STR_SETTINGS_BUFFER_LIVE = 'Buffer inicial de Streams en directo';
    STR_SETTINGS_BUFFER_VOD = 'Buffer inicial de Vídeos (Emisiones pasadas y destacados)';
    STR_SETTINGS_BUFFER_CLIP = 'Buffer inicial de Clips';
    STR_SETTINGS_LANG = 'Idioma';

    STR_CHAT_SEND_DELAY = 'El mensaje se envía, pero el retraso del chat está activado, el mensaje se mostrará en el chat después';
    STR_CHAT_DELAY = 'Chat: retraso';

    STR_VOD_HISTORY = STR_VOD_HISTORY_BASE + ' VOD?';

    STR_NOKEY_VIDEO_WARN = 'Añadir una clave de autorización de usuario para poder ver los vídeos seguidos';
    STR_SWITCH_TYPE = 'Cambiar: Más recientes o vistas';
    STR_ENABLE = 'Activar';
    STR_ENABLED = 'Activado';
    STR_DISABLE = 'Desactivar';
    STR_DISABLED = 'Desactivado';

    STR_RESTORE_PLAYBACK_WARN = 'La aplicación se cerró durante la reproducción, restaurando la reproducción';
    STR_RESTORE_PLAYBACK = 'Restaurar la reproducción';
    STR_RESTORE_PLAYBACK_SUMMARY =
        'La aplicación guarda lo que estaba reproduciendo en caso de que se cierre involuntariamente, al cambiar de aplicación el sistema puede quedarse sin memoria y cerrarla, en este caso la aplicación restaurará lo que estaba reproduciendo previamente en el siguiente inicio';
    STR_CHAT_FONT = 'Tamaño de la fuente del chat';
    STR_VIDEOS_ANIMATION = 'Las miniaturas animadas del vídeo';

    STR_JUMPING_STEP = 'Paso de salto';
    STR_SECOND = 'segundo';
    STR_SECONDS = 'segundos';
    STR_MINUTE = 'minuto';
    STR_MINUTES = 'minutos';
    STR_CLOCK_OFFSET = 'Desplazamiento del reloj';
    STR_CLOCK_OFFSET_SUMMARY = 'Ajustar el reloj de la aplicación principal en relación con su elección';
    STR_CONTENT_LANG = 'Idioma del contenido';
    STR_CONTENT_LANG_SUMMARY = 'El idioma del contenido en su pantalla, directo, vods, clips';
    STR_APP_LANG = 'Idioma de la aplicación';
    STR_APP_LANG_SUMMARY = 'El idioma del texto de la aplicación';
    STR_ENTER_TO_OPEN = 'Presione enter para acceder';
    STR_LANG_ALL = 'Todas';

    STR_CHAT_BRIGHTNESS = 'Brillo del fondo del chat';

    STR_PLAY_ALL = 'Reproducir Todo';
    STR_AUTO_PLAY_NEXT = 'Reproducción automática del siguiente clip';
    STR_SIDE_PANEL_BACK_MAIN_MENU = 'Volver al Menú principal';

    STR_HOLD_UP = 'Mantenga pulsado arriba';

    STR_VOD_DIALOG = 'Diálogo de inicio de VOD';
    STR_VOD_DIALOG_SUMMARY =
        'Elija el comportamiento por defecto, cuando reproduzca un VOD si la información está presente en el historial del usuario puede ser reproducido desde donde usted dejó de ver por última vez, si establece esto como "siempre desde el principio" este comportamiento también se aplicará a la vista previa del VOD';
    STR_VOD_DIALOG_START = 'Siempre desde el principio';
    STR_VOD_DIALOG_LAST = 'Siempre desde la última parada';
    STR_VOD_DIALOG_SHOW = 'Pregunte siempre';
    STR_END_DIALOG_OPT = 'Opciones de diálogo en fin de reprodución';
    STR_END_DIALOG_SETTINGS = 'Tiempo de diálogo en fin de reprodución';
    STR_END_DIALOG_SETTINGS_SUMMARY =
        'Cuando un Directo/VOD/Clip termina se muestra un diálogo con la opción de qué hacer a continuación, establezca el tiempo (en segundos) que tardará la opción por defecto en actuar';
    STR_END_DIALOG_DISABLE = 'Disable the timer';
    STR_CHAT_SIZE = 'Tamaño del chat';
    STR_CHAT_POS = 'Posición de chat';
    STR_CHAT_VIDEO_MODE = 'Modo de vídeo';
    STR_CHAT_SIDE_FULL = 'Pantalla completa';

    STR_CHAT_SIDE = 'Lado a lado, video y chat';
    STR_CHAT_5050 = '50/50 y chats';
    STR_SPEED = 'Velocidad';
    STR_QUALITY = 'Calidad';
    STR_NORMAL = 'Normal';
    STR_AUTO = 'Auto';
    STR_VERY_LOW = 'Muy baja';
    STR_LOW = 'Baja';
    STR_HIGH = 'Alta';
    STR_VERY_HIGH = 'Muy alta';
    STR_THUMB_RESOLUTION = 'Calidad de las miniaturas';
    STR_THUMB_RESOLUTION_SUMMARY =
        'Resolución de las miniaturas por defecto para el directo, los vídeos y los juegos (no se puede aplicar a los clips) un valor más bajo ayudará a que la aplicación cargue más rápido pero la miniatura puede verse borrosa';

    STR_PLAYER_BITRATE = 'Calidad automática máxima permitida Resolución/Tasa de bits';
    STR_PLAYER_BITRATE_SUMMARY =
        'Esto se utilizará para evitar retrasos en los dispositivos de gama baja cuando se reproduzcan varios vídeos al mismo tiempo (la mayoría de los dispositivos se retrasarán saltándose fotogramas en esa situación, ya que sólo están hechos para reproducir un único vídeo), también ayuda a limitar el uso del ancho de banda de Internet en caso de que necesites limitarlo, también establece la "Calidad predeterminada del reproductor" en Auto, la resolución/velocidad de transmisión recomendada para todos los reproductores pequeños es 720p/3 Mbps e ilimitada para el reproductor principal o grande para la mayoría de los dispositivos de gama baja';
    STR_PLAYER_BITRATE_SUMMARY_ETC =
        'Diferentes valores aquí para la resolución y la tasa de bits del reproductor principal y del pequeño, puede causar un corto buffering/carga cuando se cambia el reproductor principal en el modo Picture Picture (presionando hacia abajo se cambian los reproductores), para prevenir esto ponga ambos valores iguales a costa de un posible lag, el mejor indicativo de un bitrate demasiado alto es una constante acumulación de cuadros saltados o un constante buffering del stream.';
    STR_PLAYER_MAIN = 'Reproductor principal, reproductor de Picture in Picture o el reproductor principal 50/50';
    STR_PLAYER_RES_SMALL = 'Reproductores pequeños, reproductor pequeño del modo Picture in Picture y todos los reproductores Multistream';
    STR_PLAYER_BITRATE_MAIN = 'Tasa de bits - ' + STR_PLAYER_MAIN;
    STR_PLAYER_BITRATE_SMALL = 'Tasa de bits - ' + STR_PLAYER_RES_SMALL;
    STR_PLAYER_RES_MAIN = 'Resolución - ' + STR_PLAYER_MAIN;
    STR_PLAYER_RES_SMALL = 'Resolución - ' + STR_PLAYER_RES_SMALL;
    STR_BLOCK_RES = 'Resoluciones bloqueadas';
    STR_BLOCK_RES_SUMMARY =
        'Cuando se utiliza la calidad automática es posible bloquear una o más resoluciones para que no se utilicen nunca, esto es utilizable para los dispositivos que se retrasan en la reproducción de una resolución en particular, ya que los clips no se pueden reproducir en modo automático esto también bloqueará la sección automática de esta resolución en un clip.';
    STR_BLOCK_RES_SUMMARY_EXTRA =
        'El usuario puede sobrescribir la selección manualmente durante la reproducción<br><br>XX significa que todas las resoluciones que empiecen por ese valor antes de XX no podrán ser utilizadas, si la resolución está marcada como bloqueada';
    STR_BLOCKED = 'Bloqueada';
    STR_BLOCKED_NOT = 'No Bloqueada';

    STR_AUDIO = 'Audio -';
    STR_DEF_QUALITY = 'Calidad del reproductor por defecto';
    STR_DEF_QUALITY_SUMMARY =
        'Esta opción siempre será respetada cuando se reproduzca un solo video, en el modo de Imagen o Multistream la reproducción necesita usar la calidad Auto, para el por qué es eso, revisa la opción de ajustes "' +
        STR_PLAYER_BITRATE +
        '"';

    STR_PLAYER_INFO_VISIBILITY_ARRAY = ['Cuando la información del reproductor es visible', 'Siempre visible', 'Nunca visible'];
    STR_SINGLE_EXIT = 'Pulsar una sola tecla de retorno';
    STR_SINGLE_EXIT_SUMMARY = 'Salir del reproductor, del modo picture in picture, 50/50 o Multistream con un solo clic de retorno de la tecla';
    STR_NOTIFICATION_OPT = 'Opciones de notificación';
    STR_NOW_LIVE_SHOW = 'Mostrar la notificación "Streamer está en directo" para los canales seguidos';
    STR_TITLE_CHANGE_SHOW = 'Mostrar la notificación "Streamer cambio de título" para los canales seguidos';
    STR_GAME_CHANGE_SHOW = 'Mostrar la notificación "Streamer cambió de juego" para los canales seguidos';
    STR_NOW_LIVE_GAME_SHOW = 'Mostrar la notificación "Juego en directo" para los juegos seguidos';
    STR_NOW_BACKGROUND = 'Notificación sobre otras aplicaciones, cuando la aplicación está en segundo plano';
    STR_NOW_BACKGROUND_SUMMARY =
        'Si impides las notificaciones para esta aplicación en la configuración del sistema, esta característica no funcionará, si las notificaciones de la aplicación ya se están ejecutando y sales de la aplicación, la notificación se mostrará por encima de otras aplicaciones, incluso si está desactivada.';
    STR_NOTIFICATION_REPEAT = 'Cuántas veces hay que mostrar la notificación individual';
    STR_NOTIFICATION_REPEAT_SUMMARY =
        'El tiempo de espera de las notificaciones individuales es de unos 3 segundos, y no se puede cambiar porque este tiempo de espera está controlado por el sistema, pero se puede establecer el número de veces que se mostrará la misma notificación';
    STR_NOTIFICATION_SINCE =
        'Evitar que se muestre la notificación "Streamer está en directo" para las transmisiones que están en directo hace más de';
    STR_NOTIFICATION_SINCE_SUMMARY =
        'Esto es útil para evitar que la aplicación muestre una larga lista de notificaciones cuando la aplicación no se utiliza durante algún tiempo, por ejemplo, cuando se apaga el dispositivo o la pantalla está apagada (la aplicación no mostrará notificaciones cuando el dispositivo está encendido pero la pantalla está apagada)';
    STR_GLOBAL_FONT = 'Tamaño de la fuente en la aplicación';
    STR_GLOBAL_FONT_SUMMARY =
        'Esto cambiará el tamaño de todo el texto y la mayoría de los iconos en la aplicación (menos el tamaño de la fuente del chat, porque tiene su propio control), un valor demasiado pequeño puede no ser visible un valor demasiado grande desbordará el soporte de la caja de texto, esa es la forma en que este valor está limitado, cambiar esto refrescará todas las pantallas';
    STR_MAIN_MENU = 'Menú principal';
    STR_USER_MENU = 'Menú de usuario';

    STR_ROUND_IMAGES = 'Imágenes de canales redondeadas';
    STR_ROUND_IMAGES_SUMMARY = 'Como la mayoría de las imágenes de los canales son cuadradas, algunas imágenes pueden no verse bien';
    STR_SCREEN_COUNTER = 'Ocultar Posición/Contador total';
    STR_SCREEN_COUNTER_SUMMARY =
        'Hay un contador de posiciones que informa de la posición actual y del contenido total cargado en las pantallas que tienen contenido jugable, a medida que se desplaza se carga más contenido y el total se actualiza';

    STR_MAIN_USER = 'Usuario principal';
    STR_USER_TOP_LABEL = 'Haga clic en un usuario para ver las opciones';
    STR_USER_EXTRAS = 'Usuario: Cambiar, añadir, llave';
    STR_LOW_LATENCY = 'Baja Latencia';

    STR_LIVE_FEED_SORT = 'Panel lateral o reproductor Clasificación previa';
    STR_LIVE_FEED_SORT_SUMMARY =
        'Ordena el panel lateral en directo y la vista previa del reproductor, en la vista previa esto sólo se aplica al usuario en directo y destacado (todos los que no son historia son base de vistas, la historia es la última vista primero, y vod es la más reciente)';

    STR_APP_ANIMATIONS = 'Activar las animaciones de la aplicación';
    STR_APP_ANIMATIONS_SUMMARY = 'Activa el panel lateral, el desplazamiento y las animaciones relacionadas';
    STR_UI_SETTINGS = 'Personalización de la interfaz, estilo de color, animaciones y otros aspectos';
    STR_GENERAL_CUSTOM = 'Personalización de contenidos, ordenación, actualización automática, tiempos de espera y otros';

    STR_PRESS_ENTER_TO_CHANGE = 'Pulse Enter para cambiar a -';
    STR_CLICK_UNFOLLOW = '(Pulsa enter para dejar de seguir)';
    STR_CLICK_FOLLOW = '(Pulsa enter para seguir)';
    STR_TODAY = 'Hoy';
    STR_DROOPED_FRAMES = 'Fotogramas omitidos:';
    STR_BUFFER_HEALT = 'Tamaño buffer (Seg):';
    STR_NET_ACT = 'Actividad de red (Mb):';
    STR_NET_SPEED = 'Velocidad de red (Mb):';
    STR_LATENCY_TO_BROADCASTER = 'Latencia de transmisión';
    STR_LATENCY = 'Latencia de transmisión (Seg):';
    STR_CHAT_DELAY_LATENCY_TO_BROADCASTER = 'Base en la ' + STR_LATENCY_TO_BROADCASTER;
    STR_PING = 'Ping a Twitch (Ms):';
    STR_WARNINGS = 'Advertencias';

    STR_DPAD_POSTION = 'Posición de la pantalla del D-pad';
    STR_DPAD_OPACITY = 'Opacidad del D-pad';
    STR_DPAD_OPT = 'Opciones del D-pad';
    STR_BLOCKED_CODEC = 'Codecs bloqueados';
    STR_BLOCKED_CODEC_SUMMARY = 'Lista de los códecs utilizados y permite bloquear el uso de un códec';

    STR_MAX_RES = 'Resolución máxima:';
    STR_MAX_BIT = 'Tasa de bits máxima:';
    STR_MAX_LEVEL = 'Nivel máximo:';
    STR_MAX_FPS = 'Max fps per resolution:';
    STR_MAX_INSTANCES = 'Instancias máximas:';
    STR_UNKNOWN = 'Desconocido';

    STR_HISTORY = 'Historial';

    STR_HISTORY_LIVE_DIS = 'Habilitar el historial en directo';

    STR_OPEN_GAME = 'Abrir el juego';
    STR_OPEN_CHANNEL = 'Abrir el canal';
    STR_THUMB_OPTIONS_KEY = 'Pulse enter encima de una acción (para abrirla o aplicarla), volver para salir sin aplicarla';

    STR_THUMB_OPTIONS_TOP = 'Mantenga pulsado izquierda para ver las opciones de las miniaturas';

    STR_4_WAY_MULTI = '4 directos simultaneos';

    STR_PICTURE_LIVE_FEED = 'Picture in Picture: Mantén pulsado Enter y utiliza el D-Pad para mover o cambiar los vídeos';

    STR_SHOW_LIVE_PLAYER = 'Mostrar la vista previa en las pantallas de emisión en directo';
    STR_SHOW_VOD_PLAYER_WARNING = 'Iniciar la reproducción desde donde se detuvo por última vez:';
    STR_SHOW_VOD_PLAYER = 'Mostrar la vista previa en las pantallas de VOD';
    STR_SHOW_CLIP_PLAYER = 'Mostrar la vista previa en las pantallas de CLIP';
    STR_PREVIEW_CLIP_NEXT = 'Cuando la vista previa de un clip termina, el siguiente clip disponible cambia automáticamente';
    STR_SHOW_SIDE_PLAYER = 'Mostrar la vista previa en el panel lateral';
    STR_SHOW_FEED_PLAYER = 'Mostrar la vista previa en las miniaturas del reproductor';
    STR_SHOW_FEED_PLAYER_SUMMARY = 'Si no quieres o tu dispositivo se retrasa cuando hay más de un reproductor activo, ponlo en NO';
    STR_DISABLED_FEED_PLAYER_MULTI = 'Desactivar la vista previa cuando se activa el multistream';
    STR_DISABLED_FEED_PLAYER_MULTI_SUMMARY =
        'Por razones de rendimiento, algunos dispositivos pueden tener un retraso con múltiples reproductores, si tu está bien para el multistream pero cuando el reproductor de vista previa y el multistream están activos el dispositivo se retrasa establece esto en NO';
    STR_PREVIEW_ERROR_LOAD = 'La vista previa no se carga:';
    STR_PREVIEW_ERROR_LINK = 'inalcanzable';

    STR_PREVIEW_END = 'La vista previa del vídeo ha terminado';
    STR_PLAYER_LAG_ERRO = 'El reproductor no puede reproducir debido a un problema de conexión a la red';
    STR_PLAYER_ERROR = 'El reproductor no puede reproducir debido a un error del reproductor';

    STR_PREVIEW_SIZE = 'Tamaño de la vista previa del reproductor';
    STR_PREVIEW_SIZE_SUMMARY = 'Establecer el tamaño de la vista previa del reproductor de las miniaturas de la vista previa';
    STR_PREVIEW_SIZE_ARRAY = ['Pequeño', 'Mediano', 'Grande', 'Extra grande'];
    STR_PREVIEW_SIZE_SCREEN = 'Tamaño de la vista previa de las pantallas';
    STR_PREVIEW_SIZE_SCREEN_SUMMARY = 'Establecer el tamaño de la vista previa';
    STR_PREVIEW_SIZE_SCREEN_ARRAY = ['Tamaño de la miniatura', 'Más grande'];
    STR_SIDE_PANEL_PLAYER_DELAY = 'Retraso de la vista previa';
    STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY =
        'Establezca el tiempo de retraso que la vista previa tardará en comenzar a cargar después de seleccionar una miniatura, esto ayuda con los dispositivos lentos que se retrasan al desplazarse';
    STR_PREVIEW_VOLUME = 'Volumen de la vista previa';
    STR_PREVIEW_VOLUME_SUMMARY = 'Permitir establecer lo que será el volumen de vista previa de la alimentación';
    STR_PREVIEW_OTHERS_VOLUME = 'Volumen de los principales reproductores';
    STR_PREVIEW_OTHERS_VOLUME_SUMMARY =
        'El volumen del reproductor principal (Todos los reproductores picture in picture, reproductores multistream) puede ser más bajo cuando se muestra el reproductor de vista previa';
    STR_SIDE_PANEL_PLAYER = 'Vista previa de la configuración de los reproductores de miniaturas';
    STR_START_AT_USER = 'Inicie siempre la aplicación en la pantalla del usuario';
    STR_START_AT_USER_SUMMARY = 'Esto evitará que funcione la reproducción de Restaurar, pero permite elegir el usuario al inicio de la aplicación';
    STR_LAST_REFRESH = 'última actualización:';

    STR_SETTINGS_ACCESSIBILITY = 'Mostrar "un servicio de accesibilidad se está ejecutando"';
    STR_SETTINGS_ACCESSIBILITY_SUMMARY =
        'Si el dispositivo tiene un servicio de accesibilidad activado la aplicación mostrará una advertencia, es un problema conocido de android que el servicio de accesibilidad puede retrasar algunos dispositivos y causar congelaciones o retrasos en esta aplicación.';
    STR_ACCESSIBILITY_WARN = 'Servicio(s) de accesibilidad detectado(s)';
    STR_AUTO_REFRESH = 'Tiempo de refresco automático';
    STR_AUTO_REFRESH_SUMMARY =
        'Cuando esta opción está activada, la aplicación refrescará automáticamente una pantalla o una pantalla de vista previa de miniaturas, el refresco se produce sólo cuando la pantalla está seleccionada, si quieres un refresco en segundo plano activa la opción de abajo';
    STR_AUTO_REFRESH_BACKGROUND = 'Actualización automática en segundo plano';
    STR_AUTO_REFRESH_BACKGROUND_SUMMARY =
        'Cuando "Actualización automática en segundo plano" está configurado y está activado, el refresco automático ocurrirá en segundo plano (pero con la aplicación visible, android no permite que se ejecute sin restricciones en segundo plano para evitar el retraso de otra aplicación) cuando la pantalla no es visible o cuando vuelves a una pantalla que el refresco no se ejecutó antes, ten en cuenta que debido a que la aplicación tiene demasiadas pantallas cuando esta opción está activada el refresco automático puede causar retraso aleatorio en algunos dispositivos de gama baja.';
    STR_SOURCE_CHECK = 'Cambiar automáticamente la calidad del reproductor de Fuente a Auto cuando el reproductor se retrasa';
    STR_SOURCE_CHECK_SUMMARY =
        'Cuando esta opción está activada y no se utiliza la calidad automática, si el reproductor se retrasa cambiará a la calidad automática y advertirá de ello, un retraso en el reproductor es, por ejemplo, cuando el reproductor es incapaz de jugar durante más de 15 segundos (el algoritmo es más complejo que el tiempo, por supuesto), después de este cambio, el reproductor volverá automáticamente a la fuente cuando se inicie un nuevo flujo de vod.';
    STR_CHAT_WRITE = 'Escribir para chatear';
    STR_CHAT_EXTRA = 'Ajustes adicionales del chat';
    STR_CHAT_ROOMSTATE = 'Chat ROOMSTATE:';
    STR_CHAT_NO_RESTRICTIONS = 'Sin restricciones';
    STR_OPTIONS = 'Opciones';
    STR_CHAT_DELL_ALL = 'Borrar todo';
    STR_CHAT_FOLLOWER_ONLY = 'El chat está en modo "Solo seguidores", y usted no es un seguidor de';
    STR_CHAT_FOLLOWER_ONLY_USER_TIME = 'y sólo estáis siguiendo para';
    STR_CHAT_EMOTE_ONLY = 'Modo Twitch solo Emote';
    STR_CHAT_CHOOSE = 'Elija el chat al que desea escribir o pulse Retorno para cerrarlo';
    STR_NOKEY_CHAT_WARN = 'Añadir una clave de autorización de usuario para poder registrar y escribir en el chat';
    STR_CHAT_NOT_READY = 'El chat no está listo para ser enviado. Inténtelo de nuevo en uno o dos segundos.';
    STR_CHAT_FIRST_MESSAGE_HIGH = 'PRIMER MENSAJE';
    STR_CHAT_OPTIONS = 'Opciones del chat';
    STR_CHAT_HIGHLIGHT_REDEEMED = 'Resaltar los mensajes de recompensa (sólo el mensaje de fondo púrpura)';
    STR_CHAT_HIGHLIGHT_FIRST = 'Resaltar Primer Usuario en el Chat (Fondo rosa oscuro)';
    STR_CHAT_HIGHLIGHT_STREAMER = 'Resaltar los mensajes de @streamer (fondo rojo oscuro, la @ es azul)';
    STR_CHAT_HIGHLIGHT_USER = 'Resalte sus mensajes de @nombredeusuario (fondo verde oscuro, la @ es azul)';
    STR_CHAT_HIGHLIGHT_USER_SEND = 'Resalte sus mensajes enviados (fondo verde oscuro)';
    STR_CHAT_SHOW_SUB = 'Mostrar mensajes sub en el chat (fondo naranja oscuro)';
    STR_CHAT_HIGHLIGHT_BIT = 'Mostrar mensaje de bits (fondo amarillo oscuro)';
    STR_CHAT_HIGHLIGHT_ACTIONS = 'Mostrar mensajes de Acciones (normalmente son de Bots de flujo)';
    STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY =
        'Estos mensajes suelen ser iguales a los mensajes Sub, pero enviados a través de un bot de flujo, por lo que si usted tiene "Mostrar sub..." activar esto es redundante';
    STR_CHAT_INDIVIDUAL_BACKGROUND = 'Diferencia de color de fondo de los mensajes individuales';
    STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY =
        'Los modos son deshabilitar, habilitar (modo automático), brillante o más oscuro, En el modo automático si el chat está por encima de la corriente que el mensaje impar tendrá un color de acento de fondo más oscuro de la par, si el chat no está por encima (lado a lado, por ejemplo) el color será claro';
    STR_CHAT_INDIVIDUAL_LINE = 'Insertar una línea para separar los mensajes de chat individuales';
    STR_CHAT_LOGGING = 'Iniciar sesión en el chat con el usuario actual';
    STR_CHAT_LOGGING_SUMMARY =
        'La aplicación siempre iniciará sesión en el chat con el usuario actual cuando se proporcione una clave de autorización, a menos que el chat esté desactivado en los controles inferiores del reproductor, pero si esta opción está configurada en NO, evitará el inicio de sesión con el nombre de usuario actual y en su lugar, iniciará sesión como anónimo, incluso proporcionando una clave de autorización. Esto no evita que se envíe un mensaje de chat para este usuario si se agrega una clave, pero evita que se sepa si está prohibido en el chat y evita que se conozca el estado del chat ROOMSTATE';
    STR_CHAT_TIMESTAMP = 'Mostrar la marca de tiempo del mensaje';
    STR_CHAT_NICK_COLOR = 'Colores de nick legibles';
    STR_CHAT_NICK_COLOR_SUMMARY =
        'En lugar de usar el color de nick predeterminado que algunas veces no se puede leer sobre un fondo oscuro, use un color personalizado fácil de ver';
    STR_CHAT_CLEAR_MSG = 'Limpiar el chat, eliminar los mensajes del usuario';
    STR_CHAT_SHOW_BADGES = 'Mostrar insignias de usuarios (excepto las siguientes)';
    STR_CHAT_SHOW_BADGES_MOD = 'Mostrar insignias de moderadores';
    STR_CHAT_SHOW_BADGES_VIP = 'Mostrar insignias VIP';
    STR_CHAT_MESSAGE_DELETED = 'Se solicitó la eliminación de este mensaje de usuario único';
    STR_CHAT_MESSAGE_DELETED_ALL = 'Se solicitó la eliminación de todos los mensajes de este usuario';
    STR_CHAT_CLEAR_MSG_SUMMARY =
        'Borrar los mensajes de chat de un usuario específico (típicamente después de haber recibido un tiempo de espera o un baneo), los mensajes borrados siempre tendrán un fondo azul, el mensaje será borrado si esto se establece en sí, si no sólo el color de fondo cambiará';
    STR_OPEN_HOST_SETTINGS = 'Siempre abra el host en un extremo de la transmisión si está disponible';
    STR_ALWAYS_STAY = 'Permanecer siempre con el reproductor abierto después de un final en directo';
    STR_PING_WARNING = 'Mostrar "Aviso de fallo de ping a Twitch""';
    STR_PING_WARNING_SUMMARY =
        'La aplicación está constantemente comprobando la conexión con Twitch a través de un ping, si eso falla demasiado se mostrará una advertencia, si esa advertencia se muestra involuntariamente establece esto en NO';
    STR_KEY_UP_TIMEOUT = 'Tiempo de espera de la tecla (en milisegundos)';
    STR_KEY_UP_TIMEOUT_SUMMARY =
        'Cuánto tiempo hay que mantener una tecla para que ocurra una acción de retención, las acciones son refrescar una pantalla, mostrar opciones de miniaturas, etc.';
    STR_THUMB_STYLE = 'Estilo de miniatura seleccionado';
    STR_OPEN_EXTERNAL_PLAYER = 'Abrir en un reproductor externo';
    STR_CHAT_BASE_ARRAY = [
        'Abajo a la derecha',
        'Centro a la derecha',
        'Arriba a la derecha',
        'Centro arriba',
        'Arriba a la izquierda',
        'Centro a la izquierda',
        'Abajo a la izquierda',
        'Centro abajo'
    ];
    STR_CHAT_100_ARRAY = ['Derecha", "Centro", "Izquierda'];
    STR_NOTIFICATION_POS = 'Posición de la notificación en la pantalla';
    STR_NOTIFICATION_POS_ARRAY = [
        'Arriba a la derecha", "Arriba al centro", "Arriba a la izquierda", "Abajo a la izquierda", "Abajo al centro", "Abajo a la derecha'
    ];
    STR_LOWLATENCY_ARRAY = [STR_DISABLE, 'Modo normal, puede provocar re-buffers', 'El modo más bajo, puede causar aún más re-buffers'];
    STR_VOD_SEEK = 'Controles de avance/retroceso rápido de VOD';
    STR_VOD_SEEK_SUMMARY =
        'Controla la velocidad de los pasos hacia atrás/adelante, al pulsar y mantener pulsada la tecla izquierda/derecha el tiempo de paso aumentará después de que el tiempo de aumento haya pasado, aumentará hasta el tiempo de paso máximo, después de soltar la tecla y no hacer clic durante un segundo el tiempo de paso se restablecerá al tiempo de paso mínimo. <br><br>Pulsando arriba se sobreescribirá el valor mim/máximo permitiéndole pasar por todos los pasos posibles y bloqueará el valor hasta que la barra de progreso sea descartada<br><br>Haciendo clics simples sin mantener la tecla no se incrementará el tiempo<br><br>Estas opciones sólo funcionan en VODs para Clip el paso es siempre de 1 segundo';
    STR_VOD_SEEK_MIN = 'Tiempo de paso mínimo (inicial)';
    STR_VOD_SEEK_MAX = 'Tiempo máximo de paso';
    STR_VOD_SEEK_TIME = 'Aumentar el tiempo de espera después de mantener';
    STR_UP_LOCKED = 'pulse arriba para bloquear el valor del paso';
    STR_LOCKED = 'bloqueado pulse arriba para cambiar';
    STR_IN_CHAT = 'En el chat';
    STR_IN_SHARED_CHAT = 'En Chat Compartido';
    STR_SHOW_IN_CHAT = 'Mostrar el total de usuarios conectados en la parte superior del chat o de los espectadores';
    STR_SHOW_IN_CHAT_SUMMARY =
        'Esto es muy útil para saber, por ejemplo, si el chat fuera de línea tiene algún usuario con el que hablar, también permite al usuario saber la diferencia de espectador total VS usuario total del chat';
    STR_SHOW_IN_CHAT_VIEWERS = 'Mostrar a los espectadores';
    STR_SHOW_IN_CHAT_CHATTERS = 'Mostrar los chats';
    STR_HIDE_MAIN_CLOCK = 'Ocultar el reloj de la pantalla principal';
    STR_HIDE_PLAYER_CLOCK = 'Ocultar el reloj en el reproductor';
    STR_HIDE_MAIN_SCREEN_TITLE = 'Ocultar el título de la pantalla principal';
    STR_HIDE_MAIN_SCREEN_TITLE_SUMMARY = 'El título del centro, Directo, Clip, Ajustes, etc...';
    STR_HIDE_ETC_HELP_INFO = 'Ocultar los consejos de navegación en pantalla';
    STR_HIDE_ETC_HELP_INFO_SUMMARY = 'Consejos de navegación como, mantener una tecla para una acción y relacionada';
    STR_INACTIVE_SETTINGS = 'Minimizar automáticamente la aplicación cuando está inactiva';
    STR_INACTIVE_SETTINGS_SUMMARY =
        'Evita que la aplicación se ejecute cuando no se está utilizando, se mostrará una advertencia dando al usuario 15 segundos para presionar cualquier tecla para evitar la minimización';
    STR_PLAYER_INFO_VISIBILITY = 'Visibilidad del estado del reproductor';
    STR_PREVIEW_SET = 'Ajustes de la vista previa';
    STR_PREVIEW_SHOW = 'Mostrar vista previa';
    STR_PREVIEW_SIZE_CONTROLS = 'Tamaño de la vista previa';
    STR_OLED_BURN_IN = 'Protección contra quemaduras de OLED';
    STR_OLED_BURN_IN_SUMMARY =
        'Cuando esta opción está activada, la pantalla se volverá completamente negra durante 50 a 20 minutos, sólo es necesario para los dispositivos con pantallas OLED que tienen problemas de quemaduras';
    STR_MILLISECONDS = 'milisegundos';
    STR_HOUR = 'hora';
    STR_HOURS = 'horas';
    STR_RIGHT = 'Derecha';
    STR_LEFT = 'Izquierda';
    STR_TOP = 'Arriba';
    STR_AVG = 'Avg';

    STR_LOAD_ALL_LANG = 'Cambiar automáticamente el contenido al idioma "Todos"';
    STR_LOAD_ALL_LANG_SUMMARY =
        'Cambiar automáticamente al idioma "Todos" cuando el idioma actual no tiene contenido. Solo se aplica a la pantalla de "sin contenido" y a algunas pantallas específicas (Juegos y Página Principal).';
    STR_LOAD_ALL_LANG_WARNING = STR_LOAD_ALL_LANG + ' debido al contenido vacío';
}
