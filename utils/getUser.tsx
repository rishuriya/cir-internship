const verify = require("jsonwebtoken").verify;
import Router  from "next/router";
import User from "../models/User";
import cookie from 'js-cookie';


export const getUser = async (token) => {

    const response = {
        user: null,
        isAuth: false,
    }

    try {
        let decodedToken;
        const secret = process.env.SECRET;
        token = token.split(" ")[1];
        decodedToken = verify(token, secret);

        if (!decodedToken) {
            return response;
        };

        response.user = decodedToken.user;
        response.isAuth = true;


        return response;
    } catch (error) {
        cookie.remove("token");
        return response;
    }
}