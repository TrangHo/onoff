add_image_handlers = function() {
  var thumbnails;
  thumbnails = $('#product-images ul.thumbnails');
  ($('#main-image')).data('selectedThumb', ($('#main-image img')).attr('src'));
  thumbnails.find('li').eq(0).addClass('selected');
  thumbnails.find('a').on('click', function(event) {
    ($('#main-image')).data('selectedThumb', ($(event.currentTarget)).attr('href'));
    ($('#main-image')).data('selectedThumbId', ($(event.currentTarget)).parent().attr('id'));
    // ($(this)).mouseout(function() {
    //   thumbnails.find('li').removeClass('selected');
    //   ($(event.currentTarget)).parent('li').addClass('selected');
    // });
    return false;
  });

  thumbnails.find('li').on('mouseenter', function(event) {
    $($('#main-image img')[0]).attr('src', ($(event.currentTarget)).find('a').attr('href'));
    $('.jqzoom').removeData('jqzoom');
    $('.jqzoom').attr('href', $($(event.currentTarget).find('a')).data('large-url'));
    $('.jqzoom').jqzoom();
  });
};

show_variant_images = function(variant_id) {
  var currentThumb, newImg, thumb;
  ($('li.vtmb')).hide();
  ($('li.vtmb-' + variant_id)).show();
  currentThumb = $('#' + ($('#main-image')).data('selectedThumbId'));
  if (!currentThumb.hasClass('vtmb-' + variant_id)) {
    thumb = $(($('ul.thumbnails li:visible.vtmb')).eq(0));
    if (!(thumb.length > 0)) {
      thumb = $(($('ul.thumbnails li:visible')).eq(0));
    }
    newImg = thumb.find('a').attr('href');
    ($('ul.thumbnails li')).removeClass('selected');
    thumb.addClass('selected');
    ($('#main-image img')).attr('src', newImg);
    ($('#main-image')).data('selectedThumb', newImg);
    ($('#main-image')).data('selectedThumbId', thumb.attr('id'));
  }
};

update_variant_price = function(variant) {
  var variant_price;
  variant_price = variant.data('price');
  if (variant_price) {
    ($('.price.selling')).text(variant_price);
  }
};

function select_colors() {
  $('.available-colors ul li').on('click', function() {
    if ($(this).hasClass('chosen')) {
      $(this).removeClass('chosen');
      $('.available-sizes ul li').removeClass('not-available');
    } else {
      var selectedColor = this.id;
      var availableSizes = $(this).data('sizes');

      if (!$(this).hasClass('not-available')) {
        $('.available-colors ul li').removeClass('chosen');
        $(this).toggleClass('chosen');

        $('.available-sizes ul li').removeClass('not-available');

        for (var i = 0; i < $('.available-sizes ul li').length; i++) {
          var size = $('.available-sizes ul li')[i].id;
          size = size.slice(5, size.length);
          if (availableSizes.indexOf(size) < 0) {
            $($('.available-sizes ul li')[i]).addClass('not-available');
          }
        }
      }
    }

    selectVariant();
  });
}

function select_sizes() {
  $('.available-sizes ul li').on('click', function() {
    if ($(this).hasClass('chosen')) {
      $(this).removeClass('chosen');
      $('.available-colors ul li').removeClass('not-available');
    } else {
      var selectedSize = this.id;
      var availableColors = $(this).data('colors');

      if (!$(this).hasClass('not-available')) {
        $('.available-sizes ul li').removeClass('chosen');
        $(this).toggleClass('chosen');

        $('.available-colors ul li').removeClass('not-available');

        for (var i = 0; i < $('.available-colors ul li').length; i++) {
          var color = $('.available-colors ul li')[i].id;
          color = color.slice(6, color.length);
          if (availableColors.indexOf(color) < 0) {
            $($('.available-colors ul li')[i]).addClass('not-available');
          }
        }
      }
    }

    selectVariant();
  });
}

function selectVariant() {
  if ($('.available-sizes ul li').hasClass('chosen') && $('.available-colors ul li').hasClass('chosen')) {
    var size = $('.available-sizes ul li.chosen').attr('id').slice(5, $('.available-sizes ul li.chosen').attr('id').length);
    var color = $('.available-colors ul li.chosen').attr('id').slice(6, $('.available-colors ul li.chosen').attr('id').length);

    $('input#variant-' + color + '-' + size + '[name="variant_id"]').attr('checked', true);
    $('input#chosen_variant').val($('input[name="variant_id"]:checked').val());
  } else {
    $('input[name="variant_id"]').attr('checked', false);
    $('input#chosen_variant').val($('input#chosen_variant').data('master'));
  }
}

function checkChosenVariantBeforeSubmitForm() {
  $('form').submit(function() {
    if (($('.variants input').length > 0) && ($('input[name="variant_id"]:checked').length == 0)) {
      alert('Vui lòng chọn màu sắc và size cho sản phẩm trước khi thêm vào giỏ hàng');
      return false;
    }
  });
}

$(function() {
  add_image_handlers();
  if (($('#product-variants input[type="radio"]')).length > 0) {
    // show_variant_images(($('#product-variants input[type="radio"]')).eq(0).attr('value'));
  }
  ($('#product-variants input[type="radio"]')).click(function(event) {
    // show_variant_images(this.value);
    update_variant_price($(this));
  });

  select_colors();
  select_sizes();
  checkChosenVariantBeforeSubmitForm();
});
