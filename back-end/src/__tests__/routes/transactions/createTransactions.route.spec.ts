import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("Testing the route create transactions", () => {
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

  test("Should be able to create a new transactions", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = "abcd1234"              

    const userDataLogin = { email, password }

    const userData = { name, email, password }

    await request(app).post("/user").send(userData)

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    const token = responseLogin.body.token

    const response = await request(app).post("/transactions").set("Authorization", `Bearer ${token}`).attach("file", `${__dirname}/testFiles/sales.txt`)

    expect(response.status).toBe(201)

    expect(response.body).toEqual(     
      expect.objectContaining({"message": "transactions saved to database successfully"})        
    )   

  });

  test("It should not be possible to create new transactions from non-txt files", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = "abcd1234"              

    const userDataLogin = { email, password }

    const userData = { name, email, password }

    await request(app).post("/user").send(userData)

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    const token = responseLogin.body.token

    const response = await request(app).post("/transactions").set("Authorization", `Bearer ${token}`).attach("file", `${__dirname}/testFiles/test.png`)

    expect(response.status).toBe(400)

    expect(response.body).toEqual(     
      expect.objectContaining({"message": "The file format must be 'txt'."})        
    )   

  });

  test("It should not be possible to create new transactions from a txt file without transactions data", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = "abcd1234"              

    const userDataLogin = { email, password }

    const userData = { name, email, password }

    await request(app).post("/user").send(userData)

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    const token = responseLogin.body.token

    const response = await request(app).post("/transactions").set("Authorization", `Bearer ${token}`).attach("file", `${__dirname}/testFiles/test.txt`)

    expect(response.status).toBe(400)

    expect(response.body).toEqual(     
      expect.objectContaining({"message": "The file has no transaction data"})        
    )   

  });

  test("It should not be possible to create new transactions without valid txt archive", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = "abcd1234"              

    const userDataLogin = { email, password }

    const userData = { name, email, password }

    await request(app).post("/user").send(userData)

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    const token = responseLogin.body.token

    const response = await request(app).post("/transactions").set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)

    expect(response.body).toEqual(     
      expect.objectContaining({"message": "No files sent."})        
    )   

  });
  
})