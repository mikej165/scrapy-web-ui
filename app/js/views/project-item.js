/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 1:47 PM
 */
Scrapy.Views.ProjectItem = Marionette.ItemView.extend({
    template: function(){
        return Marionette.TemplateCache.get('project-item')();
    }
});