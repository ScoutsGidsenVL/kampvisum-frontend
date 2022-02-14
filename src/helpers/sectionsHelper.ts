import { Camp } from "@/serializer/Camp"
import { ref } from 'vue'

export const useSectionsHelper = (): {
  getSectionsTitle: (camp: Camp) => string,
  genderLabel: (gender: string) => string
  ageGroupLabel: (gender: string) => string
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
    if (gender === 'V' || gender === 'F') {
      label = 'Vrouw'
    }
    if (gender === 'I') {
      label = 'Mix'
    }
    return label
  }

  const ageGroupLabel = (ageGroup: string) => {
    let label = ''
    if (ageGroup == '10') {
      label = 'kapoenen en zeehondjes'
    }
    if (ageGroup == '15') {
      label = 'startleeftijd 7 jaar'
    }
    if (ageGroup == '16') {
      label = 'startleeftijd 8 jaar'
    }
    if (ageGroup == '17') {
      label = 'startleeftijd 9 jaar'
    }
    if (ageGroup == '20') {
      label = 'kabouter en (zee)welp'
    }
    if (ageGroup == '25') {
      label = 'startleeftijd 9 jaar'
    }
    if (ageGroup == '26') {
      label = 'startleeftijd 10 jaar'
    }
    if (ageGroup == '27') {
      label = 'startleeftijd 11 jaar'
    }
    if (ageGroup == '30') {
      label = 'jonggivers en scheepsmakkers'
    }
    if (ageGroup == '35') {
      label = 'startleeftijd 12 jaar'
    }
    if (ageGroup == '36') {
      label = 'startleeftijd 13 jaar'
    }
    if (ageGroup == '37') {
      label = 'startleeftijd 14 jaar'
    }
    if (ageGroup == '40') {
      label = 'gidsen en (zee)verkenners'
    }
    if (ageGroup == '45') {
      label = 'startleeftijd 15 jaar'
    }
    if (ageGroup == '46') {
      label = 'startleeftijd 16 jaar'
    }
    if (ageGroup == '47') {
      label = 'startleeftijd 17 jaar'
    }
    if (ageGroup == '50') {
      label = 'jins en loodsen'
    }
    if (ageGroup == '55') {
      label = 'startleeftijd 18 jaar'
    }
    if (ageGroup == '60') {
      label = 'leeftijdsgroep ouder dan 18, bv. VIPS (akabe)'
    }
    if (ageGroup === '100') {
      label = 'leeftijdsgroep voor leiding, district, gouw, verbond'
    }
    if (ageGroup === '999') {
      label = 'onbekende leeftijdsgroep'
    }
    return label
  }

  return {
    getSectionsTitle,
    genderLabel,
    ageGroupLabel
  }
}