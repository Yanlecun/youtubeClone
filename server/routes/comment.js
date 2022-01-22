const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Comment  } = require("../models/Comments.js");

// =======================
//        Comment
// =======================
router.post("/saveComment", (req, res)=> {
    const comment  = new Comment(req.body)

    comment.save((err, res=> {
        if(err) return res.json({success:false, err})

        comment.find({'_id' : comment._id})
            .populate('writer')
            .exec( (err, result) => {
                if(err) return res.json({success: false, err})
                res.status(200).json({success: true, result})
            })
    }))
})
module.exports = router;
