async function generateURL() {
    var inputURL = document.getElementById("url").value;
    
    const fetchResponse = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: JSON.stringify({
            url: inputURL
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (fetchResponse.ok) {
        let responseData = await fetchResponse.json();
        const shortenedUrl = "localhost:5000/" + responseData.short_url;
        document.getElementById('shortenedUrl').value = shortenedUrl;
        document.getElementById('shortenedUrl').style.display = 'block';
    } else {
        alert("HTTP-Error: " + fetchResponse.status);
    }

    console.log(inputURL);
}
