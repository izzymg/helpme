/** Shows the number of courses included in a program */
function showProgramCourseCount() {
    const courseCount = document.querySelectorAll(".prog-course-launch").length;
    document.querySelector("#view-program-content > h2").textContent += ` (${courseCount} courses)`;
}

/** Parses the document's body and returns back the course ID if found */
function getCourseIdFromBody() {
    for(const className of document.body.classList) {
        if(className.includes("course-")) {
            return parseInt(className.replace("course-", ""));
        }
    }
}

/** Adds a link to edit the completion of each student shown within an assessment submission */
function addCompletionEditorLink() {
    const courseID = getCourseIdFromBody();
    Array.from(document.querySelectorAll("tr")).forEach(row => {
        if(row.classList.length < 2) {
            return;
        }
        const userID = row.classList[0].replace("user", "");
        const link = document.createElement("a");
        link.href = 
            `https://careeracademy.online/totara/completioneditor/edit_course_completion.php?courseid=${courseID}&userid=${userID}`;
        link.textContent = "Completion editor";

        const td = document.createElement("td");
        td.appendChild(link);
        row.insertBefore(td, row.firstChild);
    });
}

try {
    if(document.body.id == "page-totara-program-view") {
        showProgramCourseCount();
    }
    if(document.body.id == "page-mod-assign-grading") {
        addCompletionEditorLink();
    }
} catch(e) {
    console.error(e);
}