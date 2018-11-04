import { Meteor } from 'meteor/meteor';
import { Portfolios } from '../collections/portfolio.js';
import { Coins } from '../collections/coins.js';

Meteor.startup(() => {
  if (Coins.find().count() === 0) {
    const coins = [
      {
        name: 'ADA',
        description: 'Cardano',
        current_price: 0.0971,
      },
      {
        name: 'BTC',
        description: 'Bitcoin',
        current_price: 8350.97,
      },
      {
        name: 'LTC',
        description: 'Litecoin',
        current_price: 66.97,
      }
    ];
    for (let coin of coins) {
      Coins.insert(coin);
    }
    Coins.createIndex({ name: 1 }, { unique: true });
  }
  if (Portfolios.find().count() === 0) {
    const portfolios = [
      {
        name: '1',
        coins: []
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
