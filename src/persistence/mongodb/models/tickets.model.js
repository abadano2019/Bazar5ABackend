import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    
    code:{
        type: String,
        required: true,
        unique:true,
    },
    purchase_datetime:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    purchaser:{
        type: String,
        required: true,
    },
    items:{
        type: Array,
        required:true,
    }
})
        
export const ticketsModel = mongoose.model('Tickets', ticketsSchema)