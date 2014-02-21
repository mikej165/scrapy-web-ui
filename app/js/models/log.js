/**
 * Author: Michael R. Johnston
 * Date: 2/20/14
 * Time: 4:48 PM
 */
Scrapy.Models.Log = Backbone.Model.extend({

    fetch: function(options){
        var self = this;
        var url = '/logs/' + this.get('project') + '/' + this.get('spider') + '/' + this.get('id');

        $.ajax({
            url: url,
            method: 'GET',
            success: function(reply){
                self.set('log',reply.split('\n'));
                self.set('infoEnabled', true);
                self.set('errorEnabled', true);
                self.set('warningEnabled', true);
                if(!_.isUndefined(options.success))
                    options.success();
            },
            error: function(err){
                if(!_.isUndefined(options.error))
                    options.error();
            }
        });
    }
});