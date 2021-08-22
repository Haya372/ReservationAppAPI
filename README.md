# README
## 環境構築
ターミナル起動時に毎回
```
source aliases.sh
```
または
```
# bashの場合は.zshrcを.bash_profileに変更する
echo source $PWD/aliases.sh >> ~/.zshrc
source ~/.zshrc
```
起動コマンド  
[http://localhost:30000](http://localhost:30000)s
```
reserve-app
```
サーバーに入る
```
reserve-app-bash
```
dbに入る
```
reserve-app-db
```
データベースマイグレーション
```
# サーバー内で
rails db:migrate
```
