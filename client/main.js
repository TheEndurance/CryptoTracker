import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Portfolios } from '../collections/portfolio.js';
import { Tracker } from 'meteor/tracker';
import './main.html';

const SELECTED_PORTFOLIO_ID = 'selectedPortfolioId';

Tracker.autorun(function () {
    console.log("The selected portfolio ID is: " + Session.get(SELECTED_PORTFOLIO_ID));
});


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

Template.coinList.helpers({
    portfolio(){
        return Portfolios.findOne({
            _id: Session.get(SELECTED_PORTFOLIO_ID)
        });
    }
})