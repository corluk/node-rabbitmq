import amqp , {Channel, Connection, Message}from "amqplib"

const RABBITMQ_URI = "amqp://ozm_admin:29c22461b8d8e3582319cbc04c05ad98@localhost:5672/";


interface IMessage {
    message : string 
}
(async()=>{
    const con = await amqp.connect(RABBITMQ_URI)
 
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