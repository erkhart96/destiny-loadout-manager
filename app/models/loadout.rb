class Loadout < ApplicationRecord
    has_many :character_loadouts
    has_many :users, through: :character_loadouts
end
