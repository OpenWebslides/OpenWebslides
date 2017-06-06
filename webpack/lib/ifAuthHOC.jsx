function ifAuthHOC(props, isAuthorized) {
  if (isAuthorized) {
    return props.children;
  }
  return props.fallback;
}

export default ifAuthHOC;
