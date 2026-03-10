export function TicketArea() {
  return (
    <div className="relative h-[700px] max-[1115px]:h-[600px] max-[767px]:h-[500px]">
      <p className="text-[11px] whitespace-pre text-clay mb-4">
        {"\u2591"}{"  "}IT&apos;S GREAT FOR WORKING
        <br />
        {"\u2591"}{"  "}WITH TABULAR DATA
      </p>
      <div className="group relative h-full mt-[70px]">
        <img
          className="absolute left-[100px] top-[40px] max-[1115px]:left-[40px] max-[1115px]:top-[20px] max-[767px]:left-0 max-[767px]:top-[20px] transition-transform duration-1000 ease-[cubic-bezier(1,0.05,0.48,0.99)] group-hover:translate-x-[20px] group-hover:translate-y-[-24px] group-hover:rotate-[2deg]"
          src="/assets/boarding-pass.svg"
          alt=""
        />
        <img
          className="absolute top-[130px] left-[-20px] max-[1115px]:top-[110px] max-[1115px]:left-[-80px] max-[767px]:top-[100px] max-[767px]:left-[-60px] transition-transform duration-1000 ease-[cubic-bezier(1,0.05,0.48,0.99)] group-hover:rotate-[-3deg] group-hover:translate-x-[-96px] group-hover:translate-y-[12px]"
          src="/assets/receipt.svg"
          alt=""
        />
        <img
          className="absolute top-[250px] left-[500px] rotate-[270deg] max-[1115px]:top-[280px] max-[1115px]:left-[350px] max-[767px]:top-[300px] max-[767px]:left-[150px] transition-transform duration-1000 ease-[cubic-bezier(1,0.05,0.48,0.99)] group-hover:translate-x-[60px] group-hover:translate-y-[20px] group-hover:rotate-[275deg]"
          src="/assets/bag-tag.svg"
          alt=""
        />
      </div>
    </div>
  );
}
