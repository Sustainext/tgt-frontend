const CustomTableField = ({ idSchema, children }) => {
    return (
      <div id={idSchema.$id}>
        {children}
      </div>
    );
  };
  
  export default CustomTableField;
  