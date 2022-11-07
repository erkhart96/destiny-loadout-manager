class CharacterLoadout < ApplicationRecord
    belongs_to :user
    belongs_to :loadout
end
