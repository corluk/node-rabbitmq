import amqp , {Channel, Connection}from "amqplib"
import dotenv from "dotenv"
 
(async()=>{
    dotenv.config()
    let  args = process.argv.slice(2);
    let  severity = (args.length > 0) ? args[0] : 'info';
    
    const uri = process.env["RABBIT_URI"] || ""
    console.log(uri)
    const con = await amqp.connect(uri)
    
    const chan = await con.createChannel() 
    let queue = "topic1"
    let topic  = args.length > 0  ? args[0] : "info" 
     
    let msg = {
        message : process.argv.slice(2).join(" ") || "Hello World"
    }

/*  chan.assertQueue(queue, {
        durable : true 
    })
*/ 

let exchange  = "logs-topic3"
chan.assertExchange(exchange,"topic" , { durable: false })

let res = chan.publish(exchange,topic ,Buffer.from(JSON.stringify(msg)))

/*
let res = chan.sendToQueue(queue,Buffer.from(JSON.stringify(msg)),{
        persistent : true

    })
*/
    console.log(`send ok ? ${res} ${JSON.stringify(msg)}`)
    
    setTimeout( async ()=>{
        if (res){
            await con.close()
        }else {
            throw Error(" cannot send message ")
        }
        
    },1000)
   
    
})()
