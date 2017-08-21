//var index = require('./index');
var Token = require('../controllers/token_controller');
var Crowdfund = require('../controllers/crowd_controller');
module.exports = function(app,express){
   
    var api = express.Router();

    api.post('/',);
   // api.get('/user/:email',index.user.profileInfo);
   api.post('/createToken',Token.createToken);
   api.get('/coinbase',Token.getCoinbase);
   api.get('/default',Token.defaultAddress);
   api.post('/getTokens',Token.getAllTokens);
   api.post('/tokenDistribution',Token.setTokenDistribution);
   api.post('/setCrowdFundAddress',Token.setCrowdFundAddress);
   api.post('/distributeToken',Token.distributeTokens);
   api.post('/getbalance',Token.getBalance);
   api.post('/createCrowdFund',Crowdfund.createCrowdFund);
    return api;
};
