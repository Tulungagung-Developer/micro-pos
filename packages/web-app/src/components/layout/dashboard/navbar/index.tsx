import { FigmaIcon } from '@components/svgs/figma';
import { NotificationBellIcon } from '@components/svgs/notification-bell';
import { SearchIcon } from '@components/svgs/search';
import { Icon } from '@iconify/react';
import { Input, Popover, Whisper } from 'rsuite';

export const Navbar = () => {
  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      <div className="pl-10 text-2xl font-semibold">All Products</div>
      <div className="py-4 w-[40%] relative">
        <div className="absolute top-1/2 flex justify-center items-center py-1 px-2 gap-2 rounded-md bg-slate-200 right-1 transform -translate-y-1/2 ">
          <FigmaIcon />
          <div className="font-semibold">F</div>
        </div>
        <div className="absolute top-1/2 flex justify-center items-center left-5 transform -translate-y-1/2 ">
          <SearchIcon />
        </div>
        <Input
          placeholder="Search by name, sku or upc..."
          className="w-full pl-10 h-10 border-none focus:outline:none bg-slate-100 my-1 mx-2"
        />
      </div>
      <div className="pr-6     flex flex-row gap-5">
        <button className="bg-transparent hover:bg-transparent flex justify-center items-center">
          <Icon icon="si:moon-line" width="20" height="20" />
        </button>
        <button className="bg-transparent hover:bg-transparent flex justify-center items-center">
          <NotificationBellIcon />
        </button>
        <div>
          <Whisper
            trigger="click"
            placement="bottomStart"
            controlId={`control-id-bottom`}
            speaker={
              <Popover>
                ad
                <i className="rs-icon-user"></i>
              </Popover>
            }
          >
            <div className="flex flex-row gap-2 flex justify-center items-center">
              <div className="w-14 h-14 bg-slate-200 rounded-full">
                <i className="rs-icon-bell"></i>
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-semibold">Staff Satu</div>
                <div>Staffsatu@gmail.com</div>
              </div>
              <div className="flex justify-center items-center">
                <Icon icon="iconamoon:arrow-down-2" width="35" height="35"></Icon>
              </div>
            </div>
          </Whisper>
        </div>
      </div>
    </div>
  );
};
