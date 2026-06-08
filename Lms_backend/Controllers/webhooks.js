import {Webhook, webhook} from 'svix'
import User from '../models/User.js'

// api controller function to manage clerk user with the database

export const clerkhooks = async(req,res) =>{
    try {
        const whook = new Webhook(process.env.CLERK_WEB_HOOK);
        await whook (JSON.stringify(req.body),{
            "svix-id" : req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })


        const {data,type} = req.body
         switch (type) {
            case 'user.created':{
                const userdata ={
                    _id : data.id,
                    email :data.email_address[0].email_address,
                    name : data.first_name +" " +data.last_name,
                    imgurl : data.image_url,
                }
                await User.create(userdata)
                res.json({})
                break;
            }
                
             case 'user.updated':{
                const userdata ={
                    email :data.email_address[0].email_address,
                    name : data.first_name +" " +data.last_name,
                    imgurl : data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userdata)
                res.json({})
                break;
            }
             case 'user.delete':{
              
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
                break;
         
            default:
                break;
         }
        
    } catch (error) {
        res.json({message:"error"})
    }
}