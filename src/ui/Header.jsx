import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-[5px]">
        Fast Pizza Co.
      </Link>
      <SearchOrder></SearchOrder>
      <UserName></UserName>
    </header>
  );
}

export default Header;
