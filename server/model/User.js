import pkg from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema, model } = pkg

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

user.pre('save', async function(next){
    if (!this.isModified('password')){
        next()
    }
    
    this.password = await bcrypt.hash(this.password, 10)
})

user.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const da = model('User', user)

export default da