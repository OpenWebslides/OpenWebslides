function IfAuthHOC(props) {
  if (props.isAuthenticated) {
    return props.children;
  }
  return props.fallback();
}
export default IfAuthHOC;
