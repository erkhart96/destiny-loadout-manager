class Item < ApplicationRecord
    has_many :character_loadouts
    has_many :loadouts, through: :character_loadouts
end
