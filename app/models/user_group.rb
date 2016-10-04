class UserGroup < ActiveRecord::Base
  belongs_to :primary_user, class_name: "User"

end
