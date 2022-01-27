import { Member, MemberDeserializer } from "./Member"

export interface ParticipitantCheck {
  id?: string
  value?: string
  endpoint: string
}

interface participantToPatch {
  id: string
}

export const ParticipantCheckDeserializer = (input: any[]): Member[] => {
  const array: Member[] = input.map((m: any) => MemberDeserializer(m))
  return array
}

export const ParticipantCheckSerializer = (input: Member[]): any => {

  let membersToPatch: Array<participantToPatch> = []
  input.forEach(member => {
    if (member.isChecked) {
        membersToPatch.push({ id: member.id })
    }
  })

  const single: any = {
    value: membersToPatch
  }
  return single
}

