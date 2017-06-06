function IfAuthHOC(props) {
  if (props.isAuthorized) {
    return props.children;
  }
  debugger;
  return props.fallback();
}
export default IfAuthHOC;
