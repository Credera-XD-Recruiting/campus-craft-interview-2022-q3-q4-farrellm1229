import underlineSrc from "../assets/underline.svg";
import { getInitials } from "../utils";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc, jobTitle, companyName } = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const profileAvatarNode = headerNode.querySelector("img");
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");
  const titleNode = headerNode.querySelector(".profile-info2 .profile-info-name2");


  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half"
  );
  
  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);
  profileAvatarNode.src = avatarSrc;
  profileAvatarNode.setAttribute("aria-label", `${firstName} ${lastName}`);
  document.getElementById("myText").innerHTML = (`${jobTitle} @ ${companyName}`);

  if (!avatarSrc) {
    profileAvatarNode.remove();
    const initials = getInitials(`${firstName} ${lastName}`);
    // check if initials are defined
    if(initials){
      const avatarNode = headerNode.querySelector(".profile-avatar");
      const initialsParagraph = document.createElement("p");
      initialsParagraph.innerHTML = initials;
      avatarNode.appendChild(initialsParagraph);
    }
  }
};
