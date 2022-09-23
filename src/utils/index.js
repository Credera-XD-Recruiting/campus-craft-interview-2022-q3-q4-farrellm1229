/**
 * Function which accepts a DOM node and removes all of its child nodes
 */

export const removeChildNodes = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
};

/**
 * Function which takes in a name and returns the initials
 */
 export const getInitials = (name) => {
  const upperCaseName = name.toUpperCase();
  //split the name into first and last
  const splitName = upperCaseName.split(" ");
  if(splitName.length > 0){
    const firstName = splitName[0];
    const lastName = splitName[1];
     // check if both names are defined
     if(firstName.length > 0 && lastName.length > 0){
      return `${firstName[0]}${lastName[0]}`;
    }
  }

  return null;
}
