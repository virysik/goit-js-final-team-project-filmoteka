
const scrollToTopBtn = document.querySelector(".scrollToTopBtn"); 
const paginationRef = document.querySelector('.pagination__list')

const observer = new IntersectionObserver(callback, options)

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const options = {
    rootMargin: '40%',
    threshold: 0.5
}


let callback = function(entries){
    entries.forEach(entry => {

 if(entry.isIntersecting)
       {
     scrollToTopBtn.classList.remove('is-hidden')

 }
 else {
      scrollToTopBtn.classList.add('is-hidden')
  }      
    })
}




observer.observe(paginationRef)