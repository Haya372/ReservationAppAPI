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

## 管理画面について
データベースのカラムが増えるとページを１から作り直すのが面倒そうだったからjsonでカラムを増やせるようにした
### 詳細画面
/src/config/*.jsの中身をいじればレイアウトの変更ができるようになってる
```
{
  "property_name": {
    size: 12, // size of grid layout
    required: true, // if true, you can't update the property blank
    component: 'text', // component type which are defined /src/utils/resources.js
    props: { }, // Properties which are passed to the component
  },
  ...
}
```
### 詳細画面での自作コンポーネントの使用方法
valueで表示内容を受け取ってonChangeで変更されるように作っておけばOK  
material-uiのTextFieldなどはそのまま使える  
作ったものは/src/utils/resources.jsに登録すれば使えるようになる
```
{
  "component_hash": (props) => <CustomComponent {...props} />, // You should pass properties if you want to use them
  ...
}