import { Camp } from "@/serializer/Camp"
import { ref } from 'vue'

export const useSectionsHelper = (): {
  getSectionsTitle: (camp: Camp) => string,
  genderLabel: (gender: string) => string
} => {


  const getSectionsTitle = (camp: Camp): string => {
    const sectionsTitle = ref<string>('')

    if (camp && camp.sections) {
      camp.sections.forEach((section: any, index: any) => {
        if (camp.sections && (camp.sections.length - 1) > (index)) {
          sectionsTitle.value += section.name.name + ' & '
        } else {
          sectionsTitle.value += section.name.name
        }
      })
    }
    return sectionsTitle.value
  }

  const genderLabel = (gender: string) => {
    let label = ''
    if (gender === 'M') {
      label = 'Man'
    }
    if (gender === 'V') {
      label = 'Vrouw'
    }
    if (gender === 'I') {
      label = 'Mix'
    }
    return label
  }

  return {
    getSectionsTitle,
    genderLabel
  }
}