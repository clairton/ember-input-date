//blueprints/ember-dateinput/index.js

/*jshint node:true*/
module.exports = {
  description: 'Install dependencies',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  included: function(app) {
    this._super.included(app);
    app.import('bower_components/vanilla-masker/build/vanilla-masker.min.js');
  },

  afterInstall: function() {
    return this.addAddonToProject('ember-cli-moment-shim', '^3.0.0')
    .then(() => {
      this.addBowerPackageToProject('vanilla-masker', '^1.1.1');
    });
  }
};
