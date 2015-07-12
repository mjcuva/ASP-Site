# Alpha Sigma Phi Rho Colony Website

Need to install  [https://www.mongodb.org/](mongodb) seperately

Steps for running Locally: 

1. Clone
2. `npm install`
3. Start mongo - `sudo mongod &` (& runs the command in a seperate process, will keep running until it is killed `kill pid`)
4. `gulp` (Need another terminal window for this. Will try to combine steps 4 and 5, just haven't figured it out yet)
5. `npm start`
6. [http://localhost:3000](http://localhost:3000)


Stuff we need on the backend
    - Users
    - "Modules" - Text, Title and image that will show up on the front page beneath the hero image
    - Post - Something that can show up on a news page
    - Way to handle images (Could we maybe use s3?, I think we did something similar with the echo spot)
    - What should we do with contact information that gets entered?
