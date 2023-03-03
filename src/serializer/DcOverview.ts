export interface DcOverview {
  groupId: string
  campsWithInformation: Array<CampInformation>
}

export interface CampInformation {
  name: string,
  startDate: string,
  endDate: string,
  sections: Array<string>
  campRegistration: string,
  campStatus: string
}

export const DcOverviewDeserializer = (input: any): DcOverview => {
  const single: DcOverview = {
    groupId: input.group_id ? input.group_id : undefined,
    campsWithInformation: input.camps ? input.camps.map((camp: any) => CampInformationDeserializer(camp)) : undefined,
  }
  return single
}

export const CampInformationDeserializer = (input: any): CampInformation => {
  const single: CampInformation = {
    name: input.name ? input.name : undefined,
    startDate: input.start_date ? input.start_date : undefined,
    endDate: input.end_date ? input.end_date : undefined,
    sections: input.sections ? input.sections : undefined,
    campRegistration: input.camp_registration ? input.camp_registration : undefined,
    campStatus: input.camp_status ? input.camp_status : undefined
  }
  return single
}
