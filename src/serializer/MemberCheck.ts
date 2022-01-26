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

export const MemberCheckSerializer = (input: Member[]): any => {

  let membersToPost: {'group_admin_id': string}[] = []

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

