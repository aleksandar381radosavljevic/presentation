import { readonly, ref } from 'vue'

export type Language = { code: string; label: string }

export const supportedLanguages: Language[] = [
  { code: 'ENG', label: 'English' },
  { code: 'SRB', label: 'Srpski' }
]

const selectedLanguage = ref<Language>(supportedLanguages[0])

export const changeLanguage = (code: string) => {
  selectedLanguage.value = supportedLanguages.find((x) => x.code === code) ?? supportedLanguages[0]
}

export const getSelectedLanguage = () => readonly(selectedLanguage)
