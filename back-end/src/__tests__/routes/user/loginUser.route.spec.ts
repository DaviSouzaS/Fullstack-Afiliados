import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("Testing the login route", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      });
  });

  afterAll(async () => {
    await connection.destroy()
  });

  test("Should be able to log in", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = "abcd1234"              

    const userDataLogin = { email, password }

    const userData = { name, email, password }

    await request(app).post("/user").send(userData)

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    expect(responseLogin.status).toBe(200)

    expect(responseLogin.body).toEqual(     
      expect.objectContaining({        
        id: 1,  
        email,  
        name,
        token: responseLogin.body.token
      })        
    )        
  })

  test("Should not be able to log in with invalid data", async () => {
          
    const email = "emailmail.com"
    const password = 12345            

    const userDataLogin = { email, password }

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    expect(responseLogin.status).toBe(400)

    expect(responseLogin.body).toEqual(     
      expect.objectContaining({        
        "message": {
          "email": [
            "Invalid email"
          ],
          "password": [
            "Expected string, received number"
          ]
      }
      })        
    )   
  })

  test("Users should not be able to log in with a nonexistent account", async () => {
          
    const email = "testeErro@mail.com"
    const password = "12345678"   

    const userDataLogin = { email, password }

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    expect(responseLogin.status).toBe(401)

    expect(responseLogin.body).toEqual(     
      expect.objectContaining({"message": "Invalid credentials"})        
    )   
  })

})