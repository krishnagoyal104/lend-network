export const openModal = (path) => {
  return {
    type: 'OPEN_MODAL',
    path
  };
};

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  };
};