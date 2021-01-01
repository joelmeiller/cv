import { Meteor } from 'meteor/meteor'
import { WebApp, WebAppInternals } from 'meteor/webapp'

export const useCDN = () => {
  /*
   * Use CDN (Cloudfront) to serve app
   */

  if (Meteor.isProduction) {
    WebAppInternals.setBundledJsCssUrlRewriteHook((url) => {
      const prefix = `https://${Meteor.settings.cdn.prefix}${url}&_g_app_v_=${process.env.GALAXY_APP_VERSION_ID}`
      return prefix
    })
  }

  WebApp.rawConnectHandlers.use(function (req, res, next) {
    if (req._parsedUrl.pathname.match(/\.(ttf|ttc|otf|eot|woff|woff2|font\.css|css)$/)) {
      res.setHeader('Access-Control-Allow-Origin', '*')
    }
    next()
  })
}
