#!/bin/bash

curl -d '{"email":"austin@beluga.services", "password":"StrongPasswordNot1234"}' -H "Content-Type: application/json" -X POST https://hasura-backend-plus-austinrivas.cloud.okteto.net/auth/register