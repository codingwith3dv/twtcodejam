import { useState, useEffect } from 'react'
import Button from './Button'

import {
  db, auth
} from '../utils.js'

import {
  doc, getDoc, setDoc
} from 'firebase/firestore'

function Account() {
  const [userName, setUserName] = useState("");
  const [totalScore, setTotal] = useState(0);
  const [maxQns, setMaxQns] = useState(5);
  useEffect(() => {
    const getUserName = async () => {
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      setUserName(docSnap.data().userName);
      setTotal(docSnap.data().score);
      setMaxQns(docSnap.data().maxQns);
    }
    getUserName();
  }, []);

  return (
    <div className="flex flex-col divide divide-y-2 divide-gray-700">
      <div className="pb-2 pt-4">
        <h1 className="text-2xl text-zinc-300 font-bold font-heading-2">{ userName }</h1>
        <h1 className="text-md text-zinc-200 font-semibold font-desc">Total score: { totalScore }</h1>
      </div>

      <div className="pt-2">
        <div className="text-zinc-400 font-light font-heading text-md mb-2">Preferences</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-zinc-400 text-sm font-heading-2">Max words in vocabulary: { maxQns }</p>
            <input className="accent-violet-400" type="range" min="5" max="10" value={maxQns} onInput={e => {
              setMaxQns(e.target.value); 
              setDoc(doc(db, "users", auth.currentUser.uid), {
                maxQns: e.target.value
              }, { merge: true })
            }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <Button onClick={() => { auth.signOut() }} value="Sign Out" type="danger"/>
      </div>
    </div>
  );
}

export default Account;
