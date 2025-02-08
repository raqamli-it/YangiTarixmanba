import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputMask } from 'primereact/inputmask';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

function Login({ setAuth }) {
  const [state, setState] = useState({ phone: '+998911111111', password: '1' });
  const [eye, setEye] = useState(false);
  const [value1, setValue1] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (state.phone === '+998(91)-111-11-11' && state.password === '12345678') {
      const token = {
        value: 'dummy-auth-token',
        expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7 kun amal qiladi
      };
      localStorage.setItem('authToken', JSON.stringify(token));
      setAuth(true);
      navigate('/'); // Login muvaffaqiyatli bo'lsa, bosh sahifaga o'tish
    } else {
      setError(`Telefon raqami yoki parol noto'g'ri!`);
    }
  };

  return (
    <div className="py-20" style={{ backgroundPosition: 'center' }}>
      <div className="w-full">
        <div className="login_body w-2/5 xl:w-1/2 md:w-4/5 mx-auto border-[4px] bg-[#000000a3] backdrop-blur-[45px] border-yellow-950 rounded-[20px]">
          <h1 className="text-[38px] text-white text-center mb-10">
            Hisobingizga kiring!
          </h1>

          {error && (
            <p className="text-white bg-red-500 text-center mb-4 mt-4">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>
            <div className="input_div">
              <label>Telefon raqam:</label>
              <div className="phone_input">
                <span>+998</span>
                <InputMask
                  style={{ color: '#000' }}
                  value={value1}
                  onChange={(e) => {
                    setValue1(e.value);
                    setState({ ...state, phone: `+998${e.value}` });
                  }}
                  mask="(99)-999-99-99"
                />
              </div>
            </div>

            <div className="input_div">
              <label>Parol:</label>
              <div className="pass_input">
                <input
                  type={eye ? 'text' : 'password'}
                  name="password"
                  required
                  maxLength="8"
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                />
                <button type="button" onClick={() => setEye(!eye)}>
                  {!eye ? <RiEyeLine /> : <RiEyeCloseLine />}
                </button>
              </div>
            </div>

            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
