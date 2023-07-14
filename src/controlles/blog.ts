import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"

const getItem = (req: Request, resp: Response) => {
    try{
        resp.send('Hola mundo');
    }catch(e){
        handleHttp(resp, 'ERROR_GET_ITEM');
    }
}

const getItems = (req: Request, resp: Response) => {
    try{
        resp.send('Hola mundo');
    }catch(e){
        handleHttp(resp, 'ERROR_GET_ITEMS');
    }
}

const updateItem = (req: Request, resp: Response) =>{
    try{

    }catch(e){
        handleHttp(resp, 'ERROR_UPDATE_ITEM');
    }
}

const postItem = ({ body }: Request, resp: Response) =>{
    try{        
        resp.send(body);
    }catch(e){
        handleHttp(resp, 'ERROR_POST_ITEM');
    }
}

const deleteItem = (req: Request, resp: Response) =>{
    try{

    }catch(e){
        handleHttp(resp, 'ERROR_DELETE_ITEM');
    }
}

export { getItem, getItems, updateItem, postItem, deleteItem };