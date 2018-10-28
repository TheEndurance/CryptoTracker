import { Meteor } from 'meteor/meteor';
import { Portfolios } from '../collections/portfolio.js';
import {Mongo} from 'meteor/mongo';
Meteor.startup(() => {
  Mongo.Collection.drop
  if (Portfolios.find().count() === 0) {
    const portfolios = [
      {
        name: '1',
        coins: [
          {
            name: 'ADA',
            quantity: 9500.00
          },
          {
            name: 'BTC',
            quantity: 0.5
          },
          {
            name: 'ETH',
            quantity: 2.45678
          },
        ]
      },
      {
        name: '2',
        coins: []
      },
      {
        name: '3',
        coins: []
      },
      {
        name: '4',
        coins: []
      },
    ];
    for (let portfolio of portfolios) {
      Portfolios.insert(portfolio);
      console.log('Added portfolio');
    }
  }
});
