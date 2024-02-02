window.onload = () => {
  document.body.onkeydown = (evt) => {
    if (evt.repeat) {
      return;
    }
    console.log(evt);
    const key = evt.key.toUpperCase();
    const el = document.querySelector(`.key[data-value='${key}']`);
    if (el) {
      el.classList.add("active");
      buttonPressed(key);
    }
  };

  document.body.onkeyup = (evt) => {
    const key = evt.key.toUpperCase();
    const el = document.querySelector(`.key[data-value='${key}']`);
    if (el) {
      el.classList.remove("active");
    }
  };

  document.querySelectorAll(".key").forEach((el) => {
    const key = el.getAttribute("data-value");
    if (key) {
      el.onclick = () => {
        buttonPressed(key);
      };
    }
  });

  function buttonPressed(key) {
    document.getElementById("result").textContent += key;
  }
};
