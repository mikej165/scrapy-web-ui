/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 10:54 AM
 */
Scrapy.Collections.Jobs = Backbone.Collection.extend({

    url: function(){
        return Scrapy.SERVER + '/listjobs.json?project=' + this.project;
    },

    parse: function(response){
        var jobs = [];
        var self = this;
        // Add the
        _.each(['finished','pending','running'], function(state){
            _.each(response[state], function(m){
                m['state'] = state;
                if(!_.isEmpty(m['start_time']) && !_.isEmpty(m['end_time'])){
                    var start = new Date(m['start_time']);
                    var end = new  Date(m['end_time']);
                    var runtime = Scrapy.utils.timeElapsed(start,end);
                    m['runtime'] = runtime;

//                    m['start_time'] = Scrapy.utils.getShortDateTime(new Date(m['start_time']));
//                    m['end_time'] = Scrapy.utils.getShortDateTime(new Date(m['start_time']));
                }
                else{
                    m['runtime'] = '';
                }

                m['project'] = self.project;
                jobs.push(m);
            });
        });
        return jobs;
    }
});