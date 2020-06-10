curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: hasura" \
  --data '{ "query": 
    "mutation { 
      authLogin (authLoginInput: { 
        username: \"austinrivas\", 
        password: \"password12345\" 
      }) { accessToken } }" }' \
  https://graphql-engine-austinrivas.cloud.okteto.net/v1/graphql