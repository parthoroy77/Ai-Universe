const fetchData = async (showAll) => {
    spinnerFunction(true)
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    showAiData(data.data.tools,showAll)
}

const showAiData = (data, showAll) => {
    console.log(data);
    const aiContainer = document.getElementById('ai-container');
    aiContainer.innerHTML = ``;
    const showMoreBtn = document.getElementById("see-more-btn");
    if (data.length > 6 && showAll !== 'show-all') {
        data = data.slice(0, 6);
        showMoreBtn.classList.remove('d-none')
    }
    else {
        showMoreBtn.classList.add('d-none')
    }
    data.forEach(singleData => {
        console.log(singleData);
        const { id, name, features, image, published_in } = singleData;
        // console.log(features);
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
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
                                <button class="border-0 rounded-circle modal-btn"><img src="./images/arrow-right.png" style="width: 50px; height: 50px;" alt=""></button>
                            </div>
                        </div>
                    </div>
            </div>
        `;
        aiContainer.appendChild(aiDiv);
        spinnerFunction(false)
    });
}


// Spinner function

const spinnerFunction = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    }
    else {
        spinnerSection.classList.add('d-none')
    }
}

// See more btn click handler
document.getElementById("see-more-btn").addEventListener(
    'click',
    function () {
        spinnerFunction(true)
        fetchData('show-all');
    }
)


// Feature function 
const addFeature = features => {
    let olHtml = ``;
    // console.log(features);
    for (let i = 0; i < features.length; i++){
        olHtml += `
            <li>${features[i]}</li>
        `
    }
    return olHtml;
}

fetchData()