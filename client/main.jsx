import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import React from 'react';

import Routes from '../imports/ui/Routes';

import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('react-target'));
});
