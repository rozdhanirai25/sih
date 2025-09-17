const dict = {
  en: {
    title: 'AI-Based Animal Type Classification',
    uploadTab: 'Upload Image',
    cameraTab: 'Camera',
    historyTab: 'Offline Results',
    analyze: 'Analyze',
    saveOffline: 'Save Offline',
    exportBpa: 'Export BPA JSON',
    copy: 'Copy',
    synced: 'Synced',
    notConfigured: 'Not configured',
    language: 'Language',
  },
  hi: {
    title: 'एआई आधारित पशु प्रकार वर्गीकरण',
    uploadTab: 'छवि अपलोड करें',
    cameraTab: 'कैमरा',
    historyTab: 'ऑफ़लाइन परिणाम',
    analyze: 'विश्लेषण करें',
    saveOffline: 'ऑफ़लाइन सहेजें',
    exportBpa: 'बीपीए JSON निर्यात',
    copy: 'कॉपी',
    synced: 'सिंक हो गया',
    notConfigured: 'सेट नहीं है',
    language: 'भाषा',
  },
};

export function t(lang, key) {
  const bag = dict[lang] || dict.en;
  return bag[key] || key;
}

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];
