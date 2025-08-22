import mongoose, {schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoschema = new schema({
    videofile :{
        type : String,
        required : true
    },
    thumbnail :{
        type : string,
        required : true,
    },
    title :{
        type : string,
        required : true,
    },
    description :{
        type : string,
        required : true,
    },
    duration :{
        type : string,
        required : true,
    },
    views :{
        type : Number,
        required : true,
    },
    ispublished :{
        type : Boolean,
        default : true,
    },
    owner : {
        type : schema.type.objectid,
        ref : 'user'
    }


},{timestamps : true})

videoschema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model('video', videoschema)
