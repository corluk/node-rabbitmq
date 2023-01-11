import amqp , {Channel, Connection, Message}from "amqplib"

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

    chan.consume(queue , (message)=>{
        console.log(`[x] Received ${message?.content.toString()}`)

        chan.ack(message as Message)
//        console.log(`[x] Received ${JSON.stringify(msg?.content.toJSON())}`)
    },{
        noAck : true 
    })
     
   
    
})()