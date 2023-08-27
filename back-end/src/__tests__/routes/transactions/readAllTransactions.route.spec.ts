import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("Testing the route read all transactions", () => {
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

  test("If no transactions exist, it must not be possible to read all transactions", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = "abcd1234"              

    const userDataLogin = { email, password }

    const userData = { name, email, password }

    await request(app).post("/user").send(userData)

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    const token = responseLogin.body.token

    const response = await request(app).get("/transactions").set("Authorization", `Bearer ${token}`)

    console.log(response.status)

    expect(response.status).toBe(404)

    expect(response.body).toEqual(     
      expect.objectContaining({"message": "Transactions not found"})        
    )   
  });

  test("Should be able to read all transactions", async () => {
          
    const email = "teste@mail.com"
    const name = "name"  
    const password = "abcd1234"              

    const userDataLogin = { email, password }

    const userData = { name, email, password }

    await request(app).post("/user").send(userData)

    const responseLogin = await request(app).post("/user/login").send(userDataLogin)

    const token = responseLogin.body.token

    await request(app).post("/transactions").set("Authorization", `Bearer ${token}`).attach("file", `${__dirname}/testFiles/sales.txt`)

    const response = await request(app).get("/transactions").set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)

    expect(response.body).toEqual(     
      expect.objectContaining(
        [
            {
              id: 1,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2022-01-15T22:20:30.000Z',
              product: 'CURSO DE BEM-ESTAR',
              value: '0000012750',
              seller: 'JOSE CARLOS'
            },
            {
              id: 2,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2021-12-03T14:46:02.000Z',
              product: 'DOMINANDO INVESTIMENTOS',
              value: '0000050000',
              seller: 'MARIA CANDIDA'
            },
            {
              id: 3,
              transaction_type: '2',
              transaction_description: 'Venda afiliado',
              transaction_nature: 'Entrada',
              date: '2022-01-16T17:13:54.000Z',
              product: 'CURSO DE BEM-ESTAR',
              value: '0000012750',
              seller: 'THIAGO OLIVEIRA'
            },
            {
              id: 4,
              transaction_type: '3',
              transaction_description: 'Comissão paga',
              transaction_nature: 'Saída',
              date: '2022-01-16T17:13:54.000Z',
              product: 'CURSO DE BEM-ESTAR',
              value: '0000004500',
              seller: 'THIAGO OLIVEIRA'
            },
            {
              id: 5,
              transaction_type: '4',
              transaction_description: 'Comissão recebida',
              transaction_nature: 'Entrada',
              date: '2022-01-16T17:13:54.000Z',
              product: 'CURSO DE BEM-ESTAR',
              value: '0000004500',
              seller: 'JOSE CARLOS'
            },
            {
              id: 6,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2022-01-22T11:59:13.000Z',
              product: 'DOMINANDO INVESTIMENTOS',
              value: '0000050000',
              seller: 'MARIA CANDIDA'
            },
            {
              id: 7,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2022-02-02T02:35:43.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000155000',
              seller: 'ELIANA NOGUEIRA'
            },
            {
              id: 8,
              transaction_type: '2',
              transaction_description: 'Venda afiliado',
              transaction_nature: 'Entrada',
              date: '2022-02-03T20:23:37.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000155000',
              seller: 'CARLOS BATISTA'
            },
            {
              id: 9,
              transaction_type: '2',
              transaction_description: 'Venda afiliado',
              transaction_nature: 'Entrada',
              date: '2022-02-03T23:51:59.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000155000',
              seller: 'CAROLINA MACHADO'
            },
            {
              id: 10,
              transaction_type: '2',
              transaction_description: 'Venda afiliado',
              transaction_nature: 'Entrada',
              date: '2022-02-04T10:42:12.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000155000',
              seller: 'CELSO DE MELO'
            },
            {
              id: 11,
              transaction_type: '3',
              transaction_description: 'Comissão paga',
              transaction_nature: 'Saída',
              date: '2022-02-03T20:23:37.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000050000',
              seller: 'CARLOS BATISTA'
            },
            {
              id: 12,
              transaction_type: '3',
              transaction_description: 'Comissão paga',
              transaction_nature: 'Saída',
              date: '2022-02-03T23:51:59.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000050000',
              seller: 'CAROLINA MACHADO'
            },
            {
              id: 13,
              transaction_type: '3',
              transaction_description: 'Comissão paga',
              transaction_nature: 'Saída',
              date: '2022-02-04T10:42:12.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000050000',
              seller: 'CELSO DE MELO'
            },
            {
              id: 14,
              transaction_type: '4',
              transaction_description: 'Comissão recebida',
              transaction_nature: 'Entrada',
              date: '2022-02-03T20:23:37.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000050000',
              seller: 'ELIANA NOGUEIRA'
            },
            {
              id: 15,
              transaction_type: '4',
              transaction_description: 'Comissão recebida',
              transaction_nature: 'Entrada',
              date: '2022-02-03T23:51:59.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000050000',
              seller: 'ELIANA NOGUEIRA'
            },
            {
              id: 16,
              transaction_type: '4',
              transaction_description: 'Comissão recebida',
              transaction_nature: 'Entrada',
              date: '2022-02-04T10:42:12.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000050000',
              seller: 'ELIANA NOGUEIRA'
            },
            {
              id: 17,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2022-02-19T08:33:07.000Z',
              product: 'DOMINANDO INVESTIMENTOS',
              value: '0000050000',
              seller: 'MARIA CANDIDA'
            },
            {
              id: 18,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2022-03-01T05:09:54.000Z',
              product: 'CURSO DE BEM-ESTAR',
              value: '0000012750',
              seller: 'JOSE CARLOS'
            },
            {
              id: 19,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2022-03-03T12:07:35.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000155000',
              seller: 'ELIANA NOGUEIRA'
            },
            {
              id: 20,
              transaction_type: '1',
              transaction_description: 'Venda produtor',
              transaction_nature: 'Entrada',
              date: '2022-03-03T16:12:16.000Z',
              product: 'DESENVOLVEDOR FULL STACK',
              value: '0000155000',
              seller: 'ELIANA NOGUEIRA'
            }
        ]
      )        
    )   
  });
  
})