//var index = require('./index');
var Token = require('../controllers/token_controller');
module.exports = function(app,express){
   
    var api = express.Router();

    api.post('/',);
   // api.get('/user/:email',index.user.profileInfo);
   api.post('/createToken',Token.createToken);

    return api;
};
