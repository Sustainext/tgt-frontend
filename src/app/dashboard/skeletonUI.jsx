const SkeletonLoader = ({ height, width }) => {
    return (
      <div
        style={{
          height,
          width,
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          animation: "pulse 1.5s infinite ease-in-out",
        }}
      />
    );
  };
  
  export default SkeletonLoader;
  