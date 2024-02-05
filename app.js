let Data = []; 

//Add Button Functionality
document.getElementById("addBtn").addEventListener("click", addString);
function addString() {
  var str = document.getElementById("string1").value;
  var reversedStr = reverseStr(str);
  var subStr = findLongestSubstring(str);
  var subStrLength = subStr.length;

  // Concatenation of substr and its length
  var subStrData = "(" + subStrLength + ", " + subStr + " " + " )";

  // Creating JSON record containing string, its reverse and substring from the string
  //and storing it in Data array.
  const newRecord = {
    String: str,
    Reversed: reversedStr,
    Substr: subStrData,
  };
  // Store the record at end of Data Array.
  Data.push(newRecord);

  // Show the Inserted String with Algorithms applied on it in a table when add button is clicked.

  var tBody = document.querySelector("tbody");
  var row = tBody.insertRow(tBody.length); // Getting length to insert record below the already inserted records.
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = str;
  cell2.innerHTML = reversedStr;
  cell3.innerHTML = subStrData;

  // clear add input field on add button click
  document.getElementById("string1").value = "";
}

// Search Button Functionality
document.getElementById("searchBtn").addEventListener("click", searchString);
function searchString() {
  // Clear Table body on search button click
  clearTable();
  var str = document.getElementById("string2").value;
  var str = str.toLowerCase();
  var searchedRecord; // To store the search record by user.

  // Iterate through whole data array for required record.
  for (let i = 0; i < Data.length; i++) {
    // check if entered string matched any record from data array
    if (str == Data[i].String.toLowerCase()) {
      // store the matched record
      searchedRecord = Data[i];
      // insert new row and then add cells to show the matched record in our table.
      var tBody = document.getElementById("tbody1");
      var row = tBody.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = Data[i].String;
      cell2.innerHTML = Data[i].Reversed;
      cell3.innerHTML = Data[i].Substr;
    }

    // check if entered sub-string matches any record from data array.
    else if (Data[i].String.toLowerCase().search(str) != -1) {
      // Store the matched record.
      searchedRecord = Data[i];
      // insert new row and then add cells to show the matched record on the screen.
      var tBody = document.getElementById("tbody1");
      var row = tBody.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = Data[i].String;
      cell2.innerHTML = Data[i].Reversed;
      cell3.innerHTML = Data[i].Substr;
    }
  }

  // clear search input field on  search button click
  document.getElementById("string2").value = "";
}

// Reverse String Function.
function reverseStr(tempStr) {
  const arr = tempStr.split(" ");
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
  let outputStr = arr.join(" ");
  return outputStr;
}

// Substr Function.

function findLongestSubstring(str) {
  var i;
  var n = str.length;
  // starting point of current substring.
  var st = 0;
  // length of current substring.
  var currlen;
  // maximum length substring without repeating
  // characters.
  var maxlen = 0;
  // starting index of maximum length substring.
  var start;
  // Hash Map to store last occurrence of each
  // already visited character.
  var pos = new Map();
  // Last occurrence of first character is index 0;
  pos.set(str[0], 0);

  for (var i = 1; i < n; i++) {
    // If this character is not present in hash,
    // then this is first occurrence of this
    // character, store this in hash.
    if (!pos.has(str[i])) pos.set(str[i], i);
    else {
      // If this character is present in hash then
      // this character has previous occurrence,
      // check if that occurrence is before or after
      // starting point of current substring.
      if (pos.get(str[i]) >= st) {
        // find length of current substring and
        // update maxlen and start accordingly.
        currlen = i - st;
        if (maxlen < currlen) {
          maxlen = currlen;
          start = st;
        }

        // Next substring will start after the last
        // occurrence of current character to avoid
        // its repetition.
        st = pos.get(str[i]) + 1;
      }

      // Update last occurrence of
      // current character.
      pos.set(str[i], i);
    }
  }

  // Compare length of last substring with maxlen and
  // update maxlen and start accordingly.
  if (maxlen < i - st) {
    maxlen = i - st;
    start = st;
  }

  // The required longest substring without
  // repeating characters is from str[start]
  // to str[start+maxlen-1].

  return str.substr(start, maxlen);
}

// Clear Table Body
function clearTable() {
  tableBody = document.getElementById("tbody1");
  tableBody.innerHTML = "";
}
