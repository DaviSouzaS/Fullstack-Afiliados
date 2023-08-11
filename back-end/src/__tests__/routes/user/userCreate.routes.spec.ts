import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { hashSync } from "bcryptjs";
import request from "supertest";
import app from "../../../app";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = hashSync("abcd1234", 10)                

    const userData = { email, name, password }

    const response = await request(app).post("/user").send(userData)

    expect(response.status).toBe(201)

    expect(response.body).toEqual(     
      expect.objectContaining({        
        id: 1,  
        email,  
        name
      })        
    );          

  });

  test("Users should not be able to create a new account using an email that is already in use", async () => {
          
    const email = "teste@mail.com"
    const name = "name2"  
    const password = hashSync("abcdef34", 10)                

    const userData = { email, name, password }

    const response = await request(app).post("/user").send(userData)

    expect(response.status).toBe(409)

    expect(response.body).toEqual(     
      expect.objectContaining({"message": "Email is already being used"})        
    );          
  });

  test("Users should not be able to create a new account with invalid data", async () => {
          
    const email = "testemail.com"
    const name = 131233  
    const password = "12348"              

    const userData = { email, name, password }

    const response = await request(app).post("/user").send(userData)

    expect(response.status).toBe(400)

    expect(response.body).toEqual(     
      expect.objectContaining({
        "message": {
            "name": [
                "Expected string, received number"
            ],
            "email": [
                "Invalid email"
            ],
            "password": [
                "String must contain at least 8 character(s)"
            ],
        }
      })        
    );          
  });
});