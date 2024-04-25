// MENU

class App {
  init() {
    this.initRange();
    this.onButtonPlay();
    this.isPolicyChecked();
    this.changeFreeNumber();
    this.increaseSum();
  }

  constructor() {
    this.iframe = document.querySelector('iframe');
    this.player = new Vimeo.Player(this.iframe);
    this.btnPlay = document.querySelector('#button-play')
  }

  initRange() {
    $(function () {
      $(".js-range-slider").ionRangeSlider({
        skin: "round",
        hide_min_max: false,
        hide_from_to: true,
        min: 50000,
        max: 10000000,
        from: 18000,
        postfix: " ₸",
        grid: false,
        onStart: function (data) {
          $("#calcResult").text(data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸');
        },
        onChange: function (data) {
          $("#profitValue").text(Math.round((data.from * 0.32) + data.from).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸');
          $("#calcResult").text(data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸');
        },
      });
    });
    $(function () {
      $(".js-range-slider2").ionRangeSlider({
        skin: "round",
        hide_min_max: false,
        hide_from_to: false,
        min: 1,
        max: 60,
        from: 1,
        postfix: " мес.",
        grid: false,
        onChange: function (data) {
          const summValue = document.querySelector('#profitValue')
          const value = summValue.textContent.slice(0, -1).replace(/ /g, '');
          summValue.textContent = Math.round(Number(value * 1.02).toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸';
        },
      });
    });
  }

  onButtonPlay() {
    const videosBlock = document.querySelectorAll('.how__video')


    const playVideo = (block) => {
      const iframe = block.querySelector('iframe');
      const player = new Vimeo.Player(iframe);
      const btnPlay = block.querySelector('#button-play');
      const img = block.querySelector('.how__video-img')

      btnPlay.addEventListener("click", () => {
        player.play()
        btnPlay.style.display = 'none'
        img.style.display = 'none'
      })
    }

    videosBlock.forEach((vb) => { vb.addEventListener('click', playVideo(vb)) })
  }

  isPolicyChecked() {
    const leadform1 = document.querySelector('#leadform1');

    const isChecked = (form) => {
      const policyCheck = form.querySelector('[name="polycy"]')
      const termsCheck = form.querySelector('[name="terms"]')
      const sbmtBtn = form.querySelector('.submit_btn')


      const checkPolicy = () => {
        if (policyCheck.checked && termsCheck.checked) {
          sbmtBtn.removeAttribute("disabled");
        } else {
          sbmtBtn.setAttribute("disabled", "disabled");
        }
      };
      checkPolicy()

      policyCheck.addEventListener('click', checkPolicy);
      termsCheck.addEventListener('click', checkPolicy);
    }

    leadform1.addEventListener('click', isChecked(leadform1))
  }

  changeFreeNumber() {
    const paragraph = document.querySelector('.page-header__number');

    function decreaseNumber() {
      let number = parseInt(paragraph.textContent);

      if (number <= 1) {
        return;
      }

      number--;
      paragraph.classList.add('animation');

      setTimeout(() => {
        paragraph.textContent = number;
      }, 750);

      setTimeout(() => {
        paragraph.classList.remove('animation');
      }, 1500);

      const randomDelay = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
      setTimeout(decreaseNumber, randomDelay);
    }

    decreaseNumber();
  }

  increaseSum() {
    function increaseNumber() {
      const amountElement = document.querySelector('.promo__amount');

      function getOriginalNumber() {
        const spans = amountElement.querySelectorAll('span');
        let numberString = '';
        for (let i = 0; i < spans.length - 1; i++) {
          numberString += spans[i].textContent;
        }
        return parseInt(numberString);
      }

      let number = getOriginalNumber();

      function updateSpansWithNumber(number) {
        const digits = number.toString().padStart(6, '0');
        const spans = amountElement.querySelectorAll('span');
        for (let i = 0; i < spans.length - 1; i++) {
          if (spans[i].textContent !== digits[i]) {
            spans[i].classList.add('animation');
            setTimeout(() => {
              spans[i].textContent = digits[i];
            }, 750);
            setTimeout(() => {
              spans[i].classList.remove('animation');
            }, 1500);
          }
          spans[i].textContent = digits[i];
        }
      }

      updateSpansWithNumber(number);

      setInterval(() => {
        const randomIncrement = Math.floor(Math.random() * (100 - 15 + 1)) + 15;
        number += randomIncrement;
        updateSpansWithNumber(number);
      }, 3000);
    }

    increaseNumber();
  }

}



const app = new App();
document.addEventListener('DOMContentLoaded', app.init());
