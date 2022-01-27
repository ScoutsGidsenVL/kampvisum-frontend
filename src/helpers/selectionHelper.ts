import { Member } from "@/serializer/Member"

export const useSelectionHelper = (): {
  displayCheck: (isMultiple: boolean, member: Member, members: Member[]) => Boolean,
  checkForIdMatch: (memb1: Member, memb2: Member) => Boolean
} => {


  const displayCheck = (isMultiple: boolean, member: Member, members: Member[]) => {
    if (!isMultiple && members.some((f: Member) => f.isChecked == true) && !member.isChecked) {
        return false
    } else {
      return true
    }
  }

  const checkForIdMatch = (memb1: Member, memb2: Member): boolean => {
    if (memb1.id === memb2.id) {
      return true
    }  else {
      return false
    }
  }

  return {
    displayCheck,
    checkForIdMatch
  }
}