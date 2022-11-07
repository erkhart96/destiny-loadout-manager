class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:bungie]

  def self.from_omniauth(auth)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create!(
                           provider: auth.provider,
                           uid: auth.uid,
                           membership_id: auth.info.membership_id,
                           display_name: auth.info.display_name,
                           unique_name: auth.info.unique_name,
                           password: auth.info.unique_name,
                           email: '123@yahoo.com'
                           )
  
    #  where(:uid => auth.uid).first_or_create do |user|
    #   print user
      # user.membership_id = auth.info.membership_id
      # user.display_name  = auth.info.display_name
      # user.unique_name   = auth.info.unique_name
end
print user
user
end
end
