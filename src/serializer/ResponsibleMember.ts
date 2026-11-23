import { Group } from './Group'

export interface ResponsibleMember {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly scoutsGroups?: Group[],
  public permissions: Array<string> = [],
}
