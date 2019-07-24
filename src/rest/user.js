/**
 * Middleware / Routing for all /users/* requests
 */
const app = require('express');
const router = app.Router();
import rootSchema from '../app';

import {graphql} from 'graphql'

const query = (q, vars) => {
    return graphql(rootSchema, q, null, null, vars)
}

// Transform response to JSON API format (if desired)
const transform = (result) => {
    const user = result.data.users[0];

    return {
        data: {
            type: 'user',
            id: user._id,
            attributes: {
                name: user.name
            }
        }
    }
}


// REST request to get a user
router.get('/:userId', (req, res) => {
    // Convert the request into a GraphQL query string
    query("query{users(_id:" + req.params.userId + "){_id, name}}")
        .then(result => {
            const transformed = transform(result)
            res.send(transformed)
        })
        .catch(err => {
            res.sendStatus(500)
        })
})

module.exports = router;