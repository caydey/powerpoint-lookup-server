#!/bin/sh
tmux new -c "./server" "npm run dev" ';' split -c "./client" "npm run serve"
