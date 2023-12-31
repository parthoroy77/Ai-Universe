const fetchData = async (showAll) => {
  spinnerFunction(true);
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
    {
        publishedDate = data.data.tools;
        showAiData(data.data.tools, showAll)
    };
};

let publishedDate = [];



const showAiData = (data, showAll) => {
  const aiContainer = document.getElementById("ai-container");
  aiContainer.innerHTML = ``;
  const showMoreBtn = document.getElementById("see-more-btn");
  if (data.length >= 6 && showAll !== "show-all") {
    data = data.slice(0, 6);
    showMoreBtn.classList.remove("d-none");
  } else {
    showMoreBtn.classList.add("d-none");
  }
  data.forEach((singleData) => {
    const { id, name, features, image, published_in } = singleData;
    const aiDiv = document.createElement("div");
    aiDiv.classList.add("col");
    aiDiv.innerHTML = `
            <div class="card h-100">
                    <div class="p-3">
                        <img src="${image}" class="card-img-top rounded-3" alt="...">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5>Feature</h5>
                            <ol>
                                ${addFeature(features)}
                            </ol>
                            
                        </div>
                        <div class="card-footer bg-white d-flex justify-content-between align-items-center"  >
                            <div>
                                <h3 class="card-title fw-bold">${name}</h3>
                                <div class="d-flex gap-2">
                                    <p><img src="./images/calendar.png" alt=""></p>
                                    <p class="p-0 m-0">${published_in}</p>
                                </div>
                            </div>
                            <div>
                                <button class="border-0 rounded-circle modal-btn" data-bs-toggle="modal" data-bs-target="#aiDetailsModal" onclick="loadAiDetails('${id}')">
                                <img src="./images/arrow-right.png" style="width: 50px; height: 50px;" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        `;
    aiContainer.appendChild(aiDiv);
    spinnerFunction(false);
  });
};

// Spinner function

const spinnerFunction = (isLoading) => {
  const spinnerSection = document.getElementById("spinner");
  if (isLoading) {
    spinnerSection.classList.remove("d-none");
  } else {
    spinnerSection.classList.add("d-none");
  }
};

// See more btn click handler
document.getElementById("see-more-btn").addEventListener("click", function () {
  spinnerFunction(true);
    fetchData("show-all");
});


// Feature function
const addFeature = (features) => {
  let olHtml = ``;
  for (let i = 0; i < features.length; i++) {
    olHtml += `
            <li>${features[i]}</li>
        `;
  }
  return olHtml;
};

// modal opening data to show
const loadAiDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAiDetails(data.data));
};


const showAiDetails = (data) => {
  console.log(data);
  const {
    description,
    image_link,
    integrations,
    pricing,
    input_output_examples,
      accuracy,
    features
    } = data;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("row", "row-cols-1", "row-cols-md-2", "g-4");
  itemDiv.innerHTML = `
            <div class="col">
                    <div class="card h-100">
                        <div class="card-body" style="background: rgba(235, 87, 87, 0.05);">
                            <h4 class="card-title fw-bold mb-4">${description}</h4>
                            <div class="row row-cols-1 row-cols-md-3 gap-3 px-3 my-2">
                                <div class="item">
                                    <h5 style="color: yellowgreen;">
                                        ${
                                        pricing ? pricing[0].plan : "Basic"
                                        } / ${
                                            pricing ? pricing[0].price : "Free of cost"
                                        }
                                    </h5>
                                </div>
                                <div class="item">
                                    <h5 style="color: orange;">
                                        ${
                                        pricing ? pricing[1].plan : "Pro"
                                        } / ${
                                            pricing ? pricing[1].price : "Free of cost"
                                        }
                                    </h5>
                                </div>
                                <div class="item">
                                    <h5 style="color: lightcoral;">
                                        ${
                                        pricing
                                            ? pricing[2].plan
                                            : "Enterprise"
                                        } / ${
                                            pricing ? pricing[2].price : "Free of cost"
                                        }
                                    </h5>
                                </div>
                            </div>
                            <div class="row row-cols-1 row-cols-md-2 mt-4" style="text-align: left">
                                    <div>
                                        <h5>Feature</h5>
                                        <ul>
                                            ${modalFeature(features)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h5>Integration</h5>
                                        <ul>
                                            ${modalIntegration(integrations)}
                                        </ul>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                       <div class="p-3 position-relative">
                            <img src="${
                              image_link[0]
                            }" alt="..." class="card-img-top rounded-3">
                            <div class="position-absolute top-0 end-0">
                                <button class="btn btn-danger ${accuracy.score ? 'd-block' : 'd-none'}">
                                    ${Math.floor(accuracy.score * 100)}% accuracy
                                </button>
                            </div>
                       </div>
                        <div class="card-body text-center">
                            <h4 class="card-title fw-bold">${
                              input_output_examples
                                ? input_output_examples[0].input
                                : "Not Yet Updated!!"
                            }</h4>
                            <p class="card-text mb-3">
                                ${
                                  input_output_examples
                                    ? input_output_examples[0].output
                                    : "No! Not Yet! Take a break!!!"
                                }
                            </p>
                        </div>
                    </div>
            </div>
    `;
  modalContainer.appendChild(itemDiv);
};

const modalFeature = (features) => {
    if (features === null) {
        return "No Data Found";
    }
    let featureUl = ``;
    for (const feature in features) {
        featureUl += `
            <li>${features[feature].feature_name}</li>
        `;
    }
    return featureUl
}



const modalIntegration = (integrations) => {
    if (integrations === null) {
        return "No Data Found"
    }
    let integrationUl = ``;
    for (const integration of integrations) {
        integrationUl += `
            <li>${integration}</li>
        `
    }
    return integrationUl;
}

const sortByDate = () => {
    const sort = publishedDate.slice(0, 6);
    const sorted = sort.sort(function (a, b) {
      return new Date(a.published_in) - new Date(b.published_in);
    });
    showAiData(sorted);
};


fetchData();
