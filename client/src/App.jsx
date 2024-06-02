import { IoAdd } from "react-icons/io5";
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserStore, useUIStore } from './store';
import { TopMenu, Sidebar, UsersForFollow, Modal, FloatingSidebar } from './shared';

export const App = () => {

  const user = useUserStore(state => state.user);
  const { openModalPost, setTypePost } = useUIStore(state => state);

  const location = useLocation();

  if (!user.isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-3 h-screen w-full bg-blue-600" >
      <div className="h-full w-full bg-white overflow-hidden flex flex-col rounded-xl shadow-xl">

        <TopMenu user={user} />
        <div className="h-full flex">

          <div className={`${location.pathname === '/messages' ? 'h-full pt-10 px-5' : 'h-full pt-10 px-5 sm:w-0 md:w-1/2 lg:w-1/2 max-[1200px]:w-0'}`}></div>

          <Sidebar />

          <Outlet />

          <div
            className="absolute px-4 cursor-pointer min-[770px]:hidden" style={{ bottom: '2rem' }}
            onClick={() => {
              setTypePost("post");
              openModalPost();
            }}
          >
            <div className="flex bg-blue-500 hover:bg-blue-400 rounded-full px-3 py-3 mt-12 mr-2">
              <IoAdd size={45} color="white" />
            </div>
          </div>

          <Modal />

          <div className={`${location.pathname === '/messages' ? 'hidden' : 'h-full w-screen border-r pt-8 px-5 max-[1200px]:w-0'}`}>
            <UsersForFollow />
          </div>

          <FloatingSidebar />
        </div>
      </div>
    </div >
  )
}

