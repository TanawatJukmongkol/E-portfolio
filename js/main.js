let loading_screen = document.getElementById("loading-screen");
let nav_menu_btn = document.getElementById("nav-menu-btn");
let nav_lst = document.getElementById("nav-menu-lst");
let main_content_container = document.getElementsByClassName("main-content-container")[0];
let progress_bar = document.getElementById("progress-bar");
let zoom_icons = document.getElementsByClassName("zoom-icon");
let theme_toggle = document.getElementById("theme-toggle");
let theme_css = document.getElementById("theme-css");

// Menu handeling

nav_menu_btn.addEventListener("click", function() {
	let nav_style = window.getComputedStyle(nav_lst);
	if (nav_style.display == "none")
		nav_lst.style.display = "block";
	else
		nav_lst.style.display = "none";
});

nav_lst.addEventListener("mouseleave", function () {
	nav_lst.style.display = "none";
})

nav_lst.childNodes.forEach(function(el) {
	el.addEventListener("click", function () {
		nav_lst.style.display = "none";
	})
})

function set_theme (name) {
	if (name == "light")
		theme_toggle.children[0].innerHTML = "滛";
	else if (name == "dark")
		theme_toggle.children[0].innerHTML = "";
	else
		return;
	theme_css.href = `./css/theme/${name}.css`;
}

if (localStorage.getItem("theme") == "light")
	set_theme("light");

theme_toggle.addEventListener("click", function () {
	if (localStorage.getItem("theme") != "light")
	{
		localStorage.setItem("theme", "light");
		set_theme("light");
		return;
	}
	localStorage.setItem('theme', 'dark');
	set_theme("dark");
});


window.addEventListener("load", function() {
	loading_screen.style.opacity = 0;
	this.setTimeout(function() {loading_screen.remove();}, 250);
	progress_bar.style = `
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 2.5px;
		background: var(--txt-color1);
		opacity: 0.42;
		z-index: 1000;
	`;
	function scroll_progress_update () {
		let scroll = main_content_container.scrollTop;
		var height = main_content_container.scrollHeight - main_content_container.clientHeight;
		var scrolled = (scroll / height) * 100;
		progress_bar.style.width = scrolled + "%";
	}

	main_content_container.addEventListener("scroll", scroll_progress_update);
	scroll_progress_update();

	for (let i = 0; i < zoom_icons.length; i++) {
		zoom_icons[i].addEventListener("click", function() {
			let figure = zoom_icons[i].parentElement.parentElement;
			let gallery = figure.parentElement;
			let image = figure.getElementsByTagName("img")[0]
			let description = figure.getElementsByTagName("p")[0];
			if (gallery.classList.contains("zoomed"))
			{
				let overlay = document.getElementById("gallery-overlay");
				overlay.remove();
				gallery.classList.remove("zoomed");
				figure.style = `
					position: grid;
					top: unset;
					left: unset;
					width: unset;
					max-width: unset;
					z-index: unset;
					transform: unset;
				`;	
				description.style.display = "unset";
				zoom_icons[i].innerHTML = "";
				return ;
			}
			if (window.innerWidth < 800) {
				window.location = image.src;
				return ;
			}
			let overlay = document.createElement("div");
			overlay.id = "gallery-overlay";
			gallery.classList.add("zoomed");
			figure.style = `
				position: fixed;
				top: 50%;
				left: 50%;
				width: 96vw;
				max-width: max-content;
				z-index: 1000 !important;
				transform: translate(-50%, -50%);
			`;
			overlay.style = `
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: var(--bkg-color3);
			`;
			gallery.append(overlay);
			description.style.display = "none";
			zoom_icons[i].innerHTML = "";
		});
	}
});