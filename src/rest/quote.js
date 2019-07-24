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
    const quote = result.data.quote;

    return {
        data: {
            type: 'quote',
            id: quote.id,
            attributes: {
                quote: quote.quote,
                author: quote.author,
                date: quote.date
            }
        }
    }
}

// REST request to get a quote
router.get('/', (req, res) => {
    // Convert the request into a GraphQL query string
    query("query{quote{id, quote, author, date}}")
        .then(result => {
            const transformed = transform(result)
            res.send(transformed)
        })
        .catch(err => {
            res.sendStatus(500)
        })
})

module.exports = router;