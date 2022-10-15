const verify = require("jsonwebtoken").verify;
import User from "../models/User";

export const getUser = async (token) => {

    const response = {
        user: null,
        isAuth: false,
    }

    try {
        let decodedToken;
        const secret = process.env.JWT_SECRET;

        token = token.split(" ")[1];
        decodedToken = verify(token, secret);

        if (!decodedToken) {
            return response;
        };

        response.user = decodedToken.user;
        response.isAuth = true;


        return response;
    } catch (error) {
        console.log(error);
        return response;
    }
}