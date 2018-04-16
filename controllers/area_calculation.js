const express = require('express');
const router = express.Router();


router.route('/')
    /**
     * For route directory to /api/area_calculation/
     */
    .get((req, res) => {
        res.json({'text': 'hello'});
    });

module.exports = router;