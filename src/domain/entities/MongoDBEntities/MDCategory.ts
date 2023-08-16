import { ICategory } from "../ICategory";
import mongoose, { Document, Schema } from 'mongoose';

interface ICategoryModel extends ICategory, Document {
  identifier: string;
  name: string;
  groupId: string;
}

const categorySchema = new Schema<ICategoryModel>({
  name: { type: String, required: true },
  groupId: { type: String, required: true },
}, {
  toJSON: { getters: true },
  id: false,
});

categorySchema.virtual('identifier').get(function (this: ICategoryModel) {
  return this._id.toString();
});

export const MDCategory = mongoose.model<ICategory>('categories', categorySchema);