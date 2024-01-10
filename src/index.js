async function generateURL() {
    var inputURL = document.getElementById("url").value;
    
    const fetchResponse = await fetch("http://localhost:3000/generate", {
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
        const shortenedUrl = "swift-short-backend.onrender.com/" + responseData.short_url;
        document.getElementById('shortenedUrl').value = shortenedUrl;
        document.getElementById('shortenedUrl').style.display = 'block';
    } else {
        alert("HTTP-Error: " + fetchResponse.status);
    }

    console.log(inputURL);
}
