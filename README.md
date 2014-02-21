scrapy-web-ui
=============

A simple UI alternative the [scrapyd](https://github.com/scrapy/scrapyd) builtin UI. At present, functionality is limited to viewing the list of jobs (running, pending and finished), viewing logs and viewing items.
Near-term enhancements will include:

 * Full support for all API calls, including those not presently offered in the default scrapyd UI, such as scheduling and canceling jobs
 * Deploying new projects
 * Rudimentary stats reporting
 * Log viewer with advanced filtering and searching
 * Multiple scrapyd hosts


### Requirements
* node.js

### To Configure
* Edit **app/config.js** and enter the hostname and port number of your scrapyd server
* Change **local_port** if port 3000 is already being used on your machine

### To Run

	cd app
	node app.js

Scrapy-web-ui should immediately open in your default web browser. If it doesn't, connect to the following url:

    http://localhost:3000/index.html

### Notes
* app.js directly serves up the local html/js/css to your browser while proxying all scrapyd API calls to the server you've configured. This is to get around cross-site request limitations of most browsers
* The app assumes the remote scrapyd is running without user authentication, as is the default. Future versions will provide support for different means scrapyd user authentication. (Suggestions of what to support are welcome).
* If you are using scrapyd in its default configuration on a server open to the world, at a minimum you should be restricting access to the server by firewalling it to allow requests only from your IP
