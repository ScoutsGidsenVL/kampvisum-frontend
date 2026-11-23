// Scoutsgroep zoals /auth/me/ ze levert in scouts_groups.
// groupAdminId bevat het groepsnummer.
export interface Group {
  readonly fullName?: string;
  readonly groupAdminId: string;
  readonly isDistrictCommissioner?: boolean;
  readonly isGroupLeader?: boolean;
  readonly isSectionLeader?: boolean;
  readonly isAdmin?: boolean;
}

export const GroupDeserializer = (input: any): Group => {
  const single: Group = {
    fullName: input.full_name ? input.full_name : undefined,
    groupAdminId: input.group_admin_id ? input.group_admin_id : undefined,
    isDistrictCommissioner: input.is_district_commissioner ? input.is_district_commissioner : false,
    isGroupLeader: input.is_group_leader ? input.is_group_leader : false,
    isSectionLeader: input.is_section_leader ? input.is_section_leader : false,
    isAdmin: input.is_admin ? input.is_admin : false
  }

  return single
}
