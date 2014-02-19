/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 2:04 PM
 */
Scrapy.Views.SpiderItem = Marionette.ItemView.extend({
    template: function(){
        return Marionette.TemplateCache.get('spider-item')();
    }
})