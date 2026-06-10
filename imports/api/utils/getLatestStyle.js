import { Meteor } from 'meteor/meteor'

import { StyleType } from '../collections/Styles/StyleType'
import { Styles } from '../collections/Styles'

export const getLatestStyleAsync = async (type = StyleType.Default) => {
  const styleType = type || StyleType.Default
  const version = Meteor.settings.public.STYLE_VERSION

  return Styles.findOneAsync({ type: styleType, version })
}
