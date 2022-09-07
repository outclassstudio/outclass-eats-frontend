interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export default function Button({
  canClick,
  loading,
  actionText,
}: IButtonProps) {
  return (
    <button
      className={`text-white focus:outline-none py-4 text-lg font-medium transition-colors ${
        canClick
          ? "bg-lime-600 hover:bg-lime-700 "
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
}
