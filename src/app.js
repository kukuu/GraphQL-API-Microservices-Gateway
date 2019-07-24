import {
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql/type';

import userQuery from './users';
import agendaQuery from './agenda-interface';
import quoteQuery from './quote';

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: userQuery,
        agenda: agendaQuery,
        quote: quoteQuery
    },
});

export default new GraphQLSchema({
    query,
});
