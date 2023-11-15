import { Meteor } from 'meteor/meteor'
import { WebAppInternals } from 'meteor/webapp'
import { WebApp } from 'meteor/webapp'

export const useCDN = () => {
  /*
   * Use CDN (Cloudfront) to serve app
   */

  if (Meteor.settings.cdn?.prefix) {
    WebAppInternals.setBundledJsCssUrlRewriteHook((url) => {
      const prefix = `https://${Meteor.settings.cdn.prefix}${url}`
      return prefix
    })
  }

  // Listen to incoming HTTP requests, can only be used on the server
  WebApp.rawConnectHandlers.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type')
    return next()
  })
}
