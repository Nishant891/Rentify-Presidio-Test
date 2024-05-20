import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  email:{
    type: String,
  },
  address: {
    type: String,
  },
  no_of_bedrooms: {
    type: String,
  },
  no_of_bathrooms: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
});

export const PostModel = model("Post", PostSchema);
