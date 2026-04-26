import mongoose from 'mongoose';

const userScehma = new mongoose.Schema({
username:{type: String,required: true,unique:true},
name: {type: String,required: true},
email:{type: String,required: true,unique:true},
password:{type: String,required: true}
},{
    timestamps: true
});

userScehma.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userScehma.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model('User',userScehma)