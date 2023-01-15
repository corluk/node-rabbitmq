import  dotenv  from 'dotenv';
import amqp , {Channel, Connection, Message}from "amqplib"

 

interface IMessage {
    message : string 
}
(async()=>{
    dotenv.config()
    var args = process.argv.slice(2);
    args = process.argv.slice(2);
    
    //let  severity = (args.length > 0) ? args[0] : 'info';

    const uri = process.env["RABBIT_URI"] || ""
    console.log(uri)
    const con = await amqp.connect(uri)
    const chan = await con.createChannel() 
   
    let exchangeName= "logs-topic3"
    const respExchange = await chan.assertExchange(exchangeName,"topic",{
        durable : false 
    })
      
    const respQueue = await chan.assertQueue("",{ exclusive : true })
    //const respBindQueue = await chan.bindQueue(respQueue.queue,exchangeName,"black")
    console.debug(respQueue)
     
    for( let severity of args ){
        console.log("severity %s",severity)
        await chan.bindQueue(respQueue.queue,exchangeName,severity)
    }

    
    chan.consume(respQueue.queue,(msg)=>{
         console.log("message routing key [%s]",msg?.fields.routingKey)
        if(msg?.content){
            console.log("[x] %s",msg.content.toString())
        }
    },{
        noAck : true 
    })
    /*
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
     
   */
    
})()