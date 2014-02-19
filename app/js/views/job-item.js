/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 12:47 PM
 */
Scrapy.Views.JobItem = Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'job-item',
    template: function(){
        return Marionette.TemplateCache.get('job-item')();
    },

    onRender: function(){
        var self = this;
        var c;

        self.renderDelete();
        $(self.el).find('.job-controls').css('visibility','hidden');


        $(this.el).on('mouseenter', function(){
            self.renderDelete();
            $(self.el).find('.job-controls').css('visibility','visible');
        })

        $(this.el).on('mouseleave', function(){
            self.renderDelete();
            $(self.el).find('.job-controls').css('visibility','hidden');
        });

        switch(self.model.get('state')){
            case 'running':
                c = 'success';
                break;
            case 'pending':
                c = 'warning';
                break;
        }

        $(self.el).addClass(c);
    },

    renderDelete: function(){
        var self = this;
        if(self.model.get('state') === 'finished') {
            $(self.el).find('.fa-times').hide();
        } else{
            $(self.el).find('.fa-times').show();
        }
    }
});