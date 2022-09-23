import { removeChildNodes, getInitials } from "../utils";


const compareStrings = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;

  return 0;
}

/**
 * Function which sorts names by last name 
 *
 * @param {object} a first friend
 * @param {object} b second friend
 * @return {int} integer denoting which of the friend last name is alphabetically bigger
 */
const compareNameOfPerson = (a, b) => {
  //split on space between first and last name
  const firstNameA = a.name.split(" ");
  const firstNameB = b.name.split(" ");
  //get the value (last name) which is located at last index
  const lastNameA = firstNameA[firstNameA.length - 1];
  const lastNameB = firstNameB[firstNameB.length - 1];

  //if both last names are same, refer to the first name
  return lastNameA === lastNameB ?
    compareStrings(firstNameA[0], firstNameB[0]) :
    compareStrings(lastNameA, lastNameB);
}

const sortFriendsList= (friendsList) => {
  //top friends 
  const topFriends = friendsList.filter((friend) => friend?.topFriend);
  //friends which are not top friends
  const notTopFriends = friendsList.filter((friend) => !friend?.topFriend);
  //sort by last name using compareNameOfPerson
  const sortedRegularFriends = (notTopFriends || []).sort(compareNameOfPerson);
  //combining them after sorting
  return [...topFriends, ...sortedRegularFriends];
}

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");

  //checking if a friend is a top friend
  //topFriends are marked with a true value in the db
  if(topFriend==undefined){
    nameNode.innerHTML = `${name}`;
  }
  else{
    nameNode.innerHTML = `${name + " \u2728"}`; //adding star symbol for top friend
  }
  
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
  }
  else{
    const initials = getInitials(name);
    // check if initials are defined
    if(initials){
      const initialsParagraph = document.createElement("p");
      initialsParagraph.innerHTML = initials;
      avatarNode.appendChild(initialsParagraph);
    }
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {
  
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);
    const friends = sortFriendsList(resultsData.friends);


    for (let i = 0; i < resultsData.friends.length; i++) {
      const friendsNode = generateListItemNode(friends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};
