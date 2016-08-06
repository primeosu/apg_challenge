/*  processFile
 *  Initial processing of file for data validation
 *
 *  @param el - Form object
*/
function processFile(el) {
    // get file value from input field
    var value = el[0].value,
        split = el[0].value.split(".");

    // if file appears to be valid
    if (value !== "" && split[split.length - 1] === "txt") {
        // display processing message
        document.getElementById("submit").style.display = "none";
        document.getElementById("file").style.opacity = ".5";
        document.getElementById("processing").innerHTML = "[ processing... ]";
    }
    else {
        // return error message
        document.getElementById("processing").innerHTML = "Invalid file type. Please select a <code>.txt</code> file.";
    }
}
