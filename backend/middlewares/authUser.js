import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const { usertoken } = req.headers
        if (!usertoken) {
            return res.json({ success: false, message: 'Unauthorised User' })
        }
        const token_decoded = jwt.verify(usertoken, process.env.JWT_SECRET)
        req.user = { id: token_decoded.id }
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authUser