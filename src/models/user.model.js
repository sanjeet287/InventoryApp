
export default class UserModel{

    constructor(id,name,email,password){
        this.id=id;
        this.name = name;
        this.email = email; 
        this.password = password;
    }

    static add(name,email,password){

        const newUser=new  UserModel(users.length+1,name,email,password);
        console.log(newUser);
        users.push(newUser);
        console.log(users);
    }

    static isValidUser(email,password){
        console.log(email+''+password);
      const result= users.find(user=> user.email===email && user.password === password);
        console.log(`valid user ${result}`);
        return result; 
    }
}

var users=[new UserModel ( 1, 'sandeep', 'a@gmail.com','1234' )];