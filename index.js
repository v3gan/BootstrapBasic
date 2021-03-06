var sql_import_export =
  'name LIKE "%Johnny%" AND (category = 2 OR in_stock = 1)';

var rules_basic = {
  condition: "AND",
  rules: [
    {
      id: "price",
      operator: "less",
      value: 10.25,
    },
    {
      condition: "OR",
      rules: [
        {
          id: "category",
          operator: "equal",
          value: 2,
        },
        {
          id: "category",
          operator: "equal",
          value: 1,
        },
      ],
    },
  ],
};

$(function(){
  //$('#SQLin').text(sql_import_export);
  //$('#JSONin').text(JSON.stringify(rules_basic, null,2));
})

$("#builder").queryBuilder({
  plugins: [
    //"bt-tooltip-errors", 
    //"not-group"
  ],
  default_filter: 'name',
  operators: ['equal'],
  // icons: {
  //   add_group: "bi bi-plus-square",
  //   add_rule: "bi bi-plus-circle",
  //   remove_group: "bi bi-dash-square",
  //   remove_rule: "bi bi-dash-circle",
  //   error: "bi bi-exclamation-triangle",
  // },
  templates: {
    group: `
<div id="{{= it.group_id }}" class="rules-group-container">
  <div class="rules-group-header">
    <div class="btn-group pull-right group-actions">
      <button type="button" class="btn btn-xs btn-success" data-add="rule">
        <i class="{{= it.icons.add_rule }}"></i> {{= it.translate("add_rule") }}
      </button>
      {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }}
        <button type="button" class="btn btn-xs btn-success" data-add="group">
          <i class="{{= it.icons.add_group }}"></i> {{= it.translate("add_group") }}
        </button>
      {{?}}
      {{? it.level>1 }}
        <button type="button" class="btn btn-xs btn-danger" data-delete="group">
          <i class="{{= it.icons.remove_group }}"></i> {{= it.translate("delete_group") }}
        </button>
      {{?}}
    </div>
    <div class="btn-group group-conditions">
      {{~ it.conditions: condition }}
        <label class="btn btn-xs btn-primary">
          <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.translate("conditions", condition) }}
        </label>
      {{~}}
    </div>
    {{? it.settings.display_errors }}
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div>
    {{?}}
  </div>
  <div class=rules-group-body>
    <div class=rules-list></div>
  </div>
</div>`,
    rule: `
<div id="{{= it.rule_id }}" class="rule-container"> 
  <div class="rule-header">
    <div class="btn-group pull-right rule-actions">
      <button type="button" class="btn btn-xs btn-danger" data-delete="rule">
        <i class="{{= it.icons.remove_rule }}"></i> {{= it.translate("delete_rule") }}
      </button>
    </div>
  </div>
  {{? it.settings.display_errors }}
    <div class="error-container"><i class="{{= it.icons.error }}"></i></div>
  {{?}}
  <div class="rule-filter-container"></div>
  <div class="rule-operator-container"></div>
  <div class="rule-value-container"></div>
</div>`
  },
  filters: [
    {
      id: "name",
      label: "Course",
      type: "integer",
      input: "select",
      values: {
        1: "MED 123",
        2: "SURG 123",
        3: "PEDS 123",
        4: "NEUR 234",
      },

    }
  ],
});

$("#btn-reset").on("click", function () {
  $("#builder").queryBuilder("reset");
});

$("#btn-set-sql").on("click", function () {
  $("#builder").queryBuilder("setRulesFromSQL", sql_import_export);
});

$('#btn-set-json').on('click', function() {
  $('#builder').queryBuilder('setRules', rules_basic);
});

$("#btn-export").on("click", function () {
  var result = $("#builder").queryBuilder("getSQL", false);

  if (result.sql.length) {
    $('#SQLout').text(result.sql);
  }

  result = $('#builder').queryBuilder('getRules');

  if (!$.isEmptyObject(result)) {
    $('#JSONout').text(JSON.stringify(result, null, 2));
  }
});

$("#btn-get-sql").on("click", function () {
  var result = $("#builder").queryBuilder("getSQL", false);

  if (result.sql.length) {
  $('#SQLout').text(result.sql);
  }
});

$('#btn-get-json').on('click', function() {
  var result = $('#builder').queryBuilder('getRules');
  
  if (!$.isEmptyObject(result)) {
    $('#JSONout').text(JSON.stringify(result, null, 2));
  }
});