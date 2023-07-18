import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {scan, getItem, putItem, updateItem, query, deleteItem } from '../services/itemAWS';

const getItemsAWS = async ( { params }: Request, resp: Response ) => {
    try{
        const items = await scan();
        resp.send(items);
    }catch(e){
        handleHttp(resp, 'ERROR_GET_ITEM', e);
    }
}

export { getItemsAWS };