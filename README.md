# TaskBoard Project 

* Firstly run the command `npm install` for both front-end and back-end directories.

* This folder contains both server and client side code which can be started locally with command `npm start`.

* `npm start` command should be run by navigating in to the respective folders seperately.

* Backend consists of complete api's with their routing and controllers seperately.

* To connect with database one have change the mongourl of their own account and start.

* Complete user authentication was setup where user can signup and login a `token` will be generated and will stored in ngrx store as described in the assignment description.

* With out this token user cannot view home page.

* Now logged in user can create, update and delete tasks accordingly.

* Drag and Drop of the task along the table columns is also implemented which is dynamic, the status of the  task won't change even if the page is refreshed untill another api call is made.

