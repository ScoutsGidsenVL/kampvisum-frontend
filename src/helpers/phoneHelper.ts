export const usePhoneHelper = (): {
  checkIfIsMobileSize: () => boolean
} => {

  const checkIfIsMobileSize = (): boolean => {
    let isMobile = ((window.innerWidth <= 800 ) || ( window.innerHeight <= 600))
    return isMobile
  }

  return {
    checkIfIsMobileSize,
  }
}