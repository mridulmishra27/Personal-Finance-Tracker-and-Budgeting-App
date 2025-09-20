import jwt from 'jsonwebtoken'

const authDoc = async (req, res, next) => {
    try {
        const { dtoken } = req.headers
        if (!dtoken) {
            return res.json({ success: false, message: 'Unauthorised User' })
        }
        const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.doc = { id: token_decoded.id }
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authDoc