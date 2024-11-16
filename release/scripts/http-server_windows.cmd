@echo off

start https://127.0.0.1:5000/app/

http-server -a 127.0.0.1 -p 5000 -S -C release/scripts/cert.pem -K release/scripts/key.pem -c-1
