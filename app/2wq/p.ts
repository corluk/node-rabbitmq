import amqp , {Channel, Connection}from "amqplib"
import dotenv from "dotenv"
 
(async()=>{
    dotenv.config()
    
    const uri = process.env["RABBIT_URI"] || ""
    console.log(uri)
    const con = await amqp.connect(uri)
    
    const chan = await con.createChannel() 
    let queue = "task_queue"
    let msg = {
            message : process.argv.slice(2).join(" ") || "Hello World"
        }
    chan.assertQueue(queue, {
        durable : true 
    })
    let res = chan.sendToQueue(queue,Buffer.from(JSON.stringify(msg)),{
        persistent : true  
    }) 
    
    console.log(`send ok ? ${res} ${JSON.stringify(msg)}`)
    
    setTimeout( async ()=>{
        await con.close()
    },1000)
   
    
})()
