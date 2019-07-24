# GraphQL and REST API Gateway Example 

This code contains an example of an [API Gateway](http://microservices.io/patterns/apigateway.html) written in NodeJS.  It was written to demonstrate how to combine both a [GraphQL](http://graphql.org/) API with traditional [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoints.

## Installation

Generally, the installation steps should be:


```
git clone .......
yarn install
yarn run start
````

You should see the following message:
```
Running GraphQL API server at http://localhost:4000/graphql
```

At which point you can point your browser to your GraphQL endpoint at http://localhost:4000/graphql and explore it.


## Example GraphQL Queries

Looking up a user and their name by their `_id`:
```
{
  users(_id:1) {
    _id
    name
  }
}
```

Or omit the `_id` from the results:
```
{
  users(_id:1) {
    name
  }
}
```

You can also list all users:

```
{
  users {
    name
  }
}
```

Get a quote of the day using GraphQL:

```
{
  quote {
    quote
  }
}
```

Do both (aggregate data):

```
{
  users(_id: 3) {
    name
  },
  quote {
    quote
  }
}
```

## Example REST queries

- `http://localhost:4000/users/2` -- perform a REST call to fetch user ID 2
- `http://localhost:4000/quote` -- return a quote of the day from our "microservice" at http://quotes.rest/


## Explanation

This repo demostrates a simple combination of GraphQL and RESTful endpoints.  GraphQL types (e.g. the "quote" type) relies on a service class whose job it is to fetch the data from a microservice.  The REST endpoints rely on GraphQL.  The goal was to not repeat code anywhere, and improve performance.

Specifically, GraphQL allows you to:

```
i. Evolve your API naturally without versioning

ii. Provides workable documentation

iii. Avoids the problems of over- and under-fetching

iv. Offers a convenient way to aggregate data from multiple sources with a single request.

```

In this example, the REST requests are translated into GraphQL queries and then fed through the application.  This repo represents an easier solution than structuring it the other way around and trying to translate GraphQL queries into their REST equivalents (although that approach should be possible). 


## Rate Limiting

Note: The public quote API service has a rate limit of 10 requests per hour exceeded.  
