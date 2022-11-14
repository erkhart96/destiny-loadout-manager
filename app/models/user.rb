class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :character_loadouts
  has_many :loadouts, through: :character_loadouts
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:bungie]

  def email_required?
    false
  end

  def password_required?
    false
  end

  def self.from_omniauth(auth)
    # user = User.where(:provider => auth.provider, :uid => auth.uid).first
    # unless user
    #   user = User.create!(
    #                        provider: auth.provider,
    #                        uid: auth.uid,
    #                        membership_id: auth.info.membership_id,
    #                        display_name: auth.info.display_name,
    #                        unique_name: auth.info.unique_name,
    #                        password: auth.info.unique_name,
    #                        email: '123@yahoo.com'
                          #  )
  
                          where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
            
                            user.membership_id = auth.info.membership_id
                            user.unique_name = auth.info.unique_name
                            user.display_name = auth.info.display_name
                            user.api_membership_type = auth.extra.membership_type
                            user.api_membership_id = auth.extra.primary_membership_id
                            
     end
    end
end
