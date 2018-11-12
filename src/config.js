import React from 'react';
import en_US from 'antd/lib/locale-provider/en_US';
import { Widgets } from 'react-awesome-query-builder';

const {
  TextWidget,
  NumberWidget,
  ValueFieldWidget
} = Widgets;

export default {
  conjunctions: {
    AND: {
      label: 'And',
      formatConj: (children, conj, isForDisplay) => {
        return children.size > 1 ?
          '(' + children.join(' '+ (isForDisplay ? "AND" : "&&") +' ') + ')'
          : children.first();
      },
    },
    OR: {
      label: 'Or',
      formatConj: (children, conj, isForDisplay) => {
        return children.size > 1 ?
          '(' + children.join(' '+ (isForDisplay ? "OR" : "||") +' ') + ')'
          : children.first();
      },
    },
  },
  fields: {
    name: {
      label: 'Name',
      type: 'string',
    },
    rackNumber: {
      label: 'Rack #',
      type: 'number',
    },
    roomNumber: {
      label: 'Room #',
      type: 'number',
    },
    rows: {
      label: 'Rows',
      type: 'number',
    },
    columns: {
      label: 'Columns',
      type: 'number',
    },
    type: {
      label: 'Type',
      type: 'string',
    },
    position: {
      label: 'Position',
      type: 'string',
    },
    cageNumber: {
      label: 'Cage #',
      type: 'number',
    },
  },

  /*
    Describes types coming into selects (fields attr above)
   */
  types: {
    string: {
      widgets: {
        string: {
          defaultOperator: 'LIKE',
          operators: [
            'LIKE',
            'NOT_LIKE',
            'EQUAL',
            'NOT_EQUAL',
            'IS_NULL',
            'NOT_NULL',
          ],
          widgetProps: {
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => ("_"+JSON.stringify(val)),
            valueLabel: "string",
            valuePlaceholder: "Enter text",
          }
        },
        field: {
          operators: [
            'LIKE',
            'NOT_LIKE',
            'EQUAL',
            'NOT_EQUAL',
            'IS_NULL',
            'NOT_NULL',
          ],
        }
      },
    },
    number: {
      widgets: {
        number: {
          defaultOperator: 'EQUAL',
          operators: [
            'EQUAL',
            'NOT_EQUAL',
            'IS_NULL',
            'NOT_NULL',
          ],
        }
      },
    },
  },
  operators: {
    LIKE: {
      label: 'contains',
      labelForFormat: 'contains',
      reversedOp: 'NOT_LIKE',
    },
    NOT_LIKE: {
      label: 'does not contain',
      labelForFormat: 'does not contain',
      reversedOp: 'LIKE',
    },
    EQUAL: {
      label: 'is',
      labelForFormat: 'is',
      reversedOp: 'NOT_EQUAL',
    },
    NOT_EQUAL: {
      label: 'is not',
      labelForFormat: 'is not',
      reversedOp: 'EQUAL',
    },
    IS_NULL: {
      isUnary: true,
      label: 'Is empty',
      labelForFormat: 'IS EMPTY',
      cardinality: 0,
      reversedOp: 'NOT_NULL',
      formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
        return isForDisplay ? `${field} IS EMPTY` : `!${field}`;
      },
    },
    NOT_NULL: {
      isUnary: true,
      label: 'Is not empty',
      labelForFormat: 'IS NOT EMPTY',
      cardinality: 0,
      reversedOp: 'IS_NULL',
      formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
        return isForDisplay ? `${field} IS NOT EMPTY` : `!!${field}`;
      },
    },
  },
  widgets: {
    string: {
      type: "string",
      valueSrc: 'value',
      factory: (props) => <TextWidget {...props} />,
      valueLabel: "String",
      valuePlaceholder: "Enter string",
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        return isForDisplay ? '"'+val+'"' : JSON.stringify(val);
      },
    },
    number: {
      type: "number",
      valueSrc: 'value',
      factory: (props) => <NumberWidget {...props} />,
      valueLabel: "Number",
      valuePlaceholder: "Enter number",
      formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
        return isForDisplay ? val : JSON.stringify(val);
      },
    },
    field: {
      valueSrc: 'field',
      factory: (props) => <ValueFieldWidget {...props} />,
      formatValue: (val, fieldDef, wgtDef, isForDisplay, valFieldDef) => {
        return isForDisplay ? (valFieldDef.label || val) : val;
      },
      valueLabel: "Field to compare",
      valuePlaceholder: "Select field to compare",
      customProps: {
        showSearch: true
      }
    }
  },
  settings: {
    locale: {
      short: 'en',
      full: 'en-US',
      antd: en_US,
    },
    maxLabelsLength: 50,
    hideConjForOne: false,
    renderSize: 'small',
    renderConjsAsRadios: false,
    renderFieldAndOpAsDropdown: false,
    customFieldSelectProps: {
      showSearch: true
    },
    setOpOnChangeField: ['keep', 'default'], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
    clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
    clearValueOnChangeOp: false,
    setDefaultFieldAndOp: false,
    maxNesting: 3,
    fieldSeparator: '.',
    fieldSeparatorDisplay: '->',
    showLabels: false,
    valueLabel: "Value",
    valuePlaceholder: "Value",
    fieldLabel: "Field",
    operatorLabel: "Operator",
    fieldPlaceholder: "Not selected",
    operatorPlaceholder: "Select operator",
    deleteLabel: null,
    addGroupLabel: "Add group",
    addRuleLabel: "Add filter",
    delGroupLabel: null,
    canLeaveEmptyGroup: true, //after deletion
    /*formatReverse: (q, operator, reversedOp, operatorDefinition, revOperatorDefinition, isForDisplay) => {
      if (isForDisplay)
        return "NOT(" + q + ")";
      else
        return "!(" + q + ")";
    }, */
    formatField: (field, parts, label2, fieldDefinition, config, isForDisplay) => {
      if (isForDisplay)
        return label2;
      else
        return field;
    },
    valueSourcesInfo: {
      value: {
        label: "Value"
      },
    },
    valueSourcesPopupTitle: "Select value source",
    canReorder: false,
    /*canCompareFieldWithField: (leftField, leftFieldConfig, rightField, rightFieldConfig) => {
      //for type == 'select'/'multiselect' you can check listValues
      return true;
    },*/
  }
};
