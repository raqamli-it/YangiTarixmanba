import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

export default function NoteFound() {
  // const history = useHistory();
  const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-[blue]">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[gray] dark:text-[white] md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-[gray] dark:text-[gray]">
            Sorry, the page you are looking for doesn't exist.Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-[#b63434] transition-colors duration-200 bg-[white] border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-[black] dark:bg-[gray] hover:bg-[gray] dark:text-[white] dark:border-[gray]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span className="text-matn-color">Go back</span>
            </Link>

            <Link
              to="/"
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-[white] transition-colors duration-200 bg-[blue] rounded-lg shrink-0 sm:w-auto hover:bg-[blue] dark:hover:bg-[blue] dark:bg-[blue]"
            >
              Take me home
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="https://merakiui.com/images/components/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
