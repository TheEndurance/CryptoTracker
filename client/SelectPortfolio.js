import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { LocalPortfolios, Portfolios } from '../collections/portfolio.js';

import './SelectPortfolio.html';
export const SELECTED_PORTFOLIO_ID = 'selectedPortfolioId';
Session.setDefault(SELECTED_PORTFOLIO_ID, '');

const newPortfolio = {
    name: '',
    coins: []
};

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
        const selectedId = evt.currentTarget.value;
        let newId = LocalPortfolios.upsert(selectedId, Portfolios.findOne(selectedId) || newPortfolio).insertedId;
        if (!newId) newId = selectedId;
        Session.set(SELECTED_PORTFOLIO_ID, newId);
    }
});