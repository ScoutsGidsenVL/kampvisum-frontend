import { Camp } from '@/serializer/Camp'
import { ref } from 'vue'

export const useSectionsHelper = (): {
  getSectionsTitle: (camp: Camp) => string
  genderLabel: (gender: string) => string
  ageGroupLabel: (gender: string) => string
} => {
  const getSectionsTitle = (camp: Camp): string => {
    const sectionsTitle = ref<string>('')
    const sections: string[] = []
    if (camp && camp.sections) {
      camp.sections.forEach((section: any) => {
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
    ageGroupLabel,
  }
}
