const Rating = ({ value, count }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <span key={i}>★</span>;
          } else if (i === fullStars && hasHalfStar) {
            return <span key={i}>★</span>;
          } else {
            return (
              <span key={i} className="text-gray-300">
                ★
              </span>
            );
          }
        })}
      </div>
      <span className="ml-1 text-sm text-gray-600">({count})</span>
    </div>
  );
};

export default Rating;
