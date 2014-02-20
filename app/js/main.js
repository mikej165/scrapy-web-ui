/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 10:11 AM
 */
Scrapy = {
    Models:{},
    Collections:{},
    Views:{},
    Routers: {},
    Router: undefined,
    Broker:{},
    Layouts: {},

    init:function () {

        Scrapy.PROXY = 'http://localhost:' + config.settings.local_port;

        // Create an event broker
        Scrapy.events = _.clone(Backbone.Events);

        Scrapy.Router = new Scrapy.Routers.ApplicationRouter;

        // Override the default Marionette render method so we can use Mustache
        Marionette.Renderer.render = function(template, data){
            return Mustache.render(template(),data);
        };

        // Override the default load method and pull the templates from the server instead
        Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
            var myTemplate ='';
            $.ajax({
                url: 'templates/' + templateId + '.html',
                async: false,
                method: 'GET',
                datatype: 'html',
                success: function (data) {
                    myTemplate = data;
                }
            });

            return myTemplate;
        };


        var mainRegion = new Marionette.Region({
            el: "#main-container"
        });


        // 404
        Scrapy.Router.on('route:404', function(url){
            var fourOhFourView = new Scrapy.Views.FourOhFour({
                template: Marionette.TemplateCache.get('404'),
                model: new Backbone.Model({page: url})
            });
            mainRegion.show(fourOhFourView);
        });


        // Dashboard
        Scrapy.Router.on('route:dashboard', function (){
            var dashboardView = new Scrapy.Views.Dashboard({
                template: Marionette.TemplateCache.get('dashboard')
            });
            dashboardView.render();
            Scrapy.utils.fadeInRegion(mainRegion, dashboardView);
        });


        // Jobs
        Scrapy.Router.on('route:jobs', function(){
            var jobsCollection = new Scrapy.Collections.Jobs;
            jobsCollection.project = 'mailchimp';

            jobsCollection.fetch({
                success: function(){
                    var jobsView = new Scrapy.Views.Jobs({
                        collection: jobsCollection,
                        itemView: Scrapy.Views.JobItem,
                        template: Marionette.TemplateCache.get('jobs')
                    });
                    jobsView.render();
                    mainRegion.show(jobsView);
                }
            })
        });


        // Logs
        Scrapy.Router.on('route:logs', function (){
            var logsView = new Scrapy.Views.Logs({
                template: Marionette.TemplateCache.get('logs')
            });
            mainRegion.show(logsView);
        });


        // Projects
        Scrapy.Router.on('route:projects', function(){
            var projectsCollection = new Scrapy.Collections.Projects;
            projectsCollection.fetch({
                success: function(){
                    var projectView = new Scrapy.Views.Projects({
                        collection: projectsCollection,
                        itemView: Scrapy.Views.ProjectItem
                    });
                    projectView.render();
                    mainRegion.show(projectView);
                }
            })
        });

        // Spiders
        Scrapy.Router.on('route:spiders', function(){
            var spiderCollection = new Scrapy.Collections.Spiders;
            spiderCollection.project = 'mailchimp';

            spiderCollection.fetch({
                success: function(){
                    var spidersView = new Scrapy.Views.Spiders({
                        collection: spiderCollection,
                        itemView: Scrapy.Views.SpiderItem
                    });
                    spidersView.render();
                    mainRegion.show(spidersView);
                }
            })
        });


        // Documentation
        Scrapy.Router.on('route:documentation', function (){
            var documentationView = new Scrapy.Views.Documentation({
                template: Marionette.TemplateCache.get('documentation')
            });
            mainRegion.show(documentationView);
        });


        Backbone.history.start();
    }
};

$(document).ready(function () {
    Scrapy.init();
});
