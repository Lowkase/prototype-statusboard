# TODO
======

# We need an autoprefixer
# Swap out compass with gulp (+autoprefixer, minifier, linter, etc)




# DEV ENVIRONMENTS
==================

Bash:
-----
	Mac
		- Terminal
	Windows 10
		- Powershell


Ruby:
-----
	Mac 
		- preloaded
		- ensure it is updated
	Windows
		- download and install
		- http://rubyinstaller.org/


Package Manager:
----------------
	Mac 
		- Homebrew
		- http://brew.sh/		
		- /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	Windows *
		- Scoop
		- http://scoop.sh/
		- iex (new-object net.webclient).downloadstring('https://get.scoop.sh')


Node.js / NPM
-------------
	Mac 
		- brew install node

	Windows
		- Download and install
		- https://nodejs.org/en/


Init NPM
--------
	- Navigate to root of project
	- npm init


Install NPM Packages
--------------------
	- npm install browser-sync --save
	- npm install del --save
	- npm install express --save
	- npm install gulp --save
	- npm install gulp-imagemin --save
	- npm install gulp-livereload --save
	- npm install gulp-minify-css --save
	- npm install gulp-sass --save
	- npm install gulp-util --save
	- npm install run-sequence --save


Browser-sync Config
-------------------
	- Ensure browser-sync code in gulp is active and livereload is commented/deleted
	- Start gulp (gulp watch)


Livereload Config
-------------------
	- Ensure livereload code in gulp is active and browser-sync is commented/deleted
	- Install livereload Chrome extension (https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
	- Start express server (node server.js)
	- Start gulp (gulp watch)
	- Open browser and goto localhost:3000
	- Activate the livereload extension for the localhost:3000 tab