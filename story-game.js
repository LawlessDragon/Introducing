// Interactive Story Game for Lawless

// Game state management
const gameState = {
  currentScene: 'opening',
  playerChoices: [],
  stats: {
    iceWingAffinity: 0,
    seaWingAffinity: 0,
    balanceAffinity: 0
  },
  inventory: [],
  visitedLocations: [],
  currentPath: null,
  gameStarted: false,
  gameEnded: false
};

// Story data structure
const storyData = {
  opening: {
    title: "Awal Petualangan",
    description: "<p>Lawless berdiri di persimpangan tiga dunia, merasakan energi yang mengalir dari tiga gerbang di hadapannya. Masing-masing gerbang memancarkan aura yang berbeda - dingin membekukan, kedalaman laut, dan harmoni kristal.</p><p>Di manakah petualanganmu akan dimulai?</p>",
    choices: [
      { id: 'ice-caverns', text: 'Masuki Gerbang Ice Caverns', nextScene: 'iceCaverns1' },
      { id: 'azure-depths', text: 'Masuki Gerbang Azure Depths', nextScene: 'azureDepths1' },
      { id: 'crystal-nexus', text: 'Masuki Gerbang Crystal Nexus', nextScene: 'crystalNexus1' }
    ],
    background: 'opening-bg',
    music: 'opening-theme'
  },
  
  // Ice Caverns Path
  iceCaverns1: {
    title: "Ice Caverns: Ujian Dingin",
    description: "<p>Lawless memasuki gua es yang megah. Kristal-kristal es berkilauan memantulkan cahaya biru yang misterius. Udara sangat dingin, menguji ketahanan tubuhnya.</p><p>Di depan, sebuah terowongan sempit terblokir oleh dinding es tebal. Seorang IceWing tua mengamati dari kejauhan.</p>",
    choices: [
      { id: 'ice-breath', text: 'Gunakan napas es untuk membuat jalan', nextScene: 'iceCaverns2A', effect: () => { gameState.stats.iceWingAffinity += 2; } },
      { id: 'find-path', text: 'Cari jalan alternatif di sekitar dinding', nextScene: 'iceCaverns2B', effect: () => { gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'ice-caverns-bg',
    music: 'ice-theme'
  },
  iceCaverns2A: {
    title: "Kekuatan Napas Es",
    description: "<p>Lawless menghembuskan napas es yang kuat, membekukan sebagian dinding es dan membuatnya rapuh. Dengan pukulan ekor yang kuat, dinding es hancur membuka jalan.</p><p>IceWing tua mengangguk terkesan. Dia mendekati Lawless.</p><p>\"Kau memiliki darah IceWing yang kuat, meski kau hibrida. Aku bisa mengajarimu mengendalikan kekuatan es lebih jauh, atau kau bisa melanjutkan perjalanan mencari kristal es legendaris yang tersembunyi di gua ini.\"</p>",
    choices: [
      { id: 'train-power', text: 'Berlatih mengendalikan kekuatan es', nextScene: 'iceCavernsTraining', effect: () => { gameState.stats.iceWingAffinity += 3; } },
      { id: 'find-crystal', text: 'Mencari kristal es legendaris', nextScene: 'iceCavernsCrystal', effect: () => { gameState.stats.balanceAffinity += 1; gameState.inventory.push('ice-map'); } }
    ],
    background: 'ice-caverns-bg',
    music: 'ice-theme'
  },
  iceCaverns2B: {
    title: "Jalan Alternatif",
    description: "<p>Alih-alih menggunakan kekuatan, Lawless memilih untuk mengamati sekitar. Dia menemukan celah kecil di dinding gua yang bisa dilewati.</p><p>Melalui celah sempit, Lawless menemukan ruangan tersembunyi dengan lukisan kuno di dinding, menggambarkan sejarah IceWing dan rahasia kekuatan mereka.</p><p>IceWing tua muncul dari bayang-bayang. \"Kau memilih jalan kebijaksanaan, bukan kekuatan. Menarik untuk seekor hibrida.\"</p>",
    choices: [
      { id: 'study-history', text: 'Pelajari sejarah IceWing dari lukisan', nextScene: 'iceCavernsHistory', effect: () => { gameState.stats.balanceAffinity += 2; gameState.inventory.push('ancient-knowledge'); } },
      { id: 'ask-elder', text: 'Tanyakan pada tetua tentang rahasia kekuatan IceWing', nextScene: 'iceCavernsElder', effect: () => { gameState.stats.iceWingAffinity += 1; } }
    ],
    background: 'ice-caverns-hidden-bg',
    music: 'mystery-theme'
  },
  iceCavernsTraining: {
    title: "Pelatihan Kekuatan Es",
    description: "<p>Selama berhari-hari, Lawless berlatih di bawah bimbingan tetua IceWing. Dia belajar mengendalikan napas es dengan presisi tinggi, membentuk es menjadi berbagai bentuk, dan bertahan di suhu ekstrem.</p><p>Kekuatan IceWing dalam dirinya tumbuh pesat, membuatnya mampu menciptakan badai es mini dan membekukan objek dari jarak jauh.</p><p>\"Kau telah menguasai dasar-dasar kekuatan IceWing,\" kata sang tetua. \"Sekarang saatnya menghadapi ujian terakhir.\"</p>",
    choices: [
      { id: 'take-test', text: 'Hadapi ujian terakhir', nextScene: 'iceCavernsFinalTest', effect: () => { gameState.stats.iceWingAffinity += 2; } }
    ],
    background: 'ice-training-bg',
    music: 'training-theme'
  },
  iceCavernsCrystal: {
    title: "Pencarian Kristal Es",
    description: "<p>Dengan petunjuk dari tetua, Lawless menjelajahi lebih dalam ke gua es. Setelah melewati berbagai rintangan dan teka-teki, dia menemukan ruangan tersembunyi.</p><p>Di tengah ruangan, melayang kristal es biru yang berkilauan. Energi dingin memancar darinya, membuat udara bergetar.</p><p>Saat Lawless mendekati kristal, dia merasakan kekuatan es dalam dirinya beresonansi dengan kristal tersebut.</p>",
    choices: [
      { id: 'take-crystal', text: 'Ambil kristal es', nextScene: 'iceCavernsEnding', effect: () => { gameState.stats.iceWingAffinity += 1; gameState.inventory.push('ice-crystal'); } },
      { id: 'study-crystal', text: 'Pelajari kristal tanpa mengambilnya', nextScene: 'iceCavernsEnding', effect: () => { gameState.stats.balanceAffinity += 2; gameState.inventory.push('ice-knowledge'); } }
    ],
    background: 'ice-crystal-chamber-bg',
    music: 'discovery-theme'
  },
  iceCavernsHistory: {
    title: "Sejarah IceWing Kuno",
    description: "<p>Lawless menghabiskan waktu mempelajari lukisan-lukisan kuno. Dia menemukan bahwa IceWing dulunya adalah penjaga keseimbangan musim di Pyrrhia, dengan kemampuan untuk membawa musim dingin dan mengakhirinya.</p><p>Lukisan juga menunjukkan hubungan kuno antara IceWing dan SeaWing, yang dulunya bekerja sama menjaga keseimbangan air di dunia - dalam bentuk es dan laut.</p><p>Pengetahuan ini membuka perspektif baru tentang warisan Lawless sebagai hibrida.</p>",
    choices: [
      { id: 'continue-journey', text: 'Lanjutkan perjalanan dengan pengetahuan baru', nextScene: 'iceCavernsEnding', effect: () => { gameState.stats.balanceAffinity += 2; } }
    ],
    background: 'ice-history-bg',
    music: 'revelation-theme'
  },
  iceCavernsElder: {
    title: "Rahasia dari Tetua",
    description: "<p>Tetua IceWing membagikan rahasia kuno tentang kekuatan es. Dia menjelaskan bahwa kekuatan sejati IceWing bukan hanya kemampuan membekukan, tapi juga kebijaksanaan untuk tahu kapan menggunakan kekuatan tersebut.</p><p>\"Es bisa menjadi pelindung atau penghancur,\" katanya. \"Sama seperti air bisa menyembuhkan atau menenggelamkan. Sebagai hibrida, kau memiliki potensi untuk memahami keseimbangan ini lebih baik dari siapapun.\"</p>",
    choices: [
      { id: 'accept-wisdom', text: 'Terima kebijaksanaan dan lanjutkan perjalanan', nextScene: 'iceCavernsEnding', effect: () => { gameState.stats.iceWingAffinity += 1; gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'ice-elder-bg',
    music: 'wisdom-theme'
  },
  iceCavernsFinalTest: {
    title: "Ujian Terakhir",
    description: "<p>Tetua membawa Lawless ke ruangan es terdalam. Di sana, Lawless harus bertahan dalam badai es magis selama satu malam penuh, menggunakan semua yang telah dipelajarinya.</p><p>Selama ujian, Lawless menemukan bahwa kunci untuk bertahan bukan hanya kekuatan, tapi juga adaptasi dan ketenangan pikiran.</p><p>Saat fajar, badai mereda. Lawless telah lulus ujian, tubuhnya kini diselimuti aura es biru yang samar.</p>",
    choices: [
      { id: 'complete-training', text: 'Selesaikan pelatihan dan tinggalkan gua', nextScene: 'iceCavernsEnding', effect: () => { gameState.stats.iceWingAffinity += 3; } }
    ],
    background: 'ice-storm-bg',
    music: 'triumph-theme'
  },
  iceCavernsEnding: {
    title: "Perpisahan dengan Ice Caverns",
    description: "<p>Dengan pengalaman dan pengetahuan baru, Lawless bersiap meninggalkan Ice Caverns. Kekuatan es dalam dirinya kini lebih kuat dan terkendali.</p><p>Tetua IceWing memberikan berkat terakhir, menandai sisik Lawless dengan simbol IceWing kuno yang bersinar dalam gelap.</p><p>\"Perjalananmu belum berakhir, Hibrida. Dua dunia lain menunggumu untuk dijelajahi. Atau kau bisa kembali ke persimpangan dan memilih jalan yang berbeda.\"</p>",
    choices: [
      { id: 'return-crossroads', text: 'Kembali ke persimpangan tiga dunia', nextScene: 'opening', effect: () => { gameState.visitedLocations.push('ice-caverns'); } },
      { id: 'continue-azure', text: 'Lanjut ke Azure Depths', nextScene: 'azureDepths1', effect: () => { gameState.visitedLocations.push('ice-caverns'); } },
      { id: 'continue-crystal', text: 'Lanjut ke Crystal Nexus', nextScene: 'crystalNexus1', effect: () => { gameState.visitedLocations.push('ice-caverns'); } }
    ],
    background: 'ice-caverns-exit-bg',
    music: 'journey-theme',
    checkEnding: true
  },
  
  // Azure Depths Path
  azureDepths1: {
    title: "Azure Depths: Kedalaman Misterius",
    description: "<p>Lawless menyelam ke dalam perairan biru Azure Depths. Semakin dalam, air semakin gelap, namun bioluminesensi alami di sisiknya mulai bersinar, menerangi jalan.</p><p>Tak lama, dia bertemu sekelompok SeaWing yang sedang berlatih komunikasi Aquatic - bahasa isyarat khusus menggunakan pola cahaya di sisik mereka.</p>",
    choices: [
      { id: 'join-training', text: 'Bergabung dengan pelatihan Aquatic', nextScene: 'azureDepths2A', effect: () => { gameState.stats.seaWingAffinity += 2; } },
      { id: 'explore-ruins', text: 'Jelajahi reruntuhan kuno di kejauhan', nextScene: 'azureDepths2B', effect: () => { gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'azure-depths-bg',
    music: 'ocean-theme'
  },
  azureDepths2A: {
    title: "Bahasa Cahaya",
    description: "<p>Lawless bergabung dengan kelompok SeaWing, mencoba menguasai bahasa Aquatic. Awalnya sulit, karena sebagai hibrida, pola bioluminesensi di sisiknya berbeda.</p><p>Namun, dengan ketekunan, dia mulai menguasai dasar-dasar komunikasi. Para SeaWing terkesan dengan kemampuan adaptasinya.</p><p>\"Kau memiliki bakat alami,\" kata pemimpin kelompok. \"Dengan latihan lebih lanjut, kau bisa menjadi penerjemah antara IceWing dan SeaWing. Atau, kau bisa bergabung dengan ekspedisi kami ke reruntuhan kota kuno.\"</p>",
    choices: [
      { id: 'advanced-training', text: 'Lanjutkan pelatihan Aquatic tingkat lanjut', nextScene: 'azureDepthsAdvancedAquatic', effect: () => { gameState.stats.seaWingAffinity += 3; } },
      { id: 'join-expedition', text: 'Bergabung dengan ekspedisi ke kota kuno', nextScene: 'azureDepthsExpedition', effect: () => { gameState.stats.seaWingAffinity += 1; gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'azure-training-bg',
    music: 'ocean-theme'
  },
  azureDepths2B: {
    title: "Reruntuhan Misterius",
    description: "<p>Lawless berenang menjauh dari kelompok SeaWing, tertarik pada struktur bangunan kuno yang tampak di kejauhan. Saat mendekati, dia melihat reruntuhan kota bawah laut yang megah dengan arsitektur yang menggabungkan elemen SeaWing dan peradaban lain yang tidak dikenalnya.</p><p>Di tengah reruntuhan, sebuah kuil kuno dengan simbol-simbol aneh bercahaya lemah. Seorang SeaWing tua dengan sisik kebiruan mengamati Lawless dari kejauhan.</p>",
    choices: [
      { id: 'explore-temple', text: 'Jelajahi kuil kuno', nextScene: 'azureDepthsTemple', effect: () => { gameState.stats.balanceAffinity += 2; } },
      { id: 'approach-elder', text: 'Dekati SeaWing tua', nextScene: 'azureDepthsSeaWingElder', effect: () => { gameState.stats.seaWingAffinity += 1; } }
    ],
    background: 'azure-ruins-bg',
    music: 'mystery-theme'
  },
  azureDepthsAdvancedAquatic: {
    title: "Penguasaan Bahasa Cahaya",
    description: "<p>Selama berminggu-minggu, Lawless berlatih intensif dengan para ahli Aquatic. Dia belajar nuansa halus dari bahasa cahaya, termasuk dialek rahasia yang hanya diketahui oleh keluarga kerajaan SeaWing.</p><p>Bioluminesensi di sisiknya semakin kuat dan terkontrol, memungkinkannya berkomunikasi dengan presisi tinggi bahkan dalam kegelapan total.</p><p>\"Kau telah mencapai level yang biasanya hanya dikuasai oleh SeaWing murni,\" puji instrukturnya. \"Saatnya untuk ujian akhir di Abyss Chamber.\"</p>",
    choices: [
      { id: 'take-test', text: 'Hadapi ujian di Abyss Chamber', nextScene: 'azureDepthsFinalTest', effect: () => { gameState.stats.seaWingAffinity += 2; } }
    ],
    background: 'azure-advanced-bg',
    music: 'deep-ocean-theme'
  },
  azureDepthsExpedition: {
    title: "Ekspedisi ke Kota Tenggelam",
    description: "<p>Lawless bergabung dengan tim eksplorasi SeaWing yang menjelajahi reruntuhan kota kuno. Mereka menemukan artefak dan tulisan yang menunjukkan bahwa kota ini dulunya adalah pusat perdagangan antara SeaWing dan spesies laut lainnya.</p><p>Di jantung kota, tim menemukan ruangan tersegel dengan pintu yang dihiasi simbol-simbol aneh. Para ahli SeaWing bingung dengan tulisan di pintu tersebut.</p><p>Lawless, dengan pengetahuan hibrida-nya, mengenali beberapa simbol yang mirip dengan tulisan IceWing kuno.</p>",
    choices: [
      { id: 'decipher-door', text: 'Coba terjemahkan tulisan di pintu', nextScene: 'azureDepthsSecretChamber', effect: () => { gameState.stats.balanceAffinity += 2; gameState.inventory.push('ancient-key'); } },
      { id: 'search-elsewhere', text: 'Cari petunjuk di bagian lain kota', nextScene: 'azureDepthsArtifact', effect: () => { gameState.stats.seaWingAffinity += 1; } }
    ],
    background: 'sunken-city-bg',
    music: 'exploration-theme'
  },
  azureDepthsTemple: {
    title: "Kuil Peramal Laut",
    description: "<p>Lawless memasuki kuil kuno yang ternyata adalah tempat suci para Peramal Laut - SeaWing dengan kemampuan melihat masa depan melalui arus laut.</p><p>Dinding kuil dipenuhi lukisan dan ramalan, banyak di antaranya menggambarkan pertemuan es dan air - mungkin pertanda tentang hibrida seperti Lawless.</p><p>Di tengah kuil, sebuah kolam berisi air yang berpendar dengan warna-warni misterius.</p>",
    choices: [
      { id: 'touch-pool', text: 'Sentuh air di kolam ramalan', nextScene: 'azureDepthsVision', effect: () => { gameState.stats.balanceAffinity += 3; gameState.inventory.push('prophetic-vision'); } }
    ],
    background: 'seers-temple-bg',
    music: 'mystical-theme'
  },
  azureDepthsSeaWingElder: {
    title: "Penjaga Sejarah",
    description: "<p>SeaWing tua itu memperkenalkan diri sebagai Coral, salah satu Penjaga Sejarah tertua. Dia telah mengamati Lawless sejak kedatangannya di Azure Depths.</p><p>\"Kehadiranmu di sini bukan kebetulan, Hibrida,\" katanya. \"Leluhur kami meramalkan kedatangan seekor naga yang membawa es dan air dalam darahnya, yang akan memainkan peran penting dalam takdir kedua kerajaan.\"</p><p>Coral menawarkan untuk membagikan pengetahuan kuno tentang asal-usul SeaWing dan hubungan rahasia mereka dengan IceWing.</p>",
    choices: [
      { id: 'learn-history', text: 'Pelajari sejarah dari Coral', nextScene: 'azureDepthsHistory', effect: () => { gameState.stats.seaWingAffinity += 1; gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'coral-chamber-bg',
    music: 'wisdom-theme'
  },
  azureDepthsFinalTest: {
    title: "Ujian Abyss Chamber",
    description: "<p>Lawless dibawa ke Abyss Chamber - sebuah gua laut dalam yang gelap gulita. Di sini, dia harus berkomunikasi menggunakan Aquatic dalam kegelapan total, mengandalkan sepenuhnya pada bioluminesensi.</p><p>Ujian melibatkan negosiasi kompleks dengan makhluk laut purba yang hanya memahami dialek Aquatic kuno.</p><p>Dengan konsentrasi penuh, Lawless berhasil menyelesaikan ujian, mendapatkan rasa hormat dari seluruh komunitas SeaWing.</p>",
    choices: [
      { id: 'complete-training', text: 'Terima pengakuan dan tinggalkan Abyss Chamber', nextScene: 'azureDepthsEnding', effect: () => { gameState.stats.seaWingAffinity += 3; } }
    ],
    background: 'abyss-chamber-bg',
    music: 'triumph-theme'
  },
  azureDepthsSecretChamber: {
    title: "Ruangan Tersembunyi",
    description: "<p>Berkat pemahaman uniknya tentang simbol IceWing dan SeaWing, Lawless berhasil membuka pintu tersegel. Tim ekspedisi takjub saat pintu terbuka, menampakkan ruangan yang dipenuhi kristal bercahaya.</p><p>Ruangan itu ternyata adalah perpustakaan kuno yang berisi gulungan dan artefak yang mendokumentasikan aliansi kuno antara IceWing dan SeaWing - sejarah yang telah lama dilupakan oleh kedua suku.</p><p>Lawless menemukan peta yang menunjukkan lokasi Crystal Nexus, tempat kedua suku dulunya bertemu dan bertukar pengetahuan.</p>",
    choices: [
      { id: 'study-scrolls', text: 'Pelajari gulungan kuno', nextScene: 'azureDepthsEnding', effect: () => { gameState.stats.balanceAffinity += 3; gameState.inventory.push('ancient-alliance-knowledge'); } }
    ],
    background: 'hidden-library-bg',
    music: 'discovery-theme'
  },
  azureDepthsArtifact: {
    title: "Artefak Kerajaan",
    description: "<p>Menjelajahi bagian lain kota, Lawless menemukan reruntuhan istana dengan simbol kerajaan SeaWing. Di dalam ruang tahta yang runtuh, dia menemukan trident kristal yang masih memancarkan energi magis.</p><p>Para ahli SeaWing menjelaskan bahwa trident ini adalah senjata kerajaan yang hilang, yang konon memiliki kemampuan untuk mengendalikan arus laut dan menciptakan badai.</p><p>Saat Lawless menyentuh trident, energi air di sekitarnya beresonansi dengan kekuatannya.</p>",
    choices: [
      { id: 'claim-trident', text: 'Klaim trident sebagai penemuan', nextScene: 'azureDepthsEnding', effect: () => { gameState.stats.seaWingAffinity += 2; gameState.inventory.push('sea-trident'); } }
    ],
    background: 'throne-room-bg',
    music: 'royal-theme'
  },
  azureDepthsVision: {
    title: "Penglihatan Masa Depan",
    description: "<p>Saat Lawless menyentuh air di kolam ramalan, kesadarannya dibawa ke dimensi lain. Dia melihat serangkaian visi tentang masa depan - konflik antara IceWing dan SeaWing, bencana alam yang mengancam kedua kerajaan, dan peran krusial yang akan dimainkan oleh seekor hibrida.</p><p>Visi terakhir menunjukkan Crystal Nexus yang bersinar terang, menjadi jembatan perdamaian antara dua dunia.</p><p>Saat kesadarannya kembali, Lawless menemukan pola sisiknya telah berubah, kini menampilkan simbol peramal yang bercahaya samar.</p>",
    choices: [
      { id: 'embrace-vision', text: 'Terima takdir dari penglihatan', nextScene: 'azureDepthsEnding', effect: () => { gameState.stats.balanceAffinity += 3; gameState.inventory.push('seer-mark'); } }
    ],
    background: 'vision-realm-bg',
    music: 'prophecy-theme'
  },
  azureDepthsHistory: {
    title: "Sejarah yang Terlupakan",
    description: "<p>Coral membagikan kisah kuno tentang asal-usul SeaWing dan hubungan mereka dengan IceWing. Ternyata, kedua suku dulunya adalah satu keluarga yang terpecah akibat perselisihan kuno.</p><p>\"Es dan air bukanlah elemen yang bertentangan, melainkan dua wujud dari substansi yang sama,\" jelas Coral. \"Hibrida sepertimu adalah bukti bahwa kedua suku masih bisa bersatu.\"</p><p>Coral memberikan Lawless sebuah liontin kuno berbentuk tetesan air yang membeku menjadi kristal - simbol persatuan kedua suku.</p>",
    choices: [
      { id: 'accept-pendant', text: 'Terima liontin dan pengetahuan', nextScene: 'azureDepthsEnding', effect: () => { gameState.stats.seaWingAffinity += 1; gameState.stats.balanceAffinity += 2; gameState.inventory.push('unity-pendant'); } }
    ],
    background: 'coral-chamber-bg',
    music: 'ancient-tale-theme'
  },
  azureDepthsEnding: {
    title: "Perpisahan dengan Azure Depths",
    description: "<p>Dengan pengalaman dan pengetahuan baru, Lawless bersiap meninggalkan Azure Depths. Kemampuan SeaWing dalam dirinya kini lebih kuat, memungkinkannya mengendalikan air dan berkomunikasi dengan makhluk laut.</p><p>Para SeaWing memberikan berkat terakhir, menandai sisik Lawless dengan pola bioluminesensi khusus yang menandakan status terhormat.</p><p>\"Perjalananmu masih berlanjut, Hibrida. Dua dunia lain menunggumu untuk dijelajahi. Atau kau bisa kembali ke persimpangan dan memilih jalan yang berbeda.\"</p>",
    choices: [
      { id: 'return-crossroads', text: 'Kembali ke persimpangan tiga dunia', nextScene: 'opening', effect: () => { gameState.visitedLocations.push('azure-depths'); } },
      { id: 'continue-ice', text: 'Lanjut ke Ice Caverns', nextScene: 'iceCaverns1', effect: () => { gameState.visitedLocations.push('azure-depths'); } },
      { id: 'continue-crystal', text: 'Lanjut ke Crystal Nexus', nextScene: 'crystalNexus1', effect: () => { gameState.visitedLocations.push('azure-depths'); } }
    ],
    background: 'azure-depths-exit-bg',
    music: 'journey-theme',
    checkEnding: true
  },
  
  // Crystal Nexus Path
  crystalNexus1: {
    title: "Crystal Nexus: Pertemuan Dua Dunia",
    description: "<p>Lawless memasuki Crystal Nexus, tempat di mana energi es dan air bertemu dalam harmoni sempurna. Kristal-kristal raksasa memancarkan cahaya biru-kehijauan yang menenangkan.</p><p>Di tengah Nexus, terdapat altar kristal dengan dua simbol yang saling terhubung - emblem IceWing dan SeaWing yang membentuk lingkaran sempurna.</p>",
    choices: [
      { id: 'touch-altar', text: 'Sentuh altar kristal', nextScene: 'crystalNexus2A', effect: () => { gameState.stats.balanceAffinity += 2; } },
      { id: 'explore-nexus', text: 'Jelajahi area sekitar Nexus', nextScene: 'crystalNexus2B', effect: () => { gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'crystal-nexus-bg',
    music: 'harmony-theme'
  },
  crystalNexus2A: {
    title: "Resonansi Kristal",
    description: "<p>Saat Lawless menyentuh altar, kristal-kristal di sekitarnya mulai beresonansi dengan energi dalam tubuhnya. Cahaya biru es dan hijau laut berputar di sekitarnya, membentuk aura yang menyatu.</p><p>Visi-visi tentang masa lalu Crystal Nexus muncul dalam benaknya - tempat ini dulunya adalah pusat pertemuan dan pertukaran pengetahuan antara IceWing dan SeaWing.</p><p>Sebuah suara tanpa wujud berbisik dalam pikirannya, \"Kau telah kembali, Pembawa Keseimbangan. Pilih jalanmu.\"</p>",
    choices: [
      { id: 'embrace-balance', text: 'Terima peran sebagai Pembawa Keseimbangan', nextScene: 'crystalNexusBalance', effect: () => { gameState.stats.balanceAffinity += 3; } },
      { id: 'question-voice', text: 'Tanyakan tentang identitas suara misterius', nextScene: 'crystalNexusGuardian', effect: () => { gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'crystal-altar-bg',
    music: 'mystical-theme'
  },
  crystalNexus2B: {
    title: "Lorong Tersembunyi",
    description: "<p>Alih-alih langsung ke altar, Lawless memilih untuk menjelajahi area sekitar. Dia menemukan lorong tersembunyi di balik formasi kristal yang mengarah ke ruangan rahasia.</p><p>Ruangan itu berisi perpustakaan kuno dengan gulungan dan artefak yang menggambarkan sejarah hubungan IceWing dan SeaWing, serta ramalan tentang hibrida yang akan menyatukan kedua dunia.</p><p>Di tengah ruangan, terdapat dua kristal yang melayang - satu berwarna biru es, satu berwarna biru laut.</p>",
    choices: [
      { id: 'take-ice-crystal', text: 'Ambil kristal es', nextScene: 'crystalNexusIcePower', effect: () => { gameState.stats.iceWingAffinity += 2; gameState.inventory.push('ice-nexus-crystal'); } },
      { id: 'take-sea-crystal', text: 'Ambil kristal laut', nextScene: 'crystalNexusSeaPower', effect: () => { gameState.stats.seaWingAffinity += 2; gameState.inventory.push('sea-nexus-crystal'); } },
      { id: 'merge-crystals', text: 'Satukan kedua kristal', nextScene: 'crystalNexusBalance', effect: () => { gameState.stats.balanceAffinity += 3; gameState.inventory.push('unified-crystal'); } }
    ],
    background: 'hidden-library-bg',
    music: 'discovery-theme'
  },
  crystalNexusBalance: {
    title: "Jalan Keseimbangan",
    description: "<p>Lawless memilih jalan keseimbangan, menerima warisan uniknya sebagai hibrida. Energi es dan air dalam tubuhnya mulai menyatu dalam harmoni sempurna.</p><p>Kristal-kristal di sekitarnya beresonansi, membentuk jembatan energi yang menghubungkan altar dengan langit-langit Nexus. Cahaya biru-kehijauan memenuhi ruangan.</p><p>Pengetahuan kuno mengalir ke dalam pikiran Lawless - teknik-teknik untuk menggabungkan kekuatan es dan air, menciptakan kemampuan baru yang tidak dimiliki oleh IceWing atau SeaWing murni.</p>",
    choices: [
      { id: 'complete-ritual', text: 'Selesaikan ritual keseimbangan', nextScene: 'crystalNexusEnding', effect: () => { gameState.stats.balanceAffinity += 3; gameState.inventory.push('balance-mark'); } }
    ],
    background: 'energy-bridge-bg',
    music: 'transcendence-theme'
  },
  crystalNexusGuardian: {
    title: "Penjaga Nexus",
    description: "<p>\"Aku adalah Penjaga Crystal Nexus,\" jawab suara itu, kini mengambil wujud naga transparan dengan sisik yang berkilauan seperti kristal. \"Aku telah menunggu kedatangan hibrida yang akan menyeimbangkan kembali dua dunia.\"</p><p>Penjaga menjelaskan bahwa konflik antara IceWing dan SeaWing telah menciptakan ketidakseimbangan yang mengancam kedua kerajaan. Hanya hibrida dengan darah kedua suku yang dapat memperbaiki keseimbangan ini.</p><p>\"Kau memiliki pilihan, Lawless. Kau bisa menjadi jembatan antara dua dunia, atau memilih salah satu jalan.\"</p>",
    choices: [
      { id: 'become-bridge', text: 'Menjadi jembatan antara dua dunia', nextScene: 'crystalNexusEnding', effect: () => { gameState.stats.balanceAffinity += 3; gameState.inventory.push('guardian-blessing'); } },
      { id: 'ask-more', text: 'Tanyakan lebih banyak tentang sejarah konflik', nextScene: 'crystalNexusHistory', effect: () => { gameState.stats.balanceAffinity += 1; } }
    ],
    background: 'guardian-bg',
    music: 'ancient-voice-theme'
  },
  crystalNexusIcePower: {
    title: "Kekuatan Es Murni",
    description: "<p>Saat Lawless mengambil kristal es, energi dingin menyebar ke seluruh tubuhnya. Sisik-sisiknya berubah menjadi lebih biru, dengan pola es yang indah.</p><p>Pengetahuan dan teknik IceWing kuno mengalir ke dalam pikirannya - cara-cara untuk mengendalikan es dan dingin yang bahkan tidak diketahui oleh IceWing modern.</p><p>Namun, dia merasakan bagian SeaWing dalam dirinya memudar, seolah kristal ini mendorongnya untuk memilih satu identitas.</p>",
    choices: [
      { id: 'embrace-ice', text: 'Terima kekuatan es sepenuhnya', nextScene: 'crystalNexusEnding', effect: () => { gameState.stats.iceWingAffinity += 3; gameState.inventory.push('ice-master-mark'); } },
      { id: 'seek-balance', text: 'Cari cara menyeimbangkan kembali energi dalam diri', nextScene: 'crystalNexusBalance', effect: () => { gameState.stats.balanceAffinity += 2; } }
    ],
    background: 'ice-power-bg',
    music: 'frost-theme'
  },
  crystalNexusSeaPower: {
    title: "Kekuatan Laut Murni",
    description: "<p>Saat Lawless mengambil kristal laut, energi air menyebar ke seluruh tubuhnya. Sisik-sisiknya berubah menjadi lebih hijau-kebiruan, dengan pola bioluminesensi yang lebih kuat.</p><p>Pengetahuan dan teknik SeaWing kuno mengalir ke dalam pikirannya - cara-cara untuk mengendalikan air dan berkomunikasi dengan makhluk laut yang bahkan tidak diketahui oleh SeaWing modern.</p><p>Namun, dia merasakan bagian IceWing dalam dirinya memudar, seolah kristal ini mendorongnya untuk memilih satu identitas.</p>",
    choices: [
      { id: 'embrace-sea', text: 'Terima kekuatan laut sepenuhnya', nextScene: 'crystalNexusEnding', effect: () => { gameState.stats.seaWingAffinity += 3; gameState.inventory.push('sea-master-mark'); } },
      { id: 'seek-balance', text: 'Cari cara menyeimbangkan kembali energi dalam diri', nextScene: 'crystalNexusBalance', effect: () => { gameState.stats.balanceAffinity += 2; } }
    ],
    background: 'sea-power-bg',
    music: 'ocean-depth-theme'
  },
  crystalNexusHistory: {
    title: "Sejarah Konflik Kuno",
    description: "<p>Penjaga Nexus membagikan sejarah panjang tentang konflik antara IceWing dan SeaWing. Dulunya, kedua suku adalah sekutu yang kuat, saling melengkapi dengan kekuatan es dan air mereka.</p><p>Namun, perselisihan atas kristal kekuatan di Crystal Nexus memecah aliansi mereka. Kedua suku mengklaim hak atas kristal, yang akhirnya pecah menjadi dua - satu bagian dibawa ke Ice Caverns, satu lagi ke Azure Depths.</p><p>\"Ramalan mengatakan bahwa hanya ketika kristal disatukan kembali oleh darah kedua suku, keseimbangan akan pulih. Kau, Lawless, adalah penggenap ramalan itu.\"</p>",
    choices: [
      { id: 'accept-destiny', text: 'Terima takdir sebagai penggenap ramalan', nextScene: 'crystalNexusEnding', effect: () => { gameState.stats.balanceAffinity += 3; gameState.inventory.push('prophecy-fulfiller'); } }
    ],
    background: 'history-vision-bg',
    music: 'ancient-tale-theme'
  },
  crystalNexusEnding: {
    title: "Keputusan di Crystal Nexus",
    description: "<p>Dengan keputusan yang telah dibuat, Lawless merasakan perubahan dalam dirinya. Kekuatan barunya mengalir, membentuk identitas baru yang sesuai dengan pilihan yang telah dia ambil.</p><p>Crystal Nexus bersinar merespons transformasinya, seolah tempat ini sendiri mengakui perjalanan dan keputusannya.</p><p>\"Perjalananmu telah membentukmu, Lawless,\" bisik Penjaga Nexus. \"Sekarang saatnya kau menentukan akhir ceritamu.\"</p>",
    choices: [
      { id: 'return-crossroads', text: 'Kembali ke persimpangan tiga dunia', nextScene: 'opening', effect: () => { gameState.visitedLocations.push('crystal-nexus'); } },
      { id: 'continue-ice', text: 'Lanjut ke Ice Caverns', nextScene: 'iceCaverns1', effect: () => { gameState.visitedLocations.push('crystal-nexus'); } },
      { id: 'continue-azure', text: 'Lanjut ke Azure Depths', nextScene: 'azureDepths1', effect: () => { gameState.visitedLocations.push('crystal-nexus'); } },
      { id: 'complete-journey', text: 'Selesaikan perjalanan', nextScene: 'finalEnding', effect: () => { gameState.visitedLocations.push('crystal-nexus'); gameState.gameEnded = true; } }
    ],
    background: 'crystal-nexus-exit-bg',
    music: 'journey-theme',
    checkEnding: true
  },
  
  // Final Endings based on player choices
  finalEnding: {
    title: "Akhir Perjalanan",
    description: "<p>Lawless telah menyelesaikan perjalanannya melalui tiga dunia. Pengalaman dan pilihan yang telah dia buat telah membentuk identitasnya.</p><p>Saatnya untuk melihat siapa Lawless sebenarnya...</p>",
    choices: [
      { id: 'see-ending', text: 'Lihat Ending', nextScene: 'showEnding', effect: () => {} }
    ],
    background: 'journey-end-bg',
    music: 'finale-theme'
  },
  showEnding: {
    title: "Takdir Lawless",
    description: "", // Will be dynamically set based on player choices
    choices: [
      { id: 'restart', text: 'Mulai Ulang Petualangan', nextScene: 'opening', effect: () => { resetGame(); } }
    ],
    background: 'ending-bg',
    music: 'ending-theme'
  }
};

// Game mechanics functions

// Initialize the game UI
function initGame() {
  // Create game container
  const loreSection = document.getElementById('lore');
  const loreContainer = loreSection.querySelector('.lore-container');
  
  // Clear existing content
  loreContainer.innerHTML = '';
  
  // Create game UI elements
  const gameUI = document.createElement('div');
  gameUI.className = 'story-game';
  gameUI.innerHTML = `
    <h2>Dunia Lawless</h2>
    <div class="game-container">
      <div class="game-header">
        <div class="stats-container">
          <div class="stat">
            <div class="stat-label">IceWing</div>
            <div class="stat-bar">
              <div class="stat-fill ice-stat" style="width: 0%"></div>
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">SeaWing</div>
            <div class="stat-bar">
              <div class="stat-fill sea-stat" style="width: 0%"></div>
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Balance</div>
            <div class="stat-bar">
              <div class="stat-fill balance-stat" style="width: 0%"></div>
            </div>
          </div>
        </div>
        <div class="inventory-container">
          <button class="inventory-button">Inventory</button>
          <div class="inventory-panel"></div>
        </div>
      </div>
      <div class="scene-container">
        <div class="scene-background"></div>
        <div class="scene-content">
          <h3 class="scene-title"></h3>
          <div class="scene-description"></div>
          <div class="choices-container"></div>
        </div>
      </div>
      <div class="game-footer">
        <div class="audio-controls">
          <button class="music-toggle">🔊 Music: ON</button>
        </div>
      </div>
    </div>
  `;
  
  loreContainer.appendChild(gameUI);
  
  // Add event listeners
  const inventoryButton = document.querySelector('.inventory-button');
  const inventoryPanel = document.querySelector('.inventory-panel');
  const musicToggle = document.querySelector('.music-toggle');
  
  inventoryButton.addEventListener('click', () => {
    inventoryPanel.classList.toggle('show');
    updateInventory();
  });
  
  musicToggle.addEventListener('click', () => {
    toggleMusic();
    updateMusicToggleButton();
    playSound('click');
  });
  
  // Initialize game state
  resetGame();
  
  // Start with music playing
  isMusicPlaying = true;
  
  // Start the game
  loadScene('opening');
  gameState.gameStarted = true;
}

// Load a scene based on its ID
function loadScene(sceneId) {
  const scene = storyData[sceneId];
  if (!scene) return;
  
  gameState.currentScene = sceneId;
  
  // Play transition sound effect when changing scenes
  playSound('transition');
  
  // Update UI elements
  const sceneTitle = document.querySelector('.scene-title');
  const sceneDescription = document.querySelector('.scene-description');
  const choicesContainer = document.querySelector('.choices-container');
  const sceneBackground = document.querySelector('.scene-background');
  
  // Set scene content
  sceneTitle.textContent = scene.title;
  sceneDescription.innerHTML = scene.description;
  
  // Change background with animation
  sceneBackground.style.opacity = 0;
  setTimeout(() => {
    sceneBackground.className = 'scene-background';
    if (scene.background) {
      sceneBackground.classList.add(scene.background);
    }
    sceneBackground.style.opacity = 1;
  }, 300);
  
  // Play scene music
  if (scene.music && scene.music !== currentMusic) {
    playMusic(scene.music);
  }
  
  // Clear choices
  choicesContainer.innerHTML = '';
  
  // Special case for ending scene
  if (sceneId === 'showEnding') {
    const endingText = determineEnding();
    sceneDescription.innerHTML = endingText;
  }
  
  // Add choices
  scene.choices.forEach(choice => {
    const choiceButton = document.createElement('button');
    choiceButton.className = 'choice-button';
    choiceButton.textContent = choice.text;
    choiceButton.addEventListener('click', () => {
      // Play click sound when making a choice
      playSound('click');
      makeChoice(choice);
    });
    choicesContainer.appendChild(choiceButton);
  });
  
  // Check if we should check for ending
  if (scene.checkEnding && hasVisitedAllLocations()) {
    const completeJourneyChoice = scene.choices.find(c => c.id === 'complete-journey');
    if (completeJourneyChoice) {
      const completeButton = document.querySelector('.choice-button:last-child');
      completeButton.classList.add('special-choice');
    }
  }
  
  // Animate scene transition
  gsap.fromTo(
    '.scene-content',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
  );
  
  // Animate choices appearance
  gsap.fromTo(
    '.choice-button',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.5 }
  );
}

// Handle player choice
function makeChoice(choice) {
  // Record the choice
  gameState.playerChoices.push(choice.id);
  
  // Apply choice effects
  if (choice.effect) {
    choice.effect();
  }
  
  // Update stats display
  updateStats();
  
  // Load the next scene
  loadScene(choice.nextScene);
}

// Update the stats display
function updateStats() {
  const iceStatFill = document.querySelector('.ice-stat');
  const seaStatFill = document.querySelector('.sea-stat');
  const balanceStatFill = document.querySelector('.balance-stat');
  
  // Calculate percentages (max 10 points = 100%)
  const icePercent = Math.min(gameState.stats.iceWingAffinity * 10, 100);
  const seaPercent = Math.min(gameState.stats.seaWingAffinity * 10, 100);
  const balancePercent = Math.min(gameState.stats.balanceAffinity * 10, 100);
  
  // Animate stat bars
  gsap.to(iceStatFill, { width: `${icePercent}%`, duration: 0.5, ease: 'power2.out' });
  gsap.to(seaStatFill, { width: `${seaPercent}%`, duration: 0.5, ease: 'power2.out' });
  gsap.to(balanceStatFill, { width: `${balancePercent}%`, duration: 0.5, ease: 'power2.out' });
}

// Update inventory display
function updateInventory() {
  const inventoryPanel = document.querySelector('.inventory-panel');
  inventoryPanel.innerHTML = '';
  
  if (gameState.inventory.length === 0) {
    inventoryPanel.innerHTML = '<p>No items yet.</p>';
    return;
  }
  
  const itemsList = document.createElement('ul');
  gameState.inventory.forEach(item => {
    const itemElement = document.createElement('li');
    itemElement.textContent = formatItemName(item);
    itemsList.appendChild(itemElement);
  });
  
  inventoryPanel.appendChild(itemsList);
}

// Format item name for display
function formatItemName(itemId) {
  // Convert kebab-case to Title Case with spaces
  return itemId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Check if player has visited all locations
function hasVisitedAllLocations() {
  return (
    gameState.visitedLocations.includes('ice-caverns') &&
    gameState.visitedLocations.includes('azure-depths') &&
    gameState.visitedLocations.includes('crystal-nexus')
  );
}

// Determine the ending based on player choices and stats
function determineEnding() {
  let endingText = "";
  
  // Check which affinity is highest
  const { iceWingAffinity, seaWingAffinity, balanceAffinity } = gameState.stats;
  const highestStat = Math.max(iceWingAffinity, seaWingAffinity, balanceAffinity);
  
  if (balanceAffinity >= highestStat && balanceAffinity > 5) {
    // Balance Ending
    endingText = `<h3>Penjaga Keseimbangan</h3>
      <p>Lawless telah menemukan keseimbangan sempurna antara warisan IceWing dan SeaWing-nya. Dia menjadi Penjaga Crystal Nexus yang baru, menjembatani dua dunia yang telah lama terpisah.</p>
      <p>Dengan kemampuan uniknya untuk mengendalikan es dan air sekaligus, Lawless menciptakan era baru perdamaian dan kerja sama antara IceWing dan SeaWing.</p>
      <p>Kristal-kristal di Nexus bersinar lebih terang dari sebelumnya, merespons kehadiran hibrida yang telah menyatukan kembali dua elemen yang terpisah.</p>
      <p>Lawless kini dikenal sebagai "Pembawa Harmoni", legenda hidup yang membuktikan bahwa perbedaan bukanlah penghalang, melainkan sumber kekuatan.</p>`;
    // Play achievement sound when determining ending
    playSound('achievement');
    return endingText;
  } else if (iceWingAffinity >= seaWingAffinity && iceWingAffinity > 5) {
    // IceWing Ending
    endingText = `<h3>Penguasa Es</h3>
      <p>Lawless telah memilih jalan IceWing, mengembangkan kekuatan es dan dingin hingga tingkat yang belum pernah dicapai sebelumnya. Sisik-sisiknya kini berkilau dengan aura biru es yang kuat.</p>
      <p>Sebagai Penguasa Es yang baru, Lawless membawa reformasi ke kerajaan IceWing, mengajarkan teknik-teknik kuno yang telah dia pelajari selama perjalanannya.</p>
      <p>Meski masih memiliki darah SeaWing, identitas IceWing-nya kini dominan, membuatnya dihormati bahkan oleh IceWing berdarah murni.</p>
      <p>Di bawah kepemimpinannya, Ice Caverns berkembang menjadi pusat pembelajaran dan inovasi, tempat di mana tradisi kuno dan ide baru bertemu.</p>`;
    // Play achievement sound when determining ending
    playSound('achievement');
    return endingText;
  } else if (seaWingAffinity > iceWingAffinity && seaWingAffinity > 5) {
    // SeaWing Ending
    endingText = `<h3>Penguasa Lautan</h3>
      <p>Lawless telah memilih jalan SeaWing, mengembangkan kekuatan air dan komunikasi bioluminesensi hingga tingkat yang belum pernah dicapai sebelumnya. Sisik-sisiknya kini berkilau dengan pola cahaya yang kompleks.</p>
      <p>Sebagai Penguasa Lautan yang baru, Lawless membawa perubahan ke kerajaan SeaWing, menghubungkan kembali mereka dengan sejarah kuno yang telah lama dilupakan.</p>
      <p>Meski masih memiliki darah IceWing, identitas SeaWing-nya kini dominan, membuatnya dihormati bahkan oleh SeaWing berdarah murni.</p>
      <p>Di bawah pengaruhnya, Azure Depths menjadi pusat diplomasi dan pertukaran budaya, membuka hubungan baru dengan suku-suku lain di Pyrrhia.</p>`;
    // Play achievement sound when determining ending
    playSound('achievement');
    return endingText;
  } else {
    // Explorer Ending (if no clear path was chosen)
    endingText = `<h3>Penjelajah Dunia</h3>
      <p>Lawless memilih untuk tidak terikat pada satu identitas. Sebagai hibrida sejati, dia mengambil peran sebagai penjelajah dan diplomat, berkelana antara Ice Caverns, Azure Depths, dan Crystal Nexus.</p>
      <p>Dengan pemahaman unik tentang ketiga dunia, Lawless menjadi penghubung penting yang memfasilitasi komunikasi dan perdagangan antara IceWing dan SeaWing.</p>
      <p>Kisah petualangannya menjadi legenda yang diceritakan di kedua kerajaan, menginspirasi generasi baru untuk menjembatani perbedaan dan menjelajahi dunia di luar batas tradisional mereka.</p>
      <p>Lawless kini dikenal sebagai "Sang Pengelana", figur misterius yang muncul saat dibutuhkan dan menghilang kembali ke petualangan berikutnya.</p>`;
    // Play achievement sound when determining ending
    playSound('achievement');
    return endingText;
  }
}

// Reset the game state
function resetGame() {
  gameState.currentScene = 'opening';
  gameState.playerChoices = [];
  gameState.stats = {
    iceWingAffinity: 0,
    seaWingAffinity: 0,
    balanceAffinity: 0
  };
  gameState.inventory = [];
  gameState.visitedLocations = [];
  gameState.currentPath = null;
  gameState.gameEnded = false;
  
  updateStats();
}

// Audio management
let isMusicPlaying = false;
let currentMusic = null;
let audioElements = {};
let soundEffects = {};
let currentVolume = 0.7; // Default volume at 70%

// Preload all audio files
function preloadAudio() {
  // Background music tracks
  const backgroundTracks = {
    'main-theme': 'audio/background/main_theme.mp3',
    'opening-theme': 'audio/background/main_theme.mp3', // Use main theme for opening
    'ice-theme': 'audio/background/ice_caverns.mp3',
    'ocean-theme': 'audio/background/azure_depths.mp3',
    'crystal-theme': 'audio/background/crystal_nexus.mp3',
    'mystery-theme': 'audio/background/crystal_nexus.mp3', // Fallback to crystal theme
    'training-theme': 'audio/background/ice_caverns.mp3', // Fallback to ice theme
    'discovery-theme': 'audio/background/crystal_nexus.mp3', // Fallback to crystal theme
    'revelation-theme': 'audio/background/crystal_nexus.mp3', // Fallback to crystal theme
    'wisdom-theme': 'audio/background/azure_depths.mp3', // Fallback to azure theme
    'triumph-theme': 'audio/background/main_theme.mp3', // Fallback to main theme
    'journey-theme': 'audio/background/main_theme.mp3', // Fallback to main theme
    'deep-ocean-theme': 'audio/background/azure_depths.mp3', // Fallback to azure theme
    'exploration-theme': 'audio/background/azure_depths.mp3', // Fallback to azure theme
    'mystical-theme': 'audio/background/crystal_nexus.mp3' // Fallback to crystal theme
  };

  // Sound effects
  const effects = {
    'click': 'audio/effects/click.mp3',
    'transition': 'audio/effects/transition.mp3',
    'achievement': 'audio/effects/achievement.mp3'
  };

  // Preload background music
  for (const [id, path] of Object.entries(backgroundTracks)) {
    const audio = new Audio();
    audio.src = path;
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = currentVolume;
    audioElements[id] = audio;

    // Add error handling for missing files
    audio.onerror = function() {
      console.warn(`Failed to load audio file: ${path}. Using fallback.`);
      // If file doesn't exist, we'll just continue without it
      // The game will still function without audio
    };
  }

  // Preload sound effects
  for (const [id, path] of Object.entries(effects)) {
    const audio = new Audio();
    audio.src = path;
    audio.preload = 'auto';
    audio.volume = currentVolume;
    soundEffects[id] = audio;

    // Add error handling for missing files
    audio.onerror = function() {
      console.warn(`Failed to load sound effect: ${path}`);
    };
  }
}

// Play background music
function playMusic(musicId) {
  // Stop current music if playing
  if (currentMusic && audioElements[currentMusic]) {
    audioElements[currentMusic].pause();
    audioElements[currentMusic].currentTime = 0;
  }

  // Play new music if available and enabled
  if (audioElements[musicId] && isMusicPlaying) {
    try {
      audioElements[musicId].play()
        .catch(error => console.warn(`Error playing music: ${error.message}`));
      currentMusic = musicId;
    } catch (error) {
      console.warn(`Error playing music: ${error.message}`);
    }
  } else {
    currentMusic = musicId; // Still track what should be playing even if sound is off
  }
}

// Toggle music on/off
function toggleMusic() {
  isMusicPlaying = !isMusicPlaying;
  
  if (isMusicPlaying && currentMusic && audioElements[currentMusic]) {
    // Resume current music
    audioElements[currentMusic].play()
      .catch(error => console.warn(`Error resuming music: ${error.message}`));
  } else if (!isMusicPlaying && currentMusic && audioElements[currentMusic]) {
    // Pause current music
    audioElements[currentMusic].pause();
  }
  
  // Update UI to show music state
  updateMusicToggleButton();
}

// Play a sound effect once
function playSound(soundId) {
  if (soundEffects[soundId]) {
    // Clone the audio to allow overlapping sounds
    const sound = soundEffects[soundId].cloneNode();
    sound.volume = currentVolume;
    sound.play()
      .catch(error => console.warn(`Error playing sound effect: ${error.message}`));
  }
}

// Set volume for all audio
function setVolume(volume) {
  currentVolume = volume;
  
  // Update background music volume
  for (const audio of Object.values(audioElements)) {
    audio.volume = volume;
  }
  
  // Update sound effects volume
  for (const audio of Object.values(soundEffects)) {
    audio.volume = volume;
  }
}

// Update music toggle button UI
function updateMusicToggleButton() {
  const musicToggle = document.querySelector('.music-toggle');
  if (musicToggle) {
    musicToggle.innerHTML = isMusicPlaying ? '🔊 Music: ON' : '🔇 Music: OFF';
  }
}

// Initialize the game when the lore section is shown
document.addEventListener('DOMContentLoaded', () => {
  // Preload audio files as soon as the page loads
  preloadAudio();
  
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#lore') {
      link.addEventListener('click', () => {
        if (!gameState.gameStarted) {
          setTimeout(initGame, 500); // Initialize after section transition
        }
      });
    }
  });
});