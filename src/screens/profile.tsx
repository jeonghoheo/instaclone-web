import { gql, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import {
  seeProfile,
  seeProfileVariables,
  seeProfile_seeProfile_user
} from "../__generated__/seeProfile";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ok
      error
      user {
        firstName
        lastName
        username
        bio
        avatar
        photos {
          ...PhotoFragment
        }
        totalFollowing
        totalFollowers
        isMe
        isFollowing
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;

const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg: string }>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

function Profile() {
  const { username }: { username: string } = useParams();
  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username
      }
    }
  );
  const user = data?.seeProfile.user as seeProfile_seeProfile_user;
  return (
    <div>
      <Header>
        <Avatar src={user.avatar || ""} />
        <Column>
          <Row>
            <Username>{user.username}</Username>
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{user.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{user.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {user.firstName}
              {"  "}
              {user.lastName}
            </Name>
          </Row>
          <Row>{user.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {user?.photos &&
          user?.photos.map((photo) => (
            <Photo bg={photo.file}>
              <Icons>
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  {photo.likes}
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  {photo.commentNumber}
                </Icon>
              </Icons>
            </Photo>
          ))}
      </Grid>
    </div>
  );
}

export default Profile;
