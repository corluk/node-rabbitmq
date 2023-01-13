import  dotenv  from 'dotenv';
import amqp , {Channel, Connection, Message}from "amqplib"

 

interface IMessage {
    message : string 
}
(async()=>{
    dotenv.config()

    const uri = process.env["RABBIT_URI"] || ""
    console.log(uri)
    const con = await amqp.connect(uri)
    const chan = await con.createChannel() 
    let queue = "task_queue"
    let msg = {
            message : "Hello World"
        }
    chan.assertQueue(queue, {
        durable : true 
    })

    chan.consume(queue , (message)=>{
       

        if (message?.content ){
            const b = message?.content || JSON.stringify({})
            let content = JSON.parse(b.toString()) as {}  as IMessage
            console.log(`content is ${content.message}`)
            console.debug(content)
            if ( content.message ){
                let sec = content.message.split(".").length -1 
    
                console.log(`[x] Received ${content.toString()}`)
                setTimeout(()=>{}, sec  * 1000 )
            }
        }
        

      ///  chan.ack(message as Message)
//        console.log(`[x] Received ${JSON.stringify(msg?.content.toJSON())}`)
    },{
        noAck : true  
    })
     
   
    
})()