import { Document } from "mongoose";
import { ICoffeeMachine } from "../interfaces";

export class CoffeeMachine extends Document implements ICoffeeMachine {
    ref_name?: string;
    product_type?: string;
    water_line_compatible?: Boolean;
    created_at?: Date;
    updated_at?: Date;
}
