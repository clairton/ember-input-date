//addon/components/input-date.js

import Ember from 'ember';
import moment from 'moment';

export default Ember.TextField.extend({

  hasFocus: false,

  placeholder: Ember.computed('dateFormat', function(){
    return this.get('dateFormat');
  }),

  dateFormat: 'DD/MM/YYYY',

  datePattern: '99/99/9999',

  updateValueOnInit: Ember.on('didInsertElement', function(){
    let pattern = this.get('datePattern');
    console.debug(`Vanilla Masker ${pattern}`)
    VMasker(this.$()).maskPattern(pattern);
    this.updateValue();
  }),

  removeMask: Ember.on('willDestroyElement', function(){
    VMasker(this.$()).unMask();
  }),

  updateDate: Ember.observer('value', function(){
    console.debug(`${this.get('value')} ${this.get('dateFormat')}`);
    let date = moment.utc(this.get('value'), this.get('dateFormat'));
    if(date && date.isValid()){
      this.set('date', date);
    } else {
      console.warn(`Invalid Date ${this.get('value')} for format ${this.get('dateFormat')}`);
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
