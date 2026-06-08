import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js';  
import { clerkhooks } from './Controllers/webhooks.js';

// initialize 
const app = express();

// connection to monogodb
await connectdb();

// middleware 
app.use(cors())

// route
app.get('/', (req,res)=> 
    res.send("Api working")
)
// add a controller route 
app.post('/clerk',express.json(),clerkhooks)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT ,()=>{
    console.log(`serving is running on port ${PORT }`)
})