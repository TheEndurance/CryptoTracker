import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict'
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

Template.portfolio.helpers({
    portfolio() {
        return Portfolios.findOne({
            _id: Session.get(SELECTED_PORTFOLIO_ID)
        });
    }
});

Template.coinList.events({
    'click .js-delete-coin'(evt) {
        evt.preventDefault();
        Portfolios.update({_id: Session.get(SELECTED_PORTFOLIO_ID)}, {$pull: {'coins' : {name: evt.target.dataset.id}}})
    }
})

Template.coinForm.events({
    'submit #coinForm'(evt) {
        evt.preventDefault();
        const coinName = $('input[id=coinName]').val();
        const coinQuantity = $('input[id=coinQuantity]').val();
        Portfolios.update({ _id: Session.get(SELECTED_PORTFOLIO_ID) }, { $addToSet: { coins: { name: coinName, quantity: coinQuantity } } });
        $('#coinForm input').each(function (idx) {
            $(this).val('');
        });
    }
});

