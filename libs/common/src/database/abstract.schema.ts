import { Prop, Schema } from "@nestjs/mongoose";
import  { Types } from "mongoose";

@Schema()
export abstract class AbstractDocument {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId
}