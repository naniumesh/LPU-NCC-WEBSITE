// JavaScript code for dynamic functionality

// Font size functionality
let fontSize = 16; // Initial font size in pixels

// Increase font size
document.getElementById('increase-font').addEventListener('click', function() {
    fontSize += 2; // Increase font size by 2 pixels
    document.body.style.fontSize = fontSize + 'px';
});

// Decrease font size
document.getElementById('decrease-font').addEventListener('click', function() {
    if (fontSize > 10) { // Ensure font size doesn't go below 10 pixels
        fontSize -= 2; // Decrease font size by 2 pixels
        document.body.style.fontSize = fontSize + 'px';
    }
});

// Reset font size to default
document.getElementById('reset-font').addEventListener('click', function() {
    fontSize = 16; // Reset font size to default (16 pixels)
    document.body.style.fontSize = '16px';
});





// 2nd and 3rd Division
 // Get the hamburger icon
 var navToggle = document.getElementById('nav-toggle');

 // Get the third division
 var division3 = document.getElementById('division3');

 // Add click event listener to the hamburger icon
 navToggle.addEventListener('click', function() {
     // Toggle the visibility of the third division
     division3.classList.toggle('active');
 });

 // Add resize event listener to the window object
 window.addEventListener('resize', function() {
     // If the viewport width is more than 600px
     if (window.innerWidth > 600) {
         // Remove the active class from the third division
         division3.classList.remove('active');
     }
 });


function displayPersonDetails(person) {
    document.getElementById('personName').innerText = person.name;
    document.getElementById('personBatch').innerText = person.batch;
    document.getElementById('personRank').innerText = person.rank;
    document.getElementById('personImage').src = person.image;
    document.getElementById('personList').style.display = 'none';
    document.getElementById('personDetail').style.display = 'flex'; /* Make the details view visible */
    document.getElementById('personDetail').classList.add('fadeIn');
}

function backToList() {
    document.getElementById('personList').style.display = 'block';
    document.getElementById('personDetail').style.display = 'none'; /* Hide the details view */
    loadPeople();
}


 //Contact Modal
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

const params =
new URLSearchParams(window.location.search);

const rawClass =
params.get("class");

let className = "";

if(rawClass === "REPUBLIC DAY CAMP"){

    className = "1A";
}

else if(rawClass === "TSC, VSC, NSC"){

    className = "1B";
}

else if(rawClass === "IMA ATTACHMENT CAMP"){

    className = "1C";
}

else if(rawClass === "YOUTH EXCHANGE PROGRAM"){

    className = "1D";
}

else if(rawClass === "RARE CAMPS"){

    className = "SPECIAL";
}

document.getElementById(
    "heading"
).innerText =
" ACHIVEMENTS IN " + rawClass ;

document.getElementById(
    "path"
).innerText =
"Path: Classes > " + rawClass;

async function loadStudents(){

    try{

        const res = await fetch(
            "https://camp-img-server.onrender.com/students"
        );

        const data = await res.json();

        localStorage.setItem(
            "studentsData",
            JSON.stringify(data)
        );

        displayStudents(data);

    }catch{

        const offlineData =
        localStorage.getItem(
            "studentsData"
        );

        if(offlineData){

            const data =
            JSON.parse(offlineData);

            displayStudents(data);
        }
    }
}

function displayStudents(data){

    const students =
    data[className];

    const container =
    document.getElementById(
        "personCards"
    );

    container.innerHTML = "";

    students.forEach(student=>{

        const card =
        document.createElement("div");

        card.className =
        "col-12 col-sm-6 col-md-4 col-lg-2 mb-4 person-card shadow fadeIn";

        let extraField = "";

if(className === "1D"){

    extraField = `

        <p>
            Place:
            ${student.place || ""}
        </p>

    `;
}

if(className === "SPECIAL"){

    extraField = `

        <p>
            Camp:
            ${student.camp || ""}
        </p>

    `;
}

card.innerHTML = `

    <img
    src="${student.image}"
    class="img-fluid">

    <h3>${student.name}</h3>

    <p>
        Batch:
        ${student.batch}
    </p>

    <p>
        Rank:
        ${student.rank}
    </p>

    ${extraField}

`;

        card.onclick = ()=>{

            displayPersonDetails(student);
        };

        container.appendChild(card);

    });

}

function displayPersonDetails(student){

    document.getElementById(
        "personName"
    ).innerText =
    student.name;

    document.getElementById(
        "personBatch"
    ).innerText =
    student.batch;

    document.getElementById(
        "personRank"
    ).innerText =
    student.rank;

    document.getElementById(
        "personImage"
    ).src =
    student.image;

    let extra = "";

    if(className === "1D"){

        extra =
        "Place: " + student.place;
    }

    if(className === "SPECIAL"){

        extra =
        "Camp: " + student.camp;
    }

    document.getElementById(
        "extraField"
    ).innerText =
    extra;

    const personList =
    document.getElementById("personList");

    const personDetail =
    document.getElementById("personDetail");

    /* HIDE LIST */
    personList.classList.add("hide");

    setTimeout(()=>{

        personList.style.display = "none";

        /* SHOW DETAIL */

        personDetail.style.display = "flex";

        setTimeout(()=>{

            personDetail.classList.add("active");

        },50);

    },400);
}

function backToList(){

    const personList =
    document.getElementById(
        "personList"
    );

    const personDetail =
    document.getElementById(
        "personDetail"
    );

    /* HIDE DETAIL */

    personDetail.classList.remove(
        "active"
    );

    setTimeout(()=>{

        personDetail.style.display =
        "none";

        /* SHOW LIST */

        personList.style.display =
        "block";

        setTimeout(()=>{

            personList.classList.remove(
                "hide"
            );

        },50);

    },400);
}

loadStudents();