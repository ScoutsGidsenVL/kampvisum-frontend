import { Member, MemberDeserializer } from "./Member"

export interface ParticipitantCheck {
  id?: string
  value?: string
  endpoint: string
}

interface participantToPatch {
  id?: string
  group_admin_id?: string
}

export const ParticipantCheckDeserializer = (input: any): { participantCheckType: string, participants: Member[], count: number } => {
  const participants: Member[] = input.participants ? input.participants.map((i: any) => MemberDeserializer(i.participant, i.id, i.payment_status)) : []
  return { participantCheckType: input.participant_check_type, participants: participants, count: input.data_count ? input.data_count : 0 }
}

export const ParticipantCheckSerializer = (input: Member[]): any => {

  let membersToPatch: Array<any> = []
  input.forEach(member => {
    if (member.isChecked) {
      if (member.isMember) {
        membersToPatch.push({ participant: { group_admin_id: member.id } })
      } else {
        membersToPatch.push({ participant: { id: member.id } })
      }
    }
  })

  const single: any = {
    participants: membersToPatch
  }
  return single
}

