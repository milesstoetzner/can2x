#!/usr/bin/env bash
set -e

curl -X POST -H "Content-Type: application/json" localhost:3000 --data '{"id": 1, "data": [1, 2, 3]}'