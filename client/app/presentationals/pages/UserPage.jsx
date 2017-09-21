import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import UserProfileContainer from 'containers/profile-page/UserProfileContainer';

function UserProfilePage(props) {
  const id = props.location.pathname.match(/\/users\/([0-9]+)/)[1];
  return (
    <DefaultLayout
      cssIdentifier="user-page-container"
      components={{
        'user-profile-container': <UserProfileContainer id={id} />,
      }}
    />
  );
}

export default UserProfilePage;
