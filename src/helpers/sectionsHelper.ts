import { Visum } from '@/serializer/Visum'
import { ref } from 'vue'

export const useSectionsHelper = (): {
  getSectionsTitle: (visum: Visum) => string
  genderLabel: (gender: string) => string
} => {
  const getSectionsTitle = (visum: Visum): string => {
    const sectionsTitle = ref<string>('')
    const sections: string[] = []
    if (visum && visum.sections) {
      visum.sections.forEach((section: any) => {
        if (section.name.name) {
          sections.push(section.name.name)
        }
      })
    }

    sectionsTitle.value = sections.join(' & ')

    return sectionsTitle.value
  }

  const genderLabel = (gender: string) => {
    let label = ''
    if (gender === 'M') {
      label = 'Man'
    }
    if (gender === 'V' || gender === 'F') {
      label = 'Vrouw'
    }
    if (gender === 'I') {
      label = 'Mix'
    }
    return label
  }

  return {
    getSectionsTitle,
    genderLabel,
  }
}
