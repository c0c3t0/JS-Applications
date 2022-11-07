import { htmlGenerator } from "./dom.js";

const homePageSection = document.querySelectorAll('.view-section')[0];
const div = homePageSection.querySelector('#movie div div');

export async function getAllMovies() {

    // try {
        const response = await fetch('http://localhost:3030/data/movies')
        const data = await response.json();

        if (!response.ok) {
            throw new Error(response.message);
        }

        Object.values(data)
            .forEach(info => {
                // ===> https://softuni.bg/trainings/3012/js-applications-october-2020#lesson-16745 <===
                //     <div class="card mb-4">
                //         <img class="card-img-top" src="https://pbs.twimg.com/media/ETINgKwWAAAyA4r.jpg" alt="Card image cap" width="400">
                //         <div class="card-body">
                //             <h4 class="card-title">Wonder Woman 1984</h4>
                //         </div>
                //         <div class="card-footer">
                //             <a href="#/details/6lOxMFSMkML09wux6sAF">
                            // <button type="button" class="btn btn-info">Details</button></a>
                //         </div>
        
                //     </div>

                const divCard = htmlGenerator('div', '', 'card mb-4', div);

                const imgElement = htmlGenerator('img', '', 'card-img-top', divCard);
                imgElement.setAttribute('src', info.img);
                imgElement.alt = 'Card image cap';
                imgElement.width = '400';

                const divCardBody = htmlGenerator('div', '', 'card-body', divCard);
                htmlGenerator('h4', info.title, 'card-title', divCardBody);

                const divCardFooter = htmlGenerator('div', '', 'card-footer', divCard);
                const anchorElement = htmlGenerator('a', '', '', divCardFooter);
                anchorElement.setAttribute('href', '#');

                const detailsBtn = htmlGenerator('button', 'Details', 'btn btn-info', divCardFooter);
                detailsBtn.type = 'button';
                detailsBtn.setAttribute('data-id', info._id);

                // detailsBtn.addEventListener('click', showDetails); // Click on a movie
            });

        if (!response.ok) {
            throw new Error(response.message);
        }

    // } catch (error) {
    //     alert(error.message);
    // }
    
}