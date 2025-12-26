import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth"
import documentReducer from "./document" ;
import uploadReducer from "./upload";
import deleteReducer from "./delete";

export const store= configureStore({
    reducer:{
        auth:authReducer,
        documents:documentReducer,
        upload:uploadReducer,
        delete:deleteReducer
    },
})