const express = require("express");
var async = require('async');
const router = express.Router();
const StateList = require("../../models/StateSchema.js");
const DistrictList = require("../../models/DistrictSchema.js");

router.post("/insertinstate", (req, res) => {
    StateList({
        statename: req.body.statename,
        sid: req.body.sid,
    })
        .save()
        .then(item => res.json(item));
});
router.post("/insertindistrict", (req, res) => {
    DistrictList({
        districtname: req.body.districtname,
        did: req.body.did,
    })
        .save()
        .then(item => res.json(item));
});
router.get("/getdistrictlist", (req, res) => {
    const DistrictData = DistrictList.find({});
    const StateData = StateList.find({});
    const resources = {
        range: DistrictData.exec.bind(DistrictData),
        cloth: StateData.exec.bind(StateData)

    };
    async.parallel(resources, function (error, results) {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(results);
    })
})
module.exports = router;
