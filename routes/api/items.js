const express = require("express");
const router = express.Router();
const ItemStorage = require("../../models/ItemStorageSchema.js");

router.post("/store", (req, res) => {
    ItemStorage({
        itemname: req.body.itemname,
        itemoriginalprice: req.body.itemoriginalprice,
        gstonitem: req.body.gstonitem,
        priceaftergst: req.body.priceaftergst,
        timestamp: req.body.timestamp
    })
        .save()
        .then(item => res.json(item));
});
router.get("/piechart", (req, res) => {
    ItemStorage.aggregate(
        [
            {
                $group: {
                    _id: "$gstonitem",
                    angle: {
                        $sum: 1
                    },
                }
            }
        ]
    ).then(item => res.send(item));
});
router.post("/delete", (req, res) => {
    ItemStorage.findOneAndDelete({ _id: req.body._id })
        .then(res.json({ message: 'Successfully deleted' }));
})

router.get("/getlistofitem", (req, res) => {
    ItemStorage.find().then(item => res.send(item));
});
module.exports = router;
