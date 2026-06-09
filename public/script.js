async function searchStudent() {

    const keyword =
        document.getElementById("searchInput").value.toLowerCase();

    const response =
        await fetch("http://localhost:3000/students");

    const data =
        await response.json();

    const filtered =
        data.filter(student =>
            student.name.toLowerCase().includes(keyword)
        );

    let html = "";

    filtered.forEach(student => {

        html += `
            <p>
                ${student.name}
                -
                ${student.course}
            </p>
        `;

    });

    document.getElementById("results").innerHTML = html;

}