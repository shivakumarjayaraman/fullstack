function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      {user.firstName && <p>Name: {user.firstName} {user.lastName}</p>}
    </div>
  );
}

export default UserCard;
