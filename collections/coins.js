import {Mongo} from 'meteor/mongo';

export const Coins = new Mongo.Collection("coins");
export const LocalCoins = new Mongo.Collection(null);