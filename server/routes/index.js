var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var username = process.env.BNET_CLIENT_ID;
var secret = process.env.BNET_SECRET;

/* GET home page. */
router.post('/getCharSettings', function(req, res, next) {
  fetch("https://" + username + ":" + secret + "@eu.battle.net/oauth/token?grant_type=client_credentials")
    .then(token_response => token_response.json())
    .then(token_response => {
      console.log(token_response)
      console.log(token_response.access_token)
      console.log(req.param("charName") + " + " + req.param("realm"))
      if(!(req.param("charName") && req.param("realm"))) {
        res.status(400)
        res.send("Bad request")
        return
      }
      fetch("https://eu.api.blizzard.com/wow/character/" + req.param("realm") + "/" + req.param("charName") + "?fields=appearance&access_token=" + token_response.access_token, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          res.json(response)
          return
        })
        .catch(e => {
          console.log(e)
          res.status(500)
          res.send("Error")
          return
        })
    })
    .catch(e => {
      console.log(e)
      res.status(500)
      res.send("error")
      return
    })
});

module.exports = router;
