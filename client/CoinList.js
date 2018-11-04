import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Portfolios } from '../collections/portfolio.js';

import { SELECTED_PORTFOLIO_ID } from './SelectPortfolio.js';
import './CoinList.html';

Template.coinList.events({
    'click .js-delete-coin'(evt) {
        evt.preventDefault();
        Portfolios.update({ _id: Session.get(SELECTED_PORTFOLIO_ID) }, { $pull: { 'coins': { name: evt.target.dataset.id } } })
    }
});

