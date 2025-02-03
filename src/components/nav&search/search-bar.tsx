import { Bell, Search } from 'lucide-react';

interface Props {
  profilePic: string;
  search: string;
  onSearchChange: (arg: string) => void;
}

export const SearchBar = (props: Props) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg max-w-full md:w-4/5 mx-auto">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg gap-4 bg-gray-100 p-3 rounded-full">
        <Search size={20} className="text-gray-500" />
        <input
          type="search"
          name="search"
          id="search"
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          value={props.search}
          onChange={(e) => {
            e.preventDefault();
            props.onSearchChange(e.target.value);
          }}
          placeholder="Search..."
        />
        <button className="bg-[#543EE0] px-4 py-2 text-white rounded-full hover:bg-[#4327B9] transition-all duration-200">
          Search
        </button>
      </div>

      {/* Notifications and Profile */}
      <div className="flex gap-6 items-center">
        <div className="relative">
          <Bell size={22} className="text-gray-700 hover:text-[#543EE0] cursor-pointer transition-all duration-200" />
          {/* Optional Notification Badge */}
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            3
          </div>
        </div>
        <img
          src={props.profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-[#543EE0] hover:border-[#4327B9] transition-all duration-200"
        />
      </div>
    </header>
  );
};
