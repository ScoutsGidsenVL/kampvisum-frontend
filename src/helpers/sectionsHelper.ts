import { Camp } from "@/serializer/Camp"
import { ref } from 'vue'

export const useSectionsHelper = (): {
  getSectionsTitle: (camp: Camp) => string,
} => {


  const getSectionsTitle = (camp: Camp): string => {
    const sectionsTitle = ref<string>('')

    if (camp && camp.sections) {
      camp.sections.forEach((section: any, index: any) => {
        if (camp.sections && (camp.sections.length - 1) > (index)) {
          sectionsTitle.value += section.name + ' & '
        } else {
          sectionsTitle.value += section.name
        }
      })
    }
    return sectionsTitle.value
  }

  return {
    getSectionsTitle,
  }
}