// Define Mongoose
const { Schema, model, Types } = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new Schema({
  // Add individual properties and their types
  // Setting required to true will disallow null values
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
    validate: {
      validator: function (v) {
        // Uses regex for email validation
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', // This should match the model name you used for User
    },
  ],
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought', // This should match the model name you used for Thought
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

// Create a virtual property `friendsCount` that gets the amount of comments per post
userSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
});

// Using mongoose.model() to compile a model based on the schema
// 'Users' is the name of the model
// usersSchema is the name of the schema we are using to create a new instance of the model
const User = model('User', userSchema);

module.exports = User;