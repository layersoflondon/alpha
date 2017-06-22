class AddUserInviteStatusToUserGroupUsers < ActiveRecord::Migration
  def change
    add_column :user_group_users, :invitation_state, :string
  end
end
