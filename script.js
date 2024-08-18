let currentSlide = 0;

// Function to move the slide based on the index
function moveSlide(n, sliderContainer) {
    const slides = sliderContainer.querySelectorAll('.slide');
    currentSlide += n;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    let slideWidth = slides[0].clientWidth;
    sliderContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
}

function hideAllSections() {
    // Hide all sections
    document.querySelector('.studentContent').style.display = 'none';
    document.querySelector('.timetable-content').style.display = 'none';
    document.querySelector('.attendance-content').style.display = 'none';
    
    document.querySelector('.coarse-content').style.display = 'none';
    document.querySelector('.fees-content').style.display = 'none';
    
}

function showTimetable() {
    hideAllSections(); // Hide all sections first
    document.querySelector('.timetable-content').style.display = 'block'; // Show timetable content
}

function showAttendance() {
    hideAllSections(); // Hide all sections first
    document.querySelector('.attendance-content').style.display = 'block'; // Show attendance content
    
}
function coarse() {
    hideAllSections(); // Hide all sections first
    document.querySelector('.coarse-content').style.display = 'block'; // Show attendance content
    
}
function fees() {
    hideAllSections(); // Hide all sections first
    document.querySelector('.fees-content').style.display = 'block'; // Show attendance content
    
}

function showProfile() {
    hideAllSections(); // Hide all sections first
    document.querySelector('.studentContent').style.display = 'block'; // Show profile content
    // window.location.href = "index.html";
}


function showDay(day) {
    // Hide all schedules
    document.querySelectorAll('.slider').forEach(slider => {
        slider.style.display = 'none';
    });
    document.getElementById('dayDisplay').textContent = day;

    // Show the selected day's schedule
    const selectedDay = document.querySelector(`.${day}`);
    if (selectedDay) {
        selectedDay.style.display = 'block';
    } else {
        console.error(`No element found with class: ${day}`);
    }

    // Reset the current slide index to 0 when switching days
    currentSlide = 0;
    const sliderContainer = selectedDay?.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.style.transform = `translateX(0)`;
        // Initialize the slider for the new day
        initializeSlider(sliderContainer);
    }
}


function initializeSlider(sliderContainer) {
    sliderContainer.addEventListener('touchstart', handleTouchStart, false);
    sliderContainer.addEventListener('touchmove', handleTouchMove, false);
}

let xDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
    if (!xDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const xDiff = xDown - xUp;

    const sliderContainer = evt.currentTarget;

    if (xDiff > 0) {
        // Swipe left
        currentSlide = Math.min(currentSlide + 1, sliderContainer.children.length - 1);
    } else {
        // Swipe right
        currentSlide = Math.max(currentSlide - 1, 0);
    }

    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    xDown = null; // Reset the touch start position
}
var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      
    },
  });

//   ============= Attendance ==================

function updateCircularProgress(subjectId, percentage) {
    const circle = document.getElementById(subjectId + 'Circle');
    const percentageSpan = document.getElementById(subjectId + 'Percentage');
    
    // Calculate the stroke-dasharray value based on the percentage
    const radius = 15.9155; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    circle.style.strokeDasharray = `${circumference}, ${circumference}`;
    circle.style.strokeDashoffset = offset;
    
    // Update the percentage display
    percentageSpan.textContent = percentage + '%';
}

function toggleDetails(detailsId) {
    const details = document.getElementById(detailsId);
    const subject = details.parentElement;

    // Toggle the visibility of the details section
    if (subject.classList.contains('active')) {
        subject.classList.remove('active');
    } else {
        // Hide all other details sections
        document.querySelectorAll('.subject').forEach(sub => sub.classList.remove('active'));
        subject.classList.add('active');
    }
}

// Example: Setting up attendance percentages
// updateCircularProgress('overall', 75);  // Set overall attendance
updateCircularProgress('dbms_theory', 91); // Set Subject 1 attendance
updateCircularProgress('dbms_lab', 88); // Set Subject 8 attendance
updateCircularProgress('os_theory', 85); // Set Subject 8 attendance
updateCircularProgress('os_lab', 95); // Set Subject 8 attendance
updateCircularProgress('opps_theory', 86);
updateCircularProgress('opps_lab', 88);
updateCircularProgress('soft-skill', 97);
updateCircularProgress('apptitude', 90);
updateCircularProgress('dm', 90);
// Repeat for each subject...



// end of attendace