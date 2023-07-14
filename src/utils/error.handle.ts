import { Response } from "express";

const handleHttp = (resp: Response, error: string, errorRaw?: any) =>{
    console.log(errorRaw);
    resp.status(500);
    resp.send({ error });
}

export { handleHttp }