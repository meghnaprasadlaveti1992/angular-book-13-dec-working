#!/bin/bash

#####
# Helper script for pretty formatting of json files
#####

for file in `ls -a app/books | grep -v \\\.\$`; do
  cat app/books/$file | python -mjson.tool > tmp.json
  rm app/books/$file
  mv tmp.json app/books/$file
done
