#!/bin/bash
cd /home/ubuntu/Menuger/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export ACCESS_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_KEY --query Parameters[0].Value | sed 's/"//g')
export CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export MONGO_URL=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_URL --query Parameters[0].Value | sed 's/"//g')
export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')
export REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export SECRET_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names SECRET_KEY --query Parameters[0].Value | sed 's/"//g')
export SITE_DOMAIN=$(aws ssm get-parameters --region ap-northeast-2 --names SITE_DOMAIN --query Parameters[0].Value | sed 's/"//g')
export COOKIE_SECURE=$(aws ssm get-parameters --region ap-northeast-2 --names COOKIE_SECURE --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js