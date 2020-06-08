#!/bin/bash

curl -d '{"old_password": "StrongPasswordNot1234", "new_password": "StrongPasswordNot12345"}' \
  -H "Content-Type: application/json" \
  -X POST https://hasura-backend-plus-austinrivas.cloud.okteto.net/auth/change-password