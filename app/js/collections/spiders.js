/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 10:53 AM
 */
Scrapy.Collections.Spiders = Backbone.Collection.extend({
    url: function(){
        return Scrapy.SERVER + '/listspiders.json?project=' + this.project;
    },

    parse: function(response){
        var spiders = [];
        _.each(response.spiders, function(s){
            spiders.push({
                "spider": s
            });
        });

        return spiders;
    }
});