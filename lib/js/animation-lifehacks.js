function toggleSavePub_LH(idPub) {
  $('.pub_one.lifehack#'+idPub+' .user_just_saved_it').toggleClass('pub_saved');
  console.log("Произошло сохранение публикации");
}

function toggleGetNotiFromAuthor(idPub) {
  $('.pub_one.lifehack#'+idPub+' .get_noti').toggleClass('noties_gotten');
  console.log("Произошло получение уведомлений от автора этой публикации");
}

$is_opened_pub_additional_functions = 0;
$opened_pub_additional_functions_id = 0;
function togglePubAdditionalFunctions(idPub) {
  $('.pub_one.lifehack#'+idPub+' .pub_show_full').toggleClass('pub_additional_functions_opened');
  $('.pub_additional_functions_bg').toggleClass('show');
  $('.pub_additional_functions').offset($('.pub_one.lifehack#'+idPub+' .pub_show_full').offset());
  $is_opened_pub_additional_functions = 1;
  $opened_pub_additional_functions_id = idPub;
  console.log("Открыты дополнительные действия с публикацией под ID "+ idPub);
}
function openNewComplaintForm() {
  // $opened_pub_additional_functions_id
  $(' .new_complaint').addClass('show');
  if ($('.share_the_pub').hasClass('show')) {
    $('.share_the_pub').removeClass('show')
  }
}
function shareThePub() {
  // $opened_pub_additional_functions_id
  $(' .share_the_pub').addClass('show');
  if ($('.new_complaint').hasClass('show')) {
    $('.new_complaint').removeClass('show')
  }
}

function new_complaint_was_sent() {
  $idPub = $opened_pub_additional_functions_id;
  $('.pub_one.lifehack#'+$idPub+' .pub_show_full').toggleClass('pub_additional_functions_opened');
  $('.pub_additional_functions_bg').removeClass('show');
  $is_opened_pub_additional_functions = 0;
  $opened_pub_additional_functions_id = 0;
  $('.new_complaint').removeClass('show');
  $('.new_complaint textarea').val('');
  testFu('Жалоба успешно отправлена, будет проверена когда-то там');
  console.log("Жалоба типо отпрвлена");
}

function checkScrollForVideo() {
  var fraction = 0.9; // Play video when 80% of the player is visible.

  $('video').each(function(){
    var video = $(this).get(0);
    var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
        b = y + h, //bottom
        visibleX, visibleY, visible;

        visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

        visible = visibleX * visibleY / (w * h);

    if (visible > fraction) {
        $(this).removeClass('paused');
        video.play();
        console.log("видео начало воспроизвоиться");
    } else {
        video.pause();
        console.log("видео не начало / перестало воспроизвоиться");
        $(this).addClass('paused');
    }
  })
}

function testFu(t) {
  alert (t);
}


$(document).ready(function() {
  $filters_on = 0;
  $selected_sphere = 0;

  $(".triangle_to_open_and_hide.open_hide_design_styles").on('click', function() {
    $('.styles_labels_open').toggleClass('hidden');
    $('.open_hide_design_styles').toggleClass('styles_labels_hidden');
  });

  $(".styles_labels_open label").on('click', function() {
    console.log("label sphere clicked");
    if (this.classList.contains('any_one')) {
      document.getElementById('checked_styles_count').innerHTML="В любой";
      $('input[name="style_design"]').prop('checked', false);
      $selected_sphere = 0;
    } else {
      $selected_sphere = $(':input[name="style_design"]:checked').length;
      document.getElementById('checked_styles_count').innerHTML= $selected_sphere + " выбрано";
    }
  });

  $(".clear_filter").on('click', function() {
    console.log("clear_filter inp clicked");
    $filters_on = 0;
    $selected_sphere = 0;
    document.getElementById('fltr_cost_min').value = '';
    document.getElementById('fltr_cost_max').value = '';
    $(':input[name="style_design"]:checked').prop('checked', false);
    document.getElementById('checked_styles_count').innerHTML="В любой";
  });

  $(document).on('click', function(e) {
    $filters_on = 0;

    if ($is_opened_pub_additional_functions == 1) {
      if ($(e.target).hasClass('pub_additional_functions_bg')) {
        $idPub = $opened_pub_additional_functions_id;
        $('.pub_one.lifehack#'+$idPub+' .pub_show_full').removeClass('pub_additional_functions_opened');
        $('.pub_additional_functions_bg').removeClass('show');
        $is_opened_pub_additional_functions = 0;
        $opened_pub_additional_functions_id = 0;
        $('.new_complaint').removeClass('show');
        $('.share_the_pub').removeClass('show');
        console.log("Закрылись дополнительные действия с публикацией с ID "+ $idPub);
      }
    }

    if (document.getElementById('fltr_cost_min').value != ''  || document.getElementById('fltr_cost_max').value != '') {
      document.getElementById('fltr_cost_p').innerHTML = "";
      if (document.getElementById('fltr_cost_min').value != '') {
        if (document.getElementById('fltr_cost_min').value > 100) {
          document.getElementById('fltr_cost_min').value = 100;
        }
        if (document.getElementById('fltr_cost_min').value < 0) {
          document.getElementById('fltr_cost_min').value = 0;
        }
        document.getElementById('fltr_cost_p').innerHTML += "От " + document.getElementById('fltr_cost_min').value + "%";
      }
      if (document.getElementById('fltr_cost_min').value != '' && document.getElementById('fltr_cost_max').value != '') {
        document.getElementById('fltr_cost_p').innerHTML += " ";
      }
      if (document.getElementById('fltr_cost_max').value != '') {
        if (document.getElementById('fltr_cost_max').value > 100) {
          document.getElementById('fltr_cost_max').value = 100;
        }
        if (document.getElementById('fltr_cost_max').value < 0) {
          document.getElementById('fltr_cost_max').value = 0;
        }
        document.getElementById('fltr_cost_p').innerHTML += "до " + document.getElementById('fltr_cost_max').value + "%";
      }
      if ((document.getElementById('fltr_cost_min').value != '' && document.getElementById('fltr_cost_max').value != '') &&
          (parseInt(document.getElementById('fltr_cost_max').value) < parseInt(document.getElementById('fltr_cost_min').value))) {
        a = document.getElementById('fltr_cost_min').value;
        document.getElementById('fltr_cost_min').value = document.getElementById('fltr_cost_max').value;
        document.getElementById('fltr_cost_max').value = a;
        document.getElementById('fltr_cost_p').innerHTML = "От " + document.getElementById('fltr_cost_min').value + "%";
        document.getElementById('fltr_cost_p').innerHTML += " до " + document.getElementById('fltr_cost_max').value + "%";
      }
      document.getElementById('fltr_cost_p').innerHTML += " сохранений";
      $('#fltr_cost').addClass('show');
      $filters_on += 1;
      console.log("from сохранений +1");
    }

    if ($selected_sphere >= 1) {
      if ($selected_sphere == 1) {
        document.getElementById('fltr_style_p').innerHTML = $(':input[name="style_design"]:checked')[0].value;
      }
      if ($selected_sphere > 1) {
        document.getElementById('fltr_style_p').innerHTML = $(':input[name="style_design"]:checked').length + " сферы жизни";
      }
      $('#fltr_style').addClass('show');
      $filters_on += 1;
      console.log("from $selected_sphere +1");
    }

    if (document.getElementById('fltr_cost_min').value == ''  && document.getElementById('fltr_cost_max').value == '') {
      $('#fltr_cost').removeClass('show');
    }
    if ($selected_sphere == 0) {
      $('#fltr_style').removeClass('show');
    }

    if ($filters_on >= 1) {
      $(".filters_on").addClass('show');
      $(".filters_off").addClass('hidden');
      $(".filter_tags_count").addClass('show');
      $(".filter_btn").addClass('tags_count_showed');
      $(".filter").addClass('tags_count_showed');
      $(".filter_to_filter").addClass('turned_on');
      $(".show_pubs_container").addClass('turned_on');
      document.getElementById('tags_count').innerHTML = $filters_on;
    } else {
      $(".filters_on").removeClass('show');
      $(".filters_off").removeClass('hidden');
      $(".filter_tags_count").removeClass('show');
      $(".filter_btn").removeClass('tags_count_showed');
      $(".filter").removeClass('tags_count_showed');
      $(".filter_to_filter").removeClass('turned_on');
      $(".show_pubs_container").removeClass('turned_on');
      document.getElementById('tags_count').innerHTML = $filters_on;
    }
  });

  $('.to_close_filter.fltr_cost').on('click', function() {
    document.getElementById('fltr_cost_min').value = '';
    document.getElementById('fltr_cost_max').value = '';
    $('#fltr_cost').removeClass('show');
    console.log("#fltr_cost closed");
  });
  $('.to_close_filter.fltr_style').on('click', function() {
    $selected_sphere = 0;
    $(':input[name="style_design"]:checked').prop('checked', false);
    document.getElementById('checked_styles_count').innerHTML="Любой";
    $('#fltr_style').removeClass('show');
    console.log("#fltr_style closed");
  });

  $(window).scroll(function () {
    checkScrollForVideo();

    if ($is_opened_pub_additional_functions == 1) {
      $idPub = $opened_pub_additional_functions_id;
      $('.pub_one.lifehack#'+$idPub+' .pub_show_full').removeClass('pub_additional_functions_opened');
      $('.pub_additional_functions_bg').removeClass('show');
      $is_opened_pub_additional_functions = 0;
      $opened_pub_additional_functions_id = 0;
      $('.new_complaint').removeClass('show');
      $('.share_the_pub').removeClass('show');
      console.log("Дополнительные действия с публикацией закрылись :3");
    }

    if ($(window).scrollTop() > 30) {
      $(".filter").addClass('user_scrolled');
      console.log("(.filter).addClass('user_scrolled'");
    } else {
      $(".filter").removeClass('user_scrolled');
      console.log("(.filter).removeClass('user_scrolled'");
    }
  });

});
