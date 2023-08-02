import { loginUserService } from "../../../services/loginUser.service";
import { DataSource } from "typeorm";                 
import { AppDataSource } from "../../../data-source"; 
import { createUserService } from "../../../services/createUser.service";
import { hashSync } from "bcryptjs";

describe("User login", () => {
    let connection: DataSource         

    beforeAll(async () => {                 
        await AppDataSource.initialize()      
        .then((res) => (connection = res))  
        .catch((err) => {         
            console.error("Error during Data Source initialization", err)
        })     
    })                      

    afterAll(async () => {        
        await connection.destroy()
    });                           

    test("Should generate a token if email and password are correct", async () => {

    const name = "name"  
    const email = "teste@mail.com"
    const password = "abcd1234"               

    const hashPassword = hashSync(password, 10)

    const createUserData = {name, email, password: hashPassword}
    
    await createUserService(createUserData)

    const userData = { email, password }

    const newUser = await loginUserService(userData)

    expect(newUser).toEqual(
    expect.objectContaining({ 
        id: 1,       
        name, 
        email,       
        token: newUser.token
    }))       
  })
})