class Loadout < ApplicationRecord
    has_many :character_loadouts
    has_many :items, through: :character_loadouts, dependent: :destroy
end
