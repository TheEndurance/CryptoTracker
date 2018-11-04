import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Portfolios } from '../collections/portfolio.js';

import { SELECTED_PORTFOLIO_ID } from './SelectPortfolio.js';
import './Portfolio.html';

Template.portfolio.helpers({
    coins() {
        const portfolio = Portfolios.findOne({
            _id: Session.get(SELECTED_PORTFOLIO_ID)
        });
        let coinMap = {};
        debugger;
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
    }
});


// return Portfolios.aggregate([
//     { $match: { _id: SELECTED_PORTFOLIO_ID } },
//     { $unwind: "$coins" },
//     { $group: { _id: '$coins.name', count: { $sum: '$coins.quantity' } } }
// ]);