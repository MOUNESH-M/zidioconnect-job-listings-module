const params = new URLSearchParams(window.location.search);
const jobId = params.get('id');

fetch(`http://localhost:8080/api/jobs/${jobId}`)
  .then(response => response.json())
  .then(data => {
//     let data = {
//         title: "Frontend Developer Intern",
//         company: "ZIDIO Connect",
//         location: "Remote",
//         salary: "₹8,000/month",
//         description: "Work on real-world interfaces using HTML, CSS, and JS.",
//         skills: "HTML, CSS, JavaScript"
// };
    document.getElementById('job-title').innerText = data.title;
    document.getElementById('company-name').innerText = data.company;
    document.getElementById('job-location').innerText = data.location;
    document.getElementById('job-salary').innerText = data.salary;
    document.getElementById('job-description').innerText = data.description;
    document.getElementById('job-skills').innerText = data.skills;
  })
  .catch(error => {
    console.error("Error fetching job:", error);
  });


/*   
    open your page in browser: 
    job-detail.html?id=1
*/
