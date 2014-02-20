/**
 * Author: Michael R. Johnston
 * Date: 2/19/14
 * Time: 10:34 AM
 */
Scrapy.Routers.ApplicationRouter = Backbone.Router.extend({
    routes: {
        'dashboard':        'dashboard',
        'documentation':    'documentation',
        'items':            'items',
        'jobs':             'jobs',
        'logs':             'logs',
        'projects':         'projects',
        'spiders':          'spiders',
        '404(/:url)':       '404',
        '*actions':         'jobs' // Catch-all
    }
});
