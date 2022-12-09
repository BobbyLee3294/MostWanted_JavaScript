/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help

      let personFamily = findPersonFamily(person[0], people);
      alert(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story

      // let personDescendants = findPersonDescendants(person[0], people);
      // alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "test":
      // used to test out newly created functions
      let testResults = findPersonDescendants(person[0], people);
      alert(testResults);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `Date of Birth: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  personInfo += `ID #: ${person.id}`;
  alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * This function filters through the given array to find people based on the properties and values entered in by the user.
 * It can take a single property(trait) or multiple properties. It returns a new array with the person-objects matched from the property-value input.
 * @param {Array} people The given collection of person-objects
 * @return {Array}       A new collection of person-objects given based on the user's input
 */
function searchByTraits(people) {
  let userProperties = promptFor(
    " Please choose a trait(First Name, Last Name, Gender, Date of Birth, Height, Weight, Eye Color, Occupation, ID): ",
    chars
  );
  let userValues = promptFor(
    "Please enter value you are searching for: ",
    chars
  );
  let foundResults = people
    .filter(function (element) {
      if (element.userProperties) {
        if (element.userProperties.includes(userValues)) {
          return true;
        }
      }
    })
    .map(function (element) {
      return `${element.userProperties} ${element.userValues}`;
    });
  console.log(`${foundResults}`);
  // return foundResults;
}

/**
 * This function looks for the located person's children, if they have any.
 * It uses the helper function findChildren()
 * @param {Object} person An object that contains the located person's information
 * @param {Array} people The collection of person-objects
 * @param {Array} parentArray the collection of ids of the parents of the located person
 * @return {Array} The objects found from the helper function
 */
function findPersonDescendants(person, people, parentArray) {}

/**
 * helper function for findPersonDescendants() that recursively retrieves nested collection items and returns a new string
 * that contains the names of the children of the located person
 * @param {Object} person An object with nested properties
 * @param {Array} people   The collection of objects
 * @return {String}       A string value that contains the the names of the located person's children
 */
function findChildren(person, array = []) {
  let foundChildren = person.parents;
  array = [Object];
  if (person.parents === 0) {
    return array;
  }
  for (let i = 0; i < foundChildren.length; i++) {
    array = array.concat(findChildren(foundChildren[i]));
  }
  return array;
}
/**
 * Function used to find the located person's immediate family members and displays their names and their relation to the found person
 * It uses three helper functions for each group of relationship (parents, spouse, siblings)
 * @param {Object} person An object that contains the located person's properties and values
 * @param {Array} people The collection of person-objects
 * @returns {String}     The names of all relatives that were returned from the helper functions
 */
function findPersonFamily(person, people) {
  let results = "";
  if (person.currentSpouse != null) {
    let foundSpouse = findPersonSpouse(person, people);
    results += foundSpouse;
  }
  if (person.parents[0]) {
    let foundParents = findPersonParents(person, people);
    let foundSiblings = findPersonSibling(person, people, person.parents);
    results += foundParents;
    results += foundSiblings;
  }
  // console.log(`${results}`);
  return results;
}

/**
 * Helper function used in findPersonFamily used for finding the spouse of the located person
 * @param {Object} person An object containing the located person's information
 * @param {Array} people The collection of person-objects
 * @returns {String} The name of the located person's spouse in text form
 */
function findPersonSpouse(person, people) {
  let results = people.filter(function (element) {
    if (element.id == person.currentSpouse) {
      return true;
    } else {
      return false;
    }
  });
  let spouse = `Spouse: \n\t${results[0].firstName} ${results[0].lastName}\n`;
  return spouse;
}

/**
 *Helper function used in findPersonFamily used for finding the parents of the located person, if available
 * @param {Object} person An object containing the located person's information
 * @param {Array} people The collection of objects
 * @returns {String}     The name(s) of the located person's parent(s) in text form
 */
function findPersonParents(person, people) {
  let results = people.filter(function (element) {
    if (person.parents) {
      for (let i = 0; i < person.parents.length; i++) {
        if (person.parents[i] == element.id) {
          return true;
        }
      }
    }
  });
  let parents = `Parents: \n\t${results[0].firstName} ${results[0].lastName}\n`;
  if (results.length > 1) {
    parents += `\n\t${results[1].firstName} ${results[1].lastName}`;
  }
  return parents;
}

/**
 * Helper function used in findPersonFamily used for finding the siblings of the located person
 * @param {Object} person An object containing the located person's information
 * @param {Array} people The collection of person-objects
 * @param {element} parentArray The value from the located person's parents property
 * @returns {String} The names of the located person's siblings in text form
 */
function findPersonSibling(person, people, parentArray) {
  let results = people.filter(function (element) {
    for (let index = 0; index < parentArray.length; index++) {
      if (element.id == person.id) {
        return false;
      }
      if (element.parents[index] == person.parents[index]) {
        return true;
      }
    }
  });
  let siblings = `Siblings: \n\t${results[0].firstName} ${results[0].lastName}`;
  if (results.length > 1) {
    siblings += `\n\t${results[1].firstName} ${results[1].lastName}`;
  }
  return siblings;
}
