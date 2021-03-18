import * as mongoose from 'mongoose';

const CoffeeMachineMongoSchemaFactory = () => {
  let schema: any = {
    ref_name: { type: String, index: true },
    product_type: { type: String },
    water_line_compatible: { type: Boolean },
    updated_at: { type: Date , default: () => new Date() },
    created_at: { type: Date , default: () => new Date() },
  };
  schema = new mongoose.Schema(schema, {
    versionKey: false,
    collection: 'coffee-machine',
  }).index({ ref_name: 'text' });
  return schema;
};

export const CoffeeMachineMongoSchema = CoffeeMachineMongoSchemaFactory();
