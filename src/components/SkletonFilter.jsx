export default function SkletonFilter() {
  return (
    <div className="w-[100%] h-[100%]  flex gap-[40px] bg-red justify-center flex-col items-center">
      <div className="w-[200px]"></div>
      {/* <div className="skeleton-filter p-[20px]"></div> */}
      <div className="skeleton-filter w-[150px] p-[20px]"></div>
      <div className="skeleton-filter p-[20px]"></div>
      <div className="skeleton-filter p-[20px]"></div>
      <div className="skeleton-filter p-[20px]"></div>
    </div>
  );
}
