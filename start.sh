#!/bin/bash

if [ "$1" == "client" ]; then
  cd www
  pnpm run dev
fi

if [ "$1" == "server" ]; then
  cd server
  poetry run start
fi
