import { Star } from "lucide-react";

interface RatingProps {
  onRatingChange?: (rating: number) => void;
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ onRatingChange, rating }) => {
  const handleClick = (star: number) => {
    if (onRatingChange) {
      onRatingChange(star);
    }
  };
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const star = index + 1;
        return (
          <button
            key={star}
            className={`w-6 h-6 ${star <= rating ? "text-yellow-400 " : "text-gray-300"} transition-colors duration-200`}
            onClick={() => handleClick(star)}
          >
            <Star
              style={{ fill: star <= rating ? "#FFD700" : "transparent" }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
