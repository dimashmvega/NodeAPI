import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertItem, getItemsFromDB, getItemFromDB, updateItemToDb, deleteItemFromDb } from "../services/item";

const getItem = async ({ params }: Request, resp: Response) => {
    try{
        const { id } = params;
        const response = await getItemFromDB(id);
        const data = response ? response : 'NOT_FOUND';
        resp.send(data);
    }catch(e){
        handleHttp(resp, 'ERROR_GET_ITEM', e);
    }
}

const getItems = async (req: Request, resp: Response) => {
    try{        
        const items = await getItemsFromDB();
        resp.send(items);
    }catch(e){
        handleHttp(resp, 'ERROR_GET_ITEMS', e);
    }
}

const updateItem = (req: Request, resp: Response) =>{
    try{
        const { id } = req.params;
        const { body } = req;
        console.log(`parameters ${id} - ${body}`);
        const response = updateItemToDb( id, body );
        resp.send(response);
    }catch(e){
        handleHttp(resp, 'ERROR_UPDATE_ITEM', e);
    }
}

const postItem = async ({ body }: Request, resp: Response) =>{
    try{                
        const responseItem = await insertItem(body);
        resp.send(responseItem);
    }catch(e){
        handleHttp(resp, 'ERROR_POST_ITEM', e);
    }
}

const deleteItem = ({ params }: Request, resp: Response) =>{
    try{
        const { id } = params;        
        const response = deleteItemFromDb(id);
        resp.send(response);
    }catch(e){
        handleHttp(resp, 'ERROR_DELETE_ITEM', e);
    }
}

export { getItem, getItems, updateItem, postItem, deleteItem };