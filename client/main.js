import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { LocalPortfolios, Portfolios } from '../collections/portfolio.js';
import { Coins } from '../collections/coins.js';

import { SELECTED_PORTFOLIO_ID } from './SelectPortfolio.js';
import './main.html';
import './SelectPortfolio.js';
import './Portfolio.js';
import './CoinForm.js'
import './CoinList.js';

Template.registerHelper('portfolioSelected', function () {
    const portfolio = LocalPortfolios.findOne(Session.get(SELECTED_PORTFOLIO_ID));
    let coinMap = {};
    if (portfolio) {
        for (let coin of portfolio.coins) {
            if (coinMap[coin._id] && coin.quantity) {
                coinMap[coin._id].quantity += parseFloat(coin.quantity);
            } else {
                coinMap[coin._id] = {
                    name: coin.name,
                    quantity: parseFloat(coin.quantity)
                };
            }
        }
        return Object.values(coinMap);
    }
    // return Portfolios.aggregate([
    //     { $match: { _id: SELECTED_PORTFOLIO_ID } },
    //     { $unwind: "$coins" },
    //     { $group: { _id: '$coins.name', count: { $sum: '$coins.quantity' } } }
    // ]);
});