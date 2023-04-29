document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");

  if (error) {
    let message = "";

    if (error === "user") {
      message = "Invalid login credentials";
    } else if (error === "password") {
      message = "Invalid login credentials";
    }

    const alert = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    document.getElementById("alert-placeholder").innerHTML = alert;

    // Remove the query parameters from the URL
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }
});
