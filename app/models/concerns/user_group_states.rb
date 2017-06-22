module UserGroupStates
  def current
    invitations("accepted")
  end

  def invitations(invitation_state = "invited")
    where({user_group_users: {invitation_state: invitation_state}})
  end

  def group_invitation(group)
    where({user_group_users: {invitation_state: "invited", user_group_id: group.id}}).first
  end
end