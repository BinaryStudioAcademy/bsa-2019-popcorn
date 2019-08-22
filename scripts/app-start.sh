#!/bin/bash
cd /home/ubuntu/bsa-2019-popcorn/server/
pm2 delete all
pm2 start --name PopCorn ts-node -- -P tsconfig.json ./index.ts