let works = [];

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
        </div>
      </div>
      <p class="desc">
        ${description}
      </p>
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

function generateMoreProjects(data) {
  let container = $(".works__gallery__container");
  let galleries = "";
  data.forEach((w, i) => {
    galleries += ` <div class="work__gallery" onclick="onChangProject('${i}')">
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

function onChangProject(changedIndex) {
  $(".works").empty();
  $(".works__gallery__container").empty();
  let remainingProjects = [];
  works.filter((work, i) => {
    if (i !== Number(changedIndex) + 1) {
      remainingProjects.push(work);
    }
  });
  console.log(remainingProjects);
  generateProject(works[Number(changedIndex) + 1]);
  generateMoreProjects(remainingProjects);
  $(window).scrollTop(0);
}

function createWorks() {
  fetch("assets/works.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      works = json;
      let presentIndex = 0;
      let remainingProjects = json.slice(presentIndex + 1);
      generateProject(json[0]);
      generateMoreProjects(remainingProjects);
    });
}

createWorks();
