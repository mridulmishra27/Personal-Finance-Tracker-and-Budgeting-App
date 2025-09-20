import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
    try {
        
        const {atoken} = req.headers
        if (!atoken) {
            return res.json({success:false, message:'Not Authorised as an Admin'})
        }

        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message:'Not Authorised as an Admin'})
        }

        next()

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export default authAdmin