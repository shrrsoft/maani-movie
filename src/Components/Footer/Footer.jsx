import { Link } from "react-router-dom";

export default function Footer() {
  const logos = [
    { title: "insta", url: "https://www.instagram.com/" },
    { title: "telegram", url: "https://telegram.org/" },
    { title: "x", url: "https://x.com/" },
    { title: "youtube", url: "https://www.youtube.com/" },
    { title: "RSS", url: "#" },
  ];
  return (
    <footer className="bg-slate-900 pt-6 pb-14">
      <div className="container mx-auto">
        <div className="flex items-center justify-center md:justify-between flex-wrap">
          <div className="flex gap-4 justify-center md:justify-start mb-4">
            <Link to="#">Help</Link>
            <Link to="#">Jobs</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">About Us</Link>
          </div>
          <div>
            <form action="" className="flex flex-wrap justify-center gap-2">
              <input
                type="email"
                placeholder="Your E-mail"
                className="p-1 pl-3 rounded-md w-64 outline-none"
              />
              <input
                type="submit"
                value="Subscribe"
                className="border p-1 rounded-md hover:bg-slate-300/30"
              />
            </form>
          </div>
        </div>
        <div className="w-72 mx-auto p-2 m-4">
          <p className="text-center pb-2 font-bold text-sm ">
            Follow Maani-Movies on social
          </p>
          <div className="bg-gradient-to-r from-slate-300/0 via-slate-300 to-slate-300/0 h-0.5"></div>
          <div className="flex justify-center items-start gap-2">
            {logos.map((item) => (
              <Link to={item.url} key={item.title} target="_blank">
                <img
                  className="rounded-full size-8 opacity-70 hover:opacity-100"
                  src={`/src/assets/footer-socialNetwork-logo/${item.title}.jpg`}
                  alt={item.title}
                />
              </Link>
            ))}
          </div>
          <div className="bg-gradient-to-r from-slate-300/0 via-slate-300 to-slate-300/0 h-0.5"></div>
        </div>
        <p className="mt-8 text-center">
          © Designed & Developed by S'Hamidreza Razavi
        </p>
      </div>
    </footer>
  );
}
