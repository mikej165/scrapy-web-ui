/**
 * Author: Michael R. Johnston
 * Date: 2/20/14
 * Time: 5:13 PM
 */
Scrapy.Views.Log = Marionette.ItemView.extend({
    events:{
        "click #refresh": 'refresh',
        "click #scroll-to-top": 'scrollToTop',
        "click #scroll-to-bottom": 'scrollToBottom'
    },

    initialize: function(){
        this.model.on('change', this.render, this);
    },

    render: function(){
        var self = this;
        var log = '';
        var logRowTemplate = Marionette.TemplateCache.get('log-row')();

        _.each(self.model.get('log'), function(line){
            var className = '';
            var rowType;

            _.each(['INFO','WARNING','ERROR'], function(t){
                if(line.indexOf(t) != -1 )
                    rowType = t;
            });


            if(rowType === 'INFO') {
                if(self.model.get('infoEnabled')){
                    className = 'text-success';
                    log += Mustache.render(logRowTemplate, {'line': line, 'className': className});
                }
            }

            if(rowType === 'WARNING') {
                if(self.model.get('warningEnabled')){
                    className = 'text-warning';
                    log += Mustache.render(logRowTemplate, {'line': line, 'className': className});
                }
            }

            if(rowType === 'ERROR')
                if(self.model.get('errorEnabled')){
                    className = 'text-danger';
                    log += Mustache.render(logRowTemplate, {'line': line, 'className': className});
                }
        });

        $(self.el).html(Mustache.render(self.options.template(), {
            "log": log,
            'infoEnabled': self.model.get('infoEnabled'),
            'errorEnabled': self.model.get('errorEnabled'),
            'warningEnabled': self.model.get('warningEnabled')
        }));

        $(self.el).find('#infoCheckbox').on('click',function(){
            self.model.set('infoEnabled', $(this).prop('checked'));
            self.render();
        });

        $(self.el).find('#warningCheckbox').on('click',function(){
            self.model.set('warningEnabled', $(this).prop('checked'));
            self.render();
        });

        $(self.el).find('#errorCheckbox').on('click',function(){
            self.model.set('errorEnabled', $(this).prop('checked'));
            self.render();
        });
    },

    refresh: function(){
        this.model.fetch();
    },

    scrollToTop: function(){
        window.scrollTo(0,0);
    },

    scrollToBottom: function(){

    }
});