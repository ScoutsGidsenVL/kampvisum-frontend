export interface Latitude {
  real: number;
}

export interface Longitude {
  real: number;
}

export interface Position {
  latitude: Latitude;
  longitude: Longitude;
}

export interface Address {
  city: string;
  country: string;
  group_admin_id: string;
  number: string;
  position: Position;
  postal_address: boolean;
  postal_code: string;
  status: string;
  street: string;
}

export interface Link {
  href: string;
  method: string;
  rel: string;
}

export interface Contact {
  email: string;
  function: string;
  links: Link[];
  member: string;
  name: string;
  phone_number: string;
}

export interface Link2 {
  href: string;
  method: string;
  rel: string;
}

export interface Group {
  readonly addresses?: Address[];
  readonly bankAccount?: string;
  readonly contacts?: Contact[];
  readonly dateOfFoundation?: Date;
  readonly email?: string;
  readonly fullName?: string;
  readonly groupAdminId: string;
  readonly links?: Link2[];
  readonly name?: string;
  readonly number?: string;
  readonly onlyLeaders?: boolean;
  readonly showMembersImproved?: boolean;
  readonly type?: string;
  readonly website?: string;
  readonly isDistrictCommissioner?: boolean;
  readonly isGroupLeader?: boolean;
  readonly isSectionLeader?: boolean;
  readonly isAdmin?: boolean;

}

export const GroupDeserializer = (input: any): Group => {
  const single: Group = {
    addresses: input.addresses ? input.addresses : undefined,
    bankAccount: input.bank_account ? input.bank_account : undefined,
    contacts: input.contacts ? input.contacts : undefined,
    dateOfFoundation: input.date_of_foundation ? input.date_of_foundation : undefined,
    email: input.email ? input.email : undefined,
    fullName: input.full_name ? input.full_name : undefined,
    groupAdminId: input.group_admin_id ? input.group_admin_id : undefined,
    links: input.links ? input.links : undefined,
    name: input.name ? input.name : undefined,
    number: input.number ? input.number : undefined,
    onlyLeaders: input.only_leaders ? input.only_leaders : undefined, 
    showMembersImproved: input.show_members_improved ? input.show_members_improved : undefined,
    type: input.type ? input.type : undefined,
    website: input.website ? input.website : undefined,
    isDistrictCommissioner: input.is_district_commissioner ? input.is_district_commissioner : false,
    isGroupLeader: input.is_group_leader ? input.is_group_leader : false, 
    isSectionLeader: input.is_section_leader ? input.is_section_leader : false,
    isAdmin: input.is_admin ? input.is_admin : false
  }
  
  return single
}

export const GroupSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
  }

  return single
}
