import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Portfolios} from '../collections/portfolio.js';

import './SelectPortfolio.html';
export const SELECTED_PORTFOLIO_ID = 'selectedPortfolioId';
Session.setDefault(SELECTED_PORTFOLIO_ID, '');

Template.selectPortfolio.helpers({
    portfolioId() {
        return Portfolios.find({}, { fields: { name: 1, _id: 1 } });
    },
    isSelected() {
        return Session.equals(SELECTED_PORTFOLIO_ID, this._id) ? 'selected' : '';
    },
});

Template.selectPortfolio.events({
    'change #selectPortfolio'(evt) {
        Session.set(SELECTED_PORTFOLIO_ID, evt.currentTarget.value);
    }
});