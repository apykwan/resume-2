const form_id_js = "javascript_form";

const data_js = {
  "access_token": "6szmz9x46smw8rdbk3wlypdd"
};

function js_onSuccess() {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

function js_onError(error) {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

export const sendButton = document.getElementById("js_send");

export function js_send() {
  sendButton.value = 'Sending…';
  sendButton.disabled = true;
      
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        js_onSuccess();
    } else if(request.readyState == 4) {
        js_onError(request.response);
    }
  };

  const subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
  const message = document.querySelector("#" + form_id_js + " [name='text']").value;

  if (!subject || !message) {
    sendButton.value = 'Submit';
    alert('Both Subject and Message fields cannot be emptied!');
    return sendButton.disabled = false;
  }

  data_js['subject'] = subject;
  data_js['text'] = message;
  const params = toParams(data_js);

  request.open("POST", "https://postmail.invotes.com/send", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.send(params);
  
  return false;
}

function toParams(data_js) {
  const form_data = [];
  for (let key in data_js ) {
      form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }

  return form_data.join("&");
}

export const js_form = document.getElementById(form_id_js);