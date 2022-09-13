import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col item-center justify-center">
      <div className="flex justify-center font-semibold text-xl mb-3">
        Page Not Found
      </div>
      <div className="flex justify-center text-base">
        존재하지 않는 페이지입니다.
      </div>
      <div className="flex justify-center text-base mb-5">
        홈으로 이동합니다
      </div>
      <Link
        className="flex justify-center text-lime-500 hover:underline"
        to="/"
      >
        홈으로 &rarr;
      </Link>
    </div>
  );
}
