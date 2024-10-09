#!/bin/bash
if [ "$1" = "" ]
then
  echo "Usage: $0 <tag identifier>"
  exit
fi

docker build -f ./api/Dockerfile -t $1-api .
docker build -f ./web/Dockerfile -t $1-web .
