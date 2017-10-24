function RequestsStatusHoc(props) {
  switch (props.requestsStatus) {
    case 'notStarted':
      return props.notStarted();
    case 'pending':
      return props.pending();
    case 'succeeded':
      return props.children;
    case 'failed':
      return props.displayErorrs();
    default:
      throw new Error('Error: Wrong status provided to component');
  }
}
export default RequestsStatusHoc;
