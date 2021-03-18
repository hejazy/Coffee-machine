import { Document } from "mongoose";
import { ICoffeePod } from "../interfaces";

export class CoffeePod extends Document implements ICoffeePod {
    ref_name: string;
    product_type: string;
    coffee_flavor: string;
    pack_size: any;
    created_at: Date;
    updated_at: Date;
}
