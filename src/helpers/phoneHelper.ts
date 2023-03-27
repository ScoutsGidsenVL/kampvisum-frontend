export const usePhoneHelper = (): {
  checkIfIsMobileSize: () => boolean
} => {

  const checkIfIsMobileSize = (): boolean => {
    if (window.innerWidth <= 800) {
      return true
    } else {
      return false
    }
  }

  return {
    checkIfIsMobileSize,
  }
}