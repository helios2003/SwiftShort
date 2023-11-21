async function generateURL() {
    var inputURL = document.getElementById("url").value;
    
    const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: JSON.stringify({
            url: inputURL
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const responseData = await response.json();

        document.getElementById('shortenedUrl').value = responseData.short_url;
        document.getElementById('shortenedUrl').style.display = 'block';
    } else {
        alert("HTTP-Error: " + response.status);
    }

    console.log(inputURL);
}
