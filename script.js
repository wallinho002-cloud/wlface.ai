const uploadBox = document.getElementById("uploadBox");
const videoInput = document.getElementById("videoInput");
const previewContainer = document.getElementById("previewContainer");
const videoPreview = document.getElementById("videoPreview");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

uploadBox.addEventListener("click", () => {
  videoInput.click();
});

videoInput.addEventListener("change", () => {
  const file = videoInput.files[0];
  if (file) {
    const videoURL = URL.createObjectURL(file);
    videoPreview.src = videoURL;
    previewContainer.classList.remove("hidden");
  }
});

async function sendVideo() {
  const file = videoInput.files[0];
  if (!file) return alert("Selecione um vídeo.");

  loading.classList.remove("hidden");
  result.innerHTML = "";

  const formData = new FormData();
  formData.append("video", file);

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    loading.classList.add("hidden");

    result.innerHTML = `
      <h3>Resultado:</h3>
      <video controls src="${data.videoUrl}" style="max-width:500px; width:100%; border-radius:10px;"></video>
    `;

  } catch (error) {
    loading.classList.add("hidden");
    result.innerHTML = "<p>Erro ao processar.</p>";
  }
}
