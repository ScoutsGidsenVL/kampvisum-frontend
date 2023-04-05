import { Group, GroupDeserializer } from '@/serializer/Group'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'

export default class UserModel implements ResponsibleMember {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public permissions: Array<string> = [],
    public email: string,
    public membershipNumber: number,
    public birthDate: string,
    public phoneNumber: string,
    public scoutsGroups: Group[],
    public groups: Array<string>,
    public groupsPermissions: any
  ) {
    return this
  }

  public static deserialize(input: any): UserModel {
    return new UserModel(
      input.id,
      input.first_name,
      input.last_name,
      input.user_permissions,
      input.email,
      input.membership_number,
      input.birth_date,
      input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
      input.scouts_groups.map((group: any) => GroupDeserializer(group)),
      input.groups,
      input.scouts_groups_permissions
    )
  }
}
