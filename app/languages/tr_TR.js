/*
 * Copyright (c) 2017–present Felipe de Leon <fglfgl27@gmail.com>
 *
 * Bu dosya SmartTwitchTV projesinin bir parçasıdır <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV özgür bir yazılımdır: Free Software Foundation tarafından yayınlanan
 * GNU Genel Kamu Lisansı'nın 3. sürümü veya (isteğe bağlı olarak) daha sonraki
 * herhangi bir sürümünün koşulları altında yeniden dağıtabilir ve/veya değiştirebilirsiniz.
 *
 * SmartTwitchTV, yararlı olması umuduyla dağıtılmaktadır,
 * ancak HİÇBİR GARANTİ OLMAKSIZIN; hatta SATILABİLİRLİK veya BELİRLİ BİR AMACA
 * UYGUNLUK zımni garantisi bile olmadan. Daha fazla ayrıntı için
 * GNU Genel Kamu Lisansı'na bakın.
 *
 * SmartTwitchTV ile birlikte GNU Genel Kamu Lisansı'nın bir kopyasını
 * almış olmanız gerekir. Almadıysanız, bkz <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

//Sürüm oluşturucunun jshint'ten hata vermemesi için boşluk bırakılmıştır
function tr_TRLang() {
    // Bu, dilinizde günün önce gelip gelmediğini belirten bir true/false değişkenidir (örn. 27/12/2010)
    // Eğer öyleyse, bunu kopyalayıp true olarak ayarlayın, değilse kopyalamayın
    Main_IsDayFirst = true;

    // Bu, yan panelin boyutudur. Tüm kelimelerin yatay eksene sığabilmesi için burada ayarlamalar gerekebilir.
    // Eğer diliniz için ayarlama gerekiyorsa, aşağıdaki satırı kopyalayın ve sığana kadar değerini değiştirin.
    Sidepannel_MoveldefaultMargin = 14.5;

    //Aşağıdaki değişkenler çeviri içindir
    STR_KEY_UP_DOWN = 'PG yukarı/aşağı';
    STR_KEY_MEDIA_FF = 'veya medya tuşu ileri/geri sarma';
    STR_GUIDE_EXTRA = 'veya 2 tuşuna basın';
    STR_GUIDE_EXTRA2 = 'veya medya tuşu sonraki parça';
    STR_REFRESH = 'Yenile';
    STR_SEARCH = 'Ara';
    STR_SETTINGS = 'Ayarlar';
    STR_CONTROLS = 'Kontroller';
    STR_ABOUT = 'Hakkında';
    STR_HIDE = 'Gizle';
    STR_SEARCH_EMPTY = 'Boş bir arama terimi girdiniz';
    STR_SEARCH_RESULT_EMPTY = 'Arama sonucu bulunamadı';
    STR_SWITCH = 'Ekranı değiştir';
    STR_SWITCH_USER = 'Kullanıcı ekranını değiştir';
    STR_SWITCH_VOD = 'Değiştir: VODlar veya öne çıkanlar';
    STR_SWITCH_CLIP = 'Değiştir: Periyot (24s, 7g, 30g, tümü)';
    STR_GO_TO = 'Ekrana git';
    STR_USER = 'Kullanıcı';
    STR_LIVE = 'Canlı';
    STR_GAMES = 'Oyunlar';
    STR_PLAYING = 'Oynuyor';
    STR_FOR = 'için';
    STR_WATCHING = 'İzlenme süresi';
    STR_WAITING = 'Bekleme süresi';
    STR_SINCE = 'Başlangıç';
    STR_AGAME = 'Bir Oyun';
    STR_PLACEHOLDER_PASS = 'Şifrenizi girin...';
    STR_PLACEHOLDER_SEARCH = 'Aramanızı girin...';
    STR_PLACEHOLDER_OAUTH = 'Yetkilendirme anahtarınızı girin...';
    STR_PLACEHOLDER_USER = 'Kullanıcı adınızı girin ve Enter tuşuna basın...';
    STR_PLACEHOLDER_PRESS = 'Şunun için Enter veya Seç tuşuna basın,';
    STR_CHANNELS = 'Kanallar';
    STR_CHANNEL = 'Kanal';
    STR_GOBACK_START = 'Önceki ekrana dön: Geri tuşuna bas';
    STR_IS_OFFLINE = 'sona erdi';
    STR_CHECK_HOST = ', host kontrol ediliyor';
    STR_IS_SUB_ONLY = 'Bu video yalnızca abonelere açıktır';
    STR_IS_SUB_ONLY_ERROR = 'sadece abonelere özel içeriktir.';
    STR_NOKEY_GENERAL_WARN =
        ", yan panele gidin (Üst seçenek) Kullanıcı Ekle veya Kullanıcı: Değiştir, ekle, anahtar, kullanıcı üzerinde enter'a basın";
    STR_REFRESH_PROBLEM = 'Bağlantı başarısız veya içerik yok. Yenilemeyi deneyin';
    STR_REFRESH_PROBLEM_ENTER = 'Bağlanılamadı veya içerik yok. Yenilemeyi deneyin.';
    STR_REFRESH_PROBLEM_ENTER_LANG =
        "Bağlantı başarısız veya bu dil için içerik yok. İçerik dilini değiştirin (sol tuşa basılı tutun) veya Yenilemek için enter'a basın";
    STR_NO = 'Hayır';
    STR_FOR_THIS = 'bunun için';
    STR_PLAYER_PROBLEM = 'Bağlantı başarısız, video içeriği yüklenemiyor, çıkılıyor...';
    STR_VODS = 'VODlar';
    STR_HIGHLIGHTS = 'Öne Çıkanlar';
    STR_CLIPS = 'Klipler';
    STR_CONTENT = 'İçerik';
    STR_STREAM_ON = 'Yayınlandı';
    STR_DURATION = 'Süre';
    STR_VIEW = 'Görüntüleme';
    STR_VIEWS = 'Görüntüleme';
    STR_VIEWER = 'İzleyici';
    STR_VIEWERS = 'İzleyici';
    STR_EXIT_AGAIN = 'Çıkmak için tekrar tıklayın';
    STR_EXIT_AGAIN_PICTURE = 'Resim içinde resim modundan çıkmak için tekrar tıklayın';
    STR_EXIT_AGAIN_MULTI = 'Çoklu yayın modundan çıkmak için tekrar tıklayın';
    STR_EXIT_MESSAGE = 'Twitch için SmartTV İstemcisinden çıkmak istediğinizden emin misiniz?';
    STR_EXIT = 'Çıkış';
    STR_CHANGELOG = 'Değişiklik Günlüğü';
    STR_FULL_CHANGELOG = 'Tüm Değişiklik Günlüğü';
    STR_CHANGELOG_SUMMARY = 'Bunlar en son değişikliklerdir. Tam liste için aşağıdaki bağlantıyı kontrol edin:';
    STR_UPDATE = 'Güncellemek için Tıklayın';
    STR_UPDATE_CHECK = 'Güncellemeleri Kontrol Et';
    STR_UPDATE_CHECKING = 'Güncellemeler kontrol ediliyor...';
    STR_UPDATE_CHECKING_FAIL = 'Güncelleme kontrolü başarısız oldu';
    STR_NO_UPDATES = 'Uygulama güncel';
    STR_UPDATE_CHANGELOG = 'Güncellemeler & Değişiklik Günlüğü';
    STR_UPDATE_LATEST = 'Son değişiklik:';
    STR_UPDATE_FAIL = 'Güncelleme işlemi başarısız oldu, lütfen manuel olarak deneyin!';
    STR_UPDATE_FAIL_DOWNLOAD = 'Güncelleme indirilemedi. Lütfen manuel olarak deneyin';
    STR_UPDATE_AVAILABLE = 'APK Güncellemesi mevcut';
    STR_WEB_UPDATE_AVAILABLE = 'Web Güncellemesi mevcut';
    STR_UPDATE_CHECK_SIDE = ', güncellemeler için yan paneli kontrol edin';
    STR_UPDATE_LAST_CHECK = 'Son kontrol:';
    STR_UPDATE_OPT = 'Güncelleme seçenekleri';
    STR_UPDATE_CHECK_FOR = 'Arka planda güncellemeleri kontrol et';
    STR_UPDATE_SHOW = 'Güncellemeler mevcut olduğunda güncelleme penceresini göster';
    STR_UPDATE_SHOW_ARRAY = ['Evet', 'Sadece bir bildirim mesajı', 'Hayır'];
    STR_UPDATE_START = 'Güncelleme işlemi başladı. Bu birkaç saniye sürebilir, lütfen bekleyin!';
    STR_UPDATE_PLAY = 'Play Store güncellemeyi göstermiyorsa, birkaç dakika sonra tekrar deneyin!';
    STR_UPDATE_ERROR = 'Bunu kullanabilmek için APK sürüm 3.0.303 veya daha yenisine ihtiyacınız var, lütfen eski yöntemle güncelleyin!';
    STR_UPDATE_WARNING_OK = 'Uygulama başarıyla güncellendi';
    STR_CLOSE = 'Kapat';
    STR_MINIMIZE = 'Simge Durumuna Küçült';
    STR_CANCEL = 'İptal';
    STR_RERUN = 'Yeniden Çalıştır';
    STR_LIVE_CHANNELS = 'Canlı kanallar';
    STR_LIVE_HOSTS = 'Hostlar';
    STR_LIVE_GAMES = 'Canlı oyunlar';
    STR_USER_CHANNEL = 'Takip Edilen Kanallar';
    STR_USER_MY_CHANNEL = 'Kanalım';
    STR_USER_ADD = 'Kullanıcı Ekle';
    STR_USER_REMOVE = 'Kullanıcıyı Kaldır';
    STR_USER_ERROR = 'Kullanıcı mevcut değil';
    STR_USER_HOSTING = 'hostluyor';
    STR_USER_HOSTED_BY = 'hostlayan';
    STR_USER_SET = 'zaten ayarlı';
    STR_USER_MAKE_ONE = 'Şuna geç';
    STR_USER_NUMBER_ONE = 'İlk kullanıcı canlı kanal akışını görebilir ve takip edebilir/takipten çıkabilir';
    STR_ADD_USER_SH = 'Takip ettiği içerikleri burada görüntülemek için bir Twitch kullanıcısı ekleyin';
    STR_CLIP_DAY = '24s';
    STR_CLIP_WEEK = '7g';
    STR_CLIP_MONTH = '30g';
    STR_CLIP_ALL = 'tümü';
    STR_JUMP_TIME = 'Atlanıyor';
    STR_JUMP_TIME_CLICK_AGAIN = 'Atlamak için tekrar tıklayın';
    STR_JUMP_T0 = 'konumuna';
    STR_JUMP_CANCEL = 'Atlama İptal Edildi';
    STR_JUMP_TIME_BIG = ', atlama süresi toplam süreden daha büyük';
    STR_SEC = 'Sn';
    STR_MIN = 'Dk';
    STR_MS = 'Ms';
    STR_HR = 'Sa';
    STR_SOURCE = 'Kaynak';
    STR_TWITCH_TV = 'Twitch için SmartTV İstemcisi';
    STR_CLOSE_THIS = 'Kapatmak için geri veya enter tuşuna basın';
    STR_CLOSE_THIS2 = 'Kapatmak için geri tuşuna basın';
    STR_CLOSE_THIS3 = 'Güncelleme penceresini göstermek için geri tuşuna veya kapatmak için enter tuşuna basın';
    STR_PLAYER = 'Oynatıcı ile ilgili:';
    STR_CHAT = 'Sohbet ile ilgili:';
    STR_CHAT_SHOW = 'Sohbeti göster';
    STR_CURRENT_VERSION = 'Mevcut yüklü sürüm';
    STR_LATEST_VERSION = 'mevcut en son sürüm';
    STR_CONTROLS_MAIN_2 =
        'Bir video oynat: (yukarı/aşağı/sol/sağ) D-pad kullanarak gezinin, enter, oynat/duraklat, önizleme medya tuşları veya 1 tuşuna basın';
    STR_CONTROLS_MAIN_3 = 'Ekran içeriğini yenile:';
    STR_CONTROLS_MAIN_4 = 'Uygulamadan çık: Yan paneldeki çıkışa tıklayın';
    STR_CONTROLS_MAIN_5 = 'Uygulamayı kapanmaya zorla: Otomatik olarak kapanana kadar geri tuşunu basılı tutun';
    STR_CONTROLS_MAIN_6 = 'Ekranları değiştir: Geri tuşuna, ardından yukarı/aşağı D-Pad veya ' + STR_KEY_UP_DOWN + ' ' + STR_KEY_MEDIA_FF;
    STR_CONTROLS_MAIN_10 =
        "Arama başlat: Yan panelde ara'ya tıklayın, sorgunuzu yazın ve sanal klavyede enter'a basın, ardından arama seçeneklerinden birini seçin";
    STR_CONTROLS_MAIN_14 = "Bu uygulama hakkında: Yan paneldeki hakkında'ya tıklayın";
    STR_ABOUT_INFO_1 = 'Bu, kullanmak isteyen herkes için ücretsiz olarak yayınlanan bir Android TV Twitch İstemcisidir.';
    STR_ABOUT_INFO_2 =
        "Bu uygulamanın Twitch ile bir bağlantısı yoktur; bu kullanıcı tarafından yapılmış bir uygulamadır. Ancak bu, yalnızca Twitch'in, uygulamanın içeriğini göstermesine olanak tanıyan API'leri sağlaması sayesinde mümkün olmuştur.";
    STR_ABOUT_INFO_2_SOURCE = 'Uygulamanın bu sürümü yalnızca tarayıcıda test amaçlıdır!';
    STR_ABOUT_INFO_3 = 'İletişim bilgileri:';
    STR_ABOUT_INFO_4 = "Bu, GNU Genel Kamu Lisansı v3.0 altında lisanslanmış açık kaynaklı bir uygulamadır, GitHub'da göz atın:";

    STR_ABOUT_INFO_6 = 'Uygulama bağımlılıklarını görmek için bağlantıyı kullanın:';
    STR_ABOUT_INFO_18 = 'Telefon ve tablet desteği:';
    STR_ABOUT_INFO_19 =
        "Bu uygulamayı telefonlarda ve tabletlerde kullanmak mümkündür, ancak uygulama esas olarak TV'lerde kullanılmak üzere tasarlanmıştır. Diğer cihazlar için destek sınırlıdır ve bu nedenle Play Store'da yayınlanmamıştır. En son APK'yı indirmek ve uygulamayı bir telefona veya tablete manuel olarak yüklemek için aşağıdaki bağlantıyı kullanın:";

    STR_CONTROLS_PLAY_0 = 'veya oynatıcının altındaki kontrollerde';
    STR_CONTROLS_PLAY_1 = 'Bilgi panelini göster: Sohbet ve canlı kanal akışı görünmüyorsa enter veya D-pad tuşlarına basın';
    STR_CONTROLS_PLAY_2 = 'Videoyu kapat: İki kez geri tuşuna veya durdurma medya tuşuna basın';
    STR_CONTROLS_PLAY_3 = 'Bir videoyu duraklat/oynat: Bilgi panelini açın ve duraklatma simgesine tıklayın';
    STR_CONTROLS_PLAY_4 = 'Önizleme akışını göster: Yukarı D-pad';
    STR_CONTROLS_PLAY_5 = "Video kalitesini değiştir: Oynatıcının altındaki 'Kalite' seçeneğini seçin";
    STR_CONTROLS_PLAY_6 = 'Bir videoyu yenilemeye zorla (donması durumunda): Video kalitesini aynı değere değiştirin';
    STR_CONTROLS_PLAY_7 = 'Sohbeti göster veya gizle: Aşağı D-pad veya 3 tuşu ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_8 =
        'Sohbet konumunu değiştir: Sol D-pad, PG yukarı veya geri sarma tuşları (yalnızca VODlar ve klipler) ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_9 = 'Sohbet boyutunu değiştir: Sağ D-pad, PG aşağı ' + STR_CONTROLS_PLAY_0;
    STR_CONTROLS_PLAY_10 = 'Sohbet arka plan parlaklığını değiştir: Oynatıcının altındaki kontrollerden değiştirin';
    STR_CONTROLS_PLAY_11 =
        "Canlı yayında sohbeti yenilemeye zorla (donması veya yüklenmemesi durumunda): Oynatıcının altındaki 'Sohbeti zorla devre dışı bırak' seçeneğini seçin (iki kez tıklayın)";
    STR_CONTROLS_PLAY_12 = "Arama başlat: Bilgi panelini açın, Yön tuşlarını (sol/sağ) kullanarak 'Ara'ya gidin ve enter'a basın";
    STR_CONTROLS_PLAY_13 =
        'Tüm medya tuşları desteklenir (oynat, duraklat, durdur, sonraki parça, hızlı ileri vb.), bazıları ses ve video modu değişiklikleri için kısayol olarak kullanılır';
    STR_CONTROLS_PLAY_14 =
        'Sohbet ve video (yan yana): 2 tuşu veya hızlı ileri medya tuşu. Ayrıca resim içinde resim ve 50/50 modu arasında geçiş yapar';
    STR_F_DISABLE_CHAT = 'Sohbeti zorla devre dışı bırak';
    STR_OAUTH_IN =
        'Bir anahtar eklemek, uygulamanın mesaj göndermek ve ifade listenizi almak için kullanıcınızı kullanarak sohbete erişmesine olanak tanır (sohbette verilen hediye abonelikleri almanızı sağlar), kanalları takip etmenize/takibi bırakmanıza ve bazı kullanıcı içeriklerine daha hızlı erişmenize olanak tanır.<br><br>Anahtar eklemek zorunlu değildir ve daha sonra herhangi bir noktada yapılabilir.<br><br>Şüpheniz varsa bu bağlantının içeriğini okuyun:<br><br>%x<br><br>Bazı cihazlarda, belirli eylemleri onaylamak için bir düğmeye manuel olarak tıklamanız gerekebileceğinden, yetkilendirme işlemini tamamlamak için bir fare gerekebilir.<br><br>Şunun için bir anahtar ekle';
    STR_USER_CODE = 'Bir yetkilendirme anahtarı ekle';
    STR_USER_CODE_OK = 'Anahtar başarıyla eklendi';
    STR_KEY_BAD = 'Anahtar testi başarısız oldu, yenisi eklenmeli';
    STR_OAUTH_WRONG = 'Şu kullanıcı için bir anahtar eklemeye çalışıyorsunuz';
    STR_OAUTH_WRONG2 = 'ancak bu anahtar şu kullanıcıya ait';
    STR_FOLLOWING = 'Takip Ediliyor';
    STR_FOLLOW = 'Takip Edilmiyor';
    STR_IS_SUB_NOOAUTH = 've bir yetkilendirme anahtarı eklemediniz, bu yüzden uygulama abonelik durumunuzu kontrol edemiyor.';
    STR_IS_SUB_NOT_SUB = 've bu kanalın abonesi değilsiniz';
    STR_IS_SUB_IS_SUB = 'Bu kanalın bir abonesisiniz, ancak bilinmeyen bir sorun videonun oynatılmasını engelledi.';
    STR_OAUTH_FAIL = 'Sağlanan anahtarla yetkilendirme kontrolü başarısız oldu, lütfen kontrol edip tekrar deneyin';
    STR_OAUTH_FAIL_USER = 'Eklenen anahtar bu kullanıcıya ait değil';
    STR_NOKEY = 'Kullanıcı yok';
    STR_NOKEY_WARN = 'Kanalları takip etmek veya takibi bırakmak için bir kullanıcı ayarlamalısınız.';
    STR_FOLLOW_ISSUE =
        'Üçüncü taraf uygulamalar artık kanalları takip edemez veya takibi bırakamaz. Düğme yalnızca zaten bir kanalı takip ediyorsanız görünecektir.';
    STR_NOKUSER_WARN = 'Takip edilen içeriği görüntülemek için bir kullanıcı ayarlamanız gerekir.';
    STR_RESET = 'Yeniden başlat';
    STR_CLIP = 'Klip';
    STR_CHANNEL_CONT = 'Kanal içeriği';
    STR_NET_DOWN = 'Ağ bağlantısı yok. Uygulamanın çalışması için internet bağlantısı gereklidir.';
    STR_NET_UP = 'Ağ bağlantısı geri yüklendi';
    STR_FOLLOWERS = 'Takipçiler';
    STR_FOLLOWER = 'Takipçi';
    STR_CANT_FOLLOW = ', Takip edilemiyor veya takipten çıkılamıyor';
    STR_GAME_CONT = 'Oyun içeriği';
    STR_YES = 'Evet';
    STR_REMOVE_USER = 'Kullanıcıyı kaldırmak istediğinizden emin misiniz';
    STR_PLACEHOLDER_PRESS_UP = 'Şunun için Yukarı tuşuna basın';
    STR_FOLLOW_GAMES = 'Takip Edilen Canlı Oyunlar';
    STR_USER_GAMES_CHANGE = 'Arasında geçiş yap';
    STR_GUIDE = 'Enter tuşuna basılı tut';
    STR_MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    STR_DAYS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    STR_STARTED = 'Başladı';
    STR_VIDEOS = 'Videolar';
    STR_REPLAY = 'Tekrar Oynat';
    STR_STREAM_END = 'içinde çıkılıyor';
    STR_STREAM_END_EXIT = "Çıkmak için 'Geri' tuşuna basın";
    STR_FEATURED = 'Ana Sayfa';
    STR_CREATED_AT = 'Oluşturuldu';
    STR_OPEN_BROADCAST = "VOD'u Aç";
    STR_OPEN_LAST_BROADCAST = "Son VOD'u Aç";
    STR_IS_LIVE = 'Şimdi canlı yayında';
    STR_OPEN_REWIND = 'Geri sarmayı aç';
    STR_OPEN_REWIND_SUMMARY = "Tam geri sarma VOD'unu aç";
    STR_OPEN_REWIND_FAIL = 'Bu canlı yayın için geri sarma yok';
    STR_SHOW_ISLIVE_WARNING = "'Yayıncı canlı yayında' uyarısını göster";
    STR_SHOW_ISLIVE_WARNING_SUMMARY =
        'Bir klip veya VOD izlerken, uygulama yayıncının canlı yayında olup olmadığını kontrol edebilir. Etkinleştirilirse bir uyarı görünecektir. Canlı yayını izlemek için oynatıcının altındaki kontrolleri kullanın.';
    STR_OPEN_CHAT = 'Sohbeti açmak için tıklayın veya yayının canlıya dönmesini bekleyin.';
    STR_STAY_OPEN = 'Yayında kal';
    STR_STAY_OPEN_SUMMARY = 'Yayında kalın ve uygulama periyodik olarak canlı yayına dönüp dönmediğini kontrol edecektir.';
    STR_STAY_CHECK = 'Yayın canlı mı diye kontrol edilecek süre:';
    STR_STAY_CHECKING = 'Yayın canlı mı diye kontrol ediliyor ...';
    STR_STAY_CHECK_LAST = 'Son sonuç:';
    STR_STAY_IS_OFFLINE = 'Yayın çevrimdışıydı';
    STR_NO_BROADCAST = 'VOD yok';
    STR_NO_BROADCAST_WARNING = 'Bu klip için VOD bulunmuyor';
    STR_NO_CHAT = 've bu yüzden sohbet de yok';
    STR_IS_NOW = 'şimdi';
    STR_OPEN_HOST = 'Hostu Aç';
    STR_SETTINGS_PLAYER = 'Oynatıcı ile ilgili';
    STR_SETTINGS_BUFFER_SIZE = 'Başlangıç arabellek boyutu:';
    STR_SETTINGS_BUFFER_SIZE_SHORT_SUMMARY = 'Başlangıç arabellek boyutunu kontrol eder';
    STR_SETTINGS_BUFFER_SIZE_SUMMARY =
        "Oynatmaya başlamadan önce arabelleğe alınması gereken veri miktarını belirtir. Bu değer, cihazın kullanılabilir RAM'ine bağlı olan maksimum arabellek boyutuyla ilişkili değildir. Daha düşük bir ayar oynatmayı daha erken başlatır ki bu genellikle tavsiye edilir. Bu değeri artırmak performansı nadiren iyileştirir ve gecikmelere neden olabilir.";
    STR_SETTINGS_BUFFER_LIVE = 'Canlı yayınlar başlangıç arabelleği';
    STR_SETTINGS_BUFFER_VOD = 'Videolar (geçmiş yayınlar ve öne çıkanlar) başlangıç arabelleği';
    STR_SETTINGS_BUFFER_CLIP = 'Klipler başlangıç arabelleği';
    STR_SETTINGS_LANG = 'Dil';
    STR_LOADING_CHAT = 'Sohbet: Şuraya bağlanılıyor';
    STR_LOADING_FAIL = 'Bağlantı zaman aşımına uğradı, giriş yapılamadı ...';
    STR_CHAT_CONNECTED = 'Sohbet: Bağlandı';
    STR_CHAT_SEND_DELAY = 'Mesaj gönderildi. Sohbet gecikme ayarları nedeniyle kısa süre içinde sohbette görünecektir.';
    STR_CHAT_DELAY = 'Sohbet: gecikme';
    STR_VOD_HISTORY_BASE = 'Oynatmayı baştan başlatın veya en son izlemeyi bıraktığınız yerden devam edin.';
    STR_VOD_HISTORY = STR_VOD_HISTORY_BASE + " VOD'u?";
    STR_VOD_HISTORY_FORM_LIVE = STR_VOD_HISTORY_BASE + ' CANLI YAYINI?';
    STR_FROM = 'Kimden:' + STR_BR;
    STR_FROM_START = STR_FROM + 'Başlangıç';
    STR_CHAT_END = 'Sohbet: Sohbet sona erdi!';
    STR_RECENT = ', En yeni';
    STR_VIWES = ', En çok izlenenler';
    STR_NOKEY_VIDEO_WARN = 'Takip edilen videolara erişmek için bir kullanıcı ekleyin.';
    STR_SWITCH_TYPE = 'Değiştir: En yeni veya en çok izlenenler';
    STR_ENABLE = 'Etkinleştir';
    STR_ENABLED = 'Etkin';
    STR_DISABLE = 'Devre Dışı Bırak';
    STR_DISABLED = 'Devre Dışı';
    STR_DARK_MODE = 'Karanlık mod';
    STR_BRIGHT_MODE = 'Aydınlık mod';
    STR_RESTORE_PLAYBACK_WARN = 'Uygulama oynatma sırasında kapatıldı. Önceki oturum geri yükleniyor...';
    STR_RESTORE_PLAYBACK = 'Önceki Oynatmayı Geri Yükle';
    STR_RESTORE_PLAYBACK_SUMMARY =
        'Uygulama, istemeden kapatılması durumunda oynatma ilerlemesini kaydeder. Uygulamalar arasında geçiş yapmak, sistemin bellek yetersizliği nedeniyle uygulamanın kapanmasına neden olabilir. Yeniden açıldığında, önceki oynatmaya devam edecektir.';
    STR_CHAT_FONT = 'Sohbet Yazı Tipi Boyutu';
    STR_VIDEOS_ANIMATION = 'Animasyonlu Video Küçük Resimleri';
    STR_VIDEOS_ANIMATION_SUMMARY =
        'Bir VOD veya öne çıkan seçildiğinde, animasyonlu bir sürüm mevcutsa küçük resmi canlandırın (not: tüm videolarda yoktur).';
    STR_SIDE_PANEL = 'Yan panel: Sol D-pad veya geri tuşuna basın';
    STR_SIZE = 'Boyut';
    STR_BRIGHTNESS = 'Parlaklık';
    STR_FORBIDDEN = 'Bu içerik bölgenizde kısıtlanmıştır veya yalnızca resmi Twitch uygulaması aracılığıyla erişilebilir.';
    STR_JUMPING_STEP = 'Atlama adımı';
    STR_SECOND = 'saniye';
    STR_SECONDS = 'saniye';
    STR_MINUTE = 'dakika';
    STR_MINUTES = 'dakika';
    STR_CLOCK_OFFSET = 'Saat Farkı';
    STR_CLOCK_OFFSET_SUMMARY = 'Uygulamanın ana saatini tercih ettiğiniz saat farkına göre ayarlayın.';
    STR_CLOCK_AM_PM = 'Saat Stili';
    STR_CLOCK_AM_PM_SUMMARY = '24S, 12S (ÖÖ/ÖS) veya 12S olarak ayarlayın.';
    STR_CONTENT_LANG = 'İçerik Dili';
    STR_CONTENT_LANG_SUMMARY = "Ekrandaki içeriğin, canlı yayınların, VOD'ların ve kliplerin dili.";
    STR_APP_LANG = 'Uygulama Dili';
    STR_APP_LANG_SUMMARY = 'Uygulamanın metinlerinin dili.';
    STR_ENTER_TO_OPEN = "Erişmek için enter'a basın";
    STR_LANG_ALL = 'Tümü';
    STR_NO_GAME = 'Bundan oyun bilgisi alınamıyor';
    STR_EMPTY = 'Boş';
    STR_JUMP_BUFFER_WARNING = 'Arabelleğe alma sırasında atlamak mümkün değil';
    STR_CHAT_DISABLE = "Sohbet şu anda devre dışı. Oynatıcının altındaki 'Sohbeti zorla devre dışı bırak' seçeneğiyle etkinleştirebilirsiniz.";
    STR_CLIP_FAIL = 'Bu klip/video yüklenemedi. Tekrar oynatılamıyor';
    STR_CHAT_BRIGHTNESS = 'Sohbet arka plan parlaklığı';
    STR_PLAY_NEXT = 'Sıradakini Oynat';
    STR_PLAY_NEXT_IN = 'Sıradaki oynatılıyor';
    STR_PLAY_ALL = 'Tümünü Oynat';
    STR_AUTO_PLAY_NEXT = 'Sıradaki klibi otomatik oynat';
    STR_SIDE_PANEL_BACK_MAIN_MENU = 'Ana menüye geri dön';
    STR_UP = 'Yukarı tuşuna bas';
    STR_HOLD_UP = 'YUKARI tuşunu veya 2 tuşunu basılı tut';
    STR_LIVE_FEED = 'Canlı Akış';
    STR_VOD_DIALOG = 'VOD başlangıç penceresi';
    STR_VOD_DIALOG_SUMMARY =
        "Geçmişinize kaydedilen VOD'ları oynatmak için varsayılan davranışı ayarlayın. 'Her zaman baştan' seçeneğini seçmek, VOD önizlemeleri için de geçerli olacaktır.";
    STR_VOD_DIALOG_START = 'Her zaman baştan';
    STR_VOD_DIALOG_LAST = 'Her zaman son durulan yerden';
    STR_VOD_DIALOG_SHOW = 'Her zaman sor';
    STR_END_DIALOG_OPT = 'Oynatıcı bitiş penceresi seçenekleri';
    STR_END_DIALOG_SETTINGS = 'Oynatıcı bitiş penceresi zaman aşımı';
    STR_END_DIALOG_SETTINGS_SUMMARY =
        'Bir canlı yayın, VOD veya klip bittiğinde, sonra ne yapılacağına dair seçenekler içeren bir pencere görünür. Varsayılan seçeneğin eyleme geçmesi için süreyi (saniye olarak) ayarlayın.';
    STR_END_DIALOG_DISABLE = 'Zamanlayıcıyı devre dışı bırak';
    STR_CHAT_SIZE = 'Sohbet boyutu';
    STR_CHAT_POS = 'Sohbet konumu';
    STR_CHAT_VIDEO_MODE = 'Video modu';
    STR_CHAT_SIDE_FULL = 'Tam ekran';
    STR_CHAT_PP_SIDE_FULL = 'Büyük ve küçük ekran';
    STR_CHAT_SIDE = 'Yan yana, video ve sohbet';
    STR_CHAT_5050 = '50/50 ve sohbetler';
    STR_SPEED = 'Hız';
    STR_QUALITY = 'Kalite';
    STR_NORMAL = 'Normal';
    STR_AUTO = 'Otomatik';
    STR_VERY_LOW = 'Çok düşük';
    STR_LOW = 'Düşük';
    STR_HIGH = 'Yüksek';
    STR_VERY_HIGH = 'Çok yüksek';
    STR_THUMB_RESOLUTION = 'Küçük resim kalitesi';
    STR_THUMB_RESOLUTION_SUMMARY =
        'Canlı yayınlar, videolar ve oyunlar için varsayılan küçük resim çözünürlüğü (klipler için uygulanamaz). Düşük bir değer uygulamanın daha hızlı yüklenmesine yardımcı olur, ancak küçük resim bulanık görünebilir.';
    STR_PAYPAL_SUMMARY = 'Paypal bağışları için bağlantıyı veya QR kodunu kullanın:';
    STR_BITCOIN_SUMMARY = 'Bitcoin bağışları için cüzdan adresini kullanın veya QR Kodunu okutun:';
    STR_PLAYER_PROBLEM_2 = 'Bağlantı başarısız, yayın bilgisi yüklenemiyor';
    STR_PLAYER_RESYNC = 'Oynatıcıyı yeniden başlat';
    STR_PLAYER_MULTI_ALL = 'Tümü';
    STR_QUALITY_PP = ['Küçük', 'Büyük', STR_PLAYER_MULTI_ALL];
    STR_QUALITY_MULTI = [STR_PLAYER_MULTI_ALL, 'Sol üst', 'Sağ üst', 'Sol alt', 'Sağ alt'];
    STR_QUALITY_MULTI_BIG = [STR_PLAYER_MULTI_ALL, 'Üst', 'Sol alt', 'Orta alt', 'Sağ alt'];
    STR_PLAYER_BITRATE_UNLIMITED = 'Sınırsız';
    STR_PLAYER_BITRATE = 'Otomatik kalite için izin verilen maksimum Çözünürlük/Bit Hızı';
    STR_PLAYER_BITRATE_SHORT_SUMMARY = 'Otomatik kalite oynatımında kullanılan maksimum Çözünürlük/Bit Hızını ayarlamaya izin verir';
    STR_PLAYER_BITRATE_SUMMARY =
        "Bu, aynı anda birden fazla video oynatılırken düşük özellikli cihazlarda gecikmeyi önlemek için kullanılır (çoğu cihaz bu durumda kare atlayarak gecikme yaşar, çünkü yalnızca tek bir video oynatmak için yapılmıştır). Ayrıca, 'Varsayılan oynatıcı kalitesini' otomatik kaliteye ayarlayan bir sınıra ihtiyacınız olması durumunda internet bant genişliği kullanımını sınırlamaya da yardımcı olur. Çoğu düşük özellikli cihaz için tüm küçük oynatıcılarda önerilen çözünürlük/bit hızı 720p/3 Mbps ve ana veya büyük oynatıcılar için sınırsızdır.";
    STR_PLAYER_BITRATE_SUMMARY_ETC =
        'Ana ve küçük oynatıcı çözünürlüğü ve/veya bit hızı için farklı değerler, resim içinde resim modunda ana oynatıcıyla değiştirilirken kısa bir arabelleğe alma/yüklemeye neden olabilir (aşağı basmak oynatıcıları değiştirir). Bunu önlemek için, olası gecikme pahasına her iki değeri de aynı ayarlayın. Çok yüksek bir bit hızının en iyi göstergesi, sürekli olarak atlanan karelerin birikmesi veya yayının sürekli arabelleğe alınmasıdır.';
    STR_PLAYER_MAIN = 'Ana oynatıcı (resim içinde resim modundaki büyük oynatıcı veya 50/50 modundaki üst oynatıcı için)';
    STR_PLAYER_RES_SMALL = 'Küçük oynatıcılar (resim içinde resim modundaki küçük oynatıcı ve tüm çoklu yayın oynatıcıları için)';
    STR_PLAYER_BITRATE_MAIN = 'Bit Hızı - ' + STR_PLAYER_MAIN;
    STR_PLAYER_BITRATE_SMALL = 'Bit Hızı - ' + STR_PLAYER_RES_SMALL;
    STR_PLAYER_RES_MAIN = 'Çözünürlük - ' + STR_PLAYER_MAIN;
    STR_PLAYER_RES_SMALL = 'Çözünürlük - ' + STR_PLAYER_RES_SMALL;
    STR_BLOCK_RES = 'Engellenen çözünürlükler';
    STR_BLOCK_RES_SHORT_SUMMARY = 'Bir veya daha fazla çözünürlüğün kullanılmasını engellemeye izin verir';
    STR_BLOCK_RES_SUMMARY =
        'Otomatik kalite kullanırken, bir veya daha fazla çözünürlüğün kullanılmasını engellemek mümkündür. Bu, belirli bir çözünürlükte oynatırken gecikme yaşayan cihazlar için kullanışlıdır. Klipler otomatik modda oynatılamadığından, bu aynı zamanda bir klipteki bu çözünürlüğün otomatik kısmını da engelleyecektir.';
    STR_BLOCK_RES_SUMMARY_EXTRA =
        "Kullanıcı, oynatma sırasında seçimi manuel olarak geçersiz kılabilir.<br><br>XX, o çözünürlük engellenmiş olarak işaretlenirse, XX'ten önce aynı değerle başlayan tüm çözünürlüklerin kullanılmasının reddedileceği anlamına gelir.";
    STR_BLOCKED = 'Engellendi';
    STR_BLOCKED_NOT = 'Engellenmedi';
    STR_AUDIO_SOURCE = 'Ses kaynağı';
    STR_VOLUME_CONTROLS = 'Ses ve Ses Seviyesi kontrolleri';
    STR_AUDIO_ALL = 'Tüm sesleri etkinleştir';
    STR_AUDIO_ALL_ENA = 'Tüm ses kaynakları etkinleştirildi';
    STR_AUDIO_ALL_100 = 'Tüm ses seviyelerini %100 yap';
    STR_AUDIO_ALL_100_SET = 'Tüm oynatıcıların ses seviyesi %100 olarak ayarlandı';
    STR_VOLUME = 'Ses Seviyesi -';
    STR_AUDIO = 'Ses -';
    STR_DEF_QUALITY = 'Varsayılan oynatıcı kalitesi';
    STR_DEF_QUALITY_SUMMARY =
        "Bu seçenek, tek bir video oynatırken diğer tüm seçenekleri geçersiz kılacaktır. Çoklu oynatıcı modlarında, oynatımın otomatik kalite kullanması gerekir. Bunun nedeni, ayarlar seçeneği altındaki '" +
        STR_PLAYER_BITRATE +
        "' bölümünde bulunabilir.";
    STR_PICTURE_PICTURE = 'Resim içinde resim, 50/50 veya çoklu yayın (sadece canlı yayınlar için):';
    STR_PICTURE_CONTROLS1 =
        'Resim içinde resim modunu etkinleştir: Bir video oynatırken yukarı tuşuna basın. Önizleme akışını göstermek için bir yayın seçin, ardından başlatmak için enter tuşunu basılı tutun veya 1 tuşuna basın';
    STR_PICTURE_CONTROLS2 =
        'Video içeriğini değiştir: Çok oyunculu moddaysa, her zaman oynatıcı önizlemesinden tek tıklayın. Resim içinde resim veya 50/50 modundaysa, tek bir tıklama büyük veya üst videoyu günceller; enter tuşunu basılı tutmak veya 1 tuşuna basmak ise küçük veya alt videoyu günceller';
    STR_PICTURE_CONTROLS4 = 'Videolar arasında içeriği değiştir (sadece resim içinde resim): Aşağı D-pad. Büyük küçük olur ve tam tersi';
    STR_PICTURE_CONTROLS5 = 'Küçük video konumunu değiştir (sadece resim içinde resim): Sol D-pad';
    STR_PICTURE_CONTROLS6 = 'Küçük video boyutunu değiştir (sadece resim içinde resim): Sağ D-pad';
    STR_PICTURE_CONTROLS7 =
        "Ses kaynağını değiştir: Oynatıcının altındaki 'Ses kaynağı' seçeneğini seçin. 50/50 veya çoklu yayın modundaysa, sol/sağ D-pad'i kullanın. Resim içinde resim modundaysa, önceki/sonraki parça medya tuşlarını kullanın";
    STR_PICTURE_CONTROLS3 = 'Tüm videolar için ses kaynağını değiştir: Aşağı D-pad tuşunu basılı tutun.';
    STR_PICTURE_CONTROLS8 =
        "Oynatıcıyı yeniden başlat: Oynatıcının altındaki 'Oynatıcıyı yeniden başlat' seçeneğini seçin. Bu yalnızca oynatıcıları yeniden başlatır, bu da oynatıcıyı ve sohbeti senkronize etmek için kullanışlıdır. Bu, bir oynatıcının içeriğini diğeriyle senkronize etmez";
    STR_PICTURE_CONTROLS9 =
        "Oynatıcıları manuel olarak senkronize et: Çözüm, önde olan akışı yavaşlatmak için oynatıcının altındaki 'Hız' seçeneğini seçmek veya tam tersidir. Yalnızca resim içinde resim modu için çalışır";
    STR_PICTURE_CONTROLS10 = "Resim içinde resim video kalitesi: Uygulama içi '" + STR_PLAYER_BITRATE + "' ayarlarını kontrol edin";
    STR_PICTURE_CONTROLS11 =
        'Küçük veya alt videoyu kapat (sadece resim içinde resim): Geri tuşuna iki kez basmak resim içinde resim veya 50/50 modundan çıkar';
    STR_PICTURE_CONTROLS12 =
        "50/50 modunu etkinleştir (iki yayın ve iki sohbet): Resim içinde resim etkinse, 2 tuşuna, hızlı ileri medya tuşuna basın veya oynatıcının altındaki 'Video modu' seçeneğini kullanın. Eğer zaten 'Yan yana' modundaysa, önizleme akışındaki bir öğe üzerinde enter tuşunu basılı tutun";
    STR_PICTURE_CONTROLS13 = 'Çoklu yayını etkinleştir: Oynatıcının altındaki kontrolleri veya geri sarma medya tuşunu kullanın';
    STR_PLAYER_INFO_VISIBILITY_ARRAY = ['Oynatıcı bilgisi görünürken', 'Her zaman görünür', 'Asla görünmez'];
    STR_SINGLE_EXIT = 'Tek geri tuşuyla çıkış';
    STR_SINGLE_EXIT_SUMMARY = 'Tek bir geri tuşu tıklamasıyla oynatıcıdan, resim içinde resim, 50/50 veya çoklu yayın modundan çıkın.';
    STR_NOTIFICATION_OPT = 'Bildirim seçenekleri';
    STR_NOW_LIVE_SHOW = "Takip edilen kanallar için 'Yayıncı canlı yayında' bildirimini göster";
    STR_TITLE_CHANGE_SHOW = "Takip edilen kanallar için 'Yayıncı başlığı değiştirdi' bildirimini göster";
    STR_GAME_CHANGE_SHOW = "Takip edilen kanallar için 'Yayıncı oyunu değiştirdi' bildirimini göster";
    STR_NOW_LIVE_GAME_SHOW = "Takip edilen oyunlar için 'Oyun canlı yayında' bildirimini göster";
    STR_NOTIFICATION_BACKGROUND = 'Uygulama arka planda çalışırken diğer uygulamaların üzerinde bildirim göster';
    STR_NOTIFICATION_BACKGROUND_SUMMARY =
        "Bu özelliği etkinleştirmek için, uygulamanın Android Ayarları'nda Bildirim iznine sahip olduğundan emin olun. Android 11 veya daha yeni sürüm çalıştıran cihazlarda, uygulama arka planda çalışırken basit, tek satırlık bir bildirim gösterecektir.";
    STR_NOTIFICATION_BACKGROUND_WARNING = 'Android sistem Bildirim izni eksik!';
    STR_NOTIFICATION_REPEAT = 'Bireysel bir bildirimin gösterilme sayısı';
    STR_NOTIFICATION_REPEAT_SUMMARY =
        'Bireysel bildirim zaman aşımı yaklaşık 3 saniyedir ve değiştirilemez, çünkü bu zaman aşımı sistem tarafından kontrol edilir, ancak aynı bildirimin kaç kez gösterileceğini bu seçenekle ayarlayabilirsiniz.';
    STR_NOTIFICATION_SINCE = "Şu süreden daha uzun süredir canlı olan yayınlar için 'Yayıncı canlı yayında' bildirimini göstermeyi engelle:";
    STR_NOTIFICATION_SINCE_SUMMARY =
        'Bu, uygulama bir süre kullanılmadığında (örneğin cihazı kapattığınızda) veya ekran kapalıyken (cihaz açık ama ekran kapalıysa uygulama bildirim göstermez) uygulamanın uzun bir bildirim listesi göstermesini önlemek için kullanışlıdır.';
    STR_GLOBAL_FONT = 'Genel uygulama yazı tipi boyutu farkı';
    STR_GLOBAL_FONT_SUMMARY =
        'Bu, uygulamadaki tüm metinlerin ve çoğu simgenin boyutunu değiştirecektir (sohbet yazı tipi boyutu hariç, çünkü kendi kontrolü vardır). Çok küçük bir değer görünmeyebilir, çok büyük bir değer metin kutusunu taşırabilir, bu yüzden bu değer sınırlıdır. Bunu değiştirmek tüm ekranları yenileyecektir.';
    STR_MAIN_MENU = 'Ana Menü';
    STR_USER_MENU = 'Kullanıcı Menüsü';
    STR_CH_IS_OFFLINE = 'Çevrimdışı';
    STR_ROUND_IMAGES = 'Yuvarlak kanal resimleri';
    STR_ROUND_IMAGES_SUMMARY = 'Çoğu kanal resmi kare olduğundan, bazı resimler harika görünmeyebilir.';
    STR_SCREEN_COUNTER = 'Konum/Toplam sayacını gizle';
    STR_SCREEN_COUNTER_SUMMARY =
        'Oynatılabilir içeriğe sahip ekranlarda mevcut konumu ve toplam yüklenen içeriği bildiren bir konum sayacı vardır. Siz kaydırdıkça daha fazla içerik yüklenir ve toplam güncellenir.';
    STR_SWITCH_POS = 'Değiştir: Başlangıç Pozisyonu Farkı';
    STR_SWITCH_POS_SUMMARY =
        'Mümkün olan ilk videodan başlamak yerine, listede daha alt bir konumdan başlayın, böylece daha eski bir video bulmak için aşağı inmeye gerek kalmaz.';
    STR_USER_OPTION = 'Kullanıcı için bir seçenek seçin';
    STR_MAIN_USER = 'Ana Kullanıcı';
    STR_USER_TOP_LABEL = 'Seçenekleri görmek için bir kullanıcıya tıklayın';
    STR_USER_EXTRAS = 'Kullanıcı: Değiştir, ekle, anahtar';
    STR_LOW_LATENCY = 'Düşük gecikme';
    STR_LOW_LATENCY_SUMMARY =
        'Eğer arabellek sorunu yaşamaya başlarsanız, ' +
        STR_LOW_LATENCY +
        ' özelliğini devre dışı bırakın.<br>Bunun etkili olması için ' +
        STR_SETTINGS_BUFFER_LIVE +
        ' ayarını 1 veya daha düşük bir değere ayarlayın';
    STR_GAME_SORT = 'Oyun Önizleme sıralaması';
    STR_LIVE_FEED_SORT = 'Yan panel veya oynatıcı önizleme sıralaması';
    STR_LIVE_FEED_SORT_SUMMARY =
        "Yan paneldeki canlı akışı ve oynatıcı önizlemesini sıralar. Önizlemede bu sadece kullanıcının canlı yayınları ve ana sayfası için geçerlidir (geçmiş dışındaki her şey izlenme sayısına, geçmiş en son izlenene ve VOD'lar en yeniye göre sıralanır).";
    STR_A_Z = 'Alfabetik A - Z';
    STR_Z_A = 'Alfabetik Z - A';
    STR_APP_ANIMATIONS = 'Uygulama animasyonlarını etkinleştir';
    STR_APP_ANIMATIONS_SUMMARY = 'Yan panel, kaydırma ve ilgili animasyonları etkinleştirir.';
    STR_UI_SETTINGS = 'Arayüzü, renk stilini, animasyonları ve ilgili ayarları özelleştirin';
    STR_GENERAL_CUSTOM = 'İçeriği, sıralamayı, otomatik yenilemeyi, zaman aşımlarını ve ilgili ayarları özelleştirin';
    STR_RUNNINGTIME = 'Uygulamanın çalışma süresi:';
    STR_410_ERROR = 'Video bağlantısı alınamadı';
    STR_PRESS_ENTER_TO_CHANGE = "Şuna değiştirmek için enter'a basın -";
    STR_CLICK_UNFOLLOW = "(Takipten çıkmak için enter'a basın)";
    STR_CLICK_FOLLOW = "(Takip etmek için enter'a basın)";
    STR_TODAY = 'Bugün';
    STR_DROOPED_FRAMES = 'Atlanan Kareler:';
    STR_BUFFER_HEALT = 'Arabellek Boyutu (Sn):';
    STR_NET_ACT = 'Ağ Etkinliği (Mb):';
    STR_NET_SPEED = 'Ağ Hızı (Mb):';
    STR_LATENCY_TO_BROADCASTER = 'Yayıncıya Gecikme';
    STR_LATENCY = 'Yayıncıya Gecikme (Sn):';
    STR_CHAT_DELAY_LATENCY_TO_BROADCASTER = STR_LATENCY_TO_BROADCASTER + ' temel alınarak';
    STR_PING = "Twitch'e Ping (Ms):";
    STR_WARNINGS = 'Uyarılar';
    STR_WELCOME = 'Hoş geldiniz:';
    STR_WELCOME_SUMMARY =
        'Bu uygulamanın çok sayıda özelliği var. Nasıl kullanılacağını anlamak için uygulama ayarlarını ve kontrollerini inceleyin. Şüpheniz varsa, Play Store tanıtım videosunu izleyin; hala emin değilseniz iletişim bilgilerini kullanın.';
    STR_WARNING_PHONE = 'Cep telefonları uyarısı';
    STR_WARNING_PHONE_SUMMARY =
        "Bu uygulama temel olarak TV'lerde kullanılmak üzere tasarlanmıştır, diğer cihazlar için destek sınırlıdır ve daha iyi bir destek almayabilir. Bir klavyeniz veya D-pad + enter ve geri tuşu olan bir kontrolcünüz yoksa (bilgisayarda ESC geri tuşu olarak çalışır), gezinmek için ekrandaki sanal tuşları kullanın (yalnızca telefon/tablet cihazlarında görünür). Ayarlarda sanal D-pad'in konumunu ve opaklığını değiştirebilirsiniz, sanal D-pad'i göstermek için ekranın herhangi bir yerine tıklayın. Gizliyken çalışmaz.";
    STR_DPAD_POSTION = 'D-pad ekran konumu';
    STR_DPAD_OPACITY = 'D-pad opaklığı';
    STR_DPAD_OPT = 'D-pad seçenekleri';

    STR_MAX_RES = 'Maks çözünürlük:';
    STR_MAX_BIT = 'Maks bit hızı:';
    STR_MAX_LEVEL = 'Maks seviye:';
    STR_MAX_FPS = 'Çözünürlük başına maks fps:';
    STR_MAX_INSTANCES = 'Maks örnek sayısı:';
    STR_UNKNOWN = 'Bilinmiyor';
    STR_USER_LIVE = 'Kullanıcı canlı yan paneli: Yan panelden Sol D-pad veya herhangi bir yerden 3 tuşu';
    STR_PP_WORKAROUND = 'Çoklu oyuncu, RİR ve önizleme modu geçici çözümü';
    STR_PP_WORKAROUND_SUMMARY =
        'Bazı cihazlarda, çoklu oyuncu modunun düzgün çalışması için bunu etkinleştirmek gerekir. Sorun genellikle iki oynatıcıdan birinin siyah ekran olmasıdır. Sorun yaşamıyorsanız etkinleştirmeyin, çünkü bu daha düşük görüntü kalitesine ve zayıf performansa neden olur.';
    STR_HISTORY = 'Geçmiş';
    STR_WATCHED = 'İzlenme tarihi';
    STR_UNTIL = 'kadar';
    STR_SORTING = 'Sıralama';
    STR_DELETE_HISTORY = 'Bu geçmişi sil';
    STR_DELETE_UNREACHABLE = 'Erişilemeyen içeriği otomatik olarak sil';
    STR_DELETE_UNREACHABLE_SUMMARY =
        "Bu EVET olarak ayarlanırsa, uygulama erişilemeyen (yayıncı/içerik oluşturucu tarafından silinmiş) VOD'ları ve klipleri geçmişten otomatik olarak kaldırır";
    STR_NAME_A_Z = 'İsim A - Z';
    STR_NAME_Z_A = 'İsim Z - A';
    STR_GAME_A_Z = 'Oyun A - Z';
    STR_GAME_Z_A = 'Oyun Z - A';
    STR_VIWES_MOST = 'En çok izlenenler';
    STR_VIWES_LOWEST = 'En az izlenenler';
    STR_CHANNELS_MOST = 'En yüksek kanal miktarı';
    STR_CHANNELS_LOWEST = 'En düşük kanal miktarı';
    STR_NEWEST = 'En son izlenen';
    STR_OLDEST = 'En eski izlenen';
    STR_PRESS_ENTER_D = "Silmek için enter'a basın";
    STR_LIVE_VOD = 'Bu canlı yayın artık bir VOD<br>VOD, canlı yayını en son izlemeyi bıraktığınız yerden açılıyor:<br>';

    STR_DELETE_SURE = 'Tümünü silmek istediğinizden emin misiniz';
    STR_CREATED_NEWEST = 'Oluşturma / Çalışma süresi en yeni';
    STR_CREATED_OLDEST = 'Oluşturma / Çalışma süresi en eski';
    STR_THUMB_OPTIONS = 'Küçük Resim Seçenekleri';
    STR_HISTORY_LIVE_DIS = 'Canlı yayın geçmişini etkinleştir';
    STR_HISTORY_VOD_DIS = 'VOD geçmişini etkinleştir';
    STR_HISTORY_CLIP_DIS = 'Klip geçmişini etkinleştir';
    STR_OPEN_GAME = 'Oyunu aç';
    STR_OPEN_CHANNEL = 'Kanalı aç';
    STR_THUMB_OPTIONS_KEY = "Bir eylemin üzerinde enter'a basın (açmak veya uygulamak için), uygulamadan çıkmak için geri tuşuna basın";
    STR_DELETE_FROM_HISTORY = 'Bunu geçmişten sil';
    STR_CHECK_FOLLOW = 'Takip durumu kontrol ediliyor ...';
    STR_REFRESH_DELETE = 'Değişikliği görmek için sildikten sonra ekranı yenileyin.';
    STR_THUMB_OPTIONS_TOP = 'Küçük resim seçenekleri için solu basılı tutun';
    STR_REPLACE_MULTI = 'Yukarıdaki ile değiştirmek için hangisini seçersiniz?';
    STR_REPLACE_MULTI_ENTER = "Değiştirmek için enter'a basın veya çıkmak için geri tuşuna basın.";
    STR_ALREDY_PLAYING = 'Bu zaten oynatılıyor';
    STR_STREAM_ERROR = 'Önizleme açılamadı';
    STR_PP_MODO = 'Resim içinde resim modu';
    STR_4_WAY_MULTI_INSTANCES = 'Cihazınız aynı anda sadece %x codec örneği (oynatıcı) destekliyor, kullanılamıyor';
    STR_MULTI_EMPTY = 'Bitti ve/veya boş';
    STR_4_WAY_MULTI = "4'lü çoklu yayın";
    STR_CONTROLS_MULTI_0 = 'Çoklu yayın yardımı:';
    STR_CONTROLS_MULTI_1 =
        "Çoklu yayını etkinleştirdikten sonra gecikme sorunları yaşıyorsanız, ayarlarda 'Küçük oynatıcı bit hızı' değerini düşürmeyi deneyin; atlanan karelerin birikmesi veya sürekli arabelleğe alma, çok yüksek bit hızının veya çok yavaş internetin bir göstergesidir";
    STR_CONTROLS_MULTI_2 = 'Yayın ekle: önizleme akışını yukarı tuşuyla açın ve bir canlı yayına tıklayın';
    STR_CONTROLS_MULTI_3 =
        'Yayınları değiştir: çoklu yayın dolduktan sonra, önizleme akışından birini seçin ve iletişim kutusundan değiştirmek için birini seçin';
    STR_CONTROLS_MULTI_4 =
        'Ses kaynağını değiştir: D-pad sağ veya sol veya medya tuşları sonraki/önceki parça, tüm videoların ses kaynağı için aşağı tuşunu basılı tutun';
    STR_CONTROLS_MULTI_5 = 'Çoklu yayından çık: İki kez geri tuşuna basın veya oynatıcının altındaki seçenekten çıkın.';
    STR_CONTROLS_MULTI_6 = 'Bunu kapatmak için 4 canlı yayın açın';
    STR_PICTURE_LIVE_FEED =
        "Resim içinde resim: Enter'ı basılı tutun veya 1 tuşuna basın, ardından taşımak için D-Pad sol, yeniden boyutlandırmak için sağ veya videoları değiştirmek için aşağı tuşunu kullanın";
    STR_MULTI_TITLE = ', Bir yayını açmak veya değiştirmek için bir küçük resme tıklayın, ses kaynağını değiştirmek için D-pad sol/sağ kullanın';
    STR_FEED_END_DIALOG = ', Üst menüye geri dönmek için geri tuşuna basın';
    STR_BACK_USER_GAMES = 'Geri dönmek için geri tuşuna basın:';
    STR_SHOW_LIVE_PLAYER = 'Canlı ekranlarda önizlemeyi göster';
    STR_SHOW_VOD_PLAYER_WARNING = 'Oynatma en son durduğu yerden başlıyor:';
    STR_SHOW_VOD_PLAYER = 'VOD ekranlarında önizlemeyi göster';
    STR_SHOW_CLIP_PLAYER = 'Klip ekranlarında önizlemeyi göster';
    STR_PREVIEW_CLIP_NEXT = 'Bir klip önizlemesi bittiğinde, otomatik olarak bir sonraki mevcut klibe geçin.';
    STR_SHOW_SIDE_PLAYER = 'Yan panelde önizlemeyi göster';
    STR_SHOW_FEED_PLAYER = 'Oynatıcı önizleme küçük resimlerinde önizlemeyi göster';
    STR_SHOW_FEED_PLAYER_SUMMARY = 'İstemiyorsanız veya birden fazla oynatıcı etkin olduğunda cihazınız gecikiyorsa, bunu HAYIR olarak ayarlayın.';
    STR_DISABLED_FEED_PLAYER_MULTI = 'Çoklu yayın etkinken önizlemeyi devre dışı bırak';
    STR_DISABLED_FEED_PLAYER_MULTI_SUMMARY =
        'Performans nedenleriyle, bazı cihazlar birden fazla oynatıcıyla gecikebilir. Cihazınız çoklu yayın için uygunsa ancak önizleme oynatıcı ve bir çoklu yayın etkin olduğunda gecikiyorsa, bu seçeneği HAYIR olarak ayarlayın.';
    STR_PREVIEW_ERROR_LOAD = 'Önizleme yüklenemedi:';
    STR_PREVIEW_ERROR_LINK = 'ulaşılamıyor';
    STR_PREVIEW_VOD_DELETED = ', bu VOD silinmiş olabilir';
    STR_PREVIEW_END = 'Önizleme videosu sona erdi';
    STR_PLAYER_LAG_ERRO = 'Ağ bağlantısı sorunu nedeniyle oynatıcı oynatılamıyor';
    STR_PLAYER_ERROR = 'Oynatıcı hatası nedeniyle oynatılamıyor';
    STR_PLAYER_ERROR_MULTI = ', ayarlarda küçük oynatıcı bit hızı değerini düşürmeyi deneyin';
    STR_PREVIEW_SIZE = 'Oynatıcı önizleme boyutu';
    STR_PREVIEW_SIZE_SUMMARY = 'Bir Canlı, VOD veya klip açıkken yukarı basıldığında gösterilen küçük önizleme oynatıcısının boyutunu ayarlayın.';
    STR_PREVIEW_SIZE_ARRAY = ['Küçük', 'Orta', 'Büyük', 'Ekstra Büyük'];
    STR_PREVIEW_SIZE_SCREEN = 'Ekran önizleme boyutu';
    STR_PREVIEW_SIZE_SCREEN_SUMMARY = 'Ana uygulama ekranlarının üzerinde gösterilen önizleme oynatıcısının boyutunu ayarlayın.';
    STR_PREVIEW_VOLUME_SCREEN = 'Ekran önizleme ses seviyesi';
    STR_PREVIEW_VOLUME_SCREEN_SUMMARY =
        'Ana uygulama ekranlarının ve yan panelin üzerinde gösterilen önizleme oynatıcısının ses seviyesini ayarlayın.';
    STR_PREVIEW_SIZE_SCREEN_ARRAY = ['Küçük Resim Boyutu', 'Daha Büyük'];
    STR_SIDE_PANEL_PLAYER_DELAY = 'Önizleme gecikmesi';
    STR_SIDE_PANEL_PLAYER_DELAY_SUMMARY =
        'Bir küçük resim seçildikten sonra önizlemenin yüklenmeye başlaması için gecikme süresini ayarlayın. Bu, kaydırma sırasında geciken yavaş cihazlara yardımcı olur.';
    STR_PREVIEW_VOLUME = 'Oynatıcı Önizleme ses seviyesi';
    STR_PREVIEW_VOLUME_SUMMARY =
        'Bir Canlı, VOD veya klip açıkken yukarı basıldığında gösterilen küçük önizleme oynatıcısının ses seviyesini ayarlayın.';
    STR_PREVIEW_OTHERS_VOLUME = 'Ana oynatıcı ses seviyesi (Önizleme gösterilirken)';
    STR_PREVIEW_OTHERS_VOLUME_SUMMARY =
        'Ana oynatıcının (tüm resim içinde resim oynatıcıları, çoklu yayın oynatıcıları) ses seviyesi, önizleme oynatıcısı gösterilirken düşürülebilir.';
    STR_SIDE_PANEL_PLAYER = 'Önizleme küçük resim oynatıcısı ayarları';
    STR_START_AT_USER = 'Uygulamayı her zaman kullanıcı ekranında başlat';
    STR_START_AT_USER_SUMMARY =
        "Bu seçenek 'Oynatmayı geri yükle' seçeneğini devre dışı bırakır, ancak uygulamayı açtığınızda kullanıcıyı seçmenize olanak tanır.";
    STR_LAST_REFRESH = 'Son yenileme:';
    STR_PP_VOD_ERROR = "Bu VOD'u açmak için resim içinde resim veya çoklu yayından çıkın";
    STR_SETTINGS_ACCESSIBILITY = "'Bir erişilebilirlik hizmeti çalışıyor' uyarısını göster";
    STR_SETTINGS_ACCESSIBILITY_SUMMARY =
        'Cihazda bir erişilebilirlik hizmeti etkinse, uygulama bir uyarı gösterecektir. Erişilebilirlik hizmetinin bazı cihazları yavaşlatabildiği ve bu uygulamada donmalara veya gecikmelere neden olabildiği bilinen bir android sorunudur.';
    STR_ACCESSIBILITY_WARN = 'Erişilebilirlik hizmeti/hizmetleri algılandı';
    STR_ACCESSIBILITY_WARN_EXTRA = 'Bu bağlantıdan daha fazlasını okuyun:';
    STR_ACCESSIBILITY_WARN_EXTRA2 =
        'Donma veya gecikme ile ilgili sorunlar yaşıyorsanız, bu uygulamayı kapatın ve tüm erişilebilirlik hizmetlerini devre dışı bırakın, bundan sonra tüm sorunlar ortadan kalkacaktır.<br>Bu uyarıyı bir daha asla göstermemek için ayarlardan devre dışı bırakın.';
    STR_AUTO_REFRESH = 'Otomatik yenileme zaman aşımı';
    STR_AUTO_REFRESH_SUMMARY = 'Bu etkinleştirildiğinde, uygulama içeriği arka planda otomatik olarak yeniler.';
    STR_AUTO_REFRESH_BACKGROUND = 'Arka planda otomatik yenileme';
    STR_AUTO_REFRESH_BACKGROUND_SUMMARY =
        "'Otomatik yenileme zaman aşımı' ayarlandığında ve bu etkinleştirildiğinde, otomatik yenileme arka planda gerçekleşir (ancak uygulama görünür durumdayken; android diğer uygulamaların gecikmesini önlemek için arka planda kısıtlamasız çalışmaya izin vermez). Ekran görünür olmadığında veya daha önce yenilemenin çalışmadığı bir ekrana geri döndüğünüzde dikkatli olun, çünkü bu seçenek etkinken uygulamanın çok fazla ekranı varsa, otomatik yenileme bazı düşük özellikli cihazlarda rastgele gecikmelere neden olabilir.";
    STR_MAIN_WINDOW = 'Ana video';
    STR_MULTI_MAIN_WINDOW = 'Çoklu yayın ana videosu';
    STR_MAIN_MULTI_BIG =
        STR_MULTI_MAIN_WINDOW + ' daha büyük ve sohbet: Aşağı tuşuna basın ve ardından büyük videoyu değiştirmek için sol/sağ tuşlarını kullanın';
    STR_SOURCE_CHECK = "Oynatıcı geciktiğinde oynatıcı kalitesini otomatik olarak Kaynak'tan Otomatik'e değiştirin";
    STR_SOURCE_CHECK_SUMMARY =
        'Etkinleştirildiğinde ve otomatik kalite kullanılmadığında, oynatıcı gecikiyorsa otomatik kaliteye geçer ve bu konuda uyarır. Oynatıcı gecikmesi, oynatıcının birkaç saniye oynatılamamasıdır (algoritma sadece zamandan daha karmaşıktır), başka bir şey oynatırsanız orijinal kaliteye geri döner.';
    STR_PLAYER_LAG = "Oynatıcı gecikiyor, kalite 'Otomatik mod' olarak değiştirildi";
    STR_PLAYER_SOURCE = 'Oynatıcı gecikiyor, kalite düşürüldü';
    STR_TOO_ERRORS = 'veya çok fazla hata';
    STR_STREAM_ERROR_SMALL = 'Önizleme, yayın sona erdi' + STR_TOO_ERRORS;
    STR_CONTROLS_MEDIA_FF =
        'İleri veya geri sarma (yalnızca VODlar ve klipler için): Sol/sağ D-pad veya hızlı ileri/geri sarma medya tuşlarını kullanın';
    STR_VOD_MUTED =
        'Telif hakkıyla korunan içerik barındırdığı için bu bölümün bir kısmı sessize alınmıştır ve oynatma çubuğundaki daha koyu renkli kısımlarla belirtilmiştir';
    STR_GIFT_SUB = 'size bir abonelik hediye etti!';
    STR_ANONYMOUS = 'Anonim';
    STR_CHAT_BANNED = 'Şurada konuşmaktan kalıcı olarak yasaklandınız:';
    STR_CHAT_WRITE = 'Sohbete yaz';
    STR_CHAT_EXTRA = 'Sohbet ekstra ayarları';
    STR_PLACEHOLDER_CHAT =
        "Bu seçiliyken, ekran klavyesini göstermek için enter'a basın. Fiziksel bir klavyeniz bağlıysa, ekran klavyesini gizlemek için geri veya esc tuşuna basın";
    STR_CHAT_ROOMSTATE = 'Sohbet ROOMSTATE:';
    STR_CHAT_NO_RESTRICTIONS = 'Kısıtlama yok';
    STR_OPTIONS = 'Seçenekler';
    STR_CHAT_DELL_ALL = 'Tümünü sil';
    STR_CHAT_UNICODE_EMOJI = 'Unicode Emoji';
    STR_CHAT_TW_EMOTES = 'Twitch ifadeleri';
    STR_CHAT_BTTV_GLOBAL = 'BTTV genel';
    STR_CHAT_BTTV_STREAM = 'BTTV yayıncı';
    STR_CHAT_FFZ_GLOBAL = 'FFZ genel';
    STR_CHAT_FFZ_STREAM = 'FFZ yayıncı';
    STR_CHAT_SEVENTV_GLOBAL = '7TV genel';
    STR_CHAT_SEVENTV_STREAM = '7TV yayıncı';
    STR_CHAT_AT_STREAM = '@yayıncı';
    STR_CHAT_RESULT = 'Sohbette beklenen sonuç:';
    STR_CHAT_SEND = 'Gönder';
    STR_CHAT_EMOTE_EMPTY = 'Bu ifade listesi boş';
    STR_CHAT_FOLLOWER_ONLY = 'Sohbet yalnızca takipçi modunda ve siz şunun takipçisi değilsiniz:';
    STR_CHAT_FOLLOWER_ONLY_USER_TIME = 've sadece şu kadar süredir takip ediyorsunuz:';
    STR_CHAT_EMOTE_ONLY = 'Yalnızca Twitch İfadesi modu';
    STR_CHAT_CHOOSE = 'Hangi sohbete yazacağınızı seçin veya kapatmak için geri tuşuna basın';
    STR_CHAT_OPTIONS_TITLE = 'Sohbete yazma seçenekleri';
    STR_CHAT_OPTIONS_KEYBOARD = 'Yazılım Klavyesini otomatik gizle';
    STR_CHAT_OPTIONS_KEYBOARD_SUMMARY =
        'Ekrandaki yazılım klavyesinin davranışını kontrol etmenizi sağlar. Fiziksel bir klavyeniz bağlıysa onu kullanın, değilse asla olarak ayarlayın';
    STR_CHAT_OPTIONS_KEYBOARD_1 = 'Asla';
    STR_CHAT_OPTIONS_KEYBOARD_2 = 'Klavye algılanırsa';
    STR_CHAT_OPTIONS_KEYBOARD_3 = 'Her zaman';
    STR_CHAT_OPTIONS_EMOTE_SORT = 'İfade sıralaması';
    STR_CHAT_OPTIONS_EMOTE_SORT_SUMMARY = 'Bu devre dışı bırakılırsa, ifade listeleri sunucu tarafından sağlanan sırayla gösterilir.';
    STR_CHAT_OPTIONS_FORCE_SHOW = 'Sohbeti zorla göster';
    STR_CHAT_OPTIONS_FORCE_SHOW_SUMMARY = 'Sohbete yazma kullanıldığında sohbeti görmek istiyorsanız bunu etkinleştirin';
    STR_NOKEY_CHAT_WARN = 'Sohbete giriş yapmak ve yazmak için bir kullanıcı yetkilendirme anahtarı ekleyin';
    STR_CHAT_NOT_READY = 'Sohbet göndermeye hazır değil! Bir iki saniye içinde tekrar deneyin.';
    STR_CHAT_REDEEMED_MESSAGE_HIGH = 'Ödülle Öne Çıkarılan Mesajım';
    STR_CHAT_FIRST_MESSAGE_HIGH = 'İLK MESAJ';
    STR_CHAT_REDEEMED_MESSAGE_SUB = 'Yalnızca abone modunda bir mesaj gönderme ödülü kullanıldı';
    STR_CHAT_OPTIONS = 'Sohbet seçenekleri';
    STR_CHAT_HIGHLIGHT_STREAMER_MSG = 'Yayıncıdan gelen mesajları vurgula (Koyu pembe arka plan)';
    STR_CHAT_HIGHLIGHT_MOD_MSG = 'Moderatörlerden gelen mesajları vurgula (Koyu camgöbeği arka plan)';
    STR_CHAT_HIGHLIGHT_REDEEMED = 'Ödül mesajlarını vurgula (Sadece mor arka planlı mesaj)';
    STR_CHAT_HIGHLIGHT_FIRST = 'İlk Kez Sohbet Edeni Vurgula (Koyu pembe arka plan)';
    STR_CHAT_HIGHLIGHT_STREAMER = "@yayıncı mesajlarını vurgula (Koyu kırmızı arka plan, '@' mavi)";
    STR_CHAT_HIGHLIGHT_USER = "Kendi @kullanıcıadı mesajlarınızı vurgulayın (Koyu Yeşil arka plan, '@' mavi)";
    STR_CHAT_HIGHLIGHT_USER_SEND = 'Gönderdiğiniz mesajları vurgulayın (Koyu Yeşil arka plan)';
    STR_CHAT_SHOW_SUB = 'Abonelik mesajlarını sohbette göster (Koyu turuncu arka plan)';
    STR_CHAT_HIGHLIGHT_BIT = 'Bit mesajlarını vurgula (Koyu Sarı arka plan)';
    STR_CHAT_HIGHLIGHT_ACTIONS = 'Eylem mesajlarını göster (genellikle yayın botlarından)';
    STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY =
        "Bu mesajlar genellikle abonelik mesajlarına eşittir, ancak bir yayın botu aracılığıyla gönderilir, bu nedenle 'Abonelikleri göster ...' etkinse, bu gereksizdir.";
    STR_CHAT_INDIVIDUAL_BACKGROUND = 'Bireysel mesajlar arasında arka plan rengi farkı';
    STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY =
        "Modlar 'devre dışı', 'etkin' (otomatik), Parlak veya Daha Koyu'dur. Otomatik modda, sohbet yayının üzerindeyse mesajlar daha koyu ve daha açık tonlar arasında değişir; aksi takdirde arka plan parlaktır.";
    STR_CHAT_INDIVIDUAL_LINE = 'Bireysel sohbet mesajlarını ayırmak için bir çizgi ekle';
    STR_CHAT_LINE_ANIMATION = 'Yeni bir sohbet mesajı eklerken animasyonlu kaydırma';
    STR_CHAT_LOGGING = 'Mevcut kullanıcıyla sohbete giriş yapılıyor';
    STR_CHAT_LOGGING_SUMMARY =
        "Bir yetkilendirme anahtarı sağlandığında, uygulama mevcut kullanıcı olarak sohbete giriş yapar (oynatıcı kontrollerinde sohbet devre dışı bırakılmadıkça). Bu HAYIR olarak ayarlanırsa, anonim olarak giriş yapar, mesajlara izin verir ancak yasaklamaları ve ROOMSTATE'i gizler.";
    STR_CHAT_BOTS = 'Botları ve bot komutlarını (!komut) sohbette göstermeyi engelle';
    STR_CHAT_TIMESTAMP = 'Mesaj zaman damgasını göster';
    STR_CHAT_NICK_COLOR = 'Okunabilir takma ad renkleri';
    STR_CHAT_NICK_COLOR_SUMMARY =
        'Bazen koyu bir arka planda okunamayan varsayılan takma ad rengini kullanmak yerine, özel, kolayca görülebilen bir renk kullanın.';
    STR_CHAT_CLEAR_MSG = 'Sohbeti temizle, kullanıcı mesajlarını sil';
    STR_CHAT_SHOW_BADGES = 'Kullanıcı rozetlerini göster (aşağıdakiler hariç)';
    STR_CHAT_SHOW_BADGES_MOD = 'Moderatör rozetlerini göster';
    STR_CHAT_SHOW_BADGES_VIP = 'VIP rozetlerini göster';
    STR_CHAT_SHOW_BADGES_SHARED = 'Paylaşılan sohbet rozetlerini göster';
    STR_CHAT_MESSAGE_DELETED = 'Bu tek kullanıcı mesajının silinmesi istendi';
    STR_CHAT_MESSAGE_DELETED_ALL = 'Bu kullanıcının tüm mesajlarının silinmesi istendi';
    STR_CHAT_MESSAGE_DELETED_TIMEOUT = ', şu süreyle zaman aşımına uğratıldılar:';
    STR_CHAT_CLEAR_MSG_SUMMARY =
        'Belirli kullanıcılardan gelen mesajları silin (ör. bir zaman aşımı veya yasaklamadan sonra). Etkinleştirilirse mesajlar kaldırılır; aksi takdirde sadece arka plan maviye döner.';
    STR_OPEN_HOST_SETTINGS = 'Mümkünse, yayının sonunda her zaman hostlanan canlı yayını aç';
    STR_ALWAYS_STAY = 'Bir canlı yayın bittikten sonra her zaman oynatıcı açık kalsın';
    STR_PING_WARNING = "'Twitch'e ping başarısız' uyarısını göster";
    STR_PING_WARNING_SUMMARY =
        'Uygulama, bir ping aracılığıyla Twitch ile bağlantıyı sürekli kontrol eder. Çok fazla kez başarısız olursa bir uyarı gösterilir. Bu uyarının istemeden gösterildiğine inanıyorsanız, bu seçeneği HAYIR olarak ayarlayın.';
    STR_KEY_UP_TIMEOUT = 'Tuş basılı tutma zaman aşımı (milisaniye cinsinden)';
    STR_KEY_UP_TIMEOUT_SUMMARY =
        'Bir basılı tutma eyleminin gerçekleşmesi için bir tuşu ne kadar süreyle basılı tutmanız gerektiğini belirler. Ekranı yenileme, küçük resim seçeneklerini gösterme vb. eylemler.';
    STR_CURRENT_THUMB_STYLE = 'Mevcut odak stili';
    STR_NEW_THUMB_STYLE = 'Yeni odak stili';
    STR_COLOR_STYLE_TEXT =
        "Bir seçenek belirlemek için yukarı/aşağı tuşlarına, buradan çıkmak için geri tuşuna, çıkmadan önce onaylamak için 'Değişiklikleri uygula' üzerinde enter'a basın.";
    STR_SHADOWS = 'Gölgeler';
    STR_SHADOWS_NONE = 'Hiçbiri';
    STR_SHADOWS_WHITE = 'Beyaz';
    STR_SHADOWS_GRAY = 'Gri';
    STR_SHADOWS_BLACK = 'Siyah';
    STR_COLORS = 'Renkler';
    STR_RESULT = 'Sonuç';
    STR_APPLY = 'Değişiklikleri uygula';
    STR_COLOR_TYPE = 'Renk türü';
    STR_STYLES = 'Stiller';
    STR_ENTER = "Enter'a basın";
    STR_COLOR_ARRAY = 'Arka Plan,Metin,Kenarlık,İzlenen ilerleme çubuğu';
    STR_STYLES_ARRAY = 'Varsayılan,Özel,Beyaz,Gri,Kırmızı,Turuncu,Sarı,Yeşil,Mavi,Mor,Pembe';
    STR_ENTER_RGB = 'RGB değişikliğini kabul etmek için ' + STR_ENTER;
    STR_THUMB_STYLE = 'Seçilen küçük resim stili';
    STR_OPEN_EXTERNAL_PLAYER = 'Harici bir oynatıcıda aç';
    STR_CHAT_SIDE_ARRAY = ['Sol', 'Sağ'];
    STR_CHAT_BASE_ARRAY = ['Sağ alt', 'Orta sağ', 'Sağ üst', 'Orta üst', 'Sol üst', 'Orta sol', 'Sol alt', 'Orta alt'];
    STR_CHAT_100_ARRAY = ['Sağ', 'Orta', 'Sol'];
    STR_NOTIFICATION_POS = 'Ekrandaki bildirim konumu';
    STR_NOTIFICATION_POS_ARRAY = ['Sağ üst', 'Orta üst', 'Sol üst', 'Sol alt', 'Orta alt', 'Sağ alt'];
    STR_LOWLATENCY_ARRAY = [
        STR_DISABLE,
        'Normal mod, yeniden arabelleğe almaya neden olabilir',
        'En düşük mod, daha da fazla yeniden arabelleğe almaya neden olabilir'
    ];
    STR_LOWLATENCY_ENABLE_ARRAY = [STR_LOW_LATENCY + ' - ' + STR_DISABLED, STR_LOW_LATENCY + ' - Normal mod', STR_LOW_LATENCY + ' - En düşük mod'];
    STR_VOD_SEEK = 'VOD hızlı geri/ileri sarma kontrolleri';
    STR_VOD_SEEK_SUMMARY =
        "Geri/ileri adımların ne kadar hızlı çalışacağını kontrol eder. Sol/sağ tuşlarına tıklayıp basılı tuttuğunuzda, adım süresi artar. Artış zaman aşımı geçtikten sonra, maksimum adım süresine kadar artar. Ardından, tuşu bıraktıktan ve bir saniye tıklamadıktan sonra, adım süresi minimum adım süresine geri döner.<br><br>Yukarı tuşuna basmak min/maks değerini geçersiz kılar, tüm olası adımlardan geçmenize ve ilerleme çubuğu kapanana kadar değeri kilitlemenize olanak tanır.<br><br>Tuşu basılı tutmadan tek tıklamalar yapmak süreyi artırmaz.<br><br>Bu seçenekler yalnızca VOD'larla çalışır. Klipler için adım her zaman 1 saniyedir.";
    STR_VOD_SEEK_MIN = 'Minimum (başlangıç) adım süresi';
    STR_VOD_SEEK_MAX = 'Maksimum adım süresi';
    STR_VOD_SEEK_TIME = 'Şu süreyle basılı tuttuktan sonra artış zaman aşımı';
    STR_UP_LOCKED = 'adım değerini kilitlemek için yukarı basın';
    STR_LOCKED = 'kilitlendi, değiştirmek için yukarı basın';
    STR_IN_CHAT = 'Sohbette';
    STR_IN_SHARED_CHAT = 'Paylaşılan Sohbette';
    STR_SHOW_IN_CHAT = 'Sohbetin veya izleyicilerin üstünde toplam giriş yapmış kullanıcı sayısını göster';
    STR_SHOW_IN_CHAT_SUMMARY =
        'Bu, çevrimdışı sohbetin aktif kullanıcıları olup olmadığını belirlemeye ve toplam izleyiciler ile sohbet kullanıcıları arasındaki farkı göstermeye yardımcı olur.';
    STR_SHOW_IN_CHAT_VIEWERS = 'İzleyicileri göster';
    STR_SHOW_IN_CHAT_CHATTERS = 'Sohbetçileri göster';
    STR_PLAYED = 'Oynatıldı';
    STR_CHAPTERS = 'Bölümler';
    STR_FROM_SIMPLE = 'konumundan';
    STR_HIDE_MAIN_CLOCK = 'Ana ekran saatini gizle';
    STR_HIDE_PLAYER_CLOCK = 'Oynatıcı saatini gizle';
    STR_HIDE_MAIN_SCREEN_TITLE = 'Ana ekran başlığını gizle';
    STR_HIDE_MAIN_SCREEN_TITLE_SUMMARY = 'Orta başlık, canlı yayınlar, klipler, ayarlar vb...';
    STR_HIDE_ETC_HELP_INFO = 'Ekrandaki gezinme ipuçlarını gizle';
    STR_HIDE_ETC_HELP_INFO_SUMMARY = "'Bir eylem için bir tuşu basılı tutun' gibi gezinme ipuçları ve ilgili diğerleri.";
    STR_INACTIVE_SETTINGS = 'Şu süre boyunca etkileşim olmadığında uygulamayı otomatik olarak simge durumuna küçült:';
    STR_INACTIVE_SETTINGS_SUMMARY =
        'Kimse izlemiyorken uygulamanın çalışmaya devam etmesini önler. Bir uyarı belirir ve kullanıcıya simge durumuna küçültmeyi önlemek için herhangi bir tuşa basması için 15 saniye verir.';
    STR_INACTIVE_WARNING =
        'Uygulama, etkileşimsizlik nedeniyle şu sürede otomatik olarak simge durumuna küçülecek:<br><br>%x<br><br>İptal etmek için herhangi bir tuşa basın';
    STR_REMAINING = 'Kalan:';
    STR_PLAYER_INFO_VISIBILITY = 'Oynatıcı durumu görünürlüğü';
    STR_PREVIEW_SET = 'Önizleme ayarları';
    STR_PREVIEW_SHOW = 'Önizlemeyi göster';
    STR_PREVIEW_SIZE_CONTROLS = 'Önizleme boyutu';
    STR_OLED_BURN_IN = 'OLED Yanma koruması';
    STR_OLED_BURN_IN_SUMMARY =
        'Bu etkinleştirildiğinde, ekran her 20 dakikada bir 50 ms boyunca tamamen kararır. Yalnızca ekran yanması sorunu olan OLED ekranlı cihazlar için gereklidir.';
    STR_AS = 'olarak';
    STR_MILLISECONDS = 'milisaniye';
    STR_HOUR = 'saat';
    STR_HOURS = 'saat';
    STR_RIGHT = 'Sağ';
    STR_LEFT = 'Sol';
    STR_BOTTOM = 'Alt';
    STR_TOP = 'Üst';
    STR_AVG = 'Ort';
    STR_OFFSET = 'Fark';

    STR_AFFILIATE = 'Ortaklık içeriği';
    STR_AFFILIATE_SUMMARY = 'Ortaklık içeriğini görmek istemiyorsanız bunu devre dışı olarak ayarlayın.';
    STR_AFFILIATE_ABOUT =
        'Bu uygulama, şiddetle tavsiye edilen ürünlere sahip ortaklardan bazı ortaklık bağlantıları ve resimleri içerir. Uygulama sahibi, bu bağlantılar aracılığıyla yapılan satın alımlar için komisyon alabilir. Bir ürünle ilgili tüm bağlantılar, resimler veya herhangi bir şey, uygulamada görüntülenmeden önce uygun şekilde doğrulanır ve/veya kullanılır.';
    STR_AFFILIATE_ABOUT_DIS = 'Ortaklık içeriği ayarlardan devre dışı bırakılabilir.';

    STR_HISTORY_EMPTY_CONTENT = 'Uygulama geçmişi, yalnızca geçmiş etkinse uygulamada ne izlediğinizi gösterir';
    STR_PREVIEW = 'önizleme';

    STR_EMBED = 'Gömülü oynatıcı ';
    STR_CLICK_EXIT = 'Oynatıcıdan çıkmak için buraya tıklayın';
    STR_GO_FULL = 'Tam ekran';
    STR_GO_FULL_HELP = "Tıklayın, 9 veya F11'e basın";
    STR_NOT_SUPPORT_BROWSER = 'Bu, bir tarayıcıda desteklenmiyor';

    STR_WARNING_BROWSER = 'Tarayıcı uyarısı';
    STR_WARNING_BROWSER_SUMMARY =
        "Bu uygulama esas olarak TV'lerde kullanılmak üzere tasarlanmıştır, diğer cihazlar için destek sınırlıdır. Uygulamayı bir fare kullanarak kontrol edebilirsiniz ancak klavye tuşları olan yukarı, aşağı, sol, sağ, enter ve geri tuşu (ESC geri tuşu olarak çalışır) ile daha iyi çalışır.";
    STR_THUMB_OPTIONS_CLICK = 'Bir eylemin üzerinde iki kez tıklayın (açmak veya uygulamak için), uygulamadan çıkmak için pencerenin dışına tıklayın';
    STR_CLOSE_THIS_BROWSER = 'Bunu kapatmak için geri, enter tuşuna basın veya dışarıya fare ile tıklayın';

    STR_DISABLE_EMBED = 'Canlı ve Vod Twitch oynatıcısını etkinleştir';
    STR_DISABLE_EMBED_SUMMARY =
        'Bu, yalnızca test amacıyla metin dizelerini ve düzenini kontrol etmek için Android oynatıcıyı görmek istiyorsanız devre dışı bırakılmalıdır';

    STR_SPECIAL_FEATURE = 'Bu özellik için klavyeyi kullanın';
    STR_FAIL_VOD_INFO = 'VOD bilgisi yüklenemedi';

    STR_PROXY_DONATE_SUMMARY = 'Daha fazla bilgi edinmek veya proxy sunucusu bakımcısına teşekkür etmek isterseniz şu bağlantıyı kullanın:';

    STR_TTV_LOL = 'TTV LOL';
    STR_K_TWITCH = 'K-Twitch-Bypass';
    STR_T1080 = 'T1080';

    STR_PROXY_TIMEOUT = 'Proxy zaman aşımı (saniye cinsinden)';
    STR_PROXY_TIMEOUT_SUMMARY =
        'Proxy sunucusu kapalıysa, bağlantıdan "vazgeçmek" ve varsayılan Twitch uygulamasına geri dönmek için geçen süre bu olacaktır';

    PROXY_SERVICE = 'Proxy: ';
    PROXY_SERVICE_STATUS = 'Etkin ve çalışıyor';
    PROXY_SERVICE_OFF = 'Ayarlarda devre dışı';
    PROXY_SERVICE_FAIL = 'Çalışmıyor, %x kez başarısız oldu';

    PROXY_SETTINGS = 'Proxy Ayarları (İnternet sansürü ve ilgili proxy)';
    PROXY_SETTINGS_SUMMARY =
        'Yalnızca bir proxy etkinleştirilebilir. Yayın bağlantılarını farklı bir sunucudan almak için proxy sunucusunu etkinleştirir, bu da bölgenizde yasaklanmış içeriği görmenizi ve reklamları önlemenizi sağlayabilir. Çok fazla veya uzun süren arabelleğe alma, donma veya yayın kalitesinin düşmesine neden olabilecek yavaş bağlantı gibi herhangi bir canlı yayın sorununuz varsa bunu devre dışı bırakın.';
    SEEK_PREVIEW = 'Atlama Önizlemesi';
    SEEK_PREVIEW_SUMMARY =
        "Geri veya hızlı ileri sarma sırasında gösterilen VOD atlama önizleme resmini kontrol etmenizi sağlar. Atlama önizlemesi tüm VOD'lar için mevcut değildir.";
    SEEK_PREVIEW_SINGLE = 'Tek resim';
    SEEK_PREVIEW_CAROUSEL = 'Resim döngüsü';

    OPEN_NEW_ISSUE = "(Yeni sorun'a tıklayın)";

    STR_CONFIRM = 'Onayla';

    STR_MATURE_NO_CHANGES = 'Eksik şifre nedeniyle yetişkin içeriğinde değişiklik yapılmadı';
    STR_MATURE_PROTECT = 'Yetişkin içeriği değişikliklerini bir şifreyle koru';
    STR_MATURE_HELP_SET_PASS = "Bir şifre belirleyin ve Onayla'ya tıklayın, çıkış yapmak yetişkin ayarlarını sıfırlayacaktır";
    STR_MATURE_HELP_CHECK_PASS = "Kaydedilmiş şifreyi girin ve Onayla'ya tıklayın, çıkış yapmak yetişkin ayarlarını sıfırlayacaktır";

    STR_MATURE_DISABLED = 'Yetişkin içeriği devre dışı';
    STR_ENABLE_MATURE = 'Yetişkin içeriği';
    STR_ENABLE_MATURE_SUMMARY =
        'Devre dışı bırakıldığında uygulama, takip edilen içerikler de dahil olmak üzere yetişkin olarak işaretlenmiş tüm içeriği engeller. Buna yetişkin olarak işaretlenmiş canlı yayınlar ve klip ve VOD bölümlerindeki tüm içerikler dahildir';

    STR_SCREEN_OFF = 'Ekran kapalı (Sadece ses)';

    STR_UNBLOCK_CHANNEL = 'Kanalın engelini kaldır';
    STR_UNBLOCK_GAME = 'Oyunun engelini kaldır';
    STR_BLOCK_CHANNEL = 'Kanalı engelle';
    STR_BLOCK_GAME = 'Oyunu engelle';
    STR_BLOCK_NO_USER = 'Engelleyebilmek için önce bir kullanıcı ekleyin';
    STR_BLOCK_NO_CHANNEL = 'Bunun için kanal bilgisi alınamıyor';
    STR_BLOCK_OVERWRITE = 'Engellenenleri göster';
    STR_BLOCK_SORT_DATE = 'Engellenme tarihine göre sıralandı';
    STR_BLOCK_SORT_NAME = "İsme göre A'dan Z'ye sıralandı";
    STR_BLOCK_EMPTY_CONTENT = 'Bu türde engellenmiş içerik yok';

    STR_NO_TOKEN_WARNING = 'Bir kullanıcı eklemeden uygulama içeriği yükleyemeyebilir, bu bir Twitch API sınırlamasıdır';
    STR_NO_TOKEN_WARNING_429 = 'Uygulama bir Twitch API sınırlaması nedeniyle içeriği yükleyemiyor, bunu düzeltmek için bir kullanıcı ekleyin.';

    STR_ADD_USER_TEXT = 'Başka bir cihazdan %site adresini ziyaret edin ve şu kodu girin: %code';
    STR_ADD_USER_TEXT_COUNTER = 'Erişim onayı %d içinde kontrol ediliyor...';
    STR_ADD_USER_TEXT_COUNTER_NOW = 'Şimdi kontrol ediliyor!';
    STR_ADD_ERROR = 'Kullanıcı ekleme hizmetine erişilemiyor';
    STR_USER_TOKEN_ERROR = 'Mevcut kullanıcıya erişim kaybedildi, lütfen kullanıcı bölümünü gözden geçirin';

    STR_WRONG_PASS = 'Yanlış şifre!';
    STR_PASS_MATURE_ENABLED = 'Yetişkin içeriği etkinleştirildi, eski şifre silindi';

    STR_PLAYER_EXTRA_CODEC = 'Gelişmiş Yayın HEVC, AV1, 1440p 4k desteği';
    STR_PLAYER_EXTRA_CODEC_SUMMARY =
        "Çoğu yayın 1080p60'a kadar AVC (H.264) kullanır; HEVC/AV1, mevcut olduğunda 1440p, 4K ve 60+fps'yi etkinleştirir.";

    STR_PLAYER_EXTRA_CODEC_SUMMARY1 =
        "Bu özellik yalnızca oturum açmış kullanıcılar için çalışır. Tüm yayınlar desteklenmez — bu, yayıncının etkinleştirmesine ve Twitch'in bölgenizde bunu sağlayıp sağlamadığına bağlıdır.";

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA =
        "Uygulama, daha yüksek kaliteli yayınlar için cihazınızın HEVC veya AV1'i destekleyip desteklemediğini kontrol eder.";

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA2 = 'Cihaz desteği olmadan, oynatma sınırlı olacak ve gelişmiş yayınlar için çalışmayabilir.';

    STR_PLAYER_CODEC_AV1 = 'AV1';
    STR_PLAYER_CODEC_HEVC = 'HEVC';
    STR_PLAYER_CODEC_SUPPORTED = 'cihaz tarafından destekleniyor';
    STR_PLAYER_CODEC_NOT_SUPPORTED = "Cihaz desteklemiyor! Bu codec'i etkinleştirmek oynatma hatalarına neden olabilir.";

    STR_PLAYER_EXTRA_CODEC_SUMMARY_EXTRA3 = 'Cihazın yeteneklerini daha iyi anlamak için ayarlar seçeneğini kontrol edin: ';

    STR_BLOCKED_CODEC = 'Codec yeteneği ve Engellenen kodekler';
    STR_BLOCKED_CODEC_SUMMARY = 'Kullanılan codec yeteneklerini listeler ve kodeklerin kullanılmasını engellemeye izin verir.';

    STR_CODEC_DIALOG_SUMMARY_1 =
        'Bu bölüm, bu uygulama tarafından kullanılan tüm cihaz destekli codec türlerini (AVC H.264, HEVC H.265 ve AV1) listeler.';

    STR_CODEC_DIALOG_SUMMARY_2 =
        'Yazılım kodekleri (OMX.google), bir donanım kodeği mevcutsa varsayılan olarak devre dışı bırakılır. Bir oynatma sorununuz varsa, yazılım kodeğini devre dışı bırakmayı ve donanımı etkinleştirmeyi veya tam tersini deneyin (Sürekli atlanan karelerin birikmesi bir codec sorununun göstergesidir).';

    STR_CODEC_DIALOG_SUMMARY_3 = 'Her türden en az bir codec her zaman etkin olmalıdır.';

    STR_SPEED_ADJUST = 'Düşük gecikme ile yakala';
    STR_SPEED_ADJUST_SUMMARY =
        'Düşük gecikme etkinleştirildiğinde, beklenen hedeften saptığında gecikmeyi otomatik olarak ayarlar, yayını %1 yavaşlatarak veya hızlandırarak. Hız değişikliği, gecikme ayarlanırken küçük ses parazitlerine neden olabilir.';

    STR_SW_CODEC = 'Yazılım kodeği';
    STR_HW_CODEC = 'Donanım kodeği';

    STR_LOAD_ALL_LANG = 'İçeriği Otomatik Olarak "Tüm" Dile Geçir';
    STR_LOAD_ALL_LANG_SUMMARY =
        'Mevcut dilde içerik olmadığında otomatik olarak Tüm dile geçer, yalnızca içerik yok ekranı ve bazı ekranlar için geçerlidir (Oyunlar ve Ana Sayfa)';
    STR_LOAD_ALL_LANG_WARNING = 'içerik boş olduğu için ' + STR_LOAD_ALL_LANG;

    STR_DISABLE_SHARED_CHAT = 'Paylaşılan sohbeti devre dışı bırak';
    STR_DISABLE_SHARED_CHAT_SUMMARY = 'Evet olarak ayarlanırsa, yalnızca açtığınız yayından gelen sohbet mesajlarını gösterir';

    STR_BACKUP_ACCOUNT_REMOVE = 'Google Drive hesabını kaldır';
    STR_BACKUP_ACCOUNT_ADD = 'Yedekleme için Google Drive hesabı ekle';
    STR_BACKUP_ACCOUNT_ADD_SUMMARY =
        'Bir yedeği geri yüklemek için bir hesap ekleyin; uygulama size mevcut geri yükleme seçeneklerini gösterecektir.';
    STR_BACKUP_ACCOUNT_DIALOG_TITLE = 'Google Drive hesabı ekle';

    STR_BACKUP_ACCOUNT_DIALOG_BODY = 'API bilgileri alınıyor, lütfen bekleyin...';
    STR_BACKUP_ACCOUNT_DIALOG_CODE_FAIL = 'Erişim reddedildi';
    STR_BACKUP_ACCOUNT_DIALOG_CODE_SUCCESS = 'Erişim başarılı, uygulama doğrularken lütfen bekleyin...';

    STR_BACKUP_ACCOUNT_DIALOG_CODE_SUCCESS_END = 'Uygulama birkaç saniye içinde geri yükleme yapıp bu pencereyi kapatacak';
    STR_BACKUP_NO_BACKUP_FOUND = 'Daha önce yapılmış yedek bulunamadı, yedek başarıyla oluşturuldu';
    STR_BACKUP_ACCOUNT_REFRESH_ERROR = 'Yedekleme ve Senkronizasyon hesabına erişim kaybedildi, yedekleme hesabı kaldırıldı!';

    STR_BACKUP_SIZE = 'Yedek boyutu:';
    STR_BACKUP_NAME = 'Yedek adı:';
    STR_BACKUP_SYNC = 'Senkronizasyon, Yedekleme ve Geri Yükleme';
    STR_BACKUP_SYNC_SUMMARY =
        "Uygulama, yalnızca oluşturduğu belirli Google Drive dosyalarını görüntüleyebilir, oluşturabilir, düzenleyebilir ve silebilir; Google Drive'ınızdaki diğer dosyaları görüntüleyemez, değiştiremez veya silemez." +
        '<br><br>' +
        'Ayrıca, mevcut aktif hesabı görüntülemek için e-posta adresinizi ve profil resminizi okuyabilir. Bu bilgiler yalnızca görüntülenecek ve DEĞİŞTİRİLMEYECEKTİR.';

    STR_BACKUP_USER_INFO = '(Kullanıcı bilgisi: Kullanıcılar, geçmiş, engellenenler ve ayarlar)';

    STR_BACKUP_SYNC_USER = 'Kullanıcıları senkronize et';
    STR_BACKUP_SYNC_HISTORY = 'Kullanıcıların geçmişini ve engellenenler listesini senkronize et.';
    STR_BACKUP_SYNC_SETTINGS = 'Ayarları senkronize et';
    STR_BACKUP_RESTORE_USER = 'Kullanıcıları geri yükle';
    STR_BACKUP_RESTORE_HISTORY = 'Kullanıcıların geçmişini ve engellenenler listesini geri yükle.';
    STR_BACKUP_RESTORE_SETTINGS = 'Ayarları geri yükle';
    STR_BACKUP_RESTORE_SUMMARY =
        'Geri yüklemeden sonra sorun yaşarsanız, uygulama verilerini temizlemeyi ve bir seçeneği atlayarak geri yüklemeyi deneyin.';

    STR_BACKUP_SYNC_SETTINGS_SUMMARY =
        'Yedek, tüm cihazlarınız için yalnızca bir birleşik ayar setine sahiptir. Yaptığınız herhangi bir değişiklik, uygulamayı bir sonraki açışınızda diğer cihazlarınıza uygulanacaktır.';
    STR_BACKUP_SYNC_RESTORE = 'Yedek bulundu';
    STR_BACKUP_SYNC_RESTORE_SUMMARY = 'Yedek bulundu. Geri yüklenecek öğeleri seçin, ardından onaylamak için Geri veya Enter tuşuna basın.';
    STR_BACKUP_SYNC_RESTORE_SUCCESS = 'Geri yükleme başarılı!';
    STR_BACKUP_RESTORE_FAIL = 'Yedek geri yüklenemedi';

    STR_BACKUP_ENABLE = 'Yedeklemeyi etkinleştir';
    STR_BACKUP_ENABLE_SUMMARY = 'EVET olarak ayarlanırsa, uygulama tüm kullanıcı bilgilerinin bir yedeğini tutacaktır ' + STR_BACKUP_USER_INFO;

    STR_BACKUP_SYNC_ENABLE = 'Cihazlar arasında senkronize et';
    STR_BACKUP_SYNC_ENABLE_SUMMARY =
        'Bunu etkinleştirmek, uygulamanın başlangıç sürecine hafif bir gecikme ekleyecektir ve uygulamayı tek bir cihazda kullanıyorsanız gereksizdir. Uygulama, aşağıdaki tüm etkin seçenekleri bu cihaz ile aynı Google Drive hesabını kullanan diğer cihazlar arasında senkronize edecektir. Cihazları değiştirmek ve sorunsuz bir şekilde izlemeye devam etmek için, mevcut cihazda Ana Ekran tuşuna basarak uygulamayı simge durumuna küçültün. Ardından, uygulamayı açmadan önce diğer cihazda tamamen kapalı olduğundan emin olun.';
}
