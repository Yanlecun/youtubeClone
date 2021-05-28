const express = require("express");
const router = express.Router();
const { Subscribers  } = require("../models/Subscribers.js");

// =======================
//        Subscribe
// =======================
router.post("/subscribeNumber", (req, res)=> {
    Subscribers.find({'userTo':req.body.userTo})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, subscribeNumber: subscribe.length})
        })
})
router.post("/subscribed", (req, res)=> {
    Subscribers.find({'userTo': req.body.userTo,'userFrom':req.body.userFrom})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            let result = false
            if(subscribe.length != 0) {
                result = true
            }
            return res.status(200).json({success: true, subscribed: result})
        })
})

router.post("/unsubscribe", (req, res)=> {
    Subscribers.findOneAndDelete({userTo: req.body.userTo, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).json({success: false,err})
            res.status(200).json({ success: true, doc})
        })
})

router.post("/subscribing", (req, res)=> {
    console.log(req.body)
    const subs = new Subscribers(req.body)
    
    
    subs.save((err, doc) => {
            if(err) return res.status(400).json({success: false,err})
            res.status(200).json({ success: true})
        })
})
module.exports = router;
