import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import FriendsList from '../components/FriendsList';
import Auth from '../utils/auth';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];
  const userInfo = userData?.me || {};
  const loggedIn = Auth.loggedIn();
  console.log(userInfo);
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title='Some Feed for Thought(s)...'
            />
          )}
          {loggedIn && userInfo ? (
            <div className='col-12 col-lg-3 mb-3'>
              <FriendsList
                username={userInfo.username}
                friendCount={userInfo.friendCount}
                friends={userInfo.friends}
              />
            </div>
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
