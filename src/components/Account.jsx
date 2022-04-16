import {
  db, auth
} from '../utils.js'

function Account() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
  }, []);

  return (
    <div>
      <button onClick={() => { auth.signOut() }}>Sign Out</button>
    </div>
  );
}

export default Account;
