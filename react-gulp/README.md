# How to Build

You need to install nodejs, npm, bower, webpack, and gulp.

 1. run **npm install**
 2. run **bower install**
 3. modify the *"mode"* property in package.json (you can choose **"dev"** for development
 or **"prod"** for production).
 4. run **gulp** -- if package.json's **"mode":"dev"** build will run and a browser window will open and show your app; otherwise full build will proceed.

For more details see guilpfile.js, webpack.config.js, and bower.json