class Loadout < ApplicationRecord
    has_many :character_loadouts, dependent: :destroy
    has_many :items, through: :character_loadouts
end
