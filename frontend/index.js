function generateURL() {
    var inputURL = document.getElementById("url").value;
    var outputURL = document.getElementById("shortenedUrl");
    
    fetch("placeholder", {
        method: "POST",
        body: JSON.stringify({
            url: inputURL
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        outputURL.value = data.shortenedUrl;
    })
    .catch(error => console.error("Error:", error));

    console.log(inputURL);
}
