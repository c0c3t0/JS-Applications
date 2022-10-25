const validYears = ['2020', '2021', '2022', '2023'];
const validMonths = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
};

const years = document.querySelector('#years');
const months = [...document.querySelectorAll('.monthCalendar')].reduce((acc, section) => {
    acc[section.id] = section;
    return acc;
}, {});

const days = [...document.querySelectorAll('.daysCalendar')];

window.addEventListener('load', () => {
    document.body.replaceChildren();
    document.body.appendChild(years);
});

function showDaysOfMonth(daysOfMonth) {
    document.body.replaceChildren();
    document.body.appendChild(daysOfMonth);
}

function showMonthsOfYear(year) {
    document.body.replaceChildren();
    document.body.appendChild(months[`year-${year}`]);
}

document.addEventListener('click', showCalendar);


function showCalendar(e) {
    let current;

    if (e.target.tagName === 'TD') {
        current = e.target.children[0].textContent.trim();
    }
    else if (e.target.tagName === 'DIV') {
        current = e.target.textContent.trim();
    }
    else if (e.target.tagName === 'CAPTION') {
        const captionText = e.target.textContent;

        if (validYears.includes(e.target.textContent)) {
            document.body.replaceChildren();
            document.body.appendChild(years);
        }
        else if (validMonths.hasOwnProperty(captionText.slice(0, 3))) {
            const currentYear = document.querySelector('caption').textContent.slice(-4);
            showMonthsOfYear(currentYear);
        }
    }

    if (validYears.includes(current)) {
        showMonthsOfYear(current);
    }
    else if (validMonths.hasOwnProperty(current)) {
        const currentYear = document.querySelector('caption').textContent;
        const daysOfMonth = days.find(x => x.id === `month-${currentYear}-${validMonths[current]}`);
        showDaysOfMonth(daysOfMonth);
    }
}

