class CharacterLoadoutSerializer < ActiveModel::Serializer
  attributes :id, :loadout_id, :user_id
  has_many :loadout
end
