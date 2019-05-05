import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

//connect to the model 
import {UserModel} from './model/UserModel'

// Creates and configures an ExpressJS web server.
class User {

    public Users: UserModel;

    //Run configuration methods on the Express instance.
    constructor() {
        this.Users = new UserModel();
    }

    public registerRoutes(router: express.Router) {
        this.routes(router);
    }

    // Configure API endpoints.
    private routes(router: express.Router): void {
        router.get('/user', async (req, res) => {
            console.log('get all users');
            var users = await this.Users.getAllUsers();
            console.log('get all users finished');
            res.status(200).send(users);
        });

        router.get('/user/:userID',async (req, res) => {
            var userID = req.params.userID;
            var user = await this.Users.getUserByID(userID);
            console.log('in get route:', user);
            res.status(200).send(user);
        });

        router.delete('/user/:userID',async (req, res) => {
            var userID = req.params.userID;
            var user = await this.Users.deleteUserByID(userID);
            console.log('in delete route:', user);
            res.status(200).send(user);
        });

        router.put('/user/:userID',async (req, res) => {
            var userID = req.params.userID;
            var userBody = req.body;
            var successOrNot = await this.Users.updateUser(userID, userBody);
            console.log('in update route:', successOrNot);
            res.status(200).send(successOrNot);
        });

        router.post('/user', async (req, res) => {
            var user = req.body;
            var successOrNot = await this.Users.createUser(user);
            console.log('in create route:', successOrNot);
            res.status(200).send(successOrNot);
        });
    }
}

export {User};