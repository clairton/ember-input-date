//addon/components/input-date.js

import Ember from 'ember';
import moment from 'moment';

export default Ember.TextField.extend({
  type: 'date',

  hasFocus: false,

  placeholder: Ember.computed('dateFormat', function(){
    return this.get('dateFormat');
  }),

  dateFormat: 'MM/DD/YYYY',

  updateValueOnInit: Ember.on('init', function(){
    this.updateValue();
  }),

  updateDate: Ember.observer('value', function(){
    let date = moment.utc(this.get('value'), this.get('dateFormat'));
    if(date && date.isValid()){
      this.set('date', date);
    }
  }),

  updateValue: Ember.observer('date', function(){
    if(!this.get('hasFocus')){
  	  if(this.get('date')){
  	  	if(moment.isMoment(this.get('date'))){
  	  	  this.set('value', this.get('date').utc().format(this.get('dateFormat')));
  	  	} else {
  	  	  this.set('value', moment.utc(this.get('date')));
  	  	}
  	  }
  	}
  }),

  focusIn(){
    this.set('hasFocus', true);
  },

  focusOut(){
    this.set('hasFocus', false);
    this.updateValue();
  }
});
