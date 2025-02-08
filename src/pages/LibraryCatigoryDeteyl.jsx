import { useState } from 'react';
import { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaShareFromSquare } from 'react-icons/fa6';
export default function LibraryCategoryDetail() {
  const [text, setText] = useState('http://localhost:5174/libraryDetail/40');
  // copy link
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Matn nusxalandi!');
      })
      .catch((err) => {
        console.error('Nusxalashda xatolik:', err);
      });
  };

  const url = document.location;
  const texts = "Bu havolani ko'ring!";

  const handleShare = () => {
    const telegramUrl = `tg://msg_url?url=${encodeURIComponent(
      url,
    )}&text=${encodeURIComponent(texts)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleDownload = (fileUrl) => {
    const element = document.createElement('a');
    element.href = fileUrl;
    element.setAttribute('download', fileUrl.split('/').pop());
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://backend.tarixmanba.uz/api/libraries/',
      );
      const { results } = await response.json();
      setApiData(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6"></div>
      <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-3 gap-6">
        {apiData.map((item) => (
          <div
            key={item.id}
            className="bg-[#101113ab] shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
              <img
                src={`https://backend.tarixmanba.uz/${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 truncate">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Muallif:</span> {item.author}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Davlat:</span> {item.country}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Yil:</span> {item.year}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Tili:</span> {item.language}
              </p>
            </div>
            <div className="flex justify-between items-center p-4 border-t">
              <button
                className="text-blue-500 hover:text-blue-700 font-semibold text-sm flex"
                onClick={() =>
                  handleDownload(`https://backend.tarixmanba.uz/${item.file}`)
                }
              >
                <svg
                  className="lg:w-[30px] lg:h-[30px] w-[20px] h-[20px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleDownload}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V12.1893L14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697C15.8232 10.7626 15.8232 11.2374 15.5303 11.5303L12.5303 14.5303C12.3897 14.671 12.1989 14.75 12 14.75C11.8011 14.75 11.6103 14.671 11.4697 14.5303L8.46967 11.5303C8.17678 11.2374 8.17678 10.7626 8.46967 10.4697C8.76256 10.1768 9.23744 10.1768 9.53033 10.4697L11.25 12.1893V7C11.25 6.58579 11.5858 6.25 12 6.25ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z"
                    fill="#fff"
                  />
                </svg>
                <span className="ml-3 text-matn-color lg:text-[17px]">
                  7.7k
                </span>
              </button>

              <button
                className="btn lg:text-[28px] text-[20px] m-4 "
                onClick={() => document.getElementById('1').showModal()}
              >
                <FaShareFromSquare />
              </button>

              <dialog
                id="1"
                className="modal w-full bg-transparent h-full m-auto  "
              >
                {/*modal share */}
                <div className="h-full bg-transparent flex flex-col items-center justify-center">
                  <div className="bg-[#0e1311d7] w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3">
                    <form
                      form
                      method="dialog"
                      className=" w-[100%] flex justify-end"
                    >
                      <button className="btn text-[30px] text-[#db3c3c]">
                        <IoCloseOutline />
                      </button>
                    </form>
                    <div className="my-4">
                      <p className="text-sm">Yaqinlarga ulashing </p>
                      <div className="flex justify-around my-4">
                        <div className="border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-[white] border-[#ccc]  rounded-full flex items-center justify-center shadow-xl hover:shadow-[blue-500/50] cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                          </svg>
                        </div>
                        <div className="border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-[white] border-[#ccc]  rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                          </svg>
                        </div>
                        <div className="border hover:bg-[#bc2a8d] w-12 h-12 fill-[#bc2a8d] hover:fill-matn-color border-[#ccc]  rounded-full flex items-center justify-center shadow-xl hover:shadow-pink-500/50 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                            <circle cx="16.806" cy="7.207" r="1.078"></circle>
                            <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                          </svg>
                        </div>
                        <div className="border hover:bg-[#25D366] w-12 h-12 fill-[#25D366] hover:fill-[white] border-[#ccc]  rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                            ></path>
                          </svg>
                        </div>

                        <div
                          className="border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-[white] border-[#ccc] rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer"
                          onClick={handleShare}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
                          </svg>
                        </div>
                      </div>

                      <p className="text-sm">havolani nusxalash</p>
                      <div className="border-2 border-[#ccc] rounded flex justify-between items-center mt-4 py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="fill-gray-500 ml-2"
                        >
                          <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                          <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                        </svg>

                        <input
                          id="hs-clipboard-input"
                          className="w-full outline-none bg-transparent text-white "
                          type="text"
                          placeholder="link"
                          onChange={(e) => setText(e.target.value)}
                          value={text}
                        />

                        <button
                          className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600"
                          onClick={handleCopy}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
