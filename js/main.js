var $avatarURL = document.querySelector('#avatarUrl');
var $defaultImg = document.querySelector('.default-img');

$avatarURL.addEventListener('input', function (event) {
  var $urlValue = event.target.value;
  $defaultImg.src = $urlValue;
});
