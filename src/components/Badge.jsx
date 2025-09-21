const Badge = ({ type = "default", children }) => {
  const getBadgeClass = () => {
    switch (type) {
      case "hot":
        return "bg-red-100 text-red-800";
      case "sale":
        return "bg-green-100 text-green-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeClass()}`}
    >
      {children}
    </span>
  );
};

export default Badge;
