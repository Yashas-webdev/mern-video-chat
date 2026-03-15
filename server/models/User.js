const mongoose = require('mongoose') // to use its Schema and model fucntions
const bcrypt = require('bcryptjs') // to has passwords before saving them to hte database.

const userSchema = new mongoose.Schema({
    usename : {
        type: String,
        require: true,
        unique : true,
        trim: true,
        minlength: 3
    },

    email: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required : true,
        minlength: 6
    },

    avatar: {
        type: String,
        default: ''
    },

    isOnline: {
        type: Boolean,
        default: false
    },
 }, {
        timestamps: true
    }
);

userSchema.pre('save',async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});  // This is a Mongoose pre-save hook — it runs automatically before every save. It checks if password was changed, and if yes, hashes it with bcrypt using 12 salt rounds. This means plain text passwords never reach the database.

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);  
}

const User = mongoose.model('User', userSchema);

module.exports = User;




