import { BaseMember, BaseMemberDeserializer, BaseMemberSerializer } from './BaseMember'

export interface Member extends BaseMember { }

export const MemberDeserializer = BaseMemberDeserializer

export const MemberSerializer = BaseMemberSerializer