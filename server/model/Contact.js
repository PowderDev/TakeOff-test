import pkg from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema, model } = pkg

const contact = new Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const da = model('Contact', contact)

export default da