import { FileItem } from "@/serializer/FileItem"
import { Member } from "@/serializer/Member"
import { PostLocation } from "@/serializer/PostLocation"

export const useSelectionHelper = (): {
  displayCheck: (isMultiple: boolean, member: Member, members: Member[]) => Boolean,
  checkForIdMatch: (obj1: any, obj2: any) => Boolean,
  displayCheckFile: (file: FileItem, files: FileItem[]) => Boolean,
  displayCheckLocation: (isMultiple: boolean, location: PostLocation, locations: PostLocation[]) => Boolean,
} => {


  const displayCheck = (isMultiple: boolean, member: Member, members: Member[]) => {
    if (!isMultiple && members.some((f: Member) => f.isChecked == true) && !member.isChecked) {
        return false
    } else {
      return true
    }
  }

  const displayCheckLocation = (isMultiple: boolean, location: PostLocation, locations: PostLocation[]) => {
    if (!isMultiple && locations.some((l: any) => l.isChecked == true) && !location.isChecked) {
        return false
    } else {
      return true
    }
  }

  const displayCheckFile = (file: FileItem, files: FileItem[]) => {
    if (files.some((f: FileItem) => f.isChecked == true) && !file.isChecked) {
        return false
    } else {
      return true
    }
  }

  const checkForIdMatch = (obj1: any, obj2: any): boolean => {
    if (obj1.id === obj2.id) {
      return true
    }  else {
      return false
    }
  }

  return {
    displayCheck,
    checkForIdMatch,
    displayCheckFile,
    displayCheckLocation
  }
}