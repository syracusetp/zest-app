Fix imagemin:
	https://github.com/DaftMonk/generator-angular-fullstack/issues/123
	https://github.com/gruntjs/grunt-contrib-imagemin/issues/214
```sh
$ npm cache clean && npm install gruntjs/grunt-contrib-imagemin
```


Heroku Add-Ons
```sh
$ npm install pg --save
$ cd dist
$ heroku addons:create mongolab
$ heroku addons:create heroku-postgresql:hobby-dev
```

Install Sequelize and MySQL
```sh
$ npm install sequelize --save
$ npm install mysql --save 
```
