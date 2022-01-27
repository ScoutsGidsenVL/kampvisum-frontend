import { Member, MemberDeserializer } from "./Member"

export interface MemberCheck {
  id?: string
  value?: string
  endpoint: string
}

export const MemberCheckDeserializer = (input: any[]): Member[] => {
  const array: Member[] = input.map((m: any) => MemberDeserializer(m))

  return array
}

interface memberToPatch { group_admin_id: string }

export const MemberCheckSerializer = (input: Member[]): any => {

  let membersToPost: memberToPatch[] = []

  input.forEach(member => {
    if (member.groupAdminId && member.isChecked) {
      membersToPost.push({group_admin_id: member.groupAdminId})
    }
  })

  const single: any = {
    value: membersToPost
  }
  return single
}

