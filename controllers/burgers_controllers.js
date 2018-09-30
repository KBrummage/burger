var express = require('express');
var router = express.Router();

var burger = require('../models/burger.js');


router.get("/", function (req, resp) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        }
        console.log(hbsObject);
        resp.render("index", hbsObject);
    })
})

router.post("/api/burgers", function (req, resp) {
    burger.create(
        ["burger_name", "devoured"],
        [req.body.name, req.body.devoured],
        function (result) {
            resp.json({
                id: result.insertId
            });
        })
})

router.put("/api/burgers/:id", function (req, resp) {
    var condition = `id = ${req.params.id}`;
    console.log("condition", condition);
    burger.update({
            devoured: req.body.devoured
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