# chatSpace DB設計
## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :users
- has_many :messages, through: :

## userテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :messages
- has_many :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user


## groupテーブル
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :group_users, through: :messages



