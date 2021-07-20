import { useParams } from "react-router-dom";

function Profile() {
  const { username }: { username?: string } = useParams();
  return <div>profile</div>;
}

export default Profile;
