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
function pt_BRLang() {
    // This is a false/true var change if day comes first in your language eg (27/12/2010) day 27 month 12 year 2010
    Main_IsDayFirst = true;

    // This is the size of side pannel a adjustments may be needed here so it can fit all words in the horizontal axis
    Sidepannel_MoveldefaultMargin = 17;

    STR_KEY_UP_DOWN = 'PG para cima/para baixo';
    STR_KEY_MEDIA_FF = 'ou tecla de retrocesso de mídia ou de avanço rápido';
    STR_GUIDE_EXTRA = 'ou pressione a tecla 2';
    STR_GUIDE_EXTRA2 = 'ou tecla de mídia próxima faixa';
    STR_REFRESH = 'Atualizar';
    STR_SEARCH = 'Pesquisar';
    STR_SETTINGS = 'Configurações';
    STR_CONTROLS = 'Controles';
    STR_ABOUT = 'Sobre';
    STR_HIDE = 'Ocultar';
    STR_SEARCH_EMPTY = 'O texto que você digitou está vazio.';
    STR_SEARCH_RESULT_EMPTY = 'O resultado da pesquisa está vazio.';
    STR_SWITCH = 'Alterar de tela';
    STR_SWITCH_USER = 'Trocar tela de usuário';
    STR_SWITCH_VOD = 'Trocar: Vídeos ou Destaques';
    STR_SWITCH_CLIP = 'Trocar: Período (24h, 7d, 30d, todos)';
    STR_GO_TO = 'Vá para a tela';
    STR_USER = 'Usuário';
    STR_LIVE = 'Ao vivo';
    STR_GAMES = 'Jogos';
    STR_PLAYING = 'Jogando';
    STR_FOR = 'para';
    STR_WATCHING = 'Assistindo por ';
    STR_WAITING = 'Tempo de espera';
    STR_SINCE = 'Desde';
    STR_AGAME = 'Um Jogo';
    STR_PLACEHOLDER_SEARCH = 'Digite sua pesquisa ...';
    STR_PLACEHOLDER_OAUTH = 'Digite sua chave de autorização ...';
    STR_PLACEHOLDER_USER = 'Digite seu nome de usuário ...';
    STR_PLACEHOLDER_PRESS = 'Pressione Enter ou de seleção para,';
    STR_CHANNELS = 'Canais';
    STR_CHANNEL = 'Canal';
    STR_GOBACK_START = 'Voltar para a tela anterior: tecla de retorno';
    STR_IS_OFFLINE = 'terminou';
    STR_CHECK_HOST = ', verificando host';
    STR_IS_SUB_ONLY = 'Este vídeo é disponível apenas para subs.';
    STR_IS_SUB_ONLY_ERROR = 'é conteúdo apenas para sub.';
    STR_REFRESH_PROBLEM = 'A conexão falhou ou não há conteúdo para esse. Atualize para tentar novamente';
    STR_REFRESH_PROBLEM_ENTER = 'A conexão falhou ou não há conteúdo para esse. Pressione Enter para Atualizar';
    STR_REFRESH_PROBLEM_ENTER_LANG =
        'A conexão falhou ou não há conteúdo para este idioma. Altere o idioma do conteúdo (mantenha pressionado à tecla para esquerda) ou pressione Enter para atualizar';
    STR_NO = 'Não';
    STR_FOR_THIS = 'para este';
    STR_PLAYER_PROBLEM = 'Falha na conexão, não foi possível carregar o conteúdo do vídeo saindo de ...';
    STR_VODS = 'Vídeos';
    STR_HIGHLIGHTS = 'Destaques';
    STR_CLIPS = 'Clipes';
    STR_CONTENT = 'Conteúdo';
    STR_STREAM_ON = 'Em';
    STR_DURATION = 'Duração';
    STR_VIEW = 'Visualização';
    STR_VIEWS = 'Visualizações';
    STR_VIEWER = 'Pessoa';
    STR_VIEWERS = 'Pessoas';
    STR_EXIT_AGAIN = 'Clique novamente para sair!';
    STR_EXIT_AGAIN_PICTURE = 'Clique novamente para sair do Picture in Picture!';
    STR_EXIT_AGAIN_MULTI = 'Clique novamente para sair do MultiStream!';
    STR_EXIT_MESSAGE = 'Deseja sair do Cliente SmartTV para Twitch?';
    STR_EXIT = 'Sair';
    STR_CHANGELOG = 'Changelog';
    STR_FULL_CHANGELOG = 'Todas Alterações';
    STR_CHANGELOG_SUMMARY = 'Estas são apenas as alterações mais recentes, para ver todas use o link abaixo:';
    STR_UPDATE = 'Clique para atualizar';
    STR_UPDATE_CHECK = 'Verificar se há atualizações';
    STR_UPDATE_CHECKING = 'Verificando atualizações ...';
    STR_UPDATE_CHECKING_FAIL = 'Falha na verificação da atualização';
    STR_NO_UPDATES = 'O aplicativo está atualizado';
    //STR_UPDATE_CHANGELOG = 'Atualizar & Changelog';
    STR_UPDATE_LATEST = 'Última alteração:';
    STR_UPDATE_FAIL = 'Falha no processo de atualização, tente manualmente!';
    STR_UPDATE_FAIL_DOWNLOAD = 'O processo de atualização falhou ao baixar o APK, tente manualmente!';
    STR_UPDATE_AVAILABLE = 'Atualização Apk disponível';
    STR_WEB_UPDATE_AVAILABLE = 'Atualização Web disponível';
    STR_UPDATE_CHECK_SIDE = ', verifique no painel lateral';
    STR_UPDATE_LAST_CHECK = 'Última verificação:';
    STR_UPDATE_OPT = 'Opções de atualizações';
    STR_UPDATE_CHECK_FOR = 'Verificar atualizações em segundo plano';
    STR_UPDATE_SHOW = 'Mostrar diálogo de atualizações quando houver atualizações disponíveis';
    STR_UPDATE_SHOW_ARRAY = ['Sim', 'Apenas uma mensagem brinde', 'Não'];
    STR_UPDATE_START = 'Processo de atualização iniciado, pode demorar alguns segundos, aguarde!';
    STR_UPDATE_PLAY = 'Se a Play Store não mostrar a atualização, tente novamente após alguns minutos!';
    STR_UPDATE_ERROR = 'Você precisa do APK versão 3.0.303 ou UP para poder usá-lo, atualize do jeito antigo';
    STR_UPDATE_WARNING_OK = 'Aplicativo atualizado OK';
    STR_CLOSE = 'Fechar';
    STR_MINIMIZE = 'Minimizar';
    STR_CANCEL = 'Cancelar';
    STR_LIVE_CHANNELS = 'Canais ao vivo';
    STR_LIVE_HOSTS = 'Hosts';
    STR_LIVE_GAMES = 'Jogos ao Vivo';
    STR_USER_CHANNEL = 'Canais seguidos';
    STR_USER_MY_CHANNEL = 'Meu canal';
    STR_USER_ADD = 'Adicionar usuário';
    STR_USER_REMOVE = 'Remover usuário';
    STR_USER_ERROR = 'Usuário não existe';
    STR_USER_HOSTING = 'host';
    STR_USER_HOSTED_BY = 'host por';
    STR_USER_SET = 'já definido';
    STR_USER_MAKE_ONE = 'Mudar para';
    STR_USER_NUMBER_ONE = 'O primeiro usuário pode seguir (ao fornecer uma chave) e ver o feed dos canais ao vivo fora da tela do usuário';
    STR_ADD_USER_SH = 'Adicionar um usuário Twitch para exibir os seus Canais Seguidos aqui';
    STR_CLIP_DAY = '24h';
    STR_CLIP_WEEK = '7d';
    STR_CLIP_MONTH = '30d';
    STR_CLIP_ALL = 'todos';
    STR_JUMP_TIME = 'Salto';
    STR_JUMP_T0 = 'para';
    STR_JUMP_CANCEL = 'Salto cancelado';
    STR_JUMP_TIME_BIG = ', tempo de salto maior que duração';
    STR_SEC = 'Sec';
    STR_MIN = 'Min';
    STR_MS = 'Ms';
    STR_HR = 'Hr';
    STR_SOURCE = 'Original';
    STR_TWITCH_TV = 'Cliente SmartTV para Twitch';
    STR_CLOSE_THIS = 'Pressione Retornar ou Enter para fechar isto.';
    STR_CLOSE_THIS2 = 'Pressione Retornar para fechar isso.';
    STR_CLOSE_THIS3 = 'Pressione Retornar para mostrar a caixa de diálogo de atualização ou Enter para fechá-la.';
    STR_PLAYER = 'Relacionado ao player:';
    STR_CHAT = 'Relacionado ao chat:';
    STR_CHAT_SHOW = 'Mostrar chat';
    STR_CURRENT_VERSION = 'Versão atual instalada';
    STR_LATEST_VERSION = 'última versão disponível';
    STR_CONTROLS_MAIN_2 =
        'Reproduzir um vídeo: Navegue usando o teclado direcional (para cima/para baixo/esquerda/direita), pressione enter ou reproduzir/pausar ou visualizar as teclas de mídia da trilha ou tecla 1';
    STR_CONTROLS_MAIN_3 = 'Atualizar o conteúdo da tela:';
    STR_CONTROLS_MAIN_4 = 'Saia do aplicativo: no painel lateral, clique em sair';
    STR_CONTROLS_MAIN_5 = 'Forçar o fechamento do aplicativo: Segure a tecla Enter até forçar o fechamento automático';
    STR_CONTROLS_MAIN_6 = 'Alternar tela: tecla de retorno e depois D-Pad para cima/para baixo ou' + STR_KEY_UP_DOWN + STR_KEY_MEDIA_FF;
    STR_CONTROLS_MAIN_10 =
        'Iniciar uma pesquisa: no painel lateral clique em pesquisa, escrevendo a pesquisa pressione a tecla Enter no teclado virtual e escolha uma opção de pesquisa';
    STR_CONTROLS_MAIN_14 = 'Sobre este aplicativo: no painel lateral, clique em';
    STR_ABOUT_INFO_1 = 'Este é um cliente Twitch para Android TV, lançado gratuitamente para quem quiser usá-lo.';
    STR_ABOUT_INFO_2 =
        'Este aplicativo não tem afiliação com o Twitch, é um aplicativo feito por um usuário, mas só é possível porque o Twitch fornece todas as API que permite que o aplicativo mostre o conteúdo do Twitch.';
    STR_ABOUT_INFO_2_SOURCE = 'Esta versão do aplicativo é para teste apenas no navegador!';
    STR_ABOUT_INFO_3 = 'Informações de contato:';
    STR_ABOUT_INFO_4 = 'Este é um aplicativo de código aberto licenciado sob a GNU General Public License v3.0, verifique no GitHub';
    STR_ABOUT_INFO_6 = 'Este aplicativo usa as seguintes dependências:';
    STR_ABOUT_INFO_18 = 'Suporte para telefones e tablets:';
    STR_ABOUT_INFO_19 =
        'Sim, é possível usar este aplicativo em telefones e tablets, mas este aplicativo foi projetado para ser usado principalmente em TVs, o suporte para outros dispositivos é limitado e por isso não é liberado na play store, use o link abaixo para fazer o download APK mais recente e instale manualmente em um telefone ou tablets';

    STR_CONTROLS_PLAY_0 = 'ou nos controles da parte inferior do player';
    STR_CONTROLS_PLAY_1 =
        'Mostrar painel de informações: Pressione a tecla Enter ou D-pad se o chat e o feed do canais ao vivo não estiverem sendo exibidos';
    STR_CONTROLS_PLAY_2 = 'Fechar o vídeo: pressione a tecla de retorno duas vezes ou a tecla de mídia Parar';
    STR_CONTROLS_PLAY_3 = 'Reproduzir/pausar um vídeo: abra o painel de informações e clique no símbolo de pausa';
    STR_CONTROLS_PLAY_4 = 'Mostrar preview: D-pad para cima';
    STR_CONTROLS_PLAY_5 = 'Alterar a qualidade do vídeo: use os controles de qualidade da parte inferior do player';
    STR_CONTROLS_PLAY_6 = 'Forçar a atualização de um vídeo (caso ele congele): Altere a qualidade do vídeo para a mesma';
    STR_CONTROLS_PLAY_7 = 'Mostrar ou ocultar o Chat: D-pad para baixo ou tecla número 3' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_8 = 'Alterar posição de chat: D-pad para a esquerda, PG para cima ou retroceder (apenas VOD e clipes)' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_9 = 'Alterar tamanho do chat: D-pad para a direita ou PG para baixo' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_10 = 'Alterar brilho de fundo do chat: alterar os controles da parte inferior do player';
    STR_CONTROLS_PLAY_11 =
        'Forçar atualização do chat nas transmissões ao vivo (caso ele congele ou não carregue): use os controles da parte inferior do player para desativar o chat (clique duas vezes)';
    STR_CONTROLS_PLAY_12 =
        'Iniciar uma pesquisa: abra o painel de informações, navegue usando o teclado direcional (esquerda/direita) para " Pesquisar "e pressione Enter';
    STR_CONTROLS_PLAY_13 =
        'Todas as teclas de mídia são suportadas (reproduzir, pausar, parar, próxima faixa, avanço rápido, etc ...) algumas são usadas como atalhos para mudanças de modo de áudio e vídeo';
    STR_CONTROLS_PLAY_14 =
        'chat e vídeo (lado a lado): tecla 2 ou tecla de mídia avanço rápido, também alterna entre Picture in Picture e modo 50/50';
    STR_F_DISABLE_CHAT = 'Chat desabilitado forçado';
    STR_OAUTH_IN =
        'Adicionar uma chave permite que o aplicativo acesse o chat usando seu usuário para enviar mensagens e obter sua lista de emoticons (permite que você receba sub de presente pelo chat), seguir/parar de seguir canais e acessar algum conteúdo do usuário mais rápido <br><br>Adicionar uma chave não é obrigatorio e pode ser feito a qualquer momento mais tarde <br><br> Em caso de dúvida, leia este link: <br><br>%x<br><br> Para alguns dispositivos é necessário um mouse para concluir a ação de autorização, pois pode ser necessário clicar manualmente em um botão para confirmar. <br><br> adicionar chave para';
    STR_USER_CODE = 'Adicionar chave de autorização';
    STR_USER_CODE_OK = 'Chave adicionada OK';
    STR_KEY_BAD = 'Teste de chave falhou, uma nova precisa ser adicionado';
    STR_OAUTH_WRONG = 'Você tentou adicionar uma chave para o usuário';
    STR_OAUTH_WRONG2 = 'mas esta chave é para o usuário';
    STR_FOLLOWING = 'Seguindo';
    STR_FOLLOW = 'Não Seguindo';
    STR_IS_SUB_NOOAUTH = 'E você não adicionou uma chave de autorização, o aplicativo não pode verificar o seu status de seguidor.';
    STR_IS_SUB_NOT_SUB = 'E você não é um sub deste canal';
    STR_IS_SUB_IS_SUB = 'Você é um sub deste canal, mas alguns problemas de radônio impediram a reprodução deste canal.';
    STR_OAUTH_FAIL = 'Falha na verificação de autorização com a chave do provedor, verifique e tente novamente';
    STR_OAUTH_FAIL_USER = 'A chave adicionada não pertence a este usuário';
    STR_NOKEY = 'Nenhum usuário';
    STR_NOKEY_WARN = 'Definir usuário e uma chave de autorização para poder seguir/deixar de seguir';
    STR_FOLLOW_ISSUE = 'Aplicativos de terceiros não podem mais seguir ou parar de seguir canais (o botão pode apenas mostrar se é seguidor)';
    STR_NOKUSER_WARN = 'Adicionar um usuário primeiro';
    STR_RESET = 'Reinicie o';
    STR_CLIP = 'Clipe';
    STR_CHANNEL_CONT = 'Conteúdo do canal';
    STR_NET_DOWN = 'A rede está desconectada, o aplicativo não funciona sem INTERNET';
    STR_NET_UP = 'Conexão de rede restabelecida';
    STR_FOLLOWERS = 'Seguidores';
    STR_FOLLOWER = 'Seguidor';
    STR_CANT_FOLLOW = ', Não é possível seguir ou deixar de seguir';
    STR_GAME_CONT = 'Conteúdo do jogo';
    STR_YES = 'Sim';
    STR_REMOVE_USER = 'Tem certeza que deseja remover o usuário';
    STR_PLACEHOLDER_PRESS_UP = 'Pressione até';
    STR_FOLLOW_GAMES = 'Jogos Seguidos Ao Vivo';
    STR_USER_GAMES_CHANGE = 'Mudar entre';
    STR_GUIDE = 'Segure enter';
    STR_MONTHS = ['jan', 'fev', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    STR_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    STR_STARTED = 'Iniciou';
    STR_VIDEOS = 'Vídeos';
    STR_REPLAY = 'Repetir';
    STR_STREAM_END = 'saindo em';
    STR_STREAM_END_EXIT = 'pressione "Retornar" para sair';
    STR_CREATED_AT = 'Criado';
    STR_OPEN_BROADCAST = 'Abra o Vídeo';
    STR_OPEN_LAST_BROADCAST = 'Abra o último Vídeo';
    STR_IS_LIVE = 'Agora Ao vivo';
    STR_SHOW_ISLIVE_WARNING = 'Mostrar aviso "Streamer Agora ao vivo"';
    STR_SHOW_ISLIVE_WARNING_SUMMARY =
        'Ao assistir a um clipe ou VOD o aplicativo pode verificar quando o streamer está ao vivo, se estiver definido como SIM, um aviso aparecerá, para abrir ao vivo basta usar a opção de controles inferiores do player';
    STR_OPEN_CHAT = 'Clique para abrir o chat e/ou aguarde para voltar ao vivo';
    STR_STAY_OPEN = 'Permanecer na Live';
    STR_STAY_OPEN_SUMMARY = 'Fique ligado e verifique novamente para ver se volta ao vivo';
    STR_STAY_CHECK = 'Verificando se está ao vivo em:';
    STR_STAY_CHECKING = 'Verificando se está ao vivo ...';
    STR_STAY_CHECK_LAST = 'Último resultado:';
    STR_STAY_IS_OFFLINE = 'O stream estava offline';
    STR_NO_BROADCAST = 'Sem Vídeos';
    STR_NO_BROADCAST_WARNING = 'Não há Vídeo para este clipe';
    STR_NO_CHAT = 'E por causa disso nenhum chat';
    STR_IS_NOW = 'Esta agora';
    STR_OPEN_HOST = 'Abra o Hosting';
    STR_SETTINGS_PLAYER = 'player relacionado';
    STR_SETTINGS_BUFFER_SIZE = 'Buffer inicial:';
    STR_SETTINGS_BUFFER_SIZE_SUMMARY =
        'Quanto é necessário armazenar em buffer antes de iniciar a reprodução, isso não está relacionado ao tamanho máximo que o buffer pode atingir (o tamanho máximo do buffer é baseado no tamanho da Memória do dispositivo), um valor menor aqui fará com que a reprodução comece mais rapido e isso é sempre recomendado. Alterar este valor para um valor maior na maioria dos casos não causará nenhuma melhora, mas sim retrocessos';
    STR_SETTINGS_BUFFER_LIVE = 'Buffer inicial de streams ao vivo';
    STR_SETTINGS_BUFFER_VOD = 'Buffer inicial de Vídeos (Vídeo e destaque)';
    STR_SETTINGS_BUFFER_CLIP = 'Buffer inicial de Clipes';
    STR_SETTINGS_LANG = 'Idioma';
    STR_LOADING_CHAT = 'Chat: Conectando à';
    STR_LOADING_FAIL = 'Tempo limite de conexão, falha ao registrar ...';
    STR_CHAT_CONNECTED = 'Chat: Conectado';
    STR_CHAT_SEND_DELAY = 'Mensagem enviada, mas o atraso de chat habilitado, a mensagem será exibida no chat após';
    STR_CHAT_DELAY = 'Chat: atraso';
    STR_VOD_HISTORY_BASE = 'Reproduzir desde o início ou de onde parou de assistir';
    STR_VOD_HISTORY = STR_VOD_HISTORY_BASE + 'VOD?';
    STR_VOD_HISTORY_FORM_LIVE = STR_VOD_HISTORY_BASE + 'AO VIVO?';
    STR_FROM = 'De:' + STR_BR;
    STR_FROM_START = STR_FROM + 'Iniciar';
    STR_CHAT_END = 'chat: O chat terminou!';
    STR_RECENT = ', Mais recente';
    STR_VIWES = ', Mais visualizações';
    STR_NOKEY_VIDEO_WARN = 'Adicionar uma chave de autorização para poder ver os vídeos de seguidos';
    STR_SWITCH_TYPE = 'Trocar: Recente ou visualização';
    STR_ENABLE = 'Ativar';
    STR_ENABLED = 'Ativado';
    STR_DISABLE = 'Desativar';
    STR_DISABLED = 'Desativado';
    STR_DARK_MODE = 'Modo escuro';
    STR_BRIGHT_MODE = 'Modo claro';
    STR_RESTORE_PLAYBACK_WARN = 'O aplicativo foi fechado durante uma reprodução, restaurando a reprodução';
    STR_RESTORE_PLAYBACK = 'Restaurar reprodução';
    STR_RESTORE_PLAYBACK_SUMMARY =
        'O aplicativo salva o que estava reproduzindo no caso de fechamento acidentalmente, alterando os aplicativos por exemplo, o sistema pode ficar sem memória e forçar o fechamento, nesses casos o aplicativo irá restaurar o que estava reproduzindo na próxima inicialização';
    STR_CHAT_FONT = 'Tamanho da fonte do chat';
    STR_VIDEOS_ANIMATION = 'Miniaturas animadas de vídeos';
    STR_VIDEOS_ANIMATION_SUMMARY =
        'Quando um Vídeo ou destaque é selecionado a miniatura é animada se estiver disponível para aquele vídeo (nem todos os vídeos têm animação)';
    STR_SIDE_PANEL = 'Painel lateral: D-pad para a esquerda ou tecla de retorno';
    STR_SIZE = 'Tamanho';
    STR_BRIGHTNESS = 'Brilho';
    STR_FORBIDDEN = 'Conteúdo proibido, restrito à sua região ou a aplicativos oficiais do Twitch';
    STR_JUMPING_STEP = 'Etapa de salto';
    STR_SECOND = 'segundo';
    STR_SECONDS = 'segundos';
    STR_MINUTE = 'minuto';
    STR_MINUTES = 'minutos';
    STR_CLOCK_OFFSET = 'Clock offset';
    STR_CLOCK_OFFSET_SUMMARY = 'Ajuste o relógio do aplicativo em relação à sua escolha';
    STR_APP_LANG = 'Idioma do aplicativo';
    STR_APP_LANG_SUMMARY = 'A linguagem dos textos do aplicativo';
    STR_CONTENT_LANG = 'Idioma do conteúdo';
    STR_CONTENT_LANG_SUMMARY = 'O idioma do conteúdo das telas, ao vivo, Vídeos, clipes';
    STR_ENTER_TO_OPEN = 'Pressione Enter para abrir';
    STR_LANG_ALL = 'Todas';
    STR_NO_GAME = 'Não é possivel obter o jogo deste';
    STR_EMPTY = 'vazio';
    STR_JUMP_BUFFER_WARNING = 'Não é possível saltar durante o buffer';
    STR_CHAT_DISABLE = 'chat foi desabilitado à força, habilite-o nos controles da parte inferior do player chat desabilitado forçado';
    STR_CLIP_FAIL = 'Este clipe/vídeo falhou ao carregar. Não é possível reproduzir';
    STR_CHAT_BRIGHTNESS = 'Brilho de fundo do chat';
    STR_PLAY_NEXT = 'Iniciar o proximo';
    STR_PLAY_NEXT_IN = 'Iniciar o proximo em';
    STR_PLAY_ALL = 'Reproduzir tudo';
    STR_AUTO_PLAY_NEXT = 'Reproduzir automaticamente o próximo clipe';
    STR_SIDE_PANEL_BACK_MAIN_MENU = 'Voltar ao menu principal';
    STR_UP = 'Pressione para cima';
    STR_HOLD_UP = 'Segure pra cima';
    STR_LIVE_FEED = 'Live Feed';
    STR_VOD_DIALOG = 'Diálogo inicial de Vídeos';
    STR_VOD_DIALOG_SUMMARY =
        'Escolha o comportamento padrão, ao reproduzir um Vídeo se a sua informação estiver presente no histórico do usuário, ele pode ser reproduzido de onde você parou de assistir pela última vez, se definido como "sempre desde o início" este comportamento também será aplicado a Pré-Visualização de VOD';
    STR_VOD_DIALOG_START = 'Sempre desde o início';
    STR_VOD_DIALOG_LAST = 'Sempre desde onde parou';
    STR_VOD_DIALOG_SHOW = 'Sempre perguntar';
    STR_END_DIALOG_OPT = 'Opções diálogo de fim de reprodução';
    STR_END_DIALOG_SETTINGS = 'Tempo limite da do diálogo de fim de reprodução';
    STR_END_DIALOG_SETTINGS_SUMMARY =
        'Quando um Live/Vídeo/Clipe termina uma caixa de diálogo mostra opçôes do que fazer a seguir, defina o tempo (em segundos) que levará para a opção padrão agir';
    STR_END_DIALOG_DISABLE = 'Desativar o cronômetro';
    STR_CHAT_SIZE = 'Tamanho do chat';
    STR_CHAT_POS = 'Posição de chat';
    STR_CHAT_VIDEO_MODE = 'Modo de vídeo';
    STR_CHAT_SIDE_FULL = 'Tela inteira';
    STR_CHAT_PP_SIDE_FULL = 'Tela grande e pequena';
    STR_CHAT_SIDE = 'Lado a lado, vídeo e chat';
    STR_CHAT_5050 = '50/50 e chats';
    STR_SPEED = 'Velocidade';
    STR_QUALITY = 'Qualidade';
    STR_NORMAL = 'Normal';
    STR_AUTO = 'Auto';
    STR_VERY_LOW = 'Muito baixa';
    STR_LOW = 'Baixa';
    STR_HIGH = 'Alta';
    STR_VERY_HIGH = 'Muito alta';
    STR_THUMB_RESOLUTION = 'Qualidade das miniaturas';
    STR_THUMB_RESOLUTION_SUMMARY =
        'Resolução padrão de miniaturas para vídeos, ao vivo e jogos (não pode ser aplicado para clipes) um valor menor ajudará o aplicativo a carregar mais rápido, mas a miniatura pode parecer desfocada';
    STR_PAYPAL_SUMMARY = 'Doações Paypal use o link abaixo:';
    STR_BITCOIN_SUMMARY = 'Doações de Bitcoin use o endereço de carteira ou leia o qrcode:';
    STR_PLAYER_PROBLEM_2 = 'A conexão falhou, não foi possível carregar as informações do Vídeo';
    STR_PLAYER_RESYNC = 'Reiniciar player';
    STR_PLAYER_MULTI_ALL = 'Tudo';
    STR_QUALITY_PP = ['Pequeno', 'Grande', STR_PLAYER_MULTI_ALL];
    STR_QUALITY_MULTI = [STR_PLAYER_MULTI_ALL, 'Superior esquerdo', 'Superior direito', 'Inferior esquerdo', 'Inferior direito'];
    STR_QUALITY_MULTI_BIG = [STR_PLAYER_MULTI_ALL, 'Superior', 'Inferior esquerdo', 'Inferior centro', 'Inferior direito'];
    STR_PLAYER_BITRATE_UNLIMITED = 'Ilimitado';
    STR_PLAYER_BITRATE = 'Resolução/taxa de bits máxima de qualidade automática permitida';
    STR_PLAYER_BITRATE_SUMMARY =
        'Isso será usado para evitar lags em dispositivos lentos ao reproduzir vários vídeos ao mesmo tempo (a maioria dos dispositivos vai pular frames nessa situação, pois eles são feitos para reproduzir apenas um único vídeo), também ajuda a limitar o uso de banda da Internet, no caso de ser necessario limitar uso de banda habilite "Qualidade do player padrão" para Auto, a resolução/taxa de bits recomendada para todos os players pequenos é 720p/3 Mbps e ilimitada para o player principal ou grande para a maioria dos dispositivos de baixo custo.';
    STR_PLAYER_BITRATE_SUMMARY_ETC =
        'Valores diferentes aqui para a resolução do player principal e pequeno e/ou taxa de bits, pode causar um curto buffering/carregamento ao mudar entre o player principal no modo Picture Picture (pressionando para baixo irá alterar os players), para evitar que isto defina ambos os valores mesmo ao custo de um possível atraso, o melhor indicativo de uma taxa de bits muito alta é um acúmulo constante de quadros ignorados ou um buffer constante do fluxo.';
    STR_PLAYER_MAIN = 'player principal, para o player grande em Picture in picture ou o player de cima 50/50';
    STR_PLAYER_RES_SMALL = 'players pequeno, para o player pequeno do modo Picture in Picture e todos os players Multistream';
    STR_PLAYER_BITRATE_MAIN = 'Taxa de bits -' + STR_PLAYER_MAIN;
    STR_PLAYER_BITRATE_SMALL = 'Taxa de bits -' + STR_PLAYER_RES_SMALL;
    STR_PLAYER_RES_MAIN = 'Resolução -' + STR_PLAYER_MAIN;
    STR_PLAYER_RES_SMALL = 'Resolução -' + STR_PLAYER_RES_SMALL;
    STR_BLOCK_RES = 'Resoluções bloqueadas';
    STR_BLOCK_RES_SUMMARY =
        'Ao usar a qualidade automática é possível bloquear uma ou mais resoluções de serem usadas, isso é útil para dispositivos que atrasam a reprodução de uma resolução particular, como os clipes não podem ser reproduzidos no modo automático, isso também bloqueará a seção automática de esta resolução em um clipe.';
    STR_BLOCK_RES_SUMMARY_EXTRA =
        'O usuário pode sobrescrever a seleção manualmente durante a reprodução <br><br> XX significa que todas as resoluções que começam com aquele valor antes de XX serão impedidas de serem usadas, se a resolução for marcada como bloqueada';
    STR_BLOCKED = 'Bloqueado';
    STR_BLOCKED_NOT = 'Não bloqueado';
    STR_AUDIO_SOURCE = 'Fonte de áudio';
    STR_VOLUME_CONTROLS = 'Controles de áudio e volume';
    STR_AUDIO_ALL = 'Áudio habilitar todos';
    STR_AUDIO_ALL_ENA = 'Todas as fontes de áudio habilitadas';
    STR_AUDIO_ALL_100 = 'Volume total até 100%';
    STR_AUDIO_ALL_100_SET = 'Todo o volume do player ajustado para 100%';
    STR_VOLUME = 'Volume -';
    STR_AUDIO = 'Áudio -';
    STR_DEF_QUALITY = 'Qualidade padrão do player';
    STR_DEF_QUALITY_SUMMARY =
        'Esta opção será sempre honrada ao reproduzir um único vídeo, no modo Picture in Picture ou Multistream a reprodução precisa usar a qualidade Auto, pelo motivo é que, marque a opção de configurações "' +
        STR_PLAYER_BITRATE +
        '"';
    STR_PICTURE_PICTURE = 'Imagem sobre imagem, 50/50 ou Multistream (apenas para transmissões ao vivo):';
    STR_PICTURE_CONTROLS1 =
        'Habilitar modo Picture in Picture: Reproduzindo um vídeo, pressione para cima para mostrar o feed de preview, escolha um fluxo e segure a tecla Enter ou pressione a tecla 1 para iniciar';
    STR_PICTURE_CONTROLS2 =
        'Alterar um conteúdo de vídeo: a partir da preview do player, se estiver no modo multiplayer, clique sempre uma vez, Se em PP ou 50/50 um único clique atualizar o vídeo grande ou superior, segure a tecla Enter ou pressione a tecla 1 para atualizar o vídeo pequeno ou inferior';
    STR_PICTURE_CONTROLS4 = 'Alterar conteúdo entre vídeos (somente imagem sobre imagem): D-pad grande torna-se pequeno e vice-versa';
    STR_PICTURE_CONTROLS5 = 'Alterar a posição do vídeo pequeno (somente Picture in picture): D-pad para a esquerda';
    STR_PICTURE_CONTROLS6 = 'Alterar tamanho pequeno do vídeo (somente Picture in picture): D-pad à direita';
    STR_PICTURE_CONTROLS7 =
        'Alterar fonte de áudio: Use os controles inferiores do reprodutor Fonte de áudio, se em 50/50 ou multistream use a tecla esquerda/direita se em PP use as teclas de mídia da faixa seguinte/anterior';
    STR_PICTURE_CONTROLS3 = 'Mudar a fonte de áudio para todos os vídeos: Mantenha a tecla para baixp pressionada.';
    STR_PICTURE_CONTROLS8 =
        'Reiniciar player: use os controles inferiores do player Reiniciar player, isso só irá reiniciar todos os players, útil para sincronizar player e chat, isso não irá sincronizar o conteúdo de um player com outro';
    STR_PICTURE_CONTROLS9 =
        'Sincronizar players manualmente: É uma solução alternativa usar o controle inferior do reprodutor Velocidade para desacelerar o fluxo que está na frente ou vice-versa só funciona no modo PP';
    STR_PICTURE_CONTROLS10 = 'Qualidade de vídeo Imagem sobre Imagem: Verifique nas configurações do aplicativo "' + STR_PLAYER_BITRATE + '"';
    STR_PICTURE_CONTROLS11 = 'Fechar vídeo pequeno ou inferior (somente Picture in picture): a tecla voltar duas vezes para sair do modo PP ou 50/50';
    STR_PICTURE_CONTROLS12 =
        "Habilitar modo 50/50 (dois stream dois chats): Se Picture in Picture habilitar, pressione a tecla 2 ou a tecla de mídia para avançar ou use os controles inferiores 'Modo de Vídeo' ou se já estiver no modo 'lado a lado', mantenha a tecla enter pressionada sobre do feed de preview";
    STR_PICTURE_CONTROLS13 = 'Ativar Multistream: use os controles da parte inferior do player ou a tecla de retrocesso de mídia';
    STR_PLAYER_INFO_VISIBILITY_ARRAY = ['Quando as informações do player estão visíveis', 'Sempre visível', 'Nunca visível'];
    STR_SINGLE_EXIT = 'Pressione a tecla de retorno único';
    STR_SINGLE_EXIT_SUMMARY = 'Saia do player, Picture in Picture, modo 50/50 ou Multistream com um único clique de retorno da tecla';
    STR_NOTIFICATION_OPT = 'Opções de notificação';
    STR_NOW_LIVE_SHOW = 'Mostrar notificação "Streamer está ao vivo" para canais seguidos';
    STR_TITLE_CHANGE_SHOW = 'Mostrar notificação de "Título alterado do Streamer" para canais seguidos';
    STR_GAME_CHANGE_SHOW = 'Mostrar notificação de "Streamer mudou jogo" para canais seguidos';
    STR_NOW_LIVE_GAME_SHOW = 'Mostrar notificação de "Jogo ao vivo" para jogos seguidos';
    STR_NOW_BACKGROUND = 'Notificação sobre outros aplicativos, quando o aplicativo está em segundo plano';
    STR_NOW_BACKGROUND_SUMMARY =
        'Se você impedir a notificação para este aplicativo nas configurações do sistema, este recurso não funcionará, se as notificações do aplicativo já estiverem em execução e você sair do aplicativo, a notificação será exibida sobre outros aplicativos, mesmo se estiver desativado';
    STR_NOTIFICATION_REPEAT = 'Quantas vezes para mostrar notificação individual';
    STR_NOTIFICATION_REPEAT_SUMMARY =
        'O tempo limite de notificação individual é de cerca de 3 segundos, e não pode ser alterado porque esse tempo limite é controlado pelo sistema, mas você pode definir o número de vezes que a mesma notificação será exibida';
    STR_NOTIFICATION_SINCE = 'Impedir a exibição da notificação "Streamer está ativo " para streams que estão ativos há mais de tempo';
    STR_NOTIFICATION_SINCE_SUMMARY =
        'Isso é útil para evitar que o aplicativo mostre uma longa lista de notificações quando o aplicativo não for usado por algum tempo, por exemplo, quando você desliga o dispositivo ou a tela está desligada (o aplicativo não mostrará notificação quando o dispositivo estiver ligado mas a tela está desligada)';
    STR_GLOBAL_FONT = 'Deslocamento global do tamanho da fonte do aplicativo';
    STR_GLOBAL_FONT_SUMMARY =
        'Isso mudará o tamanho de todo o texto e da maioria dos ícones no aplicativo (menos o tamanho da fonte do chat, porque tem seu próprio controle), um valor muito pequeno pode não ser visível um valor muito grande irá estourar o suporte da caixa de texto, ou seja forma este valor é limitado, altere isso irá atualizar todas as telas';
    STR_MAIN_MENU = 'Menu Principal';
    STR_USER_MENU = 'Menu do usuário';
    STR_CH_IS_OFFLINE = 'Está offline';
    STR_ROUND_IMAGES = 'Imagens dos canais arredondadas';
    STR_ROUND_IMAGES_SUMMARY = 'Como a maioria das imagens de canais são quadrados, algumas imagens podem não parecer OK quando redondas';
    STR_SCREEN_COUNTER = 'Ocultar posição/contador total';
    STR_SCREEN_COUNTER_SUMMARY =
        'Existe um contador de posição que informa a posição atual e o conteúdo total carregado nas telas que possuem conteúdo reproduzível, conforme você carrega mais conteúdo o total será atualizado';
    STR_SWITCH_POS = 'Trocar: Deslocar posição inicial';
    STR_SWITCH_POS_SUMMARY =
        'Em vez de começar no primeiro vídeo possível, comece uma posição inferior na lista, evita ter que descer e descer para encontrar um vídeo mais antigo';
    STR_USER_OPTION = 'Escolha uma opção para o usuário';
    STR_MAIN_USER = 'Usuário principal';
    STR_USER_TOP_LABEL = 'Clique em um usuário para ver as opções';
    STR_USER_EXTRAS = 'Usuário: Mudar, adicionar, chave';
    STR_LOW_LATENCY = 'Latência Baixa';
    STR_LOW_LATENCY_SUMMARY =
        'Se começar a obter problemas de buffers, desative' +
        STR_LOW_LATENCY +
        '<br> Use' +
        STR_SETTINGS_BUFFER_LIVE +
        'igual ou menor que 1 para que tenha efeito';
    STR_GAME_SORT = 'Classificação da prévia dos jogos';
    STR_LIVE_FEED_SORT = 'Ordenar o painel lateral ou preview do player';
    STR_LIVE_FEED_SORT_SUMMARY =
        'Ordena o painel lateral e o preview do player, este se aplica apenas ao usuário ao vivo e em destaque (todos os históricos são ordenados por ultimo visto e os Vídeos é o mais recente)';
    STR_A_Z = 'Alfabético A - Z';
    STR_Z_A = 'Alfabético Z - A';
    STR_APP_ANIMATIONS = 'Ativar animações do aplicativos';
    STR_APP_ANIMATIONS_SUMMARY = 'Habilita animações no painel lateral e de rolagem';
    STR_UI_SETTINGS = 'Personalização da interface, estilo de cor, animações e afins';
    STR_GENERAL_CUSTOM = 'Personalização de conteúdo, classificação, atualização automática, tempos limite e relacionados';
    STR_RUNNINGTIME = 'Aplicativo em execução por:';
    STR_410_ERROR = 'Não foi possível obter o link do vídeo';
    STR_PRESS_ENTER_TO_CHANGE = 'Pressione enter para mudar para -';
    STR_CLICK_UNFOLLOW = '(Pressione enter para deixar de seguir)';
    STR_CLICK_FOLLOW = '(Pressione enter para seguir)';
    STR_TODAY = 'Hoje';
    STR_DROOPED_FRAMES = 'Quadros pulados :';
    STR_BUFFER_HEALT = 'Tamanho do buffer (Seg):';
    STR_NET_ACT = 'Rede atividade (Mb):';
    STR_NET_SPEED = 'Rede velocidade (Mb):';
    STR_LATENCY_TO_BROADCASTER = 'Latência para Broadcaster';
    STR_LATENCY = 'Latencia a transmissão (Sec):';
    STR_CHAT_DELAY_LATENCY_TO_BROADCASTER = 'Base em' + STR_LATENCY_TO_BROADCASTER;
    STR_PING = 'Ping Twitch (Ms):';
    STR_WARNINGS = 'Avisos';
    STR_WELCOME = 'Bem vindo ao';
    STR_WELCOME_SUMMARY =
        'Esta aplicação possui uma série de funcionalidades e foi desenvolvido para dar ao usuario total controle, por isso tem muitas opções, controles e personalizações, olhe as confiurações e os controles do aplicativo para compreender melhor como a utilizalo, em dúvida consulte o vídeo demonstrativo na Play Store, se restar qualquer dúvida use as informações de contato.';
    STR_WARNING_PHONE = 'Aviso para celulares';
    STR_WARNING_PHONE_SUMMARY =
        'Este aplicativo foi projetado para ser usado principalmente em TVs, o suporte para outro dispositivo é limitado e pode nunca receber um suporte melhor, se você não tiver um teclado ou um D-pad + tecla enter e retorno do controlador (ESC funciona para tecla de retorno em um computador) use as teclas virtuais na tela para navegar (visíveis apenas em dispositivos de telefone/tablet), nas configurações você pode alterar a posição e a opacidade do D-pad virtual, clique em qualquer lugar da tela para mostrar o direcional virtual quando está oculto, não funciona.';
    STR_DPAD_POSTION = 'Posição da tela do D-pad';
    STR_DPAD_OPACITY = 'Transparencia do D-pad';
    STR_DPAD_OPT = 'Opções do D-pad';
    STR_BLOCKED_CODEC = 'Codecs bloqueados';
    STR_BLOCKED_CODEC_SUMMARY = 'Lista as capacidades dos codecs usados ​​e permite bloquear o uso de um codec';

    STR_MAX_RES = 'Resolução máxima:';
    STR_MAX_BIT = 'Taxa de bits máxima:';
    STR_MAX_LEVEL = 'Nível máximo:';
    STR_MAX_FPS = 'Max fps por resolução:';
    STR_MAX_INSTANCES = 'Máximo de instâncias:';
    STR_UNKNOWN = 'Desconhecido';
    STR_USER_LIVE = 'Painel lateral ao vivo: do painel lateral direcional esquerdo ou de qualquer lugar, pressione 3';
    STR_PP_WORKAROUND = 'Solução alternativa modo multiplayer, PP e preview';
    STR_PP_WORKAROUND_SUMMARY =
        'Para alguns dispositivos que geralmente rodam versões antigas do Android, é necessário habilitár este para que o modo com varios players funcione corretamente. Normalmente, o problema é que o player (PP ou preview) não ficará visível, ou mesmo quando não estiver em uso fica visível como uma caixa preta sobre o player principal. Não habilite este se você não tiver problemas, pois isso resultará em qualidade de imagem inferior e possível perda de desempenho';
    STR_HISTORY = 'Histórico';
    STR_WATCHED = 'Assistido em';
    STR_UNTIL = 'até';
    STR_SORTING = 'Classificação';
    STR_DELETE_HISTORY = 'Excluir este histórico';
    STR_DELETE_UNREACHABLE = 'Apagar automaticamente conteúdo inacessível';
    STR_DELETE_UNREACHABLE_SUMMARY =
        'Se estiver definido como SIM, o aplicativo removerá automaticamente VODs e clipes que estão inacessíveis (foram excluídos pelo streamer/criador) do histórico';
    STR_NAME_A_Z = 'Nome A - Z';
    STR_NAME_Z_A = 'Nome Z - A';
    STR_GAME_A_Z = 'Jogo A - Z';
    STR_GAME_Z_A = 'Jogo Z - A';
    STR_VIWES_MOST = 'Mais Visualizaçõe';
    STR_VIWES_LOWEST = 'Menos Visualizações';
    STR_CHANNELS_MOST = 'Maior quantidade de canais';
    STR_CHANNELS_LOWEST = 'Quantidade de canais mais baixa';
    STR_NEWEST = 'Assistido mais recente';
    STR_OLDEST = 'Assistidos mais antigos';
    STR_PRESS_ENTER_D = 'Pressione enter para deletar';
    STR_LIVE_VOD = 'Esta transmissão ao vivo agora é um VOD <br> abrindo o VOD de onde você parou de assistir ao vivo: <br>';
    STR_BACKUP =
        'Permitir que o aplicativo faça e restaure backups? <br> (Os usuários e seu histórico serão backups)' +
        '<br><br>' +
        'Clique em Sim, o aplicativo salvará backups para uso futuro e restaurará um backup salvo se os dados do aplicativo estiverem vazios.' +
        'É necessário dar permissão de armazenamento ao app para isso, então dê antes clique sim.' +
        '<br><br>' +
        'Se você não der permissão de armazenamento, nenhum backup será feito.' +
        '<br><br>' +
        'A pasta Backup é Main_Storage/data/com.fgl27.twitch/Backup';
    STR_DELETE_SURE = 'Tem certeza que deseja deletar tudo';
    STR_CREATED_NEWEST = 'Criado/Desde mais recente';
    STR_CREATED_OLDEST = 'Criado/Desde mais antigo';
    STR_THUMB_OPTIONS = 'Opções de miniatura';
    STR_HISTORY_LIVE_DIS = 'Habilitar histórico ao vivo';
    STR_HISTORY_VOD_DIS = 'Habilitar histórico de Vídeos';
    STR_HISTORY_CLIP_DIS = 'Habilitar histórico de clipes';
    STR_OPEN_GAME = 'Abra o jogo';
    STR_OPEN_CHANNEL = 'Abra o canal';
    STR_THUMB_OPTIONS_KEY = 'Pressione enter acima de uma ação (para abri-la ou aplicá-la), retornar para sair sem aplicar';
    STR_DELETE_FROM_HISTORY = 'Excluir este do histórico';
    STR_CHECK_FOLLOW = 'Verificando status de seguidor...';
    STR_REFRESH_DELETE = 'Atualize a tela após excluir para ver a alteração.';
    STR_THUMB_OPTIONS_TOP = 'Segure para a esquerda para opções de miniaturas';
    STR_REPLACE_MULTI = 'Escolher qual substituir pelo de acima?';
    STR_REPLACE_MULTI_ENTER = 'Pressione Enter para substituir ou retornar para sair.';
    STR_ALREDY_PLAYING = 'Já está jogando';
    STR_STREAM_ERROR = 'Não foi possível abrir a visualização';
    STR_PP_MODO = 'Modo Picture in Picture';
    STR_4_WAY_MULTI_INSTANCES = 'Seu dispositivo suporta apenas% x instâncias de codec (reprodutor tocando) ao mesmo tempo, não pode usar';
    STR_MULTI_EMPTY = 'Finalizado e/ou vazio';
    STR_4_WAY_MULTI = 'multistream 4 vias';
    STR_CONTROLS_MULTI_0 = 'Ajuda multistream :';
    STR_CONTROLS_MULTI_1 =
        'Se você está tendo problemas de lentidão após habilitar o multistream, tente diminuir o valor de "Taxa de bits do player pequeno" nas configurações, o acúmulo de quadros pulados ou buffer constante é uma indicação de taxa de bits muito alta ou Internet lenta';
    STR_CONTROLS_MULTI_2 = 'Adicionar streams: abra o feed de preview e clique em um stream ao vivo';
    STR_CONTROLS_MULTI_3 =
        'Substituir streams: depois que o multistream estiver cheio, escolha um no feed de preview e escolha um para substituir na caixa de diálogo';
    STR_CONTROLS_MULTI_4 =
        'Alterar fonte de áudio: D-pad direita ou esquerda ou teclas de mídia próxima faixa de visualização, mantenha enter pressionado para fonte de áudio todos os vídeos';
    STR_CONTROLS_MULTI_5 = 'Sair do multistream: do controle inferior do player ou tecla de retorno duas vezes';
    STR_CONTROLS_MULTI_6 = 'Para fechar este abra as 4 transmissões ao vivo';
    STR_PICTURE_LIVE_FEED = 'Picture in picture: Segure enter, após use o D-Pad para mover, redimensionar ou mudar os vídeos';
    STR_MULTI_TITLE = ', Clique em uma miniatura para abrir ou substituir, use o direcional esquerdo/direito para mudar a fonte de áudio';
    STR_FEED_END_DIALOG = ', Pressione retorno para voltar ao menu superior';
    STR_BACK_USER_GAMES = 'Pressione a tecla de retorno para voltar a';
    STR_SHOW_LIVE_PLAYER = 'Mostrar pré-visualização nas telas das transmissões ao vivo';
    STR_SHOW_VOD_PLAYER_WARNING = 'Iniciando a reprodução de onde parou anteriormente:';
    STR_SHOW_VOD_PLAYER = 'Mostrar pré-visualização nas telas VOD';
    STR_SHOW_CLIP_PLAYER = 'Mostrar pré-visualização nas telas CLIP';
    STR_PREVIEW_CLIP_NEXT = 'Quando a visualização de um clipe termina, troca automática para o próximo clipe disponível';
    STR_SHOW_SIDE_PLAYER = 'Mostrar pré-visualização no painel lateral';
    STR_SHOW_FEED_PLAYER = 'Mostrar pré-visualização nas miniaturas de preview do player';
    STR_SHOW_FEED_PLAYER_SUMMARY = 'Se você não quiser ou seu dispositivo ficar lento quando mais de um player estiver ativo, defina como NÃO';
    STR_DISABLED_FEED_PLAYER_MULTI = 'Desativar visualização quando multistream está ativado';
    STR_DISABLED_FEED_PLAYER_MULTI_SUMMARY =
        'Por motivos de desempenho, alguns dispositivos podem ficar lentos com vários players, se estiver OK para multistream, mas quando o player de pré-visualização e multistream estão ativos ficar lento configuram este para NÃO';
    STR_PREVIEW_ERROR_LOAD = 'A pré-visualização falhou ao carregar:';
    STR_PREVIEW_ERROR_LINK = 'inacessível';
    STR_PREVIEW_VOD_DELETED = ', este Vídeo pode ter sido excluído';
    STR_PREVIEW_END = 'A pré-visualização do vídeo terminou';
    STR_PLAYER_LAG_ERRO = 'player incapaz de reproduzir devido a um problema de conexão de rede';
    STR_PLAYER_ERROR = 'player incapaz de reproduzir, devido ao erro do player';
    STR_PLAYER_ERROR_MULTI = ', tente diminuir o valor da taxa de bits do player nas configurações';
    STR_PREVIEW_SIZE = 'Tamanho da visualização do player';
    STR_PREVIEW_SIZE_SUMMARY =
        'Defina o tamanho do player de pré-visualização o pequeno reprodutor de pré-visualização exibido ao pressionar para cima quando um Live, VOD ou clipe é aberto.';
    STR_PREVIEW_SIZE_ARRAY = ['Pequeno', 'Médio', 'Grande', 'Extra grande'];
    STR_PREVIEW_SIZE_SCREEN = 'Tamanho da pré-visualização das telas';
    STR_PREVIEW_SIZE_SCREEN_SUMMARY = 'Defina o tamanho do player de pré-visualização exibido acima das telas principais do aplicativo.';
    STR_PREVIEW_VOLUME_SCREEN = 'Volume do player de pré-visualização de tela';
    STR_PREVIEW_VOLUME_SCREEN_SUMMARY = 'Definir o volume do player de pré-visualização que aparece acima das telas principais do aplicativo.';
    STR_PREVIEW_SIZE_SCREEN_ARRAY = ['Tamanho da miniatura', 'Maior'];
    STR_SIDE_PANEL_PLAYER_DELAY = 'Atraso na pré-visualização';
    STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY =
        'Defina o tempo de atraso que a pré-visualização levará para começar a carregar depois que uma miniatura for selecionada, isso ajuda com dispositivos lentos que atrasam ao rolar';
    STR_PREVIEW_VOLUME = 'Volume do player de pré-visualização';
    STR_PREVIEW_VOLUME_SUMMARY =
        'Defina o volume do player de pré-visualização (o pequeno player que é exibido ao pressionar para cima) quando um Live, VOD ou clipe esta aberto.';
    STR_PREVIEW_OTHERS_VOLUME = 'Volume dos players principais (Quando o player de pré-visualização está sendo exibida)';
    STR_PREVIEW_OTHERS_VOLUME_SUMMARY =
        'O volume do player principal (todos os players picture in picture, players multistream) pode ser menor quando o player de pré-visualização é exibido';
    STR_SIDE_PANEL_PLAYER = 'Configurações de players em miniatura';
    STR_START_AT_USER = 'Sempre inicie o aplicativo na tela do usuário';
    STR_START_AT_USER_SUMMARY =
        'Isso impedirá restaurar o ponto onde o app esava antes de ser fechado, mas permite escolher o usuário ao iniciar o aplicativo';
    STR_LAST_REFRESH = 'última atualização:';
    STR_PP_VOD_ERROR = 'Saia do PP ou Multistream para abrir este Vídeo';
    STR_SETTINGS_ACCESSIBILITY = 'Mostrar "um serviço de acessibilidade está em execução aviso"';
    STR_SETTINGS_ACCESSIBILITY_SUMMARY =
        'Se o dispositivo tiver um serviço de acessibilidade habilitado, o aplicativo mostrará um aviso, é um problema conhecido do Android que o serviço de acessibilidade pode deixar lento alguns dispositivos e causar congelamentos ou lentidão neste aplicativo.';
    STR_ACCESSIBILITY_WARN = 'Serviço (s) de acessibilidade detectado (s)';
    STR_ACCESSIBILITY_WARN_EXTRA = 'Leia mais sobre neste link:';
    STR_ACCESSIBILITY_WARN_EXTRA2 =
        'Se você tiver travamentos ou problemas relacionados a lentidão, feche este aplicativo e desabilite todos os serviços de acessibilidade depois para resolver.<br>Para não mostrar este aviso nunca mais desabilite-o nas configurações';
    STR_AUTO_REFRESH = 'Tempo limite de atualização automática';
    STR_AUTO_REFRESH_SUMMARY =
        'Quando estiver habilitado, o aplicativo irá atualizar automaticamente as telas, a atualização acontece apenas quando a tela foi usada, se você quiser uma atualização automatica habilite este';
    STR_AUTO_REFRESH_BACKGROUND = 'Atualização automática em segundo plano';
    STR_AUTO_REFRESH_BACKGROUND_SUMMARY =
        'Quando "Tempo limite de atualização automática" está definido e habilitado, a atualização automática acontecerá em segundo plano (mas com o aplicativo visível, o Android não permite a execução irrestrita em segundo plano para evitar lentdão em outro aplicativo), esteja ciente porque o aplicativo tem muitas telas quando esta opção está habilitada, a atualização automática pode causar um leve atraso aleatório em alguns dispositivos mais lentos';
    STR_MAIN_WINDOW = 'Vídeo principal';
    STR_MULTI_MAIN_WINDOW = 'Vídeo principal MultiStream';
    STR_MAIN_MULTI_BIG =
        STR_MULTI_MAIN_WINDOW + 'maior e chat: pressione a tecla para baixo, depois use esquerda/direita para mudar com é o grande vídeo';
    STR_SOURCE_CHECK = 'Alterar automaticamente a qualidade do player de Source para Auto quando o player atrasar';
    STR_SOURCE_CHECK_SUMMARY =
        'Quando esta opção está habilitada e você não está usando qualidade automática se o player estiver lento, ele mudará para qualidade automática e avisará sobre isso, um atraso do player é, por exemplo, quando o player não conseguiu reproduzir por mais de 15 segundos ( o algoritmo é mais complexo do que apenas o tempo, é claro), após essa mudança, o reprodutor voltará automaticamente à fonte quando você iniciar um novo fluxo de vod';
    STR_PLAYER_LAG = 'player está lento, qualidade alterada para "Modo automático"';
    STR_PLAYER_SOURCE = 'player está lento, qualidade diminuiu';
    STR_TOO_ERRORS = 'ou muitos erros';
    STR_STREAM_ERROR_SMALL = 'Pré-visualização, stream encerrado' + STR_TOO_ERRORS;
    STR_CONTROLS_MEDIA_FF = 'Avançar ou retroceder (apenas para VOD e Clips): use as teclas direcional direita/esquerda ou avançar/retroceder mídia';
    STR_VOD_MUTED =
        'Uma parte deste está silenciado porque contém conteúdo protegido por direitos autorais, a cor mais escura na barra de busca indica as partes';
    STR_GIFT_SUB = 'tem de presente um sub!';
    STR_ANONYMOUS = 'Anônimo';
    STR_CHAT_BANNED = 'Você está permanentemente proibido de escrever em';
    STR_CHAT_WRITE = 'Escreva no chat';
    STR_CHAT_EXTRA = 'Configurações extras de chat';
    STR_PLACEHOLDER_CHAT =
        'Quando selecionado, pressione Enter para mostrar o teclado na tela. Se você tiver um teclado físico conectado, pressione Enter ou Esc para ocultar o teclado na tela';
    STR_CHAT_ROOMSTATE = 'chat ROOMSTATE:';
    STR_CHAT_NO_RESTRICTIONS = 'Sem restrições';
    STR_OPTIONS = 'Opções';
    STR_CHAT_DELL_ALL = 'Excluir tudo';
    STR_CHAT_AT_STREAM = '@streamer';
    STR_CHAT_RESULT = 'Resultado esperado no chat:';
    STR_CHAT_SEND = 'Enviar';
    STR_CHAT_EMOTE_EMPTY = 'Esta lista de emote está vazia';
    STR_CHAT_FOLLOWER_ONLY = 'chat esta no modo apenas para seguidores e você não é um seguidor de';
    STR_CHAT_FOLLOWER_ONLY_USER_TIME = 'e você só está seguindo desde';
    STR_CHAT_EMOTE_ONLY = 'Modo somente emote de Twitch';
    STR_CHAT_CHOOSE = 'Escolha qual chat escrever ou pressione retornar para fechar';
    STR_CHAT_OPTIONS_TITLE = 'Opções de escrita no chat';
    STR_CHAT_OPTIONS_KEYBOARD = 'Auto ocultar teclado virtual';
    STR_CHAT_OPTIONS_KEYBOARD_SUMMARY =
        'Permite controlar o comportamento do teclado virtual na tela, se você tiver um teclado físico conectado use-o, se não estiver configure para nunca';
    STR_CHAT_OPTIONS_KEYBOARD_1 = 'Nunca';
    STR_CHAT_OPTIONS_KEYBOARD_2 = 'Se teclado detectado';
    STR_CHAT_OPTIONS_KEYBOARD_3 = 'Sempre';
    STR_CHAT_OPTIONS_EMOTE_SORT = 'Ordem dos emoções';
    STR_CHAT_OPTIONS_EMOTE_SORT_SUMMARY = 'Se estiver desabilitado, as listas de emotes serão mostradas conforme decebida pelo servidor';
    STR_CHAT_OPTIONS_FORCE_SHOW = 'Forçar mostrar chat';
    STR_CHAT_OPTIONS_FORCE_SHOW_SUMMARY = 'Se você deseja ver o chat quando escrever para chat for usado, habilite este';
    STR_NOKEY_CHAT_WARN = 'Adicionar uma chave de autorização do usuário para poder acessar e escrever no chat';
    STR_CHAT_NOT_READY = 'chat não está pronto para enviar! Tente novamente em um ou dois segundos.';
    STR_CHAT_REDEEMED_MESSAGE_HIGH = 'Resgate, Destacar Minha Mensagem';
    STR_CHAT_REDEEMED_MESSAGE_SUB = 'Resgate, Enviar uma Mensagem no Modo Sub-Only';
    STR_CHAT_OPTIONS = 'Opções de chat';
    STR_CHAT_HIGHLIGHT_STREAMER_MSG = 'Destacar mensagens do streamer (fundo rosa escuro)';
    STR_CHAT_HIGHLIGHT_MOD_MSG = 'Destacar mensagens de moderadores (fundo ciano escuro)';
    STR_CHAT_HIGHLIGHT_REDEEMED = 'Destacar mensagens de Resgate (somente mensagem de fundo roxo)';
    STR_CHAT_HIGHLIGHT_STREAMER = 'Destacar mensagens @streamer (fundo vermelho escuro, o @ é azul)';
    STR_CHAT_HIGHLIGHT_USER = 'Destaque suas mensagens de @username (fundo verde escuro, o @ é azul)';
    STR_CHAT_HIGHLIGHT_USER_SEND = 'Destacar suas mensagens enviadas (fundo verde escuro)';
    STR_CHAT_SHOW_SUB = 'Mostrar sub mensagens no chat (fundo laranja escuro)';
    STR_CHAT_HIGHLIGHT_BIT = 'Mensagem dos bits em destaque (fundo amarelo escuro)';
    STR_CHAT_HIGHLIGHT_ACTIONS = 'Mostrar mensagens de ações (geralmente são de Bots de fluxo)';
    STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY =
        'Estas mensagens são geralmente iguais às Sub mensagens, mas enviadas através de um stream bot, então se você tiver "Mostrar sub ..." habilite isto é redundante';
    STR_CHAT_INDIVIDUAL_BACKGROUND = 'Diferença de cor de fundo de mensagens individuais';
    STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY =
        'Os modos são desabilitar, habilitar (modo automático), claro ou mais escuro, no modo automático se o chat estiver acima do stream, a mensagem impares terão uma cor de destaque de fundo mais escura do que as pares, se o chat não estiver acima (lado a lado, por exemplo) a cor ficará clara';
    STR_CHAT_INDIVIDUAL_LINE = 'Insira uma linha para separar as mensagens de chat individuais';
    STR_CHAT_LINE_ANIMATION = 'Rolagem animada ao adicionar uma nova mensagem no chat';
    STR_CHAT_LOGGING = 'Fazendo login no chat com o usuário atual';
    STR_CHAT_LOGGING_SUMMARY =
        'O aplicativo sempre fará login no chat usando o usuário atual quando uma chave de autorização for fornecida, a menos que o chat seja desabilitado nos controles da parte inferior do player, mas se esta opção for definida como NÃO, impedirá o login usando o nome de usuário atual e, em vez disso, será registrado como anônimo , mesmo que forneça uma chave de autorização. Isso não impede o envio de mensagem de chat para este usuário se uma chave for adicionada, mas impede o app de saber se você está banido do chat e impede o status do chat ROOMSTATE';
    STR_CHAT_BOTS = 'Bloquear bots e comandos de bot (!comando) de serem exibidos no chat';
    STR_CHAT_TIMESTAMP = 'Mostrar data e hora da mensagem';
    STR_CHAT_NICK_COLOR = 'Cores de nick legíveis';
    STR_CHAT_NICK_COLOR_SUMMARY =
        'Em vez de usar a cor padrão do nick que algumas vezes não pode ser lida em um fundo escuro, use uma cor personalizada fácil de visualizar';
    STR_CHAT_CLEAR_MSG = 'Limpar chat, apagar mensagens do usuário';
    STR_CHAT_BADGES_OPTIONS = 'Opções de emblemas de usuários do chat';
    STR_CHAT_SHOW_BADGES = 'Mostrar emblemas de usuários (exceto os abaixo)';
    STR_CHAT_SHOW_BADGES_MOD = 'Mostrar emblemas de Moderador';
    STR_CHAT_SHOW_BADGES_VIP = 'Mostrar emblemas VIP';
    STR_CHAT_MESSAGE_DELETED = 'Esta unica mensagem de usuário foi solicitada para ser excluída';
    STR_CHAT_MESSAGE_DELETED_ALL = 'Todas as mensagens deste usuário foram solicitadas para serem excluídas';
    STR_CHAT_MESSAGE_DELETED_TIMEOUT = ', o tempo esgotou para';
    STR_CHAT_CLEAR_MSG_SUMMARY =
        'Excluir mensagens de chat de um usuário específico (normalmente após receberem um intervalo ou banimento), as mensagens excluídas sempre terão um fundo azul, a mensagem será excluída se este estiver definido como SIM, se NÃO apenas a cor de fundo irá mudar';
    STR_OPEN_HOST_SETTINGS = 'Sempre abra o host no final da stream, se disponível';
    STR_ALWAYS_STAY = 'Sempre fique com o player aberto após o fim do Live';
    STR_PING_WARNING = 'Mostrar "Aviso de falha de ping para Twitch"';
    STR_PING_WARNING_SUMMARY =
        'O aplicativo está constantemente verificando a conexão com o Twitch por meio de um ping, se isso falhar muitas vezes, um aviso será exibido, se esse aviso estiver encomodando, defina como NÃO';
    STR_KEY_UP_TIMEOUT = 'Tempo limite de segurar a tecla (em milissegundos)';
    STR_KEY_UP_TIMEOUT_SUMMARY =
        'Quanto tempo você precisa para segurar uma tecla para que uma ação de segurar aconteça, as ações são atualizar a tela, mostra opções de miniaturas etc.';
    STR_CURRENT_THUMB_STYLE = 'Estilo de seleção atual';
    STR_NEW_THUMB_STYLE = 'Novo estilo de seleção';
    STR_COLOR_STYLE_TEXT =
        'Use cima/baixo para selecionar uma opção, pressione retornar para sair, pressione Enter em "Aplicar alterações" para confirmar.';
    STR_SHADOWS = 'Sombras';
    STR_SHADOWS_NONE = 'Nenhum';
    STR_SHADOWS_WHITE = 'Branco';
    STR_SHADOWS_GRAY = 'Cinza';
    STR_SHADOWS_BLACK = 'Preto';
    STR_COLORS = 'Cores';
    STR_RESULT = 'Resultado';
    STR_APPLY = 'Aplicar alterações';
    STR_COLOR_TYPE = 'Tipo de cor';
    STR_STYLES = 'Estilos';
    STR_ENTER = 'Pressione enter';
    STR_COLOR_ARRAY = 'Plano de fundo, texto, borda, barra de progresso assistido';
    STR_STYLES_ARRAY = 'Padrão, Personalizado, Branco, Cinza, Vermelho, Laranja, Amarelo, Verde, Azul, Roxo, Rosa';
    STR_ENTER_RGB = STR_ENTER + 'para aceitar a mudança RGB';
    STR_THUMB_STYLE = 'Estilo de miniatura selecionado';
    STR_OPEN_EXTERNAL_PLAYER = 'Abrir em um player externo';
    STR_CHAT_SIDE_ARRAY = ['Esquerda', 'Direita'];
    STR_CHAT_BASE_ARRAY = [
        'Inferior direito',
        'Centro direito',
        'Superior direito',
        'Centro superior',
        'Superior esquerdo',
        'Centro esquerdo',
        'Inferior esquerdo',
        'Centro inferior'
    ];
    STR_CHAT_100_ARRAY = ['Direita', 'Centro', 'Esquerda'];
    STR_NOTIFICATION_POS = 'Posição de notificação na tela';
    STR_NOTIFICATION_POS_ARRAY = [
        ' Canto superior direito',
        'Centro superior',
        'Esquerda superior',
        'Esquerda inferior',
        'Centro inferior',
        'Direita inferior'
    ];
    STR_LOWLATENCY_ARRAY = [STR_DISABLE, 'Modo normal, pode causar re-buffers', 'Modo mais baixo, pode causar ainda mais re-buffers'];
    STR_LOWLATENCY_ENABLE_ARRAY = [STR_LOW_LATENCY + '-' + STR_DISABLED, STR_LOW_LATENCY + '- modo normal', STR_LOW_LATENCY + '- Modo mais baixo'];
    STR_VOD_SEEK = 'Vídeos controles de retroceder/avançar rápido';
    STR_VOD_SEEK_SUMMARY =
        'Controla os passos dos retrocesso/avanço, ao clicar e segurar para a esquerda/direita o tempo do aumen depois que do tempo limite, ele aumentará até o tempo máximo do passo, após soltar a tecla e não clicar em um segundo, o tempo de passo será redefinido para o tempo mínimo.<br><br>Pressionar pra cima irá sobrescrever o valor mim/max, permitindo que você escolha o passo<br><br> Fazer cliques únicos sem segurar a tecla não aumentará o tempo <br><br> Esta opção só funciona em vídeos para Clip o passo é sempre de 1 segundo';
    STR_VOD_SEEK_MIN = 'Tempo mínimo (inicial) de passo';
    STR_VOD_SEEK_MAX = 'Tempo máximo de passo';
    STR_VOD_SEEK_TIME = 'Aumentar o tempo limite após segurar por';
    STR_UP_LOCKED = 'pressione para cima para bloquear o valor do passo';
    STR_LOCKED = 'bloqueado pressione para cima para alterar';
    STR_IN_CHAT = 'No chat';
    STR_SHOW_IN_CHAT = 'Mostrar total de usuários no chat ou visualizações';
    STR_SHOW_IN_CHAT_SUMMARY =
        'Isso é muito útil para saber, por exemplo, se o chat offline tem algum usuário com quem conversar, também deixe o usuário saber a diferença entre o visualizações e o usuário no chat';
    STR_SHOW_IN_CHAT_VIEWERS = 'Mostrar visualizações';
    STR_SHOW_IN_CHAT_CHATTERS = 'Mostrar chatters';
    STR_PLAYED = 'Jogou';
    STR_CHAPTERS = 'Capítulos';
    STR_FROM_SIMPLE = 'de';
    STR_HIDE_MAIN_CLOCK = 'Ocultar relógio da tela principal';
    STR_HIDE_PLAYER_CLOCK = 'Ocultar relógio do player';
    STR_HIDE_MAIN_SCREEN_TITLE = 'Ocultar título da tela principal';
    STR_HIDE_MAIN_SCREEN_TITLE_SUMMARY = 'O título central, Ao vivo, Clip, Configurações etc ...';
    STR_HIDE_ETC_HELP_INFO = 'Ocultar dicas de navegação na tela';
    STR_HIDE_ETC_HELP_INFO_SUMMARY = 'Dicas de navegação como, segure uma tecla para uma ação e relacionados';
    STR_INACTIVE_SETTINGS = 'Minimizar automaticamente o aplicativo quando inativo por';
    STR_INACTIVE_SETTINGS_SUMMARY =
        'Impedir que o aplicativo fique executado quando ninguém estiver vendo, um aviso aparecerá dando ao usuário 15 segundos para pressionar qualquer tecla para evitar a minimização';
    STR_INACTIVE_WARNING =
        'O aplicativo irá minimizar automaticamente devido à inatividade em <br><br>% x <br><br> Pressione qualquer tecla para prevenir';
    STR_REMAINING = 'Restantes:';
    STR_PLAYER_INFO_VISIBILITY = 'Visibilidade do status do player';
    STR_PREVIEW_SET = 'Configurações de pré-visualização';
    STR_PREVIEW_SHOW = 'Mostrar pré-visualização';
    STR_PREVIEW_SIZE_CONTROLS = 'Tamanho da pré-visualização';
    STR_OLED_BURN_IN = 'Proteção OLED';
    STR_OLED_BURN_IN_SUMMARY =
        'Quando ativado, a tela ficará totalmente preta por 50 ms a cada 20 minutos, apenas necessário para dispositivos com telas OLED que apresentam problemas de burn-ins';
    STR_AS = 'como';
    STR_MILLISECONDS = 'milissegundos';
    STR_HOUR = 'hora';
    STR_HOURS = 'horas';
    STR_RIGHT = 'Direito';
    STR_LEFT = 'Esquerda';
    STR_BOTTOM = 'Inferior';
    STR_TOP = 'Topo';
    STR_AVG = 'Méd';
    STR_OFFSET = 'Offset';

    STR_AFFILIATE = 'Conteúdo afiliado';
    STR_AFFILIATE_SUMMARY = 'Se você não quiser ver o conteúdo de afiliado, desative esta opção.';
    STR_AFFILIATE_ABOUT =
        'Este aplicativo possui alguns links afiliados e imagens, de parceiros que possuem produtos altamente recomendados, o proprietário do aplicativo pode receber comissões por compras feitas através desses links, todos os links, imagens ou qualquer coisa relacionada ao produto são devidamente verificados e / ou usados antes de serem exibidos no aplicativo.';
    STR_AFFILIATE_ABOUT_DIS = 'O conteúdo afiliado pode ser desabilitado nas configurações.';
    STR_HISTORY_EMPTY_CONTENT = 'O histórico do aplicativo mostra o que você assistiu no aplicativo apenas, se o histórico estiver habilitada';
    STR_PREVIEW = 'a pré-visualização';

    STR_CLICK_EXIT = 'Clique aqui para sair do player';
    STR_GO_FULL = 'Tella cheia';
    STR_GO_FULL_HELP = 'Clique, pressione 9 ou F11';
    STR_NOT_SUPPORT_BROWSER = 'Isto não é suportado em um navegador';
    STR_WARNING_BROWSER = 'Aviso navegadores';
    STR_WARNING_BROWSER_SUMMARY =
        'Este aplicativo foi projetado para ser usado principalmente em TVs, o suporte para outros dispositivos é limitado. Você pode controlar o aplicativo usando um mouse, mas funciona melhor usando as teclas do teclado para cima, para baixo, esquerda, direita, enter e retornar (ESC funciona como um retornar). ';
    STR_THUMB_OPTIONS_CLICK = 'Clique duas vezes sobre uma ação (para abri-la ou aplicá-la), clique fora da caixa para sair sem aplicar';
    STR_CLOSE_THIS_BROWSER = 'Pressione voltar, entrar ou clique fora para fechar';
    STR_DISABLE_EMBED = 'Habilitar Live e Vod Twitch player';
    STR_DISABLE_EMBED_SUMMARY =
        'Isso só é necessário desativar se você quiser ver o player usado em TVs para verificar suas strings e layout por motivos de teste';
    STR_SPECIAL_FEATURE = 'Use o teclado para este recurso';
    STR_FAIL_VOD_INFO = 'Falha ao carregar a informação do Video';
    STR_NOKEY_GENERAL_WARN = ', navegue até o painel lateral (opção superior) Usuário: Mudar, adicionar, chave, pressionar enter no usuário';

    PROXY_SERVICE_STATUS = 'Habilitado e funcionando';

    STR_PROXY_DONATE_SUMMARY = 'Se você quiser saber mais sobre ou agradecer ao mantenedor do servidor proxy, use o link:';
    PROXY_SERVICE_OFF = 'Desativado nas configurações';
    PROXY_SERVICE_FAIL = 'Não funciona, falhou %x vezes';

    PROXY_SETTINGS = 'Configurações de Proxy (Proxy contra censura da Internet e afins)';
    PROXY_SETTINGS_SUMMARY =
        'Somente um proxy pode ser habilitado por vez, Permite que o servidor proxy obtenha links de streaming de um servidor diferente, que pode permitir que você veja conteúdo proibido em sua região e evita anúncios, desative isso se você tiver algum problema de transmissão com Lives como buffers longos e repetidos, travamentos ou conexão lenta que faz com que a qualidade da stream seja reduzida.';

    STR_PROXY_TIMEOUT = 'Tempo limite do proxy (tempo em segundos)';
    STR_PROXY_TIMEOUT_SUMMARY =
        'Se o servidor proxy estiver fora, este será o tempo que levará para "desistir" da conexão e retornar à implementação padrão do Twitch';

    SEEK_PREVIEW = 'Pré-Visualização avançar/retrocer';
    SEEK_PREVIEW_SUMMARY =
        'Permite controlar a imagem de pré-visualização ao avançar ou retroceder uma VOD, a vançar/retrocer não está disponível para todos as VODs.';
    SEEK_PREVIEW_SINGLE = 'Imagem única';
    SEEK_PREVIEW_CAROUSEL = 'Carrossel de imagens';

    STR_CONFIRM = 'Confirmar';

    STR_MATURE_NO_CHANGES = 'Sem alterações no conteúdo adulto devido à falta de senha';
    STR_MATURE_PROTECT = 'Proteger alterações maduras com uma senha';
    STR_MATURE_HELP_SET_PASS = 'Defina uma senha e clique em Confirmar, caso sair irá redefinir as configurações de adulto';
    STR_MATURE_HELP_CHECK_PASS = 'Digite a senha salva e clique em Confirmar, caso sair irá redefinir as configurações maduras';

    STR_MATURE_DISABLED = 'Conteúdo adulto está desabilitado';
    STR_ENABLE_MATURE = 'Conteúdo adulto';
    STR_ENABLE_MATURE_SUMMARY =
        'Quando desativado, o aplicativo bloqueará todo o conteúdo marcado como conteúdo adulto incluído conteúdo de seguidores, isto inclui todas lives marcadas como adultas e todo o conteúdo das seções de clipes e VOD';

    STR_SCREEN_OFF = 'Tela desligada (somente áudio)';

    STR_UNBLOCK_CHANNEL = 'Desbloquear canal';
    STR_UNBLOCK_GAME = 'Desbloquear jogo';
    STR_BLOCK_CHANNEL = 'Bloquear canal';
    STR_BLOCK_GAME = 'Bloquear jogo';
    STR_BLOCK_NO_USER = 'Adicione um usuário antes de poder bloquear';
    STR_BLOCK_NO_CHANNEL = 'Não é possível obter o canal para este';
    STR_BLOCK_OVERWRITE = 'Mostrar bloqueados';
    STR_BLOCK_SORT_DATE = 'Ordenado por data de bloqueio';
    STR_BLOCK_SORT_NAME = 'Ordenado por nome de A a Z';
    STR_BLOCK_EMPTY_CONTENT = 'Não há conteúdo bloqueado deste tipo';

    STR_NO_TOKEN_WARNING =
        'Sem adicionar um usuário e token de autorização, o aplicativo pode falhar ao carregar o conteúdo, esta é uma limitação da API do Twitch';
    STR_NO_TOKEN_WARNING_429 =
        'O aplicativo está falhando ao carregar o conteúdo devido a uma limitação da API do Twitch, para corrigir isso, adicione um usuário e um token de autorização.';

    STR_ADD_USER_TEXT = 'Visite %site em outro aparelho e digite o código: %code';
    STR_ADD_USER_TEXT_COUNTER = 'Verificando confirmação de acesso em %d...';
    STR_ADD_USER_TEXT_COUNTER_NOW = 'Verificando agora!';
    STR_ADD_ERROR = 'Sem acessar o serviço de adição de usuário';
    STR_USER_TOKEN_ERROR = 'Aacesso ao usuário atual perdido, revise a seção de usuários';
}
