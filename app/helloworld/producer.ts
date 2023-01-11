import amqp , {Channel, Connection}from "amqplib"

const RABBITMQ_URI = "amqp://user1:iuS9NBmVPx7ThqW@localhost:5672/";

(async()=>{
    const con = await amqp.connect(RABBITMQ_URI)
 
    const chan = await con.createChannel() 
    let queue = "hello"
    let msg = {
            message : "Hello World"
        }
    chan.assertQueue(queue, {
        durable : false
    })
    let res = chan.sendToQueue(queue,
        Buffer.from(JSON.stringify(msg)), 
        {
            persistent :true
        }) 
    
    console.log(`send ok ? ${res}`)
    
    setTimeout( async ()=>{
        await con.close()
    },1000)
   
    
})()
