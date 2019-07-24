/**
 * This is where the app defines the GraphQL resource type.
 * The fields and data types (as well as descriptions for users browsing the API)
 * stem from these definitions.
 */
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql/type';

import { getQuote } from './services/quote'

/**
 * GraphQL Quote type
 */
export const QuoteType = new GraphQLObjectType({
    name: 'Quote',
    description: 'Quote of the day from API service',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Quote id',
        },
        quote: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The text of the quote',
        },
        author: {
            type: GraphQLString,
            description: 'The person to whom the quote is attributed',
        },
        date: {
            type: GraphQLString,
            description: 'Date in YYYY-MM-DD format',
        }
    })
});

export default {
    type: QuoteType,
    resolve: getQuote
}