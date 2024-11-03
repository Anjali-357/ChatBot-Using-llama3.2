let answer = "Lorem ipsum dolor sit amet consectetur, adipisicing elit...";
let recent = ["Hello, Assistant"];

async function run() {
  document.querySelector(".answer2").innerHTML = `<img
            src="https://www.gstatic.com/lamda/images/gemini_sparkle_processing_v002_6e79d4140a48275553581.gif"
            alt="Loading..."
          />`;

  const prompt = document.querySelector(".textarea").innerHTML;

  try {
    const response = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    answer = data.response;

    // Display the response in the UI
    document.querySelector(".answer2").innerHTML = answer;
  } catch (error) {
    console.error("Error fetching response:", error);
    document.querySelector(".answer2").innerHTML = "An error occurred.";
  }
}

// Clear textarea on click
document.querySelector(".textarea").addEventListener("click", (e) => {
  e.target.innerHTML = "";
});

// Show submit button and icons based on user input
document.querySelector(".textarea").addEventListener("keydown", (e) => {
  const textareaContent = e.target.innerHTML.trim();
  const submitButton = document.querySelector(".submit");
  
  if (textareaContent.length > 0) {
    submitButton.style.display = "block";
    document.querySelector(".mic").style.right = "300px";
    document.querySelector(".add_img").style.right = "350px";
  } else {
    submitButton.style.display = "none";
    document.querySelector(".mic").style.right = "250px";
    document.querySelector(".add_img").style.right = "300px";
  }
});

// Handle submission of the prompt
document.querySelector(".submit").addEventListener("click", async () => {
  document.querySelector(".heading").style.display = "none";
  document.querySelector(".submit").style.display = "none";
  document.querySelector(".stop").style.display = "block";
  document.querySelector(".textarea").contenteditable = "false";
  document.querySelector(".textarea").style.pointerEvents = "none";

  console.log(document.querySelector(".textarea").contenteditable);
  document.querySelector(".answer2").style.display = "block";
  document.querySelector(".suggestions").style.display = "none";
  document.querySelector(".answer1").innerHTML = ` <div class= "question"><img
            src="https://lh3.googleusercontent.com/ogw/AF2bZyiYs974rr3rsci12HnaS6I3xuk5IlWABRWYMnRYkcNp7w=s32-c-mo"
            alt="User question"
          /> ${document.querySelector(".textarea").innerHTML}</div>
          `;

  await run();
  let i = 0;
  let flag = false;
  document.querySelector(".answer2").innerHTML = `<img
            src="https://www.gstatic.com/lamda/images/gemini_sparkle_processing_v002_6e79d4140a48275553581.gif"
            alt="Loading..."
          /> `;

  function typeWriter() {
    if (i < answer.length) {
      document.querySelector(".answer2").innerHTML += answer.charAt(i);
      i++;
      if (flag) return;

      setTimeout(typeWriter, 20);
      if (i === answer.length) {
        changeImg();
      }
    }
  }

  typeWriter();

  // Update recent history
  recent.push(answer.substring(0, 17) + "...");
  if (recent.length > 4) recent.shift();
  console.log(recent);
  updateRecent();

  // Stop typing animation if 'Stop' button is clicked
  document.querySelector(".stop").addEventListener("click", () => {
    flag = true;
    changeImg();
  });
});

// Change loading image and reset textarea
function changeImg() {
  document.querySelector(".answer2 img").src =
    "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg";
  document.querySelector(".stop").style.display = "none";
  document.querySelector(".mic").style.right = "250px";
  document.querySelector(".add_img").style.right = "300px";
  document.querySelector(".textarea").innerHTML = "Enter a prompt";
  document.querySelector(".textarea").style.pointerEvents = "auto";
}

// Update recent history display
function updateRecent() {
  let temp = "";
  recent.forEach((e) => {
    temp += `<p>
      <span class="material-symbols-outlined history-tab">chat_bubble </span>
      ${e}
    </p>`;
  });

  document.querySelector(".recent-history").innerHTML = temp;
}

updateRecent();

let toggle = true;

// Toggle sidebar visibility
document.querySelector(".menu").addEventListener("click", () => {
  if (toggle) {
    console.log("Sidebar collapsed");
    document.querySelector(".sidebar").style.width = "70px";
    document.querySelector(".recent").style.display = "none";
    document.querySelector(".address").style.display = "none";
    document.querySelectorAll(".text").forEach((e) => {
      e.style.display = "none";
    });
    document.querySelector(".textarea").style.width = "70%";
    toggle = false;
    document.querySelectorAll(".settings p").forEach((e) => {
      e.style.justifyContent = "center";
      e.style.width = "100%";
    });
  } else {
    console.log("Sidebar expanded");
    document.querySelector(".sidebar").style.width = "20%";
    setTimeout(() => {
      document.querySelector(".recent").style.display = "block";
      document.querySelector(".address").style.display = "grid";
      document.querySelectorAll(".text").forEach((e) => {
        e.style.display = "block";
      });
      document.querySelector(".textarea").style.width = "65%";
      document.querySelectorAll(".settings p").forEach((e) => {
        e.style.justifyContent = "left";
        e.style.width = "100%";
      });
    }, 1000);
    toggle = true;
  }
});
