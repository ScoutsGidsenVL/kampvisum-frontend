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

interface ParticipantCheckData {
  participants: Member[]
}

export const ParticipantDeserializer = (input: any[]): Member[] => {
  const array: Member[] = input.map((m: any) => MemberDeserializer(m))
  return array
}

export const ParticipantCheckDeserializer = (input: any): ParticipantCheckData => {
  const single: ParticipantCheckData = {
    participants: ParticipantDeserializer(input.participants)
  }
  return single 
}

export const ParticipantsSerializer = (input: Member[]): any => {

  let membersToPatch: Array<participantToPatch> = []
  input.forEach(member => {
    if (member.isChecked) {
        if (member.isMember) {
          membersToPatch.push({ group_admin_id: member.id })
        } else {
          membersToPatch.push({ id: member.id })
        }
    }
  })
  // membersToPatch
  const single: any = {
    participants: membersToPatch
  }
  return single
}

export const ParticipantSerializer = (member: Member): any => {
  if (member.isChecked) {
    if (member.isMember) {
      return { group_admin_id: member.id }
    } else {
      return { id: member.id }
    }
  }
}

export const ParticipantCheckSerializer = (members: any): ParticipantCheckData => {
  const single: ParticipantCheckData = {
    participants: members.map((p: any) => p = { participant: p})
  }
  console.log('')
  return single
}

