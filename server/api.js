/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const User = require("./models/user");
const Question = require("./models/question");
const Candidate = require("./models/candidate");
const Contract = require("./models/contract");

var Web3 = require('web3');
const dev_address = "http://127.0.0.1:8545";
const production_address = "https://ropsten.infura.io/v3/a44524f5635c46188f2ece1f05d6855b";
var web3 = new Web3(production_address);
// import authentication library
const auth = require("./auth");
const keccak256 = require('keccak256');
const candidate = require('./models/candidate');
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "party",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "candidate",
				"type": "address"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "voterID_hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "PIN",
				"type": "uint256"
			}
		],
		"name": "addVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "candidate",
				"type": "address"
			}
		],
		"name": "getVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "voterID_hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "PIN",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "candidate",
				"type": "address"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let contractAddress = '';
Contract.findOne({}).then((contract) => {
  if(contract){
    console.log(contract.address);
    contractAddress = contract.address;
  }
});

let admin = "0xbc37b36079147f21208b70b4ffd3da9f66cc9e366d8baca571bb0e40f922a2e4";
let admin_add = "0xd2a4E0D9958108120a7e6D4dEDAc977B91a1c242";

/// Development:
// admin = "0x20dc62c904eb2c6f1c4fd051709c8617e57a5eb63a6fb879cfe9ad240ee0c66a";
// admin_add= "0x528C3cD82E0D4DDdC4eDabD07227C89cb6272a24";

let nonce = 0;
web3.eth.getTransactionCount(admin_add).then((n) => {
  nonce = n;
});
// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});


router.post("/answer",(req,res) => {
  Question.updateOne(
    {_id : ObjectID(req.body.qid)},
    { $set: {answer: req.body.answer}},
    function (e) {
      if (e) {
          console.log(e);
          return;
      }
      console.log("success");
  });
})

router.get("/question", (req, res) => {
  Question.find({ author_id: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/question", auth.ensureLoggedIn, (req, res) => {
    const newQuestion = new Question({
    author_id: req.user._id,
    content: req.body.content,
    answer: "",
  });

  newQuestion.save().then((question) => res.send(question));
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  res.send({});
});

router.get("/allQuest",(req,res) => {
  Question.find({}).then((comments) => {
    res.send(comments);
  });
});

router.get("/start",(req,res) => {
  var txData = {
    "gas": "5000000",
    "gasPrice": "92000000000",
    data: "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610881806100606000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806366369cf61461005c57806376124dac146100945780639ab24eb0146100ec578063e405bf9014610144578063f851a4401461034d575b600080fd5b6100926004803603604081101561007257600080fd5b810190808035906020019092919080359060200190929190505050610397565b005b6100ea600480360360608110156100aa57600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610459565b005b61012e6004803603602081101561010257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610540565b6040518082815260200191505060405180910390f35b61034b6004803603608081101561015a57600080fd5b810190808035906020019064010000000081111561017757600080fd5b82018360208201111561018957600080fd5b803590602001918460018302840111640100000000831117156101ab57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561020e57600080fd5b82018360208201111561022057600080fd5b8035906020019184600183028401116401000000008311171561024257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156102a557600080fd5b8201836020820111156102b757600080fd5b803590602001918460018302840111640100000000831117156102d957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105e2565b005b610355610744565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103f057600080fd5b6103f8610769565b81816000018181525050600081602001901515908115158152505080600360008581526020019081526020016000206000820151816000015560208201518160010160006101000a81548160ff021916908315150217905550905050505050565b600082141561046757600080fd5b8160036000858152602001908152602001600020600001541461048957600080fd5b600015156003600085815260200190815260200160002060010160009054906101000a900460ff161515146104bd57600080fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600101919050555060016003600085815260200190815260200160002060010160006101000a81548160ff021916908315150217905550505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461059b57600080fd5b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461063b57600080fd5b610643610785565b84816000018190525083816020018190525082816040018190525080600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190805190602001906106ba9291906107a6565b5060208201518160010190805190602001906106d79291906107a6565b5060408201518160020190805190602001906106f49291906107a6565b509050506000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6040518060400160405280600081526020016000151581525090565b60405180606001604052806060815260200160608152602001606081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106107e757805160ff1916838001178555610815565b82800160010185558215610815579182015b828111156108145782518255916020019190600101906107f9565b5b5090506108229190610826565b5090565b61084891905b8082111561084457600081600090555060010161082c565b5090565b9056fea2646970667358221220c074accb6d0197248f948510fbdea823248c99ba0cac244ba3468efc0d8bda5764736f6c634300060b0033",
  }
  web3.eth.accounts.signTransaction(txData, admin).then(result => {
    console.log("signed: ", result)
    web3.eth.sendSignedTransaction(result.rawTransaction)
    .on('receipt',  (receipt) => {
      console.log("receipt Start Election:", receipt); 
      contractAddress = receipt.contractAddress;  
      Contract.updateOne(
        {},
        { $set: {address: contractAddress}},
        function (e) {
          if (e) {
              console.log(e);
              return;
          }
          console.log("success");
      });
      web3.eth.getTransactionCount(admin_add).then((n) => {
        nonce = n;
      });      
      res.status(200).send({});
    })
    .on('error',  (error) => {console.log("Error Starting Election:", error); })
  })
});

router.post("/addVoter",(req,res) => {
  console.log("ADD VOTER!");
  console.log(nonce);
  let contractInstance = new web3.eth.Contract(contractABI);
  var txData = {
    "to" : contractAddress,
    "gas": "5000000",
    "nonce" : nonce,
    data: contractInstance.methods.addVoter("0x" + keccak256(req.body.voterID).toString('hex'), parseInt(req.body.PIN)).encodeABI(),
  }
  nonce = nonce+1;
  web3.eth.accounts.signTransaction(txData, admin).then(result => {
    console.log("signed: ", result)
    web3.eth.sendSignedTransaction(result.rawTransaction)
    .on('receipt',  (receipt) => {
      console.log("Receipt: ", receipt); 
      res.send({});
    })
    .on('error',  (error) => {console.log("Error:", error); })
  });
})

router.post("/addCandidate",(req,res) => {
  let contractInstance = new web3.eth.Contract(contractABI);
  let { address } = web3.eth.accounts.create(web3.utils.randomHex(32));
  var txData = {
    "to" : contractAddress,
    "gas": "5000000",
    "nonce": nonce,
    data: contractInstance.methods.addCandidate(req.body.name,req.body.party,req.body.symbol,address).encodeABI(),
  }
  nonce = nonce+1;
  web3.eth.accounts.signTransaction(txData, admin).then(result => {
    console.log("signed: ", result)
    web3.eth.sendSignedTransaction(result.rawTransaction)
    .on('receipt',  (receipt) => {
      console.log("receipt :", receipt);
      res.send({});
    })
    .on('error',  (error) => {console.log("error :", error); })
  });
  
  let name =  req.body.name;
  let party = req.body.party;
  let symbol = req.body.symbol;

  const newCandidate = new Candidate({
    address,
    name,
    party,
    symbol,
  });
  newCandidate.save();
  console.log("Added a new Candidate with name " + name);
})


router.post("/vote",(req,res) => {
  let contractInstance = new web3.eth.Contract(contractABI);
  // Transaction banao smart contract pe
  // ki vote ko call karo with the given params
  var txData = {
    "to" : contractAddress,
    "gas": "5000000",
    "nonce": nonce,
    data: contractInstance.methods.vote("0x" + keccak256(req.body.voterID).toString('hex'), parseInt(req.body.PIN),req.body.address).encodeABI(),
  }
  nonce = nonce + 1;
  web3.eth.accounts.signTransaction(txData, admin).then(result => {
  console.log("signed: ", result)
  web3.eth.sendSignedTransaction(result.rawTransaction)
  .on('receipt',  (receipt) => {
    console.log("Receipt: ", receipt);
    res.send({});
  })
  .on('error',  (error) => {console.log("Error:", error); })
  });
});

router.get("/candidates",(req,res) => {
  Candidate.find({}).then((candidates) => {
    res.send(candidates);
  })
})

router.get("/votes",(req,res) => {
  let contractInstance = new web3.eth.Contract(contractABI);
  contractInstance.options.address = contractAddress;
  // console.log("Hello");
  let votes = [];
  Candidate.find({}).then((candidates) => {
    console.log(candidates.length);
    for(let i=0;i<candidates.length;i++){
      let candidate = candidates[i];
      let address = candidate.address;
      address = address.substr(2);
      console.log(address);      
      contractInstance.methods.getVotes(web3.utils.toChecksumAddress(address)).call().then((x) => {
        votes.push(x);
        if(i == candidates.length - 1){
          console.log(votes);
          res.send(votes);
        }
      }).catch((e) => console.log(e.message))
    }
  })
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
