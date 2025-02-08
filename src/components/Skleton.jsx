const Skeleton = () => {
  return (
    <>
      {[2, 3, 4, 5].map((e) => (
        <div
          className="skeleton-card flex  gap-[20px]  p-[15px]  min-w-[90%]"
          key={e}
        >
          <div className="skeleton-image w-[30%]"></div>
          <div className="flex flex-col w-[70%] gap-[5px] justify-center ">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
{
  /* <div className="flex flex-col justify-center h-[max-content] w-[100%]" key={e?.id}>
              <div
                onClick={() => navigate(`/cardDetail/${e?.id}`)}
                className="relative flex flex-col cursor-pointer border-0 md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border-white bg-[#303030]"
              >
                <div className="w-full md:w-1/3 grid place-items-center rounded">
                  <img src={e?.image} alt="tailwind logo" className="bg-[#191a19]  w-[300px] h-[200px]" />
                </div>
                <div className="w-full md:w-2/3 bg-[#303030] flex gap-[20px] flex-col space-y-2 p-3">
                  <div className="flex gap-4 items-center justify-end w-[100%]">
                    <div className="flex items-center text-white">
                      <span className="text-[16px] gap-[5px] items-center flex">
                        <IoMdEye className="text-[22px]" /> 20534
                      </span>
                    </div>
                  </div>
                  <h3 className="font-[#1E201E] text-white md:text-[25px] text-xl">{e?.title}</h3>
                  <p className="md:text-lg text-white lg:w-[400px] line-clamp-2 text-base">
                    <span>{e?.attributes[0]?.title}</span>: {e?.attributes[0]?.description}
                  </p>
                </div>
              </div>
            </div> */
}
