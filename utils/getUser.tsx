const verify = require("jsonwebtoken").verify;
import Router  from "next/router";
import User from "../models/User";

export const getUser = async (token) => {

    const response = {
        user: null,
        isAuth: false,
    }

    try {
        let decodedToken;
        const secret = "secret@123"; //process.env.JWT_SECRET; tobe used un production
        // if(secret===undefined || secret===null){
        //     console.log("Something went wrong with the secret key");
        //     Router.push("/404");
        //     // return response;
        // }

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