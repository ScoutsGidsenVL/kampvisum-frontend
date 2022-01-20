import { BaseMember, BaseMemberDeserializer, BaseMemberSerializer } from './BaseMember'

export interface FourageMember extends BaseMember { }

export const FourageMemberDeserializer = BaseMemberDeserializer

export const FourageMemberSerializer = BaseMemberSerializer
