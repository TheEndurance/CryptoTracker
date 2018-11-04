import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { Portfolios } from '../collections/portfolio.js';
import { Coins } from '../collections/coins.js';

import { SELECTED_PORTFOLIO_ID } from './SelectPortfolio.js';
import './main.html';
import './SelectPortfolio.js';
import './Portfolio.js';
import './CoinForm.js'
import './CoinList.js';

