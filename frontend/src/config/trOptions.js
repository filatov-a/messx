import config from './config'

export default {
    supportedLngs: ['en', 'uk', 'ru'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
        order: ['path', 'localStorage', 'htmlTag'],
        caches: ['localStorage'],
    },
    // react: { useSuspense: false },
    backend: {
        loadPath: `${config.url}/assets/locales/{{lng}}/translation.json`,
    },
}

export const languages = [
    {
        code: 'en',
        name: 'English',
        country_flag: '🇬🇧',
    },
    {
        code: 'uk',
        name: 'Українська',
        country_flag: '🇺🇦',
    },
]
