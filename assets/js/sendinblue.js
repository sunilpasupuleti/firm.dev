let api_key =
  "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";
async function onContact(e) {
  e.preventDefault();
  var form = $("#contact-form");
  var sendBtn = $("#send-button");
  var sendingBtn = $("#sending-button");
  let values = $("#contact-form").serializeArray();
  let errorMsg = $("#err-msg");
  let successMsg = $("#suc-msg");
  let errors = [];

  let obj = {};
  errorMsg.hide();
  successMsg.hide();

  values.forEach((element) => {
    let name = element.name;
    let value = element.value.trim();
    if (name === "firstName") obj.firstName = value;
    if (name === "lastName") obj.lastName = value;
    if (name === "email") obj.email = value;
    if (name === "phone") obj.phone = value;
    if (name === "message") obj.message = value;
  });
  let { firstName, lastName, email, phone, message } = obj;
  let emailRegEx = /^\S+@\S+\.\S+$/g;
  let phoneRegex = /^[6-9]\d{9}$/g;

  if (!firstName || firstName === "") errors.push("First Name required");
  if (!lastName || lastName === "") errors.push("Last Name required");
  if (!email || email === "" || !emailRegEx.test(email))
    errors.push("Invalid email address");

  if (!phone || phone === "" || !phoneRegex.test(phone))
    errors.push("Invalid phone number");
  if (!message || message === "") errors.push("Message required");

  if (errors && errors.length > 0) {
    errorMsg.html(errors[0]);
    errorMsg.show();
    $("html, body").animate({
      scrollTop: errorMsg.position().top - 100,
    });
    return;
  }

  let postData = {
    sender: {
      name: "FIRM.DEV",
      email: "hello@thefirm.dev",
    },
    to: [
      {
        email: "hello@thefirm.dev",
        name: "FIRM.DEV",
      },
    ],
    subject: "Contact Form",
    replyTo: {
      email: "hello@thefirm.dev",
      name: "FIRM.DEV",
    },
    htmlContent: `<strong>First Name</strong> : ${obj.firstName}
    <hr/>
    <strong>Last Name : </strong> ${obj.lastName}
    <hr/>
    <strong>Email Address : </strong> ${obj.email}
    <hr/>
    <strong>Phone Number : </strong>${obj.phone}
    <hr/>
    <strong>Message : </strong>
    <p>${obj.message}</p>
    `,
  };
  sendingBtn.show();
  sendBtn.hide();
  await $.ajax({
    type: "post",
    url: "https://api.sendinblue.com/v3/smtp/email",
    data: JSON.stringify(postData),
    contentType: "application/json",
    headers: {
      "api-key": api_key,
    },

    success: function (response) {
      ifNoError("Your message sent successfully ! Thanking you - FIRM.DEV 🥰");
      console.log(response);
    },
    error: function (error) {
      let errorMsg = error.responseJSON
        ? error.responseJSON.message === "Contact already exist"
          ? "Already Subscribed"
          : error.responseJSON.message
        : error.statusText;
      ifError(errorMsg);
      console.log(error);
    },
  });

  function ifError(errorMessage) {
    sendBtn.show();
    sendingBtn.hide();
    errorMsg.html(errorMessage);
    errorMsg.show();
    $("html, body").animate({
      scrollTop: errorMsg.position().top - 100,
    });
    setTimeout(() => {
      errorMsg.hide();
    }, 5000);
  }

  function ifNoError(msg) {
    sendBtn.show();
    sendingBtn.hide();
    successMsg.html(msg);
    successMsg.show();
    $("html, body").animate({
      scrollTop: successMsg.position().top - 100,
    });
    form.trigger("reset");
    setTimeout(() => {
      successMsg.hide();
    }, 5000);
  }
}

async function onSubscribe() {
  var email = $("#subscribe-email").val();
  let errorMsg = $("#sub-err-msg");
  let successMsg = $("#sub-suc-msg");

  var subscribeBtn = $("#subscribe-button");
  var subscribingBtn = $("#subscribing-button");

  let error = null;

  errorMsg.hide();
  successMsg.hide();

  let emailRegEx = /^\S+@\S+\.\S+$/g;
  if (!email || email === "" || !emailRegEx.test(email))
    error = "Invalid email address";

  if (error) {
    errorMsg.html(error);
    errorMsg.show();
    return;
  }

  subscribeBtn.hide();
  subscribingBtn.show();
  await $.ajax({
    type: "post",
    url: "https://api.sendinblue.com/v3/contacts",
    data: JSON.stringify({
      email: email.trim(),
    }),
    contentType: "application/json",
    headers: {
      "api-key": api_key,
    },
    success: function (response) {
      ifNoError("Subscribed successfully 🥰");
      console.log(response);
    },
    error: function (error) {
      let errorMsg = error.responseJSON
        ? error.responseJSON.message === "Contact already exist"
          ? "Already Subscribed"
          : error.responseJSON.message
        : error.statusText;
      ifError(errorMsg);
      console.log(error);
    },
  });

  function ifError(errorMessage) {
    subscribeBtn.show();
    subscribingBtn.hide();
    errorMsg.html(errorMessage);
    errorMsg.show();
    setTimeout(() => {
      errorMsg.hide();
    }, 5000);
  }

  function ifNoError(msg) {
    subscribeBtn.show();
    subscribingBtn.hide();
    successMsg.html(msg);
    successMsg.show();
    $("#subscribe-email").val("");
    setTimeout(() => {
      successMsg.hide();
    }, 5000);
  }
}

process;
