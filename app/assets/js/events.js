/*  processFile
 *  Display processing message
 *
 *  @param el - Form object
 *  @param string - form action
*/
function processFile(el, action) {
    // get file value from input field
    var value = el[0].value,
        split = el[0].value.split(".");

    // if file appears to be valid
    if (value !== "" && split[split.length - 1] === "csv") {
          if (action == "submit") {
                // display processing message
                document.getElementById("submit").style.display = "none";
                document.getElementById("file").style.opacity = ".5";
                document.getElementById("processing").innerHTML = "[ processing... ]";
          }
          else {
                // clear error message
                document.getElementById("processing").innerHTML = "";
          }
    }
    else {
          // return error message
          document.getElementById("processing").innerHTML = "Invalid file type. Please select a <code>.csv</code> file.";
    }
}
