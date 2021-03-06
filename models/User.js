const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: String,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//virtual friendCount to retrieve length of users friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Remove thoughts by User
// UserSchema.pre('remove', function(next) {
//     this.model('Thought').remove({ post: this._id }, next);
// });

const User = model('User', UserSchema);

module.exports = User;