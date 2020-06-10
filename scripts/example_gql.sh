#!/bin/bash

curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: hasura" \
  --data '{ "query": "{ denoHello { message } }" }' \
  https://graphql-engine-austinrivas.cloud.okteto.net/v1/graphql