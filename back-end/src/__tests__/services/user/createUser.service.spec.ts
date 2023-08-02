import { createUserService } from "../../../services/createUser.service";
import { DataSource } from "typeorm";                 
import { AppDataSource } from "../../../data-source"; 
import { hashSync } from "bcryptjs";

describe("Create an user", () => {
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

    test("Should insert the information of the new user in the database", async () => {
        
    const email = "teste@mail.com"
    const name = "name"  
    const password = hashSync("abcd1234", 10)                

    const userData = { email, name, password }

    const newUser = await createUserService(userData)

    expect(newUser).toEqual(
    expect.objectContaining({ 
        id: 1,       
        email,       
        name,        
        password,         
    }))       
  })
})