import ImageColors from "react-native-image-colors"

export const getImageColors = async (uri:string)=>{
  try {
    const colors = await ImageColors.getColors(uri)
    let primary:any='#FD297D',secondary:any='white';
    switch (colors.platform) {
        case 'android':
          // android result properties
          primary = colors.dominant
          secondary = colors.platform
          break
        case 'ios':
          // iOS result properties
          primary = colors.primary
          secondary = colors.background
          break
      }
      return [primary,secondary]
  } catch (error) {
    console.log('error-1')
    return ['cyan','green']
  }
}

export const getImageColorsProfile = async (uri:string)=>{
  try {
    const colors = await ImageColors.getColors(uri)
    let primary:any='#FD297D',secondary:any='#FFFFFF';
    switch (colors.platform) {
        case 'android':
          // android result properties
          primary = colors.dominant
          break
        case 'ios':
          // iOS result properties
          primary = colors.primary
          break
      }
      return [primary,secondary]
  } catch (error) {
    console.log('error-2')
    return ['#FD297D','#FFFFFF']
  }
}