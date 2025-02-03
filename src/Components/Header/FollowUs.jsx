import {
  faFacebookF,
  faTwitter,
  faGooglePlusG,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FollowUs() {
  return (
    <div className=" flex justify-end mt-6 text-slate-400 text-sm ">
      <span className="mr-2">Follow Us:</span>
      <ul className="flex gap-4 mr-1">
        <li>
          <a className="hover:text-white text-base" href="#">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </li>
        <li>
          <a className="hover:text-white text-base" href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a className="hover:text-white text-base" href="#">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
        </li>
        <li>
          <a className="hover:text-white text-base" href="#">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </li>
      </ul>
    </div>
  );
}
