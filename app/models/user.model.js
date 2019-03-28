const mongoose  =   require('mongoose');
const Schema    =   mongoose.Schema;

let userSchema = new Schema({
    name    : {type: String, required: true, max: 100},
    age     : {type: Number, required: true},
    mobile: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[789]\d{9}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User mobile number required']
      }
});


// Export the model
module.exports  =   mongoose.model('User', userSchema);