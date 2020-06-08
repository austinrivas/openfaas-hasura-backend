FROM hasura/graphql-engine:v1.2.2


ARG HASURA_GRAPHQL_JWT_SECRET
ARG HASURA_GRAPHQL_ADMIN_SECRET
# JWT Config
ENV HASURA_GRAPHQL_JWT_SECRET=$HASURA_GRAPHQL_JWT_SECRET
# Enable Authentication on GraphQL
ENV HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_GRAPHQL_ADMIN_SECRET
# Enable the console
ENV HASURA_GRAPHQL_ENABLE_CONSOLE=$HASURA_GRAPHQL_ENABLE_CONSOLE
# Change $DATABASE_URL to your heroku postgres URL if you're not using
# the primary postgres instance in your app
CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT