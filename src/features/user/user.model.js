export default class UserModel{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static allUser(){
        return users;
    }
    static signUp(name, email, password){
        const newUser = new UserModel(users.length + 1,name,email,password);
        users.push(newUser);
        return newUser;
    }
    static signIn(email, password){
        const user = users.find((u)=> u.email == email && u.password == password);
        return user;
    }
}

let users = [{
    id: 1,
    name: "User One",
    email: "userone@social.com",
    password:"Password1",
},
{
    id: 2,
    name: "User Two",
    email: "usertwo@social.com",
    password:"Password1",
}]