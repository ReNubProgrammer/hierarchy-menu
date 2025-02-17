import { ObjectId, ObjectIdColumn} from "typeorm";

export class GlobalEntity<GE>{
    @ObjectIdColumn()
    _id: ObjectId;

    constructor(entity: Partial<GE>){
        Object.assign(this, entity);
    }
}