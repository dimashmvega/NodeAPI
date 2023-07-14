import { Car } from "../interfaces/car.interfaces";
import ItemModel from '../models/items';

const insertItem = async (item: Car) => {
    const responseInsert = await ItemModel.create(item);
    return responseInsert;
}

const getItemsFromDB = async () => {
    const responseGetItems = await ItemModel.find({});
    return responseGetItems;
}

const getItemFromDB = async (id: string) =>{
    const responseGetItem = await ItemModel.findOne({ _id: id });
    return responseGetItem;
}

const updateItemToDb = async(id: string, data: Car) =>{
    const responseUpdateItem = await ItemModel.findOneAndUpdate(
        { _id: id }, data, { new:true }
        );
    return responseUpdateItem;
}

const deleteItemFromDb = async(id: string) =>{
    const responseDeleteFromDB = await ItemModel.deleteOne({ _id: id });
    return responseDeleteFromDB;
}

export { insertItem, getItemsFromDB, getItemFromDB, updateItemToDb, deleteItemFromDb };