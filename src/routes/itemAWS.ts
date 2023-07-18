import {  Router } from "express";
import { getItemsAWS } from '../controlles/itemAWS';

const router = Router();

router.get("/", getItemsAWS);

export { router };