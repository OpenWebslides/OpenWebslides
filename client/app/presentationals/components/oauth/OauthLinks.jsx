import React from 'react';

function OauthLinks() {
  return (
    <div>
      <ul>
        <li><a href="http://localhost:5000/auth/facebook">Facebook</a></li>
        <li><a href="http://localhost:5000/auth/github">Github</a></li>
        <li><a href="http://localhost:5000/auth/google_oauth2">Google</a></li>
      </ul>
    </div>
  );
}

export default OauthLinks;
