import jwt from 'jsonwebtoken'

const secret = "mernmemories"

const auth = (req, res, next)=>{
    try {
      
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        let decodedData
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret)  // during verification when the secret we had used before matches the decoded data is as such {email: 'sudeep@gmail.com', id: '123ajaj81'}
            req.userId = decodedData?.id
        }
        else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth