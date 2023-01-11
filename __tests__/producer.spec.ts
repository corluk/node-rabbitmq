import amqp , {Connection}from "amqplib"

const RABBITMQ_URI = "amqp://user1:iuS9NBmVPx7ThqW@localhost:5672/"
let con = {} as Connection
beforeAll(async ()=>{

    con = await amqp.connect(RABBITMQ_URI)
    expect(con).not.toBeNull()
})

afterAll(async()=>{

    await con.close()
})
it("1" ,()=>{


})