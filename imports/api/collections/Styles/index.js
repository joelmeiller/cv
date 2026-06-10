import { Mongo } from 'meteor/mongo'

export { StyleType } from './StyleType'

export const Styles = new Mongo.Collection('Styles')
