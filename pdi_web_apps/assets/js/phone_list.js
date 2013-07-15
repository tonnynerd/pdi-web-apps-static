var entry_point = window.location.origin + '/habitantes/telefones'

/*
  Acessa o webservice, aplicando a callback na resposta.
*/
function search (args, callback) {
  var data = {};

  for (var key in args) {
    if (args[key]){
      data[key] = args[key];
    }
  }

  $.get(entry_point, data, callback);
}

/*
  Retorna a string com a primeira letra de cada palavra em maiúscula (title case).
*/
function toTitle (string) {
  return string.replace(/(^[a-z]| [a-z])/g, function (str) {
    return str.toLocaleUpperCase();
  });
}

/*
  Verifica se a busca será simples (por nome) ou avançada (nome, empresa e função).
*/
function is_advanced () {
  var hidden_fields = $('tr.hidden-search-field');
  var expand_icon = $('#expand').find('i');
  return (hidden_fields.css('display') !== "none") && expand_icon.hasClass('icon-minus');
}

/*
  Remove o resultado da última busca.
*/
function clear_list () {
  $('#phone-list').find('.item').each(function (index) {
    $(this).remove();
  });
}

/*
  Mostra ou esconde campos de busca extra (empresa e função).
*/
function toggle_search_fields(button) {
  var hidden_fields = $('tr.hidden-search-field');
  var expand_icon = $('#expand').find('i');
  if (is_advanced())
  {
    hidden_fields.hide('slow');
    expand_icon.removeClass('icon-minus').addClass('icon-plus');
    hidden_fields.find('.search-query').val('');
  } else
  {
    hidden_fields.show('slow');
    expand_icon.removeClass('icon-plus').addClass('icon-minus');
  }
}

/*
  Retorna um campo read-only, para ser inserido dentro de um form.
*/
function new_control_group (label, value, type) {
  var control_group = $('<div></div>').addClass('control-group');
  var label = $('<label></label>').addClass('control-label').text(label);
  var controls = $('<div></div>').addClass('controls');
  var field = $('<span></span>')
              .addClass('input-xlarge uneditable-' + type)
              .text(value);
  return control_group.append(label).append(controls.append(field));
}


/*
  Retorna um novo item para ser adicionado na lista telefônica.
*/
function new_item (person_data, item_id, parent_id) {
  var main_div = $('<div></div>').addClass('accordion-group item');

  var head = $('<div></div>').addClass('accordion-heading');

  var phone = $('<span></span>').addClass('muted pull-right').text(person_data.telefone);
  var name = $('<span></span>').text(toTitle(person_data.nome));
  var link = $('<a></a>', {
      'href': '#' + item_id,
      'data-toggle': 'collapse',
      'data-parent': '#' + parent_id
    }).addClass('accordion-toggle');
  link.append(name)
  link.append(phone);
  head.append(link);

  main_div.append(head);

  var body = $('<div></div>', {'id': item_id}).addClass('accordion-body collapse');
  var inner_body = $('<div></div>').addClass('accordion-inner');
  var item_data = $('<form></form>').addClass('form-horizontal');

  item_data.append(new_control_group('Telefone', person_data.telefone, 'input'));
  item_data.append(new_control_group('Função', person_data.funcao.nome, 'input'));
  item_data.append(new_control_group('Empresa', person_data.empresa.nome, 'textarea'));

  main_div.append(body.append(inner_body.append(item_data)));

  return main_div;
}

$(document).ready(function (){
  // binding do botão de exibir busca avançada:
  $('#expand').click(function (event) {
    event.preventDefault();
    toggle_search_fields($(this));
  });

  // binding do botão para limpar os campos:
  $('#clear').click(function (event) {
    event.preventDefault();
    $('.search-query').val('');
  })

  // binding do botão para limpar a lista :
  $('#clear-list').click(function (event) {
    event.preventDefault();
    clear_list();
  })

  // binding da busca:
  $('#search').click(function (event) {
    event.preventDefault();

    // mostra a animação de loading:
    $('#loading').show();

    var phone_list = $('#phone-list');

    // remove resultados anteriores:
    clear_list();

    var args = {nome: $('#nome').val()};

    // Caso sejam usados os campos de busca avançada:
    if (is_advanced) {
      args.empresa = $('#empresa').val();
      args.funcao =  $('#funcao').val();
    }

    search(args, function (data) {
      var habitantes = data.pessoaList;
      var phone_list_id = phone_list.attr('id');

      for (var i = 0; i < habitantes.length; i++) {
        phone_list.append(new_item(
          habitantes[i],
          'item' + i,
          phone_list_id
        ));
      };

      // Esconde a animação de loading:
      $('#loading').hide();

    });

  });

});
