/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 10:52 AM
 */
Scrapy.Collections.Projects = Backbone.Collection.extend({
    url: function(){
        return Scrapy.PROXY + '/listprojects.json';
    },

    parse: function(response){
        var projects = [];
        _.each(response.projects,function(p){
            projects.push({
                "project": p
            })
        });
        return projects;
    }
});