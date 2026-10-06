// LocalLang Tanzania frontend interactions. Connect a real translation API before production use.
const heroSlides = [
  "image/school.jpg",
  "image/mtumiaji%20anaongea.jpg",
  "image/INAELEWA.png",
  "image/hospital.jpg",
  "image/society.jpg"
];
const heroImage = document.getElementById("heroImage");
const dots = [...document.querySelectorAll("#slideDots button")];
let slideIndex = 0;
function showSlide(index) {
  slideIndex = (index + heroSlides.length) % heroSlides.length;
  heroImage.style.backgroundImage = `url("${heroSlides[slideIndex]}")`;
  heroImage.classList.remove("is-changing");
  void heroImage.offsetWidth;
  heroImage.classList.add("is-changing");
  dots.forEach((dot, i) => dot.classList.toggle("selected", i === slideIndex));
}
showSlide(0);
let slideTimer = setInterval(() => showSlide(slideIndex + 1), 5000);
function restartSlider(index) {
  showSlide(index);
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(slideIndex + 1), 5000);
}
document.getElementById("prevSlide").addEventListener("click", () => restartSlider(slideIndex - 1));
document.getElementById("nextSlide").addEventListener("click", () => restartSlider(slideIndex + 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => restartSlider(i)));

const tribes = [
  "Sukuma","Nyamwezi","Chagga","Haya","Hehe","Gogo","Makonde","Yao","Zaramo","Ngoni",
  "Nyakyusa","Maasai","Iraqw","Datoga","Bena","King'a","Pangwa","Luguru","Kwere","Zigua",
  "Shambaa","Pare","Rangi","Mbugwe","Mambwe","Fipa","Safwa","Kaguru","Sangu","Ndali",
  "Wanji","Kisi","Matengo","Mwera","Makua","Kinga","Kutu","Vidunda","Kami","Barabaig",
  "Hadzabe","Sandawe","Kihaya","Kiha","Kichaga"
];
const tribeTrack = document.getElementById("tribeTrack");
function createTribeRow() {
  const row = document.createElement("div");
  row.className = "tribe-row";
  tribes.forEach((tribe) => {
    const chip = document.createElement("span");
    chip.className = "tribe-chip";
    chip.textContent = tribe;
    row.appendChild(chip);
  });
  return row;
}
tribeTrack.append(createTribeRow(), createTribeRow());

const professionTrack = document.getElementById("professionTrack");
const repeatedProfessionRow = professionTrack.querySelector(".profession-row").cloneNode(true);
repeatedProfessionRow.setAttribute("aria-hidden", "true");
professionTrack.appendChild(repeatedProfessionRow);

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  themeToggle.textContent = dark ? "☀" : "☾";
  applyLanguage(siteLanguage.value);
});

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
mobileMenuBtn?.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  mobileMenuBtn.setAttribute("aria-expanded", String(opened));
  mobileMenuBtn.textContent = opened ? "×" : "☰";
  mobileMenuBtn.dataset.i18nAria = opened ? "closeMenu" : "openMenu";
  applyLanguage(siteLanguage.value);
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  mobileMenuBtn.setAttribute("aria-expanded", "false");
  mobileMenuBtn.textContent = "☰";
}));

document.getElementById("swapLanguages")?.addEventListener("click", () => {
  const source = document.getElementById("sourceLanguage");
  const target = document.getElementById("targetLanguage");
  const oldSource = source.value;
  const oldTarget = target.value;
  const targetSourceOption = [...source.options].find(option => option.value === oldTarget || option.text === oldTarget);
  const sourceTargetOption = [...target.options].find(option => option.value === oldSource || option.text === oldSource);
  if (targetSourceOption) source.value = targetSourceOption.value;
  if (sourceTargetOption) target.value = sourceTargetOption.value;
});

document.getElementById("conversationForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const source = document.getElementById("sourceLanguage").value;
  const target = document.getElementById("targetLanguage").value;
  const feedback = document.getElementById("formFeedback");
  if (source === target) {
    feedback.textContent = "Tafadhali chagua lugha mbili tofauti.";
    feedback.style.color = "#d04747";
    return;
  }
  feedback.textContent = `Umechagua ${source} → ${target}. UI iko tayari; hatua inayofuata ni kuunganisha API ya tafsiri.`;
  feedback.style.color = "var(--primary)";
});

const translations = {
  sw: {
    pageTitle: "LocalLang Tanzania | Lugha Zetu, Uelewa Wetu",
    pageDescription: "LocalLang Tanzania — tafsiri lugha za asili za Tanzania kwa Kiswahili na Kiingereza kwa msaada wa AI.",
    navLabel: "Menyu kuu", brandLabel: "LocalLang Tanzania mwanzo", openMenu: "Fungua menyu", closeMenu: "Funga menyu",
    navHome: "Nyumbani", navAbout: "Kuhusu Sisi", navLanguages: "Lugha za Tanzania", navHow: "Jinsi Inavyofanya Kazi",
    languageLabel: "Chagua lugha ya tovuti", themeToggle: "Badili mwonekano wa mwanga", themeLight: "Washa mwonekano wa mwanga",
    startConversation: "Anza Mazungumzo", heroImage: "Picha zinazoonyesha matumizi ya LocalLang",
    heroEyebrow: "AI inayounganisha watu", heroTitle: "Lugha za Asili za Tanzania,<br><span>Tuzijue, Tujifunze, na Tutumie Lugha Zetu za Asili Zetu.</span>",
    heroDescription: "Wasiliana kwa lugha yako ya asili. LocalLang inakusaidia kutafsiri lugha za Tanzania kwenda Kiswahili na Kiingereza kwa urahisi.",
    heroHow: "Jinsi inavyofanya kazi", heroTrust: "Lugha zetu. Sauti zetu.", heroTrustSub: "Teknolojia kwa kila mtu.",
    translationExample: "Mfano wa tafsiri", sukuma: "KISUKUMA", swahili: "KISWAHILI", english: "KIINGEREZA",
    sampleSwahili: "“Bwana, unasaidiaje?”", sampleEnglish: "“Sir, how can I help you?”", sampleAudio: "Sauti ya mfano",
    demoNote: "Mfano wa muonekano — hakiki tafsiri kabla ya matumizi.",
    previousImage: "Picha iliyopita", nextImage: "Picha inayofuata",
    slide1: "Picha 1", slide2: "Picha 2", slide3: "Picha 3", slide4: "Picha 4", slide5: "Picha 5",
    languageEyebrow: "UTAJIRI WA LUGHA ZETU", languageTitle: "Makabila 45 ya Tanzania",
    languageDescription: "Gundua lugha na jamii mbalimbali zinazounda utambulisho wetu.",
    discoverLanguages: "Gundua lugha zaidi", tribeList: "Orodha ya makabila ya Tanzania",
    tribeNote: "Orodha hii ni ya kuonyesha muundo wa tovuti; majina na uainishaji wa lugha vinaweza kuhakikiwa na kuhaririwa kulingana na vyanzo vyako.",
    aboutEyebrow: "LUGHA HAIWEKI MIPAKA",
    aboutTitle: "Teknolojia inayofanya<br><span>mawasiliano yawe rahisi.</span>",
    aboutDescription: "LocalLang inalenga kusaidia watu kuelewana katika elimu, afya, huduma za jamii na biashara — bila kuacha lugha zao za asili nyuma.",
    professionEyebrow: "MATUMIZI YA LOCALLANG", professionTitle: "Taaluma zinazotumiwa na zinazoleta watu pamoja",
    professionList: "Taaluma zinazotumia LocalLang",
    teacherImage: "Mwalimu akifundisha wanafunzi", teachersTitle: "Walimu na Wanafunzi",
    teachersDescription: "Rahisisha ufundishaji na ujifunzaji.",
    doctorImage: "Daktari akitoa huduma kwa mgonjwa", doctorsTitle: "Madaktari na Wagonjwa",
    doctorsDescription: "Saidia mawasiliano katika huduma za afya.",
    communityImage: "Wanajamii wakishirikiana", communityTitle: "Jamii za Mitaa",
    communityDescription: "Elewana kwa lugha inayokufanya ujisikie nyumbani.",
    businessImage: "Mmiliki wa biashara akitoa huduma kwa mteja", businessTitle: "Biashara na Huduma",
    businessDescription: "Wafikie wateja kwa mawasiliano bora.",
    farmersImage: "Jamii ya eneo la vijijini", farmersTitle: "Wakulima",
    farmersDescription: "Fikisha maarifa ya kilimo na huduma kwa wakulima.",
    tourismImage: "Wageni wakishiriki utamaduni wa Tanzania", tourismTitle: "Utalii na Ukarimu",
    tourismDescription: "Wasaidie wageni kufurahia safari na huduma zao.",
    transportImage: "Msafiri akitumia simu kuwasiliana", transportTitle: "Usafiri",
    transportDescription: "Toa maelekezo na taarifa kwa wasafiri kwa uwazi.",
    publicServicesImage: "Watu wakizungumza kuhusu huduma za jamii", publicServicesTitle: "Huduma za Jamii",
    publicServicesDescription: "Rahisisha upatikanaji wa taarifa na msaada.",
    howEyebrow: "HATUA KWA HATUA", howTitle: "Jinsi inavyofanya kazi",
    howDescription: "Njia rahisi ya kuwasiliana katika lugha mbalimbali.",
    stepLanguageImage: "Watu wakizungumza katika lugha tofauti", stepLanguageTitle: "Chagua lugha",
    stepLanguageDescription: "Chagua lugha ya asili unayotaka kutumia na lugha lengwa.",
    stepSpeakImage: "Mtumiaji akizungumza kupitia simu", stepSpeakTitle: "Andika au zungumza",
    stepSpeakDescription: "Ingiza ujumbe wako au tumia sauti pale kipengele hicho kinapowezeshwa.",
    stepProcessImage: "Akili bandia ikichakata ujumbe", stepProcessTitle: "AI huchakata",
    stepProcessDescription: "Mfumo huchambua ujumbe na kutayarisha tafsiri kulingana na data iliyopo.",
    stepReviewImage: "Mtumiaji akisikiliza au kupitia tafsiri", stepReviewTitle: "Pitia tafsiri",
    stepReviewDescription: "Soma matokeo na hakikisha maana inafaa kwa muktadha.",
    stepShareImage: "Watu wakishiriki mazungumzo", stepShareTitle: "Shiriki ujumbe",
    stepShareDescription: "Tumia tafsiri kuwasiliana na mtu mwingine kwa uelewa zaidi.",
    footerSlogan: "Lugha zetu. Uelewa wetu.", footerDescription: "Teknolojia inayowaunganisha watu.",
    instagram: "Instagram", youtube: "YouTube", linkedin: "LinkedIn", quickLinks: "Viungo vya Haraka",
    contactUs: "Wasiliana Nasi", tanzania: "Tanzania", tanzaniaFlag: "Bendera ya Tanzania",
    footerNation: "Lugha nyingi, taifa moja.", copyright: "Haki zote zimehifadhiwa.",
    privacy: "Faragha", terms: "Masharti", support: "Msaada"
  },
  en: {
    pageTitle: "LocalLang Tanzania | Our Languages, Our Understanding",
    pageDescription: "LocalLang Tanzania — translate Tanzania's native languages into Swahili and English with the help of AI.",
    navLabel: "Main navigation", brandLabel: "LocalLang Tanzania home", openMenu: "Open menu", closeMenu: "Close menu",
    navHome: "Home", navAbout: "About Us", navLanguages: "Languages of Tanzania", navHow: "How It Works",
    languageLabel: "Choose website language", themeToggle: "Switch to dark mode", themeLight: "Switch to light mode",
    startConversation: "Start a Conversation", heroImage: "Images showing how LocalLang is used",
    heroEyebrow: "AI bringing people together", heroTitle: "Tanzanian Native Languages,<br><span>Let's Discover, Learn, and Use Our Native Languages.</span>",
    heroDescription: "Communicate in your native language. LocalLang helps translate Tanzanian languages into Swahili and English with ease.",
    heroHow: "How it works", heroTrust: "Our languages. Our voices.", heroTrustSub: "Technology for everyone.",
    translationExample: "Translation example", sukuma: "SUKUMA", swahili: "SWAHILI", english: "ENGLISH",
    sampleSwahili: "“Bwana, unasaidiaje?”", sampleEnglish: "“Sir, how can I help you?”", sampleAudio: "Sample audio",
    demoNote: "Sample display — review translations before use.",
    previousImage: "Previous image", nextImage: "Next image",
    slide1: "Image 1", slide2: "Image 2", slide3: "Image 3", slide4: "Image 4", slide5: "Image 5",
    languageEyebrow: "THE RICHNESS OF OUR LANGUAGES", languageTitle: "45 Ethnic Groups of Tanzania",
    languageDescription: "Discover the diverse languages and communities that shape our identity.",
    discoverLanguages: "Discover more languages", tribeList: "List of Tanzanian ethnic groups",
    tribeNote: "This list is for demonstration purposes; names and language classifications should be reviewed and edited against your sources.",
    aboutEyebrow: "LANGUAGE SHOULD NEVER BE A BARRIER",
    aboutTitle: "Technology that makes<br><span>communication easier.</span>",
    aboutDescription: "LocalLang aims to help people understand one another in education, healthcare, community services and business — without leaving their native languages behind.",
    professionEyebrow: "HOW LOCALLANG IS USED", professionTitle: "Connecting people across professions",
    professionList: "Professions that use LocalLang",
    teacherImage: "A teacher teaching students", teachersTitle: "Teachers and Students",
    teachersDescription: "Make teaching and learning easier.",
    doctorImage: "A doctor providing care to a patient", doctorsTitle: "Doctors and Patients",
    doctorsDescription: "Support communication in healthcare.",
    communityImage: "Community members working together", communityTitle: "Local Communities",
    communityDescription: "Connect in a language that feels like home.",
    businessImage: "A business owner serving a customer", businessTitle: "Business and Services",
    businessDescription: "Reach customers through better communication.",
    farmersImage: "A rural community", farmersTitle: "Farmers",
    farmersDescription: "Share agricultural knowledge and services with farmers.",
    tourismImage: "Visitors experiencing Tanzanian culture", tourismTitle: "Tourism and Hospitality",
    tourismDescription: "Help visitors enjoy their journeys and services.",
    transportImage: "A traveler using a phone to communicate", transportTitle: "Transport",
    transportDescription: "Give travelers clear directions and information.",
    publicServicesImage: "People discussing community services", publicServicesTitle: "Community Services",
    publicServicesDescription: "Make information and support easier to access.",
    howEyebrow: "STEP BY STEP", howTitle: "How It Works",
    howDescription: "An easy way to communicate across languages.",
    stepLanguageImage: "People speaking different languages", stepLanguageTitle: "Choose a language",
    stepLanguageDescription: "Choose the native language you want to use and the target language.",
    stepSpeakImage: "A user speaking on a phone", stepSpeakTitle: "Type or speak",
    stepSpeakDescription: "Enter your message or use voice when that feature is available.",
    stepProcessImage: "Artificial intelligence processing a message", stepProcessTitle: "AI processes it",
    stepProcessDescription: "The system analyzes the message and prepares a translation using available data.",
    stepReviewImage: "A user listening to or reviewing a translation", stepReviewTitle: "Review the translation",
    stepReviewDescription: "Read the result and make sure it fits the context.",
    stepShareImage: "People sharing a conversation", stepShareTitle: "Share the message",
    stepShareDescription: "Use the translation to communicate more clearly with someone else.",
    footerSlogan: "Our languages. Our understanding.", footerDescription: "Technology that brings people together.",
    instagram: "Instagram", youtube: "YouTube", linkedin: "LinkedIn", quickLinks: "Quick Links",
    contactUs: "Contact Us", tanzania: "Tanzania", tanzaniaFlag: "Flag of Tanzania",
    footerNation: "Many languages, one nation.", copyright: "All rights reserved.",
    privacy: "Privacy", terms: "Terms", support: "Support"
  }
};

function applyLanguage(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.title = dictionary.pageTitle;
  document.getElementById("pageDescription").content = dictionary.pageDescription;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = dictionary[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach(element => {
    element.innerHTML = dictionary[element.dataset.i18nHtml];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(element => {
    element.alt = dictionary[element.dataset.i18nAlt];
  });
  if (themeToggle) {
    themeToggle.dataset.i18nAria = document.body.classList.contains("dark") ? "themeLight" : "themeToggle";
    themeToggle.setAttribute("aria-label", dictionary[themeToggle.dataset.i18nAria]);
  }
}

const siteLanguage = document.getElementById("siteLanguage");
siteLanguage.addEventListener("change", () => applyLanguage(siteLanguage.value));
applyLanguage(siteLanguage.value);

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
