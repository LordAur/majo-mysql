class Compiler {
  constructor() {
    /**
     * The current query insert or update
     *
     * @var {string}
     */
    this.grammar = null;
  }

  /**
   * Extract field name from object
   *
   * @static
   * @param {object} fields
   * @returns array field name
   * @memberof Compiler
   */
  static compileFields(fields) {
    const arrField = [];
    const keyFields = Object.keys(fields);
    keyFields.forEach((data) => {
      arrField.push(data);
    });

    return arrField;
  }

  /**
   * Extract field name from array object
   *
   * @static
   * @param {array} fields
   * @returns array field name
   * @memberof Compiler
   */
  static compileFieldsArray(fields) {
    const arrValue = [];
    const keyFields = Object.keys(fields);
    keyFields.forEach((data) => {
      const keys = Object.keys(fields[data]);
      keys.forEach((dataKeys) => {
        if (!arrValue.includes(dataKeys)) {
          arrValue.push(dataKeys);
        }
      });
    });

    return arrValue;
  }

  /**
   * Extract value data from object
   *
   * @static
   * @param {object} values
   * @returns array value
   * @memberof Compiler
   */
  static compileValues(values) {
    const arrValues = [];
    const keyFields = Object.keys(values);
    keyFields.forEach((data) => {
      if (typeof values[data] !== 'string') {
        arrValues.push(values[data]);
      }

      if (typeof values[data] === 'string') {
        arrValues.push(`'${values[data]}'`);
      }
    });

    return arrValues;
  }

  /**
   * Extract value data from array object
   *
   * @static
   * @param {array} fields
   * @param {object} values
   * @returns array value
   * @memberof Compiler
   */
  static compileValuesArray(fields, values) {
    const arrValues = [];
    values.forEach((data, indexValues) => {
      const value = [];
      fields.forEach((dataKey, index) => {
        if (dataKey in data) {
          const tmpValue = typeof data[dataKey] !== 'string' ? data[dataKey] : `'${data[dataKey]}'`;
          value.push(tmpValue);
          if (fields.length === (index + 1)) {
            arrValues.push(value);
            if (values.length === (indexValues + 1)) {
              return arrValues;
            }
          }
        }

        if (!(dataKey in data)) {
          value.push('DEFAULT');
          if (fields.length === (index + 1)) {
            arrValues.push(value);
            if (values.length === (indexValues + 1)) {
              return arrValues;
            }
          }
        }
      });
    });
  }

  /**
   * Create query insert from object
   *
   * @param {string} column
   * @param {object} data
   * @returns query string
   * @memberof Compiler
   */
  compileInsert(column, data) {
    const fields = Compiler.compileFields(data);
    const values = Compiler.compileValues(data);

    this.grammar = `INSERT INTO ${column} (${fields.join(', ')}) VALUES(${values.join(', ')})`;
    return this.grammar;
  }

  /**
   * Create query insert from data array object
   *
   * @param {string} column
   * @param {array} data
   * @returns query string
   * @memberof Compiler
   */
  compileInsertArray(column, data) {
    const fields = Compiler.compileFieldsArray(data);
    const values = Compiler.compileValuesArray(fields, data);

    this.grammar = `INSERT INTO ${column} (${fields.join(', ')}) VALUES`;

    const arrayValueFinal = [];
    values.forEach((value) => {
      const stringValue = `(${value.join(', ')})`;
      arrayValueFinal.push(stringValue);
    });

    this.grammar = `${this.grammar} ${arrayValueFinal.join(', ')}`;
    return this.grammar;
  }

  /**
   * Create query update from two string, field and value
   *
   * @param {string} column
   * @param {string} field
   * @param {string} value
   * @returns query string
   * @memberof Compiler
   */
  compileUpdate(column, field, value) {
    this.grammar = `UPDATE ${column} SET ${field} = ${typeof value === 'number' || value === null ? value : `'${value}'`}`;
    return this.grammar;
  }

  /**
   * Create query update from object
   *
   * @param {string} column
   * @param {object} data
   * @returns this
   * @memberof Compiler
   */
  compileUpdateArray(column, data) {
    const fields = Compiler.compileFieldsArray(data);

    this.grammar = `UPDATE ${column} SET`;

    const arrValueFinal = [];
    fields.forEach((field) => {
      arrValueFinal.push(`${field} = ${typeof data[0][field] !== 'string' ? data[0][field] : `'${data[0][field]}'`}`);
    });

    this.grammar = `${this.grammar} ${arrValueFinal.join(', ')}`;
    return this.grammar;
  }

  /**
   * Create query delete
   *
   * @param {string} table
   * @returns this
   * @memberof Compiler
   */
  compileDelete(table) {
    this.grammar = `DELETE FROM ${table}`;
    return this.grammar;
  }
}

module.exports = new Compiler();