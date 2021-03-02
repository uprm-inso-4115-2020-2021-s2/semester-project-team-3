import { Request, Response } from "express";
import { IClient } from "../../domain";


export interface ILoginRequest extends Request {

    user: IClient,

}