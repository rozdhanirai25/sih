const dict = {
  en: {
    title: 'AI-Powered Animal Type Classification',
    uploadTab: 'Upload Image',
    cameraTab: 'Camera',
    historyTab: 'Offline Results',
    analyze: 'Predict',
    saveOffline: 'Save Offline',
    exportBpa: 'Export BPA JSON',
    copy: 'Copy',
    synced: 'Synced',
    notConfigured: 'Not configured',
    language: 'Language',
    start: 'Start Classification',
    upload: 'Upload Image',
    camera: 'Use Camera',
    predict: 'Predict',
    saveBpa: 'Save to BPA',
    backHome: 'Back to Home',
    noImage: 'No image selected',
    loading: 'Loading...'
  },
  hi: {
    title: 'एआई संचालित पशु प्रकार वर्गीकरण',
    uploadTab: 'छवि अपलोड करें',
    cameraTab: 'कैमरा',
    historyTab: 'ऑफ़ल���इन परिणाम',
    analyze: 'भविष्यवाणी',
    saveOffline: 'ऑफ़लाइन सहेजें',
    exportBpa: 'बीपीए JSON निर्यात',
    copy: 'कॉपी',
    synced: 'सिंक हो गया',
    notConfigured: 'सेट नहीं है',
    language: 'भाषा',
    start: 'वर्गीकरण शुरू करें',
    upload: 'छवि अपलोड करें',
    camera: 'कैमरा उपयोग करें',
    predict: 'भविष्यवाणी',
    saveBpa: 'बीपीए में सहेजें',
    backHome: 'मुखपृष्ठ पर वापस',
    noImage: 'कोई छवि चयनित नहीं',
    loading: 'लोड हो रहा है...'
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
