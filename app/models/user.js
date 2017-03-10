import DB from './orm';
import bcrypt from 'bcrypt';

const User = DB.Model.extend({
  tableName: 'users',
  hidden: ['password'],
  bcrypt: { field: 'password' },
  hasTimestamps:true,
  telo: function(password , cb) {
    /*use
      http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
      http://csaden.github.io/hackreactor/Hashing-Passwords-and-Resolving-Promises.html
      PostModel.User.comparePasswords('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -> Password123: true
      });
    */
    console.log('running telo ' + this.get('password'), password);
    bcrypt.compare(password, this.get('password'), function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }
});

export default User;
