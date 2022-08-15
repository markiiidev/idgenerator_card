let card = $('card')[0];
$('#theme').on('change', function(event) { card.setAttribute('theme', event.target.value) });
$('#color').on('change', function(event) { card.setAttribute('color', event.target.value) });

$('[type=text][data-bind]').on('input', function (event) {
    let t = $(`[data-get="${$(this).data('bind')}"]`);
    if(event.target.value) t.text(event.target.value);
    else t.text(event.target.placeholder)
});

$('[type=file][data-bind]').on('change', function(event) {
    var t = $(this).data('bind');
    if(event.target.files[0]) {
        let fileReader = new FileReader();
        fileReader.onloadend = function(event) {
            console.log();
            $(`[data-get="${t}"]`).attr('src', event.target.result)
        }
        fileReader.readAsDataURL(event.target.files[0]);
    }
});

let aside = $('aside');
$('#aside-toggle').click(function(event) {
    event.preventDefault();
    if(aside.hasClass('hide')) {aside.removeClass('hide');}
    else aside.addClass('hide');
    let aye = $(this).find('i');
    if(aye.hasClass('bi-eye')) aye.removeClass('bi-eye').addClass('bi-list');
    else aye.removeClass('bi-list').addClass('bi-eye');
})

sign.onchange = function(event) {
    let label = document.querySelector('label[for="sig"]');
    let off = !event.target.checked;
    $('#sig')[0].style.display = label.style.display = $('[data-get=sig]')[0].style.display = off ? 'none' : 'block';
}

$('#data-form').submit(function(event) {
    event.preventDefault();
    domtoimage.toPng($('#wrapper')[0])
    .then(function (dataUrl) {
        var a = $(document.createElement('a')).attr('href', dataUrl)
        .attr('download', 'id-card.png')
        .css('display', 'none').appendTo(document.body);
        a[0].click();
        a.remove();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
});