import Joi from "joi";
import mongoose from "mongoose";


const wineSchema = mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  type: { type: String, required: true },
  modle: Number,
  price: Number,
  imgUrl: String,
  isLocallyMade: { type: Boolean, default: false },
  publishDate: { type: Date, default: Date.now() }

});
export const Wine = mongoose.model("wines", wineSchema);//מקשר בין הקולקשן

export const wineValidator = (wineToValidate) => {

  console.log(wineToValidate.name);
  console.log(wineToValidate.imgUrl);
  const wineJoi = Joi.object({
    name: Joi.string().required(),
    company: Joi.string(),
    type: Joi.string().allow('יבש', 'חצי יבש', 'מבעבע', 'מתוק', 'וודקה', 'וויסקי', 'רוזה').required(),
    modle: Joi.number(),
    price: Joi.number(),
    isLocallyMade: Joi.boolean(),
    publishDate: Joi.date(),
  }).unknown();

  return wineJoi.validate(wineToValidate);
}

