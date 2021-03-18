import * as mongoose from 'mongoose';

const CoffeePodMongoSchemaFactory = () => {
  let schema: any = {
    ref_name: { type: String, index: true },
    product_type: { type: String },
    coffee_flavor: { type: String },
    pack_size: { type: Number },
    updated_at: { type: Date , default: () => new Date() },
    created_at: { type: Date , default: () => new Date() },
  };
  schema = new mongoose.Schema(schema, {
    versionKey: false,
    collection: 'coffee-pod',
  }).index({ ref_name: 'text' });
  return schema;
};

export const CoffeePodMongoSchema = CoffeePodMongoSchemaFactory();
