# Alpha Sigma Phi Rho Colony Website

Need to install  [mongodb](https://www.mongodb.org/) seperately

Steps for running Locally: 

1. Clone
2. `npm install`
3. Start mongo - `sudo mongod &` (& runs the command in a seperate process, will keep running until it is killed `kill pid`)
4. `gulp` (Need another terminal window for this. Will try to combine steps 4 and 5, just haven't figured it out yet)
5. `npm start`
6. [http://localhost:3000](http://localhost:3000)

`npm test` runs tests


API Reference (We really need to authenticate anything that isn't get...)

GET - '/api/users/'
POST - '/api/users/' BODY: {'email':'mjcuva@gmail.com', 'name':'Marc Cuva', 'admin': true}
POST - '/api/users/setemail' BODY: {'email', 'name', 'admin', 'id'};

GET '/api/pnms'
POST '/api/pnms' BODY: {'name', 'email', 'yearInSchool'}
DELETE '/api/pnms' BODY: {'id':_id};

GET '/api/images?image_name='
POST '/api/images' BODY: {name: "test.jpg", url: "http://test.com/image.jpg"}
GET '/api/images/sign_s3?file_name=fname&file_type=jpg'

GET '/api/galleries/'
GET '/api/galleries/gallery?_id=id'
POST '/api/galleries/' BODY: {'name': 'Gallery Name'}
POST '/api/galleries/addimage' BODY: {'imageUrl': 'http://test.com/test.jpg', 'galleryName': 'Test'}
DELETE '/api/galleries/' BODY: {'galleryID', _id}
DELETE '/api/galleries/image' BODY: {'galleryName':'Test', 'imageID':_id}

GET '/api/posts/'
POST '/api/posts/' BODY: {'title', 'content', 'imageUrl'}
DELETE '/api/posts/' BODY: {'_id':_id}

GET '/api/modules/'
POST '/api/modules/' BODY: {'title', 'content', 'image_url'}
DELETE '/api/modules/' BODY: {'_id', _id}

POST '/api/login' BODY: {'email', 'pass'} -- Sets cookie if user credentials are correct


Models
* Users (Gonna just use the same code from the treasurer site) - Done
* Modules - Done
    - Title
    - Text
    - ImageURL
* Post - Done
    - Title
    - Text
    - Image (Optional)
* Gallery - Done
    - Title
    - Images
* Image (Link to s3) [S3 Node/Heroku Tutorial](https://devcenter.heroku.com/articles/s3-upload-node?utm_source=mkto&utm_medium=email&utm_campaign=marchnewsletter&mkt_tok=3RkMMJWWfF9wsRonuK%2FMZKXonjHpfsX54%2B4vW66%2FlMI%2F0ER3fOvrPUfGjI4AScdnI%2BSLDwEYGJlv6SgFQrjAMapmyLgLUhE%3D) - Done
    - Title (Default to image name)
    - URL
* PNM (For more information form) - Done
    - Name
    - Email
    - Year in School

[Angular Best Practices](https://github.com/johnpapa/angular-styleguide)

# Style Guide
	- Use controllerAs syntax for all controllers instead of binding properties to $scope.

## Node

* require statements go at the top
* Models must be uppercase
    - Ex. var User = mongoose.model('User');
* Must follow strict JS
    - Gulp linter will catch this stuff