import {v2 as cloudinary} from 'cloudinary'

const connectcloudinary = async ()=>{
    cloudinary.config({
       cloudname :process.env.CLOUDINARY_NAME,
     cloudsecretkey:process.env.CLOUDINARY_SECREAT_KEY,
       api_key:process.env.CLOUDINARY_API_KEY
    })
}
export default connectcloudinary;