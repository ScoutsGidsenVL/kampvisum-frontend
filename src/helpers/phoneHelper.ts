export const usePhoneHelper = (): {
  checkIfIsMobileSize: () => boolean
} => {

  const checkIfIsMobileSize = (): boolean => {
    let isMobile = ((window.innerWidth <= 800 ) || ( window.innerHeight <= 600))
    console.log('IS MOBILE: ', isMobile)
    return isMobile
  }

  return {
    checkIfIsMobileSize,
  }
}