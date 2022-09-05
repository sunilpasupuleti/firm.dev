let works = [];

let remainingWorks = [];

function generateProject(data) {
  let container = $(".works");
  let { title, heading, images, description, links } = data;
  let anchorTags = "";
  let swipers = "";
  images.forEach((image) => {
    swipers += `<div class="swiper-slide">
          <div class="image">
            <img
              src="${image}"
              alt="image"
            />
          </div>
        </div>`;
  });
  links.forEach((link) => {
    anchorTags += `<a href="${link.hyperlink}" target="_blank">${link.display}</a>`;
  });

  let content = `
    <div class="work">
      <h2 class="section__title">${heading}</h2>
      <div class="work_header">
        <div class="swiper mySwiper" >
          <div class="swiper-wrapper">
              ${swipers}
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
        </div>

        <div class="titles">
          <h2>Title : <span>${title}</span></h2>
          <br />
          <div class="links">
           
             ${
               anchorTags
                 ? `
             <h2>Links :</h2>
             <div class="hyperlinks">
                  ${anchorTags}
             </div>
             `
                 : ""
             }
          </div>
          <p class="desc">
          ${description}
          </p>
        </div>
      </div>
    
    </div>
    `;

  container.append(content);

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

function generateMoreProjects() {
  let container = $(".works__gallery__container");
  let galleries = "";
  remainingWorks.forEach((w, i) => {
    galleries += ` <div class="work__gallery" onclick="onChangProject('${w.id}')">
      <div class="hover__content">
        <h1>${w.title}</h1>
      </div>
      <img
        src="${w.images[0]}"
        alt="image"
      />
    </div>`;
  });

  let content = `
    
    <div class="works__gallery">
            ${galleries}
  
  </div>
    `;

  container.append(content);
}

function onChangProject(changedId) {
  $(".works").empty();
  $(".works__gallery__container").empty();
  remainingWorks = [];
  works.filter((work, i) => {
    if (work.id !== changedId) {
      remainingWorks.push(work);
    }
  });

  let work = works.filter((work) => work.id === changedId)[0];
  generateProject(work);
  generateMoreProjects();
  $(window).scrollTop(0);
}

function createWorks() {
  fetch("assets/works.json")
    .then((response) => response.json())
    .then((json) => {
      works = json;
      let presentIndex = 0;
      remainingWorks = json.slice(presentIndex + 1);
      generateProject(json[0]);
      generateMoreProjects();
    });
}

createWorks();
