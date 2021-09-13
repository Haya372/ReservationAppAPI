#!/bin/bash
set -e

# Rails に対応したファイル server.pid が存在しているかもしれないので削除する。
rm -f /myapp/tmp/pids/server.pid

echo "run npm install"
npm install

echo "run npm upgrade --force"
npm update --force

echo "npm run build"
npm run build

echo "remove node files"
rm -rf ./src

rails db:migrate:primary

# コンテナーのプロセスを実行する。（Dockerfile 内の CMD に設定されているもの。）
exec "$@"