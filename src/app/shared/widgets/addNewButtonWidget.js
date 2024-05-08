import React from 'react';

function AddButton(props) {
  const { icon, title, onClick, ...btnProps } = props;
  return (
    <button {...btnProps} onClick={onClick}>
      {icon} {title}
    </button>
  );
}

export default AddButton;
