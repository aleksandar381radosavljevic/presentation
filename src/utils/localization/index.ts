export const supportedLanguages = [
  { code: 'ENG', label: 'English' },
  { code: 'SRB', label: 'Srpski' }
]

let selectedLanguage = { code: 'ENG', label: 'English' }

export const changeLanguage = (code: string) => {
  selectedLanguage = supportedLanguages.find((x) => x.code === code) || {
    code: 'ENG',
    label: 'English'
  }
}

export const getSelectedLanguage = () => {
  return selectedLanguage
}
