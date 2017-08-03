

const liveViewFactory = () => {
  const createContentItem = (contentItem) => {
    console.log(contentItem);
    return contentItem;
  };

  return {
    createContentItem,
  };
};

export default liveViewFactory;
