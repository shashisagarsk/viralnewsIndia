export type Language = "en" | "hi";

export interface TranslationsDict {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: TranslationsDict = {
  // Brand & Header
  siteTitle: {
    en: "Viral News India",
    hi: "वायरल न्यूज़ इंडिया",
  },
  siteTagline: {
    en: "Independent Digital Journalism & Real-Time Reports",
    hi: "स्वतंत्र डिजिटल पत्रकारिता एवं रियल-टाइम समाचार",
  },
  editionLabel: {
    en: "Edition: India & Global",
    hi: "संस्करण: भारत एवं वैश्विक",
  },
  trendingBar: {
    en: "Trending: 24/7 Digital Headlines",
    hi: "ट्रेंडिंग: 24/7 डिजिटल मुख्य समाचार",
  },
  liveNewsroom: {
    en: "Live Newsroom",
    hi: "लाइव न्यूज़रूम",
  },
  menu: {
    en: "Menu",
    hi: "मेनू",
  },
  newsSections: {
    en: "News Sections",
    hi: "समाचार अनुभाग",
  },
  language: {
    en: "Language",
    hi: "भाषा",
  },
  translateMode: {
    en: "Translate",
    hi: "अनुवाद",
  },
  english: {
    en: "English",
    hi: "English",
  },
  hindi: {
    en: "हिन्दी",
    hi: "हिन्दी",
  },

  // Navigation / Categories
  home: {
    en: "Home",
    hi: "होम",
  },
  webStories: {
    en: "Web Stories",
    hi: "वेब स्टोरीज़",
  },
  india: {
    en: "India",
    hi: "भारत",
  },
  world: {
    en: "World",
    hi: "विदेश",
  },
  business: {
    en: "Business",
    hi: "व्यापार",
  },
  technology: {
    en: "Technology",
    hi: "टेक्नोलॉजी",
  },
  sports: {
    en: "Sports",
    hi: "खेल",
  },
  entertainment: {
    en: "Entertainment",
    hi: "मनोरंजन",
  },
  lifestyle: {
    en: "Lifestyle",
    hi: "लाइफस्टाइल",
  },
  science: {
    en: "Science",
    hi: "विज्ञान",
  },

  // Breaking News
  breaking: {
    en: "Breaking",
    hi: "ब्रेकिंग",
  },
  breakingNews: {
    en: "Breaking News",
    hi: "ब्रेकिंग न्यूज़",
  },

  // Section Titles
  latestNews: {
    en: "Latest News",
    hi: "ताज़ा ख़बरें",
  },
  editorsChoice: {
    en: "Editor's Choice",
    hi: "संपादक की पसंद",
  },
  editorsChoiceSub: {
    en: "Handpicked in-depth investigations",
    hi: "चुनिंदा गहन विश्लेषण और रिपोर्ट",
  },
  curated: {
    en: "Curated",
    hi: "चुनिंदा",
  },
  popularNews: {
    en: "Popular News",
    hi: "लोकप्रिय ख़बरें",
  },
  latestUpdates: {
    en: "Latest Updates",
    hi: "ताज़ा अपडेट्स",
  },
  viewAll: {
    en: "View All →",
    hi: "सभी देखें →",
  },
  storiesBadge: {
    en: "Stories",
    hi: "स्टोरीज़",
  },
  visualWebStories: {
    en: "Visual Web Stories",
    hi: "विज़ुअल वेब स्टोरीज़",
  },
  webStoriesSub: {
    en: "Immersive tap-through visual reports & infographics",
    hi: "इंटरएक्टिव विज़ुअल रिपोर्ट्स और इन्फोग्राफिक्स",
  },
  advertisement: {
    en: "Advertisement",
    hi: "विज्ञापन",
  },
  adSlotText: {
    en: "Premium Editorial Sponsorship Slot",
    hi: "प्रीमियम संपादकीय प्रायोजन स्लॉट",
  },

  // Article Page
  minRead: {
    en: "min read",
    hi: "मिनट का समय",
  },
  share: {
    en: "Share",
    hi: "शेयर करें",
  },
  shareArticle: {
    en: "Share Article",
    hi: "आर्टिकल शेयर करें",
  },
  copiedLink: {
    en: "Link Copied!",
    hi: "लिंक कॉपी हो गया!",
  },
  photoCredit: {
    en: "Photo: Editorial Media Archives / ViralNewsIndia",
    hi: "फोटो: संपादकीय मीडिया आर्काइव / वायरल न्यूज़ इंडिया",
  },
  tagsLabel: {
    en: "Tags:",
    hi: "टैग्स:",
  },
  reportedBy: {
    en: "Reported by",
    hi: "रिपोर्टर:",
  },
  authorBio: {
    en: "Special Correspondent for ViralNewsIndia covering political, economic, and technological developments.",
    hi: "वायरल न्यूज़ इंडिया के विशेष संवाददाता, जो राजनीतिक, आर्थिक और तकनीकी घटनाक्रम को कवर करते हैं।",
  },
  relatedStoriesIn: {
    en: "Related Stories in",
    hi: "संबंधित ख़बरें:",
  },
  readInHindi: {
    en: "हिंदी में पढ़ें",
    hi: "हिंदी में पढ़ें",
  },
  readInEnglish: {
    en: "Read in English",
    hi: "Read in English",
  },

  // Category Page
  categoryDirectory: {
    en: "Categories Directory",
    hi: "श्रेणियां डायरेक्टरी",
  },
  exploreByCategory: {
    en: "Explore by Category",
    hi: "श्रेणी के अनुसार समाचार",
  },
  exploreCategorySub: {
    en: "Navigate through specialized beats and editorial desks.",
    hi: "विभिन्न विषयों और संपादकीय डेस्क की विशेष ख़बरें।",
  },
  browseSection: {
    en: "Browse Section",
    hi: "सेक्शन देखें",
  },
  storiesCountSingle: {
    en: "Story",
    hi: "ख़बर",
  },
  storiesCountPlural: {
    en: "Stories",
    hi: "ख़बरें",
  },
  noArticlesInCategory: {
    en: "No articles found in this category yet.",
    hi: "इस श्रेणी में अभी कोई लेख उपलब्ध नहीं है।",
  },
  beFirstToPublish: {
    en: "Be the first to publish a story in this category.",
    hi: "इस श्रेणी में पहला लेख प्रकाशित करें।",
  },
  writePost: {
    en: "Write Post",
    hi: "लेख लिखें",
  },

  // Search Page
  searchNews: {
    en: "Search News",
    hi: "समाचार खोजें",
  },
  searchPlaceholder: {
    en: "Search by keyword, headline, author, or topic...",
    hi: "कीवर्ड, शीर्षक, लेखक या विषय से खोजें...",
  },
  searchHeader: {
    en: "Search Across ViralNewsIndia",
    hi: "वायरल न्यूज़ इंडिया में खोजें",
  },
  searchSub: {
    en: "Find breaking stories, archived reports, and topic analysis.",
    hi: "ताज़ा समाचार, संग्रह रिपोर्ट और विषय विश्लेषण खोजें।",
  },
  searchButton: {
    en: "Search",
    hi: "खोजें",
  },
  trendingTopics: {
    en: "Trending Topics:",
    hi: "ट्रेंडिंग विषय:",
  },
  searchResultsFor: {
    en: "Search Results for",
    hi: "खोज परिणाम:",
  },
  allArticles: {
    en: "All Articles",
    hi: "सभी लेख",
  },
  storiesFound: {
    en: "Stories Found",
    hi: "ख़बरें मिलीं",
  },
  searchingDatabase: {
    en: "Searching news database...",
    hi: "समाचार डेटाबेस में खोज रहे हैं...",
  },
  noMatchingStories: {
    en: "No matching stories found",
    hi: "कोई मिलती-जुलती ख़बर नहीं मिली",
  },
  tryDifferentTerms: {
    en: "Try searching for different terms or browse our latest coverage.",
    hi: "कृपया अन्य शब्दों से खोजें या ताज़ा समाचार देखें।",
  },

  // Web Stories Directory & Viewer
  fullScreenVisualJournalism: {
    en: "Full-Screen Visual Journalism",
    hi: "फुल-स्क्रीन विज़ुअल पत्रकारिता",
  },
  visualStoriesDescription: {
    en: "Tap through our curated high-impact visual stories, photo journalism, infographic breakdowns, and quick-brief updates.",
    hi: "हमारी चुनिंदा विज़ुअल कहानियों, फोटो पत्रकारिता, इन्फोग्राफिक्स और संक्षिप्त समाचारों को देखें।",
  },
  youCaughtUp: {
    en: "You've Caught Up!",
    hi: "आप सभी स्लाइड्स देख चुके हैं!",
  },
  completedSlides: {
    en: "You completed all slides for this visual story.",
    hi: "आपने इस विज़ुअल स्टोरी की सभी स्लाइड्स देख ली हैं।",
  },
  nextStory: {
    en: "Next Story",
    hi: "अगली स्टोरी",
  },
  replayStory: {
    en: "Replay Story",
    hi: "दोबारा देखें",
  },
  browseAllStories: {
    en: "Browse All Visual Stories",
    hi: "सभी विज़ुअल स्टोरीज़ देखें",
  },

  // Footer & Archives
  sectionsAndBeats: {
    en: "Sections & Beats",
    hi: "अनुभाग एवं श्रेणियां",
  },
  quickNavigation: {
    en: "Quick Navigation",
    hi: "त्वरित नेविगेशन",
  },
  allNewsArchives: {
    en: "All News Archives",
    hi: "सभी समाचार संग्रह",
  },
  completeArchiveTitle: {
    en: "Complete News Archive",
    hi: "सम्पूर्ण समाचार संग्रह",
  },
  completeArchiveSub: {
    en: "Browse our complete editorial catalog of reports and coverage.",
    hi: "हमारी सभी रिपोर्टों और विशेष कवरेज का सम्पूर्ण संग्रह ब्राउज़ करें।",
  },
  browseCategories: {
    en: "Browse Categories",
    hi: "श्रेणियां देखें",
  },
  searchCoverage: {
    en: "Search Coverage",
    hi: "समाचार खोजें",
  },
  liveEditorialFeed: {
    en: "Live Editorial Feed",
    hi: "लाइव संपादकीय फ़ीड",
  },
  footerBrandBio: {
    en: "Independent digital journalism covering India and world affairs, business markets, breakthroughs in artificial intelligence, science, sports, and culture.",
    hi: "भारत और वैश्विक मामलों, व्यावसायिक बाज़ारों, कृत्रिम बुद्धिमत्ता (AI), विज्ञान, खेल और संस्कृति को कवर करने वाली स्वतंत्र डिजिटल पत्रकारिता।",
  },
  allRightsReserved: {
    en: "All rights reserved.",
    hi: "सर्वाधिकार सुरक्षित।",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    hi: "गोपनीयता नीति",
  },
  termsOfService: {
    en: "Terms of Service",
    hi: "सेवा की शर्तें",
  },
  editorialStandards: {
    en: "Editorial Standards",
    hi: "संपादकीय मानक",
  },
};

export const categoryTranslations: Record<string, { en: string; hi: string }> = {
  home: { en: "Home", hi: "होम" },
  india: { en: "India", hi: "भारत" },
  world: { en: "World", hi: "विदेश" },
  business: { en: "Business", hi: "व्यापार" },
  technology: { en: "Technology", hi: "टेक्नोलॉजी" },
  sports: { en: "Sports", hi: "खेल" },
  entertainment: { en: "Entertainment", hi: "मनोरंजन" },
  lifestyle: { en: "Lifestyle", hi: "लाइफस्टाइल" },
  science: { en: "Science", hi: "विज्ञान" },
  stories: { en: "Web Stories", hi: "वेब स्टोरीज़" },
  general: { en: "General", hi: "सामान्य" },
};

export function getLocalizedCategory(category: string, lang: Language): string {
  if (!category) return "";
  const key = category.trim().toLowerCase();
  if (categoryTranslations[key]) {
    return categoryTranslations[key][lang];
  }
  return category;
}

export function formatLocalizedDate(dateString: string | undefined, lang: Language): string {
  const date = dateString ? new Date(dateString) : new Date();
  const validDate = isNaN(date.getTime()) ? new Date() : date;

  if (lang === "hi") {
    const hindiMonths = [
      "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ];
    const hindiDays = [
      "रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"
    ];
    
    const dayName = hindiDays[validDate.getDay()];
    const day = validDate.getDate();
    const monthName = hindiMonths[validDate.getMonth()];
    const year = validDate.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  }

  return validDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export function formatShortLocalizedDate(dateString: string | undefined, lang: Language): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // If it's already a short string like "Aug 16, 2026", translate if in Hindi
    if (lang === "hi") {
      return dateString
        .replace(/Jan/i, "जनवरी")
        .replace(/Feb/i, "फरवरी")
        .replace(/Mar/i, "मार्च")
        .replace(/Apr/i, "अप्रैल")
        .replace(/May/i, "मई")
        .replace(/Jun/i, "जून")
        .replace(/Jul/i, "जुलाई")
        .replace(/Aug/i, "अगस्त")
        .replace(/Sep/i, "सितंबर")
        .replace(/Oct/i, "अक्टूबर")
        .replace(/Nov/i, "नवंबर")
        .replace(/Dec/i, "दिसंबर");
    }
    return dateString;
  }

  if (lang === "hi") {
    const hindiMonths = [
      "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ];
    return `${date.getDate()} ${hindiMonths[date.getMonth()]}, ${date.getFullYear()}`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
