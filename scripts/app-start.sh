#!/bin/bash
cd /home/ubuntu/bsa-2019-popcorn/server/
pm2 delete PopCorn
pm2 start npm --name "PopCorn" -- start