import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [checked, setChecked] = useState(false);

  const [inputCheck, setInputCheck] = useState(false);

  const registerToken =
    't0Dy02Xf21gCstVLNVSfe1Gibb1ftDxFvkKFyhdUrxyzZIGbFQ2OkQSMtSRbuJ7W';

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (username && email && password && password2 && password == password2) {
      setInputCheck(false);

      fetch('https://backend.tarixmanba.uz/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${registerToken}`,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          password2: password2,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result, 'Salomat');
          if (email && username) {
            navigate('/login');
          }
        });
    } else {
      if (password !== password2) {
        setChecked(true);
      }
      setInputCheck(true);
    }
  };

  const [handleMouseDown, setHandleMouseDown] = useState(false);

  return (
    <div className="py-20">
      <div className="login_body w-2/5 xl:w-1/2 md:w-4/5 mx-auto border-[4px] bg-[#000000a3] backdrop-blur-[45px] border-yellow-950 rounded-[20px]">
        <h1 className="text-[38px] text-white text-center mb-10">
          Ro'yxatdan o'ting!
        </h1>

        <form
          onSubmit={registerUser}
          className="bg-transparent w-1/2 mx-auto flex flex-col gap-y-6"
        >
          <div>
            <input
              autoComplete="surname"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Ismingizni kiriting!..."
              className="bg-transparent text-white h-[52px] border-[2px] outline-none border-gray-600 px-5"
            />
            {inputCheck && (
              <span className="text-red-600 text-[16px]" id="name">
                {username ? '' : 'Ismingizni kiriting'}
              </span>
            )}
          </div>

          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Elektron manzilingizni kiriting!..."
              className="bg-transparent text-white h-[52px] border-[2px] outline-none border-gray-600 px-5"
            />
            {inputCheck && (
              <span className="text-red-600 text-[16px]" id="email">
                {email.includes('@gmail.com') ? '' : ' Emailingizni kiriting'}
              </span>
            )}
          </div>

          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              minLength={8}
              placeholder="Parol kiriting!..."
              className="bg-transparent text-white h-[52px] border-[2px] outline-none border-gray-600 px-5"
            />
            {inputCheck && (
              <span className="text-red-600 text-[16px]" id="parol">
                {password ? '' : 'Parol kiriting'}
              </span>
            )}
          </div>

          <div>
            <input
              onMouseUp={() => setHandleMouseDown(!handleMouseDown)}
              onChange={(e) => setPassword2(e.target.value)}
              type="text"
              minLength={8}
              placeholder="Kiritgan parolingizni yana qayta kiriting!..."
              className="bg-transparent text-white h-[52px] border-[2px] outline-none border-gray-600 px-5"
            />
            {inputCheck && (
              <span className="text-red-600 text-[16px]" id="takroriyparol">
                {checked
                  ? 'Parollar bir biriga mas emas'
                  : `${handleMouseDown ? '' : 'Parolni qayta kiriting'}`}
              </span>
            )}
          </div>

          <button
            className="bg-transparent hover:bg-green-700 hover:border-green-700 duration-300 ease-linear text-white h-[52px] border-[2px] outline-none border-gray-600 px-5"
            type="submit"
          >
            Ro'yxatdan o'tish
          </button>
          <div className="flex justify-center">
            <p className="signup">
              <Link to="/login">Hisobingizga kiring!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
