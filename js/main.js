'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var nav = document.getElementsByClassName('nav')[0];
  var toggle = document.getElementsByClassName('toggle')[0];
  var tabs = document.getElementsByClassName('settings__tab');
  var layoutChecks = document.getElementsByClassName('layout__check');
  var colorsChecks = document.getElementsByClassName('colors__check');
  var scheme = document.getElementsByClassName('wrapper')[0];
  var btnSave = document.getElementsByClassName('settings__save')[0];
  var btnCancel = document.getElementsByClassName('settings__cancel')[0];
  var message = document.getElementsByClassName('message')[0];
  var cookies = ''; //tabs

  var _loop = function _loop(i) {
    tabs[i].addEventListener('click', function () {
      openTab(event, tabs[i].dataset.id);
    });
  };

  for (var i = 0; i < tabs.length; i++) {
    _loop(i);
  }

  document.getElementsByClassName("settings__tab_state_active")[0].click();

  function openTab(evt, id) {
    var j = 0;
    var tabcontent = document.getElementsByClassName("settings__content");
    var tablinks = document.getElementsByClassName("settings__tab");

    for (j = 0; j < tabcontent.length; j++) {
      tabcontent[j].style.display = "none";
    }

    for (j = 0; j < tablinks.length; j++) {
      tablinks[j].className = tablinks[j].className.replace("settings__tab_state_active", "");
    }

    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " settings__tab_state_active";
  }

  toggle.addEventListener('click', function (event) {
    toggle.classList.toggle('toggle_state_active');
    nav.classList.toggle('header__nav_state_active');
  });
  btnCancel.addEventListener('click', function (event) {
    for (var i = 0; i < layoutChecks.length; i++) {
      document.cookie = "".concat(layoutChecks[i].dataset.id, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/");

      if (!layoutChecks[i].hasAttribute('data-checked')) {
        layoutChecks[i].click();
      }
    }

    for (var _i = 0; _i < colorsChecks.length; _i++) {
      colorsChecks[_i].className = 'colors__check';

      colorsChecks[_i].removeAttribute('data-checked');
    }

    colorsChecks[0].classList.add('colors__check_state_active');
    colorsChecks[0].setAttribute('data-checked', 'checked');
    showMessage('Returned to default!', 'warn');
  });

  var _loop2 = function _loop2(i) {
    layoutChecks[i].addEventListener('click', function (e) {
      layoutClick(event, layoutChecks[i].dataset.id);
      e.target.classList.toggle('layout__check_state_active');

      if (e.target.hasAttribute('data-checked')) {
        e.target.removeAttribute('data-checked');
        return;
      }

      e.target.setAttribute('data-checked', 'checked');
    });
  };

  for (var i = 0; i < layoutChecks.length; i++) {
    _loop2(i);
  }

  for (var i = 0; i < colorsChecks.length; i++) {
    colorsChecks[i].addEventListener('click', function (e) {
      for (var j = 0; j < colorsChecks.length; j++) {
        colorsChecks[j].classList.remove('colors__check_state_active');
        colorsChecks[j].removeAttribute('data-checked');
      }

      e.target.classList.toggle('colors__check_state_active');
      e.target.setAttribute('data-checked', 'checked');
      scheme.className = "wrapper  color-scheme-".concat(e.target.dataset.color);
    });
  }

  function layoutClick(e, cl) {
    var elems = document.getElementsByClassName(cl);

    for (var _i2 = 0; _i2 < elems.length; _i2++) {
      elems[_i2].classList.toggle('hide');
    }
  }

  btnSave.addEventListener('click', function (event) {
    for (var _i3 = 0; _i3 < layoutChecks.length; _i3++) {
      document.cookie = "".concat(layoutChecks[_i3].dataset.id, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/");
      cookies = "".concat(layoutChecks[_i3].dataset.id, " = ").concat(layoutChecks[_i3].hasAttribute('data-checked'), ";");
      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);
      document.cookie = cookies + ' expires=' + now.toUTCString() + '; path=/';
    }

    for (var _i4 = 0; _i4 < colorsChecks.length; _i4++) {
      if (colorsChecks[_i4].hasAttribute('data-checked')) {
        document.cookie = "scheme=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
        cookies = "scheme = ".concat(colorsChecks[_i4].dataset.color, ";");

        var _now = new Date();

        var _time = _now.getTime();

        _time += 3600 * 1000;

        _now.setTime(_time);

        document.cookie = cookies + ' expires=' + _now.toUTCString() + '; path=/';
      }
    }

    showMessage('Successful saved!', 'suc');
  });

  for (var _i5 = 0; _i5 < layoutChecks.length; _i5++) {
    if (getCookie(layoutChecks[_i5].dataset.id) == 'false') {
      layoutChecks[_i5].click();
    }
  }

  for (var _i6 = 0; _i6 < colorsChecks.length; _i6++) {
    if (getCookie('scheme') == colorsChecks[_i6].dataset.color) {
      colorsChecks[_i6].click();
    }
  }

  function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }

    return null;
  }

  function showMessage(msg, type) {
    message.innerHTML = msg;
    message.classList.toggle('show');
    message.classList.toggle(type);
    setTimeout(function () {
      message.classList.toggle('show');
      message.classList.toggle(type);
      message.innerHTML = "";
    }, 2000);
  }
});