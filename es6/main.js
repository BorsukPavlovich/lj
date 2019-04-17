'use strict'

document.addEventListener("DOMContentLoaded", function() {
    const nav = document.getElementsByClassName('nav')[0];
    const toggle = document.getElementsByClassName('toggle')[0];
    const tabs = document.getElementsByClassName('settings__tab');
    const layoutChecks = document.getElementsByClassName('layout__check');
    const colorsChecks = document.getElementsByClassName('colors__check');
    const scheme = document.getElementsByClassName('wrapper')[0];
    const btnSave = document.getElementsByClassName('settings__save')[0];
    const btnCancel = document.getElementsByClassName('settings__cancel')[0];
    const message = document.getElementsByClassName('message')[0];

    let cookies = '';

    //tabs
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            openTab(event, tabs[i].dataset.id);
        });
    }

    document.getElementsByClassName("settings__tab_state_active")[0].click();

    function openTab(evt, id) {
        let j = 0;
        const tabcontent = document.getElementsByClassName("settings__content");
        const tablinks = document.getElementsByClassName("settings__tab");

        for (j = 0; j < tabcontent.length; j++) {
            tabcontent[j].style.display = "none";
        }

        for (j = 0; j < tablinks.length; j++) {
            tablinks[j].className = tablinks[j].className.replace("settings__tab_state_active", "");
        }

        document.getElementById(id).style.display = "block";
        evt.currentTarget.className += " settings__tab_state_active";

    }

    toggle.addEventListener('click', (event) => {
        toggle.classList.toggle('toggle_state_active');
        nav.classList.toggle('header__nav_state_active');
    });



    btnCancel.addEventListener('click', (event) => {
        for (let i = 0; i < layoutChecks.length; i++) {
            document.cookie =  `${layoutChecks[i].dataset.id}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
            if (!layoutChecks[i].hasAttribute('data-checked')) {
                layoutChecks[i].click();
            }
        }

        for (let i = 0; i < colorsChecks.length; i++) {
            colorsChecks[i].className = 'colors__check';
            colorsChecks[i].removeAttribute('data-checked');
        }
        colorsChecks[0].classList.add('colors__check_state_active');
        colorsChecks[0].setAttribute('data-checked', 'checked');
        showMessage('Returned to default!', 'warn');
    });



    for (let i = 0; i < layoutChecks.length; i++) {
        layoutChecks[i].addEventListener('click', function(e) {
            layoutClick(event, layoutChecks[i].dataset.id);
            e.target.classList.toggle('layout__check_state_active');
            if (e.target.hasAttribute('data-checked')) {
                e.target.removeAttribute('data-checked');
                return;
            }
            e.target.setAttribute('data-checked', 'checked');
        });
    }

    for (let i = 0; i < colorsChecks.length; i++) {
        colorsChecks[i].addEventListener('click', function(e) {
            for (let j = 0; j < colorsChecks.length; j++) {
                colorsChecks[j].classList.remove('colors__check_state_active');
                colorsChecks[j].removeAttribute('data-checked');
            }
            e.target.classList.toggle('colors__check_state_active');
            e.target.setAttribute('data-checked', 'checked');
            scheme.className = `wrapper  color-scheme-${e.target.dataset.color}`
        });
    }

    function layoutClick(e, cl) {
        let elems = document.getElementsByClassName(cl);
        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.toggle('hide');
        }
    }


    btnSave.addEventListener('click', (event) => {
        for (let i = 0; i < layoutChecks.length; i++) {
            document.cookie = `${layoutChecks[i].dataset.id}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
            cookies = `${layoutChecks[i].dataset.id} = ${layoutChecks[i].hasAttribute('data-checked')};`;
            let now = new Date();
            let time = now.getTime();
            time += 3600 * 1000;
            now.setTime(time);
            document.cookie =
            cookies +
            ' expires=' + now.toUTCString() +
            '; path=/';
        }

        for (let i = 0; i < colorsChecks.length; i++) {
            if (colorsChecks[i].hasAttribute('data-checked')) {
                document.cookie = `scheme=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
                cookies = `scheme = ${colorsChecks[i].dataset.color};`;
                let now = new Date();
                let time = now.getTime();
                time += 3600 * 1000;
                now.setTime(time);
                document.cookie =
                    cookies +
                    ' expires=' + now.toUTCString() +
                    '; path=/';
            }
        }
        showMessage('Successful saved!', 'suc');
    });

    for (let i = 0; i < layoutChecks.length; i++) {
        if (getCookie(layoutChecks[i].dataset.id) == 'false') {
            layoutChecks[i].click();
        }
    }

    for (let i = 0; i < colorsChecks.length; i++) {
        if (getCookie('scheme') == colorsChecks[i].dataset.color) {
            colorsChecks[i].click();
        }
    }

    function getCookie(name) {
        var cookieArr = document.cookie.split(";");

        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");

            if(name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    function showMessage(msg, type) {
        message.innerHTML = msg;
        message.classList.toggle('show');
        message.classList.toggle(type);
        setTimeout(() => {
            message.classList.toggle('show');
            message.classList.toggle(type);
            message.innerHTML = "";
        }, 2000);
    }
});




