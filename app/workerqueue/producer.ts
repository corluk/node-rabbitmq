import amqp , {Channel, Connection}from "amqplib"

const RABBITMQ_URI = "amqp://ozm_admin:29c22461b8d8e3582319cbc04c05ad98@localhost:5672/";

(async()=>{
    const con = await amqp.connect(RABBITMQ_URI)
 
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
