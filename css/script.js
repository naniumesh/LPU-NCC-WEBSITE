// 1st Division
let fontSize = 17; // Default font size in pixels

function increaseFontSize() {
    fontSize += 2;
    document.body.style.fontSize = fontSize + 'px';
}

function decreaseFontSize() {
    if (fontSize > 10) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
    }
}

function resetFontSize() {
    fontSize = 16;
    document.body.style.fontSize = fontSize + 'px';
}


// 2nd and 3rd Division
var navToggle = document.getElementById('nav-toggle');
var division3 = document.getElementById('division3');

navToggle.addEventListener('click', function () {
    division3.classList.toggle('active');
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 600) {
        division3.classList.remove('active');
    }
});


// 4th Division
// =========================================
// DYNAMIC NCC SLIDER
// =========================================

const slidesContainer =
    document.getElementById(
        "slidesContainer"
    );

let currentIndex = 0;

let totalSlides = 0;

let autoSlide;

// LOAD IMAGES FROM BACKEND

async function loadSliderImages(){

    try{

        const response =
            await fetch(
                "https://news-slider-tf3b.onrender.com/images"
            );

        const images =
            await response.json();

        slidesContainer.innerHTML = "";

        images.forEach(img => {

            slidesContainer.innerHTML += `

                <div class="slide">

                    <div
                        class="blur-bg"
                        style="
                            background-image:
                            url('${img.url}')
                        ">
                    </div>

                    <img
                        src="${img.url}"
                        alt="NCC News">

                </div>
            `;
        });

        totalSlides = images.length;

        startSlider();

    }catch(error){

        console.error(error);
    }
}

// UPDATE SLIDE

function updateCarousel(){

    slidesContainer.style.transform =

        `translateX(-${currentIndex * 100}%)`;
}

// NEXT

function nextSlide(){

    currentIndex++;

    if(currentIndex >= totalSlides){

        currentIndex = 0;
    }

    updateCarousel();
}

// PREV

function prevSlide(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
            totalSlides - 1;
    }

    updateCarousel();
}

// AUTO SLIDE

function startSlider(){

    autoSlide =
        setInterval(nextSlide, 6000);
}

// RESET TIMER

function resetAutoSlide(){

    clearInterval(autoSlide);

    autoSlide =
        setInterval(nextSlide, 6000);
}

// BUTTONS

document.querySelector(".next")
.addEventListener("click", () => {

    nextSlide();

    resetAutoSlide();
});

document.querySelector(".prev")
.addEventListener("click", () => {

    prevSlide();

    resetAutoSlide();
});

// START

loadSliderImages();



//5th devision
// =========================================
// OFFLINE NEWS SCROLL SYSTEM
// =========================================

const container =
document.getElementById(
    "newsContainer"
);

let sortedNews = [];

let newsIndex = 0;

const NEWS_CACHE_KEY =
"lpu_ncc_news_cache";

// LOAD NEWS

async function loadNews(){

    try{

        const response =
        await fetch(
            "https://main-lpu-ncc.onrender.com/api/news"
        );

        if(!response.ok){

            throw new Error(
                "SERVER ERROR"
            );
        }

        const newsItems =
        await response.json();

        // SAVE CACHE

        localStorage.setItem(

            NEWS_CACHE_KEY,

            JSON.stringify(newsItems)
        );

        console.log(
            "ONLINE NEWS LOADED"
        );

        prepareNews(newsItems);

    }catch(error){

        console.log(
            "OFFLINE NEWS MODE"
        );

        // LOAD FROM CACHE

        const cachedNews =
        localStorage.getItem(
            NEWS_CACHE_KEY
        );

        if(cachedNews){

            const parsedNews =
            JSON.parse(cachedNews);

            prepareNews(parsedNews);

        }else{

            container.innerHTML = `

                <div class="update">

                    <span>
                        NEWS SERVER IS CURRENTLY SLEEPING.
                        PLEASE TRY AGAIN AFTER FEW SECONDS.
                    </span>

                </div>

            `;
        }
    }
}

// PREPARE NEWS

function prepareNews(newsItems){

    const now =
    new Date();

    sortedNews =
    newsItems

    .sort((a,b)=>

        new Date(b.date) -
        new Date(a.date)
    )

    .map(news=>{

        const created =
        new Date(news.date);

        const diffDays =

        (now - created) /

        (1000 * 60 * 60 * 24);

        return{

            text:
            news.text,

            url:
            news.url,

            isNew:
            diffDays <= 14
        };
    });

    showNextNews();

    setInterval(
        showNextNews,
        12000
    );
}

// SHOW NEXT NEWS

function showNextNews(){

    if(!sortedNews.length)
        return;

    container.innerHTML = "";

    const news =
    sortedNews[newsIndex];

    const update =
    document.createElement("div");

    update.className =

        "update" +

        (news.isNew
            ? " new-update"
            : "");

    update.innerHTML = `

        <span>
            ${news.text}
        </span>

        <a
            class="read-more-button"
            href="${news.url}"
            target="_blank"
        >

            Click Here

        </a>

    `;

    container.appendChild(update);

    newsIndex =

    (newsIndex + 1)

    %

    sortedNews.length;
}

// START NEWS

loadNews();






// 9th Division
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('click', () => {
        window.location.href = box.dataset.link;
    });
});


// Contact Modal
function showContact() {
    let modal = document.getElementById("modalOverlay");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeContact(event) {
    let modal = document.getElementById("modalOverlay");
    if (event.target === modal || event.target.classList.contains("close-btn")) {
        modal.classList.remove("active");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}
