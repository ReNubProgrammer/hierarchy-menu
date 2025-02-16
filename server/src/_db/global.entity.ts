import { PrimaryGeneratedColumn, ObjectId, ObjectIdColumn } from "typeorm";

export class GlobalEntity<GE>{
    @ObjectIdColumn()
    id: ObjectId;

    constructor(entity: Partial<GE>){
        Object.assign(this, entity);
    }
}