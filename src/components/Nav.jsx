import { getAuth } from 'firebase/auth'
import {
  useAuthState,
  useSignInWithGoogle,
  useSignInWithGithub,
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword
} from 'react-firebase-hooks/auth';

import { useState } from 'react'

import Modal from './Modal'

function Nav(props) {
  const auth = getAuth(props.firebase);
  const [user] = useAuthState(auth);

  const [modalOpen, setModalOpen] = useState(false);

  function Account() {
    return (
      <div>
      </div>
    );
  }

  function SignInForm() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [register, setRegister] = useState(false);

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    return (
      <div>
        <div className="mt-4 flex flex-col gap-4 divide-y divide-gray-500 justify-between">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              className="w-full h-10 bg-gray-700 outline-none hover:bg-gray-600 focus:bg-gray-600 ring-2 ring-gray-800 focus:ring-blue-700 rounded-md px-2 text-zinc-300 font-semibold"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full h-10 bg-gray-700 outline-none hover:bg-gray-600 focus:bg-gray-600 ring-2 ring-gray-800 focus:ring-blue-700 rounded-md px-2 text-zinc-300 font-semibold"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="rounded-md bg-accent px-4 py-2 font-bold text-zinc-300"
              onClick={() => {
                if(register)
                  createUserWithEmailAndPassword(email, password);
                signInWithEmailAndPassword(email, password);
              }}
              >
              { !register ? "Register" : "Sign In" }
            </button>
            <p className="font-light text-zinc-300 text-xs self-center">
              { register ? "Don't have an account?" : "Already have an account?" }
              <span
                className="text-violet-300"
                onClick={() => setRegister(!register)}> { register ? "Register" : "Sign In" }</span>
            </p>
          </div>
        
          <div className="flex flex-col gap-4 pt-4">
            <button
              className="
                hover:bg-accent fill-violet-300
                hover:fill-zinc-300 hover:text-zinc-300
                focus:bg-accent
                focus:fill-zinc-300 focus:text-zinc-300
                relative flex px-2 flex-row-reverse
                justify-end items-center rounded-md border-2
                border-accent font-bold text-violet-300
              "
              onClick={() => {
              }}
              >
              Continue With Google
              <div className="relative p-2 w-10 h-10">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640">
                  <path d="M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z"/>
                </svg>
              </div>
            </button>
            <button
              className="
                hover:bg-accent fill-violet-300
                hover:fill-zinc-300 hover:text-zinc-300
                focus:bg-accent
                focus:fill-zinc-300 focus:text-zinc-300
                relative flex px-2 flex-row-reverse
                justify-end items-center rounded-md border-2
                border-accent font-bold text-violet-300
              "
              onClick={() => {
              }}
              >
              Continue With Github
              <div className="relative p-2 w-10 h-10">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640">
                  <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/>
                </svg>
              </div>
            </button>
          </div>

        </div>
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

              { user ? <Account /> : <SignInForm /> }
            </div>
          </Modal>
        }

      </nav>
    </div>
  );
}

export default Nav;
