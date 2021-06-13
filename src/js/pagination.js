import ApiServiceMarkup from './Api/ApiServiceMarkUp';
const apiData = new ApiServiceMarkup();

//-------Переменные иммитируют загрузку страниц с фильмами
//l = console.log;
//const MAX_PAGE = 5;
//const totalPage = Math.round(Math.random() * MAX_PAGE);
//let activePage = 1 + Math.round(Math.random() * (totalPage - 1));
//const listPagesEl = document.querySelector('.pagination__list');
//--------


function createMarkup(totalPage, page) {
    let markup = '';
    let beforePages = page - 2;
    let afterPages = page + 2;
    
    if (page > 1) {
        markup += `<li class="pagination__item first">
            <a class="pagination__link" id="left">-
            <!--<svg class="number-pages__svg" width="16" height="16">
                <use href="./img/sprite.svg#icon-arrow-left"></use>
              </svg>-->
            </a>
          </li>`;
    }
    
    if (page > 3 & totalPage > 5) {
        markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link">1</a>
            </li>`;
        if (page > 4 & totalPage > 6) {
                    markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link dots-hover">...</a>
            </li>`;
        }
    }
    
    if (page === totalPage) {
        beforePages = beforePages - 2;
        afterPages = afterPages - 2;
    } else if (page === totalPage - 1) {
        beforePages = beforePages - 1;
        afterPages = afterPages - 1;
    }

    if (page === 1) {
        afterPages = afterPages + 2;
        beforePages = beforePages + 2;
    } else if (page === 2) {
        afterPages = afterPages + 1;
        beforePages = beforePages + 1;
    }

    for (let pageGroup = beforePages; pageGroup <= afterPages; pageGroup++) {
        let active = '';
        if (pageGroup > totalPage || pageGroup <= 0) {
            continue;
        }
        if (pageGroup === page) {
            active = 'active';
        }
        markup += `<li class="pagination__item">
                <a href="" class="pagination__link ${active}">${pageGroup}</a>
            </li>`;
    }

    if (page < totalPage - 2 & totalPage > 5) {
        if (page < totalPage - 3 & totalPage > 6) {
            markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link dots-hover">...</a>
            </li>`;
        }
        markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link">${totalPage}</a>
            </li>`;
    }
    
    if (page < totalPage) {
        markup += `<li class="pagination__item last">
            <a class="pagination__link" id="right">+
            <!--<svg class="number-pages__svg" width="16" height="16">
                <use href="./img/sprite.svg#icon-arrow-right"></use>
              </svg>-->
              </a>
          </li>`;
    }

    return markup;
}

export function pagination(totalPage, activePage = 1, listPagesEl = document.querySelector('.pagination__list')) {
    if (totalPage <= 1) {
        return;
    };
    
    function renderMarkupPage(totalPage, activePage, listPagesEl) {
        listPagesEl.innerHTML = createMarkup(totalPage, activePage);
    }

    renderMarkupPage(totalPage, activePage, listPagesEl);
    listPagesEl.addEventListener('click', onClick);

    function onClick(e) {
          
    e.preventDefault()

    if (e.target.tagName === 'UL') return;
    
    if (e.target.textContent === '...') return;

    if (e.target.id === 'left') {
        renderMarkupPage(totalPage, --activePage, listPagesEl);
        showNumberCurrentPage(activePage);
        return;
    }

    if (e.target.id === 'right') {
        renderMarkupPage(totalPage, ++activePage, listPagesEl);
        showNumberCurrentPage(activePage);
        return;
    }

    activePage = +e.target.textContent;
    
        renderMarkupPage(totalPage, activePage, listPagesEl);

        showNumberCurrentPage(activePage);
    }

}

//pagination(totalPage, activePage);

export function showNumberCurrentPage(activePage = 1) {
    apiData._page = activePage;
    apiData.getMarkUp();
}
