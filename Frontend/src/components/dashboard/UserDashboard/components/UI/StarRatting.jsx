const StarRating = ({ value, onChange, readonly = false }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange && onChange(star)}
          className={`text-base leading-none transition-colors ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } ${star <= (value || 0) ? "text-amber-400" : "text-gray-200"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;