import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController {
    getAllUsers(req, res){
        const users = UserModel.allUser();
        res.status(201).send(users);
    }
    signUp(req, res){
        const { name, email, password} = req.body;
        const createUser = UserModel.signUp(name, email, password);
        res.status(201).send(createUser);
    }
    signIn(req, res){
        const result = UserModel.signIn(req.body.email, req.body.password);
        if(!result){
            return res.status(400).send("Incorrect Credentials");
        }else{
            const token = jwt.sign(
                { userId: result.id, email: result.email },
                "EN5kquLDuKMTtyURxipAnHgGJCQ7Hl6d",
                {
                    expiresIn: '1h',
                }
            );
            return res.status(200).send(token);
        }
    }
}