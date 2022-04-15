import {
  getAuth
} from 'firebase/auth'
import {
  useAuthState
} from 'react-firebase-hooks/auth';

import { useState } from 'react'

import Modal from './Modal'
import SignInForm from './SignIn'

function Nav(props) {
  const auth = getAuth(props.firebase);
  const [user] = useAuthState(auth);

  const [modalOpen, setModalOpen] = useState(false);

  function Account() {
    return (
      <div>
        <button onClick={() => { auth.signOut() }}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <nav className="bg-gray-800 h-14 flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="text-zinc-200 text-2xl font-bold font-nav-heading">Unordinary</div>

        <div className="h-10 md:h-8 lg:h-6 aspect-square">
          <div onClick={() => setModalOpen(true)}>
            {
              user ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-violet-500">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-gray-500">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            }
          </div>
        </div>
        
        {modalOpen &&
          <Modal>
            <div className="bg-gray-800 w-full m-4 md:m-6 lg:m-8 relative p-4 md:p-6 lg:p-8 rounded-lg shadow shadow-zinc-700 shadow-sm">
              <div className="flex flex-row justify-between items-cente items-center">
                <h1 className="text-gray-400 text-md font-bold font-heading">{ user ? "Account" : "Register or Sign In" }</h1>
                <button onClick={() => setModalOpen(false)} className="flex justify-center items-center w-8 h-8 bg-gray-600 self-start font-heading font-black rounded-full hover:ring ring-gray-500 ring-2 text-zinc-300">x</button>
              </div>

              { user ? <Account /> : <SignInForm firebase={props.firebase}/> }
            </div>
          </Modal>
        }

      </nav>
    </div>
  );
}

export default Nav;
