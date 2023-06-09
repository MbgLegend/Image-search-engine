const generate_btn = document.getElementById("generateButton")
const search_keyword = document.getElementById("searchKeyword")
const search_result = document.querySelector(".search-result")
const show_more = document.getElementById("show_more")
const error_message = document.getElementById("errorMessage")
// Use unplash API documention to get your ID
const client_id = "3JrAt7BUuO3xB-zD6neY9HsBdoBaKtsnl7wmTBt8JhA"
let keyword
let page = 1

// Picture generating function
async function generateImage(searchInput) {
    // Showing show more button after generating images
    show_more.style.display = "inline-block"
    // Checking if the user is generating more images or showing more images
    if (page === 1) {
        search_result.innerHTML = ""
    }
    // API url
    const api_url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput}&client_id=${client_id}&per_page=12`
    // Getting API response
    const response = await fetch(api_url); // Include credentials for cross-site requests
    // Formating API response to json format
    const data = await response.json()
    // Getting API response result
    const result = data.results
    // Looping through the results
    result.forEach((result) => {
        // Creating image element for each image
        const img = document.createElement("img")
        // Adding image source to each image
        img.setAttribute("src", result.urls.small)
        // Creating a link for each image
        const link = document.createElement("a")
        // Adding a link to each image
        link.setAttribute("href", result.links.html)
        // Showing the link into diffrent tab
        link.setAttribute("target", "_blank")
        // Adding link to the image
        link.appendChild(img)
        // Adding the images to the site
        search_result.appendChild(link)
    })
}

// Generate button onclick function
generate_btn.addEventListener("click", (event) => {
    // Getting the user's input
    keyword = search_keyword.value
    // Page number reset
    page = 1
    // Checking if user added an input
    if (keyword === "") {
        // Displaying error message
        error_message.style.display = "block"
    } else {
        // Generating images
        error_message.style.display = "none"
        generateImage(keyword)
    }
})

show_more.addEventListener("click", () => {
    // Adding more pages
    page++
    // Generating more images
    generateImage(keyword)
})