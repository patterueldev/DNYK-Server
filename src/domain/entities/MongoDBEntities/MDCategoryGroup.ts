import { ICategoryGroup } from './../ICategoryGroup';
import mongoose, { Document, Schema } from 'mongoose';

interface ICategoryGroupModel extends ICategoryGroup, Document {
  identifier: string;
  name: string;
}

const categoryGroupSchema = new Schema<ICategoryGroupModel>({
  name: { type: String, required: true },
}, {
  toJSON: { getters: true },
  id: false,
});

categoryGroupSchema.virtual('identifier').get(function(this: ICategoryGroupModel) {
  return this._id.toString();
});

export const MDCategoryGroup = mongoose.model<ICategoryGroupModel>('categoryGroups', categoryGroupSchema);