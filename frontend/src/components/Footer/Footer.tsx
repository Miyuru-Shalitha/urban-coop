import FooterCard from "./FooterCard";
import FacebookIcon from "../../assets/icons/facebook_icon.svg";
import InstagramIcon from "../../assets/icons/instagram_icon.svg";
import TikTokIcon from "../../assets/icons/tiktok_icon.svg";
import LinkedInIcon from "../../assets/icons/linkedin_icon.svg";

export default function Footer() {
  return (
    <footer>
      <div className="bg-secondary text-white flex justify-center">
        <div className="flex justify-between w-container">
          <FooterCard title="About Us">
            <p className="text-base text-center">
              Aliquam nec nunc volutpat laoreet. Nam in faucibus at, fermentum
              leo at ligula. Mauris leo. Etiam nibh nulla quis tortor. Cum
              sociis natoque penatibu s et lacus sed lacus. In tristique
              senectus et nisl. Nam at purus.
            </p>
          </FooterCard>

          <FooterCard title="Contact Us">
            <p className="text-base text-center">
              Aliquam nec nunc volutpat laoreet. Nam in faucibus at, fermentum
              leo at ligula. Mauris leo. Etiam nibh nulla quis tortor. Cum
              sociis natoque penatibu s et lacus sed lacus. In tristique
              senectus et nisl. Nam at purus.
            </p>
          </FooterCard>

          <FooterCard title="Social Media">
            <div className="flex gap-3">
              <img src={FacebookIcon} alt="Facebook icon" />
              <img src={InstagramIcon} alt="Instagram icon" />
              <img src={TikTokIcon} alt="TikTok icon" />
              <img src={LinkedInIcon} alt="LinkedIn icon" />
            </div>
          </FooterCard>
        </div>
      </div>

      <div className="bg-gray3 flex justify-center py-4">
        <div className="w-container text-white text-xs">
          <p className="py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor.
          </p>
          <p className="py-4">© 2024 Urban Coop</p>
        </div>
      </div>
    </footer>
  );
}
