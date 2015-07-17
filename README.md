# Alpha Sigma Phi Rho Colony Website

Need to install  [mongodb](https://www.mongodb.org/) seperately

Steps for running Locally: 

1. Clone
2. `npm install`
3. Start mongo - `sudo mongod &` (& runs the command in a seperate process, will keep running until it is killed `kill pid`)
4. `gulp` (Need another terminal window for this. Will try to combine steps 4 and 5, just haven't figured it out yet)
5. `npm start`
6. [http://localhost:3000](http://localhost:3000)


Models
* Users (Gonna just use the same code from the treasurer site)
* Modules
    - Title
    - Text
    - ImageURL
* Post 
    - Title
    - Text
    - Image (Optional)
* Gallery
    - Title
    - Images
* Image (Link to s3)
    - Title (Default to image name)
    - URL
* PNM (For more information form)
    - Name
    - Email
    - Year in School

[Angular Best Practices](https://github.com/johnpapa/angular-styleguide)

# Style Guide

## Node

* require statements go at the top
* Models must be uppercase
    - Ex. var User = mongoose.model('User');
* Must follow strict JS
    - Gulp linter will catch this stuff