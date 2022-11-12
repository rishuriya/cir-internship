const verify = require("jsonwebtoken").verify;

const userCheck = (token) => {
    let decodedToken;
    const secret = process.env.SECRET;
    token = token.split(" ")[1];
    decodedToken = jwt.verify(token, secret);
    // decodedToken="er";
    
    if (!decodedToken) {
      return response;
    };
    // print("decoded token",decodedToken)
    return decodedToken;
}

export default userCheck;