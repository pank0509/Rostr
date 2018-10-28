export const validateRequired = (val) => {
  if (!!val || (val.trim && val.trim() !== '')) {
    return true;
  } return false;
};
export const validateEmail = (val) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val).toLowerCase());
};

export const validateNumber = (val) => {
  const value = Number(val);
  if (typeof value === 'number') {
    return true;
  } return false;
};
export const validateInteger = (val) => {
  if (Number.isInteger(val)) {
    return true;
  } return false;
};


const regExpForUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const urlValidation = (val) => {
  if (!regExpForUrl.test(val)) {
    return false;
  } return true;
};
const svgRegex = /^(\d+|\d+,\d+)+\d$/;

export const validateCSV = (val) => {
  if (!svgRegex.test(val)) {
    return false;
  } return true;
};

const phoneNumberRegex = /^(\+\d{1,2}[- ]?)?\d{10}$/;

export const phoneNumberValidation = (val) => {
  if (!phoneNumberRegex.test(val)) {
    return false;
  } return true;
};

const rwgExpForImage = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+\.(jpeg|jpg|gif|png)$/;

export const validateImage = (val) => {
  if (!rwgExpForImage.test(val)) {
    return false;
  } return true;
};


/* testing smooth scrolling */


export const smoothScroll = {
  timer: null,
  stop: function stop() {
    clearTimeout(this.timer);
  },
  scrollTo: function scrollTo(id, callback) {
    const settings = {
      duration: 4000,
      easing: {
        outQuint: function outQuint(xyz, tuv, bcd, cde, def) {
          // eslint-disable-next-line
          return cde * ((tuv = tuv / def - 1) * tuv * tuv * tuv * tuv + 1) + bcd;
        }
      }
    };
    let percentage = null;
    let startTime = null;
    const node = document.getElementById(id);
    const nodeTop = node.offsetTop;
    const nodeHeight = node.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowHeight = window.innerHeight;
    const offset = window.pageYOffset;
    const delta = nodeTop - offset - 80;
    const bottomScrollableY = height - windowHeight;
    const targetY = (bottomScrollableY < delta) ?
      bottomScrollableY - (height - nodeTop - nodeHeight + offset) :
      delta;

    startTime = Date.now();
    percentage = 0;

    if (this.timer) {
      clearInterval(this.timer);
    }
    function step() {
      let yScroll = null;
      const elapsed = Date.now() - startTime;

      if (elapsed > settings.duration) {
        clearTimeout(this.timer);
      }

      percentage = elapsed / settings.duration;

      if (percentage > 1) {
        clearTimeout(this.timer);

        if (callback) {
          callback();
        }
      } else {
        yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
        window.scrollTo(0, yScroll);
        this.timer = setTimeout(step, 1);
      }
    }

    this.timer = setTimeout(step, 1);
  }
};
