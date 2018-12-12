// controlador-404

(function () {
      var d = new Date();
      d = (d.getHours() + (d.getMinutes() / 100) + (d.getSeconds() / 10000) + (d.getMilliseconds() / 10000000)) * 1000 / 23;
      if (screen.width > 780) {
        document.getElementById("gContainer").insertAdjacentHTML("beforeend",
          `<div class="graphics">
            <div class="sky"></div>
            <img src="images/Mountains.png" alt="mountains" class="mountains" style="left: -1vw;">
            <div class="ground"></div>
            <div class="background"></div>
            <img src="images/Bush2.png" alt="back_bush" class="back_bush" style="left: 60%;">
            <img src="images/Bush2.png" alt="back_bush" class="back_bush" style="left: 20%;">
            <img src="images/Chair.png" alt="chair" class="chair">
            <img src="images/Tree1.png" alt="tree" class="tree" style="left: 15%;bottom: 20%;">
            <img src="images/Tree2.png" alt="tree" class="tree" style="left: 60%;bottom: 17%;">
            <img src="images/Bush1.png" alt="bush" class="bush" style="left: 5%;">
            <img src="images/Bush1.png" alt="bush" class="bush" style="left: 80%;">
            <img src="images/Lamp.png" alt="lamp" class="lamp">
            <div class="street"></div>
            <div class="street_border"></div>
            <img src="images/e404.png" alt="e404" class="e404">
            <br>
            <br>
            <p class="eContent">Página no encontrada...</p>
            <div class="flex-container_cloud">
              <img src="images/Cloud.png" alt="cloud" class="cloud">
            </div>
            <div class="flex-container_cloud">
              <p class="goBack" onclick="alert('Regresa a página principal.');">Volver</p>
            </div>
          </div>`);
      } else {
        document.getElementById("gContainer").insertAdjacentHTML("beforeend", `
        <div class="graphics">
          <div class="sky"></div>
          <img src="images/Mountains.png" alt="mountains" class="mountains" style="right: 0;width: auto;">
          <div class="ground"></div>
          <div class="background"></div>
          <img src="images/Bush2.png" alt="back_bush" class="back_bush" style="left: 60%;">
          <img src="images/Chair.png" alt="chair" class="chair" style="left: 25%;height: 20vh;">
          <img src="images/Tree1.png" alt="tree" class="tree" style="left: -3%;bottom: 20%;height: 40vh;">
          <img src="images/Bush1.png" alt="bush" class="bush" style="left: -5%;height: 8vh;">
          <img src="images/Lamp.png" alt="lamp" class="lamp" style="left: 45%;height: 50vh;">
          <div class="street"></div>
          <div class="street_border"></div>
          <img src="images/e404.png" alt="e404" class="e404" style="left: 5%;height: 20vh;">
          <br>
          <br>
          <p class="eContent" style="font-size: x-large;">Página no encontrada...</p>
          <div class="flex-container_cloud"  style="top: 20vh;height: 20vh;">
            <img src="images/Cloud.png" alt="cloud" class="cloud">
          </div>
          <div class="flex-container_cloud" style="top: 20vh;height: 20vh;">
            <p class="goBack" onclick="alert('Regresa a página principal.');">Volver</p>
          </div>
        </div>`);

      }
      document.getElementsByClassName("sky")[0].setAttribute("style", "bottom: -" + d + "%")
      
    }());