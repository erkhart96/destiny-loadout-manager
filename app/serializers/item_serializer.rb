class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_hash, :item_instance, :name, :image, :item_type
end
