var express = require('epress');
var burger = require('../models/burger.js');

var router = express.Router();

router.get("/", function (req, resp) {
    burger.selectAll(function (data) {
        var hbsObject = {
            cats: data
        }
        console.log(hbsObject);
        resp.render("index", hbsObject);
    })
})

router.post("/api/burgers", function (req, resp) {
    burger.insertOne(
        ["name", "devoured"],
        [req.body.name, req.body.devoured],
        function (result) {
            res.json({
                id: result.insertId
            });
        })
})

router.put("/api/burgers/:id", function (req, resp) {
    var condition = `id = ${req.params.id}`;
    console.log("condition", condition);
    burger.updateOne({
            devour: req.body.devour
        },
        condition,
        function (result) {
            if (result.changedRows == 0) {
                return resp.status(404).end();
            } else {
                resp.status(200).end();
            }

        }

    )
})

module.exports = router;