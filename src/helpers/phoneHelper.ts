export const usePhoneHelper = (): {
  checkIfIsMobileSize: () => boolean
} => {

  const checkIfIsMobileSize = (): boolean => {
    return ((window.innerWidth <= 800 ) || ( window.innerHeight <= 600))
  }

  return {
    checkIfIsMobileSize,
  }
}