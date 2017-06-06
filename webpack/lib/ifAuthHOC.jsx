function ifAuthHOC(props) {
  if (props.isAuthorized) {
    return props.children;
  }
  return props.fallback;
}

export default ifAuthHOC;
