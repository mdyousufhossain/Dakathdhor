import express, { Router } from 'express';
import { HandleloginUser } from '../Controller/Users.Controller';

const router: Router = express.Router();

// Member register handler
router.post('/user/login', (req, res) => {
    console.log('Login route hit'); // to test if its hitss brraa
    /**
     * we can have a test here in further dev we can even use ip and mac address to identify
     * for the users so user dont have relogin everytime , requesting from direcly to the server is bit costly
     * but we will have security issue so we will use some sorta caching server or trusted device spell :>
     * 
     * im a man with mad idea lol
     */
    HandleloginUser(req, res);
  });
  

export default router;
