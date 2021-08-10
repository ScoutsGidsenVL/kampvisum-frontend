import { localize, setLocale } from '@vee-validate/i18n'
import { defineRule, configure } from 'vee-validate'
import { required } from '@vee-validate/rules'

export const defineRules = () => {
  defineRule('required', required)

  configure({
    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
        },
      },
      nl: {
        messages: {
          required: 'Dit veld is verplicht',
        },
      },
    }),
  })

  setLocale('nl')
}

export const scrollTo = () => {
  window.scrollTo(0, 300)
}
