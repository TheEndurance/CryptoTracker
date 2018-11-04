import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Portfolios } from '../collections/portfolio.js';
import { Coins } from '../collections/coins.js';

import { SELECTED_PORTFOLIO_ID } from './SelectPortfolio.js';
import './CoinForm.html';

Template.coinForm.onCreated(function () {
    this.coinId = new ReactiveVar(null);
});

Template.coinForm.helpers({
    showCoinMeta() {
        return Template.instance().coinId.get();
    },
    coinMeta() {
        return Coins.findOne({ _id: Template.instance().coinId.get() }, { description: 1, current_price: 1 });
    },
    coins() {
        return Coins.find({}, { fields: { name: 1, _id: 1 } });
    },
    isSelected() {
        return (Template.instance().coinId.get() === this._id) ? 'selected' : '';
    }
});


Template.coinForm.events({
    'change #selectCoin'(evt, instance) {
        instance.coinId.set(evt.currentTarget.value);
    },
    'submit #coinForm'(evt, instance) {
        evt.preventDefault();
        const coinId = instance.coinId.get();
        const coinQuantity = evt.target.coinQuantity;
        if ((coinId) && (coinQuantity && coinQuantity.value)) {

            const coin = Coins.findOne({ _id: coinId }, { name: 1 });
            if (coin) {
                Portfolios.update({ _id: Session.get(SELECTED_PORTFOLIO_ID) }, { $addToSet: { coins: {_id: coinId, name: coin.name, quantity: coinQuantity.value } } });
                coinQuantity.value = "";
            }
        }

    }
});
