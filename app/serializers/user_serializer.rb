class UserSerializer < ActiveModel::Serializer
    attributes :id, :about, :api_membership_id, :api_membership_type, :display_name, :email, :membership_id, :profile_picture, :provider, :uid, :unique_name
    has_many :loadouts
  end