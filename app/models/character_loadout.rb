class CharacterLoadout < ApplicationRecord
    belongs_to :user
    belongs_to :item
    belongs_to :loadout
end
